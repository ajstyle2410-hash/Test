// src/app/core/services/notification.service.ts
import ApiService from "./api.service";

export interface Notification {
  id?: number;
  title: string;
  message: string;
  type?: string; // e.g., INFO, ALERT
  isRead?: boolean;
  createdAt?: string;
}

export const NotificationService = {
  async getAll(): Promise<Notification[]> {
    return ApiService.get<Notification[]>("/notifications");
  },

  async getUnread(): Promise<Notification[]> {
    return ApiService.get<Notification[]>("/notifications/unread");
  },

  async markAsRead(id: number): Promise<void> {
    return ApiService.put(`/notifications/${id}/read`, {});
  },

  async delete(id: number): Promise<void> {
    return ApiService.delete(`/notifications/${id}`);
  },
};
