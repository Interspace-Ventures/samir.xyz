// Simple home page component
export default function HomePage() {
  return (
    <div>
      <h1>Samir's Portfolio</h1>
      <p>Welcome to my professional portfolio showcasing my work and expertise.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
            <h3>Project One</h3>
            <p>Description of the first project and its key features.</p>
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
            <h3>Project Two</h3>
            <p>Description of the second project and its key features.</p>
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.5rem' }}>
            <h3>Project Three</h3>
            <p>Description of the third project and its key features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}