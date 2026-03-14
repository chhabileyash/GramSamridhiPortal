export default function LatestUpdates() {
  return (
    <div className="flex items-center overflow-hidden border-b border-slate-200 bg-white py-2">
          <div className="z-10 ml-8 whitespace-nowrap bg-[#e67e22] px-4 py-1 text-xs font-black tracking-widest text-white uppercase">
            LATEST UPDATES:
          </div>
          <div className="w-full overflow-hidden bg-white pl-[100%] box-content flex-1">
            <div className="inline-block whitespace-nowrap pr-[100%] box-content animate-[ticker_30s_linear_infinite]">
              <span className="mx-8 text-xs font-bold text-[#002147] uppercase">
                ● Circular 442/2024: New guidelines for Rural Water Management
                implementation
              </span>
              <span className="mx-8 text-xs font-bold text-[#002147] uppercase">
                ● Applications open for Maha-Krushi Samrudhi Yojana 2024-25
              </span>
              <span className="mx-8 text-xs font-bold text-[#002147] uppercase">
                ● Important: Digital Signature mandatory for all Sarpanch
                administrative approvals from June 1st
              </span>
              <span className="mx-8 text-xs font-bold text-[#002147] uppercase">
                ● E-Tendering process for Grade B Village Pavements now live on
                state portal
              </span>
            </div>
          </div>
        </div>
  );
}
