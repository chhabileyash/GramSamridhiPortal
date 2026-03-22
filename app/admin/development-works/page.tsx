"use client";

import React, { useState } from "react";
import { Search, Plus, Map, CheckCircle, TrendingUp, Edit3, Trash2, X, RefreshCw } from "lucide-react";

export default function DevelopmentWorksPage() {
  const [works, setWorks] = useState([
    { id: "DW-23-01", name: "Village Main Road Repair", contractor: "ABC Infra", budget: "12,50,000", progress: 85, status: "Ongoing" },
    { id: "DW-23-02", name: "New Panchayat Well Construction", contractor: "XYZ Builders", budget: "8,00,000", progress: 100, status: "Completed" },
    { id: "DW-23-03", name: "Primary School Renovation", contractor: "Local Co-op", budget: "5,25,000", progress: 40, status: "Ongoing" },
    { id: "DW-23-04", name: "Solar Street Lights Installation", contractor: "SunPower Ltd", budget: "15,00,000", progress: 10, status: "Pending Start" },
    { id: "DW-23-05", name: "Community Hall Construction", contractor: "ABC Infra", budget: "25,00,000", progress: 60, status: "Ongoing" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    contractor: "",
    budget: "",
    progress: 0,
    status: "Pending Start"
  });

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = (workToEdit: any = null) => {
    if (workToEdit) {
      setEditingWorkId(workToEdit.id);
      setFormData({
        name: workToEdit.name,
        contractor: workToEdit.contractor,
        budget: workToEdit.budget.replace(/,/g, ""), // Strip commas for input
        progress: workToEdit.progress,
        status: workToEdit.status
      });
    } else {
      setEditingWorkId(null);
      setFormData({ name: "", contractor: "", budget: "", progress: 0, status: "Pending Start" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatCurrency = (amount: string | number): string => {
    const num = Number(amount);
    if (isNaN(num)) return String(amount);
    return num.toLocaleString('en-IN');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      budget: formatCurrency(formData.budget),
      progress: Number(formData.progress),
      // Auto-update status if progress is 100, or if progress > 0 and status is Pending
      status: Number(formData.progress) === 100 ? "Completed"
        : (Number(formData.progress) > 0 && formData.status === "Pending Start") ? "Ongoing"
          : formData.status
    };

    if (editingWorkId) {
      setWorks(works.map(w => w.id === editingWorkId ? { ...formattedData, id: editingWorkId } : w));
    } else {
      const newId = `DW-24-0${works.length + 1}`;
      setWorks([{ ...formattedData, id: newId }, ...works]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to completely remove this project record?")) {
      setWorks(works.filter(w => w.id !== id));
    }
  };

  // Metrics
  const totalProjects = works.length;
  const completedProjects = works.filter(w => w.status === "Completed" || w.progress === 100).length;
  const ongoingProjects = works.filter(w => w.status === "Ongoing").length;

  const filteredWorks = works.filter(w =>
    w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.contractor.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <span>New Project</span>
        </button>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Map size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Completed YTD</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{completedProjects}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Ongoing Works</p>
            <p className="text-2xl font-bold text-[#FF9933] mt-1">{ongoingProjects}</p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects by ID, Name or Contractor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
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
              {filteredWorks.map((work) => (
                <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{work.id}</td>
                  <td className="px-6 py-4 font-bold text-[#2c5577]">{work.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{work.contractor}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">₹{work.budget}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full ${work.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${work.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8">{work.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 flex justify-center py-1.5 rounded-full text-xs font-bold w-full max-w-[110px] mx-auto ${work.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      work.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        work.status === 'Halted' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
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
              {filteredWorks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No infrastructure projects found matching your search.
                  </td>
                </tr>
              )}
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
                {editingWorkId ? "Update Project Phase" : "Register New Project"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm cursor-pointer"
                      >
                        <option value="Pending Start">Pending Start</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Halted">Halted (Blocked)</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2 italic">* Setting progress to 100% will automatically mark the project as Completed upon saving.</p>
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
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors"
              >
                {editingWorkId ? "Save Updates" : "Register Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
