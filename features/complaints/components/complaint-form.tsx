"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "CIVIC",
    location: "",
    citizenName: "",
    citizenContact: "",
    villageId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Assume routing to a dashboard listing complaints once success
        router.push("/complaints");
      } else {
        const error = await res.json();
        alert(`Failed to submit: ${error.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4 border rounded-md shadow-sm">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input 
          name="title"
          required
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Short summary of issue"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea 
          name="description"
          required
          rows={4}
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Detailed description..."
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="w-full border p-2 rounded"
          >
            <option value="WATER">Water</option>
            <option value="ROAD">Road</option>
            <option value="ELECTRICITY">Electricity</option>
            <option value="SANITATION">Sanitation</option>
            <option value="CIVIC">Civic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location / Landmark</label>
          <input 
            name="location"
            required
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Ward 4, Near School"
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            name="citizenName"
            required
            value={formData.citizenName} 
            onChange={handleChange} 
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input 
            name="citizenContact"
            required
            value={formData.citizenContact} 
            onChange={handleChange} 
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded disabled:bg-blue-400 hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
