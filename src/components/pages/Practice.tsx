import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import logger from '../../utils/logger';
import { scrollToTop } from '../../utils/scroll';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Flag,
  Clock,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Shuffle,
  Target,
  Loader2,
  Keyboard,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  Trophy,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  FileSpreadsheet,
  Brain,
  Zap,
  History,
  Home,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useSwipe } from '../../hooks/useSwipe';
import { useCourse } from '../../providers/CourseProvider';
import { fetchQuestions, getWeakAreaQuestions } from '../../services/questionService';
import { selectQuestionsFromEngine } from '../../services/adaptiveEngineAdapter';
import { getBlueprintForExamDate } from '../../config/blueprintConfig';
import { getExamDate } from '../../utils/profileHelpers';
import { getDefaultSection, getCurrentSectionForCourse } from '../../utils/sectionUtils';
import { getPracticeSessionsByCourse, savePracticeSession, PracticeSession } from '../../services/practiceHistoryService';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { BookmarkButton, NotesButton } from '../common/Bookmarks';
import { Question, ExamSection, Difficulty } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { shuffleQuestionOptions, ShuffledQuestion } from '../../utils/questionShuffle';
import { ShareNudge, shouldShowHighScoreNudge } from '../common/ShareNudge';
import { useNavigation } from '../navigation';
import { markActivityCompleted } from '../../services/dailyPlanPersistence';

// Question status filter options (like Becker)
type QuestionStatus = 'all' | 'unanswered' | 'incorrect' | 'correct';

interface SessionConfig {
  section: ExamSection;
  mode: 'study' | 'timed' | 'exam' | 'weak';
  count: number;
  topics: string[];
  difficulty: Difficulty | 'all';
  // New Becker-style filters
  questionStatus: QuestionStatus;
  blueprintArea: string;
  scoringMode: 'practice' | 'exam'; // Practice = immediate feedback, Exam = end only
}

interface AnswerState {
  selected: number;
  correct: boolean;
  time: number;
}

interface SessionSetupProps {
  onStart: (config: SessionConfig) => void;
  onResume?: () => void;
  hasSavedSession?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile: any;
  loading: boolean;
  userId?: string;
}

