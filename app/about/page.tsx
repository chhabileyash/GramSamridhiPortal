export default function AboutPage() {
  return (
    <>
      <div className="font-sans bg-[#F5F6F7] text-[#1F2933] min-h-screen">
        {/* BEGIN: Top Header */}
        <header
          className="bg-[#1F3A5A] text-white py-4"
          data-purpose="main-header"
        >
          <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-xs"
                data-purpose="logo-placeholder"
              >
                <img src="/logo.svg" alt="Logo" className="w-14 h-14 " />
              </div>
              <div>
                <h2 className="text-[22px] font-[600] leading-[1.2] leading-tight text-white mb-0">
                  Gram Samriddhi Portal
                </h2>
                <p className="text-[14px] opacity-80 mb-0">
                  Empowering Rural India
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-[14px]">
              <div className="flex items-center space-x-4 opacity-80">
                <span className="flex items-center gap-2">
                  <span className="cursor-pointer">A-</span> |{" "}
                  <span className="cursor-pointer font-bold bg-surface text-black px-1">
                    A
                  </span>{" "}
                  | <span className="cursor-pointer">A+</span>
                </span>
              </div>
              <button className="bg-accent px-[18px] py-[10px] rounded-[6px] font-semibold text-[16px] hover:brightness-110 transition">
                Register
              </button>
            </div>
          </div>
        </header>

        {/* BEGIN: Navigation Bar */}
        <nav
          className="bg-surface border-b border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] sticky top-0 z-50"
          data-purpose="primary-navigation"
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4">
            <ul className="flex items-center m-0 p-0 list-none divide-x divide-[#E0E0E0]">
              <li className="bg-[#1F3A5A] text-white px-6 py-4 font-semibold cursor-pointer">
                Home
              </li>
              <li className="px-6 py-4 hover:bg-[#eaeff5] cursor-pointer text-[#1F3A5A] font-medium">
                About Us
              </li>
              <li className="px-6 py-4 hover:bg-[#eaeff5] cursor-pointer text-[#1F3A5A] font-medium flex items-center gap-1">
                Schemes <span className="text-[10px]"></span>
              </li>
              <li className="px-6 py-4 hover:bg-[#eaeff5] cursor-pointer text-[#1F3A5A] font-medium flex items-center gap-1">
                Services <span className="text-[10px]"></span>
              </li>
              <li className="px-6 py-4 hover:bg-[#eaeff5] cursor-pointer text-[#1F3A5A] font-medium">
                Gallery
              </li>
              <li className="px-6 py-4 hover:bg-[#eaeff5] cursor-pointer text-[#1F3A5A] font-medium">
                Contact Us
              </li>
            </ul>
            <div className="relative w-64">
              <input
                className="w-full border border-[#E0E0E0] bg-[#eaeff5] rounded-[999px] py-2 px-4 text-[14px] focus:outline-none focus:border-blue-400 focus:bg-surface"
                placeholder="Search..."
                type="text"
              />
              <span className="absolute right-4 top-2 text-[#6B7280] font-bold"></span>
            </div>
          </div>
        </nav>

        {/* BEGIN: Alert Bar */}
        <div
          className="bg-[#FFF8F0] border-b border-blue-100 py-2"
          data-purpose="alert-information"
        >
          <div className="max-w-[1200px] mx-auto px-4 flex items-center space-x-3 text-[14px]">
            <span className="text-accent text-[16px]"></span>
            <p className="m-0 text-[#1F2933]">
              <strong>Covid-19 Information:</strong> Latest guidelines and
              vaccination details here.{" "}
              <span className="mx-2 text-[#E0E0E0]">|</span>
              <span className="text-accent font-semibold cursor-pointer hover:underline">
                Read More
              </span>
            </p>
          </div>
        </div>

                <main className="py-[40px] flex-grow bg-surface border-b border-[#E0E0E0]">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Page Title */}
            <header className="mb-[40px] text-center max-w-3xl mx-auto pt-8">
              <h1 className="text-[36px] text-[#1F3A5A] font-bold mb-4">About The Digital Portal</h1>
              <p className="text-[16px] text-[#4B5563] leading-relaxed">
                Welcome to the Gram Samriddhi Portal, the official digital gateway designed to bring administration closer to our citizens. This platform is a unified initiative to ensure transparency, accessibility, and efficiency in the delivery of rural services.
              </p>
            </header>

            {/* Mission & Vision Grid */}
            <div className="grid md:grid-cols-2 gap-[16px] mb-[40px]">
              {/* Mission */}
              <article className="bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] border border-[#E0E0E0] flex flex-col items-start relative overflow-hidden group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow">
                <div className="w-14 h-14 bg-[#E8F2E3] text-[#2E7D32] rounded-[999px] flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold mb-4">Our Mission</h2>
                <p className="text-[#4B5563] font-medium leading-[1.6]">
                  To empower rural administration through digital transformation, making government services instantly accessible to every citizen. We strive to provide a seamless interface that reduces administrative delays and strengthens grassroots democracy.
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E8F2E3] to-transparent rounded-bl-full opacity-50 -z-10 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
              </article>

              {/* Vision */}
              <article className="bg-[#FFFFFF] p-4 rounded-[10px] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] border border-[#E0E0E0] flex flex-col items-start relative overflow-hidden group hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-shadow">
                <div className="w-14 h-14 bg-[#FFF0E5] text-accent rounded-[999px] flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                </div>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold mb-4">Our Vision</h2>
                <p className="text-[#4B5563] font-medium leading-[1.6]">
                  To build a self-reliant and digitally informed rural India where every citizen has equal access to opportunities, socio-economic welfare schemes, and modern governance infrastructure from the comfort of their homes.
                </p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFF0E5] to-transparent rounded-bl-full opacity-50 -z-10 translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500"></div>
              </article>
            </div>
            
            {/* Objectives Section */}
            <section className="mb-[40px]">
              <header className="mb-[32px] border-b border-[#E0E0E0] pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-[999px] block"></span>
                <h2 className="text-[#1F3A5A] text-[28px] font-bold m-0">Our Objectives</h2>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
                {/* Obj 1 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#D0E1F9] text-[#1E3A5F] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">E-Governance</h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">To digitize panchayat records and service applications for faster processing.</p>
                </div>
                {/* Obj 2 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#D4EDDA] text-[#2E7D32] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">Transparency</h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">To offer open access to information regarding village funds and projects.</p>
                </div>
                {/* Obj 3 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#FDE9BD] text-[#D36C21] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">Accessibility</h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">To serve as a single online window for certificates, taxes, utilities.</p>
                </div>
                {/* Obj 4 */}
                <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#E0E0E0] shadow-[0px_2px_6px_rgba(0,0,0,0.08)] flex flex-col hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-[#F4F6F0] text-[#2E7D32] rounded-[10px] mb-5 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h3 className="text-[#1F3A5A] font-bold text-[22px] mb-3">Empowerment</h3>
                  <p className="text-[#4B5563] text-[16px] m-0 leading-relaxed">To educate rural populations about newly enacted welfare schemes.</p>
                </div>
              </div>
            </section>
          </div>
        </main>
{/* BEGIN: Footer */}
        <footer
          className="bg-[#2F5E3D] text-white pt-14 pb-6 mt-10"
          data-purpose="main-footer"
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-4 gap-[24px] mb-10">
              <div>
                <h3 className="text-[16px] font-bold mb-5 text-[#E2E8F0]">
                  Quick Links
                </h3>
                <ul className="space-y-3 text-[16px] text-[#A7F3D0] m-0 list-none p-0">
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> Home
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> About Us
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> Sentittena
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> sarizces
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> callecty
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] font-bold mb-5 text-[#E2E8F0]">
                  Important Links
                </h3>
                <ul className="space-y-3 text-[16px] text-[#A7F3D0] m-0 list-none p-0">
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> Govermaniza of
                    mulia.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[10px]">&rsaquo;</span> Minavy ou
                    fnand levvelopment
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
                <h3 className="text-[16px] font-bold mb-5 text-[#E2E8F0]">
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
                    </span>{" "}
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
                    </span>{" "}
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
                    </span>{" "}
                    <span>1105 gprnsamridhage trit.</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] font-bold mb-5 text-[#E2E8F0]">
                  Get in Touch
                </h3>
                <div className="flex space-x-3 mb-6">
                  <div className="w-[34px] h-[34px] bg-[#1DA1F2] rounded flex items-center justify-center cursor-pointer hover:opacity-90">
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
                  <div className="w-[34px] h-[34px] bg-[#4267B2] rounded flex items-center justify-center cursor-pointer hover:opacity-90">
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
                  <div className="w-[34px] h-[34px] bg-[#FF0000] rounded flex items-center justify-center cursor-pointer hover:opacity-90">
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
                    <span className="text-[12px] opacity-80">&rsaquo;</span>{" "}
                    Terme &amp; Conbliutere
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[12px] opacity-80">&rsaquo;</span>{" "}
                    Pronby Pedey
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[12px] opacity-80">&rsaquo;</span>{" "}
                    Accesibiity Sutement
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/20 pt-6 text-center text-[13px] text-[#A7F3D0] opacity-80">
              2034 Core Samriddhi Portal. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

