/**
 * MilestoneTestimonialPrompt
 *
 * Throttled, self-contained wrapper around TestimonialPrompt that triggers
 * after meaningful practice/mock-exam milestones.
 *
 * Eligibility:
 *  - User scored >= MIN_SCORE on a session of >= MIN_QUESTIONS
 *  - User has not already submitted a testimonial
 *  - User has not been prompted in the last 30 days
 *  - User dismissals are honored (3 dismissals = never ask again)
 *
 * Persistence: lightweight per-user state stored in Firestore at
 * `users/{uid}/_meta/testimonialPrompt` with fields:
 *   { lastShownAt, dismissCount, submittedAt? }
 *
 * Renders as a fixed bottom-right card after a short delay so users
 * see their results first.
 */

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, query, collection, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { TestimonialPrompt } from '../pages/admin/TestimonialHarvester';
import { X } from 'lucide-react';
import logger from '../../utils/logger';
import type { CourseId } from '../../types';

const MIN_SCORE = 75;            // % correct
const MIN_QUESTIONS = 25;        // session length floor (mock-exam-ish)
const COOLDOWN_DAYS = 30;        // don't re-ask within this window
const MAX_DISMISSALS = 3;        // give up after this many "maybe later"
const SHOW_DELAY_MS = 4000;      // wait so user reads results first

interface MilestoneTestimonialPromptProps {
  userId: string;
  userEmail: string;
  userName: string;
  courseId: CourseId;
  section?: string;
  scorePercent: number;
  questionCount: number;
}

interface PromptMeta {
  lastShownAt?: { seconds: number };
  dismissCount?: number;
  submittedAt?: { seconds: number };
}

export default function MilestoneTestimonialPrompt({
  userId,
  userEmail,
  userName,
  courseId,
  section,
  scorePercent,
  questionCount,
}: MilestoneTestimonialPromptProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [closed, setClosed] = useState(false);

  // Quick eligibility check (skip async if score/length doesn't qualify)
  const meetsThreshold = scorePercent >= MIN_SCORE && questionCount >= MIN_QUESTIONS;

  useEffect(() => {
    if (!meetsThreshold || !userId) return;

    let cancelled = false;
    const check = async () => {
      try {
        // 1) Already submitted any testimonial?
        const subQ = query(
          collection(db, 'testimonials'),
          where('userId', '==', userId),
          limit(1),
        );
        const subSnap = await getDocs(subQ);
        if (!subSnap.empty) return;

        // 2) Throttle / dismissal check
        const metaRef = doc(db, 'users', userId, '_meta', 'testimonialPrompt');
        const metaSnap = await getDoc(metaRef);
        const meta = (metaSnap.exists() ? (metaSnap.data() as PromptMeta) : {}) as PromptMeta;

        if (meta.submittedAt) return;
        if ((meta.dismissCount ?? 0) >= MAX_DISMISSALS) return;
        if (meta.lastShownAt?.seconds) {
          const ageMs = Date.now() - meta.lastShownAt.seconds * 1000;
          if (ageMs < COOLDOWN_DAYS * 24 * 60 * 60 * 1000) return;
        }

        // 3) Mark as shown now
        await setDoc(metaRef, { ...meta, lastShownAt: serverTimestamp() }, { merge: true });
        if (!cancelled) {
          // Brief delay so user reads results first
          setTimeout(() => { if (!cancelled) setShouldShow(true); }, SHOW_DELAY_MS);
        }
      } catch (err) {
        logger.warn('Testimonial prompt eligibility check failed:', err);
      }
    };
    check();
    return () => { cancelled = true; };
  }, [meetsThreshold, userId]);

  const handleDismiss = async () => {
    setClosed(true);
    try {
      const metaRef = doc(db, 'users', userId, '_meta', 'testimonialPrompt');
      const snap = await getDoc(metaRef);
      const prev = (snap.exists() ? (snap.data() as PromptMeta) : {}) as PromptMeta;
      await setDoc(
        metaRef,
        { ...prev, dismissCount: (prev.dismissCount ?? 0) + 1 },
        { merge: true },
      );
    } catch (err) {
      logger.warn('Failed to record testimonial dismissal:', err);
    }
  };

  const handleSubmit = async () => {
    setClosed(true);
    try {
      const metaRef = doc(db, 'users', userId, '_meta', 'testimonialPrompt');
      await setDoc(metaRef, { submittedAt: serverTimestamp() }, { merge: true });
    } catch (err) {
      logger.warn('Failed to record testimonial submission:', err);
    }
  };

  if (!shouldShow || closed) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 fade-in duration-300"
      role="dialog"
      aria-label="Share your VoraPrep experience"
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 z-10 w-7 h-7 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        >
          <X className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
        </button>
        <TestimonialPrompt
          userId={userId}
          userEmail={userEmail}
          userName={userName}
          courseId={courseId}
          section={section}
          examScore={scorePercent}
          trigger="milestone"
          onSubmit={handleSubmit}
          onDismiss={handleDismiss}
        />
      </div>
    </div>
  );
}
