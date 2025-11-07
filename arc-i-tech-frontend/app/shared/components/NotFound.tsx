// src/app/shared/components/NotFound.tsx
'use client';

export default function NotFound({ message = "Page not found." }) {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 fw-bold text-danger">404</h1>
      <p className="lead text-muted">{message}</p>
      <a href="/" className="btn btn-outline-primary mt-3">
        Go Home
      </a>
    </div>
  );
}
