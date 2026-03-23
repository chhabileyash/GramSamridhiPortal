import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { customVillageInfo } from "@/src/db/schema";
import { db } from "@/src";

// This API returns all gallery images from all villages (flattened)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageId = searchParams.get("villageId");
  let all;
  if (villageId) {
    all = await db
      .select()
      .from(customVillageInfo)
      .where(eq(customVillageInfo.villageIdString, villageId));
  } else {
    all = await db.select().from(customVillageInfo);
  }
  const images = all
    .flatMap((village) =>
      (village.images || []).map((img) => ({
        ...img,
        villageId: village.villageIdString,
        villageName:  undefined,
      })),
    )
    .filter((img) => img.url);
  return NextResponse.json({ images });
}
