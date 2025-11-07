// src/app/shared/components/Alert.tsx
'use client';

export default function Alert({ type = "info", message }: { type?: "success"|"danger"|"warning"|"info", message: string }) {
  return (
    <div className={`alert alert-${type} py-2`} role="alert">
      {message}
    </div>
  );
}
