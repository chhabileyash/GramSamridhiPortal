"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  User,
  UserRound,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

const chartData = [
  { name: "Ongoing", value: 45, color: "#FF9933" },
  { name: "Complete", value: 35, color: "#138808" },
  { name: "Review", value: 20, color: "#2c5577" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      {/* <Header /> */}

      <div className="flex flex-1 items-start">
        <Sidebar />

        {/* BEGIN: MainContentArea */}
        <main className="flex-1 p-6 space-y-6 min-w-0">
          {/* Hero Slider Section */}
          <section data-purpose="carousel">
            <div className="relative w-full h-100 rounded-sm overflow-hidden group">
              <img
                alt="Green Fields"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJPGBY_I7f-SH3oiZiJZ0vb23rHOhXjXOexTEpuYvdseJxVQ-1mYJowlZR2YFbsPRBY6ZFaPsZY1tDaROhsLKUvSzYI0h1bqUdyBZywK1BnfPJHGFpXHYMhyyP_pptDNRmd2nUgzZARexAYP8QAcjMXFcrAVt7EhHhcDtG9L3NFR9-IADfg50WYrpY4E8JbLeGcFeKYT8QKw9Pisp4y17YdsdoR5bvT5MdzcMJKD-udRBleamLo87IFjAQNt0TcA466rr72RKQxZI"
              />
              {/* Navigation Arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-2 rounded flex items-center justify-center backdrop-blur-sm"
                suppressHydrationWarning
              >
                <ChevronLeft className="text-black w-8 h-8" strokeWidth={3} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-2 rounded flex items-center justify-center backdrop-blur-sm"
                suppressHydrationWarning
              >
                <ChevronRight className="text-black w-8 h-8" strokeWidth={3} />
              </button>
            </div>
          </section>

          {/* About Village & Map Row */}
          <section
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            data-purpose="village-info-and-map"
          >
            <div className="lg:col-span-2 bg-white p-8 border-l-4 border-[#FF9933] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                  About the village
                </h3>
                <div className="h-0.5 w-full bg-linear-to-r from-gray-200 to-transparent"></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                Takarkhed is a Village in Nandura Taluka in Buldhana District of
                Maharashtra State, India. It belongs to Vidarbha region. It
                belongs to Amravati Division. It is located 26 KM towards North
                from District head quarters Buldhana. 19 KM from Nandura. 474 KM
                from State capital Mumbai Takarkhed Pin code is 443103 and
                postal head office is Motala . Fuli ( 3 KM ) , Khaira ( 4 KM ) ,
                Advihir ( 5 KM ) , Pimpalkhuta Bk ( 5 KM ) , Jawala Bazar ( 6 KM
                ) are the nearby Villages to Takarkhed. Takarkhed is surrounded
                by Nandura Taluka towards East , Malkapur Taluka towards North ,
                Buldhana Taluka towards South , Khamgaon Taluka towards East .
              </p>
            </div>
            <div
              className="bg-[#1a142c] border border-gray-200 overflow-hidden min-h-75"
              data-purpose="map-container"
            >
              <iframe
                width="100%"
                height="100%"
                className="h-full object-cover"
                style={{ border: 0, width: "100%", height: "100%" }}
                loading="lazy"
                src="https://www.google.com/maps?q=Takarkhed+Nandura+Buldhana+Maharashtra+India&output=embed"
              ></iframe>
            </div>
          </section>

          {/* Statistics Cards */}
          <section
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-purpose="statistics-overview"
          >
            <div className="bg-white p-6 border-b-2 border-[#138808] text-center shadow-sm">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                Total Population
              </p>
              <h4 className="text-2xl font-bold text-gray-900">1,258,897</h4>
            </div>
            <div className="bg-white p-6 border border-gray-200 flex items-center justify-center space-x-4 shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center border border-[#FF9933]/20 bg-[#FF9933]/5 rounded">
                <User className="w-6 h-6 text-[#FF9933]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Male Demographic
                </p>
                <h4 className="text-2xl font-bold text-gray-900">8,897</h4>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 flex items-center justify-center space-x-4 shadow-sm">
              <div className="w-10 h-10 flex items-center justify-center border border-[#138808]/20 bg-[#138808]/5 rounded">
                <UserRound className="w-6 h-6 text-[#138808]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Female Demographic
                </p>
                <h4 className="text-2xl font-bold text-gray-900">12,897</h4>
              </div>
            </div>
          </section>

          {/* Metrics and Chart Section */}
          <section
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            data-purpose="metrics-and-projects"
          >
            {/* Population Metrix */}
            <div className="bg-white p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-8 uppercase tracking-wide">
                Population Metrix
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 p-4 rounded-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Children
                    </span>
                  </div>
                  <p className="text-2xl font-bold">256k</p>
                </div>
                <div className="border border-gray-100 p-4 rounded-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#138808]"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Youth
                    </span>
                  </div>
                  <p className="text-2xl font-bold">256k</p>
                </div>
                <div className="border border-gray-100 p-4 rounded-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#2c5577]"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Adults
                    </span>
                  </div>
                  <p className="text-2xl font-bold">256k</p>
                </div>
                <div className="border border-gray-100 p-4 rounded-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Seniors
                    </span>
                  </div>
                  <p className="text-2xl font-bold">256k</p>
                </div>
              </div>
            </div>

            {/* Total Population Chart */}
            <div className="bg-white p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-8 uppercase tracking-wide">
                Scheme Status Overview
              </h3>
              <div className="flex items-center justify-evenly space-x-12">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 w-full max-w-xs space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-bold text-[#2c5577] uppercase tracking-wide">
                        Ongoing
                      </p>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-[#FF9933]">
                          45
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          Percent
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#FF9933] h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-bold text-[#2c5577] uppercase tracking-wide">
                        Complete
                      </p>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-[#138808]">
                          35
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          Percent
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#138808] h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-bold text-[#2c5577] uppercase tracking-wide">
                        Review
                      </p>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-[#2c5577]">
                          20
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          Percent
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#2c5577] h-2 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            className="bg-white border border-gray-200 overflow-hidden shadow-sm"
            data-purpose="contact-section"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Column: Contact Details */}
              <div className="lg:w-1/3 bg-blue-50 text-[#2c5577] p-10 border-r border-blue-100">
                <h3 className="text-2xl font-bold mb-4">
                  Contact Gram Panchayat
                </h3>
                <p className="text-[#2c5577]/80 mb-8">
                  Reach out to us for any queries, grievances, or suggestions
                  regarding village development.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 mt-1 text-[#FF9933]" />
                    <div>
                      <p className="font-bold">Address</p>
                      <p className="text-sm text-[#2c5577]/80">
                        Panchayat Bhavan, Main Road,
                        <br />
                        Gram Samruthi, Pune - 411001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 mt-1 text-[#FF9933]" />
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-sm text-[#2c5577]/80">
                        +91 20 2345 6789
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 mt-1 text-[#FF9933]" />
                    <div>
                      <p className="font-bold">Email</p>
                      <p className="text-sm text-[#2c5577]/80">
                        contact@gramsamruthi.gov.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column: Send us a Message form */}
              <div className="lg:w-2/3 p-10">
                <h4 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
                  Send us a Message
                </h4>
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm"
                      placeholder="Enter your name"
                      type="text"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm"
                      placeholder="your@email.com"
                      type="email"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm"
                      suppressHydrationWarning
                    >
                      <option>General Inquiry</option>
                      <option>Scheme Related</option>
                      <option>Document Verification</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      className="w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] focus:outline-none text-sm"
                      placeholder="How can we help you?"
                      rows={4}
                      suppressHydrationWarning
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      className="bg-[#2c5577] text-white px-8 py-3 rounded font-bold hover:bg-[#138808] transition shadow text-sm border-b-4 border-[#138808]"
                      suppressHydrationWarning
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        {/* END: MainContentArea */}
      </div>
      <Footer />
    </div>
  );
}
