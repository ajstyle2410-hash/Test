// src/app/auth/layout.tsx
export const metadata = {
  title: "Authentication - Arc-i-Tech",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
