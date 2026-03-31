import { db } from "@/core/db/client";
import { certificates } from "@/core/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPostHogClient } from "@/core/analytics/posthog";

export async function GET(req: Request) {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (sessionClaims?.unsafe_metadata as any)?.role;
  const isAdmin = role === "admin";

  const { searchParams } = new URL(req.url);
  const villageIdParam = searchParams.get("villageId");

  try {
    let data;
    if (villageIdParam) {
      data = await db.select().from(certificates).where(
        and(
          eq(certificates.villageId, villageIdParam),
          isAdmin ? undefined : eq(certificates.userId, userId)
        )
      ).orderBy(desc(certificates.createdAt));
    } else {
      data = await db.select().from(certificates).where(eq(certificates.userId, userId)).orderBy(desc(certificates.createdAt));
    }
    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Certificates GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formData, villageId } = await req.json();

    if (!formData || !formData.certificateType || !formData.applicant?.fullName) {
      return NextResponse.json({ error: "Missing required form data" }, { status: 400 });
    }

    const certificateId = `CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const vId = villageId ? villageId.toString() : null;

    const result = await db.insert(certificates).values({
      villageId: vId,
      userId,
      certificateId,
      certificateType: formData.certificateType,
      applicantName: formData.applicant.fullName,
      applicantContact: formData.applicant.phone,
      status: "Pending",
      formData: formData
    }).returning();

    getPostHogClient().capture({
      distinctId: userId,
      event: "certificate_requested",
      properties: {
        certificateType: formData.certificateType,
        certificateId,
        villageId: vId
      }
    });

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Certificates POST Error:", error);
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updateData: any = { updatedAt: new Date(), status };

    const result = await db.update(certificates)
      .set(updateData)
      .where(eq(certificates.id, parseInt(id, 10)))
      .returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Certificates PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
