// src/app/projects/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from "@/app/core/guards/auth.guard";
import ServiceService, { ServiceDTO } from '@/app/core/services/service.service';
import ServiceRequestService from '@/app/core/services/serviceRequest.service';
import ServiceSlider from '@/app/shared/components/ServiceSlider';

export default function ProjectsPage() {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const s = await ServiceService.listServices();
        if (mounted) setServices(s);
      } catch (err) {
        console.error('Failed to load services', err);
        setMsg('Failed to load services.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  async function handleRequest(service: ServiceDTO) {
    try {
      await ServiceRequestService.createRequest({ serviceId: service.id });
      setMsg(`Request submitted for ${service.name}.`);
    } catch (err: any) {
      console.error('Failed to create request', err);
      setMsg(err?.response?.data?.message || 'Failed to submit request');
    }
  }

  return (
    <AuthGuard>
      <div className="container mx-auto mt-6 px-4">
        <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
        {msg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">{msg}</div>
        )}

        {loading ? (
          <div>Loading services…</div>
        ) : (
          <ServiceSlider services={services} onRequest={handleRequest} />
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Projects Dashboard</h3>
          <p className="text-gray-600">Use the services slider above to request help — your requests will appear in your dashboard after approval.</p>
        </div>
      </div>
    </AuthGuard>
  );
}
