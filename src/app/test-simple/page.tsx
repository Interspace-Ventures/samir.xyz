// Version 10.0.0 - Static HTML Only Test Page - No Client JavaScript
export default function SimpleTestPage() {
  // Pre-generate the date at build time for static HTML
  const currentDate = new Date().toLocaleString();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ color: "#333" }}>Simple Test Page</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>This is a static HTML page built at compile time with no client-side JavaScript.</p>
      <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "4px", marginBlock: "1rem" }}>
        Static Build Date: {currentDate}
      </div>
      <a href="/" style={{ display: "inline-block", padding: "0.5rem 1rem", backgroundColor: "#4F46E5", color: "white", textDecoration: "none", borderRadius: "4px" }}>
        Back to Home
      </a>
    </div>
  );
}