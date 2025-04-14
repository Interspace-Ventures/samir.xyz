// A completely minimal page with no dependencies
export default function BasicDiagnosticPage() {
  return (
    <html>
      <head>
        <title>Basic Diagnostic Page</title>
      </head>
      <body>
        <h1>Server is working!</h1>
        <p>This page has no dependencies and should always render.</p>
        <p>Current time: {new Date().toISOString()}</p>
      </body>
    </html>
  );
}