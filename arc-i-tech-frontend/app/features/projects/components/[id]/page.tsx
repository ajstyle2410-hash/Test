'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedLayout from "@/app/layout/ProtectedLayout";
import AuthGuard from "@/app/core/auth/auth.guard";
import { ProjectService } from "@/app/core/services/project.service";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";
import Alert from "@/app/shared/components/Alert";
import { formatDate } from "@/app/shared/utils/dateFormat";
import { Project } from "@/app/core/models/project.model";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load project details
  const loadProject = async () => {
    try {
      if (!id) return;
      const data = await ProjectService.getById(Number(id));
      setProject(data);
    } catch (err: any) {
      console.error("Error fetching project:", err);
      setError("Failed to load project details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <ProtectedLayout>
        <LoadingSpinner message="Loading project details..." />
      </ProtectedLayout>
    );
  }

  if (error || !project) {
    return (
      <ProtectedLayout>
        <div className="container mt-5">
          <Alert type="danger" message={error || "Project not found."} />
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => router.push("/features/projects")}
          >
            <i className="bi bi-arrow-left"></i> Back to Projects
          </button>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <AuthGuard>
      <ProtectedLayout>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary">{project.title}</h2>
            <button
              className="btn btn-outline-secondary"
              onClick={() => router.push("/features/projects")}
            >
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </div>

          {/* Project Overview */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Overview</h5>
              <p className="text-muted mb-0">
                {project.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Status + Timeline */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-bold text-secondary">Status</h6>
                  <span
                    className={`badge ${
                      project.status === "IN_PROGRESS"
                        ? "bg-warning text-dark"
                        : project.status === "COMPLETED"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {project.status || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-bold text-secondary">Timeline</h6>
                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar3"></i> Start:{" "}
                    {formatDate(project.startDate)}
                  </p>
                  <p className="text-muted mb-0">
                    <i className="bi bi-flag"></i> End:{" "}
                    {formatDate(project.endDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {project.assignedUsers && project.assignedUsers.length > 0 && (
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body">
                <h5 className="fw-bold text-secondary mb-3">Team Members</h5>
                <ul className="list-group list-group-flush">
                  {project.assignedUsers.map((user, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex align-items-center"
                    >
                      <i className="bi bi-person-circle text-primary me-2"></i>
                      <span>{user.fullName || user.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </ProtectedLayout>
    </AuthGuard>
  );
}
