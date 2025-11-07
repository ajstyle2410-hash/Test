"use client";

import React from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Arc‑i‑Tech — Dashboard</h1>
          <nav className="space-x-2">
            <Link href="/dashboard/super-admin" className="text-sm text-blue-600 hover:underline">Super Admin</Link>
            <Link href="/dashboard/sub-admin" className="text-sm text-blue-600 hover:underline">Sub Admin</Link>
            <Link href="/dashboard/developer" className="text-sm text-blue-600 hover:underline">Developer</Link>
            <Link href="/dashboard/user" className="text-sm text-blue-600 hover:underline">User</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
}
