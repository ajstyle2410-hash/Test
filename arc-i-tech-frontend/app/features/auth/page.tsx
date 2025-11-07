// src/app/features/auth/login/page.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/core/auth/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await AuthService.login(email, password);
      router.push("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-sm border-0 p-4">
        <h2 className="fw-bold text-center mb-4">Login</h2>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-muted">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-primary fw-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
