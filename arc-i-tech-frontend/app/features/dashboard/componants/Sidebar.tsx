// src/app/features/dashboard/components/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: "bi-speedometer2", href: "/features/dashboard" },
    { label: "Projects", icon: "bi-kanban", href: "/projects" },
    { label: "Inquiries", icon: "bi-envelope", href: "/inquiries" },
    { label: "Notifications", icon: "bi-bell", href: "/notifications" },
  ];

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="fw-bold text-center mb-4">Arc-i-Tech</h4>
      <ul className="nav flex-column">
        {navItems.map((item) => (
          <li key={item.href} className="nav-item mb-2">
            <Link
              href={item.href}
              className={`nav-link text-white d-flex align-items-center ${
                pathname === item.href ? "active bg-primary rounded" : ""
              }`}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
