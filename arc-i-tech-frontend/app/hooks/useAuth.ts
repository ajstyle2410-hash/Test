import { useState, useEffect, useCallback } from 'react';
import type { UserProfile as User } from '@/app/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Load auth state from localStorage on mount
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      setState({ token, user, isAuthenticated: true });
    }
  }, []);

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setState({ token, user, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({ token: null, user: null, isAuthenticated: false });
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setState(prev => ({ ...prev, user }));
  }, []);

  return {
    ...state,
    login,
    logout,
    updateUser,
  };
};