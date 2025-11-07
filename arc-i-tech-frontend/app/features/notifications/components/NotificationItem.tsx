// src/app/features/notifications/components/NotificationItem.tsx
'use client';

interface NotificationItemProps {
  notification: {
    id: number;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  };
  onMarkAsRead: (id: number) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const { id, title, message, type, isRead, createdAt } = notification;

  const typeClasses = {
    INFO: "primary",
    SUCCESS: "success",
    WARNING: "warning",
    ALERT: "danger",
  } as const;

  const badgeColor = typeClasses[type as keyof typeof typeClasses] || "secondary";

  return (
    <div
      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
        isRead ? "bg-light" : "bg-white"
      }`}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          <span className={`badge bg-${badgeColor} me-2`}>{type}</span>
          {title}
        </div>
        <p className="text-muted mb-1">{message}</p>
        <small className="text-secondary">
          {new Date(createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </small>
      </div>

      {!isRead && (
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => onMarkAsRead(id)}
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}
