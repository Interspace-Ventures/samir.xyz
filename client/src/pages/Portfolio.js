const Portfolio = () => {
  return (
    <section id="portfolio" className="mb-20">
      <h2 className="text-3xl font-bold mb-6">Portfolio</h2>
      <p className="mb-8">I advise and invest in ambitious teams building innovative products who focus on unit economics optimized business models.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 border rounded">
          <img src="/assets/afar.png" alt="AFAR" className="w-32 mx-auto mb-4" />
        </div>
        <div className="p-4 border rounded">
          <img src="/assets/aon3d.png" alt="AON3D" className="w-32 mx-auto mb-4" />
        </div>
        <div className="p-4 border rounded">
          <img src="/assets/aura.png" alt="AURA" className="w-32 mx-auto mb-4" />
        </div>
        <div className="p-4 border rounded">
          <img src="/assets/backpack.png" alt="Backpack" className="w-32 mx-auto mb-4" />
        </div>
        <div className="p-4 border rounded">
          <img src="/assets/caliber.png" alt="CALIBER" className="w-32 mx-auto mb-4" />
        </div>
        <div className="p-4 border rounded">
          <img src="/assets/gem.png" alt="GEM" className="w-32 mx-auto mb-4" />
        </div>
      </div>
    </section>
  );
}
