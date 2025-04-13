export default function Portfolio() {
  return (
    <main>
      <div className="container">
        <h1>Portfolio</h1>
        <p>Here are some of my recent projects.</p>
        
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
          <div className="card">
            <h3>Project 4</h3>
            <p>Description of the project</p>
          </div>
        </div>
      </div>
    </main>
  );
}