import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/index";
import {
  users,
  complaints,
  schemes,
  developmentWorks,
} from "../../../src/db/schema";
import { eq, desc, and, or, not, gt,isNull } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const villageId = searchParams.get("villageId");
  if (!villageId) {
    return NextResponse.json(
      { error: "villageId is required" },
      { status: 400 },
    );
  }

  // Total users in village
  const totalUsers = await db
    .select()
    .from(users)
    .where(eq(users.villageId, villageId))
    .then((r) => r.length);

  // Pending complaints in village
  const pendingComplaints = await db
    .select()
    .from(complaints)
    .where(
      and(
        eq(complaints.villageId, villageId),
        eq(complaints.status, "Pending"),
      ),
    )
    .then((r) => r.length);

  // Active schemes in village (assume active = endDate is null or in future)
  const now = new Date();
  const nowIso = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const activeSchemes = await db
    .select()
    .from(schemes)
    .where(
      and(
        eq(schemes.villageId, villageId),
        // (endDate is null OR endDate > now)
        or(isNull(schemes.endDate), gt(schemes.endDate, nowIso)),
      ),
    )
    .then((r) => r.length);

  // Ongoing development works (assume status is not "Complete")
  const ongoingDevelopmentWorks = await db
    .select()
    .from(developmentWorks)
    .where(
      and(
        eq(developmentWorks.villageId, villageId),
        // status != "Complete"
        not(eq(developmentWorks.status, "Complete")),
      ),
    )
    .then((r) => r.length);

  // Last 5 complaints (by createdAt desc)
  const last5Complaints = await db
    .select()
    .from(complaints)
    .where(eq(complaints.villageId, villageId))
    .orderBy(desc(complaints.createdAt))
    .limit(5);

  // Last 5 schemes (by createdAt desc)
  const last5Schemes = await db
    .select()
    .from(schemes)
    .where(eq(schemes.villageId, villageId))
    .orderBy(desc(schemes.createdAt))
    .limit(5);

  return NextResponse.json({
    totalUsers,
    pendingComplaints,
    activeSchemes,
    ongoingDevelopmentWorks,
    last5Complaints,
    last5Schemes,
  });
}
