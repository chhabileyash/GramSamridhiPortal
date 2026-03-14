"use client";

import Carousel from "@/components/Carousel";
import { Leaf, Sun, Droplet } from "lucide-react";

export default function GlimpsesSection() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-slate-50 py-14 md:py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#002147] uppercase">
            Glimpses of Rural Maharashtra
          </h2>
          <p className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
            Showcasing Progress &amp; Heritage across Villages
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-[#e67e22]" />
        </div>

        <Carousel />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
            <Leaf size={36} className=" text-[#e67e22]" />
            <div>
              <h4 className="text-sm font-black text-[#002147] uppercase">
                Smart Infrastructure
              </h4>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Digitally connected community centers and modern amenities.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
            <Sun size={36} className=" text-[#e67e22]" />
            <div>
              <h4 className="text-sm font-black text-[#002147] uppercase">
                Sustainable Energy
              </h4>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Solar-powered street lighting and eco-friendly village grids.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
            <Droplet size={36} className=" text-[#e67e22]" />
            <div>
              <h4 className="text-sm font-black text-[#002147] uppercase">
                Water Management
              </h4>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Exemplary watershed management and piped water for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
