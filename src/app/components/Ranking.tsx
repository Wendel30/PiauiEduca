// Componente de exibição do ranking dos estudantes - PiauiEduca+
import { Trophy, Award, Star, TrendingUp, ArrowLeft } from 'lucide-react';

interface RankingUser {
  id: number;
  name: string;
  questionsCorrect: number;
  trophies: number;
  avatar: string;
  position: number;
}

interface RankingProps {
  onClose?: () => void;
}

export function Ranking({ onClose }: RankingProps) {
  // Dados mockados para demonstração
  const rankingData: RankingUser[] = [
    { id: 1, name: 'Ana Silva', questionsCorrect: 487, trophies: 12, avatar: '👩‍🎓', position: 1 },
    { id: 2, name: 'Carlos Santos', questionsCorrect: 465, trophies: 10, avatar: '👨‍🎓', position: 2 },
    { id: 3, name: 'Maria Oliveira', questionsCorrect: 442, trophies: 9, avatar: '👩‍🎓', position: 3 },
    { id: 4, name: 'João Pereira', questionsCorrect: 398, trophies: 7, avatar: '👨‍🎓', position: 4 },
    { id: 5, name: 'Beatriz Costa', questionsCorrect: 376, trophies: 6, avatar: '👩‍🎓', position: 5 },
    { id: 6, name: 'Pedro Lima', questionsCorrect: 354, trophies: 5, avatar: '👨‍🎓', position: 6 },
    { id: 7, name: 'Julia Rodrigues', questionsCorrect: 332, trophies: 5, avatar: '👩‍🎓', position: 7 },
    { id: 8, name: 'Lucas Alves', questionsCorrect: 310, trophies: 4, avatar: '👨‍🎓', position: 8 }
  ];

  const top3 = rankingData.slice(0, 3);
  const others = rankingData.slice(3);

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-emerald-500 to-emerald-600';
    }
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return position;
    }
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (position === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 pt-8 pb-24 px-4 relative">
        {/* Botão Voltar */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}

        <div className="text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
            <Trophy className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Ranking Geral</h1>
          <p className="text-emerald-100 text-sm">Compete e conquiste troféus!</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-4 -mt-16 mb-6">
        <div className="flex items-end justify-center gap-2">
          {/* 2º Lugar */}
          <div className="flex-1 max-w-[110px]">
            <div className="bg-white rounded-2xl shadow-lg p-3 text-center transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">{top3[1]?.avatar}</div>
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mb-2 shadow-md">
                <span className="text-2xl">🥈</span>
              </div>
              <p className="font-bold text-gray-900 text-sm truncate">{top3[1]?.name}</p>
              <p className="text-xs text-gray-500 mb-2">{top3[1]?.questionsCorrect} acertos</p>
              <div className="flex items-center justify-center gap-1 text-yellow-600">
                <Trophy className="w-3 h-3" />
                <span className="text-xs font-semibold">{top3[1]?.trophies}</span>
              </div>
            </div>
          </div>

          {/* 1º Lugar */}
          <div className="flex-1 max-w-[130px]">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-4 text-center transform scale-110 hover:scale-115 transition-all">
              <div className="text-5xl mb-2">{top3[0]?.avatar}</div>
              <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                <span className="text-3xl">🏆</span>
              </div>
              <p className="font-bold text-white text-sm truncate">{top3[0]?.name}</p>
              <p className="text-xs text-yellow-100 mb-2">{top3[0]?.questionsCorrect} acertos</p>
              <div className="flex items-center justify-center gap-1 text-white bg-white/20 rounded-full px-2 py-1">
                <Trophy className="w-3 h-3" />
                <span className="text-xs font-bold">{top3[0]?.trophies}</span>
              </div>
            </div>
          </div>

          {/* 3º Lugar */}
          <div className="flex-1 max-w-[110px]">
            <div className="bg-white rounded-2xl shadow-lg p-3 text-center transform hover:scale-105 transition-all">
              <div className="text-4xl mb-2">{top3[2]?.avatar}</div>
              <div className="w-10 h-10 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-2 shadow-md">
                <span className="text-2xl">🥉</span>
              </div>
              <p className="font-bold text-gray-900 text-sm truncate">{top3[2]?.name}</p>
              <p className="text-xs text-gray-500 mb-2">{top3[2]?.questionsCorrect} acertos</p>
              <div className="flex items-center justify-center gap-1 text-yellow-600">
                <Trophy className="w-3 h-3" />
                <span className="text-xs font-semibold">{top3[2]?.trophies}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demais Posições */}
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Demais Posições
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {others.map((user) => (
              <div
                key={user.id}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                {/* Posição */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${getPositionBadge(user.position)}`}>
                  {user.position}º
                </div>

                {/* Avatar */}
                <div className="text-3xl flex-shrink-0">
                  {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.questionsCorrect} questões corretas</p>
                </div>

                {/* Troféus */}
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full flex-shrink-0">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">{user.trophies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">Como funciona?</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Quanto mais questões você acertar, mais você sobe no ranking!
                Complete simulados e ganhe troféus para se destacar entre os melhores estudantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
