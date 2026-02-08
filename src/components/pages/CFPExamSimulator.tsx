import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  Target,
  Flag
} from 'lucide-react';
import { CFP_QUESTIONS_ALL } from '../../data/cfp/questions';

// CFP Exam Domain Configuration
const CFP_DOMAIN_CONFIG = {
  'CFP-PCR': { id: 'CFP-PCR', name: 'Professional Conduct & Regulation', shortTitle: 'Ethics', weight: 8, color: 'indigo' },
  'CFP-GEN': { id: 'CFP-GEN', name: 'General Principles of Financial Planning', shortTitle: 'General', weight: 15, color: 'blue' },
  'CFP-RISK': { id: 'CFP-RISK', name: 'Risk Management & Insurance', shortTitle: 'Insurance', weight: 11, color: 'green' },
  'CFP-INV': { id: 'CFP-INV', name: 'Investment Planning', shortTitle: 'Investments', weight: 17, color: 'purple' },
  'CFP-TAX': { id: 'CFP-TAX', name: 'Tax Planning', shortTitle: 'Tax', weight: 14, color: 'orange' },
  'CFP-RET': { id: 'CFP-RET', name: 'Retirement Savings & Income Planning', shortTitle: 'Retirement', weight: 18, color: 'teal' },
  'CFP-EST': { id: 'CFP-EST', name: 'Estate Planning', shortTitle: 'Estate', weight: 10, color: 'pink' },
  'CFP-PSY': { id: 'CFP-PSY', name: 'Psychology of Financial Planning', shortTitle: 'Psychology', weight: 7, color: 'amber' },
} as const;

type CFPDomainId = keyof typeof CFP_DOMAIN_CONFIG;

interface CFPQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  section?: string;
  domain?: string;
  explanation?: string;
}

interface ExamConfig {
  questionCount: number;
  timeLimitMinutes: number;
  domains: CFPDomainId[];
}

const FULL_EXAM_CONFIG: ExamConfig = {
  questionCount: 170,
  timeLimitMinutes: 180, // 3 hours
  domains: Object.keys(CFP_DOMAIN_CONFIG) as CFPDomainId[],
};

const PRACTICE_EXAM_CONFIG: ExamConfig = {
  questionCount: 40,
  timeLimitMinutes: 60,
  domains: Object.keys(CFP_DOMAIN_CONFIG) as CFPDomainId[],
};

