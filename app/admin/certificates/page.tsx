"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  FileBadge,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  X,
  Save,
  AlertCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CertificatesAdminPage() {
  const { user, isLoaded } = useUser();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    if (!isLoaded || !user) return;
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;

    const fetchCertificates = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/certificates?villageId=${villageId}`);
        if (res.ok) {
          const json = await res.json();
          setCertificates(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCertificates();
  }, [isLoaded, user]);

  const openDetailsModal = (cert: any) => {
    setSelectedCertId(cert.id);
    setEditStatus(cert.status);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedCertId(null);
  };

  const handleSaveChanges = async () => {
    if (selectedCertId === null) return;
    try {
      const res = await fetch("/api/certificates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedCertId,
          status: editStatus,
        }),
      });
      if (res.ok) {
        setCertificates(
          certificates.map((cert) =>
            cert.id === selectedCertId
              ? { ...cert, status: editStatus }
              : cert
          )
        );
      }
    } catch (err) {
      console.error("Failed to update certificate:", err);
    }
    closeDetailsModal();
  };

  const totalCerts = certificates.length;
  const pendingCerts = certificates.filter((c) => c.status === "Pending").length;
  const approvedCerts = certificates.filter((c) => c.status === "Approved").length;
  const rejectedCerts = certificates.filter((c) => c.status === "Rejected").length;

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      (cert.certificateId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.applicantName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || cert.status === statusFilter;
    const matchesType = typeFilter === "All" || cert.certificateType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const selectedCert = certificates.find((c) => c.id === selectedCertId);

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-blue-500 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Certificate Approvals
          </h1>
          <p className="text-sm text-gray-700">
            Review and process citizen requests for Birth, Death, and Marriage certificates.
          </p>
        </div>
      </section>

      {/* KPI Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FileBadge size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Total Requests</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalCerts}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCerts}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Approved</p>
            <p className="text-2xl font-bold text-[#138808] mt-1">{approvedCerts}</p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase">Rejected</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{rejectedCerts}</p>
          </div>
        </div>
      </section>

      {/* Filters & Table */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID or Applicant Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-1.5 min-w-max">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600 mr-1">Filter:</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-max"
            >
              <option value="All">All Types</option>
              <option value="Birth">Birth</option>
              <option value="Death">Death</option>
              <option value="Marriage">Marriage</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-max"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Application Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24 mx-auto rounded-full" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-28 ml-auto rounded" /></td>
                  </tr>
                ))
              ) : filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No certificate applications found.
                  </td>
                </tr>
              ) : (
                filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {cert.certificateId}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#2c5577]">{cert.applicantName}</p>
                      <p className="text-xs text-gray-500">{cert.applicantContact}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {cert.certificateType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                      {cert.createdAt ? new Date(cert.createdAt).toLocaleDateString("en-IN") : "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold inline-block max-w-[100px] w-full ${
                          cert.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : cert.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openDetailsModal(cert)}
                        className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded shadow-sm hover:bg-blue-100 transition-colors font-medium text-xs focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                      >
                        <Eye size={14} />
                        View / Approve
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileBadge className="text-blue-500" size={20} />
                  Certificate Application Review
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  ID: {selectedCert.certificateId} | Type: {selectedCert.certificateType}
                </p>
              </div>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-white flex-1 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Basic Summary */}
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-2">Applicant Snapshot</h3>
                    <p className="text-sm"><strong>Name:</strong> {selectedCert.applicantName}</p>
                    <p className="text-sm"><strong>Phone:</strong> {selectedCert.applicantContact}</p>
                    <p className="text-sm"><strong>Date Applied:</strong> {new Date(selectedCert.createdAt).toLocaleDateString()}</p>
                 </div>

                 {/* Admin Action */}
                 <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 flex flex-col justify-center">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Update Application Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option value="Pending">Pending (Under Review)</option>
                      <option value="Approved">Approved (Ready for Issuance)</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                 </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-2">Complete Application Payload</h3>
                <p className="text-sm text-gray-600 mb-3">
                  To ensure accuracy, the complete submitted form is provided below containing all nested addresses, persons, and event variables:
                </p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto max-h-[400px]">
                  {JSON.stringify(selectedCert.formData, null, 2)}
                </pre>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={closeDetailsModal}
                className="px-5 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-white transition-colors"
                title="Discard Changes"
              >
                Close
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-5 py-2 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save size={16} />
                Confirm Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
