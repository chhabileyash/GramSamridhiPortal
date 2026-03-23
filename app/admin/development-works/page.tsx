"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Search, Plus, Map, CheckCircle, TrendingUp, Edit3, Trash2, X, RefreshCw, Loader2, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function DevelopmentWorksPage() {
  const { user, isLoaded } = useUser();
  const villageId = (user?.unsafeMetadata as any)?.village_id as string;

  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contractor: "",
    budget: "",
    progress: 0,
    status: "Pending Start",
    startDate: "",
    expectedEndDate: "",
  });
  const [isSaving, setIsSaving] = useState(false);



  const fetchWorks = async (villageId?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/development-works?villageId=${villageId}`);
      if (res.ok) {
        const json = await res.json();
        setWorks(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch development works:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchWorks(villageId);
  }, [isLoaded, user]);

  const handleOpenModal = (work: any = null) => {
    if (work) {
      setEditingWork(work);
      setFormData({
        name: work.name || "",
        description: work.description || "",
        contractor: work.contractor || "",
        budget: work.budget || "",
        progress: work.progress || 0,
        status: work.status || "Pending Start",
        startDate: work.startDate || "",
        expectedEndDate: work.expectedEndDate || "",
      });
    } else {
      setEditingWork(null);
      setFormData({ name: "", description: "", contractor: "", budget: "", progress: 0, status: "Pending Start", startDate: "", expectedEndDate: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWork(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const finalStatus = Number(formData.progress) === 100 ? "Completed"
      : (Number(formData.progress) > 0 && formData.status === "Pending Start") ? "Ongoing"
        : formData.status;

    try {
      if (editingWork) {
        const res = await fetch("/api/development-works", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingWork.id, ...formData, progress: Number(formData.progress), status: finalStatus }),
        });
        if (res.ok) {
          toast.success("Project updated successfully");
          fetchWorks(villageId);
        } else {
          toast.error("Failed to update project");
        }
      } else {
        const res = await fetch("/api/development-works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ villageId, ...formData, progress: Number(formData.progress), status: finalStatus }),
        });
        if (res.ok) {
          toast.success("Project registered successfully");
          fetchWorks(villageId);
        } else {
          toast.error("Failed to register project");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
      handleCloseModal();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this project record?")) return;
    try {
      const res = await fetch(`/api/development-works?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
        setWorks(works.filter(w => w.id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Error deleting project");
    }
  };

  const totalProjects = works.length;
  const completedProjects = works.filter(w => w.status === "Completed" || w.progress === 100).length;
  const ongoingProjects = works.filter(w => w.status === "Ongoing").length;

  const filteredWorks = works.filter(w => {
    const matchesSearch = (w.projectId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (w.contractor || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatBudget = (val: string | number) => {
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return num.toLocaleString("en-IN");
  };

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-blue-600 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Development Works</h1>
          <p className="text-sm text-gray-700">Monitor and update infrastructure projects and village development initiatives.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Project</span>
        </button>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <Map size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full shrink-0">
            <CheckCircle size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{completedProjects}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-full shrink-0">
            <TrendingUp size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">Ongoing Works</p>
            <p className="text-2xl font-bold text-[#FF9933] mt-1">{ongoingProjects}</p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:max-w-md md:max-w-lg lg:w-[450px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Project ID, Name or Contractor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 bg-white rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Start">Pending Start</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Halted">Halted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Project ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contractor</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4 w-48 text-center">Progress</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 font-medium text-sm">Loading projects...</p>
                  </td>
                </tr>
              ) : filteredWorks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No infrastructure projects found.
                  </td>
                </tr>
              ) : filteredWorks.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap text-xs">{work.projectId}</td>
                  <td className="px-6 py-4 font-bold text-[#2c5577]">{work.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium text-xs">{work.contractor || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₹{formatBudget(work.budget)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${work.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${work.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8">{work.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 flex justify-center py-1 rounded-md text-[11px] font-bold uppercase tracking-wider max-w-[120px] mx-auto ${work.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      work.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        work.status === 'Halted' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {work.status === 'Completed' && <CheckCircle size={12} className="mr-1.5" />}
                      {work.status === 'Ongoing' && <TrendingUp size={12} className="mr-1.5" />}
                      {work.status === 'Halted' && <X size={12} className="mr-1.5" />}
                      {work.status === 'Pending Start' && <Clock size={12} className="mr-1.5" />}
                      {work.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(work)}
                        className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1.5 rounded font-semibold text-xs transition-colors border border-blue-200"
                      >
                        <Edit3 size={14} /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(work.id)}
                        className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1.5 rounded font-semibold text-xs transition-colors border border-red-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <RefreshCw className="text-blue-600" size={20} />
                {editingWork ? "Update Project Phase" : "Register New Project"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Village Main Road Repair"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the project scope..."
                    rows={2}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contractor/Agency</label>
                    <input
                      type="text"
                      value={formData.contractor}
                      onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                      placeholder="e.g. ABC Infra"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Budget Allocated (₹) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g. 500000"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expected End Date</label>
                    <input
                      type="date"
                      value={formData.expectedEndDate}
                      onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Execution Status</h3>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-semibold text-gray-700">Project Progress</label>
                        <span className="font-bold text-blue-700">{formData.progress}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Override Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm cursor-pointer bg-white"
                      >
                        <option value="Pending Start">Pending Start</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Halted">Halted (Blocked)</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2 italic">* Setting progress to 100% will automatically mark the project as Completed.</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3 rounded-b-xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="project-form"
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                {editingWork ? "Save Updates" : "Register Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
