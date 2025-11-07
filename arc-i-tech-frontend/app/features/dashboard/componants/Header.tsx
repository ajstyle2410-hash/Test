// src/app/features/dashboard/components/Header.tsx
'use client';

import { useEffect, useState } from "react";
import { AuthService } from "@/app/core/auth/auth.service";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const decoded = AuthService.getDecodedToken();
    setUser(decoded);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm px-3">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-primary">Dashboard</span>
        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-muted">
                <i className="bi bi-person-circle me-1"></i>
                {user.sub || user.email}
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => AuthService.logout()}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/auth/login" className="btn btn-outline-primary btn-sm">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
