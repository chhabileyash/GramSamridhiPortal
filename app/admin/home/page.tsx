import React from "react";
import { Users, FileText, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminHomePage() {
  return (
    <>
      <section className="bg-white p-8 border-l-4 border-[#FF9933] shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-700">
            Welcome to the Gram Panchayat Administration Panel. Use the
            sidebar to manage services, users, schemes, and complaints.
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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <Users className="w-10 h-10 text-[#FF9933] mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Total Users
          </h2>
          <p className="text-3xl text-gray-900 font-bold mt-1">1,245</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Pending Complaints
          </h2>
          <p className="text-3xl text-gray-900 font-bold mt-1">18</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <FileText className="w-10 h-10 text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Active Schemes
          </h2>
          <p className="text-3xl text-gray-900 font-bold mt-1">8</p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col justify-center items-center">
          <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
          <h2 className="text-lg font-semibold text-gray-600">
            Tax Approvals
          </h2>
          <p className="text-3xl text-gray-900 font-bold mt-1">45</p>
        </div>
      </section>

      <section className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#FF9933]"></div>
            <div>
              <p className="text-gray-800 font-medium">
                New Scheme Added: "Pradhan Mantri Awas Yojana"
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-gray-800 font-medium">
                Water Tax Approved for 24 properties.
              </p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-red-500"></div>
            <div>
              <p className="text-gray-800 font-medium">
                Complaint #1042 escalated regarding street lighting.
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
