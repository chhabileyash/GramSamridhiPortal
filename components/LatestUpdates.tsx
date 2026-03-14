export default function LatestUpdates() {
  return (
    <div className="flex items-center overflow-hidden border-b border-slate-200 bg-white py-2">
      <div className="z-10 ml-3 whitespace-nowrap bg-[#e67e22] px-3 py-1 text-[10px] font-black tracking-[0.15em] text-white uppercase sm:ml-4 sm:px-4 sm:text-xs sm:tracking-widest">
        LATEST UPDATES:
      </div>
      <div className="w-full overflow-hidden bg-white pl-[100%] box-content flex-1">
        <div className="inline-block whitespace-nowrap pr-[100%] box-content animate-[ticker_30s_linear_infinite]">
          <span className="mx-5 text-[10px] font-bold text-[#002147] uppercase sm:mx-8 sm:text-xs">
            ● Circular 442/2024: New guidelines for Rural Water Management
            implementation
          </span>
          <span className="mx-5 text-[10px] font-bold text-[#002147] uppercase sm:mx-8 sm:text-xs">
            ● Applications open for Maha-Krushi Samrudhi Yojana 2024-25
          </span>
          <span className="mx-5 text-[10px] font-bold text-[#002147] uppercase sm:mx-8 sm:text-xs">
            ● Important: Digital Signature mandatory for all Sarpanch
            administrative approvals from June 1st
          </span>
          <span className="mx-5 text-[10px] font-bold text-[#002147] uppercase sm:mx-8 sm:text-xs">
            ● E-Tendering process for Grade B Village Pavements now live on
            state portal
          </span>
        </div>
      </div>
    </div>
  );
}
