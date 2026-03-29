"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Users, Info, Phone } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function PanchayatMembers() {
  const { user } = useUser();
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const meta = user?.unsafeMetadata as any;
        const villageId = meta?.village_id;
        const res = await fetch(`/api/panchayat-members${villageId ? `?villageId=${villageId}` : ''}`);
        if (res.ok) {
          const json = await res.json();
          setMembers(json.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchMembers();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Panchayat <span className="text-[#ab7845]">Members</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Elected representatives of the village
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Committee Members
                    </h3>
                  </div>

                  {isLoading ?
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                      {[...Array(4)].map((_, i) =>
                    <div key={i} className="p-4 border border-slate-200 rounded-sm flex items-center gap-4">
                          <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-2 w-1/3" />
                          </div>
                        </div>
                    )}
                    </div> :
                  members.length === 0 ?
                  <div className="text-center py-8">
                      <Users className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                      <p className="text-slate-500 font-medium">No members listed yet.</p>
                    </div> :

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {members.map((member) =>
                    <div key={member.id} className="p-4 border border-slate-200 rounded-sm flex items-center gap-4 hover:border-slate-300 transition-colors">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center">
                            {member.imageUrl ?
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover" /> :


                        <Users className="w-6 h-6 text-slate-400" />
                        }
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">
                              {member.name}
                            </h4>
                            <p className="text-xs text-[#FF9933] font-semibold">{member.position}</p>
                            {member.phone &&
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                                <Phone size={10} /> {member.phone}
                              </p>
                        }
                          </div>
                        </div>
                    )}
                    </div>
                  }
                </div>
              </div>

              {}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Meeting Days
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        Panchayat members generally hold open meetings on the
                        1st and 15th of every month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>);

}