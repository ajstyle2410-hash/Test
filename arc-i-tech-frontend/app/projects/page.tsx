// src/app/projects/page.tsx
'use client';
import AuthGuard from "@/app/core/guards/auth.guard";

export default function ProjectsPage() {
  return (
    <AuthGuard>
      <div className="container mt-5">
        <h2 className="fw-bold">Projects Dashboard</h2>
        <p className="text-muted">Only logged-in users can see this page.</p>
      </div>
    </AuthGuard>
  );
}
