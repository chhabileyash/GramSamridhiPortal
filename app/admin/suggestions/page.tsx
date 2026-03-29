"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { MessageSquare, Calendar, User, Search, Trash2, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuggestionsPage() {
  const { user, isLoaded } = useUser();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchSuggestions(villageId);
  }, []);

  const fetchSuggestions = async (villageId: string | null) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/suggestions?villageId=${villageId}`);
      if (res.ok) {
        const json = await res.json();
        setSuggestions(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this suggestion?")) return;
    try {
      const res = await fetch(`/api/suggestions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuggestions(suggestions.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSuggestions = suggestions.filter((s) => {
    const matchesSearch = (s.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.message || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.citizenName || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
            <section className="bg-white p-6 border-l-4 border-purple-600 shadow-sm flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <MessageSquare className="text-purple-600" size={24} />
                        Citizen Suggestions
                    </h1>
                    <p className="text-sm text-gray-700">Review suggestions and feedback submitted by village residents.</p>
                </div>
                <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full border border-purple-200">
                    {suggestions.length} Total
                </span>
            </section>

            {}
            <section className="bg-white border border-gray-200 rounded-sm shadow-sm mb-6">
                <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
              type="text"
              placeholder="Search suggestions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
            
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Filter size={16} className="text-gray-500" />
                        <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer">
              
                            <option value="All">All Categories</option>
                            <option value="General">General</option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Education">Education</option>
                            <option value="Health">Health</option>
                            <option value="Sanitation">Sanitation</option>
                            <option value="Water Supply">Water Supply</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Safety & Security">Safety & Security</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </section>

            {}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
                <div className="divide-y divide-gray-100">
                    {isLoading ?
          <div className="animate-in fade-in duration-500">
                            {[...Array(4)].map((_, i) =>
            <div key={i} className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-4" />
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-3 w-4" />
                                            <Skeleton className="h-4 w-20 rounded-full" />
                                        </div>
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-4 w-48 mb-2" />
                                    <div className="space-y-2 mt-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                </div>
            )}
                        </div> :
          filteredSuggestions.length === 0 ?
          <div className="p-12 text-center text-gray-500">
                            <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                            No suggestions found.
                        </div> :
          filteredSuggestions.map((suggestion) =>
          <div key={suggestion.id} className="p-5 hover:bg-gray-50 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                                    <div className="flex items-center gap-1 font-semibold text-[#2c5577]">
                                        <User size={14} />
                                        {suggestion.citizenName || "Anonymous"}
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Calendar size={13} className="text-gray-400" />
                                        {suggestion.createdAt ? new Date(suggestion.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                    </div>
                                    {suggestion.category &&
                <>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">{suggestion.category}</span>
                                        </>
                }
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 font-medium">{suggestion.suggestionId}</span>
                                    <button
                  onClick={() => handleDelete(suggestion.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600 p-1"
                  title="Delete suggestion">
                  
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            {suggestion.subject &&
            <h4 className="font-bold text-slate-800 text-sm mb-1">{suggestion.subject}</h4>
            }
                            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pl-1 border-l-2 border-purple-200 mt-2 p-2 bg-purple-50/30 rounded-r-md">
                                {suggestion.message}
                            </p>
                        </div>
          )}
                </div>
            </div>
        </>);

}