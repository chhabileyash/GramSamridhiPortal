"use client";

export default function CitizenJourneyGuide() {
  return (
    <section className="border-b border-slate-200 bg-white py-14 md:py-20 ">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#002147] uppercase">
            Citizen Journey Guide
          </h2>
          <div className="mx-auto h-1 w-24 bg-[#e67e22]" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#002147]/30 hover:bg-white hover:shadow-xl sm:p-8">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#002147] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#e67e22]">
              01
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#002147] transition-colors duration-300 group-hover:text-[#e67e22]">
              Identify Location
            </h3>
            <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
              Select your Administrative District and Taluka to locate your
              specific Gram Panchayat office.
            </p>
          </div>
          <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#002147]/30 hover:bg-white hover:shadow-xl sm:p-8">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#002147] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#e67e22]">
              02
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#002147] transition-colors duration-300 group-hover:text-[#e67e22]">
              Select Service
            </h3>
            <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
              Access official services including tax payments, certificate
              applications, or scheme enrollment.
            </p>
          </div>
          <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#002147]/30 hover:bg-white hover:shadow-xl sm:p-8">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#002147] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#e67e22]">
              03
            </div>
            <h3 className="mb-4 text-xl font-bold text-[#002147] transition-colors duration-300 group-hover:text-[#e67e22]">
              Online Fulfillment
            </h3>
            <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
              Provide necessary documentation and complete the application
              process through our secure portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
