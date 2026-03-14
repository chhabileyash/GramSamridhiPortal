import { Landmark, Languages } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-300 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center justify-center text-[#002147]">
            <Landmark
              className="size-9 sm:size-12 md:size-14"
              strokeWidth={2}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[14px] font-black leading-[1.1] tracking-tight text-[#002147] uppercase sm:text-[17px] md:text-[19px]">
              Gram Samridhi
              <br />
              Portal
            </h1>
            <p className="mt-0.5 hidden text-[11px] font-bold tracking-wider text-[#e67e22] uppercase sm:block">
              Government of Maharashtra
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 xl:flex">
          <a
            className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22]"
            href="/"
          >
            HOME
          </a>
          <a
            className="border-b-2 border-transparent py-1 text-[15px] font-black leading-tight text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
            href="/about"
          >
            About Us
          </a>
          <a
            className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
            href="/services"
          >
            Services
          </a>
          <a
            className="border-b-2 border-transparent py-1 text-[15px] font-black leading-tight text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
            href="/village-directory"
          >
            Village Directory
          </a>

          <div className="flex items-center gap-1 group cursor-pointer relative">
            <a
              className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all group-hover:border-[#e67e22] group-hover:text-[#e67e22] uppercase"
              href="/schemes"
            >
              Schemes
            </a>
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-6 md:gap-8">
          <button className="flex items-center gap-1 text-xs font-black text-[#1e293b] transition-colors hover:text-[#e67e22] sm:gap-2 sm:text-[14px]">
            <Languages className="size-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">MARATHI</span>
          </button>
          <Link
            href="/auth/signup"
            className="bg-[#002147] px-3 py-2 text-[11px] leading-tight font-black text-white uppercase shadow-sm transition-all hover:bg-slate-800 sm:px-5 sm:py-2.5 sm:text-[13px] md:px-8 md:py-3 md:text-[15px] text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
