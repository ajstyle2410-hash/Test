export * from './auth';
export * from './chat';
export * from './project';
export * from './notification';

// Re-export a common User alias for backward compatibility
export type { UserProfile as User } from './auth';

export interface ProjectTask {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CodeReview {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  description: string;
  author: string;
  reviewUrl: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface TechnicalDocument {
  id: number;
  projectId: number;
  title: string;
  description: string;
  documentUrl: string;
  type: 'API' | 'DESIGN' | 'REQUIREMENTS' | 'ARCHITECTURE';
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentStatus {
  id: number;
  projectId: number;
  projectName: string;
  version: string;
  status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
  environment: 'DEV' | 'STAGING' | 'PRODUCTION';
  deployedAt: string;
  deployedBy: number;
}

export interface ProjectMilestone {
  id: number;
  projectId: number;
  title: string;
  description: string;
  targetDate: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategory =
  | 'SOFTWARE_DEVELOPMENT'
  | 'SOFTWARE_CONSULTING'
  | 'ENGINEERING_PROJECTS'
  | 'PROJECT_MENTORSHIP'
  | 'MOCK_INTERVIEWS'
  | 'INTERNSHIP'
  | 'TECHNICAL_TRAINING'
  | 'MOCK_TEST';

export interface ServiceAssignment {
  id: number;
  projectId: number;
  serviceName: string;
  description: string;
  serviceCategory: ServiceCategory;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
  assignedAt: string;
}

export interface TechnicalSkill {
  id: number;
  name: string;
  category: string;
  currentLevel: number;
  goalLevel: number;
}

export interface MentorshipSession {
  id: number;
  title: string;
  type: 'MENTORSHIP' | 'TRAINING' | 'QANDA';
  startTime: string;
  meetingLink?: string;
}