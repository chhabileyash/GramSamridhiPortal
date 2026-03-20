"use client";

import React from "react";
import { HardHat, Info } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function DevelopmentWorks() {
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
                  Development <span className="text-[#ab7845]">Works</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Panchayat projects and their progress
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Ongoing & Completed Projects
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-800">
                          Road Construction in Ward 3
                        </h4>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          Ongoing
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Budget: ₹ 5,00,000
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Constructing new CC road connecting main highway to
                        temple.
                      </p>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                      <p className="text-right text-[10px] mt-1 text-slate-500">
                        45% Completed
                      </p>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-800">
                          Installation of Solar Street Lights
                        </h4>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Budget: ₹ 2,50,000
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Installed 20 new solar street lamps across the village.
                      </p>
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
                        Transparency
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        All financials and progress photos are updated regularly
                        to ensure transparency in panchayat operations.
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
