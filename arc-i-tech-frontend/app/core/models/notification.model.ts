// src/app/core/models/notification.model.ts

export type NotificationType = "INFO" | "ALERT" | "WARNING" | "SUCCESS";

export interface Notification {
  id?: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt?: string;
  userId?: number;
}
export interface NotificationResponse {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  userId: number;
}
