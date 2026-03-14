"use client";

import AnimatedCounter from "@/components/AnimatedCounter";

export default function StatsSection() {
  return (
    <section className="bg-[#002147] py-16 text-white">
          <div className="w-full max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="border border-white/10 p-6 text-center">
                <h3 className="mb-2 text-4xl font-black text-[#e67e22]">
                  <AnimatedCounter end={36} />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Districts
                </p>
              </div>
              <div className="border border-white/10 p-6 text-center">
                <h3 className="mb-2 text-4xl font-black text-[#e67e22]">
                  <AnimatedCounter end={27854} />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Panchayats
                </p>
              </div>
              <div className="border border-white/10 p-6 text-center">
                <h3 className="mb-2 text-4xl font-black text-[#e67e22]">
                  <AnimatedCounter end={40000} suffix="+" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Villages
                </p>
              </div>
              <div className="border border-white/10 p-6 text-center">
                <h3 className="mb-2 text-4xl font-black text-[#e67e22]">
                  <AnimatedCounter end={12.5} decimals={1} suffix=" Cr" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Population
                </p>
              </div>
              <div className="border border-white/10 p-6 text-center">
                <h3 className="mb-2 text-4xl font-black text-[#e67e22]">
                  <AnimatedCounter end={82.3} decimals={1} suffix="%" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Literacy Rate
                </p>
              </div>
            </div>
          </div>
        </section>
  );
}
