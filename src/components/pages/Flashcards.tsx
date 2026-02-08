import React, { useState, useEffect, useCallback, useRef } from 'react';
import logger from '../../utils/logger';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from '../common/Button';
import { getHomePathFromLocation } from '../../utils/courseNavigation';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ThumbsDown,
  ThumbsUp,
  Zap,
  CheckCircle,
  Brain,
  Sparkles,
  Clock,
  Target,
  ArrowLeft,
  BookOpen,
  Calculator,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { getDefaultSection } from '../../utils/sectionUtils';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { fetchQuestions } from '../../services/questionService';
import { calculateNextReview, getDueCards, getStudyStats } from '../../services/spacedRepetition';
import feedback from '../../services/feedback';
import clsx from 'clsx';
import { Question, ExamSection, AllExamSections } from '../../types';
import {
  getFlashcardsBySection,
  Flashcard as DedicatedFlashcard,
} from '../../data/cpa/flashcards';

interface RatingButton {
  rating: 'again' | 'hard' | 'good' | 'easy';
  label: string;
  color: 'error' | 'warning' | 'primary' | 'success';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  shortcut: string;
}

const RATING_BUTTONS: RatingButton[] = [
  { rating: 'again', label: 'Again', color: 'error', icon: RotateCcw, shortcut: '1' },
  { rating: 'hard', label: 'Hard', color: 'warning', icon: ThumbsDown, shortcut: '2' },
  { rating: 'good', label: 'Good', color: 'primary', icon: ThumbsUp, shortcut: '3' },
  { rating: 'easy', label: 'Easy', color: 'success', icon: Zap, shortcut: '4' },
];

interface Flashcard extends Question {
  front: string;
  back: string;
  answer: string;
  formula?: string;
  mnemonic?: string;
  example?: string;
  cardType?: 'question' | 'definition' | 'formula' | 'mnemonic';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextReview?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For SRS data
}

type FlashcardType = 'all' | 'questions' | 'definitions' | 'formulas' | 'mnemonics';

interface SessionStats {
  reviewed: number;
  again: number;
  hard: number;
  good: number;
  easy: number;
}

