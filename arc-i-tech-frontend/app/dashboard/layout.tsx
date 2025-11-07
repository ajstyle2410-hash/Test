'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/core/auth/auth.service';
import DashboardNavbar from '@/app/components/layout/DashboardNavbar';

const roleRedirects: { [key: string]: string } = {
  'SUPER_ADMIN': '/dashboard/super-admin',
  'SUB_ADMIN': '/dashboard/sub-admin',
  'DEVELOPER': '/dashboard/developer',
  'USER': '/dashboard/user'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const role = AuthService.getRole();

  useEffect(() => {
    if (role && window.location.pathname === '/dashboard') {
      const redirectPath = roleRedirects[role] || '/unauthorized';
      router.push(redirectPath);
    }
  }, [role, router]);

  if (!role) {
    return null; // or loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
