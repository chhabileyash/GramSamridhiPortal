"use client";

import React, { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, X, Filter, Zap } from "lucide-react";

export default function ElectricityBillPage() {
    const [bills, setBills] = useState([
        { id: "EB-2023-801", owner: "Krishna Reddy", meterNumber: "M-10425", amount: "₹1,450", paymentDate: "2023-12-15", financialYear: "2023-2024", status: "Paid" },
        { id: "EB-2023-802", owner: "Gita Patel", meterNumber: "M-20511", amount: "₹850", paymentDate: "2023-12-28", financialYear: "2023-2024", status: "Reviewing" },
        { id: "EB-2022-0050", owner: "Rahul Verma", meterNumber: "M-30299", amount: "₹2,900", paymentDate: "2022-10-15", financialYear: "2022-2023", status: "Paid" },
        { id: "EB-2023-804", owner: "Smita Singh", meterNumber: "M-11200", amount: "₹650", paymentDate: "2023-11-05", financialYear: "2023-2024", status: "Denied" },
        { id: "EB-2023-805", owner: "Javed Ali", meterNumber: "M-04477", amount: "₹1,150", paymentDate: "2023-12-10", financialYear: "2023-2024", status: "Reviewing" },
    ]);

    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [financialYearFilter, setFinancialYearFilter] = useState("All");

    const handleOpenProof = (id: string) => {
        setSelectedBillId(id);
        setIsProofModalOpen(true);
    };

    const handleCloseProof = () => {
        setIsProofModalOpen(false);
        setSelectedBillId(null);
    };

    const handleAccept = () => {
        if (selectedBillId) {
            setBills(bills.map(bill =>
                bill.id === selectedBillId ? { ...bill, status: "Paid" } : bill
            ));
            handleCloseProof();
        }
    };

    const handleReject = () => {
        if (selectedBillId) {
            setBills(bills.map(bill =>
                bill.id === selectedBillId ? { ...bill, status: "Denied" } : bill
            ));
            handleCloseProof();
        }
    };

    const filteredBills = bills.filter(bill => {
        const matchesSearch = bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bill.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = financialYearFilter === "All" || bill.financialYear === financialYearFilter;
        return matchesSearch && matchesYear;
    });

    const selectedBill = bills.find(b => b.id === selectedBillId);

    return (
        <>
            <section className="bg-white p-6 border-l-4 border-yellow-500 shadow-sm flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <Zap className="text-yellow-500" size={24} />
                        Electricity Bill Management
                    </h1>
                    <p className="text-sm text-gray-700">Review electricity bill payment proofs, accept or deny submissions, and track collections.</p>
                </div>
            </section>

            {/* Table Section */}
            <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Invoice ID or Owner Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter size={18} className="text-gray-500 hidden sm:block" />
                        <select
                            value={financialYearFilter}
                            onChange={(e) => setFinancialYearFilter(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto cursor-pointer"
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
                                <th className="px-6 py-4">Meter Number</th>
                                <th className="px-6 py-4">Owner Name</th>
                                <th className="px-6 py-4">Fin. Year</th>
                                <th className="px-6 py-4">Payment Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBills.map((bill) => (
                                <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{bill.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{bill.meterNumber}</td>
                                    <td className="px-6 py-4 font-medium text-[#2c5577]">{bill.owner}</td>
                                    <td className="px-6 py-4 font-medium text-gray-700">{bill.financialYear}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                        <div className="flex items-center gap-2">
                                            {bill.paymentDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{bill.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 flex items-center justify-center py-1.5 rounded-full text-xs font-bold ${bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                bill.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {bill.status === 'Paid' && <CheckCircle size={14} className="mr-1" />}
                                            {bill.status === 'Reviewing' && <Eye size={14} className="mr-1" />}
                                            {bill.status === 'Denied' && <XCircle size={14} className="mr-1" />}
                                            {bill.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {bill.status === 'Reviewing' ? (
                                            <button
                                                onClick={() => handleOpenProof(bill.id)}
                                                className="inline-flex items-center gap-1.5 bg-[#2c5577] text-white px-3 py-1.5 rounded shadow-sm hover:bg-[#1a364d] transition-colors font-medium text-xs focus:ring-2 focus:ring-offset-1 focus:ring-[#2c5577]"
                                            >
                                                <Eye size={14} />
                                                View Proof
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs font-medium italic">Action Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredBills.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        No electricity bill records found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* View Proof Modal */}
            {isProofModalOpen && selectedBill && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Zap className="text-yellow-500" size={20} />
                                    Payment Proof Review
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">Invoice: {selectedBill.id}</p>
                            </div>
                            <button
                                onClick={handleCloseProof}
                                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-200"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 bg-gray-100 flex flex-col items-center justify-center">
                            {/* Dummy Image for Proof */}
                            <div className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-2 aspect-[4/3] flex items-center justify-center relative group overflow-hidden shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=800"
                                    alt="Payment Receipt Proof"
                                    className="w-full h-full object-cover rounded opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-white text-black px-3 py-1 text-sm font-bold rounded-full">Electricity_Receipt.jpg</span>
                                </div>
                            </div>

                            <div className="w-full mt-6 bg-white border border-gray-200 rounded p-4 shadow-sm text-sm">
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    <div>
                                        <span className="text-gray-500 text-xs block">Property Owner</span>
                                        <span className="font-bold text-gray-900">{selectedBill.owner}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs block">Meter Number</span>
                                        <span className="font-bold text-gray-900">{selectedBill.meterNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs block">Declared Amount</span>
                                        <span className="font-bold text-yellow-600 text-base">{selectedBill.amount}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs block">Payment Date</span>
                                        <span className="font-medium text-gray-900">{selectedBill.paymentDate}</span>
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
                                className="w-full py-2.5 bg-[#138808] text-white hover:bg-green-700 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
                            >
                                <CheckCircle size={18} />
                                Accept & Mark Paid
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