// Session Setup Component
const SessionSetup: React.FC<SessionSetupProps> = ({ onStart, onResume, hasSavedSession, userProfile, loading, userId }) => {
  const { course, courseId } = useCourse();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [, setHistoryLoading] = useState(true);
  const [config, setConfig] = useState<SessionConfig>({
    section: getCurrentSectionForCourse(userProfile?.examSection, courseId) as ExamSection,
    mode: 'study', // study, timed, exam, weak
    count: 10,
    topics: [],
    difficulty: 'all',
    questionStatus: 'all',
    blueprintArea: 'all',
    scoringMode: 'practice',
  });

  // Blueprint areas for current section (from active course context)
  const sectionConfig = course.sections.find(s => s.id === config.section);
  const blueprintAreas = sectionConfig?.blueprintAreas?.map(bp => ({ id: bp.id, name: bp.name })) || [];

  // Load practice history
  useEffect(() => {
    const loadHistory = async () => {
      if (!userId) {
        setHistoryLoading(false);
        return;
      }
      try {
        // Filter by courseId to only show sessions for the current course
        const sessions = await getPracticeSessionsByCourse(userId, courseId, 5);
        setPracticeHistory(sessions);
      } catch (error) {
        logger.error('Error loading practice history:', error);
      } finally {
        setHistoryLoading(false);
      }
    };
    loadHistory();
  }, [userId, courseId]);

  // Derive mode from toggles for backwards compatibility
  const derivedMode = config.mode === 'weak' ? 'weak' : (config.mode === 'timed' ? 'timed' : 'study');
  
  const handleStart = () => {
    // Map simplified UI to existing config structure
    const finalConfig: SessionConfig = {
      ...config,
      mode: derivedMode,
      // If weak areas toggle is on, filter to incorrect/unanswered
      questionStatus: config.mode === 'weak' ? 'incorrect' : config.questionStatus,
    };
    onStart(finalConfig);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Practice
        </h1>
      </div>

      <div className="card">
        <div className="card-body space-y-5">
          {/* Section Select - Compact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Section
            </label>
            <select
              value={config.section}
              onChange={(e) => setConfig((prev) => ({ ...prev, section: e.target.value as ExamSection, blueprintArea: 'all' }))}
              data-testid="section-select"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {course?.sections
                .filter((s: { id: string }) => s.id !== 'PREP')
                .map((s: { id: string; shortName: string; name: string }) => (
                <option key={s.id} value={s.id}>
                  {s.shortName} - {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Count - Simplified to 3 options */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Questions
            </label>
            <div className="flex items-center gap-3">
              {[10, 25, 50].map((count) => (
                <button
                  key={count}
                  onClick={() => setConfig((prev) => ({ ...prev, count }))}
                  data-testid={`question-count-${count}`}
                  className={clsx(
                    'flex-1 py-3 rounded-xl border-2 font-semibold text-lg transition-all focus:ring-2 focus:ring-primary-500/50',
                    config.count === count
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-300'
                  )}
                  aria-label={`${count} questions`}
                  aria-pressed={config.count === count}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Toggles */}
          <div className="space-y-3">
            {/* Timed Toggle */}
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={config.mode === 'timed'}
                onChange={(e) => setConfig((prev) => ({ 
                  ...prev, 
                  mode: e.target.checked ? 'timed' : 'study' 
                }))}
                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Timed</div>
                  <div className="text-xs text-slate-500">90 seconds per question</div>
                </div>
              </div>
            </label>

            {/* Weak Areas Toggle */}
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={config.questionStatus === 'incorrect' || config.questionStatus === 'unanswered'}
                onChange={(e) => setConfig((prev) => ({ 
                  ...prev, 
                  questionStatus: e.target.checked ? 'incorrect' : 'all'
                }))}
                className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-slate-500" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Focus on weak areas</div>
                  <div className="text-xs text-slate-500">Questions you've missed</div>
                </div>
              </div>
            </label>
          </div>

          {/* More Options Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            More options
          </button>

          {/* Advanced Options Panel */}
          {showAdvanced && (
            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              {/* Blueprint Area Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Blueprint Area
                </label>
                <select
                  value={config.blueprintArea}
                  onChange={(e) => setConfig((prev) => ({ ...prev, blueprintArea: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                >
                  <option value="all">All Areas</option>
                  {blueprintAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.id} - {area.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Question Status
                </label>
                <select
                  value={config.questionStatus}
                  onChange={(e) => setConfig((prev) => ({ ...prev, questionStatus: e.target.value as QuestionStatus }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                >
                  <option value="all">All Questions</option>
                  <option value="unanswered">Unanswered</option>
                  <option value="incorrect">Incorrect</option>
                  <option value="correct">Correct</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={config.difficulty}
                  onChange={(e) => setConfig((prev) => ({ ...prev, difficulty: e.target.value as Difficulty | 'all' }))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          )}

          {/* Resume Session Button - shows if there's a saved session */}
          {hasSavedSession && onResume && (
            <Button
              onClick={onResume}
              leftIcon={RotateCcw}
              variant="outline"
              size="lg"
              fullWidth
              className="py-4 text-lg border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30"
            >
              Resume Session
            </Button>
          )}

          {/* Start Button */}
          <Button
            onClick={handleStart}
            disabled={loading}
            loading={loading}
            leftIcon={loading ? undefined : Shuffle}
            variant="primary"
            size="lg"
            fullWidth
            className="py-4 text-lg"
            data-testid="start-practice"
          >
            {loading ? 'Loading...' : 'Start Practice'}
          </Button>
        </div>
      </div>

      {/* Attempts List - Like Becker */}
      {practiceHistory.length > 0 && (
        <div className="card mt-6">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">Attempts List</h2>
              </div>
            </div>

            <div className="space-y-3">
              {practiceHistory.map((session, index) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={clsx(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          session.mode === 'study' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                          session.mode === 'timed' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                          session.mode === 'exam' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                          session.mode === 'weak' && 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        )}>
                          {session.mode === 'study' ? 'Practice' : session.mode.charAt(0).toUpperCase() + session.mode.slice(1)}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {session.questionCount} questions
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {formatDistanceToNow(session.completedAt, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className={clsx(
                    'text-lg font-bold',
                    session.accuracy >= 75 ? 'text-success-600' : session.accuracy >= 50 ? 'text-warning-600' : 'text-error-600'
                  )}>
                    {session.accuracy}%
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 text-center">
              The Practice Test score is the percentage of questions you answered correctly.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

// Session Results Component - Shows score and recommends next steps
interface SessionResultsProps {
  questions: Question[];
  answers: Record<string, AnswerState>;
  elapsed: number;
  section: string;
  onContinue: () => void;
  onTryAgain: () => void;
  onPracticeWeak: () => void;
  onBackToDailyPlan?: () => void;
  fromDailyPlan?: boolean;
}

const SessionResults: React.FC<SessionResultsProps> = ({
  questions,
  answers,
  elapsed,
  section: _section,
  onContinue,
  onTryAgain,
  onPracticeWeak,
  onBackToDailyPlan,
  fromDailyPlan,
}) => {
  const navigate = useNavigate();
  const { course } = useCourse();
  
  // Calculate results
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(a => a.correct).length;
  const incorrectCount = answeredCount - correctCount;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const passed = accuracy >= 75;
  
  // Identify weak topics from wrong answers
  const wrongQuestions = questions.filter(q => answers[q.id] && !answers[q.id].correct);
  const weakTopics = [...new Set(wrongQuestions.map(q => q.topic || q.topicId || 'Unknown'))];
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  // Points earned (estimate)
  const pointsEarned = correctCount * 5 + answeredCount * 1;
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Score Card */}
        <Card variant="elevated" noPadding className="overflow-hidden mb-6">
          {/* Header */}
          <div className={clsx(
            'p-6 text-center text-white',
            passed ? 'bg-gradient-to-br from-success-500 to-success-600' : 'bg-gradient-to-br from-primary-500 to-primary-600'
          )}>
            <div className={clsx(
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3',
              passed ? 'bg-white/20' : 'bg-white/20'
            )}>
              {passed ? (
                <Trophy className="w-8 h-8" />
              ) : (
                <Target className="w-8 h-8" />
              )}
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {passed ? 'Great Work!' : 'Keep Going!'}
            </h1>
            <p className="text-white/80 text-sm">
              {passed 
                ? "You're building strong foundations!" 
                : "Every question helps you learn. Let's strengthen those weak areas."}
            </p>
          </div>
          
          {/* Score Display */}
          <div className="p-6 text-center border-b border-slate-200 dark:border-slate-700">
            <div 
              className="text-5xl font-bold mb-2"
              style={{ color: accuracy >= 75 ? '#22c55e' : accuracy >= 50 ? '#f59e0b' : '#ef4444' }}
            >
              {accuracy}%
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {correctCount} of {answeredCount} correct
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700">
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="w-4 h-4 text-success-500 mr-1" />
                <span className="text-xl font-bold text-success-600">{correctCount}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Correct</p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <XCircle className="w-4 h-4 text-error-500 mr-1" />
                <span className="text-xl font-bold text-error-600">{incorrectCount}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Incorrect</p>
            </div>
            <div className="p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-slate-600 mr-1" />
                <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{formatTime(elapsed)}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Time</p>
            </div>
          </div>
          
          {/* Points Earned */}
          <div className="px-6 py-4 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-500" />
              <span className="font-medium text-slate-700 dark:text-slate-300">Points Earned</span>
            </div>
            <span className="text-xl font-bold text-primary-600">+{pointsEarned}</span>
          </div>
        </Card>
        
        {/* Weak Areas (if any) */}
        {weakTopics.length > 0 && (
          <Card className="mb-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Focus Areas</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              Practice these topics to improve your score:
            </p>
            <div className="flex flex-wrap gap-2">
              {weakTopics.slice(0, 5).map((topic, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Card>
        )}
        
        {/* Recommended Next Steps */}
        <Card className="mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Continue Learning</h3>
          <div className="space-y-2">
            {/* Primary CTA - changes based on performance */}
            {weakTopics.length > 0 ? (
              <button
                onClick={onPracticeWeak}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900 dark:text-slate-100">Practice Weak Areas</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">15 questions on {weakTopics[0]}</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onContinue}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-success-50 dark:bg-success-900/30 hover:bg-success-100 dark:hover:bg-success-900/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-slate-900 dark:text-slate-100">Keep Practicing</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">You're doing great!</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-success-500 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            {/* Secondary options */}
            <div className="grid grid-cols-2 gap-2">
              {course?.hasTBS && (
              <button
                onClick={() => navigate('/tbs')}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Try TBS</span>
              </button>
              )}
              <button
                onClick={() => navigate('/flashcards')}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Brain className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Flashcards</span>
              </button>
            </div>
          </div>
        </Card>
        
        {/* Share Nudge — show after an exceptional score */}
        {shouldShowHighScoreNudge(accuracy) && (
          <div className="mb-6">
            <ShareNudge trigger="high_score" score={accuracy} />
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-3">
          {fromDailyPlan && onBackToDailyPlan ? (
            <>
              <Button
                onClick={onBackToDailyPlan}
                variant="primary"
                leftIcon={CheckCircle}
                className="flex-1"
              >
                Back to Daily Plan
              </Button>
              <Button
                onClick={onTryAgain}
                variant="secondary"
                leftIcon={RotateCcw}
                className="flex-1"
              >
                New Session
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/home')}
                variant="secondary"
                leftIcon={Home}
                className="flex-1"
              >
                Home
              </Button>
              <Button
                onClick={onTryAgain}
                variant="secondary"
                leftIcon={RotateCcw}
                className="flex-1"
              >
                New Session
              </Button>
              <Button
                onClick={() => navigate('/progress')}
                variant="primary"
                leftIcon={TrendingUp}
                className="flex-1"
              >
                View Progress
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, userProfile } = useAuth();
  const { recordMCQAnswer, logActivity } = useStudy();
  const { courseId, course } = useCourse();
  const { session: navSession, endSession: endNavSession } = useNavigation();
  
  // Check if coming from daily plan (URL params OR navigation session)
  const fromDailyPlanUrl = searchParams.get('from') === 'dailyplan';
  const fromDailyPlanNav = navSession.mode === 'daily-plan';
  const fromDailyPlan = fromDailyPlanUrl || fromDailyPlanNav;
  const activityId = searchParams.get('activityId') || navSession.activityId || null;
  const blueprintAreaParam = searchParams.get('blueprintArea');
  const subtopicParam = searchParams.get('subtopic'); // Specific topic from lesson
  const topicParam = searchParams.get('topic'); // Section/topic from daily plan (e.g., CIA1)
  const countParam = searchParams.get('count'); // Question count from URL

  // Session state
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  void sessionConfig; // Use to suppress unused warning
  const [inSession, setInSession] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Question state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Timer
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  
  // Report Issue state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<string>('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  
  // Ref for scrolling to top of question on navigation (mobile fix)
  const questionTopRef = useRef<HTMLDivElement>(null);
  
  // Track weak topics for targeted practice
  const [, setWeakTopicsFromSession] = useState<string[]>([]);

  // Ref to prevent cleanup from re-saving a session that was intentionally ended
  const sessionEndedRef = useRef(false);
  
  // Track the courseId this session was started with (prevents cross-course save on unmount)
  const sessionCourseRef = useRef<string | null>(null);

  // Note: sessionId removed - using 'practice' mode shuffle which is stable per user

  const currentQuestion: Question | undefined = questions[currentIndex];
  
  // Shuffle options for the current question to prevent B-bias gaming
  // Uses 'practice' mode: same user always sees same order for consistent learning
  const shuffledQuestion: ShuffledQuestion | undefined = useMemo(() => {
    if (!currentQuestion) return undefined;
    return shuffleQuestionOptions(currentQuestion, { userId: user?.uid, mode: 'practice' });
  }, [currentQuestion, user?.uid]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = currentAnswer !== undefined;

  // Session state persistence key
  const SESSION_STORAGE_KEY = 'voraprep-practice-session';

  // Save session state to sessionStorage (for returning after lesson/Vory)
  const saveSessionState = useCallback(() => {
    if (!inSession || questions.length === 0 || sessionEndedRef.current) return;
    
    // Prevent saving if the course changed since the session started
    // This fixes a race condition where unmount saves CISA questions with courseId='cma'
    const saveCourseId = sessionCourseRef.current || courseId;
    if (saveCourseId !== courseId) {
      logger.info(`Skipping session save: session course ${saveCourseId} !== current course ${courseId}`);
      return;
    }
    
    const sessionState = {
      courseId: saveCourseId, // Use the session's original course, not the potentially-changed context
      questions,
      currentIndex,
      answers,
      flagged: Array.from(flagged),
      startTime,
      elapsed,
      sessionConfig,
      savedAt: Date.now(),
    };
    
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionState));
    } catch (e) {
      logger.error('Error saving practice session:', e);
    }
  }, [inSession, questions, currentIndex, answers, flagged, startTime, elapsed, sessionConfig, courseId]);

  // Restore session state from sessionStorage
  const restoreSessionState = useCallback(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!saved) return false;
      
      const sessionState = JSON.parse(saved);
      
      // Check if session belongs to the current course
      if (sessionState.courseId && sessionState.courseId !== courseId) {
        // Clear sessions from a different course - don't let them linger
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        logger.info(`Cleared session from ${sessionState.courseId}: current course is ${courseId}`);
        return false;
      }
      
      // Check if session is still valid (less than 30 minutes old)
      const MAX_AGE = 30 * 60 * 1000; // 30 minutes
      if (Date.now() - sessionState.savedAt > MAX_AGE) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return false;
      }
      
      // Restore the state
      setQuestions(sessionState.questions);
      setCurrentIndex(sessionState.currentIndex);
      setAnswers(sessionState.answers);
      setFlagged(new Set(sessionState.flagged));
      setStartTime(sessionState.startTime);
      setElapsed(sessionState.elapsed);
      setSessionConfig(sessionState.sessionConfig);
      setInSession(true);
      
      // Determine if we need to show explanation for current answer
      const currentQ = sessionState.questions[sessionState.currentIndex];
      if (currentQ && sessionState.answers[currentQ.id]) {
        setSelectedAnswer(sessionState.answers[currentQ.id].selected);
        setShowExplanation(true);
      }
      
      // Clear the saved state
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      
      logger.info('Practice session restored');
      return true;
    } catch (e) {
      logger.error('Error restoring practice session:', e);
      return false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Check if there's a valid saved session (without consuming it)
  const hasSavedSession = useMemo(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!saved) return false;
      const sessionState = JSON.parse(saved);
      // Must match current course
      if (sessionState.courseId && sessionState.courseId !== courseId) return false;
      const MAX_AGE = 30 * 60 * 1000; // 30 minutes
      return Date.now() - sessionState.savedAt <= MAX_AGE;
    } catch {
      return false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Handler for manual resume from UI
  const handleManualResume = useCallback(() => {
    const restored = restoreSessionState();
    if (restored) {
      scrollToTop();
    }
  }, [restoreSessionState]);

  // Reset active session when course changes (prevent cross-course contamination)
  const prevCourseRef = useRef(courseId);
  useEffect(() => {
    if (prevCourseRef.current !== courseId) {
      prevCourseRef.current = courseId;
      
      // Always clear any saved session from a different course
      try {
        const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (saved) {
          const sessionState = JSON.parse(saved);
          if (sessionState.courseId && sessionState.courseId !== courseId) {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
            logger.info(`Cleared stale session for ${sessionState.courseId}`);
          }
        }
      } catch {
        // Ignore parse errors
      }
      
      // Always end the in-progress session — it belongs to a different course
      sessionEndedRef.current = true; // Prevent unmount from saving stale data
      sessionCourseRef.current = null; // Clear session course lock
      setInSession(false);
      setQuestions([]);
      setAnswers({});
      setCurrentIndex(0);
      setShowResults(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setFlagged(new Set());
      setShowShortcuts(false);
      logger.info(`Practice session reset: course changed to ${courseId}`);
    }
  }, [courseId, inSession]);

  // Try to restore session on mount or navigation
  useEffect(() => {
    if (!inSession && !loading && userProfile) {
      const restored = restoreSessionState();
      if (restored) {
        scrollToTop();
      }
    }
    // Run on mount and whenever we navigate back to this page (location.key changes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, location.key]);

  // Auto-save session on navigation away (beforeunload + component unmount)
  useEffect(() => {
    if (!inSession || questions.length === 0) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Save session state before tab/window close
      saveSessionState();
      // Show browser confirmation dialog
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Save session state when component unmounts (user navigates away via React Router)
      saveSessionState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inSession, questions.length, saveSessionState]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!inSession) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Answer selection (1-4 keys)
      if (!isAnswered && ['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = currentQuestion?.options || (currentQuestion as any)?.choices || [];
        if (index < options.length) {
          setSelectedAnswer(index);
          feedback.haptic('light');
        }
      }

      // Submit answer (Enter)
      if (e.key === 'Enter' && selectedAnswer !== null && !isAnswered) {
        e.preventDefault();
        handleSubmitAnswer();
      }

      // Next question (ArrowRight or N)
      if ((e.key === 'ArrowRight' || e.key === 'n') && isAnswered) {
        nextQuestion();
      }

      // Previous question (ArrowLeft or P)
      if ((e.key === 'ArrowLeft' || e.key === 'p') && currentIndex > 0) {
        prevQuestion();
      }

      // Flag question (F)
      if (e.key === 'f') {
        toggleFlag();
        feedback.haptic('light');
      }

      // Show/hide shortcuts (?)
      if (e.key === '?') {
        setShowShortcuts((s) => !s);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inSession, isAnswered, selectedAnswer, currentIndex, currentQuestion]); // Removed handleSubmitAnswer, nextQuestion, prevQuestion, toggleFlag to avoid loop, using refs or stable callbacks? They are stable if wrapped in useCallback.

  // But the dependencies are updated in the callbacks.
  // Actually, standard practice is to include them. The callbacks are wrapped in useCallback.

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inSession && startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inSession, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start a practice session
  const startSession = async (config: SessionConfig) => {
    setLoading(true);

    try {
      let fetchedQuestions: Question[];

      // Determine Blueprint Version based on user's exam date
      const section = userProfile?.examSection as string || getDefaultSection(courseId);
      const examDate = getExamDate(userProfile, section, courseId) || new Date();
      const blueprintVersion = getBlueprintForExamDate(examDate);
      const is2026 = blueprintVersion === '2026';

      if (config.mode === 'weak') {
        // Get questions from weak areas
        fetchedQuestions = await getWeakAreaQuestions(
          userProfile?.id || '',
          (userProfile?.examSection as ExamSection) || getDefaultSection(courseId),
          config.count
        );
      } else {
        // Normal fetch with filters
        // Prioritize section from config, fallback to URL param, then profile, then default
        const urlSection = searchParams.get('section') as ExamSection;
        const section = config.section || urlSection || (userProfile?.examSection as ExamSection) || getDefaultSection(courseId);
        
        // HR1 filter only applies to CPA REG/TCP sections (tax law updates)
        const applyHr1Filter = is2026 && courseId === 'cpa' && (section === 'REG' || section === 'TCP');

        // Determine if we should use the adaptive engine for question selection.
        // Use adaptive engine when:
        // - Mode is "study" (the default/adaptive mode)
        // - No specific subtopic or blueprint area filter (those are explicit user choices)
        // - No question-status filter (unanswered/incorrect/correct are explicit filters)
        // - User is authenticated
        const hasExplicitFilters = !!(subtopicParam || blueprintAreaParam ||
          (config.questionStatus && config.questionStatus !== 'all') ||
          (config.difficulty && config.difficulty !== 'all'));
        const shouldUseAdaptiveEngine = config.mode === 'study' && !hasExplicitFilters && !!userProfile?.id;
        
        if (shouldUseAdaptiveEngine) {
          // Use adaptive engine for intelligent question selection
          // First, load all questions for the section as candidates
          const allCandidates = await fetchQuestions({
            section,
            count: 500, // Load a large pool for the engine to select from
            hr1Only: applyHr1Filter,
            courseId,
          });

          // Let the adaptive engine pick the best questions
          fetchedQuestions = await selectQuestionsFromEngine(
            courseId as any,
            allCandidates,
            {
              section,
              count: config.count,
              prioritizeWeakAreas: true,
              includeReviewDue: true,
              examWeighted: false,
              difficulty: 'adaptive',
            }
          );

          // Fallback: if engine returned too few questions, fill with regular fetch
          if (fetchedQuestions.length < config.count) {
            const existingIds = new Set(fetchedQuestions.map(q => q.id));
            const fillQuestions = allCandidates
              .filter(q => !existingIds.has(q.id))
              .slice(0, config.count - fetchedQuestions.length);
            fetchedQuestions = [...fetchedQuestions, ...fillQuestions];
          }

          logger.debug(`Adaptive engine selected ${fetchedQuestions.length} questions for ${courseId}/${section}`);
        } else {
          // Use standard fetch with filters (explicit user choices, timed/exam modes)
          const shouldUseSmartSelection = config.mode === 'study' && !!userProfile?.id;
          const examDateStr = examDate ? examDate.toISOString().split('T')[0] : undefined;
          
          fetchedQuestions = await fetchQuestions({
            section,
            subtopic: subtopicParam || undefined,
            blueprintArea: !subtopicParam ? blueprintAreaParam || undefined : undefined,
            difficulty: config.difficulty !== 'all' ? config.difficulty : undefined,
            count: config.count,
            hr1Only: applyHr1Filter,
            mode: (config.mode === 'study' ? undefined : config.mode) as any,
            courseId,
            userId: userProfile?.id,
            useSmartSelection: shouldUseSmartSelection,
            examDate: examDateStr,
            questionStatus: config.questionStatus !== 'all' ? config.questionStatus as any : undefined,
          });
        }
      }

      setQuestions(fetchedQuestions);
      setSessionConfig(config);
      sessionEndedRef.current = false; // Allow saving for this new session
      sessionCourseRef.current = courseId; // Lock session to current course
      setInSession(true);
      setStartTime(Date.now());
      setCurrentIndex(0);
      setAnswers({});
      setSelectedAnswer(null);
      setShowExplanation(false);
      setFlagged(new Set());
      setLoading(false);
      // Scroll to top when entering question view
      scrollToTop();
    } catch (error) {
      logger.error('Error starting session:', error);
      setLoading(false);
    }
  };

  // Auto-start session if mode=weak OR blueprintArea/topic is specified (coming from lesson or daily plan)
  useEffect(() => {
    const mode = searchParams.get('mode');
    
    // Auto-start weak areas practice
    if (mode === 'weak' && userProfile && !inSession && !loading) {
      const section = (userProfile.examSection || getDefaultSection(courseId)) as ExamSection;
      startSession({
        section,
        mode: 'weak',
        count: 20,
        topics: [],
        difficulty: 'all',
        questionStatus: 'all',
        blueprintArea: 'all',
        scoringMode: 'practice',
      });
    }
    
    // Auto-start topic-specific practice when coming from a lesson (subtopic or blueprintArea)
    if ((subtopicParam || blueprintAreaParam) && userProfile && !inSession && !loading && mode !== 'weak') {
      const urlSection = searchParams.get('section') as ExamSection;
      const section = urlSection || (userProfile.examSection || getDefaultSection(courseId)) as ExamSection;
      
      startSession({
        section,
        mode: 'study',
        count: 10,
        topics: [],
        difficulty: 'all',
        questionStatus: 'all',
        blueprintArea: blueprintAreaParam || 'all',
        scoringMode: 'practice',
      });
    }
    
    // Auto-start section practice when coming from daily plan with topic param (e.g., topic=CIA1)
    if (topicParam && !subtopicParam && !blueprintAreaParam && userProfile && !inSession && !loading && mode !== 'weak') {
      const questionCount = countParam ? parseInt(countParam, 10) : 15;
      
      startSession({
        section: topicParam as ExamSection,
        mode: 'study',
        count: isNaN(questionCount) ? 15 : questionCount,
        topics: [],
        difficulty: 'all',
        questionStatus: 'all',
        blueprintArea: 'all',
        scoringMode: 'practice',
      });
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  // Handle answer selection
  const handleSelectAnswer = useCallback((answerIndex: number) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  }, [isAnswered]); // isAnswered depends on answers and currentIndex.

  // Submit answer
  const handleSubmitAnswer = useCallback(async () => {
    if (selectedAnswer === null || isAnswered || !currentQuestion || !shuffledQuestion) return;

    // Compare with shuffled correct answer (user sees shuffled options)
    const isCorrect = selectedAnswer === shuffledQuestion.shuffledCorrectAnswer;

    // Provide feedback
    if (isCorrect) {
      feedback.playSound('correct');
      feedback.haptic('success');
    } else {
      feedback.playSound('incorrect');
      feedback.haptic('error');
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: selectedAnswer,  // Store shuffled index for UI consistency
        correct: isCorrect,
        time: elapsed,
      },
    }));
    setShowExplanation(true);

    // Record in study provider using ORIGINAL answer index for accurate analytics
    if (recordMCQAnswer) {
      await recordMCQAnswer(
        currentQuestion.id,
        currentQuestion.topic,
        currentQuestion.subtopic,
        isCorrect,
        currentQuestion.difficulty,
        elapsed, // Pass time spent in seconds
        currentQuestion.section // Pass section for section-specific tracking
      );
    }
  }, [selectedAnswer, isAnswered, currentQuestion, shuffledQuestion, elapsed, recordMCQAnswer]);

  // Navigation
  const goToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(answers[questions[index]?.id]?.selected ?? null);
    setShowExplanation(answers[questions[index]?.id] !== undefined);
    
    // Blur any focused element first - prevents mobile browsers from auto-scrolling to focused buttons
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // Aggressive scroll-to-top for iOS Safari
    // Uses multiple methods and timing to overcome iOS's scroll restoration behavior
    const scrollToTopNow = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (questionTopRef.current) {
        questionTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    };
    
    // Immediate scroll
    scrollToTopNow();
    
    // Delayed scroll after React re-render (requestAnimationFrame is more reliable than setTimeout on iOS)
    requestAnimationFrame(() => {
      scrollToTopNow();
      // Double-tap for iOS Safari which sometimes needs extra time
      requestAnimationFrame(scrollToTopNow);
    });
    
    // Final fallback after a short delay for stubborn iOS behavior
    setTimeout(scrollToTopNow, 50);
  }, [answers, questions]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  }, [currentIndex, questions.length, goToQuestion]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  }, [currentIndex, goToQuestion]);

  // Swipe gestures for mobile navigation
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (isAnswered && currentIndex < questions.length - 1) {
        nextQuestion();
      }
    },
    onSwipeRight: () => {
      if (currentIndex > 0) {
        prevQuestion();
      }
    },
    threshold: 50,
    enabled: inSession && questions.length > 0,
  });

  // Toggle flag
  const toggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  }, [currentQuestion]);

  // Report issue handler
  const handleReportIssue = useCallback(async () => {
    if (!currentQuestion || !reportType) return;
    
    setReportSubmitting(true);
    setReportError(null);
    
    try {
      // Save report to Firestore for admin review
      const reportData = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question?.substring(0, 200), // First 200 chars for context
        section: sessionConfig?.section || currentQuestion.section,
        blueprintArea: currentQuestion.blueprintArea,
        type: reportType,
        details: reportDetails,
        reportedBy: user?.uid || 'anonymous',
        reportedByEmail: user?.email || 'anonymous',
        status: 'pending', // pending, reviewed, resolved, dismissed
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(db, 'questionReports'), reportData);
      
      logger.log('Question Issue Report saved:', reportData);
      
      if (logActivity) {
        logActivity('question_reported', {
          questionId: currentQuestion.id,
          reportType,
          details: reportDetails
        });
      }
      
      setReportSubmitted(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportType('');
        setReportDetails('');
        setReportSubmitted(false);
      }, 2000);
    } catch (error) {
      logger.error('Failed to submit report:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setReportError(`Failed to submit report: ${errorMessage}`);
    } finally {
      setReportSubmitting(false);
    }
  }, [currentQuestion, reportType, reportDetails, sessionConfig, logActivity, user?.uid, user?.email]);

  // End session - show results instead of going back to setup
  const endSession = () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    if (logActivity) {
      logActivity('practice_completed', {
        totalQuestions,
        answeredCount,
        correctCount,
        accuracy,
        totalTime: elapsed,
        details: undefined // or provide details if needed
      });
    }

    // Save practice session to history for Attempts List
    if (user?.uid && sessionConfig) {
      savePracticeSession(user.uid, {
        courseId,  // Include courseId to filter by course later
        section: sessionConfig.section,
        mode: sessionConfig.mode,
        questionCount: totalQuestions,
        correctCount,
        accuracy,
        timeSpentSeconds: elapsed,
        ...(sessionConfig.blueprintArea !== 'all' && { blueprintArea: sessionConfig.blueprintArea }),
        ...(sessionConfig.difficulty !== 'all' && { difficulty: sessionConfig.difficulty }),
      }).catch(err => logger.error('Failed to save practice session:', err));
    }

    // Identify weak topics from wrong answers
    const wrongQuestions = questions.filter(q => answers[q.id] && !answers[q.id].correct);
    const weakTopics = [...new Set(wrongQuestions.map(q => q.topic || q.topicId || 'Unknown'))];
    setWeakTopicsFromSession(weakTopics);

    // Mark session as intentionally ended (prevents cleanup from re-saving)
    sessionEndedRef.current = true;
    
    // Show results screen
    setInSession(false);
    setShowResults(true);
    
    // Clear any saved session — this one is complete
    try { sessionStorage.removeItem(SESSION_STORAGE_KEY); } catch { /* ignore */ }
  };
  
  // Reset and start new session
  const handleTryAgain = () => {
    sessionEndedRef.current = false; // Allow saving for the new session
    setShowResults(false);
    setSessionConfig(null);
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
    setElapsed(0);
    setWeakTopicsFromSession([]);
    try { sessionStorage.removeItem(SESSION_STORAGE_KEY); } catch { /* ignore */ }
  };
  
  // Auto-complete daily plan activity when results are shown
  useEffect(() => {
    if (showResults && fromDailyPlan && activityId && user?.uid) {
      // Mark the activity complete via the persistent service
      markActivityCompleted(
        user.uid,
        activityId,
        userProfile?.examSection || getDefaultSection(courseId),
        undefined,
        undefined,
        courseId
      ).catch(err => logger.error('Failed to auto-complete daily plan activity:', err));
      
      // Also save to legacy localStorage for DailyPlanCard to pick up
      const storageKey = `dailyplan_completed_${new Date().toISOString().split('T')[0]}`;
      try {
        const existing = localStorage.getItem(storageKey);
        const completed = existing ? JSON.parse(existing) : [];
        if (!completed.includes(activityId)) {
          completed.push(activityId);
          localStorage.setItem(storageKey, JSON.stringify(completed));
        }
      } catch { /* ignore */ }
    }
  }, [showResults, fromDailyPlan, activityId, user?.uid, userProfile?.examSection, courseId]);

  // Back to daily plan (marks activity complete)
  const handleBackToDailyPlan = () => {
    if (activityId) {
      // Save completion directly to localStorage
      const storageKey = `dailyplan_completed_${new Date().toISOString().split('T')[0]}`;
      try {
        const existing = localStorage.getItem(storageKey);
        const completed = existing ? JSON.parse(existing) : [];
        if (!completed.includes(activityId)) {
          completed.push(activityId);
          localStorage.setItem(storageKey, JSON.stringify(completed));
        }
      } catch (e) {
        logger.error('Failed to save daily plan completion:', e);
      }
    }
    
    // Navigate back with completion signal for DailyPlanCard
    const params = new URLSearchParams();
    params.set('from', 'dailyplan');
    if (activityId) params.set('activityId', activityId);
    params.set('completed', 'true');
    endNavSession();
    navigate(`/home?${params.toString()}`);
  };
  
  // Continue with more practice (same settings)
  const handleContinue = () => {
    setShowResults(false);
    setAnswers({});
    setCurrentIndex(0);
    setElapsed(0);
    // Restart with same config
    if (sessionConfig) {
      startSession(sessionConfig);
    } else {
      setSessionConfig(null);
    }
  };
  
  // Practice weak areas from this session
  const handlePracticeWeak = () => {
    setShowResults(false);
    setAnswers({});
    setCurrentIndex(0);
    setElapsed(0);
    // Navigate to weak area practice
    navigate('/practice?mode=weak');
  };

  // Results screen
  if (showResults) {
    return (
      <SessionResults
        questions={questions}
        answers={answers}
        elapsed={elapsed}
        section={userProfile?.examSection || getDefaultSection(courseId)}
        onContinue={handleContinue}
        onTryAgain={handleTryAgain}
        onPracticeWeak={handlePracticeWeak}
        onBackToDailyPlan={handleBackToDailyPlan}
        fromDailyPlan={fromDailyPlan}
      />
    );
  }

  // Session configuration screen
  if (!inSession) {
    return (
      <SessionSetup 
        onStart={startSession} 
        onResume={handleManualResume}
        hasSavedSession={hasSavedSession}
        userProfile={userProfile} 
        loading={loading} 
        userId={user?.uid} 
      />
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="practice-loading">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // No questions available for selected criteria
  if (questions.length === 0) {
    const statusLabels: Record<string, string> = {
      unanswered: 'unanswered',
      incorrect: 'previously incorrect',
      correct: 'previously correct',
    };
    const activeStatusFilter = sessionConfig?.questionStatus && sessionConfig.questionStatus !== 'all'
      ? statusLabels[sessionConfig.questionStatus]
      : null;

    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="practice-empty-state">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-slate-600 dark:text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Questions Available
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {activeStatusFilter
              ? `No ${activeStatusFilter} questions found for this section. Try changing the Question Status filter to "All Questions".`
              : 'There are no practice questions available for your selected section and criteria. Try adjusting your filters or selecting a different exam section.'}
          </p>
          <Button
            onClick={endSession}
            variant="primary"
          >
            Back to Setup
          </Button>
        </div>
      </div>
    );
  }

  // Shouldn't happen, but handle edge case
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50 dark:bg-slate-900 page-transition">
      {/* Topic indicator when practicing specific topic from lesson */}
      {(subtopicParam || blueprintAreaParam) && (
        <div className="bg-primary-50 dark:bg-primary-900/30 border-b border-primary-200 dark:border-primary-800 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-primary-700 dark:text-primary-300">
            <BookOpen className="w-4 h-4" />
            <span>Practicing topic: <strong>{subtopicParam || blueprintAreaParam}</strong></span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-primary-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Timer & Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{formatTime(elapsed)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-success-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {correctCount}/{answeredCount}
                </span>
              </div>
              <button
                onClick={() => setShowShortcuts(true)}
                className="hidden sm:flex items-center gap-1 text-sm text-slate-600 hover:text-slate-600 dark:hover:text-slate-300"
                title="Keyboard shortcuts"
              >
                <Keyboard className="w-4 h-4" />
              </button>
              <button
                onClick={endSession}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div 
        ref={questionTopRef} 
        className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full"
        {...swipeHandlers}
      >
        <div className="card mb-4">
          {/* Question Header */}
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  currentQuestion.difficulty === 'easy' && 'bg-green-100 text-green-700',
                  currentQuestion.difficulty === 'medium' && 'bg-amber-100 text-amber-700',
                  currentQuestion.difficulty === 'hard' && 'bg-red-100 text-red-700'
                )}
              >
                {currentQuestion.difficulty}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {currentQuestion.topic}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookmarkButton 
                itemId={currentQuestion.id} 
                itemType="question" 
                itemData={{ 
                  title: currentQuestion.question.slice(0, 100),
                  section: currentQuestion.section,
                  topic: currentQuestion.topic
                }}
                size="md"
              />
              <NotesButton 
                itemId={currentQuestion.id}
                itemData={{
                  section: currentQuestion.section,
                  topic: currentQuestion.topic
                }}
                size="md"
              />
              <button
                onClick={toggleFlag}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  flagged.has(currentQuestion.id)
                    ? 'bg-amber-100 text-amber-600'
                    : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-amber-500'
                )}
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="card-body">
            <p className="text-slate-900 dark:text-slate-100 text-lg leading-relaxed mb-6" data-testid="question-text">
              {currentQuestion.question}
            </p>

            {/* Answer Choices - Using shuffled options to prevent answer pattern gaming */}
            <div className="space-y-3">
              {(shuffledQuestion?.shuffledOptions || currentQuestion.options || []).map((choice: string, index: number) => {
                const isSelected = selectedAnswer === index;
                // Use shuffled correct answer for display
                const isCorrect = shuffledQuestion 
                  ? index === shuffledQuestion.shuffledCorrectAnswer 
                  : index === currentQuestion.correctAnswer;
                const showResult = isAnswered;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    data-testid={`answer-option-${index}`}
                    className={clsx(
                      'mcq-option w-full text-left',
                      !showResult && isSelected && 'mcq-option-selected',
                      showResult && isCorrect && 'mcq-option-correct',
                      showResult && isSelected && !isCorrect && 'mcq-option-incorrect',
                      isAnswered && 'mcq-option-disabled',
                      showResult && !isSelected && !isCorrect && 'opacity-60'
                    )}
                  >
                    {/* Choice Letter */}
                    <span className="mcq-option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-1 pt-0.5 text-slate-700 dark:text-slate-300">
                      {choice}
                    </span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-error-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                variant="primary"
                fullWidth
                className="mt-6 py-3"
                data-testid="submit-answer"
              >
                Submit Answer
              </Button>
            )}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="card mb-4">
            <div className="card-header flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Explanation</h3>
            </div>
            <div className="card-body">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
              
              {currentQuestion.reference && (
                <div className="mt-3 flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="p-1 bg-slate-200 dark:bg-slate-600 rounded">
                    <BookOpen className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Citation:</span>
                    <span className="font-mono text-primary-600 dark:text-primary-400">{currentQuestion.reference}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={() => {
                    // Save session state before navigating
                    saveSessionState();
                    // Navigate in same window - state will be restored on return
                    const questionText = currentQuestion?.question || '';
                    const correctAnswer = currentQuestion?.options?.[currentQuestion.correctAnswer] || '';
                    const context = encodeURIComponent(`I need help understanding this ${course.shortName} question:\n\nQuestion: ${questionText}\n\nCorrect Answer: ${correctAnswer}`);
                    navigate(`/ai-tutor?context=${context}&returnTo=/practice`);
                  }}
                  variant="secondary"
                  size="sm"
                  leftIcon={Sparkles}
                  className="hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
                >
                  Ask Vory to Explain
                </Button>
                <Button
                  onClick={() => {
                    // Save session state before navigating
                    saveSessionState();
                    // Navigate to lesson matrix filtered by section and blueprint area
                    // This gives users context to find the most relevant lesson
                    const section = currentQuestion.section?.toUpperCase() || getDefaultSection(courseId).toUpperCase();
                    const blueprintArea = currentQuestion.blueprintArea || '';
                    // Navigate to lesson matrix with filters for better discovery
                    const lessonUrl = `/lessons/matrix?section=${section}&blueprintArea=${blueprintArea}&returnTo=/practice`;
                    navigate(lessonUrl);
                  }}
                  variant="secondary"
                  size="sm"
                  leftIcon={BookOpen}
                >
                  Review Lessons
                </Button>
                <Button
                  onClick={() => setShowReportModal(true)}
                  variant="secondary"
                  size="sm"
                  leftIcon={AlertTriangle}
                  className="hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
                >
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Modal */}
        {showShortcuts && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowShortcuts(false)}
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-4">
                <Keyboard className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Keyboard Shortcuts
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Select answer</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    1-4
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Submit answer</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    Enter
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Next question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    → or N
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Previous question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    ← or P
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Flag question</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    F
                  </kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Show shortcuts</span>
                  <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-mono">
                    ?
                  </kbd>
                </div>
              </div>
              <Button onClick={() => setShowShortcuts(false)} variant="primary" fullWidth className="mt-4">
                Got it
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            variant="secondary"
            leftIcon={ChevronLeft}
          >
            Previous
          </Button>

          {/* Question Dots - scrollable to show all questions */}
          <div 
            className="flex-1 flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-hide"
            ref={(el) => {
              // Auto-scroll horizontally to keep current question dot visible
              // Use scrollLeft instead of scrollIntoView to avoid affecting page scroll on iOS
              if (el) {
                const activeBtn = el.children[currentIndex] as HTMLElement;
                if (activeBtn) {
                  const containerRect = el.getBoundingClientRect();
                  const btnRect = activeBtn.getBoundingClientRect();
                  if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
                    // Calculate scroll position to center the button
                    const scrollLeft = activeBtn.offsetLeft - (el.clientWidth / 2) + (activeBtn.clientWidth / 2);
                    el.scrollLeft = scrollLeft;
                  }
                }
              }
            }}
          >
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(index)}
                className={clsx(
                  'w-8 h-8 rounded-lg text-xs font-medium transition-colors flex-shrink-0',
                  currentIndex === index && 'bg-primary-500 text-white',
                  currentIndex !== index &&
                    answers[q.id]?.correct &&
                    'bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300',
                  currentIndex !== index &&
                    answers[q.id] &&
                    !answers[q.id].correct &&
                    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
                  currentIndex !== index &&
                    !answers[q.id] &&
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                )}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentIndex === questions.length - 1 ? (
            <Button
              onClick={endSession}
              variant="success"
              rightIcon={CheckCircle}
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              variant="primary"
              rightIcon={ChevronRight}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md mx-4 shadow-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {reportSubmitted ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                  Thank You!
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  Your report has been submitted.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Report an Issue
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Question ID: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">{currentQuestion.id}</code>
                </p>
                
                <div className="space-y-3 mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Issue Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'wrong-answer', label: 'Wrong Answer' },
                      { value: 'typo', label: 'Typo/Grammar' },
                      { value: 'unclear', label: 'Unclear Question' },
                      { value: 'outdated', label: 'Outdated Content' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setReportType(option.value)}
                        className={clsx(
                          'px-3 py-2 rounded-lg text-sm font-medium transition-colors border',
                          reportType === option.value
                            ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-300'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Additional Details (optional)
                  </label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Please describe the issue..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {reportError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
                    {reportError}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportError(null);
                    }}
                    variant="secondary"
                    className="flex-1"
                    disabled={reportSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReportIssue}
                    disabled={!reportType || reportSubmitting}
                    loading={reportSubmitting}
                    variant="primary"
                    className="flex-1"
                  >
                    {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
