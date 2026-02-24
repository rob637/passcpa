/**
 * DailyChallenge.tsx
 * 
 * Daily Challenge mode - 5 questions, build streaks, create habit.
 * Inspired by Duolingo's daily practice model.
 * 
 * Features:
 * - 5 adaptive questions based on user's weak areas
 * - Streak tracking with visual celebration
 * - Timer to track completion time
 * - Confetti and celebration on completion
 * - Saves to Firestore for cross-device sync
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  CheckCircle,
  XCircle,
  ArrowRight,
  Trophy,
  Zap,
  Clock,
  Target,
  Sparkles,
  Brain,
  AlertCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Question } from '../../types';
import { getAdaptiveQuestions } from '../../services/adaptiveQuestionService';
import { trackEvent } from '../../services/analytics';
import { celebrateCompletion, celebrateStreak } from '../../utils/confetti';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import logger from '../../utils/logger';

const CHALLENGE_SIZE = 5;

interface DailyChallengeState {
  streak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  totalChallengesCompleted: number;
  totalCorrect: number;
  totalQuestions: number;
  averageTime: number; // seconds
}

const getDefaultState = (): DailyChallengeState => ({
  streak: 0,
  longestStreak: 0,
  lastCompletedDate: null,
  totalChallengesCompleted: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  averageTime: 0,
});

const getTodayString = () => new Date().toISOString().split('T')[0];

const DailyChallenge = () => {
  useDocumentTitle('Daily Challenge');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courseId } = useCourse();
  
  // State
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [alreadyCompletedToday, setAlreadyCompletedToday] = useState(false);
  const [challengeState, setChallengeState] = useState<DailyChallengeState>(getDefaultState());
  
  // Timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  
  const currentQuestion = questions[currentIndex];
  const correctCount = answers.filter((a, i) => questions[i] && a === questions[i].correctAnswer).length;
  const progress = ((currentIndex + (showExplanation ? 1 : 0)) / CHALLENGE_SIZE) * 100;
  
  // Load challenge state and questions
  useEffect(() => {
    const loadChallenge = async () => {
      if (!user?.uid || !courseId) return;
      
      try {
        setLoading(true);
        
        // Load challenge state from Firestore
        const stateRef = doc(db, 'users', user.uid, 'dailyChallenge', courseId);
        const stateSnap = await getDoc(stateRef);
        
        let state = getDefaultState();
        if (stateSnap.exists()) {
          state = { ...state, ...stateSnap.data() } as DailyChallengeState;
        }
        
        // Check if already completed today
        const today = getTodayString();
        if (state.lastCompletedDate === today) {
          setAlreadyCompletedToday(true);
          setChallengeState(state);
          setLoading(false);
          return;
        }
        
        // Check if streak should be reset (missed yesterday)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        if (state.lastCompletedDate && state.lastCompletedDate !== yesterdayString && state.lastCompletedDate !== today) {
          // Streak broken - but don't save until they complete today's challenge
          state.streak = 0;
        }
        
        setChallengeState(state);
        
        // Get adaptive questions
        const adaptiveQuestions = await getAdaptiveQuestions(user.uid, courseId, CHALLENGE_SIZE);
        setQuestions(adaptiveQuestions);
        setAnswers(new Array(adaptiveQuestions.length).fill(null));
        
        // Start timer
        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        
        trackEvent('daily_challenge_started', { course: courseId, streak: state.streak });
      } catch (error) {
        logger.error('Error loading daily challenge:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChallenge();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [user?.uid, courseId]);
  
  // Handle answer selection
  const handleSelect = useCallback((index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
    
    const isCorrect = index === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      celebrateStreak(1);
    }
    
    trackEvent('daily_challenge_answer', {
      course: courseId,
      question_index: currentIndex,
      correct: isCorrect,
      topic: currentQuestion.topic,
    });
  }, [selectedAnswer, currentQuestion, answers, currentIndex, courseId]);
  
  // Handle next question or completion
  const handleNext = useCallback(async () => {
    if (currentIndex < CHALLENGE_SIZE - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Challenge complete!
      if (timerRef.current) clearInterval(timerRef.current);
      
      const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const finalCorrect = answers.filter((a, i) => questions[i] && a === questions[i].correctAnswer).length + 
        (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0);
      
      // Update state
      const today = getTodayString();
      const newStreak = challengeState.streak + 1;
      const newLongestStreak = Math.max(newStreak, challengeState.longestStreak);
      
      const newState: DailyChallengeState = {
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastCompletedDate: today,
        totalChallengesCompleted: challengeState.totalChallengesCompleted + 1,
        totalCorrect: challengeState.totalCorrect + finalCorrect,
        totalQuestions: challengeState.totalQuestions + CHALLENGE_SIZE,
        averageTime: Math.round(
          (challengeState.averageTime * challengeState.totalChallengesCompleted + finalTime) /
          (challengeState.totalChallengesCompleted + 1)
        ),
      };
      
      // Save to Firestore
      if (user?.uid) {
        try {
          const stateRef = doc(db, 'users', user.uid, 'dailyChallenge', courseId);
          await setDoc(stateRef, {
            ...newState,
            updatedAt: serverTimestamp(),
          }, { merge: true });
          
          // Also update main user stats
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            [`${courseId}_dailyChallengeStreak`]: newStreak,
            [`${courseId}_dailyChallengeLastDate`]: today,
          });
        } catch (error) {
          logger.error('Error saving challenge state:', error);
        }
      }
      
      setChallengeState(newState);
      setIsComplete(true);
      
      // Big celebration!
      celebrateCompletion();
      
      trackEvent('daily_challenge_completed', {
        course: courseId,
        score: finalCorrect,
        total: CHALLENGE_SIZE,
        time_seconds: finalTime,
        new_streak: newStreak,
      });
    }
  }, [currentIndex, answers, questions, selectedAnswer, currentQuestion, challengeState, user?.uid, courseId]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950">
        <div className="text-center">
          <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-slate-600 dark:text-slate-300">Loading your challenge...</p>
        </div>
      </div>
    );
  }
  
  // Already completed today
  if (alreadyCompletedToday) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950 px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 mx-auto flex items-center justify-center shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Challenge Complete!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            You've already completed today's challenge. Come back tomorrow to keep your streak going!
          </p>
          
          {/* Streak display */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <span className="text-4xl font-bold text-orange-600">{challengeState.streak}</span>
                </div>
                <p className="text-sm text-slate-500">Day Streak</p>
              </div>
              <div className="w-px h-16 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="w-8 h-8 text-amber-500" />
                  <span className="text-4xl font-bold text-amber-600">{challengeState.longestStreak}</span>
                </div>
                <p className="text-sm text-slate-500">Best Streak</p>
              </div>
            </div>
          </Card>
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/practice')}
              className="w-full"
              size="lg"
            >
              <Target className="w-5 h-5 mr-2" />
              Continue Practicing
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full"
              size="lg"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Completion screen
  if (isComplete) {
    const percentage = Math.round((correctCount / CHALLENGE_SIZE) * 100);
    const newStreak = challengeState.streak;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950 px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          {/* Success animation */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 mx-auto flex items-center justify-center shadow-xl animate-bounce">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            {newStreak > 1 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                🔥 {newStreak} day streak!
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Challenge Complete!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            {percentage >= 80 ? "Excellent work! You're crushing it!" :
             percentage >= 60 ? "Good job! Keep practicing!" :
             "Keep going! Practice makes perfect!"}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {correctCount}/{CHALLENGE_SIZE}
              </div>
              <p className="text-xs text-slate-500">Correct</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatTime(elapsedTime)}
              </div>
              <p className="text-xs text-slate-500">Time</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {newStreak}
              </div>
              <p className="text-xs text-slate-500">Streak</p>
            </Card>
          </div>
          
          {/* Streak milestone celebration */}
          {newStreak === 7 && (
            <div className="mb-8 p-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold text-amber-800 dark:text-amber-200">🎉 One Week Streak!</p>
              <p className="text-sm text-amber-600 dark:text-amber-300">You're building a great study habit!</p>
            </div>
          )}
          {newStreak === 30 && (
            <div className="mb-8 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-purple-800 dark:text-purple-200">🏆 30 Day Champion!</p>
              <p className="text-sm text-purple-600 dark:text-purple-300">You're on fire! Keep it up!</p>
            </div>
          )}
          
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/practice')}
              className="w-full"
              size="lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Keep Practicing
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full"
              size="lg"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // No questions loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950 px-4">
        <Card className="p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Questions Available</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            We couldn't load questions for your daily challenge. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }
  
  // Main challenge UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-900 dark:to-orange-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  {challengeState.streak} day streak
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>Question {currentIndex + 1} of {CHALLENGE_SIZE}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
      </div>
      
      {/* Question */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-6 mb-6">
          {/* Topic badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
              {currentQuestion.section}
            </span>
            <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded text-xs font-medium text-blue-600 dark:text-blue-300">
              {currentQuestion.topic}
            </span>
          </div>
          
          {/* Question text */}
          <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;
              
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={showExplanation}
                  className={clsx(
                    'w-full p-4 rounded-lg border-2 text-left transition-all',
                    'flex items-start gap-3',
                    !showResult && !isSelected && 'border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20',
                    !showResult && isSelected && 'border-orange-500 bg-orange-50 dark:bg-orange-900/30',
                    showResult && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/30',
                    showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-900/30',
                    showResult && !isSelected && !isCorrect && 'border-slate-200 dark:border-slate-700 opacity-60',
                  )}
                >
                  <span className={clsx(
                    'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold',
                    !showResult && 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
                    showResult && isCorrect && 'bg-green-500 text-white',
                    showResult && isSelected && !isCorrect && 'bg-red-500 text-white',
                    showResult && !isSelected && !isCorrect && 'bg-slate-200 dark:bg-slate-700 text-slate-400',
                  )}>
                    {showResult && isCorrect ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className={clsx(
                    'flex-1',
                    showResult && isCorrect && 'text-green-800 dark:text-green-200 font-medium',
                    showResult && isSelected && !isCorrect && 'text-red-800 dark:text-red-200',
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
        
        {/* Explanation */}
        {showExplanation && (
          <Card className="p-6 mb-6 border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
            <div className="flex items-start gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Explanation</h3>
                <p className="text-slate-700 dark:text-slate-300">{currentQuestion.explanation}</p>
              </div>
            </div>
            
            {/* UWorld-style enhanced explanations */}
            {currentQuestion.whyWrong && Object.keys(currentQuestion.whyWrong).length > 0 && (
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Why other options are wrong:</h4>
                <div className="space-y-2">
                  {Object.entries(currentQuestion.whyWrong).map(([idx, reason]) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 text-xs font-medium text-red-600">
                        {String.fromCharCode(65 + parseInt(idx))}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {currentQuestion.memoryAid && (
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Memory Tip:</span>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{currentQuestion.memoryAid}</p>
              </div>
            )}
            
            {currentQuestion.bottomLine && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Bottom Line:</span>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">{currentQuestion.bottomLine}</p>
              </div>
            )}
          </Card>
        )}
        
        {/* Next button */}
        {showExplanation && (
          <Button
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            {currentIndex < CHALLENGE_SIZE - 1 ? (
              <>Next Question <ArrowRight className="w-5 h-5 ml-2" /></>
            ) : (
              <>Complete Challenge <Trophy className="w-5 h-5 ml-2" /></>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
