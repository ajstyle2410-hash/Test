export default function UnauthorizedPage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger fw-bold">403 - Forbidden</h1>
      <p className="text-muted">You don’t have permission to view this page.</p>
      <a href="/" className="btn btn-primary mt-3">Back Home</a>
    </div>
  );
}
