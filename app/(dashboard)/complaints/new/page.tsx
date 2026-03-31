import { ComplaintForm } from "@/features/complaints/components/complaint-form";

export default function RaiseComplaintPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Raise a New Complaint</h1>
      <ComplaintForm />
    </div>
  );
}
