// src/app/lib/axiosClient.ts
'use client';

import axios from "axios";
import { AuthService } from "@/app/core/auth/auth.service";
import { setupErrorInterceptor } from "@/app/core/interceptors/error.interceptor";
import { API_BASE_URL } from "../shared/utils/utils/constants";

// ✅ Create a new Axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// ✅ Request Interceptor — Adds JWT token if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptors — attach global error handler
setupErrorInterceptor();

// ✅ Response Success & Error Logging (Optional)
axiosClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("✅ API Response:", response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ API Error:", error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
