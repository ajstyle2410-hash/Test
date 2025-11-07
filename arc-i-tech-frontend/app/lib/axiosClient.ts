'use client';

import axios from "axios";
import { AuthService } from "@/app/core/auth/auth.service";
import { setupErrorInterceptor } from "@/app/core/interceptors/error.interceptor";
import { logger } from '@/app/utils/logger';

// Get the API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Create a new Axios instance with CORS configuration
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true, // Enable credentials for proper CORS handling
  timeout: 30000, // 30 seconds
});

// Add default error handler for network errors
axios.defaults.timeoutErrorMessage = "Server request timed out. Please try again.";

// Request Interceptor — Adds JWT token if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    return config;
  },
  (error) => {
    logger.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Helper function to get user-friendly error messages
function getFriendlyErrorMessage(error: any): string {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Your session has expired. Please log in again.';
      case 403:
        return 'You don\'t have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'An unexpected error occurred. Please try again later.';
      default:
        return `Server error (${error.response.status}). Please try again later.`;
    }
  } else if (error.request) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  return 'An unexpected error occurred. Please try again.';
}

// Response Interceptors
axiosClient.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
      logger.debug("API Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    // Log the error with our custom logger
    logger.logApiError(error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      AuthService.logout(); // Force logout on auth error
      window.location.href = '/auth/login?session=expired';
    } else if (error.response?.status === 403) {
      // Forbidden - user doesn't have required permissions
      window.location.href = '/unauthorized';
    } else if (!error.response && error.message.includes('Network Error')) {
      // Network/CORS issues
      logger.error('Network Error: Please check if the backend server is running and CORS is configured correctly.');
      
      // Only show toast in development
      if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
        console.error('Development: Network Error - Backend server might be down or CORS issues');
      }
    }

    // Enhance error object with useful information
    const enhancedError = {
      ...error,
      friendlyMessage: getFriendlyErrorMessage(error),
      timestamp: new Date().toISOString(),
      environment: process.env.NEXT_PUBLIC_APP_ENV
    };

    return Promise.reject(enhancedError);
  }
);

// Attach global error handler
setupErrorInterceptor();

export default axiosClient;
