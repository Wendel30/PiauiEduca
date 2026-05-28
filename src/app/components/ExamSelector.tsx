// Seletor de avaliações oficiais e simulados - PiauiEduca
import { ArrowLeft, GraduationCap, School, Award, FileText } from 'lucide-react';

interface ExamSelectorProps {
  onBack: () => void;
  onSelectExam: (exam: string) => void;
}

export function ExamSelector({ onBack, onSelectExam }: ExamSelectorProps) {
  const exams = [
    {
      id: 'saepi',
      name: 'SAEPI',
      description: 'Sistema de Avaliação Educacional do Piauí',
      icon: School,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'saeb',
      name: 'SAEB',
      description: 'Sistema de Avaliação da Educação Básica',
      icon: Award,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'enem',
      name: 'ENEM',
      description: 'Exame Nacional do Ensino Médio',
      icon: GraduationCap,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'redacao',
      name: 'Redação',
      description: 'Pratique redações dissertativas-argumentativas',
      icon: FileText,
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

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
          <h1 className="text-lg font-bold text-gray-900">Escolha a Avaliação</h1>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-6 space-y-3">
        {exams.map((exam) => {
          const Icon = exam.icon;
          return (
            <button
              key={exam.id}
              onClick={() => onSelectExam(exam.id)}
              className={`w-full bg-gradient-to-br ${exam.gradient} rounded-xl p-4 text-white shadow-md active:scale-95 transition-all text-left`}
            >
              <div className="flex items-start gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-0.5">{exam.name}</h3>
                  <p className="text-white/90 text-xs leading-relaxed">{exam.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
