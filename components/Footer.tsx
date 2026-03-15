import { ChevronRight, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-8 border-[#f57b20] bg-[#0f766e] py-14 text-slate-300 md:py-20">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* <div className="flex size-10 items-center justify-center bg-[#0f766e] text-white">
                    <Landmark className="text-2xl" />
                  </div> */}
              <h2 className="text-lg font-black tracking-wider text-white uppercase">
                Gram Samridhi Portal
              </h2>
            </div>
            <p className="border-l border-slate-600 pl-4 text-sm leading-relaxed italic">
              The digital interface for the Rural Development Department,
              Government of Maharashtra. Committed to transparent local
              self-governance.
            </p>
          </div>

          <div>
            <h3 className="mb-8 border-b border-white/10 pb-2 text-xs font-black tracking-[0.3em] text-white uppercase">
              Information Portal
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase">
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Home
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Online Tax Portal
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Village Directory
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  RTI Disclosures
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Citizen Charter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-8 border-b border-white/10 pb-2 text-xs font-black tracking-[0.3em] text-white uppercase">
              Government Agencies
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase">
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Rural Development Dept
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Mahaswayam Portal
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Digital India (MH)
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 transition-colors hover:text-[#f57b20]"
                  href="#"
                >
                  <ChevronRight className="text-xs" />
                  Maha-Bhu-Abhilekh
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-8 border-b border-white/10 pb-2 text-xs font-black tracking-[0.3em] text-white uppercase">
              Administrative Helpdesk
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-3">
                <Phone className="text-xl text-[#f57b20]" />
                <div>
                  <p className="mb-1 text-[10px] font-black text-gray-500 uppercase">
                    Toll Free Helpline
                  </p>
                  <span className="font-bold text-white">1800-123-4567</span>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="text-xl text-[#f57b20]" />
                <div>
                  <p className="mb-1 text-[10px] font-black text-gray-500 uppercase">
                    Official Inquiry
                  </p>
                  <span className="break-all font-bold text-white">
                    help@maharashtra.gov.in
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
            &copy; 2024 Rural Development Department, Government of Maharashtra.{" "}
            <br className="md:hidden" />
            Designed for Accessibility &amp; Governance.
          </p>
        </div>
      </div>
    </footer>
  );
}
