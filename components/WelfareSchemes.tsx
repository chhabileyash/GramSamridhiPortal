"use client";

import { ArrowRight } from "lucide-react";

export default function WelfareSchemes() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="w-full max-w-[1200px] mx-auto px-8">
            <h2 className="mb-12 text-center text-3xl font-black tracking-tight text-[#002147] uppercase">
              Public Welfare Schemes
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="Pradhan Mantri Awas Yojana"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWOAZULjffZQm6xdQbirErIl-J-6mWscmHOX9E8CCAJRwspUR2P9YprjvZ5o3HDIVVwYnrmaSgsL3rXPqLH3NbZzLYrv-GWUEQPWO2lmcZMxtFMkT8eKFsLP2L9EPvjDwxUs12r4MeuqYZ3H8d7wnGRKoZ4F2fG7TenMClPk4Za9mlRoJybccFEQh1pwbWIl-KQTQnTx7lluL7eQeFxWfqu_UHNneVoh5AJGUx1FKfR9i2n9bDrsyNR45I7nsbbZ7-K-ajPRCBt7uU')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#002147]">
                    PM Awas Yojana (Gramin)
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Financial assistance for construction of pucca houses for
                    rural homeless families.
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#002147] uppercase transition-all duration-300 hover:bg-[#e67e22] hover:text-white group-hover:border-[#e67e22]">
                    <span>Enrollment Details</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>

              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="MGNREGA"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0TeB0tP5FUL2JElm2ktfeeaX4M47Z8JsIg63J2OIleXttaYPVGcJzMPvBmKUcnnlbqbu2sWL3kdnjEp3bLdQKz1jQuiKuAR4u1gvTXAg__5JNjpL_laYCraygIDP6PBjQjs3j-soFn7KGLAZ7ZAj3moqIVEVCA9QQQXpdhrSOOSLIHnaVBdgMxQJazSvSzm4IFCYjVFu5m29sbo8xRp5reMy6a8qfrNG8iM_H10jJjc96Y34d4vK3zIYJf_sVvslKiigZx9AzGofj')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#002147]">
                    MGNREGA Employment
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Guaranteed wage employment for 100 days to adult members of
                    rural households.
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#002147] uppercase transition-all duration-300 hover:bg-[#e67e22] hover:text-white group-hover:border-[#e67e22]">
                    <span>Apply for Job Card</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>

              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="Jal Jeevan Mission"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUmhIXyJpB5-K_9GwN2HM0sggy8w8ARRo4SyUDgP2zKtXOTOTKIGFskGU5QClHH3bkf5ljoQhp-37da23Pjrk_WMa9vnvV9yDpvtzQBWgAtaGCL7BNbF5hGcMwsqT2hZ4XJdx4cucI8BAKrhhMKP_Ppc-Jc8zs5lt4ZZWTzhB4IkVEZRhWCSDW6NfDguQrHbMQnaDTroWEbXTIOgwML1mHUlGDosFYmtJd_a6r-RGdcd_xdHiDzO9g8RLZzSaRva7KOxL0GlKM8qdH')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#002147]">
                    Jal Jeevan Mission
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Infrastructure development to provide Functional Household
                    Tap Connections (FHTC).
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#002147] uppercase transition-all duration-300 hover:bg-[#e67e22] hover:text-white group-hover:border-[#e67e22]">
                    <span>Connection Status</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
