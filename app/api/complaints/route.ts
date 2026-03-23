import { db } from "@/src";
import { complaints } from "@/src/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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
            data = await db.select().from(complaints).where(
                and(
                    eq(complaints.villageId, villageIdParam),
                    isAdmin ? undefined : eq(complaints.userId, userId)
                )
            ).orderBy(desc(complaints.createdAt));
            console.log(data);
            
        } else {
            data = await db.select().from(complaints).where(eq(complaints.userId, userId)).orderBy(desc(complaints.createdAt));
        }
        return NextResponse.json({ data: data || [] });
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
        const { villageId, title, description, category, location, citizenName, citizenContact } = body;

        if (!title || !description || !category) {
            return NextResponse.json({ error: "Missing required fields (title, description, category)" }, { status: 400 });
        }

        const complaintId = `CMP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
        const vId = villageId ? villageId.toString() : null;

        const result = await db.insert(complaints).values({
            villageId: vId,
            userId,
            complaintId,
            title,
            description,
            category,
            location: location || null,
            citizenName: citizenName || null,
            citizenContact: citizenContact || null,
            priority: "Medium",
            status: "Pending",
        }).returning();

        return NextResponse.json({ success: true, data: result[0] });
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
            return NextResponse.json({ error: "Missing complaint id" }, { status: 400 });
        }

        const updateData: any = { updatedAt: new Date() };
        if (status) updateData.status = status;
        if (priority) updateData.priority = priority;

        const result = await db.update(complaints)
            .set(updateData)
            .where(eq(complaints.id, parseInt(id, 10)))
            .returning();

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error: any) {
        console.error("Complaints PUT Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
