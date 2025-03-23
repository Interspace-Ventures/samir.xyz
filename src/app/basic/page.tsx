// Version 6.0.0 - Pure Static HTML Test Page

export default function BasicPage() {
  // Generate server-side timestamp
  const serverTime = new Date().toLocaleString();
  
  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px",
      textAlign: "center"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#1e3a8a",
          marginBottom: "20px"
        }}>
          Ultra Basic Test Page
        </h1>
        
        <p style={{
          fontSize: "1.25rem",
          color: "#4b5563",
          marginBottom: "25px",
          lineHeight: "1.6"
        }}>
          This page contains only server-rendered HTML with no client-side JavaScript.
        </p>
        
        <div style={{
          padding: "15px",
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          borderLeft: "4px solid #3b82f6",
          marginBottom: "25px",
          textAlign: "left"
        }}>
          <p style={{ fontSize: "1.1rem", color: "#1e40af" }}>
            <strong>Server Information:</strong>
          </p>
          <p style={{ margin: "10px 0", fontSize: "1rem" }}>
            Page generated at: {serverTime}
          </p>
          <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            This timestamp was generated server-side and won't change without a page refresh.
          </p>
        </div>
      </div>
      
      <a 
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "500",
          fontSize: "1.1rem"
        }}
      >
        Return to Home Page
      </a>
      
      <div style={{
        marginTop: "40px",
        padding: "15px",
        backgroundColor: "#f8fafc",
        borderRadius: "6px",
        fontSize: "0.9rem",
        color: "#64748b"
      }}>
        <p>This page is a diagnostic test for Next.js with React 19.</p>
        <p>All rendering is done on the server with no client-side JavaScript.</p>
      </div>
    </div>
  );
}