// src/app/features/dashboard/page.tsx
'use client';

import AuthGuard from "@/app/core/guards/auth.guard";
import { useEffect, useState } from "react";
import { UserService } from "@/app/core/services/user.service";
import { ProjectService } from "@/app/core/services/project.service";
import { InquiryService } from "@/app/core/services/inquiry.service";
import { NotificationService } from "@/app/core/services/notification.service";
import Sidebar from "./componants/Sidebar";
import Header from "./componants/Header";
import DashboardCard from "./componants/DashboardCard";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    inquiries: 0,
    notifications: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const users = await UserService.getAllUsers();
        const projects = await ProjectService.getAll();
        const inquiries = await InquiryService.getAll();
        const notifications = await NotificationService.getAll();
        setStats({
          users: users.length,
          projects: projects.length,
          inquiries: inquiries.length,
          notifications: notifications.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
    }
    loadStats();
  }, []);

  return (
    <AuthGuard>
      <div className="d-flex min-vh-100">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <main className="container-fluid mt-4">
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>
            <div className="row g-3">
              <div className="col-md-3">
                <DashboardCard
                  title="Users"
                  value={stats.users}
                  icon="bi-people"
                  color="primary"
                />
              </div>
              <div className="col-md-3">
                <DashboardCard
                  title="Projects"
                  value={stats.projects}
                  icon="bi-kanban"
                  color="success"
                />
              </div>
              <div className="col-md-3">
                <DashboardCard
                  title="Inquiries"
                  value={stats.inquiries}
                  icon="bi-envelope"
                  color="info"
                />
              </div>
              <div className="col-md-3">
                <DashboardCard
                  title="Notifications"
                  value={stats.notifications}
                  icon="bi-bell"
                  color="warning"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
