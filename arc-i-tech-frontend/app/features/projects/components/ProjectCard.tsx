// src/app/features/projects/components/ProjectCard.tsx
'use client';

import { Project } from "@/app/core/models/project.model";
import Link from "next/link";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title fw-bold text-primary">{project.title}</h5>
        <p className="card-text text-muted" style={{ minHeight: "60px" }}>
          {project.description?.length
            ? project.description.substring(0, 100) + "..."
            : "No description available."}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span
            className={`badge bg-${
              project.status === "COMPLETED"
                ? "success"
                : project.status === "IN_PROGRESS"
                ? "warning"
                : "secondary"
            }`}
          >
            {project.status || "NEW"}
          </span>
          <Link
            href={`/features/projects/${project.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
