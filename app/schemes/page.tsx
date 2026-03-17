"use client";

import React from "react";
import { Award, Info } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Awaas Yojana (PMAY)",
    description:
      "Provides affordable housing to eligible urban and rural poor.",
    url: "https://pmayg.dord.gov.in/netiayHome/home.aspx",
  },
  {
    id: 2,
    title: "Maharashtra State Rural Livelihoods Mission (UMED)",
    description:
      "Promotes sustainable livelihoods for rural households in Maharashtra.",
    url: "https://www.umed.in",
  },
  {
    id: 3,
    title: "Rashtriya Gram Swaraj Abhiyan",
    description:
      "Strengthens Panchayati Raj Institutions for rural development.",
    url: "https://www.mahargsa.in",
  },
  {
    id: 4,
    title: "Swachh Bharat Mission",
    description: "National campaign for sanitation and cleanliness.",
    url: "https://swachhbharatmission.ddws.gov.in/",
  },
  {
    id: 5,
    title: "Majhi Vasundhara (My Earth)",
    description:
      "Environmental conservation and sustainability initiative by Maharashtra.",
    url: "https://majhivasundhara.in/en",
  },
  {
    id: 6,
    title: "Jal Jeevan Mission",
    description: "Ensures tap water supply to every rural household in India.",
    url: "https://jaljeevanmission.gov.in/",
  },
  {
    id: 7,
    title: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    description:
      "Provides LPG connections to women from below poverty line households.",
    url: "https://www.pmuy.gov.in/",
  },
  {
    id: 8,
    title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PMJAY)",
    description:
      "Provides health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    url: "https://pmjay.gov.in/",
  },
  {
    id: 9,
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "Provides income support of ₹6,000 per year to eligible farmer families.",
    url: "https://pmkisan.gov.in/",
  },
  {
    id: 10,
    title: "Digital India Programme",
    description:
      "Aims to transform India into a digitally empowered society and knowledge economy.",
    url: "https://www.digitalindia.gov.in/",
  },
  {
    id: 11,
    title: "Skill India Mission",
    description:
      "Focuses on skill development and vocational training to improve employability.",
    url: "https://www.skillindia.gov.in/",
  },
  {
    id: 12,
    title: "Startup India Initiative",
    description:
      "Supports entrepreneurs and startups through funding, tax benefits, and ease of doing business.",
    url: "https://www.startupindia.gov.in/",
  },
];

export default function Schemes() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <Header />

      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Gram Panchayat <span className="text-[#ab7845]">Schemes</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Explore available government schemes and ongoing initiatives
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="overflow-x-auto border border-gray-200 rounded-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-200">
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm w-16 border-r border-gray-200">
                            Sr No.
                          </th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm border-r border-gray-200">
                            Scheme Name
                          </th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm border-r border-gray-200">
                            Description
                          </th>
                          <th className="py-3 px-4 font-bold text-slate-700 text-sm text-center w-40">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {schemes.map((scheme, index) => (
                          <tr
                            key={scheme.id}
                            className="hover:bg-[#FF9933]/5 transition-colors group"
                          >
                            <td className="py-4 px-4 text-slate-500 font-medium align-middle border-r border-gray-200">
                              {index + 1}
                            </td>
                            <td className="py-4 px-4 align-middle border-r border-gray-200">
                              <h4 className="font-bold text-slate-800 text-sm md:text-base">
                                {scheme.title}
                              </h4>
                            </td>
                            <td className="py-4 px-4 align-middle border-r border-gray-200">
                              <p className="text-sm text-slate-600">
                                {scheme.description}
                              </p>
                            </td>
                            <td className="py-4 px-4 align-middle text-center">
                              <a
                                href={scheme.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-[#f8fafc] text-[#138808] border border-[#138808]/20 hover:bg-[#138808] hover:text-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 w-full whitespace-nowrap"
                              >
                                View Details
                                <svg
                                  className="w-3.5 h-3.5 ml-1.5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
