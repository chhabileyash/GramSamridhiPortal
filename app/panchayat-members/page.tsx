"use client";

import React from "react";
import { Users, Info } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function PanchayatMembers() {
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
                  Panchayat <span className="text-[#ab7845]">Members</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Elected representatives of the village
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Committee Members
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Sarpanch Name
                        </h4>
                        <p className="text-xs text-slate-500">Sarpanch</p>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Upsarpanch Name
                        </h4>
                        <p className="text-xs text-slate-500">Up-Sarpanch</p>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          Member Name
                        </h4>
                        <p className="text-xs text-slate-500">
                          Ward No 1 Member
                        </p>
                      </div>
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
                        Meeting Days
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        Panchayat members generally hold open meetings on the
                        1st and 15th of every month.
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
