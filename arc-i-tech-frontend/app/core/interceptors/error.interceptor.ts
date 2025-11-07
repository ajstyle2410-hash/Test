// src/app/core/interceptors/error.interceptor.ts
import axios from "axios";
import { AuthService } from "@/app/core/auth/auth.service";

export const setupErrorInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Extract common error details
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      // Handle specific status codes
      switch (status) {
        case 400:
          console.warn("Bad Request:", message);
          break;

        case 401:
          console.warn("Unauthorized: Token expired or invalid");
          AuthService.logout();
          break;

        case 403:
          console.error("Access Denied: You don't have permission to access this resource.");
          window.location.href = "/unauthorized";
          break;

        case 404:
          console.warn("Resource not found:", message);
          window.location.href = "/not-found";
          break;

        case 500:
          console.error("Internal Server Error:", message);
          alert("Server error occurred. Please try again later.");
          break;

        default:
          console.error(`Unexpected error (${status}):`, message);
      }

      // Optional: return error to caller (if needed)
      return Promise.reject(error);
    }
  );
};
