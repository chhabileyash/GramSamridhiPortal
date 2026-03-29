"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import posthog from "posthog-js";
import {
  History,
  Droplet,
  User,
  IndianRupee,
  CheckCircle,
  Info } from
"lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function WaterTax() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    connectionId: "",
    connectionType: "Domestic",
    wardNumber: "",
    address: "",
    ownerName: "",
    contactNumber: "",
    referenceNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const [showPastReceipts, setShowPastReceipts] = useState(false);
  const [pastReceipts, setPastReceipts] = useState<any[]>([]);
  const [isLoadingReceipts, setIsLoadingReceipts] = useState(false);

  useEffect(() => {
    if (showPastReceipts) {
      const fetchReceipts = async () => {
        setIsLoadingReceipts(true);
        try {
          const meta = user?.unsafeMetadata as any;
          const villageId = meta?.village_id;
          const res = await fetch(`/api/water-tax${villageId ? `?villageId=${villageId}` : ''}`);
          if (res.ok) {
            const json = await res.json();
            setPastReceipts(json.data || []);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingReceipts(false);
        }
      };
      if (user) fetchReceipts();
    }
  }, [showPastReceipts, user]);


  const annualWaterTax = formData.connectionType === "Commercial" ? 2400 : 1200;
  const maintenanceCharges = formData.connectionType === "Commercial" ? 300 : 150;
  const earlyPaymentDiscount = annualWaterTax * 0.05;
  const totalPayableAmount = annualWaterTax + maintenanceCharges - earlyPaymentDiscount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.connectionId || !formData.ownerName) {
      toast.error("Please enter Connection Number and Primary Owner Name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const meta = user?.unsafeMetadata as any;
      const villageId = meta?.village_id;

      const res = await fetch("/api/water-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villageId,
          connectionId: formData.connectionId,
          connectionType: formData.connectionType,
          ownerName: formData.ownerName,
          financialYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
          amount: totalPayableAmount,
          referenceNumber: formData.referenceNumber
        })
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to file");

      toast.success("Water tax filed successfully!");
      posthog.capture("water_tax_payment_confirmed", {
        connectionType: formData.connectionType,
        amount: totalPayableAmount,
        invoiceId: result.data?.invoiceId
      });
      setFormData({
        connectionId: "",
        connectionType: "Domestic",
        wardNumber: "",
        address: "",
        ownerName: "",
        contactNumber: "",
        referenceNumber: ""
      });
      setShowQR(false);
    } catch (err) {
      console.error(err);
      toast.error("Error filing water tax. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      {}

      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Water Tax{" "}
                  <span className="text-[#ab7845]">Payment &amp; Filing</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  FY 2023-24 Assessment Period
                </p>
              </div>
              <button
                onClick={() => setShowPastReceipts(!showPastReceipts)}
                className="flex items-center gap-2 px-4 py-2 border border-[#FF9933] text-[#FF9933] text-xs font-bold hover:bg-[#FF9933]/5 transition-colors rounded-sm">
                
                <History className="w-4 h-4" />
                {showPastReceipts ? "BACK TO FILING" : "VIEW PAST RECEIPTS"}
              </button>
            </div>

            {showPastReceipts ?
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-4">Invoice ID</th>
                        <th className="px-6 py-4">Connection ID</th>
                        <th className="px-6 py-4">Owner Name</th>
                        <th className="px-6 py-4">Fin. Year</th>
                        <th className="px-6 py-4">Payment Date</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {isLoadingReceipts ?
                    [...Array(3)].map((_, i) =>
                    <tr key={i} className="animate-in fade-in duration-500 border-b border-gray-50">
                            <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-4 w-16 ml-auto" /></td>
                            <td className="px-6 py-4"><Skeleton className="h-6 w-16 mx-auto rounded-full" /></td>
                          </tr>
                    ) :
                    pastReceipts.length === 0 ?
                    <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-medium">No past receipts found.</td></tr> :
                    pastReceipts.map((tax: any) =>
                    <tr key={tax.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{tax.invoiceId}</td>
                          <td className="px-6 py-4 text-slate-600">{tax.connectionId}</td>
                          <td className="px-6 py-4 font-medium text-[#ab7845]">{tax.ownerName}</td>
                          <td className="px-6 py-4 font-medium text-slate-700">{tax.financialYear}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">{tax.paymentDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900 text-right">₹ {parseFloat(tax.amount).toFixed(2)}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tax.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        tax.status === 'Reviewing' || tax.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`
                        }>
                              {tax.status}
                            </span>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div> :

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {}
                  <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                        <Droplet className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Section 1: Connection Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Connection Number
                        </label>
                        <input
                        name="connectionId"
                        value={formData.connectionId}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="e.g. 1029384756"
                        type="text" />
                      
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Connection Type
                        </label>
                        <select
                        name="connectionType"
                        value={formData.connectionType}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm rounded-sm">
                        
                          <option>Domestic</option>
                          <option>Commercial</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Ward Number
                        </label>
                        <input
                        name="wardNumber"
                        value={formData.wardNumber}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Ward 12 - Gram Panchayat"
                        type="text" />
                      
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Full Property Address
                        </label>
                        <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Enter complete address details"
                        rows={3}>
                      </textarea>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                      <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                        <User className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Section 2: Owner Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Primary Owner Name
                        </label>
                        <input
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Full name as per ID"
                        type="text" />
                      
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">
                          Contact Number
                        </label>
                        <input
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="+91 98765 43210"
                        type="tel" />
                      
                      </div>
                    </div>
                  </div>
                </div>

                {}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {}
                  <div className="bg-white border border-gray-300 shadow-sm flex flex-col h-fit rounded-sm overflow-hidden">
                    <div className="bg-[#FF9933] text-white p-4 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-widest">
                        Tax Summary
                      </h3>
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Financial Year</span>
                          <span className="font-bold text-slate-800">{new Date().getFullYear()}-{new Date().getFullYear() + 1}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Connection Type</span>
                          <span className="font-bold text-slate-800">{formData.connectionType}</span>
                        </div>
                        <div className="h-[1px] bg-slate-100 w-full my-2"></div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Annual Water Tax</span>
                          <span className="font-bold">₹ {annualWaterTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">
                            Maintenance Charges
                          </span>
                          <span className="font-bold">₹ {maintenanceCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#138808] font-bold">
                          <span>Early Payment Discount (5%)</span>
                          <span>- ₹ {earlyPaymentDiscount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Total Payable Amount
                          </span>
                          <span className="text-3xl font-black text-[#138808]">
                            ₹ {totalPayableAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {!showQR ?
                    <button
                      onClick={() => {
                        setShowQR(true);
                        posthog.capture("water_tax_payment_initiated", {
                          connectionType: formData.connectionType,
                          amount: totalPayableAmount
                        });
                      }}
                      className="w-full bg-[#138808] text-white font-bold py-3 px-4 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 mt-6 rounded-sm">
                      
                          PAY NOW
                        </button> :

                    <div className="mt-6 flex flex-col items-center animate-in fade-in duration-300">
                          <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Scan to Pay via UPI</p>
                          <div className="bg-white p-2 border border-slate-200 rounded-md shadow-sm mb-4">
                            <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=grampanchayat@sbi&pn=Gram%20Panchayat&am=${totalPayableAmount.toFixed(2)}`}
                          alt="UPI QR Code"
                          className="w-32 h-32" />
                        
                          </div>

                          <div className="w-full mb-4 text-left">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                              Payment Reference Number *
                            </label>
                            <input
                          name="referenceNumber"
                          value={formData.referenceNumber}
                          onChange={handleChange}
                          className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                          placeholder="Enter 12-digit UPI Ref Number"
                          type="text" />
                        
                          </div>

                          <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.referenceNumber}
                        className="w-full bg-[#138808] text-white font-bold py-3 px-4 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-50">
                        
                            <CheckCircle className="w-5 h-5" />
                            {isSubmitting ? "SUBMITTING..." : "CONFIRM PAYMENT"}
                          </button>
                          <button
                        onClick={() => setShowQR(false)}
                        className="w-full bg-white text-slate-500 font-bold py-2 mt-2 text-xs hover:bg-slate-50 border border-slate-200 transition-colors rounded-sm">
                        
                            Cancel
                          </button>
                        </div>
                    }
                    </div>
                  </div>

                  {}
                  <div className="bg-slate-50 border border-gray-200 shadow-sm p-6 border-l-4 border-l-[#FF9933] rounded-sm">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#FF9933] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Important Deadlines
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                          Water tax must be paid by{" "}
                          <span className="font-bold text-[#FF9933]">
                            15th of every month
                          </span>{" "}
                          to avoid disconnection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </main>
      </div>
      <Footer />
    </div>);

}