import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Loader2, CheckCircle, AlertCircle, Trash2, Database } from 'lucide-react';
import type { ExamSection, Difficulty } from '../../types';

// ============================================================================
// Types
// ============================================================================

type StatusType = 'idle' | 'loading' | 'success' | 'error';

interface SeedQuestion {
  section: ExamSection;
  topicId: string;
  topic: string;
  difficulty: Difficulty | string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference: string;
  blueprintTopic?: string;
  hr1?: boolean;
  effectiveDate?: string;
}

// Dynamically import seed questions to reduce bundle size
const loadSeedQuestions = () => import('../../data/seedQuestions').then(m => m.SEED_QUESTIONS);
const loadSeedStats = () => import('../../data/seedQuestions').then(m => m.getSeedQuestionStats);

// ============================================================================
// Component
// ============================================================================

const AdminSeed: React.FC = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState<StatusType>('idle');
  const [message, setMessage] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [seedQuestions, setSeedQuestions] = useState<SeedQuestion[] | null>(null);
  const [seedStats, setSeedStats] = useState<{ total: number; bySection: Record<string, number> } | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Load seed data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [questions, getStats] = await Promise.all([loadSeedQuestions(), loadSeedStats()]);
        setSeedQuestions(questions);
        setSeedStats(getStats());
      } catch (error) {
        console.error('Error loading seed data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  const checkQuestionCount = async (): Promise<void> => {
    try {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);
      setQuestionCount(snapshot.size);
    } catch (error) {
      console.error('Error checking questions:', error);
    }
  };

  const seedDatabase = async (): Promise<void> => {
    if (!seedQuestions) {
      setStatus('error');
      setMessage('Seed data not loaded');
      return;
    }

    setStatus('loading');
    setMessage('Seeding questions...');

    try {
      const batchSize = 400;
      let batch = writeBatch(db);
      let batchCount = 0;
      let totalCount = 0;

      for (const question of seedQuestions) {
        const questionRef = doc(collection(db, 'questions'));
        batch.set(questionRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          usageCount: 0,
          reportCount: 0,
        });

        batchCount++;
        totalCount++;

        if (batchCount >= batchSize) {
          await batch.commit();
          batch = writeBatch(db);
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }

      setStatus('success');
      setMessage(`Successfully seeded ${totalCount} questions!`);
      checkQuestionCount();
    } catch (error) {
      console.error('Error seeding:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setStatus('error');
      setMessage(`Error: ${errorMessage}`);
    }
  };

  const deleteAllQuestions = async (): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete ALL questions? This cannot be undone.')) {
      return;
    }

    setStatus('loading');
    setMessage('Deleting questions...');

    try {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);

      const batchSize = 400;
      let batch = writeBatch(db);
      let batchCount = 0;
      let totalDeleted = 0;

      for (const docSnap of snapshot.docs) {
        batch.delete(docSnap.ref);
        batchCount++;
        totalDeleted++;

        if (batchCount >= batchSize) {
          await batch.commit();
          batch = writeBatch(db);
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }

      setStatus('success');
      setMessage(`Deleted ${totalDeleted} questions.`);
      setQuestionCount(0);
    } catch (error) {
      console.error('Error deleting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setStatus('error');
      setMessage(`Error: ${errorMessage}`);
    }
  };

  // Check count on mount
  useEffect(() => {
    checkQuestionCount();
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Please log in to access admin tools.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto page-transition">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Database className="w-7 h-7 text-primary-600" />
          Admin: Seed Questions
        </h1>

        {/* Question Count */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-slate-600">
            Current questions in database:{' '}
            <span className="font-bold text-slate-900">
              {questionCount === null ? 'Loading...' : questionCount}
            </span>
          </p>
          <button
            onClick={checkQuestionCount}
            className="text-primary-600 text-sm hover:underline mt-1"
          >
            Refresh count
          </button>
        </div>

        {/* Status Message */}
        {status !== 'idle' && (
          <div
            className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
              status === 'loading'
                ? 'bg-blue-50 text-blue-700'
                : status === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
            }`}
          >
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'error' && <AlertCircle className="w-5 h-5" />}
            <span>{message}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoadingData ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
            <p className="text-slate-500 mt-2">Loading seed data...</p>
          </div>
        ) : (
          <>
            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={seedDatabase}
                disabled={status === 'loading' || !seedQuestions}
                className="btn-primary w-full disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Seeding...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5 mr-2" />
                    Seed {seedStats?.total || 0} Legacy Questions
                  </>
                )}
              </button>

              <button
                onClick={deleteAllQuestions}
                disabled={status === 'loading'}
                className="btn-secondary w-full text-red-600 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete All Questions
              </button>
            </div>

            {/* Question Preview */}
            {seedStats && (
              <div className="mt-8">
                <h2 className="font-semibold text-slate-900 mb-3">Legacy seed questions:</h2>
                <div className="space-y-2 text-sm">
                  {Object.entries(seedStats.bySection).map(([section, count]) => (
                    <div key={section} className="flex justify-between text-slate-600">
                      <span>{section}</span>
                      <span className="font-medium">{count} questions</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{seedStats.total} questions</span>
                  </div>
                </div>
                <p className="text-xs text-amber-600 mt-4">
                  ⚠️ Note: Use the main question bank (AdminCMS) for the full 2,500+ questions.
                  This seed data is for legacy/testing purposes.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSeed;
