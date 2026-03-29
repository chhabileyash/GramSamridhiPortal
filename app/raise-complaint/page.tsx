"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import posthog from "posthog-js";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  Info } from
"lucide-react";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function RaiseComplaint() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    category: "Water Supply",
    location: "",
    description: "",
    citizenName: "",
    citizenContact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.description) {
      toast.error("Please fill in category and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      const meta = user?.unsafeMetadata as any;
      const villageId = meta?.village_id;


      const title = `${formData.category} - ${formData.description.substring(0, 50)}`;

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villageId,
          title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          citizenName: formData.citizenName || user?.fullName || "",
          citizenContact: formData.citizenContact
        })
      });

      if (!res.ok) throw new Error("Failed to submit complaint");

      const json = await res.json();
      setComplaintId(json.data?.complaintId || "");
      setSubmitted(true);
      posthog.capture("complaint_submitted", {
        category: formData.category,
        complaintId: json.data?.complaintId
      });
      setFormData({
        category: "Water Supply",
        location: "",
        description: "",
        citizenName: "",
        citizenContact: ""
      });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Raise a <span className="text-[#ab7845]">Complaint</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Gram Panchayat Grievance Redressal
                </p>
              </div>
              <Link
                href="/my-complaints"
                className="flex items-center gap-2 px-4 py-2 border border-[#FF9933] text-[#FF9933] text-xs font-bold hover:bg-[#FF9933]/5 transition-colors rounded-sm">
                
                <FileText className="w-4 h-4" />
                MY COMPLAINTS
              </Link>
            </div>

            {submitted ?
            <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center max-w-xl mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-green-800 mb-2">Complaint Submitted Successfully!</h2>
                <p className="text-sm text-green-700 mb-1">Your complaint has been registered.</p>
                <p className="text-sm text-green-700 font-bold">Tracking ID: <span className="text-green-900">{complaintId}</span></p>
                <p className="text-xs text-green-600 mt-4">You will receive updates via SMS. You can also track it in &quot;My Complaints&quot;.</p>
                <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-[#138808] text-white font-bold py-2.5 px-6 rounded-sm hover:opacity-90 transition-colors">
                
                  RAISE ANOTHER COMPLAINT
                </button>
              </div> :

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {}
                  <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Section 1: Issue Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Category *
                        </label>
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm rounded-sm">
                        
                          <option>Water Supply</option>
                          <option>Street Lights</option>
                          <option>Sanitation &amp; Garbage</option>
                          <option>Roads</option>
                          <option>Drainage</option>
                          <option>Electricity</option>
                          <option>Public Property</option>
                          <option>Administration</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Location / Landmark
                        </label>
                        <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Near Post Office, Ward 5"
                        type="text" />
                      
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Detailed Description *
                        </label>
                        <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Please describe the issue in detail"
                        rows={4}>
                      </textarea>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Section 2: Your Details (Optional)
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Your Name
                        </label>
                        <input
                        name="citizenName"
                        value={formData.citizenName}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder={user?.fullName || "Your full name"}
                        type="text" />
                      
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Contact Number
                        </label>
                        <input
                        name="citizenContact"
                        value={formData.citizenContact}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="+91 98765 43210"
                        type="tel" />
                      
                      </div>
                    </div>
                  </div>

                  {}
                  <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.description}
                  className="bg-[#138808] text-white font-bold py-3 px-6 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-50 w-full sm:w-auto">
                  
                    <CheckCircle className="w-5 h-5" />
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT COMPLAINT"}
                  </button>
                </div>

                {}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Response Time
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          Complaints are typically responded to within{" "}
                          <span className="font-bold text-[#FF9933]">
                            48 working hours
                          </span>
                          . You will receive an SMS and tracking number.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#138808] rounded-sm">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#138808] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Status Tracking
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          <span className="font-bold text-yellow-600">Pending</span> — Complaint received, awaiting review<br />
                          <span className="font-bold text-blue-600">Progress</span> — Being worked on by our team<br />
                          <span className="font-bold text-green-600">Complete</span> — Issue has been resolved
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </main>
      </div>
      <Footer />
    </div>);

}