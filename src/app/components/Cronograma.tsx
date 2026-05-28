// Ajustes e otimizações de estrutura - PiauiEduca
import { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle, Circle, BookOpen, Calculator, Globe, FlaskConical, Users, Lightbulb, ArrowLeft } from 'lucide-react';

interface Tarefa {
  id: number;
  materia: string;
  titulo: string;
  horario: string;
  concluida: boolean;
  cor: string;
  icon: any;
}

interface CronogramaProps {
  nomeAluno?: string;
  onBack?: () => void;
}

export function Cronograma({ nomeAluno = 'Estudante', onBack }: CronogramaProps) {
  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const [diaSelecionado, setDiaSelecionado] = useState(0);

  const [tarefas, setTarefas] = useState<Record<number, Tarefa[]>>({
    0: [ // Segunda
      { id: 1, materia: 'Matemática', titulo: 'Resolver exercícios de funções', horario: '14:00', concluida: true, cor: 'bg-red-500', icon: Calculator },
      { id: 2, materia: 'Português', titulo: 'Ler capítulo sobre sintaxe', horario: '15:30', concluida: true, cor: 'bg-blue-500', icon: BookOpen },
      { id: 3, materia: 'Física', titulo: 'Estudar leis de Newton', horario: '17:00', concluida: false, cor: 'bg-purple-500', icon: FlaskConical }
    ],
    1: [ // Terça
      { id: 4, materia: 'História', titulo: 'Revisar Revolução Industrial', horario: '14:00', concluida: false, cor: 'bg-amber-600', icon: Users },
      { id: 5, materia: 'Geografia', titulo: 'Estudar biomas brasileiros', horario: '16:00', concluida: false, cor: 'bg-green-600', icon: Globe }
    ],
    2: [ // Quarta
      { id: 6, materia: 'Química', titulo: 'Tabela periódica', horario: '14:00', concluida: false, cor: 'bg-pink-500', icon: FlaskConical },
      { id: 7, materia: 'Matemática', titulo: 'Geometria plana', horario: '16:00', concluida: false, cor: 'bg-red-500', icon: Calculator }
    ],
    3: [ // Quinta
      { id: 8, materia: 'Português', titulo: 'Redação dissertativa', horario: '14:00', concluida: false, cor: 'bg-blue-500', icon: BookOpen },
      { id: 9, materia: 'Biologia', titulo: 'Célula e organelas', horario: '16:00', concluida: false, cor: 'bg-emerald-600', icon: Lightbulb }
    ],
    4: [ // Sexta
      { id: 10, materia: 'Física', titulo: 'Revisão geral', horario: '14:00', concluida: false, cor: 'bg-purple-500', icon: FlaskConical }
    ],
    5: [ // Sábado
      { id: 11, materia: 'Simulado', titulo: 'Simulado ENEM completo', horario: '09:00', concluida: false, cor: 'bg-orange-500', icon: BookOpen }
    ]
  });

  const tarefasDia = tarefas[diaSelecionado] || [];
  const totalTarefas = tarefasDia.length;
  const tarefasConcluidas = tarefasDia.filter(t => t.concluida).length;
  const progresso = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0;

  const toggleTarefa = (tarefaId: number) => {
    setTarefas(prev => ({
      ...prev,
      [diaSelecionado]: prev[diaSelecionado].map(t =>
        t.id === tarefaId ? { ...t, concluida: !t.concluida } : t
      )
    }));
  };

  const getHoraSaudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header com Saudação */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 pt-8 pb-6 px-4 relative">
        {/* Botão Voltar */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}

        <div className="text-white">
          <h1 className="text-2xl font-bold mb-1">
            {getHoraSaudacao()}, {nomeAluno}! 👋
          </h1>
          <p className="text-emerald-100 text-sm">Vamos organizar seus estudos hoje</p>
        </div>
      </div>

      {/* Calendário Semanal */}
      <div className="px-4 -mt-3 mb-4">
        <div className="bg-white rounded-xl shadow-md p-3">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <h2 className="font-bold text-gray-900 text-sm">Semana</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {diasSemana.map((dia, index) => (
              <button
                key={index}
                onClick={() => setDiaSelecionado(index)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  diaSelecionado === index
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progresso do Dia */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm">Progresso de Hoje</h3>
            <span className="text-xs font-bold text-emerald-600">
              {tarefasConcluidas}/{totalTarefas}
            </span>
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progresso === 100 ? 'Parabéns! Você completou todas as tarefas!' : `${Math.round(progresso)}% concluído`}
          </p>
        </div>
      </div>

      {/* Lista de Tarefas do Dia */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">
            {diasSemana[diaSelecionado]}
          </h3>
          <button className="bg-emerald-600 text-white p-2 rounded-lg active:scale-95 transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {tarefasDia.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhuma tarefa agendada</p>
            <button className="mt-3 text-emerald-600 text-sm font-semibold">
              Adicionar tarefa
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tarefasDia.map((tarefa) => {
              const IconComponent = tarefa.icon;
              return (
                <div
                  key={tarefa.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="flex items-start gap-3 p-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTarefa(tarefa.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {tarefa.concluida ? (
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </button>

                    {/* Ícone da Matéria */}
                    <div className={`${tarefa.cor} p-2 rounded-lg flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${tarefa.cor} bg-opacity-10`}>
                          {tarefa.materia}
                        </span>
                      </div>
                      <h4 className={`font-semibold text-sm mb-1 ${tarefa.concluida ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {tarefa.titulo}
                      </h4>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{tarefa.horario}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dica Motivacional */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">Dica do Dia</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Organize seus estudos em blocos de 25-30 minutos com pausas curtas. Isso ajuda na concentração e retenção do conteúdo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
