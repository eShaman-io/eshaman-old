export default function RitualsPage() {
  const rituals = [
    {
      title: "Morning Gratitude",
      description: "Start your day with intention and appreciation",
      duration: "10 minutes",
      difficulty: "Beginner"
    },
    {
      title: "New Moon Manifestation",
      description: "Harness lunar energy for new beginnings",
      duration: "30 minutes", 
      difficulty: "Intermediate"
    },
    {
      title: "Chakra Alignment",
      description: "Balance your energy centers for harmony",
      duration: "45 minutes",
      difficulty: "Advanced"
    },
    {
      title: "Protection Blessing",
      description: "Create a shield of positive energy around you",
      duration: "20 minutes",
      difficulty: "Beginner"
    },
    {
      title: "Ancestral Connection",
      description: "Connect with the wisdom of those who came before",
      duration: "40 minutes",
      difficulty: "Advanced"
    },
    {
      title: "Elemental Meditation",
      description: "Work with earth, air, fire, and water energies",
      duration: "25 minutes",
      difficulty: "Intermediate"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-300";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-300";
      case "Advanced": return "bg-red-500/20 text-red-300";
      default: return "bg-slate-500/20 text-slate-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sacred Rituals</h1>
      <p className="text-slate-300 mb-8">
        Discover meaningful practices to deepen your spiritual connection and personal growth.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual, i) => (
          <div key={i} className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all cursor-pointer">
            <h3 className="text-lg font-semibold mb-3">{ritual.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{ritual.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">⏱ {ritual.duration}</span>
              <span className={`px-2 py-1 rounded-full ${getDifficultyColor(ritual.difficulty)}`}>
                {ritual.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-purple-500/10 ring-1 ring-purple-400/30">
        <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
        <p className="text-slate-300 text-sm">
          Interactive guided rituals, customizable practices, and community sharing features are in development. 
          Stay tuned for deeper spiritual experiences!
        </p>
      </div>
    </div>
  );
}