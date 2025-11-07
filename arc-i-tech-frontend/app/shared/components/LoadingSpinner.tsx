// src/app/shared/components/LoadingSpinner.tsx
'use client';

export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 240 }}>
      <div className="spinner-border text-primary" role="status" />
      {message && <div className="mt-2 text-muted">{message}</div>}
    </div>
  );
}
