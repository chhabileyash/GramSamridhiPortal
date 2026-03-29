import { db } from "@/src";
import { suggestions } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageIdParam = searchParams.get("villageId");
  if (!villageIdParam) {
    return NextResponse.json({ error: "Missing villageId parameter" }, { status: 400 });
  }

  try {
    let data = await db.select().from(suggestions).where(eq(suggestions.villageId, villageIdParam)).orderBy(desc(suggestions.createdAt));
    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Suggestions GET Error:", error);
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
    const { villageId, subject, message, category, citizenName } = body;

    if (!message) {
      return NextResponse.json({ error: "Suggestion message is required" }, { status: 400 });
    }

    const suggestionId = `SUG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const vId = villageId ? villageId.toString() : null;

    const result = await db.insert(suggestions).values({
      villageId: vId,
      userId,
      suggestionId,
      subject: subject || null,
      message,
      category: category || null,
      citizenName: citizenName || null
    }).returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    console.error("Suggestions POST Error:", error);
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
      return NextResponse.json({ error: "Missing suggestion id" }, { status: 400 });
    }

    await db.delete(suggestions).where(eq(suggestions.id, parseInt(id, 10)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Suggestions DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}