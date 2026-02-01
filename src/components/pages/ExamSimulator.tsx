import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import logger from '../../utils/logger';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  // Pause,
  // Play,
  Trophy,
  Target,
  Calculator,
  FileText,
  // Eye,
  BookOpen,
  ArrowLeft,
  BarChart3,
  Sparkles,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CPA_SECTIONS } from '../../config/examConfig';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection, TBS } from '../../types';
import TBSRenderer from '../exam/TBSRenderer';
import { getMockExamsBySection, MockExamConfig, loadTestletTBS, BLUEPRINT_WEIGHTS } from '../../data/mock-exams';
import { getTBSBySection } from '../../data/tbs';

interface TestletConfig {
  type: 'mcq' | 'tbs' | 'wc';
  questions: number;
  time: number;
}

interface ExamConfig {
  testlets: TestletConfig[];
  totalTime: number;
  passingScore: number;
}

// Exam structure based on real CPA exam
const EXAM_CONFIG: Record<ExamSection, ExamConfig> = {
  REG: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 }, // 45 minutes
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 }, // Task-based simulations
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60, // 4 hours
    passingScore: 75,
  },
  AUD: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  FAR: {
    testlets: [
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  BAR: {
    testlets: [
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'mcq', questions: 33, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
      { type: 'tbs', questions: 6, time: 70 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  ISC: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  TCP: {
    testlets: [
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'mcq', questions: 36, time: 45 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
      { type: 'tbs', questions: 6, time: 60 * 60 },
    ],
    totalTime: 4 * 60 * 60,
    passingScore: 75,
  },
  PREP: {
     testlets: [],
     totalTime: 0,
     passingScore: 0,
  },
  /** @deprecated BEC was replaced by BAR/ISC/TCP in 2024 CPA Evolution */
  BEC: {
     testlets: [
      { type: 'mcq', questions: 31, time: 45 * 60 },
      { type: 'mcq', questions: 31, time: 45 * 60 },
      { type: 'tbs', questions: 4, time: 60 * 60 },
      { type: 'wc', questions: 3, time: 30 * 60 },
    ],
     totalTime: 4 * 60 * 60,
     passingScore: 75,
  }
};

// Mini exam for practice (shorter version)
const MINI_EXAM: ExamConfig = {
  testlets: [
    { type: 'mcq', questions: 18, time: 25 * 60 },
    { type: 'mcq', questions: 18, time: 25 * 60 },
  ],
  totalTime: 50 * 60, // 50 minutes
  passingScore: 75,
};

// Mini exam with TBS for full experience
const MINI_EXAM_WITH_TBS: ExamConfig = {
  testlets: [
    { type: 'mcq', questions: 12, time: 15 * 60 },
    { type: 'mcq', questions: 12, time: 15 * 60 },
    { type: 'tbs', questions: 2, time: 20 * 60 },
  ],
  totalTime: 50 * 60, // 50 minutes
  passingScore: 75,
};

type ExamState = 'intro' | 'mock-selection' | 'exam' | 'break' | 'review' | 'complete';
type ExamMode = 'mini' | 'mini-tbs' | 'full' | 'curated';

const ExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { completeSimulation } = useStudy();

  const [examState, setExamState] = useState<ExamState>('intro');
  const [examMode, setExamMode] = useState<ExamMode>('mini');
  const [selectedMockExam, setSelectedMockExam] = useState<MockExamConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tbsItems, setTbsItems] = useState<TBS[]>([]);
  const [currentTestlet, setCurrentTestlet] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [tbsAnswers, setTbsAnswers] = useState<Record<string, Record<string, unknown>>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  // const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [blueprintScores, setBlueprintScores] = useState<Record<string, { correct: number; total: number }>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);
  const currentSection = (userProfile?.examSection || 'REG') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  const availableMockExams = getMockExamsBySection(currentSection);
  
  // Determine exam config based on mode
  const examConfig = useMemo(() => {
    if (examMode === 'curated' && selectedMockExam) {
      return {
        testlets: selectedMockExam.testlets.map(t => ({
          type: t.type as 'mcq' | 'tbs' | 'wc',
          questions: t.questionCount,
          time: t.timeAllocation,
        })),
        totalTime: selectedMockExam.totalTime,
        passingScore: selectedMockExam.passingScore,
      };
    }
    if (examMode === 'mini-tbs') return MINI_EXAM_WITH_TBS;
    if (examMode === 'full') return EXAM_CONFIG[currentSection];
    return MINI_EXAM;
  }, [examMode, selectedMockExam, currentSection]);

  // Load questions for exam
  const startExam = async () => {
    setLoading(true);
    try {
      // Calculate MCQ and TBS counts
      const mcqTestlets = examConfig.testlets.filter(t => t.type === 'mcq');
      const tbsTestlets = examConfig.testlets.filter(t => t.type === 'tbs');
      const totalMcqQuestions = mcqTestlets.reduce((sum, t) => sum + t.questions, 0);
      const totalTbsQuestions = tbsTestlets.reduce((sum, t) => sum + t.questions, 0);

      // Load MCQ questions from Firestore
      const questionsQuery = query(
        collection(db, 'questions'),
        where('section', '==', currentSection),
        limit(totalMcqQuestions)
      );

      const snapshot = await getDocs(questionsQuery);
      let loadedQuestions = snapshot.docs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((doc) => ({ id: doc.id, ...doc.data() } as any))
        .sort(() => Math.random() - 0.5) as Question[];

      // If not enough questions, fill with duplicates (shuffled)
      while (loadedQuestions.length < totalMcqQuestions) {
        const filler = loadedQuestions
          .slice(0, totalMcqQuestions - loadedQuestions.length)
          .map((q) => ({ ...q, id: `${q.id}-dup-${Math.random()}` }));
        loadedQuestions = [...loadedQuestions, ...filler];
      }

      setQuestions(loadedQuestions.slice(0, totalMcqQuestions));

      // Load TBS items if exam includes TBS testlets
      if (totalTbsQuestions > 0) {
        const allTbs = getTBSBySection(currentSection);
        
        // If curated exam with specific TBS IDs, use those
        if (examMode === 'curated' && selectedMockExam) {
          const curatedTbs: TBS[] = [];
          for (const testlet of selectedMockExam.testlets) {
            if (testlet.type === 'tbs' && testlet.tbsIds) {
              const tbs = loadTestletTBS(testlet, currentSection);
              curatedTbs.push(...tbs);
            } else if (testlet.type === 'tbs') {
              // Random selection for non-curated TBS testlets
              const shuffled = [...allTbs].sort(() => Math.random() - 0.5);
              curatedTbs.push(...shuffled.slice(0, testlet.questionCount));
            }
          }
          setTbsItems(curatedTbs.slice(0, totalTbsQuestions));
        } else {
          // Random TBS selection for mini/full exams
          const shuffledTbs = [...allTbs].sort(() => Math.random() - 0.5);
          setTbsItems(shuffledTbs.slice(0, totalTbsQuestions));
        }
      } else {
        setTbsItems([]);
      }

      setTimeLeft(examConfig.totalTime);
      setStartTime(Date.now());
      setExamState('exam');
      setCurrentTestlet(0);
      setCurrentIndex(0);
      setAnswers({});
      setTbsAnswers({});
      setFlagged(new Set());
      setBlueprintScores({});
    } catch (error) {
      logger.error('Error starting exam:', error);
    } finally {
      setLoading(false);
    }
  };

  // Timer
  useEffect(() => {
    if (examState !== 'exam') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setExamState('complete');
          feedback.complete();
          return 0;
        }
        // Warning sounds
        if (t === 600) feedback.click(); // 10 min
        if (t === 300) feedback.click(); // 5 min
        if (t === 60) feedback.incorrect(); // 1 min
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [examState]);

  // Keyboard shortcuts
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (examState !== 'exam') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (['1', '2', '3', '4', 'a', 'b', 'c', 'd'].includes(key)) {
        const index = ['1', 'a'].includes(key)
          ? 0
          : ['2', 'b'].includes(key)
            ? 1
            : ['3', 'c'].includes(key)
              ? 2
              : 3;
        handleSelectAnswer(index);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (key === 'f') {
        toggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examState, currentIndex]);

  // Get current testlet questions or TBS
  const testletQuestions = useMemo(() => {
    if (!examConfig) return [];
    const testlet = examConfig.testlets[currentTestlet];
    if (!testlet) return [];
    
    if (testlet.type === 'mcq') {
      // Calculate which MCQ questions belong to this testlet
      let mcqStart = 0;
      for (let i = 0; i < currentTestlet; i++) {
        if (examConfig.testlets[i].type === 'mcq') {
          mcqStart += examConfig.testlets[i].questions;
        }
      }
      return questions.slice(mcqStart, mcqStart + testlet.questions);
    }
    return []; // TBS handled separately
  }, [currentTestlet, examConfig, questions]);

  // Get current testlet TBS items
  const testletTBS = useMemo(() => {
    if (!examConfig) return [];
    const testlet = examConfig.testlets[currentTestlet];
    if (!testlet || testlet.type !== 'tbs') return [];
    
    // Calculate which TBS items belong to this testlet
    let tbsStart = 0;
    for (let i = 0; i < currentTestlet; i++) {
      if (examConfig.testlets[i].type === 'tbs') {
        tbsStart += examConfig.testlets[i].questions;
      }
    }
    return tbsItems.slice(tbsStart, tbsStart + testlet.questions);
  }, [currentTestlet, examConfig, tbsItems]);

  const currentTestletType = examConfig?.testlets[currentTestlet]?.type || 'mcq';
  const currentQuestion = currentTestletType === 'mcq' ? testletQuestions[currentIndex] : null;
  const currentTBS = currentTestletType === 'tbs' ? testletTBS[currentIndex] : null;

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = useCallback((index: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: index }));
    feedback.tap();
  }, [currentQuestion]);

  // Handle TBS answer changes
  const handleTBSAnswerChange = useCallback((tbsId: string, requirementId: string, value: unknown) => {
    setTbsAnswers((prev) => ({
      ...prev,
      [tbsId]: {
        ...(prev[tbsId] || {}),
        [requirementId]: value,
      },
    }));
  }, []);

  const handleNext = useCallback(() => {
    const maxIndex = currentTestletType === 'tbs' ? testletTBS.length - 1 : testletQuestions.length - 1;
    if (currentIndex < maxIndex) {
      setCurrentIndex((i) => i + 1);
    }
    feedback.click();
  }, [currentIndex, testletQuestions.length, testletTBS.length, currentTestletType]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
    feedback.tap();
  }, [currentIndex]);

  const toggleFlag = useCallback(() => {
    const itemId = currentTestletType === 'tbs' ? currentTBS?.id : currentQuestion?.id;
    if (!itemId) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
    feedback.tap();
  }, [currentQuestion?.id, currentTBS?.id, currentTestletType]);

  const handleNextTestlet = () => {
    if (currentTestlet < examConfig.testlets.length - 1) {
      setCurrentTestlet((t) => t + 1);
      setCurrentIndex(0);
      setExamState('break');
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setExamState('complete');
    feedback.complete();

    // Calculate score
    const results = calculateResults();
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 60000) : 0;

    // Record simulation
    await completeSimulation('exam-sim-' + Date.now(), results.percentage, timeSpent);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const blueprintResults: Record<string, { correct: number; total: number }> = {};

    // Score MCQ questions
    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const area = q.blueprintArea || 'Unknown';
      
      if (!blueprintResults[area]) {
        blueprintResults[area] = { correct: 0, total: 0 };
      }
      blueprintResults[area].total++;
      
      if (userAnswer === undefined) {
        unanswered++;
      } else if (userAnswer === q.correctAnswer) {
        correct++;
        blueprintResults[area].correct++;
      } else {
        incorrect++;
      }
    });

    // Score TBS (simplified scoring - in reality this would be more complex)
    let tbsCorrect = 0;
    let tbsTotal = 0;
    tbsItems.forEach((tbs) => {
      const userTbsAnswers = tbsAnswers[tbs.id] || {};
      const area = tbs.blueprintArea || 'Unknown';
      
      if (!blueprintResults[area]) {
        blueprintResults[area] = { correct: 0, total: 0 };
      }
      
      const requirements = tbs.requirements || [];
      requirements.forEach((req) => {
        tbsTotal++;
        blueprintResults[area].total++;
        
        const userAnswer = userTbsAnswers[req.id];
        if (userAnswer !== undefined && userAnswer !== null) {
          // Simplified scoring - real TBS scoring is more nuanced
          if (req.type === 'calculation' && req.correctAnswer !== undefined && req.correctAnswer !== null) {
            const numAnswer = typeof userAnswer === 'number' ? userAnswer : parseFloat(String(userAnswer));
            const tolerance = req.tolerance || 0;
            if (Math.abs(numAnswer - Number(req.correctAnswer)) <= tolerance) {
              tbsCorrect++;
              blueprintResults[area].correct++;
            }
          } else if (req.type === 'multiple_choice' && req.correctOption !== undefined) {
            if (userAnswer === req.correctOption) {
              tbsCorrect++;
              blueprintResults[area].correct++;
            }
          } else {
            // For other types, give partial credit if answered
            tbsCorrect += 0.5;
            blueprintResults[area].correct += 0.5;
          }
        }
      });
    });

    // Combined scoring (MCQ ~50%, TBS ~50% per AICPA weighting)
    const mcqWeight = 0.5;
    const tbsWeight = 0.5;
    
    const mcqScore = questions.length > 0 ? (correct / questions.length) * 100 : 0;
    const tbsScore = tbsTotal > 0 ? (tbsCorrect / tbsTotal) * 100 : 0;
    
    const percentage = tbsItems.length > 0
      ? Math.round(mcqScore * mcqWeight + tbsScore * tbsWeight)
      : Math.round(mcqScore);

    setBlueprintScores(blueprintResults);

    return { 
      correct, 
      incorrect, 
      unanswered, 
      percentage,
      mcqScore: Math.round(mcqScore),
      tbsScore: Math.round(tbsScore),
      tbsCorrect,
      tbsTotal,
      blueprintResults,
    };
  };

  if (examState === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <button
            onClick={() => navigate('/practice')}
            className="mb-6 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary-600 p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Exam Simulation</h1>
              <p className="text-primary-100 text-lg">
                Full {sectionInfo?.name} ({currentSection}) Exam Experience
              </p>
            </div>

            <div className="p-8">
              {/* Exam Mode Selection */}
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Select Exam Type</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setExamMode('mini')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'mini'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">Mini Exam</span>
                  </div>
                  <div className="text-sm text-slate-600">50 mins • 36 MCQs</div>
                </button>
                <button
                  onClick={() => setExamMode('mini-tbs')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'mini-tbs'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ClipboardCheck className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">Mini + TBS</span>
                  </div>
                  <div className="text-sm text-slate-600">50 mins • 24 MCQs + 2 TBS</div>
                </button>
                <button
                  onClick={() => setExamMode('full')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'full'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">Full Exam</span>
                  </div>
                  <div className="text-sm text-slate-600">4 hours • Full AICPA structure</div>
                </button>
                <button
                  onClick={() => {
                    setExamMode('curated');
                    setExamState('mock-selection');
                  }}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all relative',
                    examMode === 'curated'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 hover:border-primary-200'
                  )}
                >
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-xs font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      NEW
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">Curated Mocks</span>
                  </div>
                  <div className="text-sm text-slate-600">Blueprint-balanced exams</div>
                </button>
              </div>

              {/* Exam Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">Strict Timing</div>
                    <div className="text-sm text-slate-500">
                      The clock continues running during breaks
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">No Pause</div>
                    <div className="text-sm text-slate-500">
                      Simulate real exam pressure and endurance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-medium">Testlet Structure</div>
                    <div className="text-sm text-slate-500">
                      Cannot return to previous testlets once submitted
                    </div>
                  </div>
                </div>
                {(examMode === 'mini-tbs' || examMode === 'full' || examMode === 'curated') && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <ClipboardCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium">Task-Based Simulations</div>
                      <div className="text-sm text-slate-500">
                        Includes realistic TBS like the actual CPA exam
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={startExam}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg"
              >
                {loading ? 'Preparing Exam...' : 'Begin Examination'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock Exam Selection Screen
  if (examState === 'mock-selection') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <button
            onClick={() => {
              setExamState('intro');
              setExamMode('mini');
            }}
            className="mb-6 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exam Options
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Curated Mock Exams</h1>
                  <p className="text-primary-100">
                    Blueprint-balanced exams for {currentSection}
                  </p>
                </div>
              </div>
              <p className="text-primary-100 text-sm">
                Each mock exam is carefully designed to match the AICPA Blueprint weights and question distribution.
              </p>
            </div>

            <div className="p-6">
              {availableMockExams.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No Mock Exams Available
                  </h3>
                  <p className="text-slate-500">
                    Mock exams for {currentSection} are coming soon!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableMockExams.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setSelectedMockExam(exam);
                      }}
                      className={clsx(
                        'w-full p-5 rounded-xl border-2 text-left transition-all',
                        selectedMockExam?.id === exam.id
                          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                          : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{exam.name}</h3>
                          <p className="text-sm text-slate-600">{exam.description}</p>
                        </div>
                        {exam.version !== 'both' && (
                          <span className={clsx(
                            'text-xs font-bold px-2 py-1 rounded',
                            exam.version === '2026' 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-blue-100 text-blue-700'
                          )}>
                            {exam.version} Blueprint
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.round(exam.totalTime / 3600)} hours
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {exam.testlets.filter(t => t.type === 'mcq').reduce((s, t) => s + t.questionCount, 0)} MCQs
                        </span>
                        <span className="flex items-center gap-1">
                          <ClipboardCheck className="w-3 h-3" />
                          {exam.testlets.filter(t => t.type === 'tbs').reduce((s, t) => s + t.questionCount, 0)} TBS
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Pass: {exam.passingScore}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedMockExam && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Blueprint Coverage
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {BLUEPRINT_WEIGHTS[currentSection]?.map((weight) => (
                      <div key={weight.area} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <span className="text-slate-600">{weight.area}:</span>
                        <span className="text-slate-900 font-medium">{weight.weight}%</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={startExam}
                    disabled={loading}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    {loading ? 'Preparing Exam...' : `Start ${selectedMockExam.name}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Break Screen
  if (examState === 'break') {
    const nextTestlet = examConfig.testlets[currentTestlet];
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Scheduled Break</h2>
          <p className="text-slate-300 mb-8">
            The timer is paused. Take a moment to rest your eyes and stretch.
          </p>

          <div className="bg-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <div className="text-sm text-slate-300 mb-2">Next Testlet</div>
            <div className="text-xl font-bold">
              {nextTestlet?.type === 'mcq'
                ? 'Multiple Choice Questions'
                : nextTestlet?.type === 'tbs'
                  ? 'Task-Based Simulations'
                  : 'Written Communication'}
            </div>
            {nextTestlet?.type === 'tbs' && (
              <p className="text-sm text-slate-400 mt-2">
                Apply your knowledge to realistic accounting scenarios
              </p>
            )}
          </div>

          <button
            onClick={() => {
              setExamState('exam');
              setStartTime(Date.now() - (examConfig.totalTime - timeLeft) * 1000); // Adjust start time
            }}
            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Resume Exam
          </button>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (examState === 'complete') {
    const results = calculateResults();
    const passed = results.percentage >= examConfig.passingScore;

    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Score Header */}
          <div className="text-center mb-8">
            <div
              className={clsx(
                'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl',
                passed ? 'bg-success-500' : 'bg-white'
              )}
            >
              {passed ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <Target className="w-12 h-12 text-error-500" />
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {passed ? 'Congratulations!' : 'Practice Complete'}
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              {passed
                ? 'You are showing exam-ready performance!'
                : 'Keep practicing to improve your score.'}
            </p>
            {selectedMockExam && (
              <p className="text-sm text-slate-500">{selectedMockExam.name}</p>
            )}
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Final Score
              </div>
              <div
                className="text-7xl font-bold mb-2"
                style={{
                  color:
                    results.percentage >= 75
                      ? '#34a853'
                      : results.percentage >= 50
                        ? '#fbbc04'
                        : '#ea4335',
                }}
              >
                {results.percentage}
              </div>
              <div className="text-slate-400">Target: {examConfig.passingScore}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span className="font-bold text-slate-900">{results.correct}</span>
                </div>
                <div className="text-xs text-slate-500">Correct MCQ</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-error-500" />
                  <span className="font-bold text-slate-900">{results.incorrect}</span>
                </div>
                <div className="text-xs text-slate-500">Incorrect MCQ</div>
              </div>
            </div>

            {/* TBS Score if applicable */}
            {tbsItems.length > 0 && (
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Score Breakdown
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-700">{results.mcqScore}%</div>
                    <div className="text-sm text-blue-600">MCQ Score</div>
                    <div className="text-xs text-blue-500 mt-1">
                      {results.correct}/{questions.length} correct
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-purple-700">{results.tbsScore}%</div>
                    <div className="text-sm text-purple-600">TBS Score</div>
                    <div className="text-xs text-purple-500 mt-1">
                      {Math.round(results.tbsCorrect || 0)}/{results.tbsTotal} requirements
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blueprint Breakdown */}
          {Object.keys(blueprintScores).length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Blueprint Area Performance
                </h3>
              </div>
              <div className="space-y-3">
                {Object.entries(blueprintScores)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([area, score]) => {
                    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                    const isWeak = pct < 60;
                    return (
                      <div key={area}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 font-medium">{area}</span>
                          <span className={clsx(
                            'font-bold',
                            pct >= 75 ? 'text-success-600' : pct >= 50 ? 'text-warning-600' : 'text-error-600'
                          )}>
                            {pct}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={clsx(
                              'h-full rounded-full transition-all',
                              pct >= 75 ? 'bg-success-500' : pct >= 50 ? 'bg-warning-500' : 'bg-error-500'
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {isWeak && (
                          <p className="text-xs text-error-600 mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Needs more practice
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button onClick={() => navigate('/practice')} className="btn-secondary flex-1">
              Done
            </button>
            <button onClick={() => setExamState('intro')} className="btn-secondary flex-1">
              Retake
            </button>
            <button onClick={() => navigate('/progress')} className="btn-primary flex-1">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Interface
  return (
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Exam Header */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-mono text-xl font-bold tracking-wider">{sectionInfo?.name}</div>
          <div className="h-6 w-px bg-white/20" />
          <div className="text-slate-300 text-sm">
            Testlet {currentTestlet + 1} of {examConfig.testlets.length}
            <span className="ml-2 px-2 py-0.5 bg-white/10 rounded text-xs">
              {currentTestletType === 'tbs' ? 'TBS' : 'MCQ'}
            </span>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div className="text-slate-300 text-sm">
            {currentTestletType === 'tbs' 
              ? `Task ${currentIndex + 1} of ${testletTBS.length}`
              : `Question ${currentIndex + 1} of ${testletQuestions.length}`
            }
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-mono font-bold tabular-nums">
            <Clock className={clsx('w-5 h-5', timeLeft < 300 && 'text-red-500 animate-pulse')} />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={clsx(
              'p-2 rounded hover:bg-white/10 transition-colors',
              showCalculator && 'bg-white/20'
            )}
            title="Calculator"
          >
            <Calculator className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Calculator Overlay */}
          {showCalculator && (
            <div className="absolute top-4 right-4 w-64 h-80 bg-slate-800 rounded-lg shadow-2xl z-50 border border-slate-700 flex flex-col">
              <div className="bg-slate-700 p-2 flex justify-between items-center rounded-t-lg cursor-move">
                <span className="text-xs text-slate-300 font-bold uppercase">Calculator</span>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center text-slate-500 text-sm italic">
                {/* Real calculator implementation would go here */}
                Basic Calculator
              </div>
            </div>
          )}

          {/* Question Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {currentTestletType === 'tbs' && currentTBS ? (
                /* TBS Rendering */
                <TBSRenderer
                  tbs={currentTBS}
                  answers={tbsAnswers[currentTBS.id] || {}}
                  onAnswerChange={(reqId: string, value: unknown) => handleTBSAnswerChange(currentTBS.id, reqId, value)}
                  isReview={false}
                />
              ) : (
                /* MCQ Rendering */
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-[400px] flex flex-col">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      Question {currentIndex + 1} / {testletQuestions.length}
                    </span>
                    <button
                      onClick={toggleFlag}
                      className={clsx(
                        'flex items-center gap-2 px-3 py-1 rounded transition-colors text-sm font-medium',
                        currentQuestion?.id && flagged.has(currentQuestion.id)
                          ? 'bg-warning-50 text-warning-700'
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      )}
                    >
                      <Flag
                        className={clsx(
                          'w-4 h-4',
                          currentQuestion?.id && flagged.has(currentQuestion.id) && 'fill-current'
                        )}
                      />
                      {currentQuestion?.id && flagged.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                    </button>
                  </div>
                  <div className="text-lg text-slate-900 leading-relaxed font-serif">
                    {currentQuestion?.question}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 flex-1">
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(currentQuestion?.options || (currentQuestion as any)?.choices || []).map(
                      (option: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(idx)}
                          className={clsx(
                            'w-full p-4 rounded border text-left transition-all flex items-start gap-4 group',
                            answers[currentQuestion?.id] === idx
                              ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600'
                              : 'border-slate-300 bg-white hover:border-primary-400 hover:shadow-sm'
                          )}
                        >
                          <span
                            className={clsx(
                              'w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5 transition-colors',
                              answers[currentQuestion?.id] === idx
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : 'border-slate-300 text-slate-500 group-hover:border-primary-400 group-hover:text-primary-600'
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-slate-800 pt-0.5">{option}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 shadow-lg shrink-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="btn-secondary flex items-center gap-2 pl-3 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-1 flex-wrap max-w-[400px] justify-center">
                {currentTestletType === 'tbs' ? (
                  /* TBS Navigation */
                  testletTBS.map((tbs, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={clsx(
                        'w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                        currentIndex === i
                          ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-2'
                          : Object.keys(tbsAnswers[tbs.id] || {}).length > 0
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                        flagged.has(tbs.id) && 'ring-2 ring-warning-400 z-10'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  /* MCQ Navigation */
                  testletQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={clsx(
                        'w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                        currentIndex === i
                          ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-2'
                          : answers[q.id] !== undefined
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                        flagged.has(q.id) && 'ring-2 ring-warning-400 z-10'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))
                )}
              </div>

              {currentIndex === (currentTestletType === 'tbs' ? testletTBS.length - 1 : testletQuestions.length - 1) ? (
                <button
                  onClick={handleNextTestlet}
                  className="btn-primary flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                >
                  {currentTestlet < examConfig.testlets.length - 1
                    ? 'Next Testlet'
                    : 'Submit Exam'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;
