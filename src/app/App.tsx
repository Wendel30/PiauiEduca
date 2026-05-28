import { useState } from 'react';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Ranking } from './components/Ranking';
import { Cronograma } from './components/Cronograma';
import { ExamSelector } from './components/ExamSelector';
import { SubjectSelector } from './components/SubjectSelector';
import { ModeSelector } from './components/ModeSelector';
import { QuestionView } from './components/QuestionView';
import { ResultsView } from './components/ResultsView';
import { RedacaoSelector } from './components/RedacaoSelector';
import { RedacaoEditor } from './components/RedacaoEditor';
import { RedacaoCorrecao } from './components/RedacaoCorrecao';

type Screen = 'login' | 'home' | 'ranking' | 'cronograma' | 'exam-selector' | 'subject-selector' | 'mode-selector' | 'questions' | 'results' | 'redacao-temas' | 'redacao-editor' | 'redacao-correcao';

interface AppState {
  screen: Screen;
  selectedExam: string;
  selectedSubject: string;
  selectedMode: string;
  selectedTemaRedacao: string;
  textoRedacao: string;
  stats: {
    correct: number;
    total: number;
    timeSpent: number;
    questions: any[];
    userAnswers: any[];
  } | null;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    screen: 'login',
    selectedExam: '',
    selectedSubject: '',
    selectedMode: '',
    selectedTemaRedacao: '',
    textoRedacao: '',
    stats: null
  });

  const handleLogin = () => {
    setState(prev => ({ ...prev, screen: 'home' }));
  };

  const handleStart = () => {
    setState(prev => ({ ...prev, screen: 'exam-selector' }));
  };

  const handleViewRanking = () => {
    setState(prev => ({ ...prev, screen: 'ranking' }));
  };

  const handleViewCronograma = () => {
    setState(prev => ({ ...prev, screen: 'cronograma' }));
  };

  const handleBackToHomeFromRanking = () => {
    setState(prev => ({ ...prev, screen: 'home' }));
  };

  const handleSelectExam = (exam: string) => {
    if (exam === 'redacao') {
      setState(prev => ({ ...prev, selectedExam: exam, screen: 'redacao-temas' }));
    } else if (exam === 'saepi' || exam === 'saeb') {
      setState(prev => ({ ...prev, selectedExam: exam, screen: 'mode-selector' }));
    } else {
      setState(prev => ({ ...prev, selectedExam: exam, screen: 'subject-selector' }));
    }
  };

  const handleSelectSubject = (subject: string) => {
    // Se já tem modo selecionado (SAEPI/SAEB em modo practice), vai direto para questões
    if (state.selectedMode === 'practice' && (state.selectedExam === 'saepi' || state.selectedExam === 'saeb')) {
      setState(prev => ({ ...prev, selectedSubject: subject, screen: 'questions' }));
    } else {
      setState(prev => ({ ...prev, selectedSubject: subject, screen: 'mode-selector' }));
    }
  };

  const handleSelectMode = (mode: string) => {
    if ((state.selectedExam === 'saepi' || state.selectedExam === 'saeb') && mode !== 'practice') {
      setState(prev => ({ ...prev, selectedMode: mode, selectedSubject: 'todas', screen: 'questions' }));
    } else if ((state.selectedExam === 'saepi' || state.selectedExam === 'saeb') && mode === 'practice') {
      setState(prev => ({ ...prev, selectedMode: mode, screen: 'subject-selector' }));
    } else {
      setState(prev => ({ ...prev, selectedMode: mode, screen: 'questions' }));
    }
  };

  const handleFinish = (stats: { correct: number; total: number; timeSpent: number; questions: any[]; userAnswers: any[] }) => {
    setState(prev => ({ ...prev, stats, screen: 'results' }));
  };

  const handleRestart = () => {
    setState(prev => ({ ...prev, screen: 'questions', stats: null }));
  };

  const handleHome = () => {
    setState({
      screen: 'home',
      selectedExam: '',
      selectedSubject: '',
      selectedMode: '',
      stats: null
    });
  };

  const handleLogout = () => {
    setState({
      screen: 'login',
      selectedExam: '',
      selectedSubject: '',
      selectedMode: '',
      stats: null
    });
  };

  const handleBackToHome = () => {
    setState(prev => ({ ...prev, screen: 'home' }));
  };

  const handleBackToExamSelector = () => {
    setState(prev => ({ ...prev, screen: 'exam-selector' }));
  };

  const handleBackToSubjectSelector = () => {
    setState(prev => ({ ...prev, screen: 'subject-selector' }));
  };

  const handleBackFromQuestionsToSubject = () => {
    setState(prev => ({ ...prev, screen: 'subject-selector' }));
  };

  const handleSelectTemaRedacao = (temaId: string) => {
    setState(prev => ({ ...prev, selectedTemaRedacao: temaId, screen: 'redacao-editor' }));
  };

  const handleSubmitRedacao = (texto: string) => {
    setState(prev => ({ ...prev, textoRedacao: texto, screen: 'redacao-correcao' }));
  };

  const handleNovaRedacao = () => {
    setState(prev => ({ ...prev, selectedTemaRedacao: '', textoRedacao: '', screen: 'redacao-temas' }));
  };

  const handleBackToModeSelector = () => {
    setState(prev => ({ ...prev, screen: 'mode-selector' }));
  };

  const handleBackFromModeSelector = () => {
    if (state.selectedExam === 'saepi' || state.selectedExam === 'saeb') {
      setState(prev => ({ ...prev, screen: 'exam-selector' }));
    } else {
      setState(prev => ({ ...prev, screen: 'subject-selector' }));
    }
  };

  return (
    <div className="size-full">
      {state.screen === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {state.screen === 'home' && (
        <Home
          onStart={handleStart}
          onViewRanking={handleViewRanking}
          onViewCronograma={handleViewCronograma}
          onLogout={handleLogout}
        />
      )}

      {state.screen === 'ranking' && (
        <Ranking onClose={handleBackToHomeFromRanking} />
      )}

      {state.screen === 'cronograma' && (
        <Cronograma nomeAluno="Estudante" onBack={handleBackToHomeFromRanking} />
      )}

      {state.screen === 'exam-selector' && (
        <ExamSelector
          onBack={handleBackToHome}
          onSelectExam={handleSelectExam}
        />
      )}

      {state.screen === 'subject-selector' && (
        <SubjectSelector
          exam={state.selectedExam}
          onBack={state.selectedMode === 'practice' && (state.selectedExam === 'saepi' || state.selectedExam === 'saeb')
            ? handleBackToModeSelector
            : handleBackToExamSelector}
          onSelectSubject={handleSelectSubject}
        />
      )}

      {state.screen === 'mode-selector' && (
        <ModeSelector
          exam={state.selectedExam}
          subject={state.selectedSubject}
          onBack={handleBackFromModeSelector}
          onSelectMode={handleSelectMode}
        />
      )}

      {state.screen === 'questions' && (
        <QuestionView
          exam={state.selectedExam}
          subject={state.selectedSubject}
          mode={state.selectedMode}
          onBack={state.selectedMode === 'practice' && (state.selectedExam === 'saepi' || state.selectedExam === 'saeb')
            ? handleBackFromQuestionsToSubject
            : handleBackToModeSelector}
          onFinish={handleFinish}
        />
      )}

      {state.screen === 'results' && state.stats && (
        <ResultsView
          stats={state.stats}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}

      {state.screen === 'redacao-temas' && (
        <RedacaoSelector
          onBack={handleBackToExamSelector}
          onSelectTema={handleSelectTemaRedacao}
        />
      )}

      {state.screen === 'redacao-editor' && (
        <RedacaoEditor
          temaId={state.selectedTemaRedacao}
          onBack={() => setState(prev => ({ ...prev, screen: 'redacao-temas' }))}
          onSubmit={handleSubmitRedacao}
        />
      )}

      {state.screen === 'redacao-correcao' && (
        <RedacaoCorrecao
          texto={state.textoRedacao}
          onHome={handleHome}
          onNovaRedacao={handleNovaRedacao}
        />
      )}
    </div>
  );
}