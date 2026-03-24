"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, Edit2, X, FileText, Calendar, Loader2, Filter, Layers, CheckCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function SchemesPage() {
  const { user } = useUser();
  const villageId = user?.unsafeMetadata?.village_id as string;

  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Form State
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligible: "",
    link: "",
    startDate: today,
    endDate: "",
    category: "Village",
    amount: ""
  });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schemes${villageId ? `?villageId=${villageId}` : ""}`);
      const result = await res.json();
      if (result.data) {
        setSchemes(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [villageId]);

  const handleOpenModal = (schemeToEdit: any = null) => {
    if (schemeToEdit) {
      setEditingSchemeId(schemeToEdit.id);
      setFormData({
        title: schemeToEdit.title || "",
        description: schemeToEdit.description || "",
        eligible: schemeToEdit.eligible || "",
        link: schemeToEdit.link || "",
        startDate: schemeToEdit.startDate || today,
        endDate: schemeToEdit.endDate || "",
        category: schemeToEdit.category || "Village",
        amount: schemeToEdit.amount || ""
      });
    } else {
      setEditingSchemeId(null);
      setFormData({
        title: "",
        description: "",
        eligible: "",
        link: "",
        startDate: today,
        endDate: "",
        category: "Village",
        amount: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      try {
        const res = await fetch(`/api/schemes?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          setSchemes(schemes.filter(s => s.id !== id));
        }
      } catch (err) {
        console.error("Failed to delete scheme:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, villageId })
      });
      if (res.ok) {
        await fetchSchemes();
        handleCloseModal();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save scheme");
      }
    } catch (err) {
      console.error("Failed to save scheme:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch =
      (scheme.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.schemeId || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || scheme.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Metrics
  const totalSchemes = schemes.length;
  const centralSchemes = schemes.filter(s => s.category === "Central").length;
  const stateSchemes = schemes.filter(s => s.category === "State").length;
  const villageSchemes = schemes.filter(s => s.category === "Village").length;

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-[#0052cc] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Government Schemes Configuration</h1>
          <p className="text-sm text-gray-700">Manage and track Central, State, and Village level schemes and benefits.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="text-white bg-[#0052cc] px-6 py-2.5 rounded-md font-bold hover:bg-[#0047b3] transition-colors flex items-center justify-center gap-2 min-w-[160px] shadow-sm"
        >
          <Plus size={18} />
          <span>Add Scheme</span>
        </button>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#0052cc] rounded-full">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Total Schemes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalSchemes}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Central Govt</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{centralSchemes}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">State Govt</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{stateSchemes}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-full">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Village Panchayat</p>
            <p className="text-2xl font-bold text-teal-600 mt-1">{villageSchemes}</p>
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
              placeholder="Search schemes by Title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 min-w-max">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600 mr-1">Filter:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052cc] cursor-pointer min-w-max"
            >
              <option value="All">All Entities</option>
              <option value="Central">Central Government</option>
              <option value="State">State Government</option>
              <option value="Village">Village Panchayat</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px]">
          {loading ? (
            <div className="w-full text-left">
              <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-4 bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
                 <span>Ref ID</span><span>Scheme Name</span><span>Entity Type</span><span>Registration Window</span><span className="text-right">Actions</span>
              </div>
              <div className="divide-y divide-gray-100">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col sm:grid sm:grid-cols-5 gap-4 px-6 py-4 animate-in fade-in duration-500">
                    <div><Skeleton className="h-4 w-20" /></div>
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                    <div><Skeleton className="h-6 w-20 rounded-md" /></div>
                    <div><Skeleton className="h-4 w-32" /></div>
                    <div className="flex sm:justify-end gap-3"><Skeleton className="h-8 w-8 rounded" /><Skeleton className="h-8 w-8 rounded" /></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Ref ID</th>
                    <th className="px-6 py-4">Scheme Name</th>
                    <th className="px-6 py-4">Entity Type</th>
                    <th className="px-6 py-4">Registration Window</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSchemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap text-xs">
                        {scheme.schemeId}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#2c5577] mb-1">{scheme.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{scheme.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 flex items-center justify-center py-1 rounded-md text-xs font-bold w-20 ${scheme.category === 'Central' ? 'bg-orange-100 text-orange-800' :
                          scheme.category === 'State' ? 'bg-purple-100 text-purple-800' :
                            'bg-teal-100 text-teal-800'
                          }`}>
                          {scheme.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <Calendar size={14} className="text-gray-400" />
                          {scheme.startDate ? new Date(scheme.startDate).toLocaleDateString('en-IN') : 'N/A'} - {scheme.endDate ? new Date(scheme.endDate).toLocaleDateString('en-IN') : 'Ongoing'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenModal(scheme)}
                            className="text-[#0052cc] hover:text-[#003d99] bg-blue-50 p-1.5 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(scheme.id)}
                            className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSchemes.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-lg font-medium">No schemes found</p>
                  <p className="text-sm">Try adjusting your filters or search term.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Add/Edit Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0052cc]" />
                {editingSchemeId ? "Edit Scheme Details" : "Create New Scheme"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
                disabled={submitting}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="scheme-form" onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Name of Scheme <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Pradhan Mantri Awas Yojana"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Briefly describe the scheme and its benefits..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Eligible Peoples (Criteria)
                    </label>
                    <input
                      type="text"
                      value={formData.eligible}
                      onChange={(e) => setFormData({ ...formData, eligible: e.target.value })}
                      placeholder="e.g. BPL Families, Senior Citizens"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Last Date to Apply
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Scheme Source / Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors cursor-pointer"
                      >
                        <option value="Central">Central Government</option>
                        <option value="State">State Government</option>
                        <option value="Village">Village Panchayat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Application Link
                      </label>
                      <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="e.g. https://apply.gov.in"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0052cc] focus:border-transparent outline-none text-sm bg-gray-50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={submitting}
                className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="scheme-form"
                disabled={submitting}
                className="px-6 py-2 bg-[#0052cc] text-white rounded-md text-sm font-bold hover:bg-[#003d99] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {submitting && <Loader2 className="animate-spin" size={16} />}
                {editingSchemeId ? "Save Updates" : "Publish Scheme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
