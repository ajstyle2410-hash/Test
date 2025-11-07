export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface NotificationFeed {
  notifications: NotificationItem[];
  unreadCount: number;
  hasMore: boolean;
  nextCursor?: string;
}