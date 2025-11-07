'use client';

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, formatDate } from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import {
  Project,
  ServiceAssignment,
  ProjectTask,
  TechnicalSkill,
  MentorshipSession,
  ServiceCategory,
} from "@/app/types";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  Code2,
  Loader2,
  MessageSquare,
  Users,
} from "lucide-react";

const serviceCategories: ServiceCategory[] = [
  "SOFTWARE_DEVELOPMENT",
  "SOFTWARE_CONSULTING",
  "ENGINEERING_PROJECTS",
  "PROJECT_MENTORSHIP",
  "MOCK_INTERVIEWS",
  "INTERNSHIP",
  "TECHNICAL_TRAINING",
  "MOCK_TEST",
];

interface TeamMemberStats {
  assignedProjects: number;
  completedTasks: number;
  upcomingSessions: number;
  activeServices: number;
}

interface SkillUpdateRequest {
  skillId: number;
  currentLevel: number;
  goalLevel: number;
}

export default function TeamMemberDashboard() {
  const router = useRouter();
  const { token, isAuthenticated, logout, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [assignments, setAssignments] = useState<ServiceAssignment[]>([]);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [skills, setSkills] = useState<TechnicalSkill[]>([]);
  const [sessions, setSessions] = useState<MentorshipSession[]>([]);
  const [stats, setStats] = useState<TeamMemberStats>({
    assignedProjects: 0,
    completedTasks: 0,
    upcomingSessions: 0,
    activeServices: 0,
  });

  const [selectedServiceCategory, setSelectedServiceCategory] = useState<ServiceCategory | null>(null);
  const [skillUpdateLoading, setSkillUpdateLoading] = useState(false);

  const handleSkillUpdate = async (request: SkillUpdateRequest) => {
    if (!token) return;
    try {
      setSkillUpdateLoading(true);
  const response = await apiFetch<TechnicalSkill>(`/api/team-member/skills/${request.skillId}`, {
        method: "PATCH",
        token,
        body: JSON.stringify({
          currentLevel: request.currentLevel,
          goalLevel: request.goalLevel,
        }),
      });
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === response.data.id ? response.data : skill
        ),
      );
    } catch (error) {
      console.error("Failed to update skill level", error);
    } finally {
      setSkillUpdateLoading(false);
    }
  };

  const loadDashboard = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [
        projectsRes,
        assignmentsRes,
        tasksRes,
        skillsRes,
        sessionsRes,
        statsRes,
      ] = await Promise.all([
        apiFetch<Project[]>("/api/team-member/projects", { token }),
        apiFetch<ServiceAssignment[]>("/api/team-member/assignments", { token }),
        apiFetch<ProjectTask[]>("/api/team-member/tasks", { token }),
        apiFetch<TechnicalSkill[]>("/api/team-member/skills", { token }),
        apiFetch<MentorshipSession[]>("/api/team-member/sessions", { token }),
        apiFetch<TeamMemberStats>("/api/team-member/stats", { token }),
      ]);

      setProjects(projectsRes.data);
      setAssignments(assignmentsRes.data);
      setTasks(tasksRes.data);
      setSkills(skillsRes.data);
      setSessions(sessionsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Failed to load team member dashboard", error);
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

  const filteredAssignments = useMemo(() => {
    if (!selectedServiceCategory) return assignments;
    return assignments.filter(
      (assignment) => assignment.serviceCategory === selectedServiceCategory
    );
  }, [assignments, selectedServiceCategory]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
          Loading team member dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome, {user?.fullName}
          </h1>
          <p className="text-sm text-slate-500">
            View your assignments, update task status, and track skills development.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            {
              label: "Assigned projects",
              value: stats.assignedProjects,
              icon: <Code2 className="h-5 w-5 text-indigo-500" />,
            },
            {
              label: "Tasks completed",
              value: stats.completedTasks,
              icon: <BarChart3 className="h-5 w-5 text-emerald-500" />,
            },
            {
              label: "Upcoming sessions",
              value: stats.upcomingSessions,
              icon: <Calendar className="h-5 w-5 text-amber-500" />,
            },
            {
              label: "Active services",
              value: stats.activeServices,
              icon: <Users className="h-5 w-5 text-rose-500" />,
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
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Service assignments</h2>
              <select
                value={selectedServiceCategory ?? ""}
                onChange={(e) => setSelectedServiceCategory(e.target.value as ServiceCategory)}
                className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600"
              >
                <option value="">All services</option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 space-y-4">
              {filteredAssignments.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                  No service assignments found. New assignments will appear here.
                </p>
              ) : (
                filteredAssignments.map((assignment) => (
                  <article
                    key={assignment.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {assignment.serviceName}
                        </h3>
                        <p className="text-xs text-slate-500">{assignment.description}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600">
                        {assignment.status}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span>Category: {assignment.serviceCategory.replace("_", " ")}</span>
                      <span>Assigned: {formatDate(assignment.assignedAt)}</span>
                      <Link
                        href={`/projects/${assignment.projectId}`}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
                      >
                        View project
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Technical skills</h2>
              <div className="mt-6 space-y-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {skill.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">{skill.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                          Level {skill.currentLevel}/10
                        </span>
                        <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                          Goal {skill.goalLevel}/10
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleSkillUpdate({
                            skillId: skill.id,
                            currentLevel: Math.max(1, skill.currentLevel - 1),
                            goalLevel: skill.goalLevel,
                          })
                        }
                        disabled={skillUpdateLoading}
                        className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-300"
                      >
                        -
                      </button>
                      <div className="flex-1 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${(skill.currentLevel / 10) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleSkillUpdate({
                            skillId: skill.id,
                            currentLevel: Math.min(10, skill.currentLevel + 1),
                            goalLevel: skill.goalLevel,
                          })
                        }
                        disabled={skillUpdateLoading}
                        className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming sessions</h2>
              <div className="mt-6 space-y-4">
                {sessions.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No upcoming sessions scheduled.
                  </p>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="rounded-full bg-indigo-100 p-3">
                        {session.type === "MENTORSHIP" ? (
                          <BrainCircuit className="h-5 w-5 text-indigo-600" />
                        ) : session.type === "TRAINING" ? (
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-indigo-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {session.title}
                        </h3>
                        <p className="text-xs text-slate-500">{formatDate(session.startTime)}</p>
                      </div>
                      {session.meetingLink ? (
                        <Link
                          href={session.meetingLink}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join
                        </Link>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-400">
                          No link
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}