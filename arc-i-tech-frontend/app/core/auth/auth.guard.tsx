// src/app/core/auth/auth.guard.tsx
'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "./auth.service";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.replace("/auth/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return <>{children}</>;
}
