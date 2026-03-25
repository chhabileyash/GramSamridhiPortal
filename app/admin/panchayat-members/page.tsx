"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Users, Plus, Trash2, X, Save, Phone, Image as ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

export default function PanchayatMembersAdmin() {
    const { user , isLoaded } = useUser();
    const [members, setMembers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        position: "Sarpanch",
        imageUrl: "",
        phone: "",
    });
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
                    : "/api/panchayat-members"
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

            const res = await fetch("/api/panchayat-members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    villageId,
                    name: formData.name,
                    position: formData.position,
                    imageUrl: formData.imageUrl,
                    phone: formData.phone,
                }),
            });

            if (!res.ok) throw new Error("Failed to add member");

            setFormData({ name: "", position: "Sarpanch", imageUrl: "", phone: "" });
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
            const res = await fetch(`/api/panchayat-members?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setMembers(members.filter(m => m.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <section className="bg-white p-6 border-l-4 border-[#FF9933] shadow-sm flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Panchayat Members Management</h1>
                    <p className="text-sm text-gray-700">Add, view, and manage elected representatives of the village.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-[#138808] text-white px-4 py-2 rounded-sm font-bold text-sm hover:opacity-90 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Member
                </button>
            </section>

            {/* Add Member Form */}
            {showAddForm && (
                <section className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                            <Users size={18} className="text-[#FF9933]" />
                            Add New Member
                        </h3>
                        <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name *</label>
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
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Position *</label>
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
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Image URL</label>
                            <input
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                                placeholder="https://example.com/photo.jpg"
                                type="url"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-slate-200 bg-white focus:ring-1 focus:ring-[#FF9933] focus:border-[#FF9933] focus:outline-none px-4 py-2.5 text-sm placeholder-slate-500 rounded-sm"
                                placeholder="+91 98765 43210"
                                type="tel"
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

            {/* Members Grid */}
            <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">{members.length} Members</p>
                </div>
                <div className="p-6">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-500">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="border border-gray-200 rounded-sm p-4 flex items-start gap-4">
                                    <Skeleton className="w-14 h-14 rounded-full flex-shrink-0" />
                                    <div className="flex-1 space-y-2 mt-1">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-3 w-28 mt-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No members added yet.</p>
                            <p className="text-sm text-gray-400 mt-1">Click &quot;Add Member&quot; to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {members.map((member) => (
                                <div key={member.id} className="border border-gray-200 rounded-sm p-4 flex items-start gap-4 hover:border-gray-300 transition-colors group relative">
                                    {/* Avatar */}
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center">
                                        {member.imageUrl ? (
                                            <img
                                                src={member.imageUrl}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Users className="w-6 h-6 text-slate-400" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-800 text-sm truncate">{member.name}</h4>
                                        <p className="text-xs text-[#FF9933] font-semibold mt-0.5">{member.position}</p>
                                        {member.phone && (
                                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1.5">
                                                <Phone size={10} /> {member.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDeleteMember(member.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 p-1 rounded"
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
