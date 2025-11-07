"use client";

import React, { useEffect, useState } from "react";
import { ProjectService } from "@/app/core/services/project.service";

export default function DeveloperDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const p = await ProjectService.getAll();
        // show only projects with developer role or assigned (filter loosely)
        setProjects(p);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Developer Dashboard</h2>

      <div className="space-y-4">
        {projects.map((p: any) => (
          <div key={p.id ?? p.projectId} className="bg-white shadow rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{p.name ?? p.title}</h3>
                <p className="text-sm text-gray-600">{p.summary ?? p.description}</p>
              </div>
              <div className="text-sm text-gray-500">{p.status}</div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Tasks</h4>
              <ul className="mt-2 space-y-2">
                {(p.tasks || []).map((t: any) => (
                  <li key={t.id} className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <div>{t.title}</div>
                      <div className="text-xs text-gray-500">{t.status}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
