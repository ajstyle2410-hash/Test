// src/app/core/models/project.model.ts

// Define allowed statuses clearly
export enum ProjectStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  status?: ProjectStatus;
  startDate?: string;
  endDate?: string;
  assignedUsers?: {
    id: number;
    fullName: string;
    email: string;
  }[];
}
