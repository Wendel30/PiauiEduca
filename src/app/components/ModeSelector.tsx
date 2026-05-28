//Seletor de modo de estudo (Praticar, Simulado ou Revisar) - PiauiEduca+
import { ArrowLeft, Brain, Timer, TrendingUp } from 'lucide-react';

interface ModeSelectorProps {
  exam: string;
  subject: string;
  onBack: () => void;
  onSelectMode: (mode: string) => void;
}

export function ModeSelector({ exam, subject, onBack, onSelectMode }: ModeSelectorProps) {
  const isSaepiOrSaeb = exam === 'saepi' || exam === 'saeb';

  const modes = [
    {
      id: 'practice',
      name: 'Praticar',
      description: isSaepiOrSaeb ? 'Escolha Matemática ou Português' : 'Resolva questões no seu ritmo',
      icon: Brain,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'simulation',
      name: 'Simulado',
      description: isSaepiOrSaeb ? 'Matemática e Português juntos' : 'Teste seus conhecimentos com tempo',
      icon: Timer,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'review',
      name: 'Revisar',
      description: isSaepiOrSaeb ? 'Revise Matemática e Português' : 'Veja suas questões respondidas',
      icon: TrendingUp,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const subjectNames: Record<string, string> = {
    matematica: 'Matemática',
    portugues: 'Português',
    linguagens: 'Linguagens',
    humanas: 'Ciências Humanas',
    natureza: 'Ciências da Natureza'
  };

  const examNames: Record<string, string> = {
    saepi: 'SAEPI',
    saeb: 'SAEB',
    enem: 'ENEM'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 active:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Escolha o Modo</h1>
            <p className="text-xs text-gray-500">
              {isSaepiOrSaeb ? examNames[exam] : subjectNames[subject]}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-6 space-y-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`w-full bg-gradient-to-br ${mode.gradient} rounded-xl p-4 text-white shadow-md active:scale-95 transition-all text-left`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-0.5">{mode.name}</h3>
                  <p className="text-white/90 text-xs leading-relaxed">{mode.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