const Flashcards: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseHome = getHomePathFromLocation(location.pathname);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  const fromDailyPlan = searchParams.get('from') === 'dailyplan';
  const activityId = searchParams.get('activityId');
  const { user, userProfile } = useAuth();
  const { courseId } = useCourse();
  // const { recordMCQAnswer } = useStudy(); // Unused in original code

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    reviewed: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [studyStats, setStudyStats] = useState<any>(null);
  const [cardType, setCardType] = useState<FlashcardType>('all');

  const mode = searchParams.get('mode') || 'review'; // review, new, all
  const topic = searchParams.get('topic');
  const typeParam = searchParams.get('type') as FlashcardType | null;
  const sectionParam = searchParams.get('section');
  // Support URL param for section (for EA) or fall back to user profile
  const currentSection: AllExamSections = sectionParam 
    ? (sectionParam as AllExamSections)
    : (userProfile?.examSection || getDefaultSection(courseId)) as ExamSection;

  // Scroll to top when flashcard session starts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Ref for scrolling to top of card on navigation (mobile fix)
  const cardTopRef = useRef<HTMLDivElement>(null);

  // Load flashcards
  useEffect(() => {
    const loadCards = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Determine effective card type filter
        const effectiveType = typeParam || cardType;
        
        let allCards: Flashcard[] = [];
        
        // Get dedicated flashcards (definitions, formulas, mnemonics)
        if (effectiveType === 'all' || effectiveType === 'definitions' || effectiveType === 'formulas' || effectiveType === 'mnemonics') {
          const sectionFlashcards = getFlashcardsBySection(currentSection);
          const dedicatedCards: Flashcard[] = sectionFlashcards
            .filter((card: DedicatedFlashcard) => {
              if (effectiveType === 'all') return true;
              if (effectiveType === 'definitions') return card.type === 'definition';
              if (effectiveType === 'formulas') return card.type === 'formula';
              if (effectiveType === 'mnemonics') return card.type === 'mnemonic';
              return true;
            })
            .map((card: DedicatedFlashcard) => ({
              id: card.id,
              question: card.front,
              front: card.front,
              back: formatDedicatedCardBack(card),
              answer: formatDedicatedCardBack(card),
              section: card.section as ExamSection,
              topic: card.topic || card.blueprintArea,
              difficulty: card.difficulty,
              cardType: card.type as 'definition' | 'formula' | 'mnemonic',
              formula: card.formula,
              mnemonic: card.mnemonic,
              example: card.example,
              // Required Question fields with defaults
              correctAnswer: 0,
              options: [],
              explanation: card.back,
              blueprintArea: card.blueprintArea || '',
              skillLevel: 'application' as const,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any));
          
          allCards = [...allCards, ...dedicatedCards];
        }

        // Get question-based flashcards
        if (effectiveType === 'all' || effectiveType === 'questions') {
          const questions = await fetchQuestions({
            section: currentSection,
            count: 100,
          });
          
          const questionCards: Flashcard[] = questions.map((q) => ({
            ...q,
            question: q.question,
            answer:
              q.explanation ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              `The correct answer is: ${q.options?.[q.correctAnswer] || (q as any).choices?.[q.correctAnswer]}`,
            front: q.question,
            back:
              q.explanation ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              `The correct answer is: ${q.options?.[q.correctAnswer] || (q as any).choices?.[q.correctAnswer]}`,
            cardType: 'question' as const,
          }));
          
          allCards = [...allCards, ...questionCards];
        }

        // Get user's SRS data from Firebase
        const srsRef = doc(db, 'users', user.uid, 'srs', 'cards');
        const srsSnap = await getDoc(srsRef);
        const srsData = srsSnap.exists() ? srsSnap.data() : {};

        // Merge cards with SRS data
        const cardsWithSRS: Flashcard[] = allCards.map((card) => ({
          ...card,
          ...srsData[card.id],
        }));

        // Filter based on mode
        let filteredCards: Flashcard[];
        if (mode === 'new') {
          filteredCards = cardsWithSRS.filter((c) => !c.nextReview);
        } else if (mode === 'review') {
          filteredCards = getDueCards(cardsWithSRS, 50);
        } else {
          filteredCards = cardsWithSRS;
        }

        // Shuffle for variety
        filteredCards.sort(() => Math.random() - 0.5);

        setCards(filteredCards);
        setStudyStats(getStudyStats(cardsWithSRS));
      } catch (error) {
        logger.error('Error loading flashcards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [user, currentSection, mode, topic, cardType, typeParam]);

  // Helper function to format dedicated card backs with formula/mnemonic/example
  const formatDedicatedCardBack = (card: DedicatedFlashcard): string => {
    let back = card.back;
    
    if (card.formula) {
      back += `\n\n📐 Formula:\n${card.formula}`;
    }
    if (card.mnemonic) {
      back += `\n\n💡 Remember:\n${card.mnemonic}`;
    }
    if (card.example) {
      back += `\n\n📝 Example:\n${card.example}`;
    }
    
    return back;
  };

  // Keyboard shortcuts
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
        nextCard();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        prevCard();
      } else if (isFlipped) {
        const ratingKey = RATING_BUTTONS.find((r) => r.shortcut === e.key);
        if (ratingKey) {
          handleRating(ratingKey.rating);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, cards.length, isFlipped]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentCard = cards[currentIndex];

  // Helper to scroll to top of card (mobile fix)
  const scrollToCardTop = useCallback(() => {
    if (cardTopRef.current) {
      cardTopRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
      scrollToCardTop();
      feedback.tap();
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
      scrollToCardTop();
      feedback.tap();
    }
  };

  const handleFlip = () => {
    setIsFlipped((f) => !f);
    feedback.click();
  };

  const handleRating = async (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard || !user) return;

    // Play feedback
    if (rating === 'easy' || rating === 'good') {
      feedback.correct();
    } else {
      feedback.incorrect();
    }

    // Calculate new SRS values
    const newSRS = calculateNextReview(currentCard, rating);

    // Save to Firestore
    const srsRef = doc(db, 'users', user.uid, 'srs', 'cards');
    await setDoc(
      srsRef,
      {
        [currentCard.id]: newSRS,
      },
      { merge: true }
    );

    // Update session stats
    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      [rating]: prev[rating] + 1,
    }));

    // Move to next card
    if (currentIndex < cards.length - 1) {
      setTimeout(() => {
        nextCard();
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-300">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-success-100 dark:bg-success-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">All Caught Up!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {mode === 'review'
              ? 'No cards are due for review right now. Great job staying on top of your studies!'
              : 'No flashcards available for this selection.'}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => navigate('/practice')}>
              Practice Questions
            </Button>
            <Button variant="secondary" onClick={() => navigate('/study')}>
              Back to Study
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Session complete
  if (currentIndex >= cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-success-100 dark:bg-success-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Session Complete!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">You reviewed {sessionStats.reviewed} cards</p>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {RATING_BUTTONS.map((btn) => (
              <div
                key={btn.rating}
                className={clsx(
                  'p-3 rounded-xl text-center',
                  btn.color === 'error' && 'bg-error-100 dark:bg-error-900/40',
                  btn.color === 'warning' && 'bg-warning-100 dark:bg-warning-900/40',
                  btn.color === 'primary' && 'bg-primary-100 dark:bg-primary-900/40',
                  btn.color === 'success' && 'bg-success-100 dark:bg-success-900/40'
                )}
              >
                <div className="text-2xl font-bold dark:text-white">{sessionStats[btn.rating]}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{btn.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentIndex(0);
                setSessionStats({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0 });
              }}
            >
              Review Again
            </Button>
            <Button variant="primary" onClick={() => {
              if (fromDailyPlan && activityId) {
                const params = new URLSearchParams();
                params.set('from', 'dailyplan');
                params.set('activityId', activityId);
                params.set('completed', 'true');
                navigate(`/home?${params.toString()}`);
              } else {
                navigate('/study');
              }
            }}>
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(courseHome)}
            leftIcon={ArrowLeft}
          >
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-slate-900 dark:text-white">Flashcards</span>
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-300">
            {currentIndex + 1} / {cards.length}
          </div>
        </div>

        {/* Card Type Filter */}
        <div className="max-w-2xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setCardType('all')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              cardType === 'all'
                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 border border-primary-200 dark:border-primary-700'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            All Cards
          </button>
          <button
            onClick={() => setCardType('questions')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              cardType === 'questions'
                ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 border border-primary-200 dark:border-primary-700'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            )}
          >
            <Brain className="w-3.5 h-3.5" />
            Questions
          </button>
          <button
            onClick={() => setCardType('definitions')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              cardType === 'definitions'
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 border border-blue-200 dark:border-blue-700'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Definitions
          </button>
          <button
            onClick={() => setCardType('formulas')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              cardType === 'formulas'
                ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 border border-teal-200 dark:border-teal-700'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            )}
          >
            <Calculator className="w-3.5 h-3.5" />
            Formulas
          </button>
          <button
            onClick={() => setCardType('mnemonics')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
              cardType === 'mnemonics'
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Mnemonics
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Area */}
      <div ref={cardTopRef} className="flex-1 flex items-start sm:items-center justify-center p-4 pt-2">
        <div className="w-full max-w-2xl">
          {/* Flashcard */}
          <div
            onClick={handleFlip}
            className={clsx(
              'relative w-full min-h-[320px] sm:min-h-[400px] cursor-pointer perspective-1000',
              'transition-transform duration-500 transform-style-3d',
              isFlipped && 'rotate-y-180'
            )}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.5s',
            }}
          >
            {/* Front */}
            <div
              className={clsx(
                'absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col backface-hidden',
                isFlipped && 'invisible'
              )}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                  {currentCard.topic || 'Question'}
                </span>
                {currentCard.cardType && currentCard.cardType !== 'question' && (
                  <span
                    className={clsx(
                      'text-xs px-2 py-0.5 rounded-full font-medium',
                      currentCard.cardType === 'definition' && 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
                      currentCard.cardType === 'formula' && 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
                      currentCard.cardType === 'mnemonic' && 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                    )}
                  >
                    {currentCard.cardType === 'definition' && '📖 Definition'}
                    {currentCard.cardType === 'formula' && '📐 Formula'}
                    {currentCard.cardType === 'mnemonic' && '💡 Mnemonic'}
                  </span>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg sm:text-xl text-slate-900 dark:text-white text-center leading-relaxed">
                  {currentCard.front || currentCard.question}
                </p>
              </div>
              {currentCard.mnemonic && (
                <div className="mt-4 text-center">
                  <span className="inline-block bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-lg text-lg font-bold tracking-wider">
                    {currentCard.mnemonic}
                  </span>
                </div>
              )}
              <div className="text-center text-slate-600 dark:text-slate-300 text-sm mt-4">
                <span className="hidden sm:inline">Press Space or </span>Tap to flip
              </div>
            </div>

            {/* Back */}
            <div
              className={clsx(
                'absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col',
                !isFlipped && 'invisible'
              )}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-xs text-success-600 dark:text-success-400 font-medium mb-3">Answer</div>
              <div className="flex-1 flex flex-col items-center justify-center overflow-auto">
                {/* Main answer/explanation */}
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed text-center whitespace-pre-wrap">
                  {currentCard.cardType === 'question' 
                    ? (currentCard.back || currentCard.answer)
                    : currentCard.answer?.split('\n\n📐')[0]?.split('\n\n💡')[0]?.split('\n\n📝')[0] || currentCard.back
                  }
                </p>
                
                {/* Formula display (for formula cards) */}
                {currentCard.formula && (
                  <div className="mt-4 w-full max-w-md">
                    <div className="bg-teal-50 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-700 rounded-lg p-4">
                      <div className="text-xs text-teal-600 dark:text-teal-300 font-medium mb-2 flex items-center gap-1">
                        <Calculator className="w-3.5 h-3.5" />
                        Formula
                      </div>
                      <p className="text-teal-900 dark:text-teal-100 font-mono text-sm whitespace-pre-wrap">
                        {currentCard.formula}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Example display (for formula cards) */}
                {currentCard.example && (
                  <div className="mt-3 w-full max-w-md">
                    <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                      <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-2">📝 Example</div>
                      <p className="text-slate-700 dark:text-slate-200 text-sm">
                        {currentCard.example}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating Buttons (show when flipped) */}
          {isFlipped && (
            <div className="mt-6 grid grid-cols-4 gap-2 animate-fade-in">
              {RATING_BUTTONS.map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.rating}
                    onClick={() => handleRating(btn.rating)}
                    className={clsx(
                      'flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all',
                      'border-2 font-medium',
                      btn.color === 'error' &&
                        'border-error-200 dark:border-error-700 bg-error-50 dark:bg-error-900/40 text-error-700 dark:text-error-300 hover:bg-error-100 dark:hover:bg-error-900/60',
                      btn.color === 'warning' &&
                        'border-warning-200 dark:border-warning-700 bg-warning-50 dark:bg-warning-900/40 text-warning-700 dark:text-warning-300 hover:bg-warning-100 dark:hover:bg-warning-900/60',
                      btn.color === 'primary' &&
                        'border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/60',
                      btn.color === 'success' &&
                        'border-success-200 dark:border-success-700 bg-success-50 dark:bg-success-900/40 text-success-700 dark:text-success-300 hover:bg-success-100 dark:hover:bg-success-900/60'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{btn.label}</span>
                    <span className="text-xs opacity-60 hidden sm:block">{btn.shortcut}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation hint */}
          {!isFlipped && (
            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="hidden sm:inline">← → to navigate</span>
              <span className="hidden sm:inline">Space to flip</span>
              <span className="hidden sm:inline">1-4 to rate</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Target className="w-4 h-4" />
              <span>{sessionStats.reviewed} reviewed</span>
            </div>
            {studyStats && (
              <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                <Clock className="w-4 h-4" />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <span>{(studyStats as any).dueToday} due</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevCard}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextCard}
              disabled={currentIndex === cards.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
