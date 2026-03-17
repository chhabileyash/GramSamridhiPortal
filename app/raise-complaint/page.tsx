"use client";

import React from "react";
import {
  FileText,
  AlertCircle,
  IndianRupee,
  CheckCircle,
  Info,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function RaiseComplaint() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <Header />

      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Raise a <span className="text-[#ab7845]">Complaint</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Gram Panchayat Grievance Redressal
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#FF9933] text-[#FF9933] text-xs font-bold hover:bg-[#FF9933]/5 transition-colors rounded-sm">
                <FileText className="w-4 h-4" />
                MY COMPLAINTS
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Section 1: Complaint Details */}
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
                        Category
                      </label>
                      <select className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm rounded-sm">
                        <option>Water Supply</option>
                        <option>Street Lights</option>
                        <option>Sanitation &amp; Garbage</option>
                        <option>Roads</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Location / Landmark
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Near Post Office"
                        type="text"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Detailed Description
                      </label>
                      <textarea
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Please describe the issue in detail"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button className="bg-[#138808] text-white font-bold py-2.5 px-6 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm">
                        <CheckCircle className="w-5 h-5" />
                        SUBMIT COMPLAINT
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Info Box */}
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
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
