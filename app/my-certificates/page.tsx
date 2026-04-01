"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info
} from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Footer from "@/shared/components/layout/Footer";

export default function MyCertificates() {
  const { user } = useUser();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const meta = user?.unsafeMetadata as any;
        const villageId = meta?.village_id;
        const res = await fetch(
          `/api/certificates${villageId ? `?villageId=${villageId}` : ""}`,
        );
        if (res.ok) {
          const json = await res.json();
          setCertificates(json.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchCertificates();
  }, [user]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  My Requested{" "}
                  <span className="text-[#ab7845]">Certificates</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Track the status of your certificate applications
                </p>
              </div>
              <Link
                href="/certificates"
                className="flex items-center gap-2 px-4 py-2 bg-[#138808] text-white text-xs font-bold hover:opacity-90 transition-colors rounded-sm"
              >
                <FileText className="w-4 h-4" />
                APPLY FOR NEW CERTIFICATE
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-4">
                {isLoading ? (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 shadow-sm p-5 rounded-sm"
                      >
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
                    ))}
                  </div>
                ) : certificates.length === 0 ? (
                  <div className="bg-white border border-gray-300 shadow-sm p-12 rounded-sm text-center">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">
                      No certificates found.
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      You haven't requested any certificates yet.
                    </p>
                  </div>
                ) : (
                  certificates.map((cert: any) => (
                    <div
                      key={cert.id}
                      className="bg-white border border-gray-200 shadow-sm p-5 rounded-sm hover:border-gray-300 transition-colors flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {cert.certificateId}
                            </span>
                            <span className="text-[10px] text-slate-300">
                              •
                            </span>
                            <span className="text-[10px] font-medium text-slate-400">
                              {cert.applicantName}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {cert.certificateType}
                          </h4>
                        </div>
                        <span
                          className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusStyle(cert.status)}`}
                        >
                          {getStatusIcon(cert.status)}
                          {cert.status}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 text-sm text-slate-600 mb-3">
                        <p>
                          <strong>Applicant Name:</strong> {cert.applicantName}
                        </p>
                        <p>
                          <strong>Contact:</strong> {cert.applicantContact}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400">
                        <span>
                          📅 Applied on:{" "}
                          {new Date(cert.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </span>
                        {cert.updatedAt && (
                          <span>
                            🔄 Last updated:{" "}
                            {new Date(cert.updatedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-orange-50 border border-orange-200 p-5 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <FileText className="w-16 h-16 text-orange-900" />
                  </div>
                  <h3 className="font-bold text-orange-900 mb-2 relative z-10 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    How to trace?
                  </h3>
                  <p className="text-orange-800 text-xs leading-relaxed relative z-10 mb-4">
                    Your certificate request will initially be marked as
                    "Pending". Keep an eye on the status here. You will also
                    receive email notifications as soon as your certificate is
                    approved or rejected.
                  </p>
                  <ul className="text-orange-800 text-xs space-y-2 relative z-10 pl-5 list-disc">
                    <li>Pending: Admin is processing</li>
                    <li>
                      Approved: Ready for download or available at panchayat
                      office
                    </li>
                    <li>Rejected: Need to re-apply</li>
                  </ul>
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
