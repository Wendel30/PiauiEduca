import { ArrowLeft, BookOpen, Calculator, Globe, FlaskConical, Users, Lightbulb } from 'lucide-react';

interface SubjectSelectorProps {
  exam: string;
  onBack: () => void;
  onSelectSubject: (subject: string) => void;
}

export function SubjectSelector({ exam, onBack, onSelectSubject }: SubjectSelectorProps) {
  const saepiSaebSubjects = [
    { id: 'matematica', name: 'Matemática', icon: Calculator, color: 'bg-red-500' },
    { id: 'portugues', name: 'Português', icon: BookOpen, color: 'bg-blue-500' }
  ];

  const enemSubjects = [
    { id: 'linguagens', name: 'Linguagens', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'humanas', name: 'Ciências Humanas', icon: Users, color: 'bg-amber-600' },
    { id: 'natureza', name: 'Ciências da Natureza', icon: FlaskConical, color: 'bg-green-600' },
    { id: 'matematica', name: 'Matemática', icon: Calculator, color: 'bg-red-500' }
  ];

  const subjects = (exam === 'saepi' || exam === 'saeb')
    ? saepiSaebSubjects
    : enemSubjects;

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
            <h1 className="text-lg font-bold text-gray-900">Escolha a Disciplina</h1>
            <p className="text-xs text-gray-500">{examNames[exam]}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className={`${subject.color} rounded-xl p-4 text-white shadow-md active:scale-95 transition-all`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold text-center text-sm">{subject.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
