"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Info,
  Calendar,
  ExternalLink,
  X,
  FileText,
  LayoutList,
  ListFilter,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserSchemesPage() {
  const { user, isLoaded } = useUser();

  const [schemes, setSchemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState<any | null>(null);

  useEffect(() => {
    const villageId = user?.unsafeMetadata?.village_id as string;
    const fetchSchemes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/schemes?villageId=${encodeURIComponent(villageId)}`,
        );
        if (res.ok) {
          const json = await res.json();
          setSchemes(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch schemes:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchemes();
  }, [isLoaded, user]);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto max-w-6xl">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Available <span className="text-[#0052cc]">Schemes</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Browse and apply for Government and Panchayat schemes
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="bg-[#0052cc]/10 text-[#0052cc] p-2 rounded-sm shrink-0">
                    <ListFilter className="w-4 h-4" />
                  </div>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full sm:w-auto pl-3 pr-8 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] bg-white cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    <option value="Central">Central Govt</option>
                    <option value="State">State Govt</option>
                    <option value="Village">Panchayat</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-80 md:w-[200px] lg:w-[450px]">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search schemes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-xs text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-6 font-semibold">Scheme Name</th>
                      <th className="py-3 px-6 font-semibold">Type</th>
                      <th className="py-3 px-6 font-semibold">
                        Important Dates
                      </th>
                      <th className="py-3 px-6 font-semibold">Apply Link</th>
                      <th className="py-3 px-6 font-semibold text-right">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      [...Array(4)].map((_, i) => (
                        <tr
                          key={i}
                          className="animate-in fade-in duration-500 border-b border-gray-100"
                        >
                          <td className="py-4 px-6">
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-full" />
                          </td>
                          <td className="py-4 px-6">
                            <Skeleton className="h-6 w-16" />
                          </td>
                          <td className="py-4 px-6">
                            <Skeleton className="h-4 w-24" />
                          </td>
                          <td className="py-4 px-6">
                            <Skeleton className="h-4 w-20" />
                          </td>
                          <td className="py-4 px-6 text-right">
                            <Skeleton className="h-8 w-24 ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : filteredSchemes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-12 text-center text-slate-500"
                        >
                          <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                          <p className="font-medium">No schemes found.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredSchemes.map((scheme) => (
                        <tr
                          key={scheme.id}
                          className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-4 px-6 align-top w-32 truncate">
                            <p className="font-bold text-sm text-slate-800 max-w-lg mb-1 truncate">
                              {scheme.title}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-2 max-w-sm truncate">
                              {scheme.description}
                            </p>
                          </td>
                          <td className="py-4 px-6 align-top">
                            <span
                              className={`inline-block px-2 py-1 rounded text-[12px] font-bold uppercase ${
                                scheme.category === "Central"
                                  ? "bg-orange-100 text-orange-700"
                                  : scheme.category === "State"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-teal-100 text-teal-700"
                              }`}
                            >
                              {scheme.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 align-top">
                            {scheme.endDate ? (
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  Till{" "}
                                  {new Date(scheme.endDate).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-500 italic">
                                Ongoing
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top">
                            {scheme.link ? (
                              <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0052cc] hover:underline"
                              >
                                Apply Here <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400 italic">
                                Inquire at office
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 align-top text-right">
                            <button
                              onClick={() => setSelectedScheme(scheme)}
                              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 border border-slate-300 rounded-sm text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <Info className="w-3 h-3" />
                              View Info
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for Scheme Info */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutList className="w-5 h-5 text-[#0052cc]" />
                <h3 className="text-lg font-bold text-slate-800">
                  Scheme Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <div className="flex flex-col gap-3 mb-2">
                  <h2 className="text-xl font-bold text-slate-900 leading-tight max-w-full text-wrap wrap-break-word">
                    {selectedScheme.title}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] w-14 font-bold uppercase shrink-0 ${
                      selectedScheme.category === "Central"
                        ? "bg-orange-100 text-orange-700"
                        : selectedScheme.category === "State"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {selectedScheme.category}
                  </span>
                </div>
                {selectedScheme.schemeId && (
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-wrap break-all">
                    Ref ID: {selectedScheme.schemeId}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    About the Scheme
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-sm border border-slate-100 text-wrap max-w-full   wrap-break-word">
                    {selectedScheme.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedScheme.eligible && (
                    <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-sm">
                      <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                        Eligibility Features
                      </h4>
                      <p className="text-sm text-blue-900 font-medium text-wrap break-words">
                        {selectedScheme.eligible}
                      </p>
                    </div>
                  )}

                  <div className="p-4 border border-slate-200 rounded-sm">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Timeline
                    </h4>
                    <div className="text-sm font-medium text-slate-800 flex flex-col gap-1">
                      {selectedScheme.startDate && (
                        <span>
                          Start:{" "}
                          {new Date(
                            selectedScheme.startDate,
                          ).toLocaleDateString()}
                        </span>
                      )}
                      <span>
                        Deadline:{" "}
                        {selectedScheme.endDate
                          ? new Date(
                              selectedScheme.endDate,
                            ).toLocaleDateString()
                          : "Ongoing"}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedScheme.amount && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Benefit Amount
                    </h4>
                    <p className="text-lg font-bold text-green-700">
                      ₹{selectedScheme.amount}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-slate-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-slate-700 text-sm font-bold rounded-sm transition-colors"
              >
                Close
              </button>
              {selectedScheme.link && (
                <a
                  href={selectedScheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-[#0052cc] text-black border text-sm font-bold rounded-sm hover:bg-[#0047b3] transition-colors flex items-center gap-2 shadow-sm"
                >
                  Proceed to Apply <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
