"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Bell, Info, Search, Calendar, Clock, X, Eye, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

type Notification = {
  id: number;
  title: string;
  message: string;
  audience: string;
  createdAt: string;
};

export default function Notifications() {
  const { user, isLoaded } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async (villageId?: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/notifications${villageId ? `?villageId=${villageId}` : ""}`);
        if (res.ok) {
          const json = await res.json();
          setNotifications(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setIsLoading(false);
      }
    };
    const meta = user?.unsafeMetadata as any;
    const villageId = meta?.village_id;
    fetchNotifications(villageId);
  }, [isLoaded, user]);

  const filteredNotifications = notifications.filter(notif =>
    notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (notif: Notification) => {
    setSelectedNotification(notif);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />

        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Village <span className="text-[#0052cc]">Announcements</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Stay updated with latest alerts, news, and official reminders
                </p>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-gray-50 border border-gray-200 p-4 mb-6 rounded-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80 md:w-96 lg:w-[450px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] bg-white"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Clock size={14} />
                Total Broadcasts: {filteredNotifications.length}
              </div>
            </div>

            {/* Table Section */}
            <section className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-6 py-4">Title & Description</th>
                      <th className="px-6 py-4">Audience</th>
                      <th className="px-6 py-4">Posted Date</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                      [...Array(4)].map((_, i) => (
                        <tr key={i} className="animate-in fade-in duration-500 border-b border-gray-100">
                          <td className="px-6 py-4">
                            <Skeleton className="h-4 w-64 mb-1.5" />
                            <Skeleton className="h-3 w-full max-w-md" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Skeleton className="h-5 w-20 rounded-full" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Skeleton className="h-4 w-28" />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Skeleton className="h-4 w-16 ml-auto" />
                          </td>
                        </tr>
                      ))
                    ) : filteredNotifications.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                          <p>No announcements found.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredNotifications.map((notif) => (
                        <tr key={notif.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 max-w-md">
                            <h4 className="font-bold text-slate-800 text-sm mb-0.5">{notif.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-1">{notif.message}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {notif.audience}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-slate-300" />
                              {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => openModal(notif)}
                              className="inline-flex items-center gap-1 text-[#0052cc] hover:underline font-bold text-xs"
                            >
                              View <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-[#0052cc] rounded-full">
                  <Bell size={20} />
                </div>
                <h2 className="font-bold text-lg text-slate-800">Announcement</h2>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0052cc] mb-1 block">
                  {selectedNotification.audience}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {selectedNotification.title}
                </h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 mb-6">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                  &quot;{selectedNotification.message}&quot;
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(selectedNotification.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {new Date(selectedNotification.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-slate-800 text-white text-xs font-bold rounded-sm hover:bg-slate-700 transition-colors"
                id="close-notification-btn"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
