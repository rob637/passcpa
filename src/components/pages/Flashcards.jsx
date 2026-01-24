import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ThumbsDown,
  ThumbsUp,
  Zap,
  CheckCircle,
  Brain,
  Sparkles,
  Clock,
  Target,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { calculateNextReview, getDueCards, getStudyStats } from '../../services/spacedRepetition';
import feedback from '../../services/feedback';
import clsx from 'clsx';

const RATING_BUTTONS = [
  { rating: 'again', label: 'Again', color: 'error', icon: RotateCcw, shortcut: '1' },
  { rating: 'hard', label: 'Hard', color: 'warning', icon: ThumbsDown, shortcut: '2' },
  { rating: 'good', label: 'Good', color: 'primary', icon: ThumbsUp, shortcut: '3' },
  { rating: 'easy', label: 'Easy', color: 'success', icon: Zap, shortcut: '4' },
];

const Flashcards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userProfile } = useAuth();
  const { recordMCQAnswer } = useStudy();

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
  });
  const [studyStats, setStudyStats] = useState(null);

  const mode = searchParams.get('mode') || 'review'; // review, new, all
  const topic = searchParams.get('topic');
  const currentSection = userProfile?.examSection || 'REG';

  // Load flashcards
  useEffect(() => {
    const loadCards = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Get questions from Firestore
        let questionsQuery = query(
          collection(db, 'questions'),
          where('section', '==', currentSection)
        );

        if (topic) {
          questionsQuery = query(
            collection(db, 'questions'),
            where('section', '==', currentSection),
            where('topic', '==', topic)
          );
        }

        const questionsSnap = await getDocs(questionsQuery);
        const questions = questionsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Get user's SRS data
        const srsRef = doc(db, 'users', user.uid, 'srs', 'cards');
        const srsSnap = await getDoc(srsRef);
        const srsData = srsSnap.exists() ? srsSnap.data() : {};

        // Merge questions with SRS data
        const cardsWithSRS = questions.map((q) => ({
          ...q,
          ...srsData[q.id],
          question: q.question,
          answer:
            q.explanation ||
            `The correct answer is: ${q.options?.[q.correctAnswer] || q.choices?.[q.correctAnswer]}`,
          front: q.question,
          back:
            q.explanation ||
            `The correct answer is: ${q.options?.[q.correctAnswer] || q.choices?.[q.correctAnswer]}`,
        }));

        // Filter based on mode
        let filteredCards;
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
        console.error('Error loading flashcards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [user, currentSection, mode, topic]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentIndex, cards.length, isFlipped]);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
      feedback.tap();
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
      feedback.tap();
    }
  };

  const handleFlip = () => {
    setIsFlipped((f) => !f);
    feedback.click();
  };

  const handleRating = async (rating) => {
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">All Caught Up!</h2>
          <p className="text-slate-600 mb-6">
            {mode === 'review'
              ? 'No cards are due for review right now. Great job staying on top of your studies!'
              : 'No flashcards available for this selection.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/practice')} className="btn-primary">
              Practice Questions
            </button>
            <button onClick={() => navigate('/study')} className="btn-secondary">
              Back to Study
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Session complete
  if (currentIndex >= cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Complete!</h2>
          <p className="text-slate-600 mb-6">You reviewed {sessionStats.reviewed} cards</p>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {RATING_BUTTONS.map((btn) => (
              <div
                key={btn.rating}
                className={clsx(
                  'p-3 rounded-xl text-center',
                  btn.color === 'error' && 'bg-error-100',
                  btn.color === 'warning' && 'bg-warning-100',
                  btn.color === 'primary' && 'bg-primary-100',
                  btn.color === 'success' && 'bg-success-100'
                )}
              >
                <div className="text-2xl font-bold">{sessionStats[btn.rating]}</div>
                <div className="text-xs text-slate-600">{btn.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSessionStats({ reviewed: 0, again: 0, hard: 0, good: 0, easy: 0 });
              }}
              className="btn-secondary"
            >
              Review Again
            </button>
            <button onClick={() => navigate('/study')} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/study')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-slate-900">Flashcards</span>
          </div>

          <div className="text-sm text-slate-600">
            {currentIndex + 1} / {cards.length}
          </div>
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
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Flashcard */}
          <div
            onClick={handleFlip}
            className={clsx(
              'relative w-full aspect-[4/3] cursor-pointer perspective-1000',
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
                'absolute inset-0 bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col backface-hidden',
                isFlipped && 'invisible'
              )}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-xs text-primary-600 font-medium mb-3">
                {currentCard.topic || 'Question'}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg sm:text-xl text-slate-900 text-center leading-relaxed">
                  {currentCard.front || currentCard.question}
                </p>
              </div>
              <div className="text-center text-slate-400 text-sm mt-4">
                <span className="hidden sm:inline">Press Space or </span>Tap to flip
              </div>
            </div>

            {/* Back */}
            <div
              className={clsx(
                'absolute inset-0 bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col',
                !isFlipped && 'invisible'
              )}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-xs text-success-600 font-medium mb-3">Answer</div>
              <div className="flex-1 flex items-center justify-center overflow-auto">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {currentCard.back || currentCard.answer}
                </p>
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
                        'border-error-200 bg-error-50 text-error-700 hover:bg-error-100',
                      btn.color === 'warning' &&
                        'border-warning-200 bg-warning-50 text-warning-700 hover:bg-warning-100',
                      btn.color === 'primary' &&
                        'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100',
                      btn.color === 'success' &&
                        'border-success-200 bg-success-50 text-success-700 hover:bg-success-100'
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
            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-400">
              <span className="hidden sm:inline">← → to navigate</span>
              <span className="hidden sm:inline">Space to flip</span>
              <span className="hidden sm:inline">1-4 to rate</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="bg-white border-t border-slate-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Target className="w-4 h-4" />
              <span>{sessionStats.reviewed} reviewed</span>
            </div>
            {studyStats && (
              <div className="flex items-center gap-1.5 text-primary-600">
                <Clock className="w-4 h-4" />
                <span>{studyStats.dueToday} due</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCard}
              disabled={currentIndex === cards.length - 1}
              className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
