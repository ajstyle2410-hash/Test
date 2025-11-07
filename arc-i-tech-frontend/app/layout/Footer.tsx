// src/app/layout/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 border-top mt-auto">
      <div className="container">
        <p className="mb-0 small">
          © {new Date().getFullYear()} <strong>Arc-i-Tech</strong>. All rights reserved.
        </p>
        <p className="mb-0 small">
          <a href="/privacy" className="text-decoration-none text-muted">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="text-decoration-none text-muted">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
