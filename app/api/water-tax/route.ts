import { db } from "@/src";
import { waterTaxes } from "@/src/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPostHogClient } from "@/lib/posthog-server";

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
      data = await db.select().from(waterTaxes).where(
        and(
          eq(waterTaxes.villageId, villageIdParam),
          !isAdmin ? eq(waterTaxes.userId, userId) : undefined
        )
      ).orderBy(desc(waterTaxes.createdAt));
    } else {
      data = await db.select().from(waterTaxes).where(eq(waterTaxes.userId, userId)).orderBy(desc(waterTaxes.createdAt));
    }

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Water Tax GET Error:", error);
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
    const { villageId, connectionId, connectionType, ownerName, financialYear, amount, paymentDate, referenceNumber } = body;

    if (!connectionId || !ownerName || !amount || !referenceNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const invoiceId = body.invoiceId || `WT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const vId = villageId ? villageId.toString() : null;

    const result = await db.insert(waterTaxes).values({
      villageId: vId,
      userId,
      invoiceId,
      connectionId,
      connectionType: connectionType || "Domestic",
      ownerName,
      financialYear: financialYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      amount: amount.toString(),
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      referenceNumber,
      status: "Pending"
    }).returning();

    getPostHogClient().capture({
      distinctId: userId,
      event: "water_tax_filed",
      properties: {
        invoiceId,
        connectionType: connectionType || "Domestic",
        amount,
        villageId: vId
      }
    });

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Water Tax POST Error:", error);
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

    const result = await db.update(waterTaxes).
    set({
      status,
      updatedAt: new Date()
    }).
    where(eq(waterTaxes.id, parseInt(id, 10))).
    returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Water Tax PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}