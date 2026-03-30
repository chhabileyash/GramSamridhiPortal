"use client";

import React from "react";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
  { name: "Dashboard", href: "/admin/home" },
  { name: "Manage Schemes", href: "/admin/schemes" },
  { name: "Property Tax Approvals", href: "/admin/property-tax" },
  { name: "Water Tax Approvals", href: "/admin/water-tax" },
  { name: "Electricity Bill Admin", href: "/admin/electricity-bill" },
  { name: "Complaints Management", href: "/admin/complaints" },
  { name: "Certificate Approvals", href: "/admin/certificates" },
  { name: "Notifications / Alerts", href: "/admin/notifications" },
  { name: "Development Works", href: "/admin/development-works" },
  { name: "Suggestions", href: "/admin/suggestions" },
  { name: "Village Info", href: "/admin/village-info" },
  { name: "Panchayat Members", href: "/admin/panchayat-members" }];


  return (
    <aside
      className="hidden lg:flex flex-col w-80 sticky top-[130px] h-[calc(100vh-130px)] overflow-y-auto border-r border-gray-100 bg-white"
      data-purpose="sidebar-menu">
      
      <div className="pl-4 pt-4 space-y-3 pb-8">
        <div className="flex items-center text-base font-bold text-gray-800 mb-4 px-2">
          <ChevronsRight className="w-6 h-6 mr-2 text-[#FF9933]" />
          Admin Panel
        </div>

        {sidebarLinks.map((link) => {
          const isActive =
          pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block w-full text-left px-4 py-3 rounded text-base transition ${isActive ?
              "font-semibold border bg-[#fffaf5] border-[#FF9933] text-[#FF9933]" :
              "font-normal border border-gray-200 hover:bg-gray-50 text-gray-700"}`
              }>
              
              {link.name}
            </Link>);

        })}
      </div>
    </aside>);

}