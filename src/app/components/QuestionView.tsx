// Componente de gerenciamento e exibição do fluxo de questões - PiauiEduca+
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
}

interface QuestionViewProps {
  exam: string;
  subject: string;
  mode: string;
  onBack: () => void;
  onFinish: (stats: { correct: number; total: number; timeSpent: number; questions: Question[]; userAnswers: UserAnswer[] }) => void;
}

export function QuestionView({ exam, subject, mode, onBack, onFinish }: QuestionViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const allQuestions: Record<string, Question[]> = {
    matematica: [
      {
        id: 1,
        text: 'Qual é o resultado de 2 + 2 × 3?',
        options: ['10', '8', '12', '6'],
        correctAnswer: 1,
        explanation: 'Seguindo a ordem das operações matemáticas, multiplicação vem antes da adição. Então: 2 × 3 = 6, depois 2 + 6 = 8.',
        difficulty: 'easy'
      },
      {
        id: 2,
        text: 'Se x + 5 = 12, qual é o valor de x?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2,
        explanation: 'Para resolver, subtraímos 5 de ambos os lados: x = 12 - 5 = 7.',
        difficulty: 'easy'
      },
      {
        id: 3,
        text: 'Qual é a área de um retângulo com base 8 cm e altura 5 cm?',
        options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
        correctAnswer: 2,
        explanation: 'A área do retângulo é calculada multiplicando base × altura: 8 × 5 = 40 cm².',
        difficulty: 'medium'
      },
      {
        id: 4,
        text: 'Uma função é definida por f(x) = 2x + 3. Qual é o valor de f(5)?',
        options: ['8', '10', '13', '15'],
        correctAnswer: 2,
        explanation: 'Substituindo x por 5 na função: f(5) = 2(5) + 3 = 10 + 3 = 13.',
        difficulty: 'medium'
      },
      {
        id: 22,
        text: 'Qual é o valor de 15% de 200?',
        options: ['15', '25', '30', '35'],
        correctAnswer: 2,
        explanation: 'Para calcular 15% de 200: (15/100) × 200 = 0,15 × 200 = 30.',
        difficulty: 'easy'
      },
      {
        id: 23,
        text: 'Em um triângulo retângulo, se os catetos medem 3 cm e 4 cm, quanto mede a hipotenusa?',
        options: ['5 cm', '6 cm', '7 cm', '8 cm'],
        correctAnswer: 0,
        explanation: 'Usando o Teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, então h = 5 cm.',
        difficulty: 'medium'
      },
      {
        id: 24,
        text: 'Quantos minutos há em 2,5 horas?',
        options: ['120 minutos', '130 minutos', '140 minutos', '150 minutos'],
        correctAnswer: 3,
        explanation: '2,5 horas = 2 horas e meia. 2 horas = 120 min + 30 min = 150 minutos.',
        difficulty: 'easy'
      }
    ],
    portugues: [
      {
        id: 5,
        text: 'Qual das alternativas apresenta um exemplo de oração subordinada substantiva?',
        options: [
          'Espero que você venha à festa.',
          'Quando cheguei, todos já tinham saído.',
          'Estudei muito, mas não passei.',
          'O livro que comprei é muito bom.'
        ],
        correctAnswer: 0,
        explanation: 'A oração "que você venha à festa" funciona como objeto direto do verbo "esperar", sendo classificada como subordinada substantiva objetiva direta.',
        difficulty: 'medium'
      },
      {
        id: 6,
        text: 'Qual é a função sintática do termo destacado: "O menino comprou FLORES"?',
        options: ['Sujeito', 'Predicado', 'Objeto direto', 'Objeto indireto'],
        correctAnswer: 2,
        explanation: 'FLORES é o objeto direto do verbo "comprou", pois completa o sentido do verbo sem preposição.',
        difficulty: 'easy'
      },
      {
        id: 7,
        text: 'Identifique a figura de linguagem: "A cidade é um formigueiro humano."',
        options: ['Metáfora', 'Metonímia', 'Hipérbole', 'Prosopopeia'],
        correctAnswer: 0,
        explanation: 'Trata-se de uma metáfora, pois compara implicitamente a cidade a um formigueiro, sugerindo movimento e agitação.',
        difficulty: 'medium'
      },
      {
        id: 25,
        text: 'Qual é o plural correto da palavra "chapéu"?',
        options: ['chapéis', 'chapéus', 'chapéues', 'chapéu'],
        correctAnswer: 1,
        explanation: 'Palavras terminadas em "éu" fazem o plural com "éus": chapéu → chapéus.',
        difficulty: 'easy'
      },
      {
        id: 26,
        text: 'Em qual alternativa a palavra "manga" tem significado diferente das outras?',
        options: [
          'A manga da camisa está suja.',
          'Comprei mangas no mercado.',
          'A manga desta fruta está madura.',
          'Gosto de suco de manga.'
        ],
        correctAnswer: 0,
        explanation: 'Na primeira frase, "manga" significa parte da roupa. Nas outras, refere-se à fruta. Isso é um exemplo de polissemia.',
        difficulty: 'medium'
      },
      {
        id: 27,
        text: 'Qual palavra completa corretamente a frase: "Ela _____ na reunião ontem."?',
        options: ['esteve', 'estava', 'estará', 'estaria'],
        correctAnswer: 0,
        explanation: 'O pretérito perfeito "esteve" indica uma ação concluída no passado ("ontem").',
        difficulty: 'easy'
      },
      {
        id: 28,
        text: 'Qual das frases está escrita de acordo com a norma padrão?',
        options: [
          'Nós vai ao cinema amanhã.',
          'Nós vamos ao cinema amanhã.',
          'Nós vamo ao cinema amanhã.',
          'Nós vão ao cinema amanhã.'
        ],
        correctAnswer: 1,
        explanation: 'A concordância verbal correta com "nós" é "vamos": nós vamos.',
        difficulty: 'easy'
      }
    ],
    linguagens: [
      {
        id: 8,
        text: 'Um texto publicitário utiliza a frase: "Não perca tempo, compre já!". O emprego do modo imperativo nesse contexto tem como principal função:',
        options: [
          'Informar o leitor sobre características do produto.',
          'Persuadir o consumidor a realizar uma ação imediata.',
          'Descrever objetivamente as qualidades do produto.',
          'Narrar experiências de outros consumidores.'
        ],
        correctAnswer: 1,
        explanation: 'O modo imperativo ("compre") é utilizado para dar ordens ou fazer pedidos, sendo uma estratégia persuasiva comum em textos publicitários para incentivar a compra imediata.',
        difficulty: 'medium'
      },
      {
        id: 9,
        text: 'A expressão "fake news" foi incorporada ao vocabulário brasileiro, mantendo sua forma em inglês. Esse fenômeno linguístico é chamado de:',
        options: [
          'Neologismo por derivação',
          'Estrangeirismo',
          'Arcaísmo',
          'Regionalismo'
        ],
        correctAnswer: 1,
        explanation: 'Estrangeirismo é o emprego de palavras ou expressões estrangeiras em outro idioma. "Fake news" é um exemplo de estrangeirismo do inglês incorporado ao português.',
        difficulty: 'medium'
      },
      {
        id: 10,
        text: 'No texto "O vento sussurrava segredos entre as árvores", a figura de linguagem presente é:',
        options: [
          'Metáfora',
          'Hipérbole',
          'Personificação',
          'Comparação'
        ],
        correctAnswer: 2,
        explanation: 'A personificação (ou prosopopeia) atribui características humanas a seres inanimados. No texto, o vento "sussurra", ação própria de seres humanos.',
        difficulty: 'medium'
      },
      {
        id: 11,
        text: 'Machado de Assis, em "Dom Casmurro", utiliza um narrador em primeira pessoa que conta sua versão dos fatos. Esse recurso narrativo permite ao autor:',
        options: [
          'Apresentar uma verdade absoluta sobre os acontecimentos.',
          'Criar ambiguidade sobre a veracidade dos fatos narrados.',
          'Eliminar qualquer dúvida sobre a traição de Capitu.',
          'Garantir objetividade total na narrativa.'
        ],
        correctAnswer: 1,
        explanation: 'O narrador em primeira pessoa (Bentinho) apresenta sua visão subjetiva, criando ambiguidade. O leitor nunca sabe se Capitu realmente traiu, pois só conhece a versão de Bentinho.',
        difficulty: 'hard'
      },
      {
        id: 12,
        text: 'O movimento Tropicalista, liderado por artistas como Caetano Veloso e Gilberto Gil, caracterizou-se por:',
        options: [
          'Rejeitar totalmente influências estrangeiras na cultura brasileira.',
          'Mesclar elementos da cultura popular brasileira com influências internacionais.',
          'Valorizar exclusivamente as tradições folclóricas regionais.',
          'Defender o isolamento cultural do Brasil.'
        ],
        correctAnswer: 1,
        explanation: 'A Tropicália misturou elementos da cultura brasileira (samba, baião) com rock, psicodelia e vanguardas internacionais, criando uma expressão cultural inovadora.',
        difficulty: 'medium'
      },
      {
        id: 13,
        text: 'A prática regular de atividades físicas está relacionada à prevenção de doenças crônicas como diabetes tipo 2 e hipertensão principalmente porque:',
        options: [
          'Aumenta apenas a força muscular.',
          'Melhora o condicionamento cardiovascular e o metabolismo.',
          'Substitui a necessidade de alimentação saudável.',
          'Reduz a necessidade de sono.'
        ],
        correctAnswer: 1,
        explanation: 'O exercício físico regular melhora a capacidade cardiovascular, regula o metabolismo da glicose e ajuda no controle da pressão arterial, prevenindo doenças crônicas.',
        difficulty: 'medium'
      }
    ],
    humanas: [
      {
        id: 14,
        text: 'A Revolução Industrial, iniciada na Inglaterra no século XVIII, transformou profundamente as relações de trabalho. Uma das principais consequências sociais desse processo foi:',
        options: [
          'A valorização do trabalho artesanal e das corporações de ofício.',
          'O surgimento de uma nova classe trabalhadora urbana e assalariada.',
          'A diminuição da população nas cidades europeias.',
          'O fortalecimento do sistema feudal de produção.'
        ],
        correctAnswer: 1,
        explanation: 'A industrialização criou o proletariado urbano, trabalhadores assalariados nas fábricas, alterando profundamente a estrutura social anterior baseada no trabalho rural e artesanal.',
        difficulty: 'medium'
      },
      {
        id: 15,
        text: 'O desmatamento da Amazônia tem impactos que vão além da região, afetando o clima global. Isso ocorre principalmente porque:',
        options: [
          'A floresta amazônica é responsável por produzir oxigênio para todo o planeta.',
          'A floresta regula o regime de chuvas e armazena grande quantidade de carbono.',
          'O desmatamento aumenta a temperatura apenas localmente.',
          'A Amazônia não tem relação com o clima de outras regiões.'
        ],
        correctAnswer: 1,
        explanation: 'A Amazônia influencia o regime de chuvas através dos "rios voadores" e armazena bilhões de toneladas de carbono. Seu desmatamento libera CO₂ e altera padrões climáticos globais.',
        difficulty: 'medium'
      },
      {
        id: 16,
        text: 'A Constituição Federal de 1988 estabeleceu o Brasil como um Estado Democrático de Direito. Isso significa que:',
        options: [
          'Apenas o Executivo tem poder de decisão sobre as leis.',
          'O poder é exercido pelo povo através de representantes eleitos.',
          'As leis podem ser alteradas sem processo legislativo.',
          'Apenas cidadãos com ensino superior podem votar.'
        ],
        correctAnswer: 1,
        explanation: 'No Estado Democrático de Direito, o poder emana do povo, que o exerce através de representantes eleitos ou diretamente, respeitando a Constituição e as leis.',
        difficulty: 'medium'
      },
      {
        id: 17,
        text: 'A urbanização acelerada no Brasil, especialmente após 1950, resultou em diversos problemas sociais. Um desses problemas é:',
        options: [
          'O aumento da população rural.',
          'A formação de periferias e favelas com infraestrutura precária.',
          'A redução da desigualdade social.',
          'O fortalecimento do setor agrícola.'
        ],
        correctAnswer: 1,
        explanation: 'A migração rápida campo-cidade sem planejamento urbano adequado criou periferias com infraestrutura precária, falta de saneamento e moradias inadequadas.',
        difficulty: 'easy'
      },
      {
        id: 29,
        text: 'Durante a ditadura militar brasileira (1964-1985), diversos atos institucionais foram criados. O AI-5, de 1968, ficou conhecido por:',
        options: [
          'Restabelecer as liberdades democráticas.',
          'Conceder poderes absolutos ao presidente e suspender direitos individuais.',
          'Estabelecer eleições diretas para presidente.',
          'Criar o voto secreto e universal.'
        ],
        correctAnswer: 1,
        explanation: 'O AI-5 foi o mais repressivo dos atos institucionais, dando ao presidente poder para fechar o Congresso, cassar mandatos, suspender direitos políticos e censurar a imprensa.',
        difficulty: 'hard'
      }
    ],
    natureza: [
      {
        id: 18,
        text: 'A vacinação é uma das principais estratégias de saúde pública. As vacinas funcionam porque:',
        options: [
          'Eliminam diretamente os agentes infecciosos do organismo.',
          'Estimulam o sistema imunológico a produzir defesas específicas.',
          'Substituem os anticorpos naturais do corpo.',
          'Impedem a reprodução de todas as bactérias.'
        ],
        correctAnswer: 1,
        explanation: 'As vacinas contêm antígenos que estimulam a produção de anticorpos e células de memória, preparando o sistema imunológico para combater futuras infecções sem causar a doença.',
        difficulty: 'medium'
      },
      {
        id: 19,
        text: 'O efeito estufa é um fenômeno natural importante para a vida na Terra. No entanto, sua intensificação causa problemas ambientais. A principal causa da intensificação é:',
        options: [
          'A diminuição da camada de ozônio.',
          'O aumento da emissão de gases como CO₂ e metano.',
          'A redução das áreas florestais apenas.',
          'A variação natural do clima terrestre.'
        ],
        correctAnswer: 1,
        explanation: 'A queima de combustíveis fósseis e outras atividades humanas aumentam a concentração de gases estufa (CO₂, metano), intensificando o efeito estufa e causando aquecimento global.',
        difficulty: 'medium'
      },
      {
        id: 20,
        text: 'Um objeto em movimento retilíneo uniforme possui:',
        options: [
          'Velocidade variável e aceleração constante.',
          'Velocidade constante e aceleração nula.',
          'Velocidade e aceleração variáveis.',
          'Velocidade nula e aceleração constante.'
        ],
        correctAnswer: 1,
        explanation: 'No movimento retilíneo uniforme (MRU), a velocidade permanece constante, o que significa que não há aceleração (a = 0).',
        difficulty: 'easy'
      },
      {
        id: 21,
        text: 'A fotossíntese é fundamental para a vida na Terra. Nesse processo, as plantas:',
        options: [
          'Produzem glicose utilizando água, luz solar e gás carbônico.',
          'Consomem oxigênio e liberam gás carbônico.',
          'Transformam glicose em energia sem usar luz.',
          'Absorvem nutrientes apenas do solo.'
        ],
        correctAnswer: 0,
        explanation: 'Na fotossíntese, as plantas usam energia luminosa para converter CO₂ e H₂O em glicose (C₆H₁₂O₆) e oxigênio (O₂), sendo a base da cadeia alimentar.',
        difficulty: 'medium'
      },
      {
        id: 30,
        text: 'A Lei da Conservação da Massa, proposta por Lavoisier, estabelece que:',
        options: [
          'A massa dos produtos é sempre maior que a dos reagentes.',
          'Em uma reação química, a massa total permanece constante.',
          'A massa se transforma em energia durante reações.',
          'Apenas reações nucleares conservam a massa.'
        ],
        correctAnswer: 1,
        explanation: 'Lavoisier demonstrou que "na natureza nada se cria, nada se perde, tudo se transforma". A massa total dos reagentes é igual à massa total dos produtos em uma reação química.',
        difficulty: 'medium'
      }
    ],
    todas: [
      {
        id: 1,
        text: 'Qual é o resultado de 2 + 2 × 3?',
        options: ['10', '8', '12', '6'],
        correctAnswer: 1,
        explanation: 'Seguindo a ordem das operações matemáticas, multiplicação vem antes da adição. Então: 2 × 3 = 6, depois 2 + 6 = 8.',
        difficulty: 'easy'
      },
      {
        id: 2,
        text: 'Qual das alternativas apresenta um exemplo de oração subordinada substantiva?',
        options: [
          'Espero que você venha à festa.',
          'Quando cheguei, todos já tinham saído.',
          'Estudei muito, mas não passei.',
          'O livro que comprei é muito bom.'
        ],
        correctAnswer: 0,
        explanation: 'A oração "que você venha à festa" funciona como objeto direto do verbo "esperar", sendo classificada como subordinada substantiva objetiva direta.',
        difficulty: 'medium'
      },
      {
        id: 3,
        text: 'Se x + 5 = 12, qual é o valor de x?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2,
        explanation: 'Para resolver, subtraímos 5 de ambos os lados: x = 12 - 5 = 7.',
        difficulty: 'easy'
      },
      {
        id: 4,
        text: 'Qual é a função sintática do termo destacado: "O menino comprou FLORES"?',
        options: ['Sujeito', 'Predicado', 'Objeto direto', 'Objeto indireto'],
        correctAnswer: 2,
        explanation: 'FLORES é o objeto direto do verbo "comprou", pois completa o sentido do verbo sem preposição.',
        difficulty: 'easy'
      },
      {
        id: 5,
        text: 'Qual é a área de um retângulo com base 8 cm e altura 5 cm?',
        options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
        correctAnswer: 2,
        explanation: 'A área do retângulo é calculada multiplicando base × altura: 8 × 5 = 40 cm².',
        difficulty: 'medium'
      }
    ]
  };

  const questions = allQuestions[subject] || allQuestions.todas;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Inicia o cronômetro quando as questões são exibidas (em todos os modos)
  useEffect(() => {
    setIsTimerActive(true);
  }, []);

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer: selectedAnswer
      };

      const updatedAnswers = [...userAnswers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
      setUserAnswers(updatedAnswers);

      if (isLastQuestion) {
        setIsTimerActive(false);
        const correctCount = updatedAnswers.filter((answer, index) =>
          answer.selectedAnswer === questions[index].correctAnswer
        ).length;

        onFinish({
          correct: correctCount,
          total: questions.length,
          timeSpent,
          questions,
          userAnswers: updatedAnswers
        });
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        const nextAnswer = userAnswers.find(a => a.questionId === questions[currentQuestionIndex + 1].id);
        setSelectedAnswer(nextAnswer?.selectedAnswer ?? null);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onBack}
              className="p-2 active:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            {mode === 'simulation' && (
              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-600 text-sm">{formatTime(timeSpent)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </p>
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1.5">
                <div
                  className="bg-emerald-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {getDifficultyLabel(currentQuestion.difficulty)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-4">
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <h2 className="text-base font-bold text-gray-900 mb-4 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-2.5">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;

              let buttonClass = 'w-full text-left p-3 rounded-lg border-2 transition-all active:scale-98 ';

              if (isSelected) {
                buttonClass += 'bg-emerald-50 border-emerald-500 text-emerald-900';
              } else {
                buttonClass += 'bg-white border-gray-200 text-gray-900';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-sm leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full py-3.5 rounded-xl font-bold text-white transition-all ${
            selectedAnswer === null
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-emerald-600 active:scale-95 shadow-md'
          }`}
        >
          {isLastQuestion ? 'Ver Resultado' : 'Próxima Questão'}
        </button>
      </div>
    </div>
  );
}
