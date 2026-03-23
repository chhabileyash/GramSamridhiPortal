"use client";
import React from "react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1F4E79] mb-6">Our Services</h1>
        <p className="mb-8 text-lg text-gray-700">
          Explore the range of services offered by the Gram Samridhi Portal to
          empower and support our rural communities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Certificate Issuance
            </h2>
            <p className="text-gray-700">
              Apply online for birth, death, and other essential certificates.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Pension & Welfare Schemes
            </h2>
            <p className="text-gray-700">
              Access and apply for government pension and welfare schemes.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Property & Water Tax
            </h2>
            <p className="text-gray-700">
              Pay your property and water taxes online securely and
              conveniently.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Grievance Redressal
            </h2>
            <p className="text-gray-700">
              Raise complaints and track their resolution with transparency.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Development Works
            </h2>
            <p className="text-gray-700">
              View ongoing and completed development projects in your village.
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-[#F28C28] mb-2">
              Notifications & Updates
            </h2>
            <p className="text-gray-700">
              Stay informed with the latest news, events, and government
              notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
