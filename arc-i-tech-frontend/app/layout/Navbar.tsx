// src/app/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { AuthService } from "@/app/core/auth/auth.service";
import ApiService from "@/app/core/services/api.service";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const notifRef = useRef<HTMLLIElement | null>(null);

  const toggle = () => setOpen(!open);

  const loadNotifications = async () => {
    setLoadingNotifs(true);
    try {
      const data = await ApiService.get<any[]>("/notifications");
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load notifications", err);
      setNotifications([]);
    } finally {
      setLoadingNotifs(false);
    }
  };

  const onNotifToggle = async () => {
    const next = !notifOpen;
    setNotifOpen(next);
    // load when opening
    if (next && notifications.length === 0) await loadNotifications();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-primary">
          Arc-i-Tech
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/projects" className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <Link href="/inquiries/new" className="nav-link">Contact</Link>
            </li>

            {/* Role-specific quick links */}
            {isAuthenticated && user?.role === 'CUSTOMER' && (
              <>
                <li className="nav-item"><Link href="/dashboard/user" className="nav-link">My Dashboard</Link></li>
                <li className="nav-item"><Link href="/inquiries/new" className="nav-link">Inquiry</Link></li>
                <li className="nav-item"><Link href="/chat" className="nav-link">Chat</Link></li>
              </>
            )}
            {isAuthenticated && user?.role === 'SUB_ADMIN' && (
              <>
                <li className="nav-item"><Link href="/dashboard/sub-admin" className="nav-link">Sub-Admin</Link></li>
                <li className="nav-item"><Link href="/dashboard/sub-admin/team" className="nav-link">Team</Link></li>
              </>
            )}
            {isAuthenticated && user?.role === 'SUPER_ADMIN' && (
              <li className="nav-item"><Link href="/dashboard/super-admin" className="nav-link">Admin</Link></li>
            )}
            {isAuthenticated && user?.role === 'DEVELOPER' && (
              <li className="nav-item"><Link href="/dashboard/developer" className="nav-link">Developer</Link></li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {/* Notifications dropdown */}
            {isAuthenticated && (
              <li className="nav-item dropdown me-3" ref={notifRef}>
                <button
                  className="btn btn-link nav-link position-relative"
                  onClick={onNotifToggle}
                  aria-expanded={notifOpen}
                >
                  <span className="text-muted">Notifications</span>
                  {notifications.length > 0 && (
                    <span className="badge bg-danger ms-2">{notifications.length}</span>
                  )}
                </button>

                <div className={`dropdown-menu dropdown-menu-end ${notifOpen ? 'show' : ''}`} style={{ minWidth: 320 }}>
                  <div className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Notifications</strong>
                      <button className="btn btn-sm btn-link" onClick={() => loadNotifications()}>Refresh</button>
                    </div>

                    {loadingNotifs && <div className="text-center py-2">Loading...</div>}

                    {!loadingNotifs && notifications.length === 0 && (
                      <div className="text-center text-muted">No notifications</div>
                    )}

                    {!loadingNotifs && notifications.map((n) => (
                      <div key={n.id} className="dropdown-item">
                        <div className="fw-semibold">{n.title}</div>
                        <div className="text-muted small">{n.message}</div>
                        <div className="text-muted small">{new Date(n.createdAt).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )}

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
