import { Landmark, Languages } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
          <div className="w-full max-w-300 mx-auto px-8 flex h-22 items-center justify-between">
            <div className="flex items-center gap-4 ">
              <div className="flex items-center justify-center text-[#002147]">
                <Landmark className="size-14" strokeWidth={2} />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-[19px] font-black leading-[1.1] tracking-tight text-[#002147] uppercase">
                  Gram Samridhi
                  <br />
                  Portal
                </h1>
                <p className="mt-0.5 text-[11px] font-bold tracking-wider text-[#e67e22] uppercase">
                  Government of Maharashtra
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 xl:flex">
              <a
                className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22]"
                href="#"
              >
                HOME
              </a>
              <a
                className="border-b-2 border-transparent py-1 text-[15px] font-black leading-tight text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
                href="#"
              >
                About Us
              </a>
              <a
                className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
                href="#"
              >
                Services
              </a>
              <a
                className="border-b-2 border-transparent py-1 text-[15px] font-black leading-tight text-[#1e293b] transition-all hover:border-[#e67e22] hover:text-[#e67e22] uppercase text-center"
                href="#"
              >
                Village Directory
              </a>

              <div className="flex items-center gap-1 group cursor-pointer relative">
                <a
                  className="border-b-2 border-transparent py-1 text-[15px] font-black text-[#1e293b] transition-all group-hover:border-[#e67e22] group-hover:text-[#e67e22] uppercase"
                  href="#"
                >
                  Schemes
                </a>
              </div>
            </nav>

            <div className="flex items-center gap-10">
              <button className="flex items-center gap-2 text-[15px] font-black text-[#1e293b] hover:text-[#e67e22] transition-colors">
                <Languages className="size-5" strokeWidth={2.5} />
                MARATHI
              </button>
              <button className="bg-[#002147] px-8 py-3 text-[15px] leading-tight font-black text-white uppercase shadow-sm transition-all hover:bg-slate-800 text-center">
                Login
              </button>
            </div>
          </div>
        </header>
  );
}
