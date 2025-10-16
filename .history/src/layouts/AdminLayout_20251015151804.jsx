import Sidebar from "@/components/Sidebar";
import React from "react";
import { Toaster } from "sonner";

export default function AdminLayout({ children }) {
  return (
    <div s="min-h-screen flex flex-col bg-gray-100">
        <Sidebar />
      {/* Optional: add your admin sidebar or header here */}
      <main className="flex-1 p-6">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
