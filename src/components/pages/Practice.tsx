import React, { useState, useEffect, useCallback, useRef } from 'react';
import logger from '../../utils/logger';
import { scrollToTop } from '../../utils/scroll';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useSwipe } from '../../hooks/useSwipe';
import { useCourse } from '../../providers/CourseProvider';
import { fetchQuestions, getWeakAreaQuestions } from '../../services/questionService';
import { CPA_SECTIONS } from '../../config/examConfig';
import { CPA_COURSE } from '../../courses/cpa/config';
import { getBlueprintForExamDate } from '../../config/blueprintConfig';
import { getPracticeSessions, savePracticeSession, PracticeSession } from '../../services/practiceHistoryService';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { BookmarkButton, NotesButton } from '../common/Bookmarks';
import { Question, ExamSection, Difficulty } from '../../types';
import { formatDistanceToNow } from 'date-fns';

// Question status filter options (like Becker)
type QuestionStatus = 'all' | 'unanswered' | 'incorrect' | 'correct' | 'flagged';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile: any;
  loading: boolean;
  userId?: string;
}

// Session Setup Component
const SessionSetup: React.FC<SessionSetupProps> = ({ onStart, userProfile, loading, userId }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);
  const [, setHistoryLoading] = useState(true);
  const [config, setConfig] = useState<SessionConfig>({
    section: (userProfile?.examSection || 'REG') as ExamSection,
    mode: 'study', // study, timed, exam, weak
    count: 10,
    topics: [],
    difficulty: 'all',
    questionStatus: 'all',
    blueprintArea: 'all',
    scoringMode: 'practice',
  });

  // Blueprint areas for current section
  const sectionConfig = CPA_COURSE.sections.find(s => s.id === config.section);
  const blueprintAreas = sectionConfig?.blueprintAreas?.map(bp => ({ id: bp.id, name: bp.name })) || [];

  // Load practice history
  useEffect(() => {
    const loadHistory = async () => {
      if (!userId) {
        setHistoryLoading(false);
        return;
      }
      try {
        const sessions = await getPracticeSessions(userId, 5);
        setPracticeHistory(sessions);
      } catch (error) {
        logger.error('Error loading practice history:', error);
      } finally {
        setHistoryLoading(false);
      }
    };
    loadHistory();
  }, [userId]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Practice Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Configure your practice session</p>
      </div>

      <div className="card">
        <div className="card-body space-y-6">
          {/* Section Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Exam Section
            </label>
            <select
              value={config.section}
              onChange={(e) => setConfig((prev) => ({ ...prev, section: e.target.value as ExamSection, blueprintArea: 'all' }))}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(CPA_SECTIONS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.shortName} - {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Practice Mode - Now 2x2 Grid like Becker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Practice Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'study', name: 'Study', desc: 'Learn at your pace', icon: BookOpen },
                { id: 'timed', name: 'Timed', desc: '90 sec per question', icon: Clock },
                { id: 'exam', name: 'Exam Sim', desc: 'Full exam conditions', icon: Target },
                { id: 'weak', name: 'Weak Areas', desc: 'Focus on struggles', icon: Sparkles },
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setConfig((prev) => ({ ...prev, mode: mode.id as SessionConfig['mode'] }))}
                    className={clsx(
                      'p-4 rounded-xl border-2 text-left transition-all focus:ring-2 focus:ring-primary-500/50',
                      config.mode === mode.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                    )}
                    aria-pressed={config.mode === mode.id}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        config.mode === mode.id ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">{mode.name}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">{mode.desc}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count - Now with slider + presets */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Number of Questions
            </label>
            <div className="flex items-center gap-3 mb-2">
              {[5, 10, 20, 30, 50].map((count) => (
                <button
                  key={count}
                  onClick={() => setConfig((prev) => ({ ...prev, count }))}
                  className={clsx(
                    'flex-1 py-2 rounded-lg border-2 font-medium transition-all focus:ring-2 focus:ring-primary-500/50',
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
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={config.count}
              onChange={(e) => setConfig((prev) => ({ ...prev, count: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>5</span>
              <span className="font-medium text-primary-600">{config.count} questions</span>
              <span>100</span>
            </div>
          </div>

          {/* Question Status Filter - Like Becker */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Question Status
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', name: 'All Questions', icon: Shuffle },
                { id: 'unanswered', name: 'Unanswered', icon: Target },
                { id: 'incorrect', name: 'Incorrect', icon: XCircle },
                { id: 'correct', name: 'Correct', icon: CheckCircle },
                { id: 'flagged', name: 'Flagged', icon: Flag },
              ].map((status) => {
                const Icon = status.icon;
                return (
                  <button
                    key={status.id}
                    onClick={() => setConfig((prev) => ({ ...prev, questionStatus: status.id as QuestionStatus }))}
                    className={clsx(
                      'flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                      config.questionStatus === status.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-300'
                    )}
                    aria-pressed={config.questionStatus === status.id}
                  >
                    <Icon className="w-4 h-4" />
                    {status.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Advanced Options
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
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Areas</option>
                  {blueprintAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.id} - {area.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Difficulty Level
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'all', name: 'All Levels' },
                    { id: 'easy', name: 'Easy' },
                    { id: 'medium', name: 'Medium' },
                    { id: 'hard', name: 'Hard' },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setConfig((prev) => ({ ...prev, difficulty: diff.id as Difficulty | 'all' }))}
                      className={clsx(
                        'flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all focus:ring-2 focus:ring-primary-500/50',
                        config.difficulty === diff.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                          : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-300'
                      )}
                      aria-pressed={config.difficulty === diff.id}
                    >
                      {diff.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scoring Mode */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Scoring Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, scoringMode: 'practice' }))}
                    className={clsx(
                      'p-3 rounded-xl border-2 text-left transition-all',
                      config.scoringMode === 'practice'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                    )}
                  >
                    <div className="font-medium text-slate-900 dark:text-slate-100">Practice</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Immediate feedback after each question</div>
                  </button>
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, scoringMode: 'exam' }))}
                    className={clsx(
                      'p-3 rounded-xl border-2 text-left transition-all',
                      config.scoringMode === 'exam'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : 'border-slate-200 dark:border-slate-600 hover:border-primary-300'
                    )}
                  >
                    <div className="font-medium text-slate-900 dark:text-slate-100">Exam</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Score revealed at end only</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={() => onStart(config)}
            disabled={loading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading Questions...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5" />
                Start Practice
              </>
            )}
          </button>
        </div>
      </div>

      {/* Attempts List - Like Becker */}
      {practiceHistory.length > 0 && (
        <div className="card mt-6">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-600" />
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden mb-6">
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
        </div>
        
        {/* Weak Areas (if any) */}
        {weakTopics.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6 border border-amber-200 dark:border-amber-800">
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
          </div>
        )}
        
        {/* Recommended Next Steps */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6">
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
              <button
                onClick={() => navigate('/tbs')}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <FileSpreadsheet className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Try TBS</span>
              </button>
              <button
                onClick={() => navigate('/flashcards')}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Brain className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Flashcards</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="flex gap-3">
          {fromDailyPlan && onBackToDailyPlan ? (
            <>
              <button
                onClick={onBackToDailyPlan}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Back to Daily Plan
              </button>
              <button
                onClick={onTryAgain}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Session
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onTryAgain}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                New Session
              </button>
              <button
                onClick={() => navigate('/progress')}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                View Progress
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userProfile } = useAuth();
  const { recordMCQAnswer, logActivity } = useStudy();
  const { courseId } = useCourse();
  
  // Check if coming from daily plan
  const fromDailyPlan = searchParams.get('from') === 'dailyplan';
  const activityId = searchParams.get('activityId');
  const blueprintAreaParam = searchParams.get('blueprintArea');
  const subtopicParam = searchParams.get('subtopic'); // Specific topic from lesson

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
  
  // Ref for scrolling to top of question on navigation (mobile fix)
  const questionTopRef = useRef<HTMLDivElement>(null);
  
  // Track weak topics for targeted practice
  const [, setWeakTopicsFromSession] = useState<string[]>([]);

  const currentQuestion: Question | undefined = questions[currentIndex];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = currentAnswer !== undefined;

  // Session state persistence key
  const SESSION_STORAGE_KEY = 'voraprep-practice-session';

  // Save session state to sessionStorage (for returning after lesson/Vory)
  const saveSessionState = useCallback(() => {
    if (!inSession || questions.length === 0) return;
    
    const sessionState = {
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
  }, [inSession, questions, currentIndex, answers, flagged, startTime, elapsed, sessionConfig]);

  // Restore session state from sessionStorage
  const restoreSessionState = useCallback(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!saved) return false;
      
      const sessionState = JSON.parse(saved);
      
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
  }, []);

  // Try to restore session on mount
  useEffect(() => {
    if (!inSession && !loading && userProfile) {
      const restored = restoreSessionState();
      if (restored) {
        scrollToTop();
      }
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

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
      const rawExamDate = userProfile?.examDate;
      const examDate = rawExamDate && typeof (rawExamDate as { toDate?: () => Date }).toDate === 'function'
        ? (rawExamDate as { toDate: () => Date }).toDate()
        : rawExamDate ? new Date(rawExamDate as Date) : new Date();
      const blueprintVersion = getBlueprintForExamDate(examDate);
      const is2026 = blueprintVersion === '2026';

      if (config.mode === 'weak') {
        // Get questions from weak areas
        fetchedQuestions = await getWeakAreaQuestions(
          userProfile?.id || '',
          (userProfile?.examSection as ExamSection) || 'REG',
          config.count
        );
      } else {
        // Normal fetch with filters
        // Prioritize section from config, fallback to URL param, then profile, then default
        const urlSection = searchParams.get('section') as ExamSection;
        const section = config.section || urlSection || (userProfile?.examSection as ExamSection) || 'REG';
        
        // HR1 filter only applies to REG/TCP sections (tax law updates)
        const applyHr1Filter = is2026 && (section === 'REG' || section === 'TCP');
        
        // Use smart selection for study mode (spaced repetition + fresh questions)
        const shouldUseSmartSelection = config.mode === 'study' && !!userProfile?.id;
        
        // Get exam date for adaptive review weights
        const examDateStr = examDate ? examDate.toISOString().split('T')[0] : undefined;
        
        fetchedQuestions = await fetchQuestions({
          section,
          subtopic: subtopicParam || undefined, // Filter by specific lesson subtopic (most specific)
          blueprintArea: !subtopicParam ? blueprintAreaParam || undefined : undefined, // Fallback to blueprintArea
          difficulty: config.difficulty !== 'all' ? config.difficulty : undefined,
          count: config.count,
          hr1Only: applyHr1Filter, // Only for tax sections (REG, TCP) in 2026
          mode: (config.mode === 'study' ? undefined : config.mode) as any, // Cast to fix strict type overlap
          courseId, // Multi-course support
          userId: userProfile?.id, // For smart question selection
          useSmartSelection: shouldUseSmartSelection, // Enable spaced repetition for study mode
          examDate: examDateStr, // For adaptive weights near exam date
        });
      }

      setQuestions(fetchedQuestions);
      setSessionConfig(config);
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

  // Auto-start session if mode=weak OR blueprintArea is specified (coming from lesson)
  useEffect(() => {
    const mode = searchParams.get('mode');
    
    // Auto-start weak areas practice
    if (mode === 'weak' && userProfile && !inSession && !loading) {
      const section = (userProfile.examSection || 'REG') as ExamSection;
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
      const section = urlSection || (userProfile.examSection || 'REG') as ExamSection;
      
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
    if (selectedAnswer === null || isAnswered || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

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
        selected: selectedAnswer,
        correct: isCorrect,
        time: elapsed,
      },
    }));
    setShowExplanation(true);

    // Record in study provider
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
  }, [selectedAnswer, isAnswered, currentQuestion, elapsed, recordMCQAnswer]);

  // Navigation
  const goToQuestion = useCallback((index: number) => {
    setCurrentIndex(index);
    setSelectedAnswer(answers[questions[index]?.id]?.selected ?? null);
    setShowExplanation(answers[questions[index]?.id] !== undefined);
    
    // Scroll to top - use multiple methods for cross-platform reliability (especially mobile)
    // scrollIntoView is more reliable on mobile/Capacitor than window.scrollTo
    if (questionTopRef.current) {
      questionTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    // Fallback for window scroll
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also try document scroll for iOS
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
        section: sessionConfig.section,
        mode: sessionConfig.mode,
        questionCount: totalQuestions,
        correctCount,
        accuracy,
        timeSpentSeconds: elapsed,
        blueprintArea: sessionConfig.blueprintArea !== 'all' ? sessionConfig.blueprintArea : undefined,
        difficulty: sessionConfig.difficulty !== 'all' ? sessionConfig.difficulty : undefined,
      }).catch(err => logger.error('Failed to save practice session:', err));
    }

    // Identify weak topics from wrong answers
    const wrongQuestions = questions.filter(q => answers[q.id] && !answers[q.id].correct);
    const weakTopics = [...new Set(wrongQuestions.map(q => q.topic || q.topicId || 'Unknown'))];
    setWeakTopicsFromSession(weakTopics);

    // Show results screen
    setInSession(false);
    setShowResults(true);
  };
  
  // Reset and start new session
  const handleTryAgain = () => {
    setShowResults(false);
    setSessionConfig(null);
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
    setElapsed(0);
    setWeakTopicsFromSession([]);
  };
  
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
        section={userProfile?.examSection || 'REG'}
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
    return <SessionSetup onStart={startSession} userProfile={userProfile} loading={loading} userId={user?.uid} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  // No questions available for selected criteria
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-slate-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No Questions Available
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            There are no practice questions available for your selected section and criteria. 
            Try adjusting your filters or selecting a different exam section.
          </p>
          <button
            onClick={endSession}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Setup
          </button>
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
            <p className="text-slate-900 dark:text-slate-100 text-lg leading-relaxed mb-6">
              {currentQuestion.question}
            </p>

            {/* Answer Choices */}
            <div className="space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(currentQuestion.options || (currentQuestion as any).choices || []).map((choice: string, index: number) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = isAnswered;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
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
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={clsx(
                  'mt-6 w-full btn-primary py-3',
                  selectedAnswer === null && 'opacity-50 cursor-not-allowed'
                )}
              >
                Submit Answer
              </button>
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
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    // Save session state before navigating
                    saveSessionState();
                    // Navigate in same window - state will be restored on return
                    const questionText = currentQuestion?.question || '';
                    const correctAnswer = currentQuestion?.options?.[currentQuestion.correctAnswer] || '';
                    const context = encodeURIComponent(`I need help understanding this CPA question:\n\nQuestion: ${questionText}\n\nCorrect Answer: ${correctAnswer}`);
                    navigate(`/ai-tutor?context=${context}&returnTo=/practice`);
                  }}
                  className="btn-secondary text-sm flex items-center gap-2 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Ask Vory to Explain
                </button>
                <button
                  onClick={() => {
                    // Save session state before navigating
                    saveSessionState();
                    // Navigate in same window - state will be restored on return
                    const lessonUrl = currentQuestion.blueprintArea 
                      ? `/lessons/${currentQuestion.blueprintArea}-001?returnTo=/practice`
                      : `/lessons/matrix?section=${currentQuestion.section?.toLowerCase() || 'far'}&topic=${encodeURIComponent(currentQuestion.topic || '')}&returnTo=/practice`;
                    navigate(lessonUrl);
                  }}
                  className="btn-secondary text-sm flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Review Lessons
                </button>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="btn-secondary text-sm flex items-center gap-2 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Report Issue
                </button>
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
              <button onClick={() => setShowShortcuts(false)} className="w-full btn-primary mt-4">
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="btn-secondary flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Question Dots */}
          <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto py-2">
            {questions.slice(0, Math.min(10, questions.length)).map((q, index) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(index)}
                className={clsx(
                  'w-8 h-8 rounded-lg text-xs font-medium transition-colors flex-shrink-0',
                  currentIndex === index && 'bg-primary-500 text-white',
                  currentIndex !== index &&
                    answers[q.id]?.correct &&
                    'bg-success-100 text-success-700',
                  currentIndex !== index &&
                    answers[q.id] &&
                    !answers[q.id].correct &&
                    'bg-red-100 text-red-700',
                  currentIndex !== index &&
                    !answers[q.id] &&
                    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                )}
              >
                {index + 1}
              </button>
            ))}
            {questions.length > 10 && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                +{questions.length - 10}
              </span>
            )}
          </div>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={endSession}
              className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              Finish
              <CheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
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

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportIssue}
                    disabled={!reportType}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </button>
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
