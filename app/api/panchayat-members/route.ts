import { db } from "@/core/db/client";
import { panchayatMembers } from "@/core/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageIdParam = searchParams.get("villageId");

  if (!villageIdParam) {
    return NextResponse.json({ error: "Missing villageId parameter" }, { status: 400 });
  }

  try {
    let data;

    data = await db.
    select().
    from(panchayatMembers).
    where(eq(panchayatMembers.villageId, villageIdParam)).
    orderBy(desc(panchayatMembers.createdAt));

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
      return NextResponse.json(
        { error: "Forbidden - Admin only" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const villageId = formData.get("villageId") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;

    if (!name || !position) {
      return NextResponse.json(
        { error: "Name and position are required" },
        { status: 400 }
      );
    }

    let imageUrl = formData.get("imageUrl") as string | null;

    const file = formData.get("imageFile") as File | null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = (await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "panchayat-members" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      })) as any;

      imageUrl = uploadResult.secure_url;
    }

    const vId = villageId ? villageId.toString() : null;

    const result = await db.
    insert(panchayatMembers).
    values({
      villageId: vId,
      name,
      position,
      imageUrl: imageUrl || null,
      phone: phone || null,
      email: email || null,
      address: address || null
    }).
    returning();

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
      return NextResponse.json(
        { error: "Forbidden - Admin only" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing member id" }, { status: 400 });
    }

    await db.
    delete(panchayatMembers).
    where(eq(panchayatMembers.id, parseInt(id, 10)));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Panchayat Members DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}