// src/app/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-light text-dark text-center text-md-start py-5">
        <div className="container d-flex flex-column flex-md-row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="fw-bold display-5">
              Welcome to <span className="text-primary">Arc-i-Tech</span>
            </h1>
            <p className="lead mt-3 text-muted">
              We specialize in software development, consulting, and mentoring.  
              Explore our projects, internships, and technical programs built for innovators.
            </p>
            <div className="mt-4">
              <Link href="/auth/register" className="btn btn-primary btn-lg me-3">
                Get Started
              </Link>
              <Link href="/projects" className="btn btn-outline-dark btn-lg">
                View Projects
              </Link>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <Image
              src="/tech-team.svg"
              alt="Tech illustration"
              width={450}
              height={350}
              className="img-fluid"
              priority
            />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <i className="bi bi-code-slash text-primary display-4 mb-3"></i>
                <h5 className="fw-semibold">Software Development</h5>
                <p className="text-muted">
                  Web, desktop, and Android app solutions with modern frameworks and scalable design.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <i className="bi bi-person-video3 text-primary display-4 mb-3"></i>
                <h5 className="fw-semibold">Project Mentorship</h5>
                <p className="text-muted">
                  Guidance for engineering and final-year students to build real-world software projects.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <i className="bi bi-briefcase text-primary display-4 mb-3"></i>
                <h5 className="fw-semibold">Career & Internship</h5>
                <p className="text-muted">
                  Mock interviews, technical guidance, and internships to prepare you for the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h3 className="fw-bold mb-3">Ready to Collaborate?</h3>
          <p className="lead mb-4">
            Join Arc-i-Tech and bring your ideas to life with expert mentorship and engineering support.
          </p>
          <Link href="/auth/login" className="btn btn-light btn-lg">
            Login Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light py-4">
        <div className="container text-center">
          <p className="mb-1">
            © {new Date().getFullYear()} Arc-i-Tech. All Rights Reserved.
          </p>
          <p className="mb-0 small">
            Made with ❤️ using Next.js & Spring Boot
          </p>
        </div>
      </footer>
    </>
  );
}
