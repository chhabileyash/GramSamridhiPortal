import { BadgeHelpIcon } from "lucide-react";

export default function FloatingSupport() {
  return (
    <div className="fixed bottom-3 right-3 z-100 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
      <button className="flex items-center gap-2 rounded-sm border border-white bg-[#002147] px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm">
        <BadgeHelpIcon />
        <span className="hidden sm:inline">Citizen Support</span>
      </button>
    </div>
  );
}
