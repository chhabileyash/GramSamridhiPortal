"use client";

import React, { useState, useEffect } from "react";
import { Send, Bell, Trash2, Loader2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

type Notification = {
  id: number;
  title: string;
  message: string;
  audience: string;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Form State
  const [audience, setAudience] = useState("All Villagers");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const json = await res.json();
        setNotifications(json.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Failed to load past broadcasts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message, audience }),
      });
      if (res.ok) {
        toast.success("Broadcast sent successfully!");
        setTitle("");
        setMessage("");
        setAudience("All Villagers");
        fetchNotifications();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to send broadcast");
      }
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this broadcast?")) return;

    try {
      const res = await fetch(`/api/notifications?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Broadcast deleted");
        setNotifications(notifications.filter((n) => n.id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.error("Delete notification error:", error);
      toast.error("Failed to delete notification");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <>
      <section className="bg-white p-6 border-l-4 border-yellow-500 shadow-sm flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Broadcast Notifications</h1>
          <p className="text-sm text-gray-700">Send announcements, alerts, and reminders to village residents.</p>
        </div>
        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full hidden md:block">
          <Bell size={28} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Notification Form */}
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm lg:col-span-1 border-t-2 border-t-[#2c5577]">
          <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Send size={18} className="text-[#2c5577]" /> New Broadcast
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
              >
                <option value="All Villagers">All Villagers</option>
                <option value="Property Owners">Property Owners</option>
                <option value="Panchayat Staff Only">Panchayat Staff Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Important Meeting Alert"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isSending || !title.trim() || !message.trim()}
              className="w-full bg-[#2c5577] text-white px-4 py-2.5 rounded-md font-bold hover:bg-[#1a364d] transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              <span>{isSending ? "Sending..." : "Send Notification"}</span>
            </button>
          </div>
        </section>

        {/* Notification History */}
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm lg:col-span-2 flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Broadcasts</h2>
            <button
              onClick={fetchNotifications}
              disabled={isLoading}
              className="text-gray-500 hover:text-[#2c5577] transition-colors p-1 rounded-md hover:bg-gray-100"
              title="Refresh"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
          <div className="divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
            {isLoading ? (
              <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                <Loader2 size={32} className="animate-spin mb-3 text-yellow-500" />
                <p>Loading broadcast history...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-10 flex flex-col items-center justify-center text-gray-400">
                <Bell size={40} className="mb-3 text-gray-300" />
                <p>No past broadcasts found.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="p-5 hover:bg-yellow-50/50 transition-colors flex gap-4 group">
                  <div className="mt-1 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-yellow-600 shadow-sm">
                      <Bell size={18} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                      <h3 className="font-bold text-gray-900 truncate pr-4">{notif.title}</h3>
                      <span className="text-xs font-bold text-[#2c5577] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {notif.audience}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">{notif.message}</p>
                    <p className="text-xs text-gray-400 font-medium">{formatDate(notif.createdAt)}</p>
                  </div>
                  <div className="shrink-0 flex items-start">
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors p-2 rounded-md opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm"
                      title="Delete Broadcast"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
