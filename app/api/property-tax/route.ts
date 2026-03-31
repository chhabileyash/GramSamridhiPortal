import { db } from "@/core/db/client";
import { propertyTaxes } from "@/core/db/schema";
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
      data = await db.select().from(propertyTaxes).where(
        and(
          eq(propertyTaxes.villageId, villageIdParam),
          !isAdmin ? eq(propertyTaxes.userId, userId) : undefined
        )
      ).orderBy(desc(propertyTaxes.createdAt));
    } else {
      data = await db.select().from(propertyTaxes).where(eq(propertyTaxes.userId, userId)).orderBy(desc(propertyTaxes.createdAt));
    }

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Property Tax GET Error:", error);
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
    const { villageId, propertyId, ownerName, financialYear, amount, paymentDate, referenceNumber } = body;

    if (!propertyId || !ownerName || !amount || !referenceNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const invoiceId = body.invoiceId || `PT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const vId = villageId ? villageId.toString() : null;

    const result = await db.insert(propertyTaxes).values({
      villageId: vId,
      userId,
      invoiceId,
      propertyId,
      ownerName,
      financialYear: financialYear || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      amount: amount.toString(),
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      referenceNumber: referenceNumber,
      status: "Pending"
    }).returning();

    getPostHogClient().capture({
      distinctId: userId,
      event: "property_tax_filed",
      properties: {
        invoiceId,
        amount,
        villageId: vId
      }
    });

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Property Tax POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const result = await db.update(propertyTaxes).
    set({
      status,
      updatedAt: new Date()
    }).
    where(eq(propertyTaxes.id, parseInt(id, 10))).
    returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Property Tax PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}