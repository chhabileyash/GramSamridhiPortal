"use client";

import React, { useState } from "react";
import { Send, Bell, Trash2 } from "lucide-react";

export default function NotificationsPage() {
  const [notifications] = useState([
    { id: 1, title: "Gram Sabha Meeting", message: "Reminder: Gram Sabha meeting scheduled for tomorrow at 10 AM regarding water tracking.", date: "Today, 09:00 AM", audience: "All Villagers" },
    { id: 2, title: "Property Tax Deadline", message: "Last day to pay property tax without penalty is 31st December.", date: "Yesterday, 02:30 PM", audience: "Property Owners" },
    { id: 3, title: "New Scheme Launched", message: "Panchayat Pension scheme is now available. Apply before 15th Jan.", date: "15 Nov 2023", audience: "All Villagers" },
  ]);

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
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">New Broadcast</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>All Villagers</option>
                <option>Property Owners</option>
                <option>Panchayat Staff Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. Important Meeting Alert"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button className="w-full bg-[#2c5577] text-white px-4 py-2 rounded-md font-bold hover:bg-[#1a364d] transition-colors flex items-center justify-center gap-2 mt-4">
              <Send size={18} />
              <span>Send Notification</span>
            </button>
          </div>
        </section>

        {/* Notification History */}
        <section className="bg-white border border-gray-200 rounded-sm shadow-sm lg:col-span-2">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Broadcasts</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-5 hover:bg-gray-50 flex gap-4">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600">
                    <Bell size={18} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{notif.title}</h3>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{notif.audience}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-400 font-medium">{notif.date}</p>
                </div>
                <div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="p-4 text-center">
              <button className="text-[#2c5577] text-sm font-semibold hover:underline">View Older Notifications</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
