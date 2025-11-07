export type ProjectStatus = 
  | 'PLANNING'
  | 'DISCOVERY'
  | 'IN_DEVELOPMENT'
  | 'TESTING'
  | 'DEPLOYED'
  | 'ON_HOLD';

export type ProjectPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ProjectMetric {
  label: string;
  value: string | number;
}

export interface Project {
  id: number;
  name: string;
  summary: string;
  details?: string;
  status: ProjectStatus;
  priority?: ProjectPriority;
  clientName?: string;
  targetDate: string;
  progressPercentage: number;
  metrics?: ProjectMetric[];
  createdAt: string;
  updatedAt: string;
}