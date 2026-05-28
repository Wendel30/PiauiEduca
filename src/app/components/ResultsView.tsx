import { useState } from 'react';
import { Trophy, Clock, Target, TrendingUp, Home, RotateCcw, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Question, UserAnswer } from './QuestionView';

interface ResultsViewProps {
  stats: {
    correct: number;
    total: number;
    timeSpent: number;
    questions: Question[];
    userAnswers: UserAnswer[];
  };
  onRestart: () => void;
  onHome: () => void;
}

export function ResultsView({ stats, onRestart, onHome }: ResultsViewProps) {
  const [showReview, setShowReview] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const percentage = Math.round((stats.correct / stats.total) * 100);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: 'Excelente!', color: 'text-green-600', emoji: '🏆' };
    if (percentage >= 70) return { message: 'Muito Bom!', color: 'text-blue-600', emoji: '👏' };
    if (percentage >= 50) return { message: 'Bom trabalho!', color: 'text-yellow-600', emoji: '👍' };
    return { message: 'Continue praticando!', color: 'text-orange-600', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  if (showReview) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-3">
            <h1 className="text-lg font-bold text-gray-900">Revisão das Questões</h1>
            <p className="text-xs text-gray-500">Veja suas respostas e explicações</p>
          </div>
        </div>

        <div className="flex-1 w-full px-4 py-4 space-y-3 pb-20">
          {stats.questions.map((question, index) => {
            const userAnswer = stats.userAnswers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
            const isExpanded = expandedQuestion === question.id;

            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${
                  isCorrect ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">Questão {index + 1}</p>
                      <p className="font-semibold text-gray-900 text-sm leading-relaxed">{question.text}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isUserAnswer = userAnswer?.selectedAnswer === optIndex;
                        const isCorrectAnswer = optIndex === question.correctAnswer;

                        let optionClass = 'p-2.5 rounded-lg border-2 ';
                        if (isCorrectAnswer) {
                          optionClass += 'bg-green-50 border-green-500';
                        } else if (isUserAnswer && !isCorrect) {
                          optionClass += 'bg-red-50 border-red-500';
                        } else {
                          optionClass += 'bg-gray-50 border-gray-200';
                        }

                        return (
                          <div key={optIndex} className={optionClass}>
                            <div className="flex items-start gap-2">
                              <span className="font-bold text-xs mt-0.5">
                                {String.fromCharCode(65 + optIndex)})
                              </span>
                              <span className="flex-1 text-sm leading-relaxed">{option}</span>
                              {isCorrectAnswer && (
                                <span className="text-xs font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded flex-shrink-0">
                                  Correta
                                </span>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <span className="text-xs font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded flex-shrink-0">
                                  Sua
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={`p-3 rounded-lg ${
                      isCorrect ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <TrendingUp className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isCorrect ? 'text-green-600' : 'text-blue-600'
                        }`} />
                        <div>
                          <h4 className={`font-bold text-xs mb-1 ${
                            isCorrect ? 'text-green-900' : 'text-blue-900'
                          }`}>
                            Explicação
                          </h4>
                          <p className={`text-xs leading-relaxed ${
                            isCorrect ? 'text-green-800' : 'text-blue-800'
                          }`}>
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <button
              onClick={() => setShowReview(false)}
              className="w-full bg-emerald-600 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow-md transition-all"
            >
              Voltar aos Resultados
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{performance.emoji}</div>
          <h1 className={`text-3xl font-bold mb-1 ${performance.color} drop-shadow-lg`}>
            {performance.message}
          </h1>
          <p className="text-white text-base">Veja seu desempenho</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-3">
              <span className="text-4xl font-bold text-white">{percentage}%</span>
            </div>
            <p className="text-gray-600 font-semibold text-sm">Percentual de Acertos</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
              <div className="bg-green-500 p-2.5 rounded-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Questões Corretas</p>
                <p className="text-xl font-bold text-gray-900">{stats.correct} de {stats.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
              <div className="bg-blue-500 p-2.5 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Tempo Total</p>
                <p className="text-xl font-bold text-gray-900">{formatTime(stats.timeSpent)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3">
              <div className="bg-purple-500 p-2.5 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Aproveitamento</p>
                <p className="text-lg font-bold text-gray-900">
                  {percentage >= 70 ? 'Aprovado' : 'Precisa melhorar'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => setShowReview(true)}
            className="w-full bg-white text-emerald-700 font-bold py-3.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Ver Respostas e Explicações
          </button>

          <button
            onClick={onRestart}
            className="w-full bg-white/10 backdrop-blur-sm text-white font-bold py-3.5 px-6 rounded-xl border-2 border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Tentar Novamente
          </button>

          <button
            onClick={onHome}
            className="w-full bg-white/10 backdrop-blur-sm text-white font-bold py-3.5 px-6 rounded-xl border-2 border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </button>
        </div>

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
          <div className="flex items-start gap-2 text-white">
            <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-1 text-sm">Dica de Estudo</h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Continue praticando diariamente para melhorar seu desempenho.
                Revise as questões que você errou e tente entender os conceitos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
