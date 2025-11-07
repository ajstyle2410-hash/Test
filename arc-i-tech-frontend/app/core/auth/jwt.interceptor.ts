// src/app/core/auth/jwt.interceptor.ts
import axios from "axios";
import { AuthService } from "./auth.service";

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        AuthService.logout();
      }
      return Promise.reject(error);
    }
  );
};
