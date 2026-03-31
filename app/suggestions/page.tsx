"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import posthog from "posthog-js";
import { MessageSquare, ThumbsUp, Lightbulb, CheckCircle, Send, Info } from "lucide-react";

import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Sidebar } from "@/shared/components/layout/Sidebar";

export default function Suggestions() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    category: "General",
    citizenName: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [suggestionId, setSuggestionId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.message) {
      toast.error("Please enter your suggestion.");
      return;
    }

    setIsSubmitting(true);
    try {
      const meta = user?.unsafeMetadata as any;
      const villageId = meta?.village_id;

      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villageId,
          subject: formData.subject,
          message: formData.message,
          category: formData.category,
          citizenName: formData.citizenName || user?.fullName || "Anonymous"
        })
      });

      if (!res.ok) throw new Error("Failed to submit suggestion");

      const json = await res.json();
      setSuggestionId(json.data?.suggestionId || "");
      setSubmitted(true);
      posthog.capture("suggestion_submitted", {
        category: formData.category,
        suggestionId: json.data?.suggestionId
      });
      setFormData({ subject: "", message: "", category: "General", citizenName: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error submitting suggestion. Please try again.");
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
                  Provide <span className="text-[#ab7845]">Suggestions</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Help us improve your Gram Panchayat
                </p>
              </div>
            </div>

            {submitted ?
            <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center max-w-xl mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-green-800 mb-2">Suggestion Submitted!</h2>
                <p className="text-sm text-green-700 mb-1">Thank you for your valuable feedback.</p>
                <p className="text-sm text-green-700 font-bold">Reference: <span className="text-green-900">{suggestionId}</span></p>
                <p className="text-xs text-green-600 mt-4">Your suggestion will be reviewed by the Panchayat committee.</p>
                <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-[#138808] text-white font-bold py-2.5 px-6 rounded-sm hover:opacity-90 transition-colors">
                
                  SUBMIT ANOTHER SUGGESTION
                </button>
              </div> :

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Suggestion Box
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Subject
                        </label>
                        <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                        placeholder="e.g. Park Development"
                        type="text" />
                      
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Category
                        </label>
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm rounded-sm">
                        
                          <option>General</option>
                          <option>Infrastructure</option>
                          <option>Education</option>
                          <option>Health</option>
                          <option>Sanitation</option>
                          <option>Water Supply</option>
                          <option>Agriculture</option>
                          <option>Safety &amp; Security</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Your Name (Optional)
                        </label>
                        <input
                        name="citizenName"
                        value={formData.citizenName}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                        placeholder={user?.fullName || "Leave blank for anonymous"}
                        type="text" />
                      
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Your Suggestion *
                        </label>
                        <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                        placeholder="Detail your suggestion here..."
                        rows={5}>
                      </textarea>
                      </div>
                    </div>
                    <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.message}
                    className="mt-6 bg-[#138808] text-white font-bold py-2.5 px-6 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-50">
                    
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT SUGGESTION"}
                    </button>
                  </div>
                </div>

                {}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Feedback Value
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          Constructive suggestions play a very important role in
                          community development activities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#138808] rounded-sm">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#138808] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Anonymous Option
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          You can submit suggestions anonymously by leaving the name field empty. Your identity will not be disclosed.
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