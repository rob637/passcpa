/**
 * Testimonial Harvester — Automated collection of success stories
 * 
 * Features:
 * - Auto-detect passing scores ("pass alerts")
 * - In-app testimonial prompts
 * - Multi-format collection (text, video link, rating)
 * - Approval workflow for public display
 * - Export for marketing use
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ChevronLeft, Star, MessageSquare, CheckCircle, XCircle, RefreshCw,
  Download, Award, Quote, Video,
  Eye, Trash2, Send,
} from 'lucide-react';
import {
  collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit,
  doc, updateDoc, deleteDoc, where,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { isAdminEmail } from '../../../config/adminConfig';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { CourseId } from '../../../types/course';
import logger from '../../../utils/logger';

// Types
interface Testimonial {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  courseId: CourseId;
  section?: string;
  examScore?: number;
  rating: number; // 1-5 stars
  headline: string;
  body: string;
  videoUrl?: string;
  photoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: { seconds: number };
  approvedAt?: { seconds: number };
  studyDuration?: string;
  previousAttempts?: number;
  wouldRecommend: boolean;
}

interface TestimonialStats {
  totalSubmissions: number;
  approved: number;
  pending: number;
  avgRating: number;
  byExam: Record<string, number>;
  passRateFromTestimonials: number;
}

// ============================================================================
// User-Facing Testimonial Prompt
// ============================================================================

interface TestimonialPromptProps {
  userId: string;
  userEmail: string;
  userName: string;
  courseId: CourseId;
  section?: string;
  examScore?: number;
  trigger: 'pass_alert' | 'milestone' | 'churn_prevention' | 'survey';
  onSubmit?: () => void;
  onDismiss?: () => void;
}

export function TestimonialPrompt({
  userId,
  userEmail,
  userName,
  courseId,
  section,
  examScore,
  trigger,
  onSubmit,
  onDismiss,
}: TestimonialPromptProps) {
  const [step, setStep] = useState<'intro' | 'rating' | 'details' | 'submitted'>('intro');
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [studyDuration, setStudyDuration] = useState('');
  const [previousAttempts, setPreviousAttempts] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !headline.trim()) return;
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'testimonials'), {
        userId,
        userEmail,
        userName,
        courseId,
        section,
        examScore,
        rating,
        headline,
        body,
        videoUrl: videoUrl || null,
        wouldRecommend,
        studyDuration: studyDuration || null,
        previousAttempts,
        status: 'pending',
        featured: false,
        trigger,
        createdAt: serverTimestamp(),
      });

      setStep('submitted');
      onSubmit?.();
    } catch (err) {
      logger.error('Error submitting testimonial', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intro step
  if (step === 'intro') {
    return (
      <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          {examScore ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Congratulations on Passing! 🎉
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You scored <strong>{examScore}</strong> on {section || courseId.toUpperCase()}!
                Share your success to inspire others.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                How's Your Study Journey Going?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your feedback helps us improve and inspires fellow candidates.
              </p>
            </>
          )}
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => onDismiss?.()}>
              Maybe Later
            </Button>
            <Button variant="primary" onClick={() => setStep('rating')}>
              Share My Story <Star className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Rating step
  if (step === 'rating') {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          How would you rate VoraPrep?
        </h3>
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => setStep('intro')}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => setStep('details')}
            disabled={rating === 0}
          >
            Continue
          </Button>
        </div>
      </Card>
    );
  }

  // Details step
  if (step === 'details') {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tell Us More
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Headline (required)
            </label>
            <input
              type="text"
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="e.g., Passed FAR on first try!"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your story (optional)
            </label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="What made VoraPrep helpful for your exam prep?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                How long did you study?
              </label>
              <select
                value={studyDuration}
                onChange={e => setStudyDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select...</option>
                <option value="< 1 month">Less than 1 month</option>
                <option value="1-2 months">1-2 months</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Previous attempts?
              </label>
              <select
                value={previousAttempts ?? ''}
                onChange={e => setPreviousAttempts(e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select...</option>
                <option value="0">First attempt</option>
                <option value="1">1 previous attempt</option>
                <option value="2">2 previous attempts</option>
                <option value="3">3+ previous attempts</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Video testimonial URL (optional)
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/... or TikTok/Instagram link"
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recommend"
              checked={wouldRecommend}
              onChange={e => setWouldRecommend(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="recommend" className="text-sm text-gray-700 dark:text-gray-300">
              I would recommend VoraPrep to a friend
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button variant="secondary" onClick={() => setStep('rating')}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!headline.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
            <Send className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    );
  }

  // Submitted step
  return (
    <Card className="p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Thank You! 🙏
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Your testimonial has been submitted and will be reviewed shortly.
      </p>
      <Button variant="secondary" onClick={() => onDismiss?.()}>
        Close
      </Button>
    </Card>
  );
}

// ============================================================================
// Admin Testimonial Dashboard
// ============================================================================

export default function TestimonialHarvesterAdmin() {
  const { user, userProfile } = useAuth();
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  const [isLoading, setIsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [stats, setStats] = useState<TestimonialStats>({
    totalSubmissions: 0,
    approved: 0,
    pending: 0,
    avgRating: 0,
    byExam: {},
    passRateFromTestimonials: 0,
  });

  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoading(true);

    try {
      const testimonialsQuery = query(
        collection(db, 'testimonials'),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const snap = await getDocs(testimonialsQuery);
      const data: Testimonial[] = [];
      snap.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      setTestimonials(data);

      // Calculate stats
      const approved = data.filter(t => t.status === 'approved').length;
      const pending = data.filter(t => t.status === 'pending').length;
      const totalRating = data.reduce((sum, t) => sum + t.rating, 0);
      const byExam: Record<string, number> = {};
      const withScore = data.filter(t => t.examScore);
      const passing = withScore.filter(t => (t.examScore ?? 0) >= 75).length;

      data.forEach(t => {
        byExam[t.courseId] = (byExam[t.courseId] || 0) + 1;
      });

      setStats({
        totalSubmissions: data.length,
        approved,
        pending,
        avgRating: data.length > 0 ? totalRating / data.length : 0,
        byExam,
        passRateFromTestimonials: withScore.length > 0 ? passing / withScore.length : 0,
      });
    } catch (err) {
      logger.error('Error loading testimonials', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'testimonials', id), {
        status,
        ...(status === 'approved' ? { approvedAt: serverTimestamp() } : {}),
      });
      loadData();
    } catch (err) {
      logger.error('Error updating testimonial', err);
      alert('Failed to update status');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await updateDoc(doc(db, 'testimonials', id), { featured });
      loadData();
    } catch (err) {
      logger.error('Error toggling featured', err);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      loadData();
    } catch (err) {
      logger.error('Error deleting testimonial', err);
    }
  };

  const exportToCsv = () => {
    const headers = ['Name', 'Email', 'Exam', 'Score', 'Rating', 'Headline', 'Status', 'Date'];
    const rows = testimonials.map(t => [
      t.userName,
      t.userEmail,
      t.courseId.toUpperCase(),
      t.examScore?.toString() || '',
      t.rating.toString(),
      `"${t.headline.replace(/"/g, '""')}"`,
      t.status,
      t.createdAt?.seconds ? format(new Date(t.createdAt.seconds * 1000), 'yyyy-MM-dd') : '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voraprep-testimonials-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.status === filter);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400">You need admin privileges to view this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                  Testimonial Harvester
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Collect and manage user success stories
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={loadData} leftIcon={RefreshCw}>
                Refresh
              </Button>
              <Button variant="secondary" onClick={exportToCsv} leftIcon={Download}>
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSubmissions}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Approved</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Avg Rating</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.passRateFromTestimonials * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    filter === status
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === 'pending' && stats.pending > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                      {stats.pending}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTestimonials.length === 0 ? (
                <Card className="p-8 text-center col-span-2">
                  <Quote className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No testimonials yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Testimonials will appear here when users submit them after passing their exams.
                  </p>
                </Card>
              ) : (
                filteredTestimonials.map(testimonial => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    onApprove={() => updateStatus(testimonial.id, 'approved')}
                    onReject={() => updateStatus(testimonial.id, 'rejected')}
                    onToggleFeatured={() => toggleFeatured(testimonial.id, !testimonial.featured)}
                    onDelete={() => deleteTestimonial(testimonial.id)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Testimonial Card Component
// ============================================================================

function TestimonialCard({
  testimonial,
  onApprove,
  onReject,
  onToggleFeatured,
  onDelete,
}: {
  testimonial: Testimonial;
  onApprove: () => void;
  onReject: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className={`p-5 ${testimonial.featured ? 'ring-2 ring-amber-400' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-semibold">
            {testimonial.userName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {testimonial.userName}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>{testimonial.courseId.toUpperCase()}</span>
              {testimonial.examScore && (
                <>
                  <span>•</span>
                  <span className="text-green-600 dark:text-green-400">
                    Score: {testimonial.examScore}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= testimonial.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          "{testimonial.headline}"
        </h4>
        {testimonial.body && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {testimonial.body}
          </p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
        {testimonial.studyDuration && (
          <span>Studied: {testimonial.studyDuration}</span>
        )}
        {testimonial.previousAttempts !== undefined && (
          <span>
            {testimonial.previousAttempts === 0 ? 'First attempt' : `${testimonial.previousAttempts} prior attempts`}
          </span>
        )}
        {testimonial.videoUrl && (
          <a
            href={testimonial.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
          >
            <Video className="w-3 h-3" /> Video
          </a>
        )}
      </div>

      {/* Status & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            testimonial.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            testimonial.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {testimonial.status}
          </span>
          {testimonial.featured && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              <Star className="w-3 h-3 mr-1 fill-current" /> Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {testimonial.status === 'pending' && (
            <>
              <button
                onClick={onApprove}
                className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 transition-colors"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={onReject}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 transition-colors"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          {testimonial.status === 'approved' && (
            <button
              onClick={onToggleFeatured}
              className={`p-2 rounded-lg transition-colors ${
                testimonial.featured
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
              }`}
              title={testimonial.featured ? 'Unfeature' : 'Feature'}
            >
              <Star className={`w-4 h-4 ${testimonial.featured ? 'fill-current' : ''}`} />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}

// ============================================================================
// Public Testimonials Display Component
// ============================================================================

export function TestimonialsDisplay({ courseId, limit = 3 }: { courseId?: CourseId; limit?: number }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        let q = query(
          collection(db, 'testimonials'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );
        
        if (courseId) {
          q = query(
            collection(db, 'testimonials'),
            where('status', '==', 'approved'),
            where('courseId', '==', courseId),
            orderBy('createdAt', 'desc')
          );
        }

        const snap = await getDocs(q);
        const data: Testimonial[] = [];
        snap.docs.slice(0, limit).forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        setTestimonials(data);
      } catch (err) {
        logger.error('Error loading testimonials', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTestimonials();
  }, [courseId, limit]);

  if (isLoading || testimonials.length === 0) return null;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <Card key={t.id} className="p-6">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= t.rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <blockquote className="text-gray-900 dark:text-white font-medium mb-3">
            "{t.headline}"
          </blockquote>
          {t.body && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {t.body}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium text-gray-900 dark:text-white">{t.userName}</div>
              <div className="text-gray-500 dark:text-gray-400">
                {t.courseId.toUpperCase()} {t.section && `• ${t.section}`}
                {t.examScore && ` • Score: ${t.examScore}`}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
