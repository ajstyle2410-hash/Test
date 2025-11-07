'use client';

import { RoleBasedLayout } from '@/app/components/layout/RoleBasedLayout';

export default function SubAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedLayout allowedRoles={['SUB_ADMIN']}>
      {children}
    </RoleBasedLayout>
  );
}