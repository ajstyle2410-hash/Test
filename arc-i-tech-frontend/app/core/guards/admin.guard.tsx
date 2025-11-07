// src/app/core/guards/admin.guard.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/core/auth/auth.service";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAuth = AuthService.isAuthenticated();
    const userRole = AuthService.getUserRole();

    if (!isAuth) {
      router.replace("/auth/login");
      return;
    }

    if (userRole !== "ADMIN") {
      router.replace("/unauthorized");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
