export default function NotFoundPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-warning fw-bold">404 - Not Found</h1>
      <p className="text-muted">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="btn btn-secondary mt-3">Back to Home</a>
    </div>
  );
}
