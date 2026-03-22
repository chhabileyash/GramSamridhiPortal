import { db } from "@/src";
import { panchayatMembers } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const villageIdParam = searchParams.get("villageId");

    try {
        let data;
        if (villageIdParam) {
            data = await db.select().from(panchayatMembers).where(eq(panchayatMembers.villageId, villageIdParam)).orderBy(desc(panchayatMembers.createdAt));
        } else {
            data = await db.select().from(panchayatMembers).orderBy(desc(panchayatMembers.createdAt));
        }

        return NextResponse.json({ data: data || [] });
    } catch (error: any) {
        console.error("Panchayat Members GET Error:", error);
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
            return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
        }

        const body = await req.json();
        const { villageId, name, position, imageUrl, phone } = body;

        if (!name || !position) {
            return NextResponse.json({ error: "Name and position are required" }, { status: 400 });
        }

        const vId = villageId ? villageId.toString() : null;

        const result = await db.insert(panchayatMembers).values({
            villageId: vId,
            name,
            position,
            imageUrl: imageUrl || null,
            phone: phone || null,
        }).returning();

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error: any) {
        console.error("Panchayat Members POST Error:", error);
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
            return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing member id" }, { status: 400 });
        }

        await db.delete(panchayatMembers).where(eq(panchayatMembers.id, parseInt(id, 10)));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Panchayat Members DELETE Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
