"use client";

import { TrendingUp, ArrowRight } from "lucide-react";

export default function SpotlightsSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#002147] uppercase">
              Model Village Spotlights
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-500">
              Showcasing excellence in rural administration and development
            </p>
          </div>
          <button className="group flex w-full items-center justify-center gap-2 border-2 border-[#002147] px-5 py-2 text-xs font-bold text-[#002147] transition-all duration-300 hover:bg-[#002147] hover:text-white sm:w-auto sm:px-6 sm:text-sm">
            CASE STUDIES
            <TrendingUp className="text-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="group flex flex-col gap-6 border border-slate-100 p-4 transition-all hover:border-[#e67e22] md:flex-row">
            <div
              className="aspect-video bg-cover bg-center shadow-md transition-all group-hover:grayscale-0 md:w-1/2 grayscale"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCXAGavzmlpZw5esy2lzmIzekc0x-HDHTu1VFdcdIQYTVxwbpnhvBppA0EKASCE1_le1sjDr9cJ6L4Dk6m37Vd3guYmImFYDOGQbw4JmmUWIR7sZJp4aseoz_NVKl_zeqNguvYCy3st3xbv_dnbH18ApHyp4c9_KrRcMm13udwAXOrhGHk6w4Ep7MkeBWrcB2-AChZRUqm4HaOdm1KO7YwndQ3CrnuP35Vr_h0FF_d8TxcaRSovK22hmJKuTQC4P-oeOFL0550pW_N')",
              }}
            />
            <div className="flex flex-col justify-center md:w-1/2">
              <span className="mb-1 text-[10px] font-black tracking-widest text-[#e67e22] uppercase">
                Sanitation &amp; Ecology
              </span>
              <h4 className="mb-3 text-xl font-black text-[#002147] transition-colors group-hover:text-[#e67e22]">
                Kharadi: Zero-Waste Pioneer
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                Implementing 100% waste segregation and a local bio-gas plant
                that powers streetlights for the entire village.
              </p>
              <a
                className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase transition-transform group-hover:translate-x-2"
                href="#"
              >
                Read Success Story
                <ArrowRight className="text-sm" />
              </a>
            </div>
          </div>

          <div className="group flex flex-col gap-6 border border-slate-100 p-4 transition-all hover:border-[#e67e22] md:flex-row">
            <div
              className="aspect-video bg-cover bg-center shadow-md transition-all group-hover:grayscale-0 md:w-1/2 grayscale"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWOAZULjffZQm6xdQbirErIl-J-6mWscmHOX9E8CCAJRwspUR2P9YprjvZ5o3HDIVVwYnrmaSgsL3rXPqLH3NbZzLYrv-GWUEQPWO2lmcZMxtFMkT8eKFsLP2L9EPvjDwxUs12r4MeuqYZ3H8d7wnGRKoZ4F2fG7TenMClPk4Za9mlRoJybccFEQh1pwbWIl-KQTQnTx7lluL7eQeFxWfqu_UHNneVoh5AJGUx1FKfR9i2n9bDrsyNR45I7nsbbZ7-K-ajPRCBt7uU')",
              }}
            />
            <div className="flex flex-col justify-center md:w-1/2">
              <span className="mb-1 text-[10px] font-black tracking-widest text-[#e67e22] uppercase">
                Education &amp; Digitization
              </span>
              <h4 className="mb-3 text-xl font-black text-[#002147] transition-colors group-hover:text-[#e67e22]">
                Ralegan: 100% Literacy
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                Achieved complete adult literacy and established a digital
                learning lab that serves 5 neighboring villages.
              </p>
              <a
                className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase transition-transform group-hover:translate-x-2"
                href="#"
              >
                Read Success Story
                <ArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
