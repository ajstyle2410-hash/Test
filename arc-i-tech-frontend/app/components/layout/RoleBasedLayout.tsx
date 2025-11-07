'use client';

import React from 'react';
import DashboardNavbar from '@/app/components/layout/DashboardNavbar';
import { useAuth } from '@/app/hooks/useAuth';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleBasedLayout({ children, allowedRoles }: LayoutProps) {
  const { user } = useAuth();
  const userRole = user?.role;

  React.useEffect(() => {
    if (!userRole || !allowedRoles.includes(userRole)) {
      redirect('/unauthorized');
    }
  }, [userRole, allowedRoles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{children}</div>
      </div>
    </div>
  );
}