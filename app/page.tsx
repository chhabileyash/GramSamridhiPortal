"use client";

import Link from "next/link";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

export default function Home() {
  return (
    <>
      <div className="font-sans bg-[#F5F6F7] text-[#2B2B2B] min-h-screen">
       
        <section
          className="relative bg-white overflow-hidden border-b border-gray-200 min-h-[450px]"
          data-purpose="hero-section">
          
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('./bg.png')",
              backgroundSize: "cover"

            }}>
            
            {}
          </div>
          <div className="max-w-300 mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-12 h-full items-center min-h-[450px]">
            <div className="col-span-1 md:col-span-8 lg:col-span-7 text-center md:text-left pl-0 md:pl-8 py-16 md:py-0">
              <h1 className="text-[#1F4E79] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-sm">
                Welcome to <br className="hidden sm:block" />
                <span className="text-[#F28C28]">Gram Samridhi Portal</span>!
              </h1>
              <p className="mt-2 text-lg sm:text-xl text-gray-800 mb-8 font-medium md:max-w-[80%] mx-auto md:mx-0 drop-shadow-sm">
                Empowering our villages with digital transparent information and
                essential localized services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="/about"
                  className="bg-[#F28C28] text-white px-8 py-3.5 rounded-md font-bold hover:bg-[#e07b1e] transition-all shadow-lg hover:shadow-xl active:scale-95 text-lg w-full sm:w-auto flex items-center justify-center">
                  
                  Learn More
                </a>
                <a
                  href="/schemes"
                  className="bg-white text-[#1F4E79] border-2 border-[#1F4E79] px-8 py-3.5 rounded-md font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95 text-lg w-full sm:w-auto flex items-center justify-center">
                  
                  Discover Schemes
                </a>
              </div>
            </div>
            <div className="hidden md:flex col-span-1 md:col-span-4 lg:col-span-5 justify-end items-end h-full"></div>
          </div>
        </section>

        {}
        <section
          className="py-12 -mt-20 relative z-20"
          data-purpose="service-cards">
          
          <div className="max-w-300 mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {}
              <div className="bg-white p-6 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-[320px] relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-full h-20 z-0 overflow-hidden pointer-events-none">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none">
                    
                    <path
                      d="M0,30 C150,50 250,10 400,30 L400,80 L0,80 Z"
                      fill="#FDE9BD"
                      opacity="0.8" />
                    
                    <path
                      d="M0,50 C100,70 300,20 400,50 L400,80 L0,80 Z"
                      fill="#FCAF4A" />
                    
                  </svg>
                </div>
                <div className="flex items-start space-x-4 mb-4 relative z-10 w-full text-left">
                  <div className="w-[68px] h-[68px] flex flex-col items-center justify-end shrink-0 pt-2">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      
                      <path
                        d="M25 85C25 68 36 58 50 58C64 58 75 68 75 85V90H25V85Z"
                        fill="#D36C21" />
                      
                      <path
                        d="M35 90V75C35 70 40 65 50 65C60 65 65 70 65 75V90H35Z"
                        fill="#4CAF50" />
                      
                      <circle cx="50" cy="50" r="16" fill="#F4C698" />
                      <path
                        d="M50 49 Q45 49 42 45 Q50 38 58 45 Q55 49 50 49Z"
                        fill="white" />
                      
                      <rect
                        x="30"
                        y="32"
                        width="40"
                        height="10"
                        rx="3"
                        fill="#E88328" />
                      
                      <path
                        d="M25 40C25 35 40 30 50 30C60 30 75 35 75 40H25Z"
                        fill="#D36C21" />
                      
                    </svg>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-[#1F4E79] font-bold text-[22px] leading-[1.2] m-0">
                      Panchayat
                      <br />
                      Schemes
                    </h3>
                  </div>
                </div>
                <div className="text-[15px] text-[#4A4A4A] mb-6 grow leading-[1.6] relative z-10 font-medium pr-2">
                  <p className="m-0">Discover various government</p>
                  <p className="m-0">schemes available for</p>
                  <p className="m-0">rural development.</p>
                </div>
                <div className="relative z-10 mt-auto pb-1">
                  <a
                    href="/schemes"
                    className="w-full bg-linear-to-b from-[#F28C28] to-[#E67E22] text-white py-2.75 rounded-sm text-[15px] font-bold shadow-[0_4px_10px_rgba(242,140,40,0.3)] hover:brightness-110 transition border border-[#D35400]/20 flex items-center justify-center">
                    
                    Explore Schemes
                  </a>
                </div>
              </div>
              {}
              <div className="bg-white p-6 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-[320px] relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-full h-[80px] z-0 overflow-hidden pointer-events-none">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none">
                    
                    <path
                      d="M0,30 C150,50 250,10 400,30 L400,80 L0,80 Z"
                      fill="#D4EDDA"
                      opacity="0.8" />
                    
                    <path
                      d="M0,50 C100,70 300,20 400,50 L400,80 L0,80 Z"
                      fill="#81C784" />
                    
                  </svg>
                </div>
                <div className="flex items-start space-x-4 mb-4 relative z-10 w-full text-left">
                  <div className="w-[68px] h-[68px] flex items-center justify-center shrink-0">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      
                      <rect
                        x="25"
                        y="15"
                        width="50"
                        height="70"
                        rx="6"
                        fill="#2E7D32" />
                      
                      <rect
                        x="35"
                        y="30"
                        width="30"
                        height="4"
                        rx="2"
                        fill="white" />
                      
                      <rect
                        x="35"
                        y="45"
                        width="30"
                        height="4"
                        rx="2"
                        fill="white" />
                      
                      <rect
                        x="35"
                        y="60"
                        width="20"
                        height="4"
                        rx="2"
                        fill="white" />
                      
                      <circle cx="75" cy="75" r="15" fill="#F28C28" />
                      <path
                        d="M70 75L73 78L80 71"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                      
                    </svg>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-[#1F4E79] font-bold text-[22px] leading-[1.2] m-0">
                      Online
                      <br />
                      Services
                    </h3>
                  </div>
                </div>
                <div className="text-[15px] text-[#4A4A4A] mb-6 flex-grow leading-[1.6] relative z-10 font-medium pr-2">
                  <p className="m-0">Apply online for certificates,</p>
                  <p className="m-0">pensions and other gram</p>
                  <p className="m-0">panchayat services.</p>
                </div>
                <div className="relative z-10 mt-auto pb-1">
                  <a
                    href="/property-tax-filling"
                    className="w-full bg-gradient-to-b from-[#4CAF50] to-[#2E7D32] text-white py-[11px] rounded-sm text-[15px] font-bold shadow-[0_4px_10px_rgba(46,125,50,0.3)] hover:brightness-110 transition border border-[#1B5E20]/20 flex items-center justify-center">
                    
                    Apply Now
                  </a>
                </div>
              </div>
              {}
              <div className="bg-white p-6 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-[320px] relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-full h-[80px] z-0 overflow-hidden pointer-events-none">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none">
                    
                    <path
                      d="M0,30 C150,50 250,10 400,30 L400,80 L0,80 Z"
                      fill="#D0E1F9"
                      opacity="0.8" />
                    
                    <path
                      d="M0,50 C100,70 300,20 400,50 L400,80 L0,80 Z"
                      fill="#89B4E5" />
                    
                  </svg>
                </div>
                <div className="flex items-start space-x-4 mb-4 relative z-10 w-full text-left">
                  <div className="w-[68px] h-[68px] flex items-center justify-center shrink-0">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      
                      <path
                        d="M25 25C25 22 27 20 30 20H80C83 20 85 22 85 25V75C85 78 83 80 80 80H30C27 80 25 78 25 75V25Z"
                        fill="#1E3A5F" />
                      
                      <path
                        d="M15 35C15 32 17 30 20 30H25V80H20C17 80 15 78 15 75V35Z"
                        fill="#4B6A90" />
                      
                      <rect
                        x="35"
                        y="32"
                        width="20"
                        height="20"
                        rx="2"
                        fill="#E2E8F0" />
                      
                      <rect
                        x="60"
                        y="35"
                        width="15"
                        height="4"
                        rx="2"
                        fill="#E2E8F0" />
                      
                      <rect
                        x="60"
                        y="45"
                        width="15"
                        height="4"
                        rx="2"
                        fill="#E2E8F0" />
                      
                      <rect
                        x="35"
                        y="60"
                        width="40"
                        height="4"
                        rx="2"
                        fill="#E2E8F0" />
                      
                    </svg>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-[#1F4E79] font-bold text-[22px] leading-[1.2] m-0">
                      Latest
                      <br />
                      Updates
                    </h3>
                  </div>
                </div>
                <div className="text-[15px] text-[#4A4A4A] mb-6 flex-grow leading-[1.6] relative z-10 font-medium pr-2">
                  <p className="m-0">Read the latest news,</p>
                  <p className="m-0">announcements, and event</p>
                  <p className="m-0">updates.</p>
                </div>
                <div className="relative z-10 mt-auto pb-1">
                  <a
                    href="/notifications"
                    className="w-full bg-gradient-to-b from-[#345B8E] to-[#1F4E79] text-white py-[11px] rounded-sm text-[15px] font-bold shadow-[0_4px_10px_rgba(31,78,121,0.3)] hover:brightness-110 transition border border-[#112E4A]/20 flex items-center justify-center">
                    
                    View Updates
                  </a>
                </div>
              </div>
              {}
              <div className="bg-white p-6 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-[320px] relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-full h-[80px] z-0 overflow-hidden pointer-events-none">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none">
                    
                    <path
                      d="M0,30 C150,50 250,10 400,30 L400,80 L0,80 Z"
                      fill="#FDE9BD"
                      opacity="0.8" />
                    
                    <path
                      d="M0,50 C100,70 300,20 400,50 L400,80 L0,80 Z"
                      fill="#FCAF4A" />
                    
                  </svg>
                </div>
                <div className="flex items-start space-x-4 mb-4 relative z-10 w-full text-left">
                  <div className="w-[68px] h-[68px] flex items-center justify-center shrink-0">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      
                      <circle cx="50" cy="42" r="14" fill="#F4C698" />
                      <path
                        d="M25 85C25 72 38 66 50 66C62 66 75 72 75 85V90H25V85Z"
                        fill="#D4E0E8" />
                      
                      <path
                        d="M26 40C26 26 36 17 50 17C64 17 74 26 74 40"
                        stroke="#F28C28"
                        strokeWidth="6"
                        strokeLinecap="round" />
                      
                      <rect
                        x="22"
                        y="38"
                        width="8"
                        height="16"
                        rx="4"
                        fill="#E67E22" />
                      
                      <rect
                        x="70"
                        y="38"
                        width="8"
                        height="16"
                        rx="4"
                        fill="#E67E22" />
                      
                      <path
                        d="M74 50C74 62 65 70 58 70"
                        stroke="#F28C28"
                        strokeWidth="4"
                        strokeLinecap="round" />
                      
                      <circle cx="54" cy="70" r="4" fill="#D35400" />
                    </svg>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-[#1F4E79] font-bold text-[22px] leading-[1.2] m-0">
                      Gram Panchayat
                      <br />
                      Contact
                    </h3>
                  </div>
                </div>
                <div className="text-[15px] text-[#4A4A4A] mb-6 flex-grow leading-[1.6] relative z-10 font-medium pr-2">
                  <p className="m-0">Get in touch with your local</p>
                  <p className="m-0">Gram Panchayat</p>
                  <p className="m-0">representatives.</p>
                </div>
                <div className="relative z-10 mt-auto pb-1">
                  <a
                    href="/panchayat-members"
                    className="w-full bg-gradient-to-b from-[#F28C28] to-[#E67E22] text-white py-[11px] rounded-sm text-[15px] font-bold shadow-[0_4px_10px_rgba(242,140,40,0.3)] flex justify-between items-center px-6 hover:brightness-110 transition border border-[#D35400]/20">
                    
                    <span>Read More</span>{" "}
                    <span className="font-black text-lg leading-none">
                      &gt;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <main className="py-6">
          <div className="max-w-[1200px] mx-auto px-4">
            {}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-stretch">
              <div className="col-span-1 lg:col-span-8 flex flex-col h-full">
                {}
                <section
                  data-purpose="key-initiatives"
                  className="flex flex-col h-full flex-grow">
                  
                  <div className="flex justify-between items-center mb-6 shrink-0">
                    <h2 className="text-[#1F4E79] text-[24px] font-bold whitespace-nowrap pr-4 m-0 leading-none">
                      Our Key Initiatives
                    </h2>
                    <div className="h-[1px] bg-gray-200 flex-grow mt-1"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
                    {}
                    <div className="bg-[#F4F6F0] rounded-sm overflow-hidden shadow-sm flex flex-col h-full border border-[rgba(0,0,0,0.05)] shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]">
                      <div className="p-5 flex-grow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-[52px] h-[52px] shrink-0">
                            {}
                            <svg
                              viewBox="0 0 64 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              
                              <path
                                d="M12 40A8 8 0 1 0 12 56A8 8 0 0 0 12 40ZM12 44A4 4 0 1 1 12 52A4 4 0 0 1 12 44Z"
                                fill="#3B763D" />
                              
                              <path
                                d="M48 40A8 8 0 1 0 48 56A8 8 0 0 0 48 40ZM48 44A4 4 0 1 1 48 52A4 4 0 0 1 48 44Z"
                                fill="#3B763D" />
                              
                              <path d="M22 28L28 28V20H22V28Z" fill="#3B763D" />
                              <path d="M8 32H20V28H8V32Z" fill="#3B763D" />
                              <path
                                d="M44 48H16V36H44V48Z"
                                fill="#88C45A"
                                opacity="0.3" />
                              
                              <path d="M42 36L46 24H32V36H42Z" fill="#3B763D" />
                              <path d="M34 26H44L41 34H34V26Z" fill="#F4F6F0" />
                              <path
                                d="M52 36C52 36 50 32 46 32H44V36H52Z"
                                fill="#3B763D" />
                              
                              <path d="M8 24H20V20H8V24Z" fill="#88C45A" />
                              <path d="M4 48H18V44H4V48Z" fill="#3B763D" />
                              <path d="M28 48H42V44H28V48Z" fill="#3B763D" />
                              <path
                                d="M28 56H42 M4 56H8"
                                stroke="#88C45A"
                                strokeWidth="3"
                                strokeLinecap="round" />
                              
                            </svg>
                          </div>
                          <h3 className="text-[19px] font-bold text-[#2A5E2E] leading-[1.2] m-0">
                            Agriculture
                            <br />
                            Development
                          </h3>
                        </div>
                        <p className="text-[15px] text-[#4A554A] m-0 pr-2">
                          Improving farming practices and providing support
                        </p>
                      </div>
                      <button className="w-full bg-[#3B763D] text-white py-[12px] font-semibold text-[15px] hover:bg-[#2F6131] transition-colors leading-none">
                        Explore Schemes
                      </button>
                    </div>

                    {}
                    <div className="bg-[#FDF4E7] rounded-sm overflow-hidden shadow-sm flex flex-col h-full border border-[rgba(0,0,0,0.05)] shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]">
                      <div className="p-5 flex-grow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-[52px] h-[52px] shrink-0">
                            {}
                            <svg
                              viewBox="0 0 64 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              
                              <circle cx="20" cy="24" r="6" fill="#D38A4B" />
                              <path
                                d="M12 48C12 40 16 34 20 34C24 34 28 40 28 48H12Z"
                                fill="#F4B860" />
                              
                              <circle cx="44" cy="24" r="6" fill="#A56336" />
                              <path
                                d="M36 48C36 40 40 34 44 34C48 34 52 40 52 48H36Z"
                                fill="#D38A4B" />
                              
                              <circle cx="32" cy="18" r="7" fill="#8B4513" />
                              <path
                                d="M22 48C22 38 27 30 32 30C37 30 42 38 42 48H22Z"
                                fill="#7A4016" />
                              
                            </svg>
                          </div>
                          <h3 className="text-[19px] font-bold text-[#5A3825] leading-[1.2] m-0">
                            Village
                            <br />
                            Infrastucture
                          </h3>
                        </div>
                        <p className="text-[15px] text-[#5A4F45] m-0 pr-2">
                          Enhancing roads, water, and sanitation facilities.
                        </p>
                      </div>
                      <button className="w-full bg-[#E5781E] text-white py-[12px] font-semibold text-[15px] hover:bg-[#D46A15] transition-colors leading-none tracking-wide text-center">
                        <span className="opacity-70 mr-1 font-normal">
                          &lsaquo;
                        </span>{" "}
                        Apply Now{" "}
                        <span className="opacity-70 ml-1 font-normal">
                          &rsaquo;
                        </span>
                      </button>
                    </div>

                    {}
                    <div className="bg-[#EFF2F5] rounded-sm overflow-hidden shadow-sm flex flex-col h-full border border-[rgba(0,0,0,0.05)] shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]">
                      <div className="p-5 flex-grow">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-[52px] h-[52px] shrink-0 pt-1">
                            {}
                            <svg
                              viewBox="0 0 64 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              
                              <rect
                                x="10"
                                y="16"
                                width="44"
                                height="28"
                                rx="2"
                                fill="#4B637B" />
                              
                              <rect
                                x="13"
                                y="19"
                                width="38"
                                height="22"
                                fill="#DDE4EA" />
                              
                              <path d="M28 44H36V50H28V44Z" fill="#95A5A6" />
                              <path d="M20 50H44V54H20V50Z" fill="#BDC3C7" />
                              <path
                                d="M13 32L21 26L29 32L39 19H51V41H13V32Z"
                                fill="#F4A261"
                                opacity="0.6" />
                              
                              <path
                                d="M13 36L25 28L33 34L45 22V41H13V36Z"
                                fill="#2ECC71"
                                opacity="0.6" />
                              
                              <path
                                d="M13 41V38L21 34L35 40L51 28V41H13Z"
                                fill="#3498DB"
                                opacity="0.7" />
                              
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-[19px] font-bold text-[#193255] leading-[1.2] m-0">
                              E-Governance
                            </h3>
                            <div className="h-[2px] w-[38px] bg-[#E5781E] mt-2"></div>
                          </div>
                        </div>
                        <p className="text-[15px] text-[#424A55] m-0 pr-2">
                          Digital solutions for transparent village
                          adminstration.
                        </p>
                      </div>
                      <button className="w-full bg-[#193255] text-white py-[12px] font-semibold text-[15px] hover:bg-[#11243F] transition-colors leading-none text-center">
                        View Updates{" "}
                        <span className="font-normal opacity-80">&rsaquo;</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
              <div className="col-span-1 lg:col-span-4 flex flex-col h-full mt-8 lg:mt-0">
                {}
                <div className="bg-white rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[#EAECEA] flex flex-col overflow-hidden h-full">
                  <div className="bg-gradient-to-b from-[#FAF9F5] to-[#F1F0EB] px-5 py-4 border-b border-[#EAECEA] shrink-0">
                    <h3 className="m-0 text-[#2C3440] text-[19px] font-bold tracking-tight">
                      Gram Panchayat at a Glance
                    </h3>
                  </div>
                  <ul className="px-5 py-2 m-0 list-none flex flex-col flex-grow justify-evenly pb-4">
                    <li className="flex items-center border-b border-[#F0F0F0] py-[14px] last:border-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {}
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          
                          <path
                            d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z"
                            fill="#3B763D" />
                          
                          <path
                            d="M8 14L12 12V6"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                          
                          <path
                            d="M16 14L12 12L7 9"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                          
                          <path
                            d="M12 12L17 10"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                          
                        </svg>
                      </div>
                      <div className="flex items-baseline space-x-2 ml-1">
                        <strong className="text-[#2A5E2E] text-[22px] font-bold tracking-tight">
                          256
                        </strong>
                        <span className="text-[#515751] text-[16px]">
                          Villages Covered
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center border-b border-[#F0F0F0] py-[14px] last:border-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {}
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          
                          <path
                            d="M12 22V12 M12 12C12 12 5 10 5 4C5 4 10 3 12 8 M12 12C12 12 19 10 19 4C19 4 14 3 12 8"
                            stroke="#E5781E"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                          
                        </svg>
                      </div>
                      <div className="flex items-baseline space-x-2 ml-1">
                        <strong className="text-[#2A5E2E] text-[22px] font-bold tracking-tight">
                          1,432
                        </strong>
                        <span className="text-[#515751] text-[16px]">
                          Schemes implemented
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center border-b border-[#F0F0F0] py-[14px] last:border-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {}
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            fill="#3B763D" />
                          
                          <path
                            d="M5 21C5 17.6863 7.68629 15 11 15H13C16.3137 15 19 17.6863 19 21"
                            fill="#3B763D" />
                          
                        </svg>
                      </div>
                      <div className="flex items-baseline space-x-2 ml-1">
                        <strong className="text-[#2A5E2E] text-[22px] font-bold tracking-tight">
                          345
                        </strong>
                        <span className="text-[#515751] text-[16px]">
                          Registered Users
                        </span>
                      </div>
                    </li>
                    <li className="flex items-center border-b border-[#F0F0F0] py-[14px] last:border-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {}
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          
                          <path
                            d="M3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13H3Z"
                            fill="#3B763D" />
                          
                          <path
                            d="M6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9H6Z"
                            fill="#A8D5BA"
                            opacity="0.6" />
                          
                          <path
                            d="M12 9H18C18 6.5 16 4.5 13.5 4L12 9Z"
                            fill="#3B763D" />
                          
                          <rect
                            x="2"
                            y="11"
                            width="20"
                            height="2"
                            fill="#2A5E2E"
                            rx="1" />
                          
                        </svg>
                      </div>
                      <div className="flex items-baseline space-x-2 ml-1">
                        <strong className="text-[#2A5E2E] text-[22px] font-bold tracking-tight">
                          1,230
                        </strong>
                        <span className="text-[#515751] text-[16px]">
                          Grievances Resolved
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {}
            <div className="w-full h-[1px] bg-[#EAECEA] mb-10"></div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="col-span-1 lg:col-span-8 flex flex-col h-full">
                {}
                <section
                  className="bg-white rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[#EAECEA] overflow-hidden flex h-full min-h-[320px] relative items-center"
                  data-purpose="initiative-feature">
                  
                  {}
                  <div className="absolute inset-0 z-0 bg-[#E8F2E3]">
                    <img
                      src="./image.png"
                      className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                      alt="Village gathering" />
                    
                  </div>

                  {}
                  <div className="relative z-20 w-full md:w-[65%] pl-8 pr-4 py-8 flex flex-col h-full items-start">
                    <h2 className="mb-5 text-[#1F4E79] text-[24px] font-bold">
                      Our Key Initiatives
                    </h2>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-[36px] shrink-0">
                        <svg
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          
                          <path
                            d="M12 40A8 8 0 1 0 12 56A8 8 0 0 0 12 40ZM12 44A4 4 0 1 1 12 52A4 4 0 0 1 12 44Z"
                            fill="#3B763D" />
                          
                          <path
                            d="M48 40A8 8 0 1 0 48 56A8 8 0 0 0 48 40ZM48 44A4 4 0 1 1 48 52A4 4 0 0 1 48 44Z"
                            fill="#3B763D" />
                          
                          <path d="M22 28L28 28V20H22V28Z" fill="#3B763D" />
                          <path d="M8 32H20V28H8V32Z" fill="#3B763D" />
                          <path
                            d="M44 48H16V36H44V48Z"
                            fill="#88C45A"
                            opacity="0.3" />
                          
                          <path d="M42 36L46 24H32V36H42Z" fill="#3B763D" />
                          <path d="M34 26H44L41 34H34V26Z" fill="#F4F6F0" />
                          <path
                            d="M52 36C52 36 50 32 46 32H44V36H52Z"
                            fill="#3B763D" />
                          
                          <path d="M8 24H20V20H8V24Z" fill="#88C45A" />
                          <path d="M4 48H18V44H4V48Z" fill="#3B763D" />
                          <path d="M28 48H42V44H28V48Z" fill="#3B763D" />
                          <path
                            d="M28 56H42 M4 56H8"
                            stroke="#88C45A"
                            strokeWidth="3"
                            strokeLinecap="round" />
                          
                        </svg>
                      </div>
                      <h3 className="text-[#2A5E2E] m-0 text-[19px] font-bold">
                        Agriculture Development
                      </h3>
                    </div>
                    <p className="text-[#4A554A] mb-auto font-medium text-[15px]">
                      Improving farming practices and providing support.
                    </p>
                  </div>

                  {}
                  <button className="absolute bottom-6 left-0 rounded-sm z-30 bg-[#E5781E] text-white py-4 w-60 flex items-center justify-center hover:bg-[#D46A15] transition-colors">
                    <span className="font-semibold text-[18px] tracking-wide mr-2">
                      Read More
                    </span>
                    <span className="font-light text-[24px] leading-none -mt-0.5">
                      &rsaquo;
                    </span>
                  </button>
                </section>
              </div>
              <div className="col-span-1 lg:col-span-4 flex flex-col h-full mt-8 lg:mt-0">
                {}
                <div className="bg-[#FAF9F5] rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[#EAECEA] flex flex-col overflow-hidden h-full min-h-[320px]">
                  <div className="bg-gradient-to-b from-[#FAF9F5] to-[#F1F0EB] px-5 py-4 border-b border-[#EAECEA] shrink-0">
                    <h3 className="m-0 text-[#2C3440] text-[19px] font-bold tracking-tight">
                      News &amp; Announcements
                    </h3>
                  </div>
                  <ul className="px-5 py-2 m-0 list-none flex-grow flex flex-col justify-evenly pb-4">
                    <li className="flex items-start space-x-3 border-b border-[#EAECEA] py-[16px]">
                      <span className="w-2.5 h-2.5 bg-[#E66244] rounded-full mt-[6px] shrink-0"></span>
                      <p className="text-[15px] text-[#424A55] m-0 leading-[1.45] pr-2">
                        New PM Awac Ysjana applications opm for rurd no...
                      </p>
                    </li>
                    <li className="flex items-start space-x-3 border-b border-[#EAECEA] py-[16px]">
                      <span className="w-2.5 h-2.5 bg-[#E66244] rounded-full mt-[6px] shrink-0"></span>
                      <p className="text-[15px] text-[#424A55] m-0 leading-[1.45] pr-2">
                        Swachh-Bharot Mission, Village cheatlhese diva scheduled
                        for May Ceth.
                      </p>
                    </li>
                    <li className="flex items-start space-x-3 py-[16px]">
                      <span className="w-2.5 h-2.5 bg-[#E66244] rounded-full mt-[6px] shrink-0"></span>
                      <p className="text-[15px] text-[#424A55] m-0 leading-[1.45] pr-2">
                        Gram Sabile meeting to discuss local development issues
                        on juner 10th.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>);

}