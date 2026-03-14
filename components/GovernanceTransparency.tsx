"use client";

export default function GovernanceTransparency() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:gap-16 lg:flex-row">
          <div className="space-y-8 lg:w-1/2">
            <h2 className="border-l-8 border-[#e67e22] pl-4 text-3xl font-black leading-tight text-[#002147] uppercase sm:pl-6 md:text-4xl">
              Governance Transparency
            </h2>
            <p className="text-base font-medium text-slate-600 md:text-xl">
              Real-time monitoring of rural development projects and complaint
              resolution across the state.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-t-4 border-[#002147] bg-slate-50 p-8 shadow-sm">
                <h4 className="mb-1 text-4xl font-black tracking-tight text-[#002147] md:text-5xl">
                  85.4%
                </h4>
                <p className="text-xs font-black text-slate-500 uppercase">
                  Grievance Resolution Rate
                </p>
              </div>
              <div className="border-t-4 border-[#e67e22] bg-slate-50 p-8 shadow-sm">
                <h4 className="mb-1 text-4xl font-black tracking-tight text-[#e67e22] md:text-5xl">
                  12,402
                </h4>
                <p className="text-xs font-black text-slate-500 uppercase">
                  Ongoing Infrastructure Projects
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="border border-slate-300 bg-white shadow-sm">
              <div
                className="h-48 border-b border-slate-200 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCXAGavzmlpZw5esy2lzmIzekc0x-HDHTu1VFdcdIQYTVxwbpnhvBppA0EKASCE1_le1sjDr9cJ6L4Dk6m37Vd3guYmImFYDOGQbw4JmmUWIR7sZJp4aseoz_NVKl_zeqNguvYCy3st3xbv_dnbH18ApHyp4c9_KrRcMm13udwAXOrhGHk6w4Ep7MkeBWrcB2-AChZRUqm4HaOdm1KO7YwndQ3CrnuP35Vr_h0FF_d8TxcaRSovK22hmJKuTQC4P-oeOFL0550pW_N')",
                }}
              />
              <div className="p-5 sm:p-8">
                <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
                  <div>
                    <span className="mb-1 block text-[10px] font-black tracking-widest text-[#e67e22] uppercase">
                      Model Village Profile
                    </span>
                    <h3 className="text-2xl font-bold text-[#002147]">
                      Kharadi, Pune District
                    </h3>
                  </div>
                  <span className="bg-green-700 px-3 py-1 text-[10px] font-bold text-white uppercase">
                    Certified Platinum
                  </span>
                </div>

                <div className="mb-8 space-y-4 border-y border-slate-100 py-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold tracking-tighter text-slate-500 uppercase">
                      Total Inhabitants
                    </span>
                    <span className="font-bold text-[#002147]">14,250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold tracking-tighter text-slate-500 uppercase">
                      Revenue Collection
                    </span>
                    <span className="font-bold text-green-700">
                      98.2% Compliance
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold tracking-tighter text-slate-500 uppercase">
                      Pending Litigations
                    </span>
                    <span className="font-bold text-[#002147]">02 Case(s)</span>
                  </div>
                </div>

                <button className="w-full border border-[#002147] bg-[#002147] py-4 text-sm font-bold text-white uppercase transition-all hover:bg-slate-800">
                  Access Statistical Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
