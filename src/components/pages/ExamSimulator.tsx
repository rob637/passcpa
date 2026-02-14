import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import logger from '../../utils/logger';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHomePathFromLocation } from '../../utils/courseNavigation';
import '../../styles/prometric.css';
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
import { useCourse } from '../../providers/CourseProvider';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getSectionDisplayInfo, getCurrentSectionForCourse } from '../../utils/sectionUtils';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection, TBS } from '../../types';
import TBSRenderer from '../exam/TBSRenderer';
import { getShuffledIndices } from '../../utils/questionShuffle';
import { 
  getExamConfig, 
  getMiniExamConfig, 
  getExamDescription,
  ExamConfig,
} from '../../services/examService';
// Keep mock exam imports for blueprint weights and configurations
import { getMockExamsBySection, MockExamConfig, loadTestletTBS, BLUEPRINT_WEIGHTS } from '../../data/cpa/mock-exams';
import { getTBSBySection } from '../../data/cpa/tbs';

type ExamState = 'intro' | 'mock-selection' | 'exam' | 'break' | 'review' | 'complete';
type ExamMode = 'mini' | 'mini-tbs' | 'full' | 'curated';

const ExamSimulator: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseHome = getHomePathFromLocation(location.pathname);
  const { userProfile } = useAuth();
  const { completeSimulation } = useStudy();
  const { courseId, course } = useCourse();

  const [examState, setExamState] = useState<ExamState>('intro');
  const [examMode, setExamMode] = useState<ExamMode>('mini');
  const [usePrometricTheme, setUsePrometricTheme] = useState(false);
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

  // Session ID for deterministic option shuffling
  const [sessionId] = useState(() => `cpa-exam-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerRef = useRef<any>(null);
  // Ref for scrolling to top of question on navigation (mobile fix)
  const questionTopRef = useRef<HTMLDivElement>(null);
  // Use getCurrentSectionForCourse to ensure section is valid for this course
  const currentSection = getCurrentSectionForCourse(userProfile?.examSection, courseId) as ExamSection;
  const sectionInfo = getSectionDisplayInfo(currentSection, courseId);
  const availableMockExams = getMockExamsBySection(currentSection);
  
  // Determine exam config based on mode
  // Use course.passingScore to avoid hardcoded CPA-specific values
  const coursePassingScore = course?.passingScore ?? 75;
  const examConfig = useMemo(() => {
    let config: ExamConfig;
    if (examMode === 'curated' && selectedMockExam) {
      config = {
        testlets: selectedMockExam.testlets.map(t => ({
          type: t.type as 'mcq' | 'tbs' | 'wc',
          questions: t.questionCount,
          time: t.timeAllocation,
        })),
        totalTime: selectedMockExam.totalTime,
        passingScore: selectedMockExam.passingScore,
      };
    } else if (examMode === 'mini-tbs') {
      // Mini exam with TBS for courses that support TBS
      const miniConfig = getMiniExamConfig(courseId, coursePassingScore);
      if (course?.hasTBS) {
        // Add TBS testlet if not already included
        const hasTbsTestlet = miniConfig.testlets.some(t => t.type === 'tbs');
        if (!hasTbsTestlet) {
          config = {
            ...miniConfig,
            testlets: [
              { type: 'mcq', questions: 12, time: 15 * 60 },
              { type: 'mcq', questions: 12, time: 15 * 60 },
              { type: 'tbs', questions: 2, time: 20 * 60 },
            ],
            totalTime: 50 * 60,
          };
        } else {
          config = miniConfig;
        }
      } else {
        // No TBS for this course, just use mini
        config = getMiniExamConfig(courseId, coursePassingScore);
      }
    } else if (examMode === 'full') {
      config = getExamConfig(courseId, currentSection);
    } else {
      // Default mini exam
      config = getMiniExamConfig(courseId, coursePassingScore);
    }
    // Override passing score with course-specific value
    return { ...config, passingScore: coursePassingScore };
  }, [examMode, selectedMockExam, currentSection, coursePassingScore, courseId, course?.hasTBS]);

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

  // Shuffled options for current MCQ question
  const shuffledCurrentQuestion = useMemo(() => {
    if (!currentQuestion) return null;
    const options = currentQuestion.options || [];
    if (options.length < 2) {
      return { shuffledOptions: options, reverseMap: options.map((_, i) => i), shuffledCorrectAnswer: currentQuestion.correctAnswer };
    }
    const seed = `${currentQuestion.id}-${sessionId}`;
    const shuffledIndices = getShuffledIndices(options.length, seed);
    const shuffledOptions = shuffledIndices.map(i => options[i]);
    const shuffledCorrectAnswer = shuffledIndices.indexOf(currentQuestion.correctAnswer);
    return { shuffledOptions, reverseMap: shuffledIndices, shuffledCorrectAnswer };
  }, [currentQuestion, sessionId]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = useCallback((shuffledIndex: number) => {
    if (!currentQuestion || !shuffledCurrentQuestion) return;
    // Translate shuffled index back to original index for storage
    const originalIndex = shuffledCurrentQuestion.reverseMap[shuffledIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: originalIndex }));
    feedback.tap();
  }, [currentQuestion, shuffledCurrentQuestion]);

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

  // Helper to scroll to top of question (mobile fix)
  const scrollToQuestionTop = useCallback(() => {
    if (questionTopRef.current) {
      questionTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Navigate to a specific question and scroll to top
  const goToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    scrollToQuestionTop();
  }, [scrollToQuestionTop]);

  const handleNext = useCallback(() => {
    const maxIndex = currentTestletType === 'tbs' ? testletTBS.length - 1 : testletQuestions.length - 1;
    if (currentIndex < maxIndex) {
      setCurrentIndex((i) => i + 1);
      scrollToQuestionTop();
    }
    feedback.click();
  }, [currentIndex, testletQuestions.length, testletTBS.length, currentTestletType, scrollToQuestionTop]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      scrollToQuestionTop();
    }
    feedback.tap();
  }, [currentIndex, scrollToQuestionTop]);

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

    // Combined scoring (MCQ ~50%, TBS ~50% per exam blueprint weighting)
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <button
            onClick={() => navigate(courseHome)}
            className="mb-6 flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
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
              <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">Select Exam Type</h3>
              <div className={clsx('grid gap-4 mb-6', course?.hasTBS ? 'grid-cols-2' : 'grid-cols-2')}>
                <button
                  onClick={() => setExamMode('mini')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'mini'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-200 dark:hover:border-primary-400'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span className="font-bold text-slate-900 dark:text-white">Mini Exam</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">50 mins • 36 MCQs</div>
                </button>
                {course?.hasTBS && (
                <button
                  onClick={() => setExamMode('mini-tbs')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'mini-tbs'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-200 dark:hover:border-primary-400'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ClipboardCheck className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span className="font-bold text-slate-900 dark:text-white">Mini + TBS</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">50 mins • 24 MCQs + 2 TBS</div>
                </button>
                )}
                <button
                  onClick={() => setExamMode('full')}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    examMode === 'full'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-200 dark:hover:border-primary-400'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span className="font-bold text-slate-900 dark:text-white">Full Exam</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">{getExamDescription(courseId, currentSection)}</div>
                </button>
                <button
                  onClick={() => {
                    setExamMode('curated');
                    setExamState('mock-selection');
                  }}
                  className={clsx(
                    'p-4 rounded-xl border-2 text-left transition-all relative',
                    examMode === 'curated'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-slate-200 dark:border-slate-600 hover:border-primary-200 dark:hover:border-primary-400'
                  )}
                >
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-xs font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      NEW
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span className="font-bold text-slate-900 dark:text-white">Curated Mocks</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Blueprint-balanced exams</div>
                </button>
              </div>

              {/* Exam Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="font-medium">Strict Timing</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      The clock continues running during breaks
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="font-medium">No Pause</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Simulate real exam pressure and endurance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <div className="font-medium">Testlet Structure</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Cannot return to previous testlets once submitted
                    </div>
                  </div>
                </div>
                {(examMode === 'mini-tbs' || examMode === 'full' || examMode === 'curated') && (
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                      <ClipboardCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium">Task-Based Simulations</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Includes realistic TBS like the actual {course?.shortName || 'professional'} exam
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Prometric Theme Toggle - Desktop Only */}
              <div className="hidden md:block mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                      <span className="text-slate-300 text-xs font-bold">WIN</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Prometric Interface Mode</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        Practice with the exact look of the real exam
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={usePrometricTheme}
                      onChange={(e) => setUsePrometricTheme(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
                {usePrometricTheme && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                    <strong>Heads up:</strong> The Prometric interface uses a dated 1990s aesthetic that matches the real {course?.shortName || 'professional'} exam testing center. This helps reduce test-day anxiety by familiarizing you with the actual testing environment.
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <button
            onClick={() => {
              setExamState('intro');
              setExamMode('mini');
            }}
            className="mb-6 flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Exam Options
          </button>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
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
                Each mock exam is carefully designed to match the {course?.metadata?.examProvider || 'official'} Blueprint weights and question distribution.
              </p>
            </div>

            <div className="p-6">
              {availableMockExams.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No Mock Exams Available
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
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
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-200 dark:ring-primary-800'
                          : 'border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg">{exam.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{exam.description}</p>
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
                      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-xs text-slate-600 dark:text-slate-300 mt-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.round(exam.totalTime / 3600)}h
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
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                  <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
                    Blueprint Coverage
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {BLUEPRINT_WEIGHTS[currentSection]?.map((weight) => (
                      <div key={weight.area} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <span className="text-slate-600 dark:text-slate-300">{weight.area}:</span>
                        <span className="text-slate-900 dark:text-white font-medium">{weight.weight}%</span>
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
    
    // Prometric Break Screen
    if (usePrometricTheme) {
      return (
        <div className="prometric-break">
          <div className="prometric-break-box">
            <div className="prometric-break-title">Scheduled Break</div>
            <div className="prometric-break-content">
              <div className="prometric-break-icon">⏸</div>
              <div className="prometric-break-heading">Break Time</div>
              <div className="prometric-break-text">
                The exam timer has been paused. Take a moment to rest your eyes and stretch before continuing.
              </div>
              <div className="prometric-break-next">
                <strong>Next Section:</strong><br />
                {nextTestlet?.type === 'mcq'
                  ? 'Multiple Choice Questions'
                  : nextTestlet?.type === 'tbs'
                    ? 'Task-Based Simulations'
                    : 'Written Communication'}
              </div>
              <button
                onClick={() => {
                  setExamState('exam');
                  setStartTime(Date.now() - (examConfig.totalTime - timeLeft) * 1000);
                }}
                className="prometric-break-btn"
              >
                Resume Examination
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    // Modern Break Screen
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
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Apply your knowledge to realistic accounting scenarios
              </p>
            )}
          </div>

          <button
            onClick={() => {
              setExamState('exam');
              setStartTime(Date.now() - (examConfig.totalTime - timeLeft) * 1000); // Adjust start time
            }}
            className="w-full py-4 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
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

    // Prometric Results Screen
    if (usePrometricTheme) {
      return (
        <div className="prometric-theme prometric-results">
          <div className="prometric-results-window">
            <div className="prometric-results-titlebar">
              <span>Examination Results - {selectedMockExam?.name || 'Mock Exam'}</span>
              <div className="prometric-titlebar-buttons">
                <button className="prometric-titlebar-btn">_</button>
                <button className="prometric-titlebar-btn">□</button>
                <button className="prometric-titlebar-btn">×</button>
              </div>
            </div>
            <div className="prometric-results-content">
              <div className="prometric-results-header">
                <div className="prometric-score-display">
                  <div className="prometric-score-label">Final Score</div>
                  <div className={clsx(
                    'prometric-score-value',
                    passed ? 'passing' : 'failing'
                  )}>
                    {results.percentage}
                  </div>
                  <div className="prometric-score-target">
                    Passing Score: {examConfig.passingScore}
                  </div>
                </div>
                <div className={clsx(
                  'prometric-result-status',
                  passed ? 'pass' : 'fail'
                )}>
                  {passed ? '✓ CREDIT' : '✗ NO CREDIT'}
                </div>
              </div>

              <div className="prometric-results-divider" />

              <div className="prometric-results-section">
                <div className="prometric-section-title">Score Summary</div>
                <table className="prometric-results-table">
                  <tbody>
                    <tr>
                      <td>Multiple Choice Correct:</td>
                      <td>{results.correct} of {questions.length}</td>
                    </tr>
                    <tr>
                      <td>Multiple Choice Score:</td>
                      <td>{results.mcqScore}%</td>
                    </tr>
                    {tbsItems.length > 0 && (
                      <>
                        <tr>
                          <td>Task-Based Simulations:</td>
                          <td>{Math.round(results.tbsCorrect || 0)} of {results.tbsTotal} requirements</td>
                        </tr>
                        <tr>
                          <td>TBS Score:</td>
                          <td>{results.tbsScore}%</td>
                        </tr>
                      </>
                    )}
                    <tr className="prometric-results-total">
                      <td>Weighted Score:</td>
                      <td>{results.percentage}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {Object.keys(blueprintScores).length > 0 && (
                <>
                  <div className="prometric-results-divider" />
                  <div className="prometric-results-section">
                    <div className="prometric-section-title">Performance by Content Area</div>
                    <table className="prometric-results-table">
                      <thead>
                        <tr>
                          <th>Content Area</th>
                          <th>Correct</th>
                          <th>%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(blueprintScores)
                          .sort(([a], [b]) => a.localeCompare(b))
                          .map(([area, score]) => {
                            const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                            return (
                              <tr key={area}>
                                <td>{area}</td>
                                <td>{score.correct}/{score.total}</td>
                                <td className={pct < 60 ? 'weak' : ''}>{pct}%</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="prometric-results-divider" />

              <div className="prometric-results-actions">
                <button onClick={() => navigate('/practice')} className="prometric-btn">
                  Exit
                </button>
                <button onClick={() => setExamState('intro')} className="prometric-btn">
                  Retake Exam
                </button>
                <button onClick={() => navigate('/progress')} className="prometric-btn prometric-btn-primary">
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Modern Results Screen
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Score Header */}
          <div className="text-center mb-8">
            <div
              className={clsx(
                'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl',
                passed ? 'bg-success-500' : 'bg-white dark:bg-slate-700'
              )}
            >
              {passed ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <Target className="w-12 h-12 text-error-500" />
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {passed ? 'Congratulations!' : 'Practice Complete'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              {passed
                ? 'You are showing exam-ready performance!'
                : 'Keep practicing to improve your score.'}
            </p>
            {selectedMockExam && (
              <p className="text-sm text-slate-600 dark:text-slate-400">{selectedMockExam.name}</p>
            )}
          </div>

          {/* Score Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
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
              <div className="text-slate-600 dark:text-slate-300">Target: {examConfig.passingScore}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-success-500" />
                  <span className="font-bold text-slate-900 dark:text-white">{results.correct}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">Correct MCQ</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-error-500" />
                  <span className="font-bold text-slate-900 dark:text-white">{results.incorrect}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">Incorrect MCQ</div>
              </div>
            </div>

            {/* TBS Score if applicable */}
            {tbsItems.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-600 pt-6 mt-6">
                <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">
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
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-primary-700">{results.tbsScore}%</div>
                    <div className="text-sm text-primary-600">TBS Score</div>
                    <div className="text-xs text-primary-500 mt-1">
                      {Math.round(results.tbsCorrect || 0)}/{results.tbsTotal} requirements
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blueprint Breakdown */}
          {Object.keys(blueprintScores).length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
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
                          <span className="text-slate-700 dark:text-slate-200 font-medium">{area}</span>
                          <span className={clsx(
                            'font-bold',
                            pct >= 75 ? 'text-success-600' : pct >= 50 ? 'text-warning-600' : 'text-error-600'
                          )}>
                            {pct}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
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
  // Prometric Theme Interface
  if (usePrometricTheme) {
    return (
      <div className="prometric-theme h-screen flex flex-col overflow-hidden">
        {/* Prometric Header - Windows-style title bar */}
        <div className="prometric-header">
          <div className="prometric-header-title">
            <span className="prometric-header-section">{currentSection} - {sectionInfo?.name}</span>
            <div className="prometric-header-divider" />
            <span className="prometric-header-info">
              Testlet {currentTestlet + 1} of {examConfig.testlets.length} ({currentTestletType === 'tbs' ? 'Task-Based Simulation' : 'Multiple Choice'})
            </span>
          </div>
          <div className="prometric-header-right">
            <div className={clsx('prometric-timer', timeLeft < 300 && 'warning')}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Prometric Toolbar */}
        <div className="prometric-toolbar">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={clsx('prometric-toolbar-btn', showCalculator && 'active')}
          >
            <Calculator className="w-4 h-4" />
            Calculator
          </button>
          <div className="prometric-toolbar-separator" />
          <button
            onClick={toggleFlag}
            className={clsx('prometric-toolbar-btn', currentQuestion?.id && flagged.has(currentQuestion.id) && 'active')}
          >
            <Flag className="w-4 h-4" />
            {currentQuestion?.id && flagged.has(currentQuestion.id) ? 'Unflag' : 'Flag'}
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-600">
            {currentTestletType === 'tbs' 
              ? `Task ${currentIndex + 1} of ${testletTBS.length}`
              : `Question ${currentIndex + 1} of ${testletQuestions.length}`
            }
          </span>
        </div>

        {/* Main Content */}
        <div ref={questionTopRef} className="prometric-content flex-1">
          <div className="prometric-main relative">
            {/* Calculator Overlay */}
            {showCalculator && (
              <div className="prometric-calculator">
                <div className="prometric-calculator-title">
                  <span>Calculator</span>
                  <button className="prometric-calculator-close" onClick={() => setShowCalculator(false)}>×</button>
                </div>
                <div className="prometric-calculator-display">0</div>
                <div className="prometric-calculator-buttons">
                  {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                    <button 
                      key={btn} 
                      className={clsx(
                        'prometric-calc-btn',
                        ['+','-','*','/'].includes(btn) && 'operator',
                        btn === '=' && 'equals'
                      )}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentTestletType === 'tbs' && currentTBS ? (
              /* TBS Rendering in Prometric style */
              <div className="prometric-tbs-container">
                <div className="prometric-tbs-tabs">
                  <button className="prometric-tbs-tab active">Instructions</button>
                  <button className="prometric-tbs-tab">Resources</button>
                </div>
                <div className="prometric-tbs-content">
                  <TBSRenderer
                    tbs={currentTBS}
                    answers={tbsAnswers[currentTBS.id] || {}}
                    onAnswerChange={(reqId: string, value: unknown) => handleTBSAnswerChange(currentTBS.id, reqId, value)}
                    isReview={false}
                  />
                </div>
              </div>
            ) : (
              /* MCQ Rendering in Prometric style */
              <>
                <div className="prometric-question-header">
                  <span className="prometric-question-number">
                    Question {currentIndex + 1} of {testletQuestions.length}
                  </span>
                  <button
                    onClick={toggleFlag}
                    className={clsx(
                      'prometric-flag-btn',
                      currentQuestion?.id && flagged.has(currentQuestion.id) && 'flagged'
                    )}
                  >
                    <Flag className="w-3 h-3" />
                    {currentQuestion?.id && flagged.has(currentQuestion.id) ? 'Flagged for Review' : 'Flag for Review'}
                  </button>
                </div>

                <div className="prometric-question-body">
                  <div className="prometric-question-text">
                    {currentQuestion?.question}
                  </div>

                  <div className="prometric-options">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(shuffledCurrentQuestion?.shuffledOptions || []).map(
                      (option: string, idx: number) => {
                        const originalIdx = shuffledCurrentQuestion?.reverseMap[idx];
                        return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(idx)}
                          className={clsx(
                            'prometric-option',
                            currentQuestion?.id && answers[currentQuestion.id] === originalIdx && 'selected'
                          )}
                        >
                          <span className="prometric-option-letter">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="prometric-option-text">{option}</span>
                        </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Prometric Navigation */}
        <div className="prometric-nav">
          <div className="prometric-nav-buttons">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="prometric-nav-btn"
            >
              « Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === (currentTestletType === 'tbs' ? testletTBS.length - 1 : testletQuestions.length - 1)}
              className="prometric-nav-btn"
            >
              Next »
            </button>
          </div>

          {/* Question Grid */}
          <div className="prometric-question-grid">
            {currentTestletType === 'tbs' ? (
              testletTBS.map((tbs, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={clsx(
                    'prometric-grid-btn',
                    currentIndex === i && 'current',
                    Object.keys(tbsAnswers[tbs.id] || {}).length > 0 && 'answered',
                    flagged.has(tbs.id) && 'flagged'
                  )}
                >
                  {i + 1}
                </button>
              ))
            ) : (
              testletQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => goToQuestion(i)}
                  className={clsx(
                    'prometric-grid-btn',
                    currentIndex === i && 'current',
                    answers[q.id] !== undefined && 'answered',
                    flagged.has(q.id) && 'flagged'
                  )}
                >
                  {i + 1}
                </button>
              ))
            )}
          </div>

          <div className="prometric-nav-buttons">
            {currentIndex === (currentTestletType === 'tbs' ? testletTBS.length - 1 : testletQuestions.length - 1) ? (
              <button
                onClick={handleNextTestlet}
                className="prometric-nav-btn primary"
              >
                {currentTestlet < examConfig.testlets.length - 1
                  ? 'Submit Testlet »'
                  : 'Submit Exam »'}
              </button>
            ) : (
              <button onClick={handleNext} className="prometric-nav-btn primary">
                Next »
              </button>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="prometric-status">
          <div className="prometric-status-left">
            <div className="prometric-status-item">
              <div className="prometric-status-indicator answered" />
              <span>Answered</span>
            </div>
            <div className="prometric-status-item">
              <div className="prometric-status-indicator flagged" />
              <span>Flagged</span>
            </div>
            <div className="prometric-status-item">
              <div className="prometric-status-indicator unanswered" />
              <span>Unanswered</span>
            </div>
          </div>
          <span>
            Answered: {currentTestletType === 'tbs' 
              ? Object.keys(tbsAnswers).filter(id => testletTBS.some(t => t.id === id)).length 
              : Object.keys(answers).filter(id => testletQuestions.some(q => q.id === id)).length
            } of {currentTestletType === 'tbs' ? testletTBS.length : testletQuestions.length}
          </span>
        </div>
      </div>
    );
  }

  // Modern Theme Interface (existing)
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
                  className="text-slate-600 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center text-slate-600 text-sm italic">
                {/* Real calculator implementation would go here */}
                Basic Calculator
              </div>
            </div>
          )}

          {/* Question Area */}
          <div ref={!usePrometricTheme ? questionTopRef : undefined} className="flex-1 overflow-y-auto p-6">
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
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 min-h-[400px] flex flex-col">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      Question {currentIndex + 1} / {testletQuestions.length}
                    </span>
                    <button
                      onClick={toggleFlag}
                      className={clsx(
                        'flex items-center gap-2 px-3 py-1 rounded transition-colors text-sm font-medium',
                        currentQuestion?.id && flagged.has(currentQuestion.id)
                          ? 'bg-warning-50 text-warning-700'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-200'
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
                  <div className="text-lg text-slate-900 dark:text-white leading-relaxed font-serif">
                    {currentQuestion?.question}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-900 flex-1">
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(shuffledCurrentQuestion?.shuffledOptions || []).map(
                      (option: string, idx: number) => {
                        const originalIdx = shuffledCurrentQuestion?.reverseMap[idx];
                        return (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(idx)}
                          className={clsx(
                            'w-full p-4 rounded border text-left transition-all flex items-start gap-4 group',
                            currentQuestion?.id && answers[currentQuestion.id] === originalIdx
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-600'
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-primary-400 dark:hover:border-primary-400 hover:shadow-sm'
                          )}
                        >
                          <span
                            className={clsx(
                              'w-6 h-6 rounded-full border flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5 transition-colors',
                              currentQuestion?.id && answers[currentQuestion.id] === originalIdx
                                ? 'border-primary-600 bg-primary-600 text-white'
                                : 'border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-300 group-hover:border-primary-400 group-hover:text-primary-600'
                            )}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-slate-800 dark:text-slate-100 pt-0.5">{option}</span>
                        </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-6 py-4 shadow-lg shrink-0 z-10">
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
                      onClick={() => goToQuestion(i)}
                      className={clsx(
                        'w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                        currentIndex === i
                          ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-2 dark:ring-offset-slate-800'
                          : Object.keys(tbsAnswers[tbs.id] || {}).length > 0
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-500',
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
                      onClick={() => goToQuestion(i)}
                      className={clsx(
                        'w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all',
                        currentIndex === i
                          ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-2 dark:ring-offset-slate-800'
                          : answers[q.id] !== undefined
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-500',
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
