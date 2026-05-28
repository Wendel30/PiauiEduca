import { useState } from 'react';
import { ArrowLeft, FileText, Send, Info } from 'lucide-react';

interface RedacaoEditorProps {
  temaId: string;
  onBack: () => void;
  onSubmit: (texto: string) => void;
}

export function RedacaoEditor({ temaId, onBack, onSubmit }: RedacaoEditorProps) {
  const [texto, setTexto] = useState('');

  const temas: Record<string, string> = {
    '1': 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    '2': 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    '3': 'O estigma associado às doenças mentais na sociedade brasileira',
    '4': 'A importância da leitura na formação do cidadão crítico',
    '5': 'Tecnologia e educação: desafios e oportunidades no Brasil'
  };

  const tema = temas[temaId] || '';

  // Conta linhas (quebras de linha + 1)
  const linhas = texto.split('\n').length;
  const maxLinhas = 30;
  const palavras = texto.trim().split(/\s+/).filter(word => word.length > 0).length;

  const handleSubmit = () => {
    if (texto.trim().length > 0) {
      onSubmit(texto);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 active:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900">Redação</h1>
            <p className="text-xs text-gray-500 truncate">Tema selecionado</p>
          </div>
        </div>
      </div>

      {/* Tema */}
      <div className="px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-emerald-600 font-semibold mb-0.5">TEMA</p>
              <p className="text-xs font-bold text-gray-900 leading-relaxed">{tema}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 px-4 py-3 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden flex-1 flex flex-col min-h-0">
          {/* Info bar */}
          <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Linhas:</span>
                <span className={`text-xs font-bold ${linhas > maxLinhas ? 'text-red-600' : 'text-emerald-600'}`}>
                  {linhas}/{maxLinhas}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Palavras:</span>
                <span className="text-xs font-bold text-gray-700">{palavras}</span>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Comece a escrever sua redação aqui..."
            className="flex-1 p-3 text-sm leading-relaxed resize-none focus:outline-none min-h-0"
            style={{
              fontFamily: 'inherit',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>

      {/* Botão */}
      <div className="px-4 pb-3 pt-2 flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={texto.trim().length === 0}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
            texto.trim().length === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-emerald-700 active:scale-95 shadow-md'
          }`}
        >
          <Send className="w-4 h-4" />
          Enviar para Correção
        </button>
      </div>
    </div>
  );
}
