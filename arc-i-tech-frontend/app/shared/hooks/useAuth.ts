// src/app/shared/hooks/useAuth.ts
'use client';

import { useEffect, useState } from "react";
import { AuthService } from "@/app/core/auth/auth.service";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const token = AuthService.getToken();
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        const decoded = AuthService.getDecoded();
        setUser(decoded);
        const valid = AuthService.isAuthenticated();
        setIsAuthenticated(valid);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, isAuthenticated, user };
};
