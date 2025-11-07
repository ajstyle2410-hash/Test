// src/app/admin/page.tsx
'use client';
import AdminGuard from "@/app/core/guards/admin.guard";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="container mt-5">
        <h2 className="fw-bold">Admin Control Panel</h2>
        <p className="text-muted">Manage users, projects, and inquiries.</p>
      </div>
    </AdminGuard>
  );
}
