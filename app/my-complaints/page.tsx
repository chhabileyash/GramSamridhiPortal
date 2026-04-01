"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { FileText, Info, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function MyComplaints() {
  const { user } = useUser();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const meta = user?.unsafeMetadata as any;
        const villageId = meta?.village_id;
        const res = await fetch(`/api/complaints${villageId ? `?villageId=${villageId}` : ''}`);
        if (res.ok) {
          const json = await res.json();
          setComplaints(json.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchComplaints();
  }, [user]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Complete":return "bg-green-100 text-green-800";
      case "Progress":return "bg-blue-100 text-blue-800";
      case "Pending":return "bg-yellow-100 text-yellow-800";
      default:return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":return <CheckCircle className="w-4 h-4" />;
      case "Progress":return <Clock className="w-4 h-4" />;
      case "Pending":return <AlertCircle className="w-4 h-4" />;
      default:return null;
    }
  };

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
                  My Raised <span className="text-[#ab7845]">Complaints</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Track the status of your complaints
                </p>
              </div>
              <Link
                href="/raise-complaint"
                className="flex items-center gap-2 px-4 py-2 bg-[#138808] text-white text-xs font-bold hover:opacity-90 transition-colors rounded-sm">
                
                <AlertCircle className="w-4 h-4" />
                RAISE NEW COMPLAINT
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {isLoading ?
                <div className="space-y-4 animate-in fade-in duration-500">
                    {[...Array(3)].map((_, i) =>
                  <div key={i} className="bg-white border border-gray-200 shadow-sm p-5 rounded-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <Skeleton className="h-3 w-32 mb-2" />
                            <Skeleton className="h-4 w-64" />
                          </div>
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <div className="flex gap-4">
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                  )}
                  </div> :
                complaints.length === 0 ?
                <div className="bg-white border border-gray-300 shadow-sm p-12 rounded-sm text-center">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No complaints found.</p>
                    <p className="text-sm text-slate-400 mt-1">You haven&apos;t raised any complaints yet.</p>
                  </div> :
                complaints.map((complaint: any) =>
                <div key={complaint.id} className="bg-white border border-gray-200 shadow-sm p-5 rounded-sm hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{complaint.complaintId}</span>
                          <span className="text-[10px] text-slate-300">•</span>
                          <span className="text-[10px] font-medium text-slate-400">{complaint.category}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          {complaint.title}
                        </h4>
                      </div>
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusStyle(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {complaint.description}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400">
                      {complaint.location &&
                    <span>📍 {complaint.location}</span>
                    }
                      <span>📅 {new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      {complaint.priority &&
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${complaint.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    complaint.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    complaint.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'}`
                    }>{complaint.priority}</span>
                    }
                    </div>
                  </div>
                )}
              </div>

              {}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Assistance
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        If a complaint is marked resolved but the issue
                        persists, you can re-open it within 3 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#138808] rounded-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-[#138808] shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Status Guide
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                        <span className="font-bold text-yellow-600">Pending</span> — Awaiting review<br />
                        <span className="font-bold text-blue-600">Progress</span> — Being addressed<br />
                        <span className="font-bold text-green-600">Complete</span> — Resolved
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