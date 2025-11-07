'use client';

import { RoleBasedLayout } from '@/app/components/layout/RoleBasedLayout';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedLayout allowedRoles={['USER']}>
      {children}
    </RoleBasedLayout>
  );
}