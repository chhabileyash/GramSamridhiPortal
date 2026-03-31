import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { complaints } from '@/core/db/schema';

export type Complaint = InferSelectModel<typeof complaints>;
export type InsertComplaint = InferInsertModel<typeof complaints>;
export type NewComplaintInput = Omit<InsertComplaint, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'complaintId'>;
