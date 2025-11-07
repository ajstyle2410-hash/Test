'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/core/auth/auth.service';

export default function DashboardPage() {
  const router = useRouter();
  const role = AuthService.getRole();

  useEffect(() => {
    if (role) {
      switch (role) {
        case 'SUPER_ADMIN':
          router.push('/dashboard/super-admin');
          break;
        case 'SUB_ADMIN':
          router.push('/dashboard/sub-admin');
          break;
        case 'DEVELOPER':
          router.push('/dashboard/developer');
          break;
        case 'USER':
          router.push('/dashboard/user');
          break;
        default:
          router.push('/unauthorized');
      }
    } else {
      router.push('/auth/login');
    }
  }, [role, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}