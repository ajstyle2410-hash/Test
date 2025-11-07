"use client";

import React, { useEffect, useState } from "react";
import { ProjectService } from "@/app/core/services/project.service";
import { InquiryService } from "@/app/core/services/inquiry.service";

export default function SuperAdminDashboard() {
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
      <h2 className="text-2xl font-semibold mb-4">Super Admin Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-2">Projects</h3>
        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {projects.map((p: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm">{p.id ?? p.projectId ?? idx + 1}</td>
                  <td className="px-4 py-3 text-sm">{p.name ?? p.title ?? p.summary}</td>
                  <td className="px-4 py-3 text-sm">{(p.status || "-").toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-2">Inquiries</h3>
        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {inquiries.map((iq: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm">{iq.inquiryId ?? iq.id ?? idx + 1}</td>
                  <td className="px-4 py-3 text-sm">{iq.fullName ?? iq.name}</td>
                  <td className="px-4 py-3 text-sm">{iq.email}</td>
                  <td className="px-4 py-3 text-sm">{iq.status ?? "NEW"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
