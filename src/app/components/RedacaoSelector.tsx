// Componente de seleção de temas de redação - PiauiEduca+
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';

interface RedacaoSelectorProps {
  onBack: () => void;
  onSelectTema: (tema: string) => void;
}

export function RedacaoSelector({ onBack, onSelectTema }: RedacaoSelectorProps) {
  const temas = [
    {
      id: '1',
      titulo: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
      ano: '2022',
      tipo: 'ENEM'
    },
    {
      id: '2',
      titulo: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
      ano: '2021',
      tipo: 'ENEM'
    },
    {
      id: '3',
      titulo: 'O estigma associado às doenças mentais na sociedade brasileira',
      ano: '2020',
      tipo: 'ENEM'
    },
    {
      id: '4',
      titulo: 'A importância da leitura na formação do cidadão crítico',
      ano: '2024',
      tipo: 'Proposta Livre'
    },
    {
      id: '5',
      titulo: 'Tecnologia e educação: desafios e oportunidades no Brasil',
      ano: '2024',
      tipo: 'Proposta Livre'
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
          <div>
            <h1 className="text-lg font-bold text-gray-900">Escolha o Tema</h1>
            <p className="text-xs text-gray-500">Redação dissertativa-argumentativa</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-6 space-y-3">
        {temas.map((tema) => (
          <button
            key={tema.id}
            onClick={() => onSelectTema(tema.id)}
            className="w-full bg-white rounded-xl p-4 shadow-md active:scale-95 transition-all text-left border-2 border-gray-100 hover:border-emerald-200"
          >
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-lg flex-shrink-0">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm mb-1 leading-relaxed">
                  {tema.titulo}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                    {tema.tipo}
                  </span>
                  <span className="text-xs text-gray-500">
                    {tema.ano}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Escreva uma redação dissertativa-argumentativa de até 30 linhas sobre o tema escolhido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
