// src/app/core/models/user.model.ts

export type UserRole = "ADMIN" | "USER" | "MENTOR" | "STUDENT";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;       // never send password from backend
  role: UserRole;
  programType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {                 
    id: number;     
    fullName: string;   
    email: string;
    role: UserRole;
    programType?: string;
    createdAt: string;
    updatedAt: string;
}       