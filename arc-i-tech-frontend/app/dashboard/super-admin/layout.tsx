'use client';

import { RoleBasedLayout } from '@/app/components/layout/RoleBasedLayout';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedLayout allowedRoles={['SUPER_ADMIN']}>
      {children}
    </RoleBasedLayout>
  );
}