// src/app/features/inquiries/page.tsx
'use client';

import { useEffect, useState } from "react";
import { InquiryService } from "@/app/core/services/inquiry.service";
import AdminGuard from "@/app/core/guards/admin.guard";

export default function InquiryListPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    InquiryService.getAll()
      .then((data) => setInquiries(data))
      .catch((err) => console.error("Error fetching inquiries:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminGuard>
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">All Inquiries</h2>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="alert alert-warning text-center">
            No inquiries found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, index) => (
                  <tr key={inq.id}>
                    <td>{index + 1}</td>
                    <td>{inq.name}</td>
                    <td>{inq.email}</td>
                    <td>{inq.subject}</td>
                    <td>{inq.message}</td>
                    <td>
                      {new Date(inq.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
