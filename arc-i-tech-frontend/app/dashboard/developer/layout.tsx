'use client';

import { RoleBasedLayout } from '@/app/components/layout/RoleBasedLayout';

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleBasedLayout allowedRoles={['DEVELOPER']}>
      {children}
    </RoleBasedLayout>
  );
}