"use client";
import React from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children


}: {children: React.ReactNode;}) {
  const pathname = usePathname();

  const hideSidebar = pathname.startsWith("/admin/change-password");
  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans bg-[#fcfcfc]">
      <div className="flex flex-1 items-start">
        {!hideSidebar && <AdminSidebar />}
        <main className="flex-1 p-6 space-y-6 min-w-0">{children}</main>
      </div>
    </div>);

}