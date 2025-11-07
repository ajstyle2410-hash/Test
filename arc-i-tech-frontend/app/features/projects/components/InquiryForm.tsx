// src/app/features/inquiries/components/InquiryForm.tsx
'use client';

import { useState } from "react";
import { InquiryService } from "@/app/core/services/inquiry.service";

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      await InquiryService.submitInquiry(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {status === "success" && (
        <div className="alert alert-success text-center">
          Inquiry submitted successfully! We'll contact you soon.
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger text-center">
          Something went wrong. Please try again.
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-semibold">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Subject</label>
        <input
          type="text"
          name="subject"
          className="form-control"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Message</label>
        <textarea
          name="message"
          rows={4}
          className="form-control"
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
