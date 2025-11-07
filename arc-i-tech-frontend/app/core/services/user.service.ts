// src/app/core/services/user.service.ts
import ApiService from "./api.service";

export interface UserProfile {
  id?: number;
  fullName: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export const UserService = {
  async getProfile(): Promise<UserProfile> {
    return ApiService.get<UserProfile>("/auth/profile");
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return ApiService.put<UserProfile>("/auth/profile", data);
  },

  async getAllUsers(): Promise<UserProfile[]> {
    return ApiService.get<UserProfile[]>("/users");
  },

  async getUserById(id: number): Promise<UserProfile> {
    return ApiService.get<UserProfile>(`/users/${id}`);
  },
};
