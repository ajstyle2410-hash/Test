'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { AuthService } from '@/app/core/auth/auth.service';

interface NavLink {
  href: string;
  label: string;
  roles: string[];
}

const navLinks: NavLink[] = [
  { href: '/dashboard/projects', label: 'Projects', roles: ['SUPER_ADMIN', 'SUB_ADMIN', 'DEVELOPER', 'USER'] },
  { href: '/dashboard/inquiries', label: 'Inquiries', roles: ['SUPER_ADMIN', 'SUB_ADMIN'] },
  { href: '/dashboard/users', label: 'Users', roles: ['SUPER_ADMIN'] },
  { href: '/dashboard/notifications', label: 'Notifications', roles: ['SUPER_ADMIN', 'SUB_ADMIN', 'DEVELOPER', 'USER'] },
  { href: '/dashboard/chat', label: 'Chat', roles: ['SUPER_ADMIN', 'SUB_ADMIN', 'DEVELOPER', 'USER'] },
];

export default function DashboardNavbar() {
  const { user } = useAuth();
  const userRole = AuthService.getRole();

  const filteredLinks = navLinks.filter(link => link.roles.includes(userRole || ''));

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                Arc-i-Tech
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {filteredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{user?.email}</span>
                  <button
                    onClick={() => AuthService.logout()}
                    className="text-sm font-medium text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}