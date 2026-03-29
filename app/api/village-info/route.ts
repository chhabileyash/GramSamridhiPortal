import { db } from "@/src";
import { customVillageInfo } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const payloadStr = formData.get("payload") as string;
    if (!payloadStr) return NextResponse.json({ error: "Missing payload" }, { status: 400 });

    const villageId = formData.get("villageId") as string;
    if (!villageId) return NextResponse.json({ error: "Missing villageId" }, { status: 400 });

    const payload = JSON.parse(payloadStr);
    const { village, stats, contact } = payload;


    const imagesList: any[] = [];


    for (let i = 0; i < 20; i++) {
      const metaStr = formData.get(`imageMetadata_${i}`) as string;
      if (!metaStr) continue;

      const meta = JSON.parse(metaStr);
      const file = formData.get(`image_${i}`) as File | null;

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());


        const uploadResult = (await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "village-info" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        })) as any;

        meta.url = uploadResult.secure_url;
      }
      imagesList.push({
        url: meta.url,
        title: meta.title || "Untitled",
        type: meta.type || "gallery",
        isPrimary: meta.isPrimary || false
      });
    }

    const existing = await db.select().from(customVillageInfo).where(eq(customVillageInfo.villageIdString, villageId));

    if (existing.length > 0) {
      await db.update(customVillageInfo).set({
        about: village.about,
        totalPopulation: stats.population.total,
        malePopulation: stats.population.male,
        femalePopulation: stats.population.female,
        childrenCount: stats.distribution.children,
        youthCount: stats.distribution.youth,
        adultsCount: stats.distribution.adults,
        seniorsCount: stats.distribution.seniors,
        address: contact.address,
        phone: contact.phone,
        email: contact.email,
        images: imagesList,
        updatedAt: new Date()
      }).where(eq(customVillageInfo.villageIdString, villageId));
    } else {
      await db.insert(customVillageInfo).values({
        villageIdString: villageId,
        about: village.about,
        totalPopulation: stats.population.total,
        malePopulation: stats.population.male,
        femalePopulation: stats.population.female,
        childrenCount: stats.distribution.children,
        youthCount: stats.distribution.youth,
        adultsCount: stats.distribution.adults,
        seniorsCount: stats.distribution.seniors,
        address: contact.address,
        phone: contact.phone,
        email: contact.email,
        images: imagesList
      });
    }

    return NextResponse.json({ success: true, images: imagesList });
  } catch (error: any) {
    console.error("Village Info Save Error API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villageId = searchParams.get("villageId");

  if (!villageId) return NextResponse.json({ error: "Missing villageId" }, { status: 400 });

  try {
    const data = await db.select().from(customVillageInfo).where(eq(customVillageInfo.villageIdString, villageId));
    console.log(data);
    return NextResponse.json({ data: data[0] || null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}