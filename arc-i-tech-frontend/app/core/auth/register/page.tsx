// src/app/auth/register/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/core/auth/auth.service";
import Alert from "@/app/shared/components/Alert";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [programType, setProgramType] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      await AuthService.register(fullName, email, password, programType);
      setMsg("Registration successful. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1400);
    } catch (err: any) {
      setErr(err?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow-sm" style={{ width: 480 }}>
        <h4 className="mb-3 text-center text-primary">Create account</h4>

        {err && <Alert type="danger" message={err} />}
        {msg && <Alert type="success" message={msg} />}
        {busy && <LoadingSpinner message="Creating account..." />}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" value={fullName} onChange={e=>setFullName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
          </div>

          <div className="mb-3">
            <label className="form-label">Program type</label>
            <select className="form-select" value={programType} onChange={e=>setProgramType(e.target.value)}>
              <option value="">Select a program</option>
              <option value="SOFTWARE_DEVELOPMENT">Software Development</option>
              <option value="MENTORSHIP">Mentorship</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={busy}>
            {busy ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0">
          Already registered? <a href="/auth/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
