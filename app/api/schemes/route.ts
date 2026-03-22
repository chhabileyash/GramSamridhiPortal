import { db } from "@/src";
import { schemes } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const villageIdParam = searchParams.get("villageId");

    try {
        let data;
        const userIdParam = searchParams.get("userId");

        if (villageIdParam) {
            data = await db
                .select()
                .from(schemes)
                .where(eq(schemes.villageId, villageIdParam))
                .orderBy(desc(schemes.createdAt));
        } else if (userIdParam) {
            data = await db
                .select()
                .from(schemes)
                .where(eq(schemes.userId, userIdParam))
                .orderBy(desc(schemes.createdAt));
        } else {
            data = await db.select().from(schemes).orderBy(desc(schemes.createdAt));
        }
        return NextResponse.json({ data: data || [] });
    } catch (error: any) {
        console.error("Schemes GET Error:", error);
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
            title,
            description,
            category,
            amount,
            startDate,
            endDate,
            eligible,
            link,
        } = body;
        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        const schemeId = `SCH-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}`;

        const insertData: any = {
            villageId: villageId ? villageId.toString() : null,
            userId,
            schemeId,
            title,
            description: description || null,
            category: category || null,
            amount: amount || null,
            startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
            endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : null,
            eligible: eligible || null,
            link: link || null,
        };

        const result = await db
            .insert(schemes)
            .values(insertData)
            .returning();
        return NextResponse.json({ success: true, data: result[0] });
    } catch (error: any) {
        console.error("Schemes POST Error:", error);
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
            return NextResponse.json({ error: "Missing scheme id" }, { status: 400 });
        }
        await db.delete(schemes).where(eq(schemes.id, parseInt(id, 10)));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Schemes DELETE Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
