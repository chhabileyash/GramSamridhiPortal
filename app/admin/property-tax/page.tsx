"use client";

import React, { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, X, Filter } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function PropertyTaxPage() {
  const { user, isLoaded } = useUser();
  type TaxRecord = {
    id: number;
    invoiceId: string;
    ownerName: string;
    propertyId: string;
    amount: string;
    paymentDate: string;
    financialYear: string;
    status: string;
    referenceNumber: string | null;
  };

  const [taxes, setTaxes] = useState<TaxRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function fetchTaxes(villageId?: string) {
      try {
        const res = await fetch(
          `/api/property-tax?villageId=${encodeURIComponent(villageId || "")}`,
        );

        if (res.ok) {
          const json = await res.json();
          if (json.data) setTaxes(json.data);
        }
      } catch (err) {
        console.error("Fetch taxes error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchTaxes(villageId);
  }, [user, isLoaded]);

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedTaxId, setSelectedTaxId] = useState<number | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [financialYearFilter, setFinancialYearFilter] = useState("All");

  const handleOpenProof = (id: number) => {
    setSelectedTaxId(id);
    setIsProofModalOpen(true);
  };

  const handleCloseProof = () => {
    setIsProofModalOpen(false);
    setSelectedTaxId(null);
  };

  const updateStatusApi = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/property-tax", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setTaxes(
          taxes.map((tax) => (tax.id === id ? { ...tax, status } : tax)),
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const handleAccept = () => {
    if (selectedTaxId) {
      updateStatusApi(selectedTaxId, "Paid");
      handleCloseProof();
    }
  };

  const handleReject = () => {
    if (selectedTaxId) {
      updateStatusApi(selectedTaxId, "Denied");
      handleCloseProof();
    }
  };

  const filteredTaxes = taxes.filter((tax) => {
    const matchesSearch =
      tax.invoiceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tax.ownerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      financialYearFilter === "All" ||
      tax.financialYear === financialYearFilter;
    return matchesSearch && matchesYear;
  });

  const selectedTax = taxes.find((t) => t.id === selectedTaxId);

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-[#138808] shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Property Tax Management
          </h1>
          <p className="text-sm text-gray-700">
            Review property tax payment proofs, accept or deny submissions, and
            track collections.
          </p>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Invoice ID or Owner Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={18} className="text-gray-500 hidden sm:block" />
            <select
              value={financialYearFilter}
              onChange={(e) => setFinancialYearFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#138808] w-full sm:w-auto cursor-pointer"
            >
              <option value="All">All Financial Years</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2021-2022">2021-2022</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Property ID</th>
                <th className="px-6 py-4">Owner Name</th>
                <th className="px-6 py-4">Fin. Year</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading records...
                  </td>
                </tr>
              ) : (
                filteredTaxes.map((tax) => (
                  <tr
                    key={tax.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {tax.invoiceId}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {tax.propertyId}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#2c5577]">
                      {tax.ownerName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {tax.financialYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <div className="flex items-center gap-2">
                        {tax.paymentDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                      {tax.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 flex items-center justify-center py-1.5 rounded-full text-xs font-bold ${
                          tax.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : tax.status === "Reviewing" ||
                                tax.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tax.status === "Paid" && (
                          <CheckCircle size={14} className="mr-1" />
                        )}
                        {(tax.status === "Reviewing" ||
                          tax.status === "Pending") && (
                          <Eye size={14} className="mr-1" />
                        )}
                        {tax.status === "Denied" && (
                          <XCircle size={14} className="mr-1" />
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
                          View Reference
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs font-medium italic">
                          Action Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && filteredTaxes.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No tax records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* View Proof Modal */}
      {isProofModalOpen && selectedTax && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Proof Review
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Invoice: {selectedTax.invoiceId}
                </p>
              </div>
              <button
                onClick={handleCloseProof}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
              <div className="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-2">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Payment Reference Number
                </span>
                <span className="text-2xl font-black text-[#138808] tracking-widest">
                  {selectedTax.referenceNumber || "N/A"}
                </span>
              </div>

              <div className="w-full mt-6 bg-white border border-gray-200 rounded p-4 shadow-sm text-sm">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <span className="text-gray-500 text-xs block">
                      Property Owner
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedTax.ownerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block">
                      Property ID
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedTax.propertyId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block">
                      Declared Amount
                    </span>
                    <span className="font-bold text-[#138808] text-base">
                      {selectedTax.amount}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block">
                      Payment Date
                    </span>
                    <span className="font-medium text-gray-900">
                      {selectedTax.paymentDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-white grid grid-cols-2 gap-4">
              <button
                onClick={handleReject}
                className="w-full py-2.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
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
