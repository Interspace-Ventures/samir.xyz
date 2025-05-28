export default function LaunchingSoon() {
  return (
    <div className="pt-16 pb-8 bg-[#2d0c6a]">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white">Launching Soon</h1>
          </div>
          <p className="text-lg text-text-tertiary mb-10 max-w-3xl">
            Something exciting is coming. We're putting the finishing touches on this venture.
          </p>
          <a
            href="/ventures"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-medium transition-colors duration-200"
          >
            ← Back to Ventures
          </a>
        </div>
      </section>
    </div>
  );
}