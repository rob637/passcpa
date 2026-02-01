// TBS Renderer Component for Exam Simulator
// Renders Task-Based Simulations within the mock exam flow

import React, { useState } from 'react';
import {
  FileText,
  Calculator,
  Table,
  Search,
  Edit3,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Info,
} from 'lucide-react';
import { TBS, TBSRequirement, TBS_TYPES } from '../../types';
import clsx from 'clsx';

interface TBSRendererProps {
  tbs: TBS;
  answers: Record<string, unknown>;
  onAnswerChange: (requirementId: string, value: unknown) => void;
  showHints?: boolean;
  isReview?: boolean;
}

// Journal Entry Row Component
const JournalEntryRow: React.FC<{
  index: number;
  account: string;
  debit: string;
  credit: string;
  onAccountChange: (value: string) => void;
  onDebitChange: (value: string) => void;
  onCreditChange: (value: string) => void;
  disabled?: boolean;
}> = ({ index, account, debit, credit, onAccountChange, onDebitChange, onCreditChange, disabled }) => (
  <tr className={clsx(index % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
    <td className="px-3 py-2 border">
      <input
        type="text"
        value={account}
        onChange={(e) => onAccountChange(e.target.value)}
        className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder="Account name"
        disabled={disabled}
      />
    </td>
    <td className="px-3 py-2 border">
      <input
        type="number"
        value={debit}
        onChange={(e) => onDebitChange(e.target.value)}
        className="w-full px-2 py-1 border rounded text-sm text-right focus:ring-2 focus:ring-primary-500"
        placeholder="0"
        disabled={disabled}
      />
    </td>
    <td className="px-3 py-2 border">
      <input
        type="number"
        value={credit}
        onChange={(e) => onCreditChange(e.target.value)}
        className="w-full px-2 py-1 border rounded text-sm text-right focus:ring-2 focus:ring-primary-500"
        placeholder="0"
        disabled={disabled}
      />
    </td>
  </tr>
);

// Calculation Input Component
const CalculationInput: React.FC<{
  requirement: TBSRequirement;
  value: string;
  onChange: (value: string) => void;
  isReview?: boolean;
  correctAnswer?: number;
}> = ({ requirement, value, onChange, isReview, correctAnswer }) => {
  const isCorrect = isReview && correctAnswer !== undefined && 
    Math.abs(parseFloat(value || '0') - correctAnswer) <= (requirement.tolerance || 0);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {requirement.question || requirement.text}
      </label>
      <div className="flex items-center gap-2">
        <span className="text-slate-500">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={clsx(
            'w-48 px-3 py-2 border rounded-lg text-right text-lg font-mono',
            isReview && (isCorrect 
              ? 'border-green-500 bg-green-50' 
              : 'border-red-500 bg-red-50')
          )}
          placeholder="Enter amount"
          disabled={isReview}
        />
      </div>
      {isReview && requirement.explanation && (
        <div className={clsx(
          'mt-2 p-3 rounded-lg text-sm',
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        )}>
          <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
          <p className="mt-1">{requirement.explanation}</p>
          {!isCorrect && correctAnswer !== undefined && (
            <p className="mt-1 font-medium">Correct answer: ${correctAnswer.toLocaleString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Multiple Choice Requirement Component
const MultipleChoiceRequirement: React.FC<{
  requirement: TBSRequirement;
  value: number | undefined;
  onChange: (value: number) => void;
  isReview?: boolean;
}> = ({ requirement, value, onChange, isReview }) => {
  const isCorrect = isReview && value === requirement.correctAnswer;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        {requirement.question || requirement.text}
      </label>
      <div className="space-y-2">
        {requirement.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !isReview && onChange(idx)}
            disabled={isReview}
            className={clsx(
              'w-full p-3 rounded-lg border text-left flex items-start gap-3 transition-all',
              value === idx
                ? isReview
                  ? idx === requirement.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-primary-500 bg-primary-50'
                : isReview && idx === requirement.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-slate-200 hover:border-slate-300'
            )}
          >
            <span className={clsx(
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
              value === idx
                ? isReview
                  ? idx === requirement.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-primary-500 text-white'
                : 'bg-slate-200 text-slate-600'
            )}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-slate-800">{option}</span>
          </button>
        ))}
      </div>
      {isReview && requirement.explanation && (
        <div className={clsx(
          'mt-2 p-3 rounded-lg text-sm',
          isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        )}>
          <strong>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong>
          <p className="mt-1">{requirement.explanation}</p>
        </div>
      )}
    </div>
  );
};

// TBS Type Icon
const TBSTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case TBS_TYPES.JOURNAL_ENTRY:
      return <Edit3 className="w-5 h-5" />;
    case TBS_TYPES.RECONCILIATION:
      return <Table className="w-5 h-5" />;
    case TBS_TYPES.CALCULATION:
      return <Calculator className="w-5 h-5" />;
    case TBS_TYPES.RESEARCH:
      return <Search className="w-5 h-5" />;
    case TBS_TYPES.DOCUMENT_REVIEW:
      return <FileText className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

// Main TBS Renderer Component
const TBSRenderer: React.FC<TBSRendererProps> = ({
  tbs,
  answers,
  onAnswerChange,
  showHints = false,
  isReview = false,
}) => {
  const [expandedHints, setExpandedHints] = useState(false);
  const [journalRows, setJournalRows] = useState<Array<{ account: string; debit: string; credit: string }>>(
    Array(6).fill({ account: '', debit: '', credit: '' })
  );

  const handleJournalEntryChange = (requirementId: string, rows: typeof journalRows) => {
    setJournalRows(rows);
    onAnswerChange(requirementId, rows.filter(r => r.account || r.debit || r.credit));
  };

  const renderRequirement = (req: TBSRequirement, index: number) => {
    const reqAnswer = answers[req.id];

    switch (req.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceRequirement
            key={req.id}
            requirement={req}
            value={reqAnswer as number | undefined}
            onChange={(v) => onAnswerChange(req.id, v)}
            isReview={isReview}
          />
        );

      case 'calculation':
        return (
          <CalculationInput
            key={req.id}
            requirement={req}
            value={(reqAnswer as string) || ''}
            onChange={(v) => onAnswerChange(req.id, v)}
            isReview={isReview}
            correctAnswer={req.correctAnswer as number}
          />
        );

      case 'journal_entry':
        return (
          <div key={req.id} className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              {req.question || req.text || `Requirement ${index + 1}: Prepare the journal entry`}
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-3 py-2 border text-left text-sm font-medium text-slate-700 w-1/2">Account</th>
                    <th className="px-3 py-2 border text-right text-sm font-medium text-slate-700 w-1/4">Debit</th>
                    <th className="px-3 py-2 border text-right text-sm font-medium text-slate-700 w-1/4">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {journalRows.map((row, idx) => (
                    <JournalEntryRow
                      key={idx}
                      index={idx}
                      account={row.account}
                      debit={row.debit}
                      credit={row.credit}
                      onAccountChange={(v) => {
                        const newRows = [...journalRows];
                        newRows[idx] = { ...newRows[idx], account: v };
                        handleJournalEntryChange(req.id, newRows);
                      }}
                      onDebitChange={(v) => {
                        const newRows = [...journalRows];
                        newRows[idx] = { ...newRows[idx], debit: v };
                        handleJournalEntryChange(req.id, newRows);
                      }}
                      onCreditChange={(v) => {
                        const newRows = [...journalRows];
                        newRows[idx] = { ...newRows[idx], credit: v };
                        handleJournalEntryChange(req.id, newRows);
                      }}
                      disabled={isReview}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {isReview && req.correctEntries && (
              <div className="mt-3 p-4 bg-green-50 rounded-lg">
                <strong className="text-green-800">Correct Journal Entry:</strong>
                <table className="mt-2 min-w-full text-sm">
                  <tbody>
                    {req.correctEntries.map((entry, idx) => (
                      <tr key={idx}>
                        <td className="pr-4">{entry.debit ? '' : '    '}{entry.account}</td>
                        <td className="text-right pr-4">{entry.debit?.toLocaleString() || ''}</td>
                        <td className="text-right">{entry.credit?.toLocaleString() || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      default:
        // Generic text input for other types
        return (
          <div key={req.id} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              {req.question || req.text || `Requirement ${index + 1}`}
            </label>
            <textarea
              value={(reqAnswer as string) || ''}
              onChange={(e) => onAnswerChange(req.id, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your answer..."
              disabled={isReview}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* TBS Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <TBSTypeIcon type={tbs.type} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-primary-200">
              Task-Based Simulation • {tbs.type.replace('_', ' ')}
            </span>
            <h2 className="text-xl font-bold">{tbs.title || 'Simulation'}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-primary-100">
          <span>{tbs.topic}</span>
          <span>•</span>
          <span>{tbs.timeEstimate || tbs.estimatedTime || 15} min</span>
          <span>•</span>
          <span className="capitalize">{tbs.difficulty}</span>
        </div>
      </div>

      {/* Scenario */}
      {tbs.scenario && (
        <div className="p-6 bg-slate-50 border-b">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium text-slate-800 mb-2">Scenario</h3>
              <div className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                {tbs.scenario}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="p-6">
        <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Requirements ({tbs.requirements?.length || 0})
        </h3>
        <div className="space-y-6">
          {tbs.requirements?.map((req, idx) => (
            <div key={req.id} className="p-4 bg-slate-50 rounded-lg">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                Requirement {idx + 1}
              </div>
              {renderRequirement(req, idx)}
            </div>
          ))}
        </div>
      </div>

      {/* Hints Section */}
      {showHints && tbs.hints && tbs.hints.length > 0 && (
        <div className="px-6 pb-6">
          <button
            onClick={() => setExpandedHints(!expandedHints)}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <HelpCircle className="w-4 h-4" />
            {expandedHints ? 'Hide Hints' : 'Show Hints'}
            {expandedHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedHints && (
            <div className="mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <ul className="space-y-1 text-sm text-yellow-800">
                {tbs.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* References */}
      {tbs.references && tbs.references.length > 0 && (
        <div className="px-6 pb-6 text-xs text-slate-500">
          <strong>References:</strong> {tbs.references.join(', ')}
        </div>
      )}
    </div>
  );
};

export default TBSRenderer;
