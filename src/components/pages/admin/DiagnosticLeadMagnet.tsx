/**
 * Diagnostic Lead Magnet — Free diagnostic quizzes for lead capture
 * 
 * Features:
 * - Embeddable mini-diagnostic (10 questions)
 * - Email capture before showing results
 * - Shareable result pages with referral links
 * - Forum-friendly landing pages
 * - Admin analytics for conversion tracking
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, CheckCircle, XCircle, Mail, ArrowRight,
  Target, TrendingUp, BookOpen, Award, Zap, Users, RefreshCw,
  Download, ExternalLink, Copy, Clock, Brain,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useAuth } from '../../../hooks/useAuth';
import { isAdminEmail } from '../../../config/adminConfig';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { CourseId } from '../../../types/course';
import logger from '../../../utils/logger';

// Types
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
}

interface DiagnosticConfig {
  id: string;
  courseId: CourseId;
  section: string;
  title: string;
  description: string;
  questions: DiagnosticQuestion[];
  passingThreshold: number;
  shareText: string;
}

interface DiagnosticLead {
  id: string;
  email: string;
  diagnosticId: string;
  courseId: string;
  section: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  utm_source?: string;
  utm_campaign?: string;
  referralCode?: string;
  createdAt: { seconds: number };
  convertedToUser?: boolean;
}

// Sample diagnostic questions for each exam
const DIAGNOSTIC_CONFIGS: Record<string, DiagnosticConfig> = {
  'cpa-far-mini': {
    id: 'cpa-far-mini',
    courseId: 'cpa',
    section: 'FAR',
    title: 'CPA FAR Mini Diagnostic',
    description: 'Test your Financial Accounting & Reporting readiness in 5 minutes',
    passingThreshold: 0.7,
    shareText: 'I just took the VoraPrep CPA FAR diagnostic! See if you can beat my score:',
    questions: [
      {
        id: 'far-d1',
        question: 'Under GAAP, which method is NOT acceptable for inventory costing?',
        options: ['FIFO', 'LIFO', 'Weighted Average', 'NIFO'],
        correctAnswer: 3,
        topic: 'Inventory',
        explanation: 'NIFO (Next-In, First-Out) is not an acceptable inventory costing method under GAAP.',
      },
      {
        id: 'far-d2',
        question: 'What is the primary purpose of the statement of cash flows?',
        options: [
          'Show profitability',
          'Show changes in cash position',
          'Show asset values',
          'Show stockholder equity'
        ],
        correctAnswer: 1,
        topic: 'Financial Statements',
        explanation: 'The statement of cash flows reports the cash generated and used during a period.',
      },
      {
        id: 'far-d3',
        question: 'Depreciation expense is added back in the indirect method because:',
        options: [
          'It increases net income',
          'It represents a cash inflow',
          'It was deducted but didn\'t use cash',
          'It decreases liabilities'
        ],
        correctAnswer: 2,
        topic: 'Cash Flows',
        explanation: 'Depreciation is a non-cash expense that reduces net income but doesn\'t affect cash.',
      },
      {
        id: 'far-d4',
        question: 'Under ASC 606, revenue is recognized when:',
        options: [
          'Cash is received',
          'A contract is signed',
          'Control is transferred',
          'An invoice is sent'
        ],
        correctAnswer: 2,
        topic: 'Revenue Recognition',
        explanation: 'Under ASC 606, revenue is recognized when (or as) control of goods/services transfers.',
      },
      {
        id: 'far-d5',
        question: 'A lease is classified as a finance lease if it:',
        options: [
          'Is for less than 12 months',
          'Transfers ownership at the end',
          'Has variable payments only',
          'Is cancelable at any time'
        ],
        correctAnswer: 1,
        topic: 'Leases',
        explanation: 'Transfer of ownership is one of the five criteria for finance lease classification.',
      },
    ],
  },
  'ea-see1-mini': {
    id: 'ea-see1-mini',
    courseId: 'ea',
    section: 'SEE1',
    title: 'EA Part 1 Mini Diagnostic',
    description: 'Test your individual tax knowledge in 5 minutes',
    passingThreshold: 0.7,
    shareText: 'I just took the VoraPrep EA Part 1 diagnostic! How well do you know individual taxes?',
    questions: [
      {
        id: 'see1-d1',
        question: 'Which filing status generally provides the lowest tax rates for unmarried taxpayers?',
        options: ['Single', 'Head of Household', 'Married Filing Separately', 'Qualifying Widow(er)'],
        correctAnswer: 1,
        topic: 'Filing Status',
        explanation: 'Head of Household provides wider tax brackets and a higher standard deduction than Single.',
      },
      {
        id: 'see1-d2',
        question: 'The standard deduction for 2024 for Single filers is approximately:',
        options: ['$10,000', '$13,850', '$14,600', '$20,800'],
        correctAnswer: 2,
        topic: 'Standard Deduction',
        explanation: 'The 2024 standard deduction for Single filers is $14,600.',
      },
      {
        id: 'see1-d3',
        question: 'Which of the following is above-the-line deduction?',
        options: ['Mortgage interest', 'State income taxes', 'Student loan interest', 'Charitable contributions'],
        correctAnswer: 2,
        topic: 'Adjustments to Income',
        explanation: 'Student loan interest (up to $2,500) is deducted above the line (for AGI).',
      },
      {
        id: 'see1-d4',
        question: 'Long-term capital gains holding period requires ownership for more than:',
        options: ['6 months', '1 year', '18 months', '2 years'],
        correctAnswer: 1,
        topic: 'Capital Gains',
        explanation: 'Long-term treatment requires holding the asset for more than one year.',
      },
      {
        id: 'see1-d5',
        question: 'The maximum IRA contribution for taxpayers under 50 in 2024 is:',
        options: ['$6,000', '$6,500', '$7,000', '$7,500'],
        correctAnswer: 2,
        topic: 'Retirement Accounts',
        explanation: 'The 2024 IRA contribution limit is $7,000 for those under 50.',
      },
    ],
  },
};

// ============================================================================
// Public Diagnostic Component (Embeddable)
// ============================================================================

export function DiagnosticQuiz({ configId }: { configId: string }) {
  const [searchParams] = useSearchParams();
  const config = DIAGNOSTIC_CONFIGS[configId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [copied, setCopied] = useState(false);

  // UTM params
  const utmSource = searchParams.get('utm_source') || '';
  const utmCampaign = searchParams.get('utm_campaign') || '';
  const referralCode = searchParams.get('ref') || '';

  useEffect(() => {
    if (config) {
      setAnswers(new Array(config.questions.length).fill(null));
    }
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Diagnostic Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">This diagnostic quiz doesn't exist.</p>
        </Card>
      </div>
    );
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < config.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    config.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: config.questions.length,
      percentage: correct / config.questions.length,
      passed: correct / config.questions.length >= config.passingThreshold,
    };
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    const score = calculateScore();

    try {
      await addDoc(collection(db, 'diagnosticLeads'), {
        email,
        diagnosticId: config.id,
        courseId: config.courseId,
        section: config.section,
        score: score.correct,
        totalQuestions: score.total,
        percentage: score.percentage,
        passed: score.passed,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        referralCode,
        createdAt: serverTimestamp(),
        convertedToUser: false,
      });

      setLeadCaptured(true);
    } catch (err) {
      logger.error('Error capturing lead', err);
      // Still show results even if lead capture fails
      setLeadCaptured(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const score = calculateScore();
  const shareUrl = `${window.location.origin}/diagnostic/${config.id}${referralCode ? `?ref=${referralCode}` : ''}`;

  // Email capture gate
  if (showResults && !leadCaptured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get Your Results!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enter your email to see how you scored and get personalized study recommendations.
          </p>

          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Show My Results'}
            </Button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            We'll send you study tips and exam prep resources. Unsubscribe anytime.
          </p>
        </Card>
      </div>
    );
  }

  // Results view
  if (showResults && leadCaptured) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              score.passed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
            }`}>
              {score.passed ? (
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              ) : (
                <Target className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {score.passed ? 'Great Job!' : 'Keep Studying!'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You scored <strong>{score.correct}/{score.total}</strong> ({Math.round(score.percentage * 100)}%)
            </p>
          </div>

          {/* Score Card */}
          <Card className="p-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Question Breakdown
            </h3>
            <div className="space-y-3">
              {config.questions.map((q, idx) => {
                const isCorrect = answers[idx] === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg ${
                      isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {q.topic}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* CTA */}
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white mb-6">
            <div className="text-center">
              <Zap className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Ready to Pass Your Exam?</h3>
              <p className="text-blue-100 mb-4">
                Join thousands of candidates using VoraPrep's AI-powered study system.
              </p>
              <Link
                to={`/signup?ref=${referralCode || ''}&utm_source=diagnostic&utm_campaign=${config.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>

          {/* Share */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Challenge Your Friends
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              />
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz view
  const question = config.questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-4">
            <Brain className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{config.title}</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> ~5 min
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" /> {config.questions.length} questions
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {config.questions.length}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {Math.round(((currentQuestion + 1) / config.questions.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / config.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <Card className="p-6 mb-6">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
            {question.topic}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  answers[currentQuestion] === idx
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    answers[currentQuestion] === idx
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
          >
            {currentQuestion === config.questions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Admin Lead Management Dashboard
// ============================================================================

export default function DiagnosticLeadMagnetAdmin() {
  const { user, userProfile } = useAuth();
  const isAdmin = user && (userProfile?.isAdmin || isAdminEmail(user?.email));

  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<DiagnosticLead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    conversionRate: 0,
    avgScore: 0,
    leadsByDiagnostic: {} as Record<string, number>,
  });

  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setIsLoading(true);

    try {
      const leadsQuery = query(
        collection(db, 'diagnosticLeads'),
        orderBy('createdAt', 'desc'),
        limit(200)
      );
      const leadsSnap = await getDocs(leadsQuery);
      const leadsData: DiagnosticLead[] = [];
      leadsSnap.forEach(doc => {
        leadsData.push({ id: doc.id, ...doc.data() } as DiagnosticLead);
      });
      setLeads(leadsData);

      // Calculate stats
      const converted = leadsData.filter(l => l.convertedToUser).length;
      const totalScore = leadsData.reduce((sum, l) => sum + (l.score / l.totalQuestions), 0);
      const byDiagnostic: Record<string, number> = {};
      leadsData.forEach(l => {
        byDiagnostic[l.diagnosticId] = (byDiagnostic[l.diagnosticId] || 0) + 1;
      });

      setStats({
        totalLeads: leadsData.length,
        conversionRate: leadsData.length > 0 ? converted / leadsData.length : 0,
        avgScore: leadsData.length > 0 ? totalScore / leadsData.length : 0,
        leadsByDiagnostic: byDiagnostic,
      });
    } catch (err) {
      logger.error('Error loading leads', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const exportToCsv = () => {
    const headers = ['Email', 'Diagnostic', 'Score', 'Passed', 'Source', 'Date', 'Converted'];
    const rows = leads.map(l => [
      l.email,
      l.diagnosticId,
      `${l.score}/${l.totalQuestions}`,
      l.passed ? 'Yes' : 'No',
      l.utm_source || 'direct',
      l.createdAt?.seconds ? format(new Date(l.createdAt.seconds * 1000), 'yyyy-MM-dd') : '',
      l.convertedToUser ? 'Yes' : 'No',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voraprep-diagnostic-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

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
                  <Target className="w-5 h-5 text-green-500" />
                  Diagnostic Lead Magnet
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Free diagnostic quizzes for lead capture
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
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLeads}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total Leads</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.conversionRate * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Conversion Rate</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.avgScore * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Avg Score</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Object.keys(stats.leadsByDiagnostic).length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Active Diagnostics</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Available Diagnostics */}
            <Card className="p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Available Diagnostic Links
              </h3>
              <div className="space-y-3">
                {Object.entries(DIAGNOSTIC_CONFIGS).map(([id, config]) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{config.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{config.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {stats.leadsByDiagnostic[id] || 0} leads
                      </span>
                      <a
                        href={`/diagnostic/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/diagnostic/${id}`);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leads Table */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Recent Leads
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Email</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Diagnostic</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Score</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Source</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Date</th>
                      <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Converted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                          No leads yet. Share diagnostic links to start capturing leads!
                        </td>
                      </tr>
                    ) : (
                      leads.slice(0, 20).map(lead => (
                        <tr key={lead.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3 text-gray-900 dark:text-white">{lead.email}</td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{lead.diagnosticId}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              lead.passed
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {lead.score}/{lead.totalQuestions}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                            {lead.utm_source || 'direct'}
                          </td>
                          <td className="py-2 px-3 text-gray-600 dark:text-gray-400">
                            {lead.createdAt?.seconds
                              ? format(new Date(lead.createdAt.seconds * 1000), 'MMM d, yyyy')
                              : '—'}
                          </td>
                          <td className="py-2 px-3">
                            {lead.convertedToUser ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
