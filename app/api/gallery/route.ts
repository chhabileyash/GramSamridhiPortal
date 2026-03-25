import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { customVillageInfo } from "@/src/db/schema";
import { db } from "@/src";
import { auth } from "@clerk/nextjs/server";

// This API returns all gallery images from all villages (flattened)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageId = searchParams.get("villageId");

  if (!villageId) {
    return NextResponse.json({ error: "Missing villageId" }, { status: 400 });
  }
  const all = await db
    .select()
    .from(customVillageInfo)
    .where(eq(customVillageInfo.villageIdString, villageId));

  const images = all
    .flatMap((village) =>
      (village.images || []).map((img) => ({
        ...img,
        villageId: village.villageIdString,
      })),
    )
    .filter((img) => img.url);
  return NextResponse.json({ images });
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url, villageId } = await req.json();
    if (!url || !villageId) {
      return NextResponse.json(
        { error: "Missing url or villageId" },
        { status: 400 },
      );
    }

    const villageData = await db
      .select()
      .from(customVillageInfo)
      .where(eq(customVillageInfo.villageIdString, villageId));

    if (!villageData || villageData.length === 0) {
      return NextResponse.json({ error: "Village not found" }, { status: 404 });
    }

    // Filter out the image with the specific URL
    const currentImages = (villageData[0].images as any[]) || [];
    const updatedImages = currentImages.filter((img) => img.url !== url);

    await db
      .update(customVillageInfo)
      .set({ images: updatedImages, updatedAt: new Date() })
      .where(eq(customVillageInfo.villageIdString, villageId));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Gallery Delete Error:", error);
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 },
    );
  }
}
