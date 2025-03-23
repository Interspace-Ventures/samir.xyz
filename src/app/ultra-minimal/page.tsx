// Version 10.0.0 - Static HTML Only Ultra Minimal Page - No Client JavaScript

export default function UltraMinimalPage() {
  // Pre-generate the date at build time for static HTML
  const generatedDate = new Date().toLocaleString();
  
  return (
    <div>
      <h1>Ultra Minimal Test Page</h1>
      <p>Hello! This is a minimal test page with no styling or JavaScript.</p>
      <p>Generated at: {generatedDate}</p>
      <a href="/">Back to Home</a>
    </div>
  );
}