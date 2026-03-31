import { db } from '@/core/db/client';
import { complaints } from '@/core/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { InsertComplaint } from '../types';

export const ComplaintsRepository = {
  async create(data: InsertComplaint) {
    const [inserted] = await db.insert(complaints).values(data).returning();
    return inserted;
  },

  async findByUserId(userId: string) {
    return await db.select()
      .from(complaints)
      .where(eq(complaints.userId, userId))
      .orderBy(desc(complaints.createdAt));
  },
  
  async findAllByVillage(villageId: string) {
    return await db.select()
      .from(complaints)
      .where(eq(complaints.villageId, villageId))
      .orderBy(desc(complaints.createdAt));
  }
};
