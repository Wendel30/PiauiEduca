// Componente de exibição da correção de redações - PiauiEduca+
import { Trophy, CheckCircle, AlertCircle, TrendingUp, Home, RotateCcw } from 'lucide-react';

interface RedacaoCorrecaoProps {
  texto: string;
  onHome: () => void;
  onNovaRedacao: () => void;
}

export function RedacaoCorrecao({ texto, onHome, onNovaRedacao }: RedacaoCorrecaoProps) {
  // Análise do texto
  const palavras = texto.trim().split(/\s+/).filter(word => word.length > 0).length;
  const linhas = texto.split('\n').filter(l => l.trim().length > 0).length;
  const paragrafos = texto.split('\n\n').filter(p => p.trim().length > 0).length;

  // Conectivos comuns
  const conectivos = ['portanto', 'assim', 'logo', 'contudo', 'todavia', 'entretanto', 'porém', 'mas',
                      'ademais', 'além disso', 'outrossim', 'dessa forma', 'desse modo', 'por conseguinte',
                      'consequentemente', 'por isso', 'isto é', 'ou seja', 'porque', 'pois'];

  const textoLower = texto.toLowerCase();
  const temConectivos = conectivos.filter(c => textoLower.includes(c)).length;

  // Palavras que indicam proposta de intervenção
  const palavrasIntervencao = ['governo', 'estado', 'sociedade', 'escola', 'família', 'mídia',
                               'educação', 'política', 'projeto', 'programa', 'campanha',
                               'investimento', 'ação', 'medida', 'iniciativa'];
  const temIntervencao = palavrasIntervencao.filter(p => textoLower.includes(p)).length;

  // Função para calcular nota baseada em critérios
  const calcularNota = (criterio: string): number => {
    let nota = 0;

    switch(criterio) {
      case 'norma':
        // Competência 1: baseado no tamanho e estrutura
        if (palavras < 100) nota = 80;
        else if (palavras < 200) nota = 120;
        else if (palavras < 300) nota = 160;
        else if (palavras < 400) nota = 180;
        else nota = 200;

        // Penaliza textos muito curtos
        if (linhas < 10) nota = Math.max(40, nota - 60);
        break;

      case 'tema':
        // Competência 2: baseado no desenvolvimento
        if (palavras < 150) nota = 80;
        else if (palavras < 250) nota = 140;
        else if (palavras < 350) nota = 180;
        else nota = 200;

        if (paragrafos < 3) nota = Math.max(80, nota - 40);
        break;

      case 'argumentacao':
        // Competência 3: baseado na presença de conectivos e desenvolvimento
        const baseNota = palavras < 200 ? 100 : palavras < 300 ? 140 : 180;
        nota = baseNota;

        if (temConectivos >= 5) nota += 20;
        else if (temConectivos >= 3) nota += 10;

        if (paragrafos >= 4) nota += 10;

        nota = Math.min(200, nota);
        break;

      case 'coesao':
        // Competência 4: baseado nos conectivos
        if (temConectivos < 2) nota = 80;
        else if (temConectivos < 4) nota = 120;
        else if (temConectivos < 6) nota = 160;
        else if (temConectivos < 8) nota = 180;
        else nota = 200;

        if (paragrafos < 3) nota = Math.max(80, nota - 40);
        break;

      case 'intervencao':
        // Competência 5: baseado em palavras de intervenção
        if (temIntervencao < 2) nota = 80;
        else if (temIntervencao < 4) nota = 120;
        else if (temIntervencao < 6) nota = 160;
        else if (temIntervencao < 8) nota = 180;
        else nota = 200;

        // Penaliza muito se o texto for curto
        if (palavras < 200) nota = Math.max(80, nota - 40);
        break;
    }

    return nota;
  };

  // Gerar feedback baseado na nota
  const gerarFeedback = (competencia: number, nota: number): string => {
    const feedbacks: Record<number, Record<string, string>> = {
      1: {
        'baixo': 'Texto apresenta muitos desvios gramaticais. Revise regras de concordância, regência e pontuação.',
        'medio': 'Apresenta alguns desvios da norma padrão. Atenção à pontuação e concordância.',
        'bom': 'Bom domínio da norma culta com poucos desvios gramaticais.',
        'excelente': 'Excelente domínio da modalidade escrita formal da língua portuguesa.'
      },
      2: {
        'baixo': 'Texto tangencia o tema ou apresenta compreensão superficial. Desenvolva mais o assunto proposto.',
        'medio': 'Compreende o tema mas pode desenvolver mais os aspectos solicitados.',
        'bom': 'Boa compreensão e desenvolvimento do tema proposto.',
        'excelente': 'Excelente compreensão do tema com repertório sociocultural produtivo.'
      },
      3: {
        'baixo': 'Argumentação frágil ou ausente. Desenvolva melhor seus argumentos com exemplos e fundamentos.',
        'medio': 'Argumentos presentes mas podem ser mais aprofundados e fundamentados.',
        'bom': 'Argumentos consistentes, mas pode aprofundar mais os exemplos.',
        'excelente': 'Argumentação bem desenvolvida com repertório pertinente e autoria.'
      },
      4: {
        'baixo': 'Problemas frequentes de coesão. Use mais conectivos e organize melhor as ideias.',
        'medio': 'Apresenta articulação básica entre ideias. Varie mais os recursos coesivos.',
        'bom': 'Boa articulação entre parágrafos e ideias bem conectadas.',
        'excelente': 'Excelente articulação de ideias com repertório diversificado de recursos coesivos.'
      },
      5: {
        'baixo': 'Proposta de intervenção ausente ou muito genérica. Apresente ações específicas com agentes e meios.',
        'medio': 'Proposta presente mas incompleta. Especifique mais os agentes, ações, meios e efeitos.',
        'bom': 'Proposta presente e detalhada, mas pode especificar mais os agentes.',
        'excelente': 'Proposta completa e detalhada com agente, ação, meio, finalidade e detalhamento.'
      }
    };

    let nivel = 'baixo';
    if (nota >= 180) nivel = 'excelente';
    else if (nota >= 140) nivel = 'bom';
    else if (nota >= 100) nivel = 'medio';

    return feedbacks[competencia][nivel];
  };

  const competencias = [
    {
      id: 1,
      nome: 'Domínio da norma padrão',
      nota: calcularNota('norma'),
      feedback: ''
    },
    {
      id: 2,
      nome: 'Compreensão do tema',
      nota: calcularNota('tema'),
      feedback: ''
    },
    {
      id: 3,
      nome: 'Argumentação',
      nota: calcularNota('argumentacao'),
      feedback: ''
    },
    {
      id: 4,
      nome: 'Coesão e coerência',
      nota: calcularNota('coesao'),
      feedback: ''
    },
    {
      id: 5,
      nome: 'Proposta de intervenção',
      nota: calcularNota('intervencao'),
      feedback: ''
    }
  ].map(comp => ({
    ...comp,
    feedback: gerarFeedback(comp.id, comp.nota)
  }));

  const notaTotal = competencias.reduce((sum, comp) => sum + comp.nota, 0);
  const percentual = Math.round((notaTotal / 1000) * 100);

  const getNotaColor = (nota: number) => {
    if (nota >= 900) return 'text-green-600';
    if (nota >= 700) return 'text-blue-600';
    if (nota >= 500) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getMensagem = () => {
    if (notaTotal >= 900) return { texto: 'Excelente!', emoji: '🏆', color: 'text-green-600' };
    if (notaTotal >= 700) return { texto: 'Muito Bom!', emoji: '👏', color: 'text-blue-600' };
    if (notaTotal >= 500) return { texto: 'Bom trabalho!', emoji: '👍', color: 'text-yellow-600' };
    return { texto: 'Continue praticando!', emoji: '💪', color: 'text-orange-600' };
  };

  const mensagem = getMensagem();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{mensagem.emoji}</div>
          <h1 className={`text-3xl font-bold mb-1 ${mensagem.color} drop-shadow-lg`}>
            {mensagem.texto}
          </h1>
          <p className="text-white text-base">Correção da redação</p>
        </div>

        {/* Nota Total */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-3">
              <span className="text-4xl font-bold text-white">{notaTotal}</span>
            </div>
            <p className="text-gray-600 font-semibold text-sm">Nota Total (de 1000)</p>
            <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all"
                style={{ width: `${percentual}%` }}
              />
            </div>
          </div>

          {/* Competências */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Avaliação por Competência
            </h3>
            {competencias.map((comp) => (
              <div key={comp.id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {comp.id}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{comp.nome}</span>
                  </div>
                  <span className={`text-sm font-bold ${getNotaColor(comp.nota)}`}>
                    {comp.nota}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-8">
                  {comp.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sugestões Dinâmicas */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-sm mb-2">Dicas para melhorar</h3>
              <ul className="text-xs text-blue-700 leading-relaxed space-y-1">
                {palavras < 300 && <li>• Desenvolva mais o texto - escreva entre 25-30 linhas (300-350 palavras)</li>}
                {temConectivos < 5 && <li>• Use mais conectivos para articular melhor as ideias (portanto, ademais, todavia, etc.)</li>}
                {paragrafos < 4 && <li>• Organize o texto em 4-5 parágrafos (introdução, 2-3 desenvolvimentos, conclusão)</li>}
                {temIntervencao < 4 && <li>• Especifique melhor a proposta: quem vai fazer? como? para quê?</li>}
                {competencias[0].nota < 160 && <li>• Revise aspectos de concordância, regência e pontuação</li>}
                {notaTotal >= 800 && <li>• Excelente trabalho! Continue praticando para manter o padrão</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="space-y-2.5">
          <button
            onClick={onNovaRedacao}
            className="w-full bg-white text-emerald-700 font-bold py-3.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Escrever Outra Redação
          </button>

          <button
            onClick={onHome}
            className="w-full bg-white/10 backdrop-blur-sm text-white font-bold py-3.5 px-6 rounded-xl border-2 border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
