"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Search,
  Gavel,
  ShieldCheck,
  CheckCircle,
  Leaf,
  Sun,
  Droplet,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  MapPin,
  ExternalLink,
  ClipboardList,
  CreditCard,
  Info,
  BadgeHelpIcon,
} from "lucide-react";
import data from "../data.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
interface District {
  district: string;
  subDistricts: SubDistrict[];
}
interface SubDistrict {
  subDistrict: string;
  villages: string[];
}

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1634874706682-3468a6e421ba?q=80&w=1457&auto=format&fit=crop",
    title: "Vibrant Rural Ecosystems",
    description:
      "Modern infrastructure meeting traditional values in the heart of Maharashtra.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1643474004591-35d044e959ea?q=80&w=1470&auto=format&fit=crop",
    title: "Digital Empowerment",
    description:
      "Connecting every village to the global digital economy through accessible services.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1647184223407-ef8273a6822c?q=80&w=1374&auto=format&fit=crop",
    title: "Sustainable Agriculture",
    description:
      "Promoting eco-friendly farming practices and robust water management.",
  },
];

export default function Home() {
  const router = useRouter();
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [village, setVillage] = useState("");
  const districts: District[] = data.districts || [];
  const selectedDistrictData = districts.find(
    (d: District) => d.district === district,
  );
  const talukas: SubDistrict[] = selectedDistrictData
    ? selectedDistrictData.subDistricts
    : [];
  const selectedTalukaData = talukas.find(
    (t: SubDistrict) => t.subDistrict === taluka,
  );
  const villages: string[] = selectedTalukaData
    ? selectedTalukaData.villages
    : [];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  return (
    <>
      <div className="bg-[#f9f9f9] text-base md:text-lg text-slate-900  ">
        <div className="fixed bottom-3 right-3 z-100 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
          <button className="flex items-center gap-2 rounded-sm border border-white bg-[#0f766e] px-3 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm">
            <BadgeHelpIcon />
            <span className="hidden sm:inline">Citizen Support</span>
          </button>
        </div>
        {/* <Header /> */}
        <div className="flex items-center overflow-hidden border-b border-slate-200 bg-white py-2">
          <div className="z-10 ml-3 whitespace-nowrap bg-[#f57b20] px-3 py-1 text-[10px] font-black tracking-[0.15em] text-white uppercase sm:ml-4 sm:px-4 sm:text-xs sm:tracking-widest">
            LATEST UPDATES:
          </div>
          <div className="w-full overflow-hidden bg-white pl-[100%] box-content flex-1">
            <div className="inline-block whitespace-nowrap pr-[100%] box-content animate-[ticker_30s_linear_infinite]">
              <span className="mx-5 text-[10px] font-bold text-[#0f766e] uppercase sm:mx-8 sm:text-xs">
                ● Circular 442/2024: New guidelines for Rural Water Management
                implementation
              </span>
              <span className="mx-5 text-[10px] font-bold text-[#0f766e] uppercase sm:mx-8 sm:text-xs">
                ● Applications open for Maha-Krushi Samrudhi Yojana 2024-25
              </span>
              <span className="mx-5 text-[10px] font-bold text-[#0f766e] uppercase sm:mx-8 sm:text-xs">
                ● Important: Digital Signature mandatory for all Sarpanch
                administrative approvals from June 1st
              </span>
              <span className="mx-5 text-[10px] font-bold text-[#0f766e] uppercase sm:mx-8 sm:text-xs">
                ● E-Tendering process for Grade B Village Pavements now live on
                state portal
              </span>
            </div>
          </div>
        </div>
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden border-b border-slate-200 py-12 md:min-h-125 md:py-16">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 33, 71, 0.85), rgba(0, 33, 71, 0.95)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE2AIfo1s1gN4TWz6BFu1Hgx8d2yB6SvIC7v8fhsy4_ElrdgN6fM3CGAerBp1usnm5AoYpJ8MXn_iWTLOf1X_Xjfgc2CHJjq5WRhdrWGEmVta1CDsYouxyQfas_XAxF-yQ4DeBjQ0mp8pGemJ1wGgAgMhvRNjHeIAbbwyx1ClBtG3JTE5a91kG2gvzOM_evj6G2xV7PjSwoBWEwYuzkTvjrR1vq3lJlrCCFRg-PG4pZEzJIdTCOiEsV66L9lof6o8iom0rGukyIz7E')",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 text-center text-white sm:px-6 lg:px-8">
            <span className="mb-6 inline-block border border-white/30 px-4 py-1 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Rural Development Department
            </span>
            <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight uppercase sm:text-4xl md:text-6xl">
              Digital Panchayat Services
            </h2>
            <p className="mx-auto mb-8 max-w-2xl border-l-4 border-[#f57b20] px-4 text-left text-base font-normal text-slate-300 sm:px-6 md:mb-10 md:text-center md:text-xl">
              Empowering rural Maharashtra through transparent digital
              governance and accessible citizen services.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <button className="flex w-full items-center justify-center gap-3 border border-[#4cae4c] bg-[#f57b20] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#449d44] sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
                <Search />
                Village Directory
              </button>
              <button className="flex w-full items-center justify-center gap-3 border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white transition-all hover:bg-white/10 sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
                <Gavel />
                Lodge Complaint
              </button>
            </div>
          </div>
        </section>
        <section className="border-b border-slate-200 bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="inline-block border-b-4 border-[#f57b20] pb-2 text-3xl font-black tracking-tight text-[#0f766e] uppercase">
                  About the Digital Portal
                </h2>
                <p className="font-medium leading-relaxed text-slate-600">
                  The Gram Panchayat Digital Portal is a flagship initiative by
                  the Government of Maharashtra to bridge the digital divide in
                  rural areas. We provide a single-window interface for over
                  27,000 local bodies.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="border-l-4 border-[#0f766e] bg-slate-50 p-6">
                    <h4 className="mb-3 text-sm font-black text-[#0f766e] uppercase">
                      Our Mission
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      To digitize 100% of village-level administrative functions
                      and financial transactions by 2026, ensuring
                      accountability at every step.
                    </p>
                  </div>
                  <div className="border-l-4 border-[#f57b20] bg-slate-50 p-6">
                    <h4 className="mb-3 text-sm font-black text-[#0f766e] uppercase">
                      Our Vision
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      Creating a &apos;Digital Swaraj&apos; where every citizen
                      in rural Maharashtra has paperless access to government
                      services at their doorstep.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-[#0f766e] p-6 text-white sm:p-8 md:p-10">
                <div className="-z-10 absolute -top-4 -right-4 h-24 w-24 bg-[#f57b20]/20" />
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold">
                  <ShieldCheck className="text-[#f57b20]" />
                  Core Objectives
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#f57b20]" />
                    <span className="text-sm font-medium">
                      Reduction in administrative processing time by 60%
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#f57b20]" />
                    <span className="text-sm font-medium">
                      Real-time public tracking of development funds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#f57b20]" />
                    <span className="text-sm font-medium">
                      Integration with State and Central Welfare Portals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-xl text-[#f57b20]" />
                    <span className="text-sm font-medium">
                      Direct Benefit Transfer (DBT) security verification
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="overflow-hidden border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0f766e] uppercase">
                Glimpses of Rural Maharashtra
              </h2>
              <p className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
                Showcasing Progress &amp; Heritage across Villages
              </p>
              <div className="mx-auto mt-4 h-1 w-24 bg-[#f57b20]" />
            </div>

            <div className="group relative">
              <div className="relative aspect-video w-full overflow-hidden border border-slate-300 bg-white">
                {slides.map((slide: any, index: number) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  >
                    <img
                      alt={slide.title}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      src={slide.image}
                    />
                    <div className="absolute right-0 bottom-0 left-0 border-t-4 border-[#f57b20] bg-[#fffffff]/80 p-6 text-white backdrop-blur-sm">
                      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8">
                        <h3 className="text-lg font-black tracking-tight uppercase sm:text-xl">
                          {slide.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-300 sm:text-sm">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-slate-300 bg-white/90 text-[#0f766e] shadow-lg transition-all hover:border-[#0f766e] hover:bg-[#0f766e] hover:text-white sm:left-4 sm:size-12"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-slate-300 bg-white/90 text-[#0f766e] shadow-lg transition-all hover:border-[#0f766e] hover:bg-[#0f766e] hover:text-white sm:right-4 sm:size-12"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
                <Leaf size={36} className=" text-[#f57b20]" />
                <div>
                  <h4 className="text-sm font-black text-[#0f766e] uppercase">
                    Smart Infrastructure
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Digitally connected community centers and modern amenities.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
                <Sun size={36} className=" text-[#f57b20]" />
                <div>
                  <h4 className="text-sm font-black text-[#0f766e] uppercase">
                    Sustainable Energy
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Solar-powered street lighting and eco-friendly village
                    grids.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-slate-200 bg-white p-6 shadow-sm">
                <Droplet size={36} className=" text-[#f57b20]" />
                <div>
                  <h4 className="text-sm font-black text-[#0f766e] uppercase">
                    Water Management
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Exemplary watershed management and piped water for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-b border-slate-200 bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#0f766e] uppercase">
                  Model Village Spotlights
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-500">
                  Showcasing excellence in rural administration and development
                </p>
              </div>
              <button className="group flex w-full items-center justify-center gap-2 border-2 border-[#0f766e] px-5 py-2 text-xs font-bold text-[#0f766e] transition-all duration-300 hover:bg-[#0f766e] hover:text-white sm:w-auto sm:px-6 sm:text-sm">
                CASE STUDIES
                <TrendingUp className="text-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="group flex flex-col gap-6 border border-slate-100 p-4 transition-all hover:border-[#f57b20] md:flex-row">
                <div
                  className="aspect-video bg-cover bg-center shadow-md transition-all group-hover:grayscale-0 md:w-1/2 grayscale"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCXAGavzmlpZw5esy2lzmIzekc0x-HDHTu1VFdcdIQYTVxwbpnhvBppA0EKASCE1_le1sjDr9cJ6L4Dk6m37Vd3guYmImFYDOGQbw4JmmUWIR7sZJp4aseoz_NVKl_zeqNguvYCy3st3xbv_dnbH18ApHyp4c9_KrRcMm13udwAXOrhGHk6w4Ep7MkeBWrcB2-AChZRUqm4HaOdm1KO7YwndQ3CrnuP35Vr_h0FF_d8TxcaRSovK22hmJKuTQC4P-oeOFL0550pW_N')",
                  }}
                />
                <div className="flex flex-col justify-center md:w-1/2">
                  <span className="mb-1 text-[10px] font-black tracking-widest text-[#f57b20] uppercase">
                    Sanitation &amp; Ecology
                  </span>
                  <h4 className="mb-3 text-xl font-black text-[#0f766e] transition-colors group-hover:text-[#f57b20]">
                    Kharadi: Zero-Waste Pioneer
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">
                    Implementing 100% waste segregation and a local bio-gas
                    plant that powers streetlights for the entire village.
                  </p>
                  <a
                    className="flex items-center gap-2 text-xs font-bold text-[#0f766e] uppercase transition-transform group-hover:translate-x-2"
                    href="#"
                  >
                    Read Success Story
                    <ArrowRight className="text-sm" />
                  </a>
                </div>
              </div>

              <div className="group flex flex-col gap-6 border border-slate-100 p-4 transition-all hover:border-[#f57b20] md:flex-row">
                <div
                  className="aspect-video bg-cover bg-center shadow-md transition-all group-hover:grayscale-0 md:w-1/2 grayscale"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWOAZULjffZQm6xdQbirErIl-J-6mWscmHOX9E8CCAJRwspUR2P9YprjvZ5o3HDIVVwYnrmaSgsL3rXPqLH3NbZzLYrv-GWUEQPWO2lmcZMxtFMkT8eKFsLP2L9EPvjDwxUs12r4MeuqYZ3H8d7wnGRKoZ4F2fG7TenMClPk4Za9mlRoJybccFEQh1pwbWIl-KQTQnTx7lluL7eQeFxWfqu_UHNneVoh5AJGUx1FKfR9i2n9bDrsyNR45I7nsbbZ7-K-ajPRCBt7uU')",
                  }}
                />
                <div className="flex flex-col justify-center md:w-1/2">
                  <span className="mb-1 text-[10px] font-black tracking-widest text-[#f57b20] uppercase">
                    Education &amp; Digitization
                  </span>
                  <h4 className="mb-3 text-xl font-black text-[#0f766e] transition-colors group-hover:text-[#f57b20]">
                    Ralegan: 100% Literacy
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">
                    Achieved complete adult literacy and established a digital
                    learning lab that serves 5 neighboring villages.
                  </p>
                  <a
                    className="flex items-center gap-2 text-xs font-bold text-[#0f766e] uppercase transition-transform group-hover:translate-x-2"
                    href="#"
                  >
                    Read Success Story
                    <ArrowRight className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="border-b border-slate-200 bg-white py-14 md:py-20 ">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0f766e] uppercase">
                Citizen Journey Guide
              </h2>
              <div className="mx-auto h-1 w-24 bg-[#f57b20]" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#0f766e]/30 hover:bg-white hover:shadow-xl sm:p-8">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#0f766e] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#f57b20]">
                  01
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e] transition-colors duration-300 group-hover:text-[#f57b20]">
                  Identify Location
                </h3>
                <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                  Select your Administrative District and Taluka to locate your
                  specific Gram Panchayat office.
                </p>
              </div>
              <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#0f766e]/30 hover:bg-white hover:shadow-xl sm:p-8">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#0f766e] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#f57b20]">
                  02
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e] transition-colors duration-300 group-hover:text-[#f57b20]">
                  Select Service
                </h3>
                <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                  Access official services including tax payments, certificate
                  applications, or scheme enrollment.
                </p>
              </div>
              <div className="group relative border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#0f766e]/30 hover:bg-white hover:shadow-xl sm:p-8">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center bg-[#0f766e] text-2xl font-black text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#f57b20]">
                  03
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e] transition-colors duration-300 group-hover:text-[#f57b20]">
                  Online Fulfillment
                </h3>
                <p className="text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
                  Provide necessary documentation and complete the application
                  process through our secure portal.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y-8 border-[#f57b20] bg-[#0f766e] py-14 text-white md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:gap-20 lg:grid-cols-2">
              <div className="space-y-8">
                <h2 className="text-3xl font-black leading-tight uppercase md:text-4xl">
                  Citizen Charter &amp; <br />
                  Complaint Registration
                </h2>
                <p className="font-medium text-slate-400">
                  Our commitment to time-bound service delivery. If services are
                  not rendered within the stipulated period, citizens have the
                  right to appeal through our transparent complaint mechanism.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                    <span className="flex size-12 items-center justify-center rounded-sm bg-[#f57b20] font-black text-white">
                      24h
                    </span>
                    <div>
                      <h4 className="text-sm font-bold uppercase">
                        Acknowledgement
                      </h4>
                      <p className="text-xs text-slate-400">
                        Receive tracking ID via Email within 24 hours of filing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                    <span className="flex size-12 items-center justify-center rounded-sm bg-slate-700 font-black text-white">
                      7d
                    </span>
                    <div>
                      <h4 className="text-sm font-bold uppercase">
                        Initial Review
                      </h4>
                      <p className="text-xs text-slate-400">
                        Assignment to relevant department and preliminary check.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                    <span className="flex size-12 items-center justify-center rounded-sm bg-slate-700 font-black text-white">
                      15d
                    </span>
                    <div>
                      <h4 className="text-sm font-bold uppercase">
                        Final Resolution
                      </h4>
                      <p className="text-xs text-slate-400">
                        Closing the complaint with proof of resolution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-8 border-[#f57b20] bg-white p-5 text-[#0f766e] sm:p-8">
                <h3 className="mb-6 text-xl font-black uppercase">
                  Quick Complaint Filing
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Full Name (As per Aadhar)
                    </label>
                    <input
                      className="h-12 w-full pl-2 border border-slate-300 text-sm font-bold focus:border-[#0f766e] focus:ring-[#0f766e]"
                      placeholder="Enter name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Complaint Category
                    </label>
                    <select className="h-12 w-full border border-slate-300 text-sm font-bold focus:border-[#0f766e] focus:ring-[#0f766e]">
                      <option>-- Select Category --</option>
                      <option>Public Works (Roads/Drains)</option>
                      <option>Water Supply Issues</option>
                      <option>Sanitation &amp; Waste</option>
                      <option>Welfare Scheme Disbursement</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black tracking-widest text-slate-500 uppercase">
                      Brief Description
                    </label>
                    <textarea
                      className="h-24 w-full border border-slate-300 p-3 text-sm font-bold focus:border-[#0f766e] focus:ring-[#0f766e]"
                      placeholder="Describe your issue..."
                    />
                  </div>
                  <button className="w-full bg-[#0f766e] py-4 text-sm font-black text-white uppercase shadow-md transition-all hover:bg-slate-800">
                    Submit Formal Complaint
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="border-b border-slate-200 bg-slate-100 py-12">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="border border-slate-300 bg-white p-5 shadow-sm sm:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-base font-bold tracking-wider text-[#0f766e] uppercase sm:text-lg">
                <MapPin className="text-[#f57b20]" />
                Panchayat Selection Portal
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                <div>
                  <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
                    District Selection
                  </label>
                  <select
                    className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setTaluka("");
                      setVillage("");
                    }}
                  >
                    <option value="" disabled className="text-slate-400">
                      -- Select District --
                    </option>
                    {districts.map((d: District) => (
                      <option key={d.district} value={d.district}>
                        {d.district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
                    Taluka Selection
                  </label>
                  <select
                    className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] disabled:cursor-not-allowed disabled:opacity-50"
                    value={taluka}
                    onChange={(e) => {
                      setTaluka(e.target.value);
                      setVillage("");
                    }}
                    disabled={!district}
                  >
                    <option value="" disabled className="text-slate-400">
                      -- Select Taluka --
                    </option>
                    {talukas.map((t: SubDistrict) => (
                      <option key={t.subDistrict} value={t.subDistrict}>
                        {t.subDistrict}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black text-slate-500 uppercase">
                    Village Selection
                  </label>
                  <select
                    className="h-12 w-full border border-slate-300 bg-slate-50 px-3 text-sm font-bold text-slate-900 transition-colors hover:border-slate-400 focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] disabled:cursor-not-allowed disabled:opacity-50"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    disabled={!taluka}
                  >
                    <option value="" disabled className="text-slate-400">
                      -- Select Village --
                    </option>
                    {villages.map((v: string) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end sm:col-span-2 lg:col-span-1">
                  <button
                    className="group flex h-12 w-full items-center justify-center gap-2 bg-[#0f766e] text-sm font-bold text-white uppercase transition-all duration-300 hover:bg-slate-800 hover:shadow-md"
                    onClick={() => {
                      if (district && taluka && village) {
                        const formattedDistrict = encodeURIComponent(district);
                        const formattedTaluka = encodeURIComponent(taluka);
                        const formattedVillage = encodeURIComponent(village);
                        router.push(
                          `/villages/${formattedDistrict}/${formattedTaluka}/${formattedVillage}`,
                        );
                      } else {
                        alert("Please select District, Taluka, and Village.");
                      }
                    }}
                  >
                    <Search className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:text-[#f57b20]" />
                    Find Village
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-end justify-between gap-6 border-b-2 border-slate-100 pb-8 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#0f766e] uppercase">
                  Citizen Service Center
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-500 italic">
                  Direct access to statutory and non-statutory rural services
                </p>
              </div>
              <button className="group flex w-full items-center justify-center gap-2 border-2 border-[#0f766e] px-5 py-2 text-xs font-bold text-[#0f766e] transition-all duration-300 hover:bg-[#0f766e] hover:text-white sm:w-auto sm:px-6 sm:text-sm">
                VIEW ALL SERVICES
                <ExternalLink className="text-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 border border-slate-200 md:grid-cols-3">
              <div className="group relative flex flex-col overflow-hidden border-b border-slate-200 bg-white p-6 transition-colors duration-500 hover:bg-slate-50 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#f57b20] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#0f766e] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#f57b20] group-hover:text-white">
                  <ClipboardList className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e]">
                  Complaint Registration
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Formal registration of civic issues related to sanitation,
                  water supply, and street lighting.
                </p>
                <button className="flex w-full items-center justify-center gap-2 border border-[#0f766e] py-3 text-xs font-bold text-[#0f766e] uppercase transition-all duration-300 hover:bg-[#0f766e] hover:text-white">
                  <span>Lodge Complaint</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>

              <div className="group relative flex flex-col overflow-hidden border-b border-slate-200 bg-white p-6 transition-colors duration-500 hover:bg-slate-50 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#0f766e] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#0f766e] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#0f766e] group-hover:text-white">
                  <CreditCard className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e]">
                  Revenue &amp; Taxation
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Secure online gateway for payment of property tax,
                  professional tax, and other local cess.
                </p>
                <button className="flex w-full items-center justify-center gap-2 bg-[#0f766e] py-3 text-xs font-bold text-white uppercase transition-all duration-300 hover:bg-slate-800">
                  <span>Proceed to Payment</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>

              <div className="group relative flex flex-col overflow-hidden bg-white p-6 transition-colors duration-500 hover:bg-slate-50 sm:p-8 md:p-10">
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#f57b20] transition-all duration-500 ease-out group-hover:w-full" />
                <div className="mb-6 flex size-16 items-center justify-center bg-slate-100 text-[#0f766e] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#f57b20] group-hover:text-white">
                  <Info className="text-4xl" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-[#0f766e]">
                  Panchayat Information
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  Detailed administrative reports, official gazettes, and member
                  directory of the local body.
                </p>
                <button className="flex w-full items-center justify-center gap-2 border border-[#0f766e] py-3 text-xs font-bold text-[#0f766e] uppercase transition-all duration-300 hover:bg-[#0f766e] hover:text-white">
                  <span>View Details</span>
                  <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0f766e] py-16 text-white">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
              <div className="border border-white/10 p-4 text-center sm:p-6">
                <h3 className="mb-2 text-3xl font-black text-[#f57b20] sm:text-4xl">
                  <AnimatedCounter end={36} />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Districts
                </p>
              </div>
              <div className="border border-white/10 p-4 text-center sm:p-6">
                <h3 className="mb-2 text-3xl font-black text-[#f57b20] sm:text-4xl">
                  <AnimatedCounter end={27854} />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Panchayats
                </p>
              </div>
              <div className="border border-white/10 p-4 text-center sm:p-6">
                <h3 className="mb-2 text-3xl font-black text-[#f57b20] sm:text-4xl">
                  <AnimatedCounter end={40000} suffix="+" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Villages
                </p>
              </div>
              <div className="border border-white/10 p-4 text-center sm:p-6">
                <h3 className="mb-2 text-3xl font-black text-[#f57b20] sm:text-4xl">
                  <AnimatedCounter end={12.5} decimals={1} suffix=" Cr" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Population
                </p>
              </div>
              <div className="border border-white/10 p-4 text-center sm:p-6">
                <h3 className="mb-2 text-3xl font-black text-[#f57b20] sm:text-4xl">
                  <AnimatedCounter end={82.3} decimals={1} suffix="%" />
                </h3>
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Literacy Rate
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-black tracking-tight text-[#0f766e] uppercase md:mb-12">
              Public Welfare Schemes
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="Pradhan Mantri Awas Yojana"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWOAZULjffZQm6xdQbirErIl-J-6mWscmHOX9E8CCAJRwspUR2P9YprjvZ5o3HDIVVwYnrmaSgsL3rXPqLH3NbZzLYrv-GWUEQPWO2lmcZMxtFMkT8eKFsLP2L9EPvjDwxUs12r4MeuqYZ3H8d7wnGRKoZ4F2fG7TenMClPk4Za9mlRoJybccFEQh1pwbWIl-KQTQnTx7lluL7eQeFxWfqu_UHNneVoh5AJGUx1FKfR9i2n9bDrsyNR45I7nsbbZ7-K-ajPRCBt7uU')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#0f766e]">
                    PM Awas Yojana (Gramin)
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Financial assistance for construction of pucca houses for
                    rural homeless families.
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#0f766e] uppercase transition-all duration-300 hover:bg-[#f57b20] hover:text-white group-hover:border-[#f57b20]">
                    <span>Enrollment Details</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>

              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="MGNREGA"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0TeB0tP5FUL2JElm2ktfeeaX4M47Z8JsIg63J2OIleXttaYPVGcJzMPvBmKUcnnlbqbu2sWL3kdnjEp3bLdQKz1jQuiKuAR4u1gvTXAg__5JNjpL_laYCraygIDP6PBjQjs3j-soFn7KGLAZ7ZAj3moqIVEVCA9QQQXpdhrSOOSLIHnaVBdgMxQJazSvSzm4IFCYjVFu5m29sbo8xRp5reMy6a8qfrNG8iM_H10jJjc96Y34d4vK3zIYJf_sVvslKiigZx9AzGofj')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#0f766e]">
                    MGNREGA Employment
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Guaranteed wage employment for 100 days to adult members of
                    rural households.
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#0f766e] uppercase transition-all duration-300 hover:bg-[#f57b20] hover:text-white group-hover:border-[#f57b20]">
                    <span>Apply for Job Card</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>

              <div className="group border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-56 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0"
                  data-alt="Jal Jeevan Mission"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUmhIXyJpB5-K_9GwN2HM0sggy8w8ARRo4SyUDgP2zKtXOTOTKIGFskGU5QClHH3bkf5ljoQhp-37da23Pjrk_WMa9vnvV9yDpvtzQBWgAtaGCL7BNbF5hGcMwsqT2hZ4XJdx4cucI8BAKrhhMKP_Ppc-Jc8zs5lt4ZZWTzhB4IkVEZRhWCSDW6NfDguQrHbMQnaDTroWEbXTIOgwML1mHUlGDosFYmtJd_a6r-RGdcd_xdHiDzO9g8RLZzSaRva7KOxL0GlKM8qdH')",
                  }}
                />
                <div className="p-6">
                  <h4 className="mb-3 text-lg font-bold text-[#0f766e]">
                    Jal Jeevan Mission
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Infrastructure development to provide Functional Household
                    Tap Connections (FHTC).
                  </p>
                  <button className="flex w-full items-center justify-center gap-2 border border-slate-300 bg-slate-100 py-3 text-xs font-bold text-[#0f766e] uppercase transition-all duration-300 hover:bg-[#f57b20] hover:text-white group-hover:border-[#f57b20]">
                    <span>Connection Status</span>
                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10 md:gap-16 lg:flex-row">
              <div className="space-y-8 lg:w-1/2">
                <h2 className="border-l-8 border-[#f57b20] pl-4 text-3xl font-black leading-tight text-[#0f766e] uppercase sm:pl-6 md:text-4xl">
                  Governance Transparency
                </h2>
                <p className="text-base font-medium text-slate-600 md:text-xl">
                  Real-time monitoring of rural development projects and
                  complaint resolution across the state.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border-t-4 border-[#0f766e] bg-slate-50 p-8 shadow-sm">
                    <h4 className="mb-1 text-4xl font-black tracking-tight text-[#0f766e] md:text-5xl">
                      85.4%
                    </h4>
                    <p className="text-xs font-black text-slate-500 uppercase">
                      Grievance Resolution Rate
                    </p>
                  </div>
                  <div className="border-t-4 border-[#f57b20] bg-slate-50 p-8 shadow-sm">
                    <h4 className="mb-1 text-4xl font-black tracking-tight text-[#f57b20] md:text-5xl">
                      12,402
                    </h4>
                    <p className="text-xs font-black text-slate-500 uppercase">
                      Ongoing Infrastructure Projects
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="border border-slate-300 bg-white shadow-sm">
                  <div
                    className="h-48 border-b border-slate-200 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCXAGavzmlpZw5esy2lzmIzekc0x-HDHTu1VFdcdIQYTVxwbpnhvBppA0EKASCE1_le1sjDr9cJ6L4Dk6m37Vd3guYmImFYDOGQbw4JmmUWIR7sZJp4aseoz_NVKl_zeqNguvYCy3st3xbv_dnbH18ApHyp4c9_KrRcMm13udwAXOrhGHk6w4Ep7MkeBWrcB2-AChZRUqm4HaOdm1KO7YwndQ3CrnuP35Vr_h0FF_d8TxcaRSovK22hmJKuTQC4P-oeOFL0550pW_N')",
                    }}
                  />
                  <div className="p-5 sm:p-8">
                    <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
                      <div>
                        <span className="mb-1 block text-[10px] font-black tracking-widest text-[#f57b20] uppercase">
                          Model Village Profile
                        </span>
                        <h3 className="text-2xl font-bold text-[#0f766e]">
                          Kharadi, Pune District
                        </h3>
                      </div>
                      <span className="bg-green-700 px-3 py-1 text-[10px] font-bold text-white uppercase">
                        Certified Platinum
                      </span>
                    </div>

                    <div className="mb-8 space-y-4 border-y border-slate-100 py-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold tracking-tighter text-slate-500 uppercase">
                          Total Inhabitants
                        </span>
                        <span className="font-bold text-[#0f766e]">14,250</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold tracking-tighter text-slate-500 uppercase">
                          Revenue Collection
                        </span>
                        <span className="font-bold text-green-700">
                          98.2% Compliance
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold tracking-tighter text-slate-500 uppercase">
                          Pending Litigations
                        </span>
                        <span className="font-bold text-[#0f766e]">
                          02 Case(s)
                        </span>
                      </div>
                    </div>

                    <button className="w-full border border-[#0f766e] bg-[#0f766e] py-4 text-sm font-bold text-white uppercase transition-all hover:bg-slate-800">
                      Access Statistical Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
