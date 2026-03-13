/**
 * Course Factory — Admin tool for generating new exam prep courses
 *
 * Workflow:
 * 1. Enter exam name (e.g., "CISSP") → Research via Gemini → Blueprint
 * 2. Review/edit blueprint → Set content targets
 * 3. Start generation → Monitor progress in real-time
 * 4. Assemble course files when complete
 *
 * Progress is tracked in Firestore: courseFactory/{jobId}
 * The Python script (scripts/course-factory.py) handles actual generation.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Factory, Search, Play, CheckCircle, AlertCircle,
  ChevronRight, Edit3, Loader2, RefreshCw, Trash2,
  BookOpen, FileText, Layers, Clock, ArrowLeft, Zap,
  RotateCcw, Download,
} from 'lucide-react';
import { collection, doc, setDoc, onSnapshot, query, orderBy, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { useAuth } from '../../../hooks/useAuth';
import logger from '../../../utils/logger';

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlueprintSection {
  id: string;
  name: string;
  weight: number;
  topics: string[];
}

interface Blueprint {
  examName: string;
  fullName: string;
  provider: string;
  website?: string;
  passingScore: number;
  passingScoreMax?: number;
  totalQuestions: number;
  timeAllowedMinutes: number;
  questionTypes: string[];
  examFormat?: string;
  prerequisites?: string;
  recertification?: string;
  sections: BlueprintSection[];
  authorityRefs?: string[];
  studyHoursRecommended?: string;
  difficultyRating?: string;
  targetAudience?: string;
}

interface JobProgress {
  phase: string;
  currentSection: string;
  sectionsComplete: number;
  sectionsTotal: number;
  mcqsGenerated: number;
  lessonsGenerated: number;
  flashcardsGenerated: number;
  tbsGenerated: number;
  mcqsEnhanced: number;
  lessonsEnhanced: number;
  flashcardsEnhanced: number;
  errorsCount: number;
  errors: Array<{ section: string; message: string; timestamp: string }>;
  startedAt: string | null;
}

interface CourseFactoryJob {
  id: string;
  examName: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  status: 'created' | 'researching' | 'researched' | 'generating' | 'generated' | 'enhancing' | 'enhanced' | 'assembling' | 'assembled' | 'error' | 'complete';
  blueprint: Blueprint | null;
  plan: {
    mcqTarget: number;
    lessonTarget: number;
    flashcardTarget: number;
  };
  progress: JobProgress;
  output: {
    filesGenerated: string[];
    configPath: string;
    registryUpdated: boolean;
  };
}

type Step = 'input' | 'review' | 'targets' | 'monitor';

// ─── Phase helpers ───────────────────────────────────────────────────────────

const PHASES = ['research', 'generating', 'enhancing', 'assembling', 'complete'] as const;

function phaseIndex(phase: string): number {
  const idx = PHASES.findIndex(p => phase.startsWith(p) || phase === p || phase === p + 'd');
  return idx >= 0 ? idx : 0;
}

function phaseLabel(phase: string): string {
  if (phase.startsWith('research')) return 'Research';
  if (phase.startsWith('generat')) return 'Generate';
  if (phase.startsWith('enhanc')) return 'Enhance';
  if (phase.startsWith('assembl')) return 'Assemble';
  if (phase === 'complete') return 'Complete';
  return phase;
}

function statusColor(status: string): string {
  switch (status) {
    case 'assembled':
    case 'complete':
      return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'error':
      return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    case 'generating':
    case 'enhancing':
    case 'assembling':
    case 'researching':
      return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
    default:
      return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800';
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CourseFactory() {
  const { user: _user } = useAuth();

  const [step, setStep] = useState<Step>('input');
  const [examName, setExamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Current job
  const [activeJob, setActiveJob] = useState<CourseFactoryJob | null>(null);

  // Job history
  const [jobs, setJobs] = useState<CourseFactoryJob[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Targets (editable before generation)
  const [mcqTarget, setMcqTarget] = useState(2500);
  const [lessonTarget, setLessonTarget] = useState(150);
  const [flashcardTarget, setFlashcardTarget] = useState(800);

  // Blueprint editing
  const [editingBlueprint, setEditingBlueprint] = useState(false);
  const [blueprintJson, setBlueprintJson] = useState('');

  // ─── Load job history from Firestore ─────────────────────────────────────

  const loadJobs = useCallback(async () => {
    try {
      const q = query(collection(db, 'courseFactory'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const loaded: CourseFactoryJob[] = [];
      snap.forEach(docSnap => {
        loaded.push({ id: docSnap.id, ...docSnap.data() } as CourseFactoryJob);
      });
      setJobs(loaded);
    } catch (err) {
      logger.warn('Failed to load course factory jobs:', err);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // ─── Real-time listener for active job ───────────────────────────────────

  useEffect(() => {
    if (!activeJob?.id) return;

    const unsub = onSnapshot(
      doc(db, 'courseFactory', activeJob.id),
      (snap) => {
        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() } as CourseFactoryJob;
          setActiveJob(data);
        }
      },
      (err) => {
        logger.warn('Firestore listener error:', err);
      }
    );

    return () => unsub();
  }, [activeJob?.id]);

  // ─── Research exam via Gemini ──────────────────────────────────────────

  const handleResearch = async () => {
    if (!examName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const exam = examName.trim().toUpperCase();
      const jobId = `${exam.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now()}`;
      const courseId = exam.toLowerCase().replace(/[^a-z0-9]/g, '');

      const job: CourseFactoryJob = {
        id: jobId,
        examName: exam,
        courseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'researching',
        blueprint: null,
        plan: { mcqTarget, lessonTarget, flashcardTarget },
        progress: {
          phase: 'research',
          currentSection: '',
          sectionsComplete: 0,
          sectionsTotal: 0,
          mcqsGenerated: 0,
          lessonsGenerated: 0,
          flashcardsGenerated: 0,
          tbsGenerated: 0,
          mcqsEnhanced: 0,
          lessonsEnhanced: 0,
          flashcardsEnhanced: 0,
          errorsCount: 0,
          errors: [],
          startedAt: new Date().toISOString(),
        },
        output: { filesGenerated: [], configPath: '', registryUpdated: false },
      };

      // Save initial job to Firestore
      await setDoc(doc(db, 'courseFactory', jobId), {
        ...job,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setActiveJob(job);

      // Call Gemini directly for research
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not configured');

      const researchPrompt = `You are an expert on professional certification exams. Research the ${exam} exam thoroughly.

Return a JSON object (no markdown fences) with this EXACT structure:
{
  "examName": "${exam}",
  "fullName": "Full official exam name",
  "provider": "Certifying body (e.g., ISC², ISACA, IMA)",
  "website": "Official exam URL",
  "passingScore": 700,
  "passingScoreMax": 1000,
  "totalQuestions": 150,
  "timeAllowedMinutes": 240,
  "questionTypes": ["mcq"],
  "examFormat": "e.g. Computer-Based Testing (CBT)",
  "prerequisites": "Experience/education requirements",
  "recertification": "CPE/renewal requirements",
  "sections": [
    {
      "id": "${exam}-D1",
      "name": "Domain/Section name",
      "weight": 15,
      "topics": ["Specific topic 1", "Specific topic 2"]
    }
  ],
  "authorityRefs": ["Primary reference 1"],
  "studyHoursRecommended": "150-200",
  "difficultyRating": "moderate|challenging|very challenging",
  "targetAudience": "Who takes this exam"
}

IMPORTANT:
- Include ALL domains/sections with accurate weights summing to 100.
- Include 8-15 specific topics per domain.
- Use the MOST CURRENT exam blueprint (2024-2026).
- Section IDs: ${exam}-D1, ${exam}-D2, etc.`;

      const geminiResp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: researchPrompt }] }],
            generationConfig: { temperature: 0.3 },
          }),
        }
      );

      if (!geminiResp.ok) {
        const errText = await geminiResp.text();
        throw new Error(`Gemini API error: ${geminiResp.status} ${errText.slice(0, 200)}`);
      }

      const geminiData = await geminiResp.json();
      const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Parse JSON from response (strip markdown fences if present)
      const cleaned = rawText.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '');
      const blueprint: Blueprint = JSON.parse(cleaned);

      // Validate
      if (!blueprint.sections || blueprint.sections.length === 0) {
        throw new Error('Blueprint has no sections');
      }

      // Update job with blueprint
      const updatedJob: CourseFactoryJob = {
        ...job,
        status: 'researched',
        blueprint,
        progress: {
          ...job.progress,
          phase: 'researched',
          sectionsTotal: blueprint.sections.length,
        },
      };

      await setDoc(doc(db, 'courseFactory', jobId), {
        ...updatedJob,
        updatedAt: serverTimestamp(),
      });

      setActiveJob(updatedJob);
      setStep('review');
      setLoading(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to research exam';
      setError(message);
      setLoading(false);
    }
  };

  // ─── Update job in Firestore ──────────────────────────────────────────────

  const updateJob = async (updates: Partial<CourseFactoryJob>) => {
    if (!activeJob) return;
    try {
      await setDoc(doc(db, 'courseFactory', activeJob.id), {
        ...activeJob,
        ...updates,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      logger.warn('Failed to update job:', err);
    }
  };

  // ─── Approve blueprint and move to targets ───────────────────────────────

  const handleApproveBlueprint = async () => {
    if (!activeJob?.blueprint) return;
    await updateJob({
      status: 'researched',
      plan: { mcqTarget, lessonTarget, flashcardTarget },
    });
    setStep('targets');
  };

  // ─── Save edited blueprint ────────────────────────────────────────────────

  const handleSaveBlueprint = () => {
    try {
      const parsed = JSON.parse(blueprintJson);
      setActiveJob(prev => prev ? { ...prev, blueprint: parsed } : prev);
      setEditingBlueprint(false);
      setError(null);
    } catch {
      setError('Invalid JSON. Please fix and try again.');
    }
  };

  // ─── Start generation ─────────────────────────────────────────────────────

  const handleStartGeneration = async () => {
    if (!activeJob) return;
    await updateJob({
      status: 'generating',
      plan: { mcqTarget, lessonTarget, flashcardTarget },
      progress: {
        ...activeJob.progress,
        phase: 'generating',
        startedAt: new Date().toISOString(),
      },
    });
    setStep('monitor');
  };

  // ─── Resume a previous job ────────────────────────────────────────────────

  const handleResumeJob = (job: CourseFactoryJob) => {
    setActiveJob(job);
    setExamName(job.examName);
    setMcqTarget(job.plan.mcqTarget);
    setLessonTarget(job.plan.lessonTarget);
    setFlashcardTarget(job.plan.flashcardTarget);

    if (['generating', 'enhancing', 'assembling'].includes(job.status)) {
      setStep('monitor');
    } else if (job.status === 'researched' || job.status === 'generated' || job.status === 'enhanced') {
      setStep('targets');
    } else if (job.blueprint) {
      setStep('review');
    } else {
      setStep('input');
    }
    setShowHistory(false);
  };

  // ─── Delete job ────────────────────────────────────────────────────────────

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteDoc(doc(db, 'courseFactory', jobId));
      setJobs(prev => prev.filter(j => j.id !== jobId));
      if (activeJob?.id === jobId) {
        setActiveJob(null);
        setStep('input');
      }
    } catch (err) {
      logger.warn('Failed to delete job:', err);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Factory
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate complete exam prep courses with AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? 'New Course' : 'Job History'}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setStep('input'); setActiveJob(null); }}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Job History */}
        {showHistory ? (
          <JobHistory
            jobs={jobs}
            onResume={handleResumeJob}
            onDelete={handleDeleteJob}
            onRefresh={loadJobs}
          />
        ) : (
          <>
            {/* Stepper */}
            <StepIndicator
              currentStep={step}
              jobStatus={activeJob?.status || null}
            />

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  <button onClick={() => setError(null)} className="text-xs text-red-500 underline mt-1">Dismiss</button>
                </div>
              </div>
            )}

            {/* Step Content */}
            {step === 'input' && (
              <StepInput
                examName={examName}
                setExamName={setExamName}
                loading={loading}
                onResearch={handleResearch}
              />
            )}

            {step === 'review' && activeJob && (
              <StepReview
                job={activeJob}
                editing={editingBlueprint}
                blueprintJson={blueprintJson}
                onStartEdit={() => {
                  setBlueprintJson(JSON.stringify(activeJob.blueprint, null, 2));
                  setEditingBlueprint(true);
                }}
                onSaveEdit={handleSaveBlueprint}
                onCancelEdit={() => setEditingBlueprint(false)}
                onBlueprintChange={setBlueprintJson}
                onApprove={handleApproveBlueprint}
              />
            )}

            {step === 'targets' && activeJob && (
              <StepTargets
                mcqTarget={mcqTarget}
                lessonTarget={lessonTarget}
                flashcardTarget={flashcardTarget}
                setMcqTarget={setMcqTarget}
                setLessonTarget={setLessonTarget}
                setFlashcardTarget={setFlashcardTarget}
                blueprint={activeJob.blueprint}
                onStart={handleStartGeneration}
              />
            )}

            {step === 'monitor' && activeJob && (
              <StepMonitor
                job={activeJob}
                onRefresh={loadJobs}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep, jobStatus: _jobStatus }: { currentStep: Step; jobStatus: string | null }) {
  const steps: { key: Step; label: string; icon: typeof Search }[] = [
    { key: 'input', label: 'Research', icon: Search },
    { key: 'review', label: 'Review', icon: Edit3 },
    { key: 'targets', label: 'Configure', icon: Layers },
    { key: 'monitor', label: 'Generate', icon: Zap },
  ];

  const currentIdx = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i < currentIdx
                  ? 'bg-green-500 text-white'
                  : i === currentIdx
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {i < currentIdx ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
              <span className={`text-sm font-medium ${
                i <= currentIdx
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                i < currentIdx
                  ? 'bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 1: Input ───────────────────────────────────────────────────────────

function StepInput({
  examName, setExamName, loading, onResearch,
}: {
  examName: string;
  setExamName: (v: string) => void;
  loading: boolean;
  onResearch: () => void;
}) {
  const suggestions = [
    { name: 'CISSP', desc: 'Certified Information Systems Security Professional' },
    { name: 'CISM', desc: 'Certified Information Security Manager' },
    { name: 'PMP', desc: 'Project Management Professional' },
    { name: 'CRISC', desc: 'Certified in Risk and Information Systems Control' },
    { name: 'Series 7', desc: 'General Securities Representative' },
    { name: 'FRM', desc: 'Financial Risk Manager' },
  ];

  return (
    <Card className="p-8">
      <div className="max-w-xl mx-auto text-center">
        <Factory className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Create a New Exam Course
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Enter any professional certification exam name. AI will research the exam structure,
          then generate a complete course with MCQs, lessons, and flashcards.
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onResearch()}
            placeholder="Enter exam name (e.g., CISSP)"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <Button
            variant="primary"
            size="lg"
            onClick={onResearch}
            disabled={!examName.trim() || loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Research
              </>
            )}
          </Button>
        </div>

        <div className="text-left">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider font-medium">
            Suggested Exams
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map(s => (
              <button
                key={s.name}
                onClick={() => setExamName(s.name)}
                className="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm">{s.name}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Step 2: Review Blueprint ────────────────────────────────────────────────

function StepReview({
  job, editing, blueprintJson,
  onStartEdit, onSaveEdit, onCancelEdit, onBlueprintChange,
  onApprove,
}: {
  job: CourseFactoryJob;
  editing: boolean;
  blueprintJson: string;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onBlueprintChange: (v: string) => void;
  onApprove: () => void;
}) {
  const bp = job.blueprint;

  if (!bp) {
    return (
      <Card className="p-8 text-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Researching {job.examName}...
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          AI is analyzing the exam structure, domains, and topics. This usually takes 10-30 seconds.
        </p>
      </Card>
    );
  }

  if (editing) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit Blueprint</h3>
        <textarea
          value={blueprintJson}
          onChange={(e) => onBlueprintChange(e.target.value)}
          rows={30}
          className="w-full font-mono text-sm px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="flex gap-3 mt-4">
          <Button variant="primary" onClick={onSaveEdit}>Save Changes</Button>
          <Button variant="ghost" onClick={onCancelEdit}>Cancel</Button>
        </div>
      </Card>
    );
  }

  const totalWeight = bp.sections.reduce((sum, s) => sum + (s.weight || 0), 0);

  return (
    <div className="space-y-6">
      {/* Exam Overview */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {bp.fullName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {bp.provider} &middot; {bp.examFormat || 'CBT'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onStartEdit}>
            <Edit3 className="w-4 h-4 mr-1" />
            Edit JSON
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Stat label="Questions" value={String(bp.totalQuestions)} />
          <Stat label="Time" value={`${bp.timeAllowedMinutes} min`} />
          <Stat label="Passing" value={`${bp.passingScore}/${bp.passingScoreMax || 100}`} />
          <Stat label="Domains" value={String(bp.sections.length)} />
        </div>

        {bp.targetAudience && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <strong>Audience:</strong> {bp.targetAudience}
          </p>
        )}
        {bp.prerequisites && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <strong>Prerequisites:</strong> {bp.prerequisites}
          </p>
        )}
        {bp.studyHoursRecommended && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Study hours:</strong> {bp.studyHoursRecommended}
          </p>
        )}
      </Card>

      {/* Sections */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Exam Domains ({bp.sections.length})
          {totalWeight !== 100 && (
            <span className="ml-2 text-sm text-amber-600">
              (weights sum to {totalWeight}%)
            </span>
          )}
        </h3>
        <div className="space-y-3">
          {bp.sections.map((section, _i) => (
            <div
              key={section.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {section.name}
                </h4>
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {section.weight}%
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {section.topics.map(topic => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Approve */}
      <div className="flex justify-end gap-3">
        <Button variant="primary" size="lg" onClick={onApprove}>
          Approve Blueprint
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Targets ─────────────────────────────────────────────────────────

function StepTargets({
  mcqTarget, lessonTarget, flashcardTarget,
  setMcqTarget, setLessonTarget, setFlashcardTarget,
  blueprint, onStart,
}: {
  mcqTarget: number;
  lessonTarget: number;
  flashcardTarget: number;
  setMcqTarget: (v: number) => void;
  setLessonTarget: (v: number) => void;
  setFlashcardTarget: (v: number) => void;
  blueprint: Blueprint | null;
  onStart: () => void;
}) {
  const sections = blueprint?.sections || [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Content Generation Targets
        </h3>

        <div className="space-y-6">
          <TargetSlider
            label="Multiple Choice Questions"
            icon={FileText}
            value={mcqTarget}
            onChange={setMcqTarget}
            min={500}
            max={5000}
            step={100}
            color="blue"
          />
          <TargetSlider
            label="Lessons"
            icon={BookOpen}
            value={lessonTarget}
            onChange={setLessonTarget}
            min={30}
            max={500}
            step={10}
            color="green"
          />
          <TargetSlider
            label="Flashcards"
            icon={Layers}
            value={flashcardTarget}
            onChange={setFlashcardTarget}
            min={100}
            max={2000}
            step={50}
            color="purple"
          />
        </div>

        {/* Distribution Preview */}
        {sections.length > 0 && (
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Distribution by Domain
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Domain</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Weight</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">MCQs</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Lessons</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Cards</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map(s => {
                    const w = (s.weight || 0) / 100;
                    return (
                      <tr key={s.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-2 text-gray-900 dark:text-white">{s.name}</td>
                        <td className="py-2 text-right text-gray-600 dark:text-gray-400">{s.weight}%</td>
                        <td className="py-2 text-right font-mono">{Math.max(10, Math.round(mcqTarget * w))}</td>
                        <td className="py-2 text-right font-mono">{Math.max(2, Math.round(lessonTarget * w))}</td>
                        <td className="py-2 text-right font-mono">{Math.max(5, Math.round(flashcardTarget * w))}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Estimated cost */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimates</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            API cost: ~${((mcqTarget / 10 * 2 + lessonTarget / 2 * 4 + flashcardTarget / 15 * 1) * 2 / 1_000_000 * 0.15).toFixed(2)} (Gemini Flash) &middot;
            Time: ~{Math.round((mcqTarget / 10 + lessonTarget / 2 + flashcardTarget / 15) * 0.5 / 60)} hours
          </p>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onStart}>
          <Play className="w-5 h-5 mr-2" />
          Start Generation
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: Monitor ─────────────────────────────────────────────────────────

function StepMonitor({ job, onRefresh: _onRefresh }: { job: CourseFactoryJob; onRefresh: () => void }) {
  const p = job.progress;
  const bp = job.blueprint;
  const sections = bp?.sections || [];

  const mcqPct = job.plan.mcqTarget > 0 ? Math.round(p.mcqsGenerated / job.plan.mcqTarget * 100) : 0;
  const lessonPct = job.plan.lessonTarget > 0 ? Math.round(p.lessonsGenerated / job.plan.lessonTarget * 100) : 0;
  const fcPct = job.plan.flashcardTarget > 0 ? Math.round(p.flashcardsGenerated / job.plan.flashcardTarget * 100) : 0;
  const tbsPct = p.tbsGenerated > 0 ? 100 : 0;
  const overallPct = Math.round((mcqPct + lessonPct + fcPct) / 3);

  const isActive = ['generating', 'enhancing', 'assembling', 'researching'].includes(job.status);
  const isDone = ['assembled', 'complete', 'generated', 'enhanced'].includes(job.status);

  // Elapsed time
  let elapsed = '';
  if (p.startedAt) {
    const ms = Date.now() - new Date(p.startedAt).getTime();
    const mins = Math.floor(ms / 60000);
    const hrs = Math.floor(mins / 60);
    elapsed = hrs > 0 ? `${hrs}h ${mins % 60}m` : `${mins}m`;
  }

  return (
    <div className="space-y-6">
      {/* Phase Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isActive ? 'Generating Course...' : isDone ? 'Course Generation Complete' : `Status: ${job.status}`}
          </h3>
          <div className="flex items-center gap-2">
            {elapsed && (
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {elapsed}
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor(job.status)}`}>
              {job.status}
            </span>
          </div>
        </div>

        {/* Phase stepper */}
        <div className="flex items-center gap-2 mb-6">
          {PHASES.map((phase, i) => {
            const current = phaseIndex(p.phase);
            const isComplete = i < current;
            const isCurrent = i === current;

            return (
              <div key={phase} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 ${
                  isComplete ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                  )}
                  <span className="text-xs font-medium">{phaseLabel(phase)}</span>
                </div>
                {i < PHASES.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${isComplete ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Overall progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="font-mono font-medium text-gray-900 dark:text-white">{overallPct}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overallPct)}%` }}
            />
          </div>
        </div>

        {/* Content counters */}
        <div className="grid grid-cols-4 gap-4">
          <ContentCounter label="MCQs" current={p.mcqsGenerated} target={job.plan.mcqTarget} pct={mcqPct} color="blue" />
          <ContentCounter label="Lessons" current={p.lessonsGenerated} target={job.plan.lessonTarget} pct={lessonPct} color="green" />
          <ContentCounter label="Flashcards" current={p.flashcardsGenerated} target={job.plan.flashcardTarget} pct={fcPct} color="purple" />
          <ContentCounter label="TBS" current={p.tbsGenerated} target={p.tbsGenerated || 0} pct={tbsPct} color="amber" />
        </div>
      </Card>

      {/* Per-section progress */}
      {sections.length > 0 && (
        <Card className="p-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Section Progress
          </h4>
          <div className="space-y-2">
            {sections.map((section, i) => {
              const isComplete = i < p.sectionsComplete;
              const isCurrent = section.id === p.currentSection;

              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                    isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                  )}
                  <span className={`text-sm flex-1 ${
                    isComplete ? 'text-gray-500' : isCurrent ? 'text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-400'
                  }`}>
                    {section.name}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{section.weight}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Command Reference */}
      <Card className="p-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Terminal Commands
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Run the watch command to auto-process jobs. It will pick up this job and generate content automatically.
        </p>
        <div className="space-y-2 font-mono text-sm">
          <CmdLine label="Auto-run" cmd="python3 scripts/course-factory.py watch" />
          <CmdLine label="Generate" cmd={`python3 scripts/course-factory.py generate ${job.id}`} />
          <CmdLine label="Enhance" cmd={`python3 scripts/course-factory.py enhance ${job.id}`} />
          <CmdLine label="Assemble" cmd={`python3 scripts/course-factory.py assemble ${job.id}`} />
          <CmdLine label="All-in-one" cmd={`python3 scripts/course-factory.py run ${job.examName} --mcqs ${job.plan.mcqTarget} --lessons ${job.plan.lessonTarget} --flashcards ${job.plan.flashcardTarget}`} />
          <CmdLine label="Status" cmd={`python3 scripts/course-factory.py status ${job.id}`} />
        </div>
      </Card>

      {/* Errors */}
      {p.errors.length > 0 && (
        <Card className="p-6 border-red-200 dark:border-red-800">
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Errors ({p.errors.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {p.errors.map((err, i) => (
              <div key={i} className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                <strong>{err.section}:</strong> {err.message}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Output files */}
      {job.output.filesGenerated.length > 0 && (
        <Card className="p-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Generated Files ({job.output.filesGenerated.length})
          </h4>
          <div className="space-y-1">
            {job.output.filesGenerated.map(f => (
              <div key={f} className="text-xs font-mono text-gray-600 dark:text-gray-400 py-1">
                {f}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Job History ─────────────────────────────────────────────────────────────

function JobHistory({
  jobs, onResume, onDelete, onRefresh,
}: {
  jobs: CourseFactoryJob[];
  onResume: (j: CourseFactoryJob) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Job History ({jobs.length})
        </h2>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-1" />
          Refresh
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No jobs yet. Create your first course above.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <Card key={job.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {job.examName}
                    {job.blueprint?.fullName && (
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        {job.blueprint.fullName}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>ID: {job.id}</span>
                    <span>MCQs: {job.progress.mcqsGenerated}/{job.plan.mcqTarget}</span>
                    <span>Lessons: {job.progress.lessonsGenerated}/{job.plan.lessonTarget}</span>
                    <span>TBS: {job.progress.tbsGenerated || 0}</span>
                    <span>
                      {job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => onResume(job)}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(job.id)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
      <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

function ContentCounter({ label, current, target, pct, color }: {
  label: string; current: number; target: number; pct: number;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {current.toLocaleString()}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        / {target.toLocaleString()} {label}
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
}

function TargetSlider({ label, icon: Icon, value, onChange, min, max, step, color }: {
  label: string;
  icon: typeof FileText;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 text-${color}-500`} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white font-mono">
          {value.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

function CmdLine({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div className="flex items-start gap-3 py-1.5 px-2 bg-gray-50 dark:bg-gray-800 rounded">
      <span className="text-xs text-gray-400 w-20 flex-shrink-0 pt-0.5">{label}</span>
      <code className="text-xs text-blue-600 dark:text-blue-400 break-all">{cmd}</code>
    </div>
  );
}
