"use client";

export default function CitizenCharter() {
  return (
    <section className="border-y-8 border-[#e67e22] bg-[#002147] py-14 text-white md:py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:gap-20 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-black leading-tight uppercase md:text-4xl">
              Citizen Charter &amp; <br />
              Complaint Registration
            </h2>
            <p className="font-medium text-slate-400">
              Our commitment to time-bound service delivery. If services are not
              rendered within the stipulated period, citizens have the right to
              appeal through our transparent complaint mechanism.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                <span className="flex size-12 items-center justify-center rounded-sm bg-[#e67e22] font-black text-white">
                  24h
                </span>
                <div>
                  <h4 className="text-sm font-bold uppercase">
                    Acknowledgement
                  </h4>
                  <p className="text-xs text-slate-400">
                    Receive tracking ID via Email within 24 hours of filing.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                <span className="flex size-12 items-center justify-center rounded-sm bg-slate-700 font-black text-white">
                  7d
                </span>
                <div>
                  <h4 className="text-sm font-bold uppercase">
                    Initial Review
                  </h4>
                  <p className="text-xs text-slate-400">
                    Assignment to relevant department and preliminary check.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                <span className="flex size-12 items-center justify-center rounded-sm bg-slate-700 font-black text-white">
                  15d
                </span>
                <div>
                  <h4 className="text-sm font-bold uppercase">
                    Final Resolution
                  </h4>
                  <p className="text-xs text-slate-400">
                    Closing the complaint with proof of resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-8 border-[#e67e22] bg-white p-5 text-[#002147] sm:p-8">
            <h3 className="mb-6 text-xl font-black uppercase">
              Quick Complaint Filing
            </h3>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                  Full Name (As per Aadhar)
                </label>
                <input
                  className="h-12 w-full pl-2 border border-slate-300 text-sm font-bold focus:border-[#002147] focus:ring-[#002147]"
                  placeholder="Enter name"
                  type="text"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                  Complaint Category
                </label>
                <select className="h-12 w-full border border-slate-300 text-sm font-bold focus:border-[#002147] focus:ring-[#002147]">
                  <option>-- Select Category --</option>
                  <option>Public Works (Roads/Drains)</option>
                  <option>Water Supply Issues</option>
                  <option>Sanitation &amp; Waste</option>
                  <option>Welfare Scheme Disbursement</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                  Brief Description
                </label>
                <textarea
                  className="h-24 w-full border border-slate-300 p-3 text-sm font-bold focus:border-[#002147] focus:ring-[#002147]"
                  placeholder="Describe your issue..."
                />
              </div>
              <button className="w-full bg-[#002147] py-4 text-sm font-black text-white uppercase shadow-md transition-all hover:bg-slate-800">
                Submit Formal Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
