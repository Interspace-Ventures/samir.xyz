export default function Home() {
  return (
    <main>
      <div className="container">
        <section className="hero">
          <h1>Welcome to My Portfolio</h1>
          <p>
            I'm a developer passionate about creating beautiful and functional web experiences.
          </p>
        </section>

        <section>
          <h2>Featured Projects</h2>
          <div className="grid">
            <div className="card">
              <h3>Project 1</h3>
              <p>Description of the project</p>
            </div>
            <div className="card">
              <h3>Project 2</h3>
              <p>Description of the project</p>
            </div>
            <div className="card">
              <h3>Project 3</h3>
              <p>Description of the project</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}