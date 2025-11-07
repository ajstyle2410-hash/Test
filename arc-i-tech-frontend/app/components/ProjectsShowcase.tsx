import Image from "next/image";
import Link from "next/link";
import { Project, ProjectStatus } from "@/app/types";
import { formatDate } from "@/app/lib/api";
import { 
  Kanban, 
  Target, 
  Users, 
  ChevronRight,
  Clock,
  GitBranch,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ProjectsShowcaseProps {
  projects: Project[];
}

const statusBadges: Record<ProjectStatus, { color: string; icon: JSX.Element }> = {
  PLANNING: { 
    color: "bg-slate-100 text-slate-600",
    icon: <Clock className="h-4 w-4" />
  },
  DISCOVERY: {
    color: "bg-blue-100 text-blue-600",
    icon: <GitBranch className="h-4 w-4" />
  },
  IN_DEVELOPMENT: {
    color: "bg-indigo-100 text-indigo-600",
    icon: <Kanban className="h-4 w-4" />
  },
  TESTING: {
    color: "bg-amber-100 text-amber-600",
    icon: <AlertCircle className="h-4 w-4" />
  },
  DEPLOYED: {
    color: "bg-emerald-100 text-emerald-600",
    icon: <CheckCircle className="h-4 w-4" />
  },
  ON_HOLD: {
    color: "bg-rose-100 text-rose-600",
    icon: <AlertCircle className="h-4 w-4" />
  },
};

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  // Group projects by status
  const groupedProjects = projects.reduce((acc, project) => {
    const status = project.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(project);
    return acc;
  }, {} as Record<ProjectStatus, Project[]>);

  return (
    <section id="process" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <Image
              src="/Arc-i-Tech-logo.png"
              alt="Arc-i-Tech logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-contain"
            />
            <span className="text-xl font-semibold text-slate-800">
              Arc-<span className="text-red-500 italic">i</span>-Tech
            </span>
          </div>
          <span className="mx-auto w-fit rounded-full bg-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            Case files
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Shipping mission-critical products
          </h2>
          <p className="mx-auto max-w-3xl text-base text-slate-600">
            Insights into how Arc-<span className="text-red-500 italic">i</span>-Tech translates domain knowledge into
            product experiences designed for scale, resilience, and delight.
          </p>
        </div>

        {/* Project Status Overview */}
        <div className="mt-12 grid gap-8">
          {Object.entries(statusBadges).map(([status, { color, icon }]) => {
            const statusProjects = groupedProjects[status as ProjectStatus] || [];
            if (statusProjects.length === 0) return null;

            return (
              <div key={status} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${color}`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {status.replace(/_/g, " ")}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    {statusProjects.length} {statusProjects.length === 1 ? "project" : "projects"}
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {statusProjects.map((project) => (
                    <article
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-xl font-semibold text-slate-900">
                              {project.name}
                            </h4>
                            <p className="mt-2 text-sm text-slate-600">
                              {project.summary}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusBadges[project.status].color}`}
                            >
                              {statusBadges[project.status].icon}
                              {project.status.replace(/_/g, " ")}
                            </span>
                            {project.priority && (
                              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                                {project.priority}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-3 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Kanban className="h-4 w-4 text-indigo-500" />
                            <div className="flex-1">
                              <div className="mb-1 flex items-center justify-between">
                                <span>Progress</span>
                                <span className="font-semibold text-slate-700">
                                  {project.progressPercentage}%
                                </span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                  style={{ width: `${project.progressPercentage}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-indigo-500" />
                            <span>
                              Target launch:{" "}
                              <span className="font-semibold text-slate-700">
                                {formatDate(project.targetDate)}
                              </span>
                            </span>
                          </div>

                          {project.clientName && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-indigo-500" />
                              <span>
                                Partnering with{" "}
                                <span className="font-semibold text-slate-700">
                                  {project.clientName}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>

                        {project.details && (
                          <div className="mt-2">
                            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                              {project.details}
                            </p>
                          </div>
                        )}

                        {/* Project metrics */}
                        {project.metrics && (
                          <div className="mt-4 grid grid-cols-3 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                            {project.metrics.map((metric, index) => (
                              <div key={index} className="text-center">
                                <p className="text-2xl font-semibold text-indigo-600">
                                  {metric.value}
                                </p>
                                <p className="text-xs text-slate-500">{metric.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* View details overlay */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                          View details
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <p className="text-slate-500">
                Once your backend is ready, highlight customer success stories here to build credibility.
              </p>
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Create your first project
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}