import { BadgeHelpIcon } from "lucide-react";

export default function FloatingSupport() {
  return (
    <div className="fixed right-8 bottom-8 z-100">
          <button className="flex items-center gap-3 rounded-sm border border-white bg-[#002147] px-6 py-4 font-bold text-white shadow-md transition-all hover:bg-slate-800">
            <BadgeHelpIcon />
            <span>Citizen Support</span>
          </button>
        </div>
  );
}
