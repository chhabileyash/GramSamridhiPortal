"use client";

import React from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden border-t-4 border-t-gray-800">
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">Update Security Credentials</h1>
          <p className="text-sm text-gray-500 mt-1 text-center">Ensure your admin account uses a strong, private password.</p>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="current-pw">Current Password</label>
            <input
              id="current-pw"
              type="password"
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>
          <div className="border-t border-gray-100 pt-6">
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="new-pw">New Password</label>
            <input
              id="new-pw"
              type="password"
              placeholder="Enter new strong password"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="confirm-pw">Confirm New Password</label>
            <input
              id="confirm-pw"
              type="password"
              placeholder="Type new password again"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-gray-900 text-white px-4 py-3 rounded-md font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
              <KeyRound size={18} />
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}