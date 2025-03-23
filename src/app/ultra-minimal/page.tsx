// Version 7.0.0 - Absolute Minimal Page (HTML only)

export default function UltraMinimalPage() {
  return (
    <div>
      <h1>Ultra Minimal Test Page</h1>
      <p>Hello! This is a minimal test page with no styling or JavaScript.</p>
      <p>Generated at: {new Date().toLocaleString()}</p>
      <a href="/">Back to Home</a>
    </div>
  );
}