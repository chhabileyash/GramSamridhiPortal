import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      {/* Assuming a shared sidebar could go here, for now just render children */}
      {children}
    </div>
  );
}
