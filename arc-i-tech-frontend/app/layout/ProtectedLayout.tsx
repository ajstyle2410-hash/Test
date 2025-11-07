// src/app/layout/ProtectedLayout.tsx
'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/shared/hooks/useAuth";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (!pathname.startsWith("/auth")) {
        router.replace("/auth/login");
      }
    }
  }, [loading, isAuthenticated, pathname, router]);

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100 bg-light"><LoadingSpinner message="Checking authentication..." /></div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container py-4">{children}</main>
      <Footer />
    </div>
  );
}
