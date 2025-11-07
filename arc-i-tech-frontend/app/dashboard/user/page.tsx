"use client";

import React, { useEffect, useState } from "react";
import { InquiryService } from "@/app/core/services/inquiry.service";
import { useAuth } from "@/app/shared/hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const iq = await InquiryService.getAll();
        // show only inquiries for current user if email available
        if (user?.email) setInquiries((iq || []).filter((x: any) => x.email === user.email));
        else setInquiries(iq || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Dashboard</h2>

      <section className="bg-white shadow rounded-md p-4">
        <h3 className="text-lg font-medium">My Profile</h3>
        <div className="mt-2 text-sm text-gray-700">
          <div><strong>Name:</strong> {user?.fullName ?? user?.name ?? "-"}</div>
          <div><strong>Email:</strong> {user?.email ?? "-"}</div>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-medium mb-2">My Inquiries</h3>
        <div className="bg-white shadow rounded-md overflow-hidden">
          {loading ? (
            <div className="p-4">Loading...</div>
          ) : (
            <ul className="p-4 space-y-2">
              {inquiries.length === 0 && <div className="text-sm text-gray-500">No inquiries found.</div>}
              {inquiries.map((iq: any) => (
                <li key={iq.inquiryId ?? iq.id} className="border p-3 rounded">
                  <div className="font-medium">{iq.subject ?? iq.message?.substring(0, 60)}</div>
                  <div className="text-xs text-gray-500">{iq.createdAt}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
