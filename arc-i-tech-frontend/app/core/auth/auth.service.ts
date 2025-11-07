// app/core/auth/auth.service.ts
'use client';

import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
};

export const AuthService = {
  async login(request: LoginRequest) {
    const res = await axios.post(`${API_URL}/auth/login`, request);
    const token = res.data?.token;
    if (!token) throw new Error("Invalid response from server");
    localStorage.setItem(TOKEN_KEY, token);
    return res.data;
  },

  async register(request: RegisterRequest) {
    const res = await axios.post(`${API_URL}/auth/register`, request);
    return res.data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    if (typeof window !== "undefined") window.location.href = "/auth/login";
  },

  getToken() {
    return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  },

  getDecoded(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
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