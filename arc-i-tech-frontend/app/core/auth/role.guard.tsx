// src/app/core/auth/role.guard.tsx
'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "./auth.service";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRole = AuthService.getUserRole();
    if (!AuthService.isAuthenticated() || !allowedRoles.includes(userRole || "")) {
      router.replace("/unauthorized");
    } else {
      setIsAuthorized(true);
    }
  }, [router, allowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return <>{children}</>;
}
