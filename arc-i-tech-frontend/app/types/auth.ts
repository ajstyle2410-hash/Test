export type Role = 'SUPER_ADMIN' | 'SUB_ADMIN' | 'DEVELOPER' | 'TEAM_MEMBER' | 'CUSTOMER';

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  permissions?: string[];
}

export interface AuthResponsePayload {
  token: string;
  user: UserProfile;
  expiresInMs: number;
  refreshToken?: string;
}