"use client";

import { ExternalLink, ClipboardList, ArrowRight, CreditCard, Info } from "lucide-react";

export default function ServiceCenter() {
  return (
    <section className="bg-white py-20">
          <div className="w-full max-w-300 mx-auto px-8">
            <div className="mb-12 flex flex-col items-end justify-between gap-6 border-b-2 border-slate-100 pb-8 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#002147] uppercase">
                  Citizen Service Center
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-500 italic">
                  Direct access to statutory and non-statutory rural services
                </p>
              </div>
              <button className="group flex items-center gap-2 border-2 border-[#002147] px-6 py-2 text-sm font-bold text-[#002147] transition-all duration-300 hover:bg-[#002147] hover:text-white">
                VIEW ALL SERVICES
                <ExternalLink className="text-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 border border-slate-200 md:grid-cols-3">
              <div className="group relative flex flex-col overflow-hidden border-b border-slate-200 bg-white p-10 transition-colors duration-500 hover:bg-slate-50 md:border-b-0 md:border-r">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#e67e22] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#002147] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#e67e22] group-hover:text-white">
                  <ClipboardList className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#002147]">
                  Complaint Registration
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Formal registration of civic issues related to sanitation,
                  water supply, and street lighting.
                </p>
                <button className="flex w-full items-center justify-center gap-2 border border-[#002147] py-3 text-xs font-bold text-[#002147] uppercase transition-all duration-300 hover:bg-[#002147] hover:text-white">
                  <span>Lodge Complaint</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>

              <div className="group relative flex flex-col overflow-hidden border-b border-slate-200 bg-white p-10 transition-colors duration-500 hover:bg-slate-50 md:border-b-0 md:border-r">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#002147] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#002147] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#002147] group-hover:text-white">
                  <CreditCard className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#002147]">
                  Revenue &amp; Taxation
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Secure online gateway for payment of property tax,
                  professional tax, and other local cess.
                </p>
                <button className="flex w-full items-center justify-center gap-2 bg-[#002147] py-3 text-xs font-bold text-white uppercase transition-all duration-300 hover:bg-slate-800">
                  <span>Proceed to Payment</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>

              <div className="group relative flex flex-col overflow-hidden bg-white p-10 transition-colors duration-500 hover:bg-slate-50">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#e67e22] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#002147] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#e67e22] group-hover:text-white">
                  <Info className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#002147]">
                  Panchayat Information
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Detailed administrative reports, official gazettes, and member
                  directory of the local body.
                </p>
                <button className="flex w-full items-center justify-center gap-2 border border-[#002147] py-3 text-xs font-bold text-[#002147] uppercase transition-all duration-300 hover:bg-[#002147] hover:text-white">
                  <span>View Details</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        </section>
  );
}
