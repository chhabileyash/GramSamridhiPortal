import { db } from "@/core/db/client";
import { notifications } from "@/core/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageIdParam = searchParams.get("villageId");

  try {
    let data;
    if (villageIdParam) {
      data = await db.
      select().
      from(notifications).
      where(eq(notifications.villageId, villageIdParam)).
      orderBy(desc(notifications.createdAt));
    }
    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Notifications GET Error:", error);
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
    const { villageId, title, message, audience } = body;

    if (!title || !message) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
    }

    const insertData: any = {
      villageId: villageId ? villageId.toString() : null,
      userId,
      title,
      message,
      audience: audience || "All"
    };

    const result = await db.
    insert(notifications).
    values(insertData).
    returning();
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Notifications POST Error:", error);
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
      return NextResponse.json({ error: "Missing notification id" }, { status: 400 });
    }

    await db.delete(notifications).where(eq(notifications.id, parseInt(id, 10)));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notifications DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}