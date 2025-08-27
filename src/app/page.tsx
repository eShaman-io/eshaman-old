export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Welcome to eShaman
      </h1>
      <p className="text-xl text-slate-300 mb-8">
        Spiritual AI for rituals, readings, and resonance.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold mb-3">Oracle</h3>
          <p className="text-slate-400 text-sm">
            Connect with spiritual guidance through AI-powered oracle readings.
          </p>
        </div>
        <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold mb-3">Rituals</h3>
          <p className="text-slate-400 text-sm">
            Discover and practice meaningful spiritual rituals tailored for you.
          </p>
        </div>
        <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold mb-3">Community</h3>
          <p className="text-slate-400 text-sm">
            Join others on their spiritual journey with shared wisdom.
          </p>
        </div>
      </div>
    </div>
  );
}