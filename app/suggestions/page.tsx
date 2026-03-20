"use client";

import React from "react";
import { MessageSquare, Info } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function Suggestions() {
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
                  Provide <span className="text-[#ab7845]">Suggestions</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Help us improve your Gram Panchayat
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
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
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Subject
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="e.g. Park Development"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Your Suggestion
                      </label>
                      <textarea
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Detail your suggestion here..."
                        rows={5}
                      ></textarea>
                    </div>
                    <div>
                      <button className="bg-[#138808] text-white font-bold py-2.5 px-6 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm">
                        SUBMIT SUGGESTION
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
                        Feedback Value
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        Constructive suggestions play a very important role in
                        community development activities.
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
