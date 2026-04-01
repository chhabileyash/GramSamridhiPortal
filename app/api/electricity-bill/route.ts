import { db } from "@/core/db/client";
import { electricityBills, users } from "@/core/db/schema";
import { sendUserEventEmail } from "@/shared/utils/email";
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
      data = await db
        .select()
        .from(electricityBills)
        .where(
          and(
            eq(electricityBills.villageId, villageIdParam),
            !isAdmin ? eq(electricityBills.userId, userId) : undefined,
          ),
        )
        .orderBy(desc(electricityBills.createdAt));
    }

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Electricity Bill GET Error:", error);
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
    const {
      villageId,
      meterId,
      meterType,
      ownerName,
      financialYear,
      unitsConsumed,
      amount,
      paymentDate,
      referenceNumber,
    } = body;

    if (!meterId || !ownerName || !amount || !referenceNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const invoiceId =
      body.invoiceId ||
      `EB-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`;
    const vId = villageId ? villageId.toString() : null;

    const result = await db
      .insert(electricityBills)
      .values({
        villageId: vId,
        userId,
        invoiceId,
        meterId,
        meterType: meterType || "Domestic",
        ownerName,
        financialYear:
          financialYear ||
          `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        unitsConsumed: unitsConsumed ? parseInt(unitsConsumed, 10) : null,
        amount: amount.toString(),
        paymentDate: paymentDate || new Date().toISOString().split("T")[0],
        referenceNumber,
        status: "Pending",
      })
      .returning();

    getPostHogClient().capture({
      distinctId: userId,
      event: "electricity_bill_filed",
      properties: {
        invoiceId,
        meterType: meterType || "Domestic",
        amount,
        villageId: vId,
      },
    });

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Electricity Bill POST Error:", error);
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
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 },
      );
    }

    const result = await db
      .update(electricityBills)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(electricityBills.id, parseInt(id, 10)))
      .returning();

    const updatedRecord = result[0];
    if (updatedRecord && status && ["Paid", "Rejected"].includes(status)) {
      if (updatedRecord.userId) {
        const userRow = await db
          .select()
          .from(users)
          .where(eq(users.clerkId, updatedRecord.userId))
          .limit(1);
        if (userRow[0]?.email) {
          const actionWord =
            status === "Rejected" ? "rejected" : "marked as paid";
          await sendUserEventEmail({
            userEmail: userRow[0].email,
            formName: "Electricity Bill Payment",
            status: actionWord,
            message: `Your electricity bill payment (Invoice ID: ${updatedRecord.invoiceId}) has been ${actionWord}.`,
            eventId: `electricity-bill-${updatedRecord.id}-${Date.now()}`,
          });
        }
      }
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Electricity Bill PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
