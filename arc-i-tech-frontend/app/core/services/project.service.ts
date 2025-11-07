// src/app/core/services/project.service.ts
import axiosClient from "@/app/lib/axiosClient";
import { Project, ProjectStatus } from "@/app/core/models/project.model";

function mapProject(raw: any): Project {
  return {
    ...raw,
    status: (raw.status?.toUpperCase() as ProjectStatus) || ProjectStatus.PLANNED,
  };
}

export const ProjectService = {
  async getAll(): Promise<Project[]> {
    const res = await axiosClient.get("/projects");
    return res.data.map(mapProject);
  },

  async getById(id: number): Promise<Project> {
    const res = await axiosClient.get(`/projects/${id}`);
    return mapProject(res.data);
  },

  async create(data: Partial<Project>): Promise<Project> {
    const res = await axiosClient.post(`/projects`, data);
    return mapProject(res.data);
  },

  async update(id: number, data: Partial<Project>): Promise<Project> {
    const res = await axiosClient.put(`/projects/${id}`, data);
    return mapProject(res.data);
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/projects/${id}`);
  },
};
