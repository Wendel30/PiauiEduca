import { useState } from 'react';
import { BookOpen, Trophy, Target, Calendar, User } from 'lucide-react';
import { RankingPreview } from './RankingPreview';
import { Perfil } from './Perfil';

interface HomeProps {
  onStart: () => void;
  onViewRanking: () => void;
  onViewCronograma: () => void;
  onLogout: () => void;
}

export function Home({ onStart, onViewRanking, onViewCronograma, onLogout }: HomeProps) {
  const [perfilOpen, setPerfilOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 px-4 py-8">
        {/* Header com ícone de perfil */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setPerfilOpen(true)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <User className="w-6 h-6 text-emerald-600" />
          </button>
        </div>

        <div className="w-full space-y-6">
          {/* Logo e Título */}
          <div className="text-center">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              PiauíEduca+
            </h1>
            <p className="text-emerald-100 text-base px-2">
              Prepare-se para SAEPI, SAEB e ENEM com questões e simulados completos
            </p>
          </div>
        </div>

        {/* Ranking Preview */}
        <RankingPreview onViewRanking={onViewRanking} />

        {/* Cards de funcionalidades */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={onViewCronograma}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white active:scale-95 transition-all"
          >
            <Calendar className="w-7 h-7 mx-auto mb-1 text-blue-300" />
            <p className="text-xs font-semibold">Cronograma</p>
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
            <Trophy className="w-7 h-7 mx-auto mb-1 text-yellow-300" />
            <p className="text-xs font-semibold">Simulados</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white">
            <BookOpen className="w-7 h-7 mx-auto mb-1 text-green-300" />
            <p className="text-xs font-semibold">Questões</p>
          </div>
          <button
            onClick={onViewRanking}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-white active:scale-95 transition-all"
          >
            <Target className="w-7 h-7 mx-auto mb-1 text-pink-300" />
            <p className="text-xs font-semibold">Ranking</p>
          </button>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-white text-emerald-700 font-bold py-3.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          Começar a Estudar
        </button>

        <p className="text-emerald-200 text-xs">
          Desenvolvido para estudantes do Piauí
        </p>
      </div>
    </div>

      {/* Perfil Lateral */}
      <Perfil
        isOpen={perfilOpen}
        onClose={() => setPerfilOpen(false)}
        onLogout={onLogout}
      />
    </>
  );
}
