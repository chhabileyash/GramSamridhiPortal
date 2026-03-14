"use client";

import DistrictSelector from "@/components/DistrictSelector";
import { MapPin } from "lucide-react";

export default function PanchayatSelection() {
  return (
    <section className="border-b border-slate-200 bg-slate-100 py-12">
          <div className="w-full max-w-[1200px] mx-auto px-8">
            <div className="border border-slate-300 bg-white p-8 shadow-sm">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold tracking-wider text-[#002147] uppercase">
                <MapPin className="text-[#e67e22]" />
                Panchayat Selection Portal
              </h3>
              <DistrictSelector />
            </div>
          </div>
        </section>
  );
}
