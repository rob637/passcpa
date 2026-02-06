import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { CISA_SECTION_CONFIG, CISASectionId } from '../../courses/cisa';
import { CISAMockExamConfig, DEFAULT_CISA_MOCK_CONFIG, MINI_CISA_MOCK_CONFIG } from '../../data/cisa/mock-exams/config';
import { generateCISAMockExam } from '../../data/cisa/mock-exams/generator';
import { CISA_QUESTIONS } from '../../data/cisa/questions';

export default function CISAExamSimulator() {
  const navigate = useNavigate();
  const [setupMode, setSetupMode] = useState(true);
  const [examMode, setExamMode] = useState<'practice' | 'simulation'>('practice');
  const [selectedDomains, setSelectedDomains] = useState<CISASectionId[]>(['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5']);
  
  const [activeExam, setActiveExam] = useState<ReturnType<typeof generateCISAMockExam> | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!setupMode && !showResults && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval!);
  }, [setupMode, showResults, timer]);

  const startExam = () => {
    const config: CISAMockExamConfig = examMode === 'simulation' 
      ? { ...DEFAULT_CISA_MOCK_CONFIG, sections: selectedDomains }
      : { ...MINI_CISA_MOCK_CONFIG, questionCount: 25, timeLimitMinutes: 45, sections: selectedDomains };

    const pool = CISA_QUESTIONS.filter(q => selectedDomains.includes(q.section as CISASectionId));
    const exam = generateCISAMockExam(config, pool);
    
    setActiveExam(exam);
    setTimer(exam.timeRemaining);
    setSetupMode(false);
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    if (!activeExam) return 0;
    let correct = 0;
    activeExam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / activeExam.questions.length) * 100);
  };

  // ---- SETUP ----
  if (setupMode) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">CISA Exam Simulator</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mode</h2>
            <div className="space-y-4">
              <button 
                onClick={() => setExamMode('practice')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${examMode === 'practice' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
              >
                <div className="font-bold text-gray-900 dark:text-white">Practice Mode</div>
                <div className="text-sm text-gray-500">25 Questions · 45 Minutes · Immediate Feedback</div>
              </button>
              <button 
                onClick={() => setExamMode('simulation')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${examMode === 'simulation' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}
              >
                <div className="font-bold text-gray-900 dark:text-white">Full Exam Simulation</div>
                <div className="text-sm text-gray-500">150 Questions · 4 Hours · Realistic Conditions</div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Domains</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedDomains.length === 5}
                  onChange={() => selectedDomains.length === 5 ? setSelectedDomains([]) : setSelectedDomains(['CISA1','CISA2','CISA3','CISA4','CISA5'])}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-medium text-gray-900 dark:text-white">All Domains</span>
              </label>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              {(Object.keys(CISA_SECTION_CONFIG) as CISASectionId[]).map((id) => (
                <label key={id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedDomains.includes(id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDomains([...selectedDomains, id]);
                      else setSelectedDomains(selectedDomains.filter(d => d !== id));
                    }}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{CISA_SECTION_CONFIG[id].shortTitle}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={startExam}
            disabled={selectedDomains.length === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-base font-medium transition-colors"
          >
            <Play className="w-5 h-5" /> Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ---- RESULTS ----
  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {passed ? <CheckCircle className="w-12 h-12" /> : <AlertCircle className="w-12 h-12" />}
        </div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{score}%</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {passed ? 'Congratulations! You passed.' : 'Keep studying. You can do this!'}
        </p>
        <button onClick={() => navigate('/cisa/dashboard')} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ---- EXAM IN PROGRESS ----
  if (!activeExam) return <div className="p-8 text-center text-gray-500">Error loading exam</div>;

  const question = activeExam.questions[currentQuestionIndex];
  if (!question) return <div className="p-8 text-center text-gray-500">No questions available</div>;
  
  const isLast = currentQuestionIndex === activeExam.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">CISA Exam</h2>
          <div className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {activeExam.questions.length}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-medium ${timer < 300 ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
            <Clock className="w-4 h-4" />
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
          <button onClick={() => navigate('/cisa/dashboard')} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-colors" title="Exit">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-10 min-h-[60vh] flex flex-col">
          <div className="flex-1">
            <div className="mb-6 flex gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 uppercase">
                {examMode}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {question.section}
              </span>
            </div>
            
            <p className="text-xl text-gray-900 dark:text-gray-100 leading-relaxed mb-8">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start group
                    ${answers[question.id] === idx 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 text-sm font-medium shrink-0 mt-0.5 transition-colors
                    ${answers[question.id] === idx 
                      ? 'border-indigo-600 bg-indigo-600 text-white' 
                      : 'border-gray-400 text-gray-500 group-hover:border-indigo-400'
                    }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={answers[question.id] === idx ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <button 
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {isLast ? (
              <button 
                onClick={() => setShowResults(true)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Submit Exam
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.min(activeExam.questions.length - 1, prev + 1))}
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
