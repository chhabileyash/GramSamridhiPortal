"use client";
import React from "react";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import CivilRegistrationForm from "@/components/certificates/CivilRegistrationForm";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        <Sidebar />
        <main className="flex-1 p-8 bg-white min-w-0">
          <div className="max-w-6xl mx-auto">
             <CivilRegistrationForm />
          </div>
        </main>
      </div>
    </div>
  );
}
