"use client";

import React, { useState, useEffect } from "react";
import { User, CheckCircle, MapPin } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    district: "",
    taluka: "",
    village: "",
    addhar_id: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phoneNumber: (user.unsafeMetadata?.phoneNumber as string) || "",
        district: (user.unsafeMetadata?.district as string) || "",
        taluka: (user.unsafeMetadata?.taluka as string) || "",
        village: (user.unsafeMetadata?.village as string) || "",
        addhar_id: (user.username as string) || "",
      });
    }
  }, [user]);

  const email = user?.primaryEmailAddress?.emailAddress || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (!user) return;
    setIsUpdating(true);
    setUpdateMessage("");
    try {
      const nameParts = formData.fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      await user.update({
        firstName,
        lastName,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          phoneNumber: formData.phoneNumber,
          district: formData.district,
          taluka: formData.taluka,
          village: formData.village,
        },
      });
      setUpdateMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      setUpdateMessage("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      {/* <Header /> */}

      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  My <span className="text-[#ab7845]">Profile</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Manage your personal details and preferences
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {!isLoaded ? (
                  <>
                    <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm animate-in fade-in duration-500">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <Skeleton className="w-9 h-9 rounded-sm" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Skeleton className="h-3 w-20"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                        <div className="space-y-2"><Skeleton className="h-3 w-24"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                        <div className="md:col-span-2 space-y-2"><Skeleton className="h-3 w-28"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm animate-in fade-in duration-500">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <Skeleton className="w-9 h-9 rounded-sm" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Skeleton className="h-3 w-16"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                        <div className="space-y-2"><Skeleton className="h-3 w-16"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                        <div className="md:col-span-2 space-y-2"><Skeleton className="h-3 w-16"/><Skeleton className="h-10 w-full rounded-sm"/></div>
                        <div className="md:col-span-2 mt-4"><Skeleton className="h-10 w-48 rounded-sm"/></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Section 1: Profile Details */}
                    <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Personal Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="John Doe"
                        type="text"
                        disabled
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Mobile Number
                      </label>
                      <input
                        name="phoneNumber"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="+91 9876543210"
                        type="tel"
                        disabled
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Email Address
                      </label>
                      <input
                        className="w-full border border-slate-200 bg-slate-50 cursor-not-allowed focus:outline-none px-4 py-2.5 text-sm rounded-sm"
                        placeholder="johndoe@example.com"
                        type="email"
                        disabled
                        value={email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Location Details */}
                <div className="bg-white border border-gray-300 shadow-sm p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="bg-[#FF9933]/10 text-[#FF9933] p-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Location Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        District
                      </label>
                      <input
                        name="district"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="District Name"
                        type="text"
                        disabled
                        value={formData.district}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Taluka
                      </label>
                      <input
                        name="taluka"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Taluka Name"
                        type="text"
                        disabled
                        value={formData.taluka}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Village
                      </label>
                      <input
                        name="village"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Village Name"
                        type="text"
                        disabled
                        value={formData.village}
                        onChange={handleChange}
                      />
                    </div>
                     <div className="md:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Village
                      </label>
                      <input
                        name="village"
                        className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-700 rounded-sm"
                        placeholder="Village Name"
                        type="text"
                        disabled
                        value={formData.addhar_id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      {updateMessage && (
                        <div
                          className={`mb-4 text-sm ${updateMessage.includes("success") ? "text-green-600" : "text-red-600"}`}
                        >
                          {updateMessage}
                        </div>
                      )}
                      {/* <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="bg-[#138808] disabled:opacity-50 text-white font-bold py-2.5 px-6 shadow-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 rounded-sm mt-4"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {isUpdating ? "UPDATING..." : "UPDATE PROFILE"}
                      </button> */}
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
