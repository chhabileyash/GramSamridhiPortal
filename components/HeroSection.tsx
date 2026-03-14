"use client";

import { Search, Gavel } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-125 w-full items-center justify-center overflow-hidden border-b border-slate-200 py-16">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 33, 71, 0.85), rgba(0, 33, 71, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE2AIfo1s1gN4TWz6BFu1Hgx8d2yB6SvIC7v8fhsy4_ElrdgN6fM3CGAerBp1usnm5AoYpJ8MXn_iWTLOf1X_Xjfgc2CHJjq5WRhdrWGEmVta1CDsYouxyQfas_XAxF-yQ4DeBjQ0mp8pGemJ1wGgAgMhvRNjHeIAbbwyx1ClBtG3JTE5a91kG2gvzOM_evj6G2xV7PjSwoBWEwYuzkTvjrR1vq3lJlrCCFRg-PG4pZEzJIdTCOiEsV66L9lof6o8iom0rGukyIz7E')",
            }}
          />
          <div className="w-full max-w-300 mx-auto px-8 relative z-10 text-center text-white">
            <span className="mb-6 inline-block border border-white/30 px-4 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Rural Development Department
            </span>
            <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight uppercase md:text-6xl">
              Digital Panchayat Services
            </h2>
            <p className="mx-auto mb-10 max-w-2xl border-l-4 border-[#e67e22] px-6 text-left text-lg font-normal text-slate-300 md:text-center md:text-xl">
              Empowering rural Maharashtra through transparent digital
              governance and accessible citizen services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-3 border border-orange-400 bg-[#e67e22] px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-600">
                <Search />
                Village Directory
              </button>
              <button className="flex items-center gap-3 border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10">
                <Gavel />
                Lodge Complaint
              </button>
            </div>
          </div>
        </section>
  );
}
