import { Trophy, ChevronRight } from 'lucide-react';

interface RankingPreviewProps {
  onViewRanking: () => void;
}

export function RankingPreview({ onViewRanking }: RankingPreviewProps) {
  // Top 3 para preview
  const top3 = [
    { name: 'Ana Silva', score: 487, avatar: '👩‍🎓', medal: '🏆' },
    { name: 'Carlos Santos', score: 465, avatar: '👨‍🎓', medal: '🥈' },
    { name: 'Maria Oliveira', score: 442, avatar: '👩‍🎓', medal: '🥉' }
  ];

  return (
    <div className="mb-4">
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Ranking</h2>
              <p className="text-xs text-gray-300">Top 3 estudantes</p>
            </div>
          </div>
          <button
            onClick={onViewRanking}
            className="bg-white/10 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold hover:bg-white/20 transition-all flex items-center gap-1"
          >
            Ver
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Top 3 Mini Cards */}
        <div className="space-y-1.5">
          {top3.map((user, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 hover:bg-white transition-all"
            >
              <div className="text-lg">{user.medal}</div>
              <div className="text-lg">{user.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-xs truncate">{user.name}</p>
                <p className="text-xs text-gray-600">{user.score} pts</p>
              </div>
              <div className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-bold">
                {index + 1}º
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
