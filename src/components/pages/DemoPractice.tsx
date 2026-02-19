/**
 * DemoPractice.tsx
 * 
 * A standalone page allowing visitors to try 5 practice questions
 * without registration. This reduces friction and gives users a 
 * taste of the product before signing up.
 * 
 * URL: /demo-practice?course={courseId}
 */

import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  BookOpen,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import clsx from 'clsx';
import { getDemoQuestions } from '../../data/demoQuestions';
import { COURSES } from '../../courses';
import { CourseId } from '../../types/course';
import { trackEvent } from '../../services/analytics';

const COURSE_COLORS: Record<string, { gradient: string; bg: string; text: string; light: string }> = {
  cpa: { gradient: 'from-blue-600 to-blue-700', bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50' },
  ea: { gradient: 'from-emerald-600 to-teal-600', bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50' },
  cma: { gradient: 'from-purple-600 to-indigo-600', bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50' },
  cia: { gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50' },
  cfp: { gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
  cisa: { gradient: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50' },
};

const DemoPractice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseParam = searchParams.get('course') as CourseId | null;
  const courseId = courseParam && COURSES[courseParam] ? courseParam : 'cpa';
  
  const course = COURSES[courseId];
  const colors = COURSE_COLORS[courseId] || COURSE_COLORS.cpa;
  const questions = getDemoQuestions(courseId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const correctCount = answers.filter((a, i) => a === questions[i].correctAnswer).length;
  
  // Track page view
  useEffect(() => {
    trackEvent('demo_practice_started', { course: courseId });
  }, [courseId]);
  
  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
    
    trackEvent('demo_question_answered', {
      course: courseId,
      question_index: currentIndex,
      correct: index === currentQuestion.correctAnswer,
    });
  };
  
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      trackEvent('demo_practice_completed', {
        course: courseId,
        score: correctCount,
        total: totalQuestions,
      });
    }
  };
  
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(answers[currentIndex - 1]);
      setShowExplanation(answers[currentIndex - 1] !== null);
    }
  };
  
  const handleStartOver = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers(new Array(questions.length).fill(null));
    setIsComplete(false);
  };
  
  const handleSignUp = () => {
    trackEvent('demo_to_register', { course: courseId, score: correctCount });
    // Store fast-track flag for post-registration onboarding
    localStorage.setItem('onboardingFastTrack', '1');
    navigate(`/register?course=${courseId}&fast=1`);
  };
  
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  
  // Results screen
  if (isComplete) {
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const getMessage = () => {
      if (percentage >= 80) return { icon: Trophy, text: 'Excellent! You\'re ready to dive deeper.', color: 'text-green-600' };
      if (percentage >= 60) return { icon: Target, text: 'Good foundation! VoraPrep can help you master the rest.', color: 'text-blue-600' };
      return { icon: BookOpen, text: 'Great start! VoraPrep\'s adaptive learning will get you exam-ready.', color: 'text-amber-600' };
    };
    const result = getMessage();
    const ResultIcon = result.icon;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-center`}>
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <ResultIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Demo Complete!</h1>
              <p className="text-white/80">You scored {correctCount} out of {totalQuestions}</p>
            </div>
            
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                    <circle 
                      cx="64" cy="64" r="56" 
                      stroke={percentage >= 60 ? '#22c55e' : '#f59e0b'} 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${percentage * 3.52} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{percentage}%</span>
                  </div>
                </div>
              </div>
              
              <p className={`text-center text-lg font-medium mb-6 ${result.color}`}>
                {result.text}
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Access {course?.shortName} questions with detailed explanations</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>AI-powered adaptive learning focuses on your weak areas</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>14-day free trial — no credit card required</span>
                </div>
              </div>
              
              <button
                onClick={handleSignUp}
                className={`w-full bg-gradient-to-r ${colors.gradient} text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2`}
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleStartOver}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm"
                >
                  Try Again
                </button>
                <Link
                  to={`/${courseId === 'ea' ? 'ea-prep' : courseId}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="VoraPrep" className="h-8" />
          <span className="text-white font-bold hidden sm:inline">VoraPrep</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <Link
            to={`/register?course=${courseId}`}
            className="text-white/80 hover:text-white text-sm font-medium"
          >
            Sign Up Free →
          </Link>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="px-4 mb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  'flex-1 h-2 rounded-full transition-all',
                  idx < currentIndex ? (answers[idx] === questions[idx].correctAnswer ? 'bg-green-500' : 'bg-red-500') :
                  idx === currentIndex ? 'bg-white' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Question header */}
            <div className={clsx('px-6 py-4 flex items-center justify-between', colors.light, 'dark:bg-slate-700')}>
              <div className="flex items-center gap-2">
                <span className={clsx('px-3 py-1 rounded-lg text-sm font-bold text-white', colors.bg)}>
                  {currentQuestion.section}
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-sm">{currentQuestion.topic}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Demo Mode
              </span>
            </div>
            
            {/* Question */}
            <div className="p-6">
              <p className="text-lg font-medium text-slate-900 dark:text-white mb-6 leading-relaxed">
                {currentQuestion.question}
              </p>
              
              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQuestion.correctAnswer;
                  const showResult = selectedAnswer !== null;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={clsx(
                        'w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-200',
                        !showResult && 'hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer',
                        showResult && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                        showResult && isSelected && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                        !showResult && 'border-slate-200 dark:border-slate-600',
                        showResult && !isSelected && !isCorrectOption && 'border-slate-200 dark:border-slate-600 opacity-50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className={clsx(
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                          showResult && isCorrectOption && 'bg-green-500 text-white',
                          showResult && isSelected && !isCorrectOption && 'bg-red-500 text-white',
                          !showResult && 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        )}>
                          {showResult && isCorrectOption ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : showResult && isSelected && !isCorrectOption ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <span className={clsx(
                          'text-slate-700 dark:text-slate-300 pt-1',
                          showResult && isCorrectOption && 'font-semibold text-green-700 dark:text-green-300',
                          showResult && isSelected && !isCorrectOption && 'text-red-700 dark:text-red-300'
                        )}>
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              {/* Explanation */}
              {showExplanation && (
                <div className={clsx(
                  'mt-6 p-5 rounded-xl',
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-600" />
                    )}
                    <span className={clsx(
                      'font-semibold',
                      isCorrect ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'
                    )}>
                      {isCorrect ? 'Correct!' : 'Not quite'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
            
            {/* Navigation */}
            <div className="px-6 pb-6 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                  currentIndex === 0 
                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${colors.gradient} hover:shadow-lg transition-all hover:-translate-y-0.5`}
                >
                  {currentIndex === totalQuestions - 1 ? 'See Results' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm mb-2">
              Want more? Get full access to all {course?.shortName} content.
            </p>
            <Link
              to={`/register?course=${courseId}`}
              className="text-white font-medium hover:underline"
            >
              Start Your 14-Day Free Trial →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DemoPractice;
