// src/app/core/models/login-request.model.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType?: string; // e.g., Bearer
  userId: number;
  email: string;
  fullName: string;
  role: string;
}
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  programType: string;
}