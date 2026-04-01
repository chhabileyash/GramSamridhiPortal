import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ComplaintsService } from "@/features/complaints/services";
import { getPostHogClient } from "@/core/analytics/posthog";
import { db } from "@/core/db/client";
import { complaints, users } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { sendUserEventEmail } from "@/shared/utils/email";

export async function GET(req: Request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (sessionClaims?.unsafe_metadata as any)?.role;
    const isAdmin = role === "admin";

    const { searchParams } = new URL(req.url);
    const villageIdParam = searchParams.get("villageId");

    let data;
    if (villageIdParam) {
      // If admin, they see all for village. If not, they see only theirs for that village.
      // (Simplified for now - typically moved into Service Layer)
      data = await ComplaintsService.getVillageComplaints(villageIdParam);
      if (!isAdmin) {
        data = data.filter((c) => c.userId === userId);
      }
    } else {
      data = await ComplaintsService.getUserComplaints(userId);
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Complaints GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Call business logic service
    const result = await ComplaintsService.submitComplaint(body, userId);

    // Side-effects (Analytics)
    getPostHogClient().capture({
      distinctId: userId,
      event: "complaint_created",
      properties: {
        category: body.category,
        complaintId: result.complaintId,
        villageId: body.villageId,
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Complaints POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (sessionClaims?.unsafe_metadata as any)?.role;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, priority } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing complaint id" },
        { status: 400 },
      );
    }

    // Ideally moved to service: ComplaintsService.updateComplaint()
    const updateData: any = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const result = await db
      .update(complaints)
      .set(updateData)
      .where(eq(complaints.id, parseInt(id, 10)))
      .returning();

    const updatedComplaint = result[0];
    if (
      updatedComplaint &&
      status &&
      ["Resolved", "Rejected"].includes(status)
    ) {
      if (updatedComplaint.userId) {
        const userRow = await db
          .select()
          .from(users)
          .where(eq(users.clerkId, updatedComplaint.userId))
          .limit(1);
        if (userRow[0]?.email) {
          const actionWord =
            status === "Rejected" ? "rejected" : "accepted/resolved";
          await sendUserEventEmail({
            userEmail: userRow[0].email,
            formName: "Complaint",
            status: actionWord,
            message: `Your complaint has been ${actionWord}. Complaint ID: ${updatedComplaint.id}`,
            eventId: `complaint-status-${updatedComplaint.id}-${Date.now()}`,
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: updatedComplaint });
  } catch (error: any) {
    console.error("Complaints PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
