"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminHomePage() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (!isLoaded || !user) return;
      setLoading(true);
      setError("");
      try {
        const villageId =
          user?.unsafeMetadata?.village_id || user?.unsafeMetadata?.villageId;
        const res = await fetch(`/api/stats?villageId=${villageId}`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Error loading stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isLoaded, user]);

  return (
    <>
      <section className="bg-white p-8 border-l-4 border-[#FF9933] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-700">
            Welcome to the Gram Panchayat Administration Panel. Use the sidebar
            to manage services, users, schemes, and complaints.
          </p>
        </div>
        <div className="hidden md:block">
          <img
            src="https://img.icons8.com/color/96/000000/administrator-male.png"
            alt="Admin"
            className="w-16 h-16 opacity-80"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <Users className="w-10 h-10 text-[#FF9933] mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <div className="mt-1 h-9 flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl text-gray-900 font-bold">{stats?.totalUsers ?? "-"}</span>
            )}
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Pending Complaints
          </h2>
          <div className="mt-1 h-9 flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl text-gray-900 font-bold">{stats?.pendingComplaints ?? "-"}</span>
            )}
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <FileText className="w-10 h-10 text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Active Schemes
          </h2>
          <div className="mt-1 h-9 flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl text-gray-900 font-bold">{stats?.activeSchemes ?? "-"}</span>
            )}
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Ongoing Dev. Works
          </h2>
          <div className="mt-1 h-9 flex items-center justify-center">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl text-gray-900 font-bold">{stats?.ongoingDevelopmentWorks ?? "-"}</span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
          Recent Complaints
        </h2>
        {loading ? (
          <div className="flex flex-col gap-3 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-3 pt-1">
                <Skeleton className="h-5 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200 md:ml-auto" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ul className="space-y-3">
            {stats?.last5Complaints?.length ? (
              stats.last5Complaints.map((c: any) => (
                <li
                  key={c.id}
                  className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="font-semibold text-gray-800">{c.title}</span>
                  <span className="text-xs text-gray-500">{c.category}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No recent complaints.</li>
            )}
          </ul>
        )}
      </section>

      <section className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
          Recent Schemes
        </h2>
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ul className="space-y-3">
            {stats?.last5Schemes?.length ? (
              stats.last5Schemes.map((s: any) => (
                <li
                  key={s.id}
                  className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="font-semibold text-gray-800">{s.title}</span>
                  <span className="text-xs text-gray-500">{s.category}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No recent schemes.</li>
            )}
          </ul>
        )}
      </section>
    </>
  );
}
