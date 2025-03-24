export default function UltraMinimalPage() {
  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ultra Minimal Page</h1>
      <p className="mb-4">This is a stripped-down page with minimal components for debugging.</p>
      <div className="flex gap-4">
        <a href="/" className="text-purple-400 hover:underline">Home</a>
        <a href="/profile" className="text-purple-400 hover:underline">Profile</a>
        <a href="/portfolio" className="text-purple-400 hover:underline">Portfolio</a>
        <a href="/ventures" className="text-purple-400 hover:underline">Ventures</a>
      </div>
    </div>
  );
}