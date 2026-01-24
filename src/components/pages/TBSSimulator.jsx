import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  FileText,
  Calculator,
  Flag,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { getTBSBySection, TBS_TYPES } from '../../data/tbs';
import { CPA_SECTIONS } from '../../config/examConfig';
import clsx from 'clsx';

// Journal Entry Component
const JournalEntryInput = ({
  template,
  value,
  onChange,
  disabled,
  showCorrect,
  correctEntries,
}) => {
  const [entries, setEntries] = useState(
    value || template.map(() => ({ account: '', debit: '', credit: '' }))
  );

  const addRow = () => {
    const newEntries = [...entries, { account: '', debit: '', credit: '' }];
    setEntries(newEntries);
    onChange(newEntries);
  };

  const removeRow = (index) => {
    if (entries.length > 1) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
      onChange(newEntries);
    }
  };

  const updateEntry = (index, field, val) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: val };
    setEntries(newEntries);
    onChange(newEntries);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-slate-600 px-2">
        <div className="col-span-6">Account</div>
        <div className="col-span-2 text-right">Debit</div>
        <div className="col-span-2 text-right">Credit</div>
        <div className="col-span-2"></div>
      </div>

      {entries.map((entry, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-6">
            <input
              type="text"
              value={entry.account}
              onChange={(e) => updateEntry(index, 'account', e.target.value)}
              disabled={disabled}
              placeholder="Account name"
              className={clsx(
                'w-full px-3 py-2 border rounded-lg text-sm',
                disabled ? 'bg-slate-50' : 'focus:ring-2 focus:ring-primary-500'
              )}
            />
          </div>
          <div className="col-span-2">
            <input
              type="number"
              value={entry.debit}
              onChange={(e) => updateEntry(index, 'debit', e.target.value)}
              disabled={disabled}
              placeholder="0"
              className={clsx(
                'w-full px-3 py-2 border rounded-lg text-sm text-right',
                disabled ? 'bg-slate-50' : 'focus:ring-2 focus:ring-primary-500'
              )}
            />
          </div>
          <div className="col-span-2">
            <input
              type="number"
              value={entry.credit}
              onChange={(e) => updateEntry(index, 'credit', e.target.value)}
              disabled={disabled}
              placeholder="0"
              className={clsx(
                'w-full px-3 py-2 border rounded-lg text-sm text-right',
                disabled ? 'bg-slate-50' : 'focus:ring-2 focus:ring-primary-500'
              )}
            />
          </div>
          <div className="col-span-2 flex justify-center gap-1">
            {!disabled && (
              <>
                <button
                  onClick={() => removeRow(index)}
                  className="p-1 text-slate-400 hover:text-error-500"
                  disabled={entries.length === 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {!disabled && (
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 px-2 py-1"
        >
          <Plus className="w-4 h-4" />
          Add row
        </button>
      )}

      {showCorrect && correctEntries && (
        <div className="mt-4 p-4 bg-success-50 rounded-lg">
          <h4 className="font-medium text-success-800 mb-2">Correct Answer:</h4>
          <div className="space-y-1 text-sm">
            {correctEntries.map((entry, i) => (
              <div key={i} className="grid grid-cols-3 gap-4">
                <span>{entry.account}</span>
                <span className="text-right">
                  {entry.debit ? `$${entry.debit.toLocaleString()}` : ''}
                </span>
                <span className="text-right">
                  {entry.credit ? `$${entry.credit.toLocaleString()}` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Calculation Input Component
const CalculationInput = ({
  value,
  onChange,
  disabled,
  showCorrect,
  correctAnswer,
  tolerance,
  explanation,
}) => {
  const isCorrect = showCorrect && Math.abs(Number(value) - correctAnswer) <= (tolerance || 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-slate-600">$</span>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter amount"
          className={clsx(
            'w-48 px-4 py-2 border rounded-lg text-right font-mono',
            disabled && 'bg-slate-50',
            showCorrect &&
              (isCorrect ? 'border-success-500 bg-success-50' : 'border-error-500 bg-error-50')
          )}
        />
        {showCorrect &&
          (isCorrect ? (
            <CheckCircle className="w-5 h-5 text-success-500" />
          ) : (
            <XCircle className="w-5 h-5 text-error-500" />
          ))}
      </div>

      {showCorrect && !isCorrect && (
        <div className="p-3 bg-error-50 rounded-lg text-sm">
          <p className="font-medium text-error-800">Correct: ${correctAnswer.toLocaleString()}</p>
          {explanation && <p className="text-error-700 mt-1">{explanation}</p>}
        </div>
      )}
    </div>
  );
};

// Multiple Choice Component
const MultipleChoiceInput = ({
  options,
  value,
  onChange,
  disabled,
  showCorrect,
  correctAnswer,
  explanation,
}) => {
  return (
    <div className="space-y-2">
      {options.map((option, index) => {
        const isSelected = value === index;
        const isCorrectOption = index === correctAnswer;

        return (
          <button
            key={index}
            onClick={() => !disabled && onChange(index)}
            disabled={disabled}
            className={clsx(
              'w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3',
              !disabled && !isSelected && 'hover:border-primary-200',
              isSelected && !showCorrect && 'border-primary-500 bg-primary-50',
              showCorrect && isCorrectOption && 'border-success-500 bg-success-50',
              showCorrect && isSelected && !isCorrectOption && 'border-error-500 bg-error-50',
              !isSelected && !showCorrect && 'border-slate-200'
            )}
          >
            <span
              className={clsx(
                'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0',
                isSelected && !showCorrect && 'bg-primary-500 text-white',
                showCorrect && isCorrectOption && 'bg-success-500 text-white',
                showCorrect && isSelected && !isCorrectOption && 'bg-error-500 text-white',
                !isSelected && !showCorrect && 'bg-slate-100 text-slate-600'
              )}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{option}</span>
            {showCorrect && isCorrectOption && <CheckCircle className="w-5 h-5 text-success-500" />}
            {showCorrect && isSelected && !isCorrectOption && (
              <XCircle className="w-5 h-5 text-error-500" />
            )}
          </button>
        );
      })}

      {showCorrect && explanation && (
        <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 mt-2">
          <strong>Explanation:</strong> {explanation}
        </div>
      )}
    </div>
  );
};

// Written Communication Component
const WrittenCommunicationInput = ({
  value,
  onChange,
  disabled,
  rubric,
  sampleResponse,
  showCorrect,
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    const words = (value || '')
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [value]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Type your response here..."
          rows={15}
          className={clsx(
            'w-full px-4 py-3 border rounded-lg resize-none font-mono text-sm',
            disabled ? 'bg-slate-50' : 'focus:ring-2 focus:ring-primary-500'
          )}
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400">{wordCount} words</div>
      </div>

      {rubric && (
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-medium text-slate-900 mb-2">Grading Rubric:</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>
              • Content ({rubric.content.weight}%): {rubric.content.criteria.join(', ')}
            </li>
            <li>
              • Organization ({rubric.organization.weight}%):{' '}
              {rubric.organization.criteria.join(', ')}
            </li>
            <li>
              • Writing ({rubric.writing.weight}%): {rubric.writing.criteria.join(', ')}
            </li>
          </ul>
        </div>
      )}

      {showCorrect && sampleResponse && (
        <div>
          <button
            onClick={() => setShowSample(!showSample)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            {showSample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showSample ? 'Hide' : 'Show'} Sample Response
          </button>

          {showSample && (
            <div className="mt-3 p-4 bg-success-50 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                {sampleResponse.trim()}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main TBS Simulator Component
const TBSSimulator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const { completeSimulation } = useStudy();

  const [simulations, setSimulations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);
  const section = searchParams.get('section') || userProfile?.examSection || 'FAR';
  const sectionInfo = CPA_SECTIONS[section];

  // Load TBS questions
  useEffect(() => {
    const loadTBS = () => {
      const tbsQuestions = getTBSBySection(section);
      // Shuffle and take subset
      const shuffled = [...tbsQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(6, shuffled.length));

      setSimulations(selected);
      setAnswers({});
      setShowResults(false);
      setShowHints({});

      // Calculate total time (sum of estimates or default 90 min)
      const totalMinutes = selected.reduce((sum, tbs) => sum + (tbs.timeEstimate || 15), 0);
      setTimeRemaining(totalMinutes * 60);
      setStartTime(Date.now());
      setLoading(false);
    };

    loadTBS();
  }, [section]);

  // Timer
  useEffect(() => {
    if (showResults || timeRemaining === null) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [showResults, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTBS = simulations[currentIndex];

  const updateAnswer = (reqId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentTBS.id]: {
        ...prev[currentTBS.id],
        [reqId]: value,
      },
    }));
  };

  const toggleHint = (tbsId) => {
    setShowHints((prev) => ({
      ...prev,
      [tbsId]: !prev[tbsId],
    }));
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    setShowResults(true);

    // Calculate score
    let totalPoints = 0;
    let earnedPoints = 0;

    simulations.forEach((tbs) => {
      tbs.requirements.forEach((req) => {
        totalPoints += 1;
        const answer = answers[tbs.id]?.[req.id];

        if (req.type === 'calculation' && answer !== undefined) {
          const tolerance = req.tolerance || 0;
          if (Math.abs(Number(answer) - req.correctAnswer) <= tolerance) {
            earnedPoints += 1;
          }
        } else if (req.type === 'multiple_choice' && answer === req.correctAnswer) {
          earnedPoints += 1;
        }
        // Add more scoring logic for other types
      });
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 60000);

    await completeSimulation(`tbs-${section}-${Date.now()}`, score, timeSpent);
  };

  const renderRequirement = (req) => {
    const answer = answers[currentTBS?.id]?.[req.id];

    switch (req.type) {
      case 'journal_entry':
        return (
          <JournalEntryInput
            template={req.template}
            value={answer}
            onChange={(val) => updateAnswer(req.id, val)}
            disabled={showResults}
            showCorrect={showResults}
            correctEntries={req.correctEntries}
          />
        );

      case 'calculation':
        return (
          <CalculationInput
            value={answer}
            onChange={(val) => updateAnswer(req.id, val)}
            disabled={showResults}
            showCorrect={showResults}
            correctAnswer={req.correctAnswer}
            tolerance={req.tolerance}
            explanation={req.explanation}
          />
        );

      case 'multiple_choice':
        return (
          <MultipleChoiceInput
            options={req.options}
            value={answer}
            onChange={(val) => updateAnswer(req.id, val)}
            disabled={showResults}
            showCorrect={showResults}
            correctAnswer={req.correctAnswer}
            explanation={req.explanation}
          />
        );

      case 'written_response':
        return (
          <WrittenCommunicationInput
            value={answer}
            onChange={(val) => updateAnswer(req.id, val)}
            disabled={showResults}
            rubric={req.rubric}
            sampleResponse={req.sampleResponse}
            showCorrect={showResults}
          />
        );

      default:
        return (
          <div className="p-4 bg-slate-100 rounded-lg text-slate-600">
            Input type "{req.type}" coming soon...
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading simulations...</p>
        </div>
      </div>
    );
  }

  if (simulations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No TBS Available</h2>
          <p className="text-slate-600 mb-4">
            Task-based simulations for {section} are coming soon!
          </p>
          <button onClick={() => navigate('/study')} className="btn-primary">
            Back to Study
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    let totalCorrect = 0;
    let totalQuestions = 0;

    simulations.forEach((tbs) => {
      tbs.requirements.forEach((req) => {
        totalQuestions++;
        const answer = answers[tbs.id]?.[req.id];
        if (req.type === 'calculation') {
          const tolerance = req.tolerance || 0;
          if (Math.abs(Number(answer) - req.correctAnswer) <= tolerance) totalCorrect++;
        } else if (req.type === 'multiple_choice' && answer === req.correctAnswer) {
          totalCorrect++;
        }
      });
    });

    const score = Math.round((totalCorrect / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-6">
            <div
              className={clsx(
                'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4',
                score >= 75 ? 'bg-success-100' : 'bg-warning-100'
              )}
            >
              {score >= 75 ? (
                <CheckCircle className="w-12 h-12 text-success-600" />
              ) : (
                <HelpCircle className="w-12 h-12 text-warning-600" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">TBS Complete!</h1>
            <p className="text-slate-600 mb-6">
              You scored {totalCorrect} out of {totalQuestions} requirement points
            </p>

            <div
              className={clsx(
                'text-6xl font-bold mb-6',
                score >= 75
                  ? 'text-success-600'
                  : score >= 50
                    ? 'text-warning-600'
                    : 'text-error-600'
              )}
            >
              {score}%
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/study')} className="btn-secondary">
                Back to Study
              </button>
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentIndex(0);
                }}
                className="btn-primary"
              >
                Review Answers
              </button>
            </div>
          </div>

          {/* Review each TBS */}
          <div className="space-y-6">
            {simulations.map((tbs, idx) => (
              <div key={tbs.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    TBS {idx + 1}: {tbs.title}
                  </h3>
                  <span className="text-sm text-slate-500">{tbs.topic}</span>
                </div>
                <div className="p-6">
                  {tbs.requirements.map((req, reqIdx) => (
                    <div key={req.id} className="mb-6 last:mb-0">
                      <p className="font-medium text-slate-900 mb-3">
                        {reqIdx + 1}. {req.question}
                      </p>
                      {renderRequirement(req)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="px-3 py-1 rounded-lg font-medium text-sm"
              style={{ backgroundColor: sectionInfo?.color }}
            >
              {section} TBS
            </div>
            <span className="text-sm text-slate-400">
              Simulation {currentIndex + 1} of {simulations.length}
            </span>
          </div>

          <div
            className={clsx(
              'flex items-center gap-2 font-mono text-lg',
              timeRemaining < 300 && 'text-error-400'
            )}
          >
            <Clock className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-lg" title="Calculator">
              <Calculator className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleHint(currentTBS.id)}
              className={clsx(
                'p-2 rounded-lg',
                showHints[currentTBS.id] ? 'bg-warning-500' : 'hover:bg-slate-800'
              )}
              title="Show hints"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4">
          {/* Scenario Panel */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">{currentTBS.title}</h2>
                <p className="text-sm text-slate-500">
                  {currentTBS.topic} • {currentTBS.difficulty}
                </p>
              </div>
              <span className="text-sm text-slate-500">~{currentTBS.timeEstimate} minutes</span>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Scenario:</h3>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 bg-slate-50 p-4 rounded-lg">
                  {currentTBS.scenario.trim()}
                </pre>
              </div>
            </div>

            {/* Hints */}
            {showHints[currentTBS.id] && currentTBS.hints && (
              <div className="px-6 pb-6">
                <div className="p-4 bg-warning-50 rounded-lg">
                  <h4 className="font-medium text-warning-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Hints
                  </h4>
                  <ul className="text-sm text-warning-700 space-y-1">
                    {currentTBS.hints.map((hint, i) => (
                      <li key={i}>• {hint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-6">Requirements:</h3>

            <div className="space-y-8">
              {currentTBS.requirements.map((req, index) => (
                <div key={req.id} className="pb-6 border-b last:border-0 last:pb-0">
                  <p className="font-medium text-slate-900 mb-4">
                    {index + 1}. {req.question}
                  </p>
                  {renderRequirement(req)}
                </div>
              ))}
            </div>
          </div>

          {/* References */}
          {currentTBS.references && (
            <div className="mt-4 text-sm text-slate-500">
              <strong>References:</strong> {currentTBS.references.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {simulations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={clsx(
                  'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                  idx === currentIndex
                    ? 'bg-primary-500 text-white'
                    : answers[simulations[idx]?.id]
                      ? 'bg-success-100 text-success-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentIndex === simulations.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit All
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TBSSimulator;
