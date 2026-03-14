"use client";

import { Search, Gavel } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden border-b border-slate-200 py-12 md:min-h-125 md:py-16">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 33, 71, 0.85), rgba(0, 33, 71, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE2AIfo1s1gN4TWz6BFu1Hgx8d2yB6SvIC7v8fhsy4_ElrdgN6fM3CGAerBp1usnm5AoYpJ8MXn_iWTLOf1X_Xjfgc2CHJjq5WRhdrWGEmVta1CDsYouxyQfas_XAxF-yQ4DeBjQ0mp8pGemJ1wGgAgMhvRNjHeIAbbwyx1ClBtG3JTE5a91kG2gvzOM_evj6G2xV7PjSwoBWEwYuzkTvjrR1vq3lJlrCCFRg-PG4pZEzJIdTCOiEsV66L9lof6o8iom0rGukyIz7E')",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-300 px-4 text-center text-white sm:px-6 lg:px-8">
        <span className="mb-6 inline-block border border-white/30 px-4 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase">
          Rural Development Department
        </span>
        <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight uppercase sm:text-4xl md:text-6xl">
          Digital Panchayat Services
        </h2>
        <p className="mx-auto mb-8 max-w-2xl border-l-4 border-[#e67e22] px-4 text-left text-base font-normal text-slate-300 sm:px-6 md:mb-10 md:text-center md:text-xl">
          Empowering rural Maharashtra through transparent digital governance
          and accessible citizen services.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <button className="flex w-full items-center justify-center gap-3 border border-orange-400 bg-[#e67e22] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-orange-600 sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
            <Search />
            Village Directory
          </button>
          <button className="flex w-full items-center justify-center gap-3 border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white transition-all hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
            <Gavel />
            Lodge Complaint
          </button>
        </div>
      </div>
    </section>
  );
}
