import { db } from "@/core/db/client";
import { developmentWorks, users } from "@/core/db/schema";
import { sendUserEventEmail } from "@/shared/utils/email";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageIdParam = searchParams.get("villageId");

  try {
    let data;
    if (villageIdParam) {
      data = await db
        .select()
        .from(developmentWorks)
        .where(eq(developmentWorks.villageId, villageIdParam))
        .orderBy(desc(developmentWorks.createdAt));
    }
    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Development Works GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
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
    const {
      villageId,
      name,
      description,
      contractor,
      budget,
      progress,
      status,
      startDate,
      expectedEndDate,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 },
      );
    }

    const projectId = `DW-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 10000,
    )
      .toString()
      .padStart(4, "0")}`;

    const insertData: any = {
      villageId: villageId ? villageId.toString() : null,
      userId,
      projectId,
      name,
      description: description || null,
      contractor: contractor || null,
      budget: budget || null,
      progress: progress ?? 0,
      status: status || "Pending Start",
      startDate: startDate
        ? new Date(startDate).toISOString().split("T")[0]
        : null,
      expectedEndDate: expectedEndDate
        ? new Date(expectedEndDate).toISOString().split("T")[0]
        : null,
    };

    const result = await db
      .insert(developmentWorks)
      .values(insertData)
      .returning();
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Development Works POST Error:", error);
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
    const {
      id,
      name,
      description,
      contractor,
      budget,
      progress,
      status,
      startDate,
      expectedEndDate,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 },
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (contractor !== undefined) updateData.contractor = contractor;
    if (budget !== undefined) updateData.budget = budget;
    if (progress !== undefined) updateData.progress = progress;
    if (status !== undefined) updateData.status = status;
    if (startDate !== undefined)
      updateData.startDate = startDate
        ? new Date(startDate).toISOString().split("T")[0]
        : null;
    if (expectedEndDate !== undefined)
      updateData.expectedEndDate = expectedEndDate
        ? new Date(expectedEndDate).toISOString().split("T")[0]
        : null;
    updateData.updatedAt = new Date();

    const result = await db
      .update(developmentWorks)
      .set(updateData)
      .where(eq(developmentWorks.id, id))
      .returning();

    const updatedRecord = result[0];
    if (updatedRecord && status) {
      if (updatedRecord.userId) {
        const userRow = await db
          .select()
          .from(users)
          .where(eq(users.clerkId, updatedRecord.userId))
          .limit(1);
        if (userRow[0]?.email) {
          await sendUserEventEmail({
            userEmail: userRow[0].email,
            formName: "Development Work Phase",
            status: status,
            message: `The development work project "${updatedRecord.name}" status has been updated to "${status}".`,
            eventId: `development-work-${updatedRecord.id}-${Date.now()}`,
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (error: any) {
    console.error("Development Works PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const role = (sessionClaims?.unsafe_metadata as any)?.role;
    if (role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 },
      );
    }

    await db
      .delete(developmentWorks)
      .where(eq(developmentWorks.id, parseInt(id, 10)));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Development Works DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
