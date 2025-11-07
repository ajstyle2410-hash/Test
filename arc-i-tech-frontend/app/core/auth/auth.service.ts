// app/core/auth/auth.service.ts
'use client';

import { jwtDecode } from "jwt-decode";
import axiosClient from "@/app/lib/axiosClient";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
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
  async login(request: LoginRequest) {
    try {
      const res = await axiosClient.post<LoginResponse>(`/auth/login`, request);
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
      const res = await axiosClient.post(`/auth/register`, request);
      return res.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Registration failed');
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

  getRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
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