"use client";

import React, { useEffect, useState } from "react";
import { ProjectService } from "@/app/core/services/project.service";
import { InquiryService } from "@/app/core/services/inquiry.service";

export default function SubAdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const p = await ProjectService.getAll();
        setProjects(p);
      } catch (e) {
        console.error(e);
      }

      try {
        const iq = await InquiryService.getAll();
        setInquiries(iq);
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
      <h2 className="text-2xl font-semibold mb-4">Sub Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Projects</h3>
          <ul className="space-y-2">
            {projects.map((p: any) => (
              <li key={p.id ?? p.projectId} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{p.name ?? p.title}</div>
                  <div className="text-sm text-gray-500">{p.status}</div>
                </div>
                <div>
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-md p-4">
          <h3 className="text-lg font-medium mb-2">Inquiries</h3>
          <ul className="space-y-2">
            {inquiries.map((iq: any) => (
              <li key={iq.inquiryId ?? iq.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{iq.fullName ?? iq.name}</div>
                  <div className="text-sm text-gray-500">{iq.email}</div>
                </div>
                <div className="text-sm text-gray-500">{iq.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
