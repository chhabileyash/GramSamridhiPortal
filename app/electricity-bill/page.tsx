"use client";

import React from "react";
import {
  History,
  Zap,
  User,
  IndianRupee,
  CheckCircle,
  Info,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

export default function ElectricityBill() {
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
                  Electricity{" "}
                  <span className="text-[#ab7845]">Bill Payment</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Current Billing Cycle
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#FF9933] text-[#FF9933] text-xs font-bold hover:bg-[#FF9933]/5 transition-colors rounded-sm">
                <History className="w-4 h-4" />
                VIEW PAST RECEIPTS
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Section 1: Connection Details */}
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Section 1: Connection Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Consumer Number
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="e.g. 1029384756"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Meter Number
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="e.g. MTR9845"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Consumer Information */}
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Section 2: Consumer Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Consumer Name
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Full name"
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Contact Number
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="+91 98765 43210"
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                {/* Bill Summary */}
                <div className="bg-white border border-gray-300 shadow-sm flex flex-col h-fit rounded-sm overflow-hidden">
                  <div className="bg-[#FF9933] text-white p-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-widest">
                      Bill Summary
                    </h3>
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Units Consumed</span>
                        <span className="font-bold">250 units</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Energy Charge</span>
                        <span className="font-bold">₹ 1,500.00</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Fixed Charge</span>
                        <span className="font-bold">₹ 100.00</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          Total Payable Amount
                        </span>
                        <span className="text-3xl font-black text-[#138808]">
                          ₹ 1,600.00
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-[#138808] text-white font-bold py-3 px-4 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 mt-4 rounded-sm">
                      <CheckCircle className="w-5 h-5" />
                      PAY BILL
                    </button>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Important Deadlines
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        Due date is{" "}
                        <span className="font-bold text-[#FF9933]">
                          20th of this month
                        </span>
                        . Late payments incur applicable charges.
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
