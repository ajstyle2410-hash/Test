// app/core/auth/auth.service.ts
'use client';

// Use ESM import for jwt-decode v4
import { jwtDecode } from "jwt-decode";
import axiosClient from "@/app/lib/axiosClient";

// Type declarations for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL?: string;
    }
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const TOKEN_KEY = "arcitech_token";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  programType?: string;
}

export interface LoginResponse {
  token: string;
  tokenType?: string;
  id?: number;
  email?: string;
  fullName?: string;
  role?: string;
}

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
};

export const AuthService = {
  // login supports both: login({ email, password }) and login(email, password)
  async login(requestOrEmail: LoginRequest | string, maybePassword?: string) {
    try {
      const request: LoginRequest =
        typeof requestOrEmail === 'string'
          ? { email: requestOrEmail, password: maybePassword || '' }
          : (requestOrEmail as LoginRequest);

      const res = await axiosClient.post<LoginResponse>(`/api/auth/login`, request);
      const data = res.data;
      const token = data?.token;
      if (!token) throw new Error("Invalid response from server");
      localStorage.setItem(TOKEN_KEY, token);
      if (data?.role) localStorage.setItem('user_role', data.role);
      return data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  },

  async register(request: RegisterRequest) {
    try {
      const res = await axiosClient.post(`/api/auth/register`, request);
      return res.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error:', error.response.data);
        throw new Error(error.response.data?.message || 'Registration failed');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check if the server is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw new Error('Failed to make request: ' + error.message);
      }
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user_role');
    if (typeof window !== "undefined") window.location.href = "/auth/login";
  },

  getToken() {
    return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  },

  getDecoded(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      console.warn('No token found');
      return null;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.debug('Decoded token:', decoded);
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  // Backwards-compatible alias used across older call-sites
  getDecodedToken(): JwtPayload | null {
    return this.getDecoded();
  },

  getRole(): string | null {
    const role = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
    // Map backend roles to frontend roles
    switch (role) {
      case 'SUPER_ADMIN':
        return 'SUPER_ADMIN';
      case 'SUB_ADMIN':
        return 'SUB_ADMIN';
      case 'DEVELOPER':
        return 'DEVELOPER';
      case 'CUSTOMER':
        return 'USER';
      default:
        return role;
    }
  },

  // Backwards-compatible alias expected by some components
  getUserRole(): string | null {
    return this.getRole();
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return !decoded.exp || decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
};