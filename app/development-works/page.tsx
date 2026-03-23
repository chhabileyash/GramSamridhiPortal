"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Search, Map, TrendingUp, CheckCircle, Clock, X, ChevronRight, Calendar, Info } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import Footer from "@/components/Footer";

type Work = {
  id: number;
  projectId: string;
  name: string;
  description: string | null;
  contractor: string | null;
  budget: string | null;
  progress: number;
  status: string;
  startDate: string | null;
  expectedEndDate: string | null;
  createdAt: string;
};

export default function DevelopmentWorks() {
  const { user, isLoaded } = useUser();
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorks = async (villageId: string | undefined) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/development-works?villageId=${villageId}`);
        if (res.ok) {
          const json = await res.json();
          setWorks(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch development works:", err);
      } finally {
        setIsLoading(false);
      }
    };
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchWorks(villageId);
  }, []);

  const filteredWorks = works.filter(w => {
    const matchesSearch = (w.projectId || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.contractor || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatBudget = (val: string | number | null) => {
    if (!val) return "-";
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return "₹" + num.toLocaleString("en-IN");
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Ongoing": return "bg-blue-100 text-blue-800";
      case "Halted": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle size={12} className="mr-1" />;
      case "Ongoing": return <TrendingUp size={12} className="mr-1" />;
      case "Halted": return <X size={12} className="mr-1" />;
      default: return <Clock size={12} className="mr-1" />;
    }
  };

  const openModal = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Development <span className="text-[#0052cc]">Works</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Track ongoing and completed village infrastructure projects
                </p>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-gray-50 border border-gray-200 p-4 mb-6 rounded-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80 md:w-96 lg:w-[450px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] bg-white"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 bg-white rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc] w-full sm:w-auto cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending Start">Pending Start</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Halted">Halted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Table */}
            <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-6 py-4">Project ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Budget</th>
                      <th className="px-6 py-4 w-40 text-center">Progress</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-[#0052cc] border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading projects...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredWorks.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          <Map className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p>No development projects found.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredWorks.map((work) => (
                        <tr key={work.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap text-xs">{work.projectId}</td>
                          <td className="px-6 py-4">
                            <h4 className="font-bold text-[#2c5577] text-sm">{work.name}</h4>
                            {work.contractor && <p className="text-[10px] text-gray-400 mt-0.5">{work.contractor}</p>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-xs">{formatBudget(work.budget)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-2 rounded-full ${work.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                  style={{ width: `${work.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-bold text-gray-600 w-8">{work.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 flex items-center justify-center py-1 rounded-md text-[10px] font-bold uppercase tracking-wider max-w-[110px] mx-auto ${getStatusStyle(work.status)}`}>
                              {getStatusIcon(work.status)}
                              {work.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => openModal(work)}
                              className="inline-flex items-center gap-1 text-[#0052cc] hover:underline font-bold text-xs"
                            >
                              Details <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedWork && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                  <Map size={20} />
                </div>
                <h2 className="font-bold text-lg text-slate-800">Project Details</h2>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                  {selectedWork.projectId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{selectedWork.name}</h3>
              </div>

              {selectedWork.description && (
                <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 mb-5">
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedWork.description}</p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</span>
                  <span className={`text-sm font-black ${selectedWork.progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>{selectedWork.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${selectedWork.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${selectedWork.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                <div>
                  <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">Contractor</span>
                  <span className="font-bold text-gray-900">{selectedWork.contractor || "-"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">Budget</span>
                  <span className="font-bold text-gray-900">{formatBudget(selectedWork.budget)}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">Start Date</span>
                  <span className="font-medium text-gray-900">
                    {selectedWork.startDate ? new Date(selectedWork.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] font-bold uppercase block mb-0.5">Expected End</span>
                  <span className="font-medium text-gray-900">
                    {selectedWork.expectedEndDate ? new Date(selectedWork.expectedEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 text-[10px] font-bold uppercase block mb-1">Status</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${getStatusStyle(selectedWork.status)}`}>
                    {getStatusIcon(selectedWork.status)}
                    {selectedWork.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-slate-800 text-white text-xs font-bold rounded-sm hover:bg-slate-700 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
