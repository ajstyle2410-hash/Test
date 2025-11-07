// src/app/core/models/register-request.model.ts

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  programType?: string; // Optional: "Internship" | "Mentorship" | "Final Year Project"
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  email: string;
  role: string;
  programType?: string;
}
