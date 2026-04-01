"use client";

import React from "react";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/profile" },
    { name: "All Schemes", href: "/schemes" },
    { name: "Property Tax", href: "/property-tax-filling" },
    { name: "Water Tax", href: "/water-tax" },
    { name: "Electricity Bill", href: "/electricity-bill" },
    { name: "Raise Complaint", href: "/raise-complaint" },
    { name: "My Raised Complaints", href: "/my-complaints" },
    { name: "Apply for Certificate", href: "/certificates" },
    { name: "My Certificates", href: "/my-certificates" },
    { name: "Notifications", href: "/notifications" },
    { name: "Suggestions", href: "/suggestions" },
    { name: "Panchayat Members", href: "/panchayat-members" },
    { name: "Development Works", href: "/development-works" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-80 sticky top-[130px] h-[calc(100vh-130px)] overflow-y-auto border-r border-gray-100"
      data-purpose="sidebar-menu"
    >
      <div className="pl-4 pt-4 space-y-3 pb-8">
        <div className="flex items-center text-base font-bold text-gray-800 mb-4 px-2">
          <ChevronsRight className="w-6 h-6 mr-2 text-[#FF9933]" />
          All Available services
        </div>

        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block w-full text-left px-4 py-3 rounded text-base transition ${
                isActive
                  ? "font-semibold border bg-[#fffaf5] border-[#FF9933] text-[#FF9933]"
                  : "font-normal border border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
