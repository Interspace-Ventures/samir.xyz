// Version 7.0.0 - Absolute Minimal Page (HTML only)

export default function HomePage() {
  return (
    <div>
      <h1>Samir's Portfolio - Ultra Minimal Version</h1>
      <p>Hello! This is a minimal test page.</p>
      <p>Generated at: {new Date().toLocaleString()}</p>
      <p>
        <a href="/ultra-minimal">Ultra Minimal Test Page</a> | 
        <a href="/basic">Basic Test Page</a>
      </p>
    </div>
  );
}