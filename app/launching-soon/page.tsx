export default function LaunchingSoon() {
  return (
    <div className="pt-16 pb-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Launching Soon
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Something exciting is coming. We're putting the finishing touches on this venture.
        </p>
        <a
          href="/ventures"
          className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-medium transition-colors duration-200"
        >
          ← Back to Ventures
        </a>
      </div>
    </div>
  );
}