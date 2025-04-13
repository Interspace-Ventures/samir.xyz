import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Samir's Portfolio - Home" },
    { name: "description", content: "Welcome to Samir's professional portfolio showcasing expertise in finance and technology." },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Samir's Portfolio</h1>
      <p>Welcome to my professional portfolio showcasing my work and expertise.</p>
      
      <div>
        <h2>Featured Projects</h2>
        <div className="featured-grid">
          <div className="featured-item">
            <h3>Project One</h3>
            <p>Description of the first project and its key features.</p>
          </div>
          <div className="featured-item">
            <h3>Project Two</h3>
            <p>Description of the second project and its key features.</p>
          </div>
          <div className="featured-item">
            <h3>Project Three</h3>
            <p>Description of the third project and its key features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}