"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Users,
  Plus,
  Trash2,
  X,
  Save,
  Phone,
  Image as ImageIcon,
  Mail,
  MapPin,
} from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { toast } from "react-hot-toast";

export default function PanchayatMembersAdmin() {
  const { user, isLoaded } = useUser();
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "Sarpanch",
    imageUrl: "",
    phone: "",
    email: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchMembers(villageId);
  }, [user, isLoaded]);

  const fetchMembers = async (villageId?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        villageId
          ? `/api/panchayat-members?villageId=${encodeURIComponent(villageId)}`
          : "/api/panchayat-members",
      );
      if (res.ok) {
        const json = await res.json();
        setMembers(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleAddMember = async () => {
    if (!formData.name || !formData.position) {
      toast.error("Please enter name and position.");
      return;
    }

    setIsSubmitting(true);
    try {
      const meta = user?.unsafeMetadata as any;
      const villageId = meta?.village_id;

      const data = new FormData();
      if (villageId) data.append("villageId", villageId);
      data.append("name", formData.name);
      data.append("position", formData.position);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("address", formData.address);
      if (imageFile) {
        data.append("imageFile", imageFile);
      } else {
        data.append("imageUrl", formData.imageUrl);
      }

      const res = await fetch("/api/panchayat-members", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add member");

      setFormData({
        name: "",
        position: "Sarpanch",
        imageUrl: "",
        phone: "",
        email: "",
        address: "",
      });
      setImageFile(null);
      setImagePreview("");
      setShowAddForm(false);
      fetchMembers(villageId);
    } catch (error) {
      console.error(error);
      toast.error("Error adding member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    try {
      const res = await fetch(`/api/panchayat-members?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-[#FF9933] shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Panchayat Members Management
          </h1>
          <p className="text-sm text-gray-700">
            Add, view, and manage elected representatives of the village.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-[#138808] text-white px-4 py-2 rounded-sm font-bold text-sm hover:opacity-90 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Member
        </button>
      </section>

      {}
      {showAddForm && (
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Users size={18} className="text-[#FF9933]" />
              Add New Member
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Full Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                placeholder="e.g. Ramesh Patil"
                type="text"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Position *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm rounded-sm"
              >
                <option>Sarpanch</option>
                <option>Up-Sarpanch</option>
                <option>Ward Member</option>
                <option>Secretary</option>
                <option>Gram Sevak</option>
                <option>Treasurer</option>
                <option>Committee Member</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Image Upload
              </label>
              <div className="flex items-center gap-3 mt-1">
                {imagePreview || formData.imageUrl ? (
                  <div className="relative w-10 h-10 rounded-sm overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={imagePreview || formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-sm bg-slate-50 flex items-center justify-center shrink-0 border border-dashed border-slate-300">
                    <ImageIcon size={16} className="text-slate-400" />
                  </div>
                )}
                <input
                  name="imageFile"
                  onChange={handleImageChange}
                  className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] px-3 py-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 rounded-sm"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                placeholder="+91 98765 43210"
                type="tel"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                placeholder="example@email.com"
                type="email"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">
                Residential Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                placeholder="House No, Street, Village Name"
                type="text"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddMember}
              disabled={isSubmitting || !formData.name}
              className="bg-[#138808] text-white font-bold py-2.5 px-6 rounded-sm hover:opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm text-sm"
            >
              <Save size={16} />
              {isSubmitting ? "Saving..." : "Save Member"}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-white text-slate-600 font-medium py-2.5 px-6 rounded-sm border border-slate-200 hover:bg-slate-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {}
      <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">
            {members.length} Members
          </p>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-500">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-sm p-5 flex items-center gap-5"
                >
                  <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2.5 mt-1">
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-5/6 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No members added yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Click &quot;Add Member&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 bg-white shadow-sm rounded-sm p-5 flex items-center gap-5 hover:border-gray-300 transition-colors group relative"
                >
                  {}
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-200">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  {}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-800 truncate">
                      {member.name}
                    </h4>
                    <p className="text-sm text-[#138808] font-bold mt-0.5 truncate">
                      {member.position}
                    </p>
                    <div className="mt-2.5 space-y-1.5">
                      {member.phone && (
                        <p className="text-xs text-slate-500 flex items-center gap-2 truncate">
                          <Phone
                            size={12}
                            className="text-slate-400 shrink-0"
                          />{" "}
                          {member.phone}
                        </p>
                      )}
                      {member.email && (
                        <p className="text-xs text-slate-500 flex items-center gap-2 truncate">
                          <Mail size={12} className="text-slate-400 shrink-0" />{" "}
                          {member.email}
                        </p>
                      )}
                      {member.address && (
                        <p className="text-xs text-slate-500 flex items-start gap-2 line-clamp-2">
                          <MapPin
                            size={12}
                            className="text-slate-400 shrink-0 mt-0.5"
                          />{" "}
                          {member.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {}
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50 p-2 rounded-full absolute top-2 right-2"
                    title="Remove member"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
