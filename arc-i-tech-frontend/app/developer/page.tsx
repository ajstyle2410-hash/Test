'use client';

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, formatDate } from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import {
  Project,
  ProjectTask,
  CodeReview,
  TechnicalDocument,
  DeploymentStatus,
  ProjectMilestone,
} from "@/app/types";
import {
  BarChart3,
  Code2,
  FileCode2,
  GitBranch,
  Loader2,
  Package,
  RefreshCw,
  Rocket,
  Sparkles,
} from "lucide-react";

interface DeveloperStats {
  activeProjects: number;
  completedTasks: number;
  codeReviews: number;
  deployments: number;
}

type ProjectFilter = "ALL" | "ACTIVE" | "COMPLETED";

export default function ProjectDeveloperDashboard() {
  const router = useRouter();
  const { token, isAuthenticated, logout, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [reviews, setReviews] = useState<CodeReview[]>([]);
  const [documents, setDocuments] = useState<TechnicalDocument[]>([]);
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([]);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [stats, setStats] = useState<DeveloperStats>({
    activeProjects: 0,
    completedTasks: 0,
    codeReviews: 0,
    deployments: 0,
  });

  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("ACTIVE");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [deploymentLoading, setDeploymentLoading] = useState(false);

  const handleUpdateTaskStatus = async (taskId: number, status: ProjectTask["status"]) => {
    if (!token) return;
    try {
      const response = await apiFetch<ProjectTask>('/api/developer/tasks/' + taskId, {
        method: "PATCH",
        token,
        body: JSON.stringify({ status }),
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleDeployment = async (projectId: number) => {
    if (!token) return;
    try {
      setDeploymentLoading(true);
      const response = await apiFetch<DeploymentStatus>('/api/developer/projects/' + projectId + '/deploy', {
        method: "POST",
        token,
      });
      setDeployments((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to trigger deployment", error);
    } finally {
      setDeploymentLoading(false);
    }
  };

  const loadDashboard = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [
        projectsRes,
        tasksRes,
        reviewsRes,
        documentsRes,
        deploymentsRes,
        milestonesRes,
        statsRes,
      ] = await Promise.all([
        apiFetch<Project[]>("/api/developer/projects", { token }),
        apiFetch<ProjectTask[]>("/api/developer/tasks", { token }),
        apiFetch<CodeReview[]>("/api/developer/reviews", { token }),
        apiFetch<TechnicalDocument[]>("/api/developer/documents", { token }),
        apiFetch<DeploymentStatus[]>("/api/developer/deployments", { token }),
        apiFetch<ProjectMilestone[]>("/api/developer/milestones", { token }),
        apiFetch<DeveloperStats>("/api/developer/stats", { token }),
      ]);

      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setReviews(reviewsRes.data);
      setDocuments(documentsRes.data);
      setDeployments(deploymentsRes.data);
      setMilestones(milestonesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to load developer dashboard", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace("/login");
      return;
    }
    void loadDashboard();
  }, [isAuthenticated, token, router, loadDashboard]);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "ALL") return projects;
    return projects.filter((project) =>
      projectFilter === "ACTIVE"
        ? project.status !== "DEPLOYED"
        : project.status === "DEPLOYED"
    );
  }, [projects, projectFilter]);

  const projectTasks = useMemo(() => {
    if (!selectedProject) return tasks;
    return tasks.filter((task) => task.projectId === selectedProject);
  }, [tasks, selectedProject]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
          Loading developer workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Developer workspace
          </h1>
          <p className="text-sm text-slate-500">
            Track assigned projects, review code, and manage deployments.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            {
              label: "Active projects",
              value: stats.activeProjects,
              icon: <Code2 className="h-5 w-5 text-indigo-500" />,
            },
            {
              label: "Tasks completed",
              value: stats.completedTasks,
              icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
            },
            {
              label: "Code reviews",
              value: stats.codeReviews,
              icon: <GitBranch className="h-5 w-5 text-amber-500" />,
            },
            {
              label: "Deployments",
              value: stats.deployments,
              icon: <Rocket className="h-5 w-5 text-rose-500" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="rounded-full bg-slate-50 p-3">{stat.icon}</div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Project tasks</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedProject ?? ""}
                    onChange={(e) => setSelectedProject(e.target.value ? Number(e.target.value) : null)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
                  >
                    <option value="">All projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => loadDashboard()}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {projectTasks.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No tasks assigned yet. New tasks will appear here.
                  </p>
                ) : (
                  projectTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {task.title}
                          </h3>
                          <p className="text-xs text-slate-500">{task.description}</p>
                        </div>
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleUpdateTaskStatus(task.id, e.target.value as ProjectTask["status"])
                          }
                          className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600"
                        >
                          <option value="TODO">To do</option>
                          <option value="IN_PROGRESS">In progress</option>
                          <option value="REVIEW">Review</option>
                          <option value="DONE">Done</option>
                        </select>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span>Project: {task.projectName}</span>
                        <span>Due: {formatDate(task.dueDate)}</span>
                        {task.priority === "HIGH" && (
                          <span className="rounded-full bg-rose-100 px-2 py-1 text-rose-700">
                            High priority
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Recent deployments</h2>
              <div className="mt-6 space-y-4">
                {deployments.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No deployments yet. Completed builds will be logged here.
                  </p>
                ) : (
                  deployments.map((deployment) => (
                    <div
                      key={deployment.id}
                      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="rounded-full bg-indigo-100 p-3">
                        <Package className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {deployment.projectName} - v{deployment.version}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {formatDate(deployment.deployedAt)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          deployment.status === "SUCCESS"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {deployment.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Code reviews</h2>
              <div className="mt-6 space-y-4">
                {reviews.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No pending code reviews.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {review.title}
                          </h3>
                          <p className="text-xs text-slate-500">{review.description}</p>
                        </div>
                        <Link
                          href={review.reviewUrl}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Review
                        </Link>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span>Project: {review.projectName}</span>
                        <span>Author: {review.author}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Technical docs</h2>
              <div className="mt-6 space-y-4">
                {documents.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No technical documents available.
                  </p>
                ) : (
                  documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="rounded-full bg-indigo-100 p-3">
                        <FileCode2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Last updated: {formatDate(doc.updatedAt)}
                        </p>
                      </div>
                      <Link
                        href={doc.documentUrl}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Project deployment</h2>
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value as ProjectFilter)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
                >
                  <option value="ALL">All projects</option>
                  <option value="ACTIVE">Active only</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="mt-6 space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {project.name}
                        </h3>
                        <p className="text-xs text-slate-500">{project.summary}</p>
                      </div>
                      {project.status !== "DEPLOYED" && (
                        <button
                          onClick={() => handleDeployment(project.id)}
                          disabled={deploymentLoading}
                          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deploymentLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="h-3 w-3" />
                          )}
                          Deploy
                        </button>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>Status: {project.status}</span>
                      <span>Progress: {project.progressPercentage}%</span>
                      <span>Target: {formatDate(project.targetDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}