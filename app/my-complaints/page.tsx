"use client";

import React from "react";
import { FileText, Info } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function MyComplaints() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      {/* <Header /> */}

      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  My Raised <span className="text-[#ab7845]">Complaints</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Track the status of your complaints
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Recent Complaints
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-800">
                          Water Supply Issue
                        </h4>
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          In Progress
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Complaint ID: #C-10293
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        No water supply for the last 2 days in Ward 12.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Assistance
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        If a complaint is marked resolved but the issue
                        persists, you can re-open it within 3 days.
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
