// src/app/core/guards/auth.guard.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/core/auth/auth.service";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
      router.replace("/auth/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
