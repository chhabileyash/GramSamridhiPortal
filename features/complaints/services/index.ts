import { ComplaintsRepository } from '../repository';
import type { NewComplaintInput } from '../types';

export const ComplaintsService = {
  async submitComplaint(data: NewComplaintInput, userId: string) {
    if (!data.title || data.title.length < 5) {
      throw new Error("Complaint title must be at least 5 characters.");
    }
    if (!data.description || data.description.length < 10) {
      throw new Error("Complaint description must be at least 10 characters.");
    }

    const complaintId = `COMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newComplaint = {
      ...data,
      userId,
      complaintId,
      status: "Pending", // Default domain rule
      createdAt: new Date(),
    };

    return await ComplaintsRepository.create(newComplaint);
  },

  async getUserComplaints(userId: string) {
    if (!userId) throw new Error("Unauthorized");
    return await ComplaintsRepository.findByUserId(userId);
  },

  async getVillageComplaints(villageId: string) {
    if (!villageId) throw new Error("Village ID required");
    return await ComplaintsRepository.findAllByVillage(villageId);
  }
};
