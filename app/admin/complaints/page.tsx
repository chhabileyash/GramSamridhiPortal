"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  X,
  Save,
  FileText,
  Phone,
  User,
  Calendar,
  MapPin } from
"lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function ComplaintsPage() {
  const { user, isLoaded } = useUser();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<number | null>(
    null
  );
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");


  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  useEffect(() => {
    if (!isLoaded || !user) return;
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/complaints?villageId=${villageId}`);
        if (res.ok) {
          const json = await res.json();
          setComplaints(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, [isLoaded, user]);

  const openDetailsModal = (complaint: any) => {
    setSelectedComplaintId(complaint.id);
    setEditStatus(complaint.status);
    setEditPriority(complaint.priority || "Medium");
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedComplaintId(null);
  };

  const handleSaveChanges = async () => {
    if (selectedComplaintId === null) return;
    try {
      const res = await fetch("/api/complaints", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedComplaintId,
          status: editStatus,
          priority: editPriority
        })
      });
      if (res.ok) {
        setComplaints(
          complaints.map((cmp) =>
          cmp.id === selectedComplaintId ?
          { ...cmp, status: editStatus, priority: editPriority } :
          cmp
          )
        );
      }
    } catch (err) {
      console.error("Failed to update complaint:", err);
    }
    closeDetailsModal();
  };


  const totalReports = complaints.length;
  const pendingReports = complaints.filter(
    (c) => c.status === "Pending"
  ).length;
  const progressReports = complaints.filter(
    (c) => c.status === "Progress"
  ).length;
  const completeReports = complaints.filter(
    (c) => c.status === "Complete"
  ).length;

  const filteredComplaints = complaints.filter((cmp) => {
    const matchesSearch =
    (cmp.complaintId || "").
    toLowerCase().
    includes(searchQuery.toLowerCase()) ||
    (cmp.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || cmp.status === statusFilter;
    const matchesCategory =
    categoryFilter === "All" || cmp.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const selectedComplaint = complaints.find(
    (c) => c.id === selectedComplaintId
  );

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-red-500 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Complaints Management
          </h1>
          <p className="text-sm text-gray-700">
            Track, update, and resolve citizen grievances and infrastructure
            issues.
          </p>
        </div>
      </section>

      {}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Total Reports
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {totalReports}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Pending
            </p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {pendingReports}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              In Progress
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {progressReports}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Complete
            </p>
            <p className="text-2xl font-bold text-[#138808] mt-1">
              {completeReports}
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18} />
            
            <input
              type="text"
              placeholder="Search complaints by ID or Title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" />
            
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 min-w-max">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600 mr-1">
                Filter:
              </span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer min-w-max">
              
              <option value="All">All Categories</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Street Lights">Street Lights</option>
              <option value="Sanitation & Garbage">Sanitation & Garbage</option>
              <option value="Roads">Roads</option>
              <option value="Drainage">Drainage</option>
              <option value="Electricity">Electricity</option>
              <option value="Public Property">Public Property</option>
              <option value="Administration">Administration</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer min-w-max">
              
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Progress">Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title / Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Priority</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ?
              [...Array(5)].map((_, i) =>
              <tr key={i} className="hover:bg-gray-50 transition-colors animate-in fade-in duration-500">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-40 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 mx-auto rounded-md" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24 mx-auto rounded-full" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-28 ml-auto rounded" /></td>
                  </tr>
              ) :
              filteredComplaints.length === 0 ?
              <tr>
                  <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500">
                  
                    No complaints found matching your criteria.
                  </td>
                </tr> :

              filteredComplaints.map((complaint) =>
              <tr
                key={complaint.id}
                className="hover:bg-gray-50 transition-colors">
                
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {complaint.complaintId}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#2c5577] mb-1">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {complaint.category}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                      {complaint.createdAt ?
                  new Date(complaint.createdAt).toLocaleDateString(
                    "en-IN"
                  ) :
                  "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                    className={`px-2 py-1 flex justify-center items-center rounded-md text-xs font-bold w-full mx-auto max-w-[90px] ${
                    complaint.priority === "Critical" ?
                    "bg-red-100 text-red-800 border border-red-200" :
                    complaint.priority === "High" ?
                    "bg-orange-100 text-orange-800 border border-orange-200" :
                    complaint.priority === "Medium" ?
                    "bg-blue-100 text-blue-800 border border-blue-200" :
                    "bg-gray-100 text-gray-800 border border-gray-200"}`
                    }>
                    
                        {complaint.priority || "Medium"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                    className={`px-2 flex justify-center py-1.5 rounded-full text-xs font-bold w-full mx-auto max-w-[100px] ${
                    complaint.status === "Complete" ?
                    "bg-green-100 text-green-800" :
                    complaint.status === "Progress" ?
                    "bg-blue-100 text-blue-800" :
                    complaint.status === "Pending" ?
                    "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"}`
                    }>
                    
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                    onClick={() => openDetailsModal(complaint)}
                    className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded shadow-sm hover:bg-red-100 transition-colors font-medium text-xs focus:ring-2 focus:ring-offset-1 focus:ring-red-500">
                    
                        <Eye size={14} />
                        View Details
                      </button>
                    </td>
                  </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </section>

      {}
      {isModalOpen && selectedComplaint &&
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="text-red-500" size={20} />
                  Complaint Review
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ticket: {selectedComplaint.complaintId}
                </p>
              </div>
              <button
              onClick={closeDetailsModal}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200">
              
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#2c5577] mb-2">
                  {selectedComplaint.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-100">
                  {selectedComplaint.description}
                </p>
              </div>

              {}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-b border-gray-100 pb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Logged Date
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedComplaint.createdAt ?
                      new Date(
                        selectedComplaint.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }) :
                      "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Category
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedComplaint.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Complainant Contact
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedComplaint.citizenName || "Not provided"}
                      </p>
                      {selectedComplaint.citizenContact &&
                    <p className="text-xs text-[#2c5577] font-medium flex items-center gap-1 mt-0.5">
                          <Phone size={10} /> {selectedComplaint.citizenContact}
                        </p>
                    }
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedComplaint.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                  Admin Controls Update
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Update Status
                    </label>
                    <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    
                      <option value="Pending">Pending</option>
                      <option value="Progress">Progress</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Update Priority
                    </label>
                    <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-end gap-3">
              <button
              onClick={closeDetailsModal}
              className="px-5 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors">
              
                Cancel
              </button>
              <button
              onClick={handleSaveChanges}
              className="px-5 py-2 bg-[#138808] text-white rounded-md font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm">
              
                <Save size={16} />
                Save Updates
              </button>
            </div>
          </div>
        </div>
      }
    </>);

}