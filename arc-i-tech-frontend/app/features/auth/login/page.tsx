'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/core/auth/auth.service";
import Alert from "@/app/shared/components/Alert";
import LoadingSpinner from "@/app/shared/components/LoadingSpinner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await AuthService.login(email, password);
      router.push("/features/dashboard"); // redirect after login
    } catch (err: any) {
      setError(err || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: 400 }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>

        {error && <Alert type="danger" message={error} />}
        {loading && <LoadingSpinner message="Authenticating..." />}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0">
          Don’t have an account? <a href="/auth/register">Register</a>
        </p>
      </div>
    </div>
  );
}