function generateMockExam(config: ExamConfig, pool: CFPQuestion[]): { questions: CFPQuestion[]; timeRemaining: number } {
  // Filter pool by selected domains
  const filteredPool = pool.filter(q => {
    const section = q.section || q.domain || '';
    return config.domains.some(d => section.includes(d) || section.includes(d.replace('CFP-', '')));
  });
  
  // Shuffle and select questions
  const shuffled = [...filteredPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
  
  return {
    questions: selected,
    timeRemaining: config.timeLimitMinutes * 60,
  };
}

export default function CFPExamSimulator() {
  const navigate = useNavigate();
  const [setupMode, setSetupMode] = useState(true);
  const [examMode, setExamMode] = useState<'practice' | 'simulation'>('practice');
  const [selectedDomains, setSelectedDomains] = useState<CFPDomainId[]>(Object.keys(CFP_DOMAIN_CONFIG) as CFPDomainId[]);
  
  const [activeExam, setActiveExam] = useState<ReturnType<typeof generateMockExam> | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!setupMode && !showResults && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval!);
  }, [setupMode, showResults, timer]);

  const startExam = () => {
    const config = examMode === 'simulation' 
      ? { ...FULL_EXAM_CONFIG, domains: selectedDomains }
      : { ...PRACTICE_EXAM_CONFIG, domains: selectedDomains };

    // Normalize questions to consistent format
    const normalizedPool: CFPQuestion[] = CFP_QUESTIONS_ALL.map((q, idx) => ({
      id: q.id || `cfp-q-${idx}`,
      question: q.question || q.text || '',
      options: q.options || [],
      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
      section: q.section || q.domain || '',
      explanation: q.explanation || q.rationale || '',
    }));
    
    const exam = generateMockExam(config, normalizedPool);
    
    setActiveExam(exam);
    setTimer(exam.timeRemaining);
    setSetupMode(false);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const calculateScore = () => {
    if (!activeExam) return { score: 0, correct: 0, total: 0, domainScores: {} as Record<string, { correct: number; total: number }> };
    
    let correct = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};
    
    activeExam.questions.forEach(q => {
      const section = q.section || 'unknown';
      if (!domainScores[section]) {
        domainScores[section] = { correct: 0, total: 0 };
      }
      domainScores[section].total++;
      
      if (answers[q.id] === q.correctAnswer) {
        correct++;
        domainScores[section].correct++;
      }
    });
    
    return {
      score: Math.round((correct / activeExam.questions.length) * 100),
      correct,
      total: activeExam.questions.length,
      domainScores,
    };
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ---- SETUP ----
  if (setupMode) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CFP Exam Simulator</h1>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">About the CFP Exam</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            The CFP exam consists of 170 multiple-choice questions covering 8 Principal Knowledge Domains. 
            You have 3 hours to complete the full exam. Passing score is approximately 65%.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Exam Mode</h2>
            <div className="space-y-4">
              <button 
                onClick={() => setExamMode('practice')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  examMode === 'practice' 
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                }`}
              >
                <div className="font-bold text-gray-900 dark:text-white">Practice Mode</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">40 Questions · 60 Minutes · Review as you go</div>
              </button>
              <button 
                onClick={() => setExamMode('simulation')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  examMode === 'simulation' 
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                }`}
              >
                <div className="font-bold text-gray-900 dark:text-white">Full Exam Simulation</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">170 Questions · 3 Hours · Realistic conditions</div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Domains</h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedDomains.length === 8}
                  onChange={() => selectedDomains.length === 8 
                    ? setSelectedDomains([]) 
                    : setSelectedDomains(Object.keys(CFP_DOMAIN_CONFIG) as CFPDomainId[])
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-900 dark:text-white">All Domains (Full Exam)</span>
              </label>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              {(Object.keys(CFP_DOMAIN_CONFIG) as CFPDomainId[]).map((id) => (
                <label key={id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedDomains.includes(id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDomains([...selectedDomains, id]);
                      else setSelectedDomains(selectedDomains.filter(d => d !== id));
                    }}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{CFP_DOMAIN_CONFIG[id].shortTitle}</span>
                    <span className="ml-2 text-xs text-gray-400">({CFP_DOMAIN_CONFIG[id].weight}%)</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={() => navigate('/cfp/dashboard')}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <button 
            onClick={startExam}
            disabled={selectedDomains.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-base font-medium transition-colors"
          >
            <Play className="w-5 h-5" /> Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ---- RESULTS ----
  if (showResults) {
    const { score, correct, total, domainScores } = calculateScore();
    const passed = score >= 65; // CFP passing threshold is approximately 65%
    
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
            passed ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {passed ? <CheckCircle className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{score}%</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            {passed ? 'Congratulations! You passed!' : 'Keep studying. You\'ll get there!'}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {correct} of {total} questions correct
          </p>
        </div>

        {/* Domain breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance by Domain</h2>
          <div className="space-y-3">
            {Object.entries(domainScores).map(([domain, scores]) => {
              const pct = scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0;
              const config = CFP_DOMAIN_CONFIG[domain as CFPDomainId];
              return (
                <div key={domain} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {config?.shortTitle || domain}
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pct >= 65 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-20 text-sm text-right text-gray-600 dark:text-gray-400">
                    {scores.correct}/{scores.total} ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              setSetupMode(true);
              setShowResults(false);
              setActiveExam(null);
            }}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            Take Another Exam
          </button>
          <button 
            onClick={() => navigate('/cfp/dashboard')} 
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ---- EXAM IN PROGRESS ----
  if (!activeExam || activeExam.questions.length === 0) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <p className="text-gray-600 dark:text-gray-400">No questions available for the selected domains.</p>
        <button 
          onClick={() => setSetupMode(true)}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const question = activeExam.questions[currentQuestionIndex];
  if (!question) return <div className="p-8 text-center text-gray-500">Error loading question</div>;
  
  const isLast = currentQuestionIndex === activeExam.questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const isFlagged = flaggedQuestions.has(question.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">CFP Exam</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {activeExam.questions.length}
            <span className="mx-2">·</span>
            <span className="text-emerald-600 dark:text-emerald-400">{answeredCount} answered</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-medium ${
            timer < 300 
              ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timer)}
          </div>
          <button 
            onClick={toggleFlag.bind(null, question.id)}
            className={`p-2 rounded transition-colors ${
              isFlagged 
                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
            }`}
            title="Flag for review"
          >
            <Flag className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                navigate('/cfp/dashboard');
              }
            }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded transition-colors" 
            title="Exit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-10 min-h-[60vh] flex flex-col">
          <div className="flex-1">
            <div className="mb-6 flex gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 uppercase">
                {examMode}
              </span>
              {question.section && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {CFP_DOMAIN_CONFIG[question.section as CFPDomainId]?.shortTitle || question.section}
                </span>
              )}
              {isFlagged && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Flagged
                </span>
              )}
            </div>
            
            <p className="text-xl text-gray-900 dark:text-gray-100 leading-relaxed mb-8">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start group
                    ${answers[question.id] === idx 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                    }`}
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 text-sm font-medium shrink-0 mt-0.5 transition-colors
                    ${answers[question.id] === idx 
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-gray-400 text-gray-500 group-hover:border-emerald-400'
                    }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={answers[question.id] === idx ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-700 dark:text-gray-300'}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {/* Show explanation in practice mode after answering */}
            {examMode === 'practice' && answers[question.id] !== undefined && question.explanation && (
              <div className="mt-6">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                >
                  <Target className="w-4 h-4" />
                  {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                </button>
                {showExplanation && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                    <p className="mb-2">
                      <span className="font-medium">Correct Answer: </span>
                      {String.fromCharCode(65 + question.correctAnswer)}
                    </p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button 
              onClick={() => {
                setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
                setShowExplanation(false);
              }}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <div className="flex items-center gap-2">
              {/* Question navigator dots (for practice mode) */}
              {examMode === 'practice' && activeExam.questions.length <= 50 && (
                <div className="hidden md:flex gap-1 flex-wrap max-w-md justify-center">
                  {activeExam.questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                        idx === currentQuestionIndex
                          ? 'bg-emerald-600 text-white'
                          : answers[q.id] !== undefined
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : flaggedQuestions.has(q.id)
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isLast ? (
              <button 
                onClick={() => setShowResults(true)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Submit Exam
              </button>
            ) : (
              <button 
                onClick={() => {
                  setCurrentQuestionIndex(prev => Math.min(activeExam.questions.length - 1, prev + 1));
                  setShowExplanation(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
