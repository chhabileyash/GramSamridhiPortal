"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ChevronRight } from
"lucide-react";

import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPage() {
  const { user, isLoaded } = useUser();
  const [dbData, setDbData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (user && user.unsafeMetadata) {
        const villageId = (user.unsafeMetadata as any).village_id;
        if (villageId) {
          fetch(`/api/village-info?villageId=${villageId}`).
          then((r) => r.json()).
          then((d) => {
            if (d.data) setDbData(d.data);
            setIsLoading(false);
          }).
          catch((e) => {
            console.error(e);
            setIsLoading(false);
          });
          return;
        }
      }
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  const mapQuery = user?.unsafeMetadata ?
  `${(user.unsafeMetadata as any).village} ${(user.unsafeMetadata as any).taluka} ${(user.unsafeMetadata as any).district} Maharashtra India` :
  "Takarkhed Nandura Buldhana Maharashtra India";

  const addr =
  dbData?.address ||
  "Panchayat Bhavan, Main Road,\nGram Samridhi, Pune - 411001";
  const phone = dbData?.phone || "+91 20 2345 6789";
  const email = dbData?.email || "contact@gramsamridhi.gov.in";

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-6 space-y-8 min-w-0">
          {}
          <section className="bg-white p-8 border-b-4 border-[#FF9933] shadow-sm rounded-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl">
              Have questions or need assistance? Our team is here to help you
              with village services, schemes, and grievances. Reach out to us
              through any of the channels below.
            </p>
          </section>

          {isLoading || !isLoaded ?
          <div className="animate-in fade-in duration-500 space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-40 rounded-sm w-full" />
                <Skeleton className="h-40 rounded-sm w-full" />
                <Skeleton className="h-40 rounded-sm w-full" />
              </div>
              <Skeleton className="w-full h-[500px] rounded-sm" />
            </div> :

          <>
              {}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-[#FF9933]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FF9933] transition-colors">
                    <MapPin className="w-6 h-6 text-[#FF9933] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Our Address</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                    {addr}
                  </p>
                </div>

                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-[#138808]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#138808] transition-colors">
                    <Phone className="w-6 h-6 text-[#138808] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Phone & Email</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-900">Phone:</span>{" "}
                    {phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Email:</span>{" "}
                    {email}
                  </p>
                </div>

                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-[#2c5577]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2c5577] transition-colors">
                    <Clock className="w-6 h-6 text-[#2c5577] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Working Hours</h3>
                  <p className="text-sm text-gray-600">
                    Monday - Friday: 10:00 AM - 6:00 PM
                  </p>
                  <p className="text-sm text-gray-600">
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                  <p className="text-sm text-gray-500 italic mt-1">
                    Closed on Sundays & Public Holidays
                  </p>
                </div>
              </div>

              {}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {}
                <div className="bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded">
                      <MessageSquare className="w-5 h-5 text-[#2c5577]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Send us a Message
                    </h2>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Full Name
                        </label>
                        <input
                        type="text"
                        className="w-full px-4 py-3 rounded border border-gray-200 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all text-sm"
                        placeholder="John Doe" />
                      
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                        type="email"
                        className="w-full px-4 py-3 rounded border border-gray-200 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all text-sm"
                        placeholder="john@example.com" />
                      
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <select className="w-full px-4 py-3 rounded border border-gray-200 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all text-sm appearance-none bg-white">
                        <option>General Inquiry</option>
                        <option>Scheme Related</option>
                        <option>Grievance / Complaint</option>
                        <option>Suggestion</option>
                        <option>Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Message
                      </label>
                      <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded border border-gray-200 focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933] outline-none transition-all text-sm resize-none"
                      placeholder="How can we help you today?">
                    </textarea>
                    </div>

                    <button className="w-full bg-[#2c5577] text-white font-bold py-4 rounded-sm hover:bg-[#1e3a52] transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/10">
                      Submit Request
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-gray-400 text-center">
                      Our team typically responds within 24-48 business hours.
                    </p>
                  </form>
                </div>

                {}
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex-1 bg-gray-100 rounded-sm overflow-hidden border border-gray-200 shadow-sm relative group">
                    <iframe
                    width="100%"
                    height="100%"
                    className="h-full object-cover grayscale-[0.2] contrast-[1.1]"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}>
                  </iframe>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-sm shadow-sm border border-gray-100">
                      <p className="text-[10px] font-bold text-[#FF9933] uppercase">
                        Location
                      </p>
                      <p className="text-xs font-bold text-gray-900">
                        Gram Panchayat Office
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a142c] p-6 rounded-sm text-white">
                    <h3 className="font-bold mb-2">Emergency Contact</h3>
                    <p className="text-sm text-gray-300 mb-4 font-light">
                      In case of immediate assistance or emergencies, please
                      contact our 24/7 helpline.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center">
                        <Phone className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                          24/7 Helpline
                        </p>
                        <p className="text-lg font-bold">1800-XXX-XXXX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </main>
      </div>
      <Footer />
    </div>);

}