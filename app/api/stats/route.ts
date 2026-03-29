import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../src/index";
import {
  users,
  complaints,
  schemes,
  developmentWorks } from
"../../../src/db/schema";
import { eq, desc, and, or, not, gt, isNull } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const villageId = searchParams.get("villageId");
  if (!villageId) {
    return NextResponse.json(
      { error: "villageId is required" },
      { status: 400 }
    );
  }


  const totalUsers = await db.
  select().
  from(users).
  where(eq(users.villageId, villageId)).
  then((r) => r.length);


  const pendingComplaints = await db.
  select().
  from(complaints).
  where(
    and(
      eq(complaints.villageId, villageId),
      eq(complaints.status, "Pending")
    )
  ).
  then((r) => r.length);


  const now = new Date();
  const nowIso = now.toISOString().slice(0, 10);
  const activeSchemes = await db.
  select().
  from(schemes).
  where(
    and(
      eq(schemes.villageId, villageId),

      or(isNull(schemes.endDate), gt(schemes.endDate, nowIso))
    )
  ).
  then((r) => r.length);


  const ongoingWorks = await db.
  select().
  from(developmentWorks).
  where(and(eq(developmentWorks.villageId, villageId), eq(developmentWorks.status, "Ongoing"))).
  then((r) => r.length);

  const completedWorks = await db.
  select().
  from(developmentWorks).
  where(and(eq(developmentWorks.villageId, villageId), eq(developmentWorks.status, "Completed"))).
  then((r) => r.length);

  const reviewWorks = await db.
  select().
  from(developmentWorks).
  where(
    and(
      eq(developmentWorks.villageId, villageId),
      or(eq(developmentWorks.status, "Pending Start"), eq(developmentWorks.status, "Halted"))
    )
  ).
  then((r) => r.length);


  const last5Complaints = await db.
  select().
  from(complaints).
  where(eq(complaints.villageId, villageId)).
  orderBy(desc(complaints.createdAt)).
  limit(5);


  const last5Schemes = await db.
  select().
  from(schemes).
  where(eq(schemes.villageId, villageId)).
  orderBy(desc(schemes.createdAt)).
  limit(5);

  return NextResponse.json({
    totalUsers,
    pendingComplaints,
    activeSchemes,
    developmentStats: {
      ongoing: ongoingWorks,
      completed: completedWorks,
      review: reviewWorks,
      total: ongoingWorks + completedWorks + reviewWorks
    },
    last5Complaints,
    last5Schemes
  });
}