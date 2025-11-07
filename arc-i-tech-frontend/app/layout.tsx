// src/app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Script from "next/script";
import { NavigationLogger } from './core/components/NavigationLogger';

export const metadata = {
  title: "Arc-i-Tech",
  description: "Arc-i-Tech | Next.js + Spring Boot platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-gramm="false" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
          <NavigationLogger />
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
