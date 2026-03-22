"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2, Edit2, X, FileText, Calendar } from "lucide-react";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([
    {
      id: "SCH-001",
      name: "Pradhan Mantri Awas Yojana",
      description: "Housing for all scheme by the central government providing financial assistance to build homes.",
      eligible: "BPL Families, EWS",
      link: "https://pmaymis.gov.in/",
      startDate: "2023-01-01",
      endDate: "2024-12-31",
      type: "Central"
    },
    {
      id: "SCH-002",
      name: "Swachh Bharat Mission",
      description: "Financial assistance for toilet construction in rural households.",
      eligible: "All Rural Households Without Toilets",
      link: "https://swachhbharatmission.gov.in/",
      startDate: "2022-04-15",
      endDate: "2025-03-31",
      type: "Central"
    },
    {
      id: "SCH-003",
      name: "Mukhyamantri Gram Sadak Yojana",
      description: "State initiative to connect remote villages with all-weather roads.",
      eligible: "Villages Not Connected by PMGSY",
      link: "https://maha.gov.in/",
      startDate: "2023-08-01",
      endDate: "2024-06-30",
      type: "State"
    },
    {
      id: "SCH-004",
      name: "Jal Jeevan Mission",
      description: "Har Ghar Jal - Tap water supply to every rural household.",
      eligible: "Rural Households",
      link: "https://jaljeevanmission.gov.in/",
      startDate: "2021-02-10",
      endDate: "2024-12-31",
      type: "Central"
    },
    {
      id: "SCH-005",
      name: "Panchayat Pension Scheme",
      description: "Local monthly financial aid for senior citizens and widows not covered by state.",
      eligible: "Seniors (65+), Widows, Below Poverty Line",
      link: "/schemes/panchayat-pension",
      startDate: "2023-11-01",
      endDate: "2025-11-01",
      type: "Village"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null);

  // Form State
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eligible: "",
    link: "",
    startDate: today,
    endDate: "",
    type: "Village"
  });

  const handleOpenModal = (schemeToEdit: any = null) => {
    if (schemeToEdit) {
      setEditingSchemeId(schemeToEdit.id);
      setFormData({ ...schemeToEdit });
    } else {
      setEditingSchemeId(null);
      setFormData({
        name: "",
        description: "",
        eligible: "",
        link: "",
        startDate: today,
        endDate: "",
        type: "Village"
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      setSchemes(schemes.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchemeId) {
      setSchemes(schemes.map(s => s.id === editingSchemeId ? { ...formData, id: editingSchemeId } : s));
    } else {
      const newId = `SCH-00${schemes.length + 1}`;
      setSchemes([{ ...formData, id: newId }, ...schemes]);
    }
    handleCloseModal();
  };

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-indigo-500 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Government Schemes</h1>
          <p className="text-sm text-gray-700">Manage and track Central, State, and Village level schemes.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="border cursor-pointer text-black px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Add Scheme</span>
        </button>
      </section>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search schemes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Scheme Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date / Deadline</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#2c5577] mb-1">{scheme.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{scheme.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 flex items-center justify-center rounded-md text-xs font-semibold w-20 ${scheme.type === 'Central' ? 'bg-orange-50 text-orange-700' :
                      scheme.type === 'State' ? 'bg-purple-50 text-purple-700' :
                        'bg-teal-50 text-teal-700'
                      }`}>
                      {scheme.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {scheme.startDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {scheme.endDate || 'Ongoing'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleOpenModal(scheme)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(scheme.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {schemes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText size={32} className="mx-auto text-gray-300 mb-2" />
              <p>No schemes available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Add/Edit Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSchemeId ? "Edit Scheme Details" : "Create New Scheme"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="scheme-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of Scheme <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Pradhan Mantri Awas Yojana"
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe the scheme and its benefits..."
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Eligible Peoples (Criteria) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.eligible}
                    onChange={(e) => setFormData({ ...formData, eligible: e.target.value })}
                    placeholder="e.g. BPL Families, Senior Citizens"
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Date to Apply
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheme Source / Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    >
                      <option value="Central">Central Government</option>
                      <option value="State">State Government</option>
                      <option value="Village">Village Panchayat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Link / Reference
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="e.g. https://apply.gov.in"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="scheme-form"
                className="px-6 py-2 border-2 border-orange-700 text-orange-700 rounded-md text-sm font-bold hover:bg-indigo-700 transition-colors"
              >
                {editingSchemeId ? "Update Scheme" : "Create Scheme"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
