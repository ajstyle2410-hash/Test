'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationLogger() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('Current route:', pathname);
  }, [pathname]);

  return null;
}