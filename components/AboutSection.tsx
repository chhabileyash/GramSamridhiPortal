"use client";

import { ShieldCheck, CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-20">
          <div className="w-full max-w-300 mx-auto px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="inline-block border-b-4 border-[#e67e22] pb-2 text-3xl font-black tracking-tight text-[#002147] uppercase">
                  About the Digital Portal
                </h2>
                <p className="font-medium leading-relaxed text-slate-600">
                  The Gram Panchayat Digital Portal is a flagship initiative by
                  the Government of Maharashtra to bridge the digital divide in
                  rural areas. We provide a single-window interface for over
                  27,000 local bodies.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="border-l-4 border-[#002147] bg-slate-50 p-6">
                    <h4 className="mb-3 text-sm font-black text-[#002147] uppercase">
                      Our Mission
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      To digitize 100% of village-level administrative functions
                      and financial transactions by 2026, ensuring
                      accountability at every step.
                    </p>
                  </div>
                  <div className="border-l-4 border-[#e67e22] bg-slate-50 p-6">
                    <h4 className="mb-3 text-sm font-black text-[#002147] uppercase">
                      Our Vision
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      Creating a &apos;Digital Swaraj&apos; where every citizen
                      in rural Maharashtra has paperless access to government
                      services at their doorstep.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-[#002147] p-10 text-white">
                <div className="-z-10 absolute -top-4 -right-4 h-24 w-24 bg-[#e67e22]/20" />
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
                  <ShieldCheck className="text-[#e67e22]" />
                  Core Objectives
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#e67e22]" />
                    <span className="text-sm font-medium">
                      Reduction in administrative processing time by 60%
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#e67e22]" />
                    <span className="text-sm font-medium">
                      Real-time public tracking of development funds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#e67e22]" />
                    <span className="text-sm font-medium">
                      Integration with State and Central Welfare Portals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#e67e22]" />
                    <span className="text-sm font-medium">
                      Direct Benefit Transfer (DBT) security verification
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  );
}
