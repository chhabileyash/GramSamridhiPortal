"use client";

import AnimatedCounter from "@/components/AnimatedCounter";

export default function StatsSection() {
  return (
    <section className="bg-[#002147] py-16 text-white">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          <div className="border border-white/10 p-4 text-center sm:p-6">
            <h3 className="mb-2 text-3xl font-black text-[#e67e22] sm:text-4xl">
              <AnimatedCounter end={36} />
            </h3>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Districts
            </p>
          </div>
          <div className="border border-white/10 p-4 text-center sm:p-6">
            <h3 className="mb-2 text-3xl font-black text-[#e67e22] sm:text-4xl">
              <AnimatedCounter end={27854} />
            </h3>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Panchayats
            </p>
          </div>
          <div className="border border-white/10 p-4 text-center sm:p-6">
            <h3 className="mb-2 text-3xl font-black text-[#e67e22] sm:text-4xl">
              <AnimatedCounter end={40000} suffix="+" />
            </h3>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Villages
            </p>
          </div>
          <div className="border border-white/10 p-4 text-center sm:p-6">
            <h3 className="mb-2 text-3xl font-black text-[#e67e22] sm:text-4xl">
              <AnimatedCounter end={12.5} decimals={1} suffix=" Cr" />
            </h3>
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Population
            </p>
          </div>
          <div className="border border-white/10 p-4 text-center sm:p-6">
            <h3 className="mb-2 text-3xl font-black text-[#e67e22] sm:text-4xl">
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
