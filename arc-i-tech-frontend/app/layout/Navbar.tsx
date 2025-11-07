// src/app/layout/Navbar.tsx
'use client';

import Link from "next/link";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { AuthService } from "@/app/core/auth/auth.service";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-primary">Arc-i-Tech</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link href="/projects" className="nav-link">Projects</Link></li>
            <li className="nav-item"><Link href="/inquiries/new" className="nav-link">Contact</Link></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item me-3"><span className="nav-link text-muted">{user?.email || user?.sub}</span></li>
                <li className="nav-item"><button className="btn btn-outline-danger btn-sm" onClick={() => AuthService.logout()}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item me-2"><Link href="/auth/login" className="btn btn-outline-primary btn-sm">Login</Link></li>
                <li className="nav-item"><Link href="/auth/register" className="btn btn-primary btn-sm">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
