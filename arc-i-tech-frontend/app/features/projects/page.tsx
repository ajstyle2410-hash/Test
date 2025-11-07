// src/app/features/projects/page.tsx
'use client';

import { useEffect, useState } from "react";
import { ProjectService } from "@/app/core/services/project.service";
import AuthGuard from "@/app/core/guards/auth.guard";
import ProjectCard from "./components/ProjectCard";
import { Project } from "@/app/core/models/project.model";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProjectService.getAll()
      .then((res) => setProjects(res))
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthGuard>
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">All Projects</h2>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="alert alert-warning text-center">
            No projects found.
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((project) => (
              <div key={project.id} className="col-md-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
