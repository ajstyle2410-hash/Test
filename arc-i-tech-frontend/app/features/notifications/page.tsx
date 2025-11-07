// src/app/features/notifications/page.tsx
'use client';

import { useEffect, useState } from "react";
import { NotificationService } from "@/app/core/services/notification.service";
import AuthGuard from "@/app/core/guards/auth.guard";
import NotificationItem from "./components/NotificationItem";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const data = await NotificationService.getAll();
      setNotifications(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await NotificationService.markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <AuthGuard>
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Notifications</h2>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="alert alert-info text-center">
            No notifications available.
          </div>
        ) : (
          <div className="list-group shadow-sm">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
