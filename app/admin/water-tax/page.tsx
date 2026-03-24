"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Filter,
  Droplet,
  Wallet,
  Clock,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WaterTaxPage() {
  const { user, isLoaded } = useUser();
  const [taxes, setTaxes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedTaxId, setSelectedTaxId] = useState<number | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [financialYearFilter, setFinancialYearFilter] = useState("All");

  useEffect(() => {
    
    const fetchTaxes = async (villageId?: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/water-tax?villageId=${villageId}`);
        if (res.ok) {
          const json = await res.json();
          setTaxes(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch water taxes:", err);
      } finally {
        setIsLoading(false);
      }
    };
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchTaxes(villageId);
  }, [user, isLoaded]);

  const handleOpenProof = (id: number) => {
    setSelectedTaxId(id);
    setIsProofModalOpen(true);
  };

  const handleCloseProof = () => {
    setIsProofModalOpen(false);
    setSelectedTaxId(null);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (selectedTaxId === null) return;
    try {
      const res = await fetch("/api/water-tax", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedTaxId, status: newStatus }),
      });
      if (res.ok) {
        setTaxes(
          taxes.map((tax) =>
            tax.id === selectedTaxId ? { ...tax, status: newStatus } : tax,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
    handleCloseProof();
  };

  const handleAccept = () => handleUpdateStatus("Paid");
  const handleReject = () => handleUpdateStatus("Denied");

  const filteredTaxes = taxes.filter((tax) => {
    const matchesSearch =
      (tax.invoiceId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tax.ownerName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      financialYearFilter === "All" ||
      tax.financialYear === financialYearFilter;
    return matchesSearch && matchesYear;
  });

  const selectedTax = taxes.find((t) => t.id === selectedTaxId);

  // Metrics Logic
  const totalInvoices = taxes.length;
  const totalRevenue = taxes
    .filter((t) => t.status === "Paid")
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const pendingRequests = taxes.filter(
    (t) => t.status === "Reviewing" || t.status === "Pending",
  ).length;
  const paidCount = taxes.filter((t) => t.status === "Paid").length;

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-cyan-500 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Water Tax Management
          </h1>
          <p className="text-sm text-gray-700">
            Review water tax payment proofs, accept or deny submissions, and
            track collections.
          </p>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-full shrink-0">
            <Droplet size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">
              Total Records
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
              {totalInvoices}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full shrink-0">
            <Wallet size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">
              Total Revenue
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1 truncate">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full shrink-0">
            <Clock size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">
              Pending Verification
            </p>
            <p className="text-2xl font-bold text-yellow-600 mt-1 truncate">
              {pendingRequests}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <CheckCircle size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 font-semibold uppercase truncate">
              Verified Payments
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-1 truncate">
              {paidCount}
            </p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:max-w-md md:max-w-lg lg:w-[450px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Invoice ID or Owner Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 min-w-max hidden sm:flex">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600 mr-1">
                Filter:
              </span>
            </div>
            <select
              value={financialYearFilter}
              onChange={(e) => setFinancialYearFilter(e.target.value)}
              className="border border-gray-300 bg-white rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-auto cursor-pointer"
            >
              <option value="All">All Financial Years</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Connection ID</th>
                <th className="px-6 py-4">Owner Name</th>
                <th className="px-6 py-4">Fin. Year</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 animate-in fade-in duration-500">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 mx-auto rounded-md" /></td>
                    <td className="px-6 py-4"><div className="flex justify-end"><Skeleton className="h-8 w-24 rounded" /></div></td>
                  </tr>
                ))
              ) : filteredTaxes.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No tax records found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTaxes.map((tax) => (
                  <tr
                    key={tax.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap text-xs">
                      {tax.invoiceId}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs font-semibold">
                      {tax.connectionId}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#2c5577]">
                      {tax.ownerName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700 text-xs">
                      {tax.financialYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      ₹ {parseFloat(tax.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 flex items-center justify-center py-1 rounded-md text-[11px] font-bold uppercase tracking-wider max-w-[120px] mx-auto ${
                          tax.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : tax.status === "Reviewing" ||
                                tax.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tax.status === "Paid" && (
                          <CheckCircle size={12} className="mr-1.5" />
                        )}
                        {(tax.status === "Reviewing" ||
                          tax.status === "Pending") && (
                          <Clock size={12} className="mr-1.5" />
                        )}
                        {tax.status === "Denied" && (
                          <XCircle size={12} className="mr-1.5" />
                        )}
                        {tax.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {tax.status === "Reviewing" ||
                      tax.status === "Pending" ? (
                        <button
                          onClick={() => handleOpenProof(tax.id)}
                          className="inline-flex items-center gap-1.5 bg-[#2c5577] text-white px-3 py-1.5 rounded shadow-sm hover:bg-[#1a364d] transition-colors font-medium text-xs focus:ring-2 focus:ring-offset-1 focus:ring-[#2c5577]"
                        >
                          <Eye size={14} />
                          View Proof{" "}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-[11px] font-bold italic uppercase">
                          Action Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* View Proof Modal */}
      {isProofModalOpen && selectedTax && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Search className="text-cyan-500" size={20} />
                  Payment Proof Review
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Invoice: {selectedTax.invoiceId}
                </p>
              </div>
              <button
                onClick={handleCloseProof}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 bg-gray-50 flex flex-col items-center justify-center">
              <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-2">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Payment Reference Number
                </span>
                <span className="text-2xl font-black text-cyan-600 tracking-widest">
                  {selectedTax.referenceNumber || "N/A"}
                </span>
              </div>

              <div className="w-full mt-6 bg-white border border-gray-200 rounded p-5 shadow-sm text-sm">
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                      Property Owner
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedTax.ownerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                      Connection ID
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedTax.connectionId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                      Declared Amount
                    </span>
                    <span className="font-black text-cyan-600 text-lg">
                      ₹ {parseFloat(selectedTax.amount).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider block mb-0.5">
                      Payment Date
                    </span>
                    <span className="font-semibold text-gray-900">
                      {selectedTax.paymentDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-white grid grid-cols-2 gap-4">
              <button
                onClick={handleReject}
                className="w-full py-2.5 border  text-red-600  border-red-500 hover:bg-red-50 rounded-md text-sm font-bold transition-colors flex justify-center items-center gap-2"
              >
                <XCircle size={18} />
                Deny Proof
              </button>
              <button
                onClick={handleAccept}
                className="w-full py-2.5 bg-[#138808] text-white hover:bg-green-700 rounded-md text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
              >
                <CheckCircle size={18} />
                Accept & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
