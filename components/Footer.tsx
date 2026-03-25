import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-[#2F5E3D] text-white pt-14 pb-6 mt-10"
      data-purpose="main-footer"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-lg font-bold mb-5 text-[#E2E8F0]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-[15px] text-[#A7F3D0] m-0 list-none p-0">
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/home" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/schemes" className="hover:text-white transition-colors">Schemes</Link>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              </li>
              <li className="flex items-center gap-2 group">
                <span className="text-[10px]">&rsaquo;</span>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-[#E2E8F0]">
              Important Links
            </h3>
            <ul className="space-y-3 text-[15px] text-[#A7F3D0] m-0 list-none p-0">
              <li className="flex items-center gap-2">
                <span className="text-[10px]">&rsaquo;</span> Govermaniza of
                mulia.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[10px]">&rsaquo;</span> Minavy ou fnand
                levvelopment
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[10px]">&rsaquo;</span> utso it eat
                bravelopment expert..
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[10px]">&rsaquo;</span> Digitial mdla.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-[#E2E8F0]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-[14px] text-[#A7F3D0] m-0 list-none p-0 opacity-90">
              <li className="flex items-start space-x-3">
                <span className="text-white mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>+35-8876549010</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-white mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span className="break-all">
                  f:jspom@jrenserridhtrii, tpim.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-white mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>1105 gprnsamridhage trit.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-[#E2E8F0]">
              Get in Touch
            </h3>
            <div className="flex space-x-3 mb-6">
              <div className="w-[34px] h-[34px] bg-[#1DA1F2] rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16.01 6.01 17.25 7.89 17.28C6.41 18.45 4.54 19.14 2.5 19.14C2.15 19.14 1.8 19.12 1.45 19.08C3.33 20.29 5.56 21 8 21C15.86 21 20.16 14.49 20.16 8.85C20.16 8.67 20.16 8.48 20.15 8.3C20.98 7.7 21.71 6.91 22.46 6Z" />
                </svg>
              </div>
              <div className="w-[34px] h-[34px] bg-[#4267B2] rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325V22.676C0 23.407 0.593 24 1.325 24H12.82V14.706H9.692V11.084H12.82V8.413C12.82 5.313 14.713 3.625 17.479 3.625C18.804 3.625 19.942 3.724 20.274 3.768V6.966L18.356 6.967C16.852 6.967 16.561 7.682 16.561 8.73V11.084H20.148L19.675 14.706H16.561V24H22.677C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0Z" />
                </svg>
              </div>
              <div className="w-[34px] h-[34px] bg-[#FF0000] rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
            </div>
            <ul className="space-y-3 text-[14px] text-[#A7F3D0] m-0 list-none p-0 opacity-90">
              <li className="flex items-center gap-3">
                <span className="text-[12px] opacity-80">&rsaquo;</span> Terme
                &amp; Conbliutere
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[12px] opacity-80">&rsaquo;</span> Pronby
                Pedey
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[12px] opacity-80">&rsaquo;</span>{" "}
                Accesibiity Sutement
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-[13px] text-[#A7F3D0] opacity-80">
          2034 Gram Samridhi Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
