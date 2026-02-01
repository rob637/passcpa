import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Calculator,
  Lightbulb,
  Plus,
  Minus,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { fetchTBSBySection, fetchTBSById } from '../../services/tbsService';
import { CPA_SECTIONS } from '../../config/examConfig';
import clsx from 'clsx';
import { ExamSection } from '../../types';

const TBS_LABELS: Record<string, string> = {
  journal: 'Journal Entry',
  calculation: 'Calculation',
  mcq: 'Multiple Choice',
  wc: 'Written Communication',
  journal_entry: 'Journal Entry',
  reconciliation: 'Reconciliation',
  document_review: 'Document Review',
  research: 'Research',
  form_completion: 'Form Completion',
  written_communication: 'Written Communication',
};

// Types and Interfaces
interface JournalEntryRow {
  account: string;
  debit: string | number;
  credit: string | number;
}

interface JournalEntryInputProps {
  template: JournalEntryRow[];
  value?: JournalEntryRow[];
  onChange: (entries: JournalEntryRow[]) => void;
  disabled?: boolean;
  showCorrect?: boolean;
  correctEntries?: JournalEntryRow[];
}

interface CalculationInputProps {
  value?: number | string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showCorrect?: boolean;
  correctAnswer: number;
  tolerance?: number;
  explanation?: string;
}

interface MultipleChoiceInputProps {
  options: string[];
  value?: number;
  onChange: (index: number) => void;
  disabled?: boolean;
  showCorrect?: boolean;
  correctAnswer: number;
  explanation?: string;
}

interface WrittenCommunicationInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rubric?: string[];
  sampleResponse?: string;
  showCorrect?: boolean;
}

interface TBSQuestion {
  id: string;
  type: 'journal' | 'calculation' | 'mcq' | 'wc';
  title: string;
  description: string;
  question?: string; // The specific question/task for this requirement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // Flexible data depending on type
  estimatedTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

// Journal Entry Component
const JournalEntryInput: React.FC<JournalEntryInputProps> = ({
  template,
  value,
  onChange,
  disabled,
  showCorrect,
  correctEntries,
}) => {
  const [entries, setEntries] = useState<JournalEntryRow[]>(
    value || (template && Array.isArray(template) ? template.map(() => ({ account: '', debit: '', credit: '' })) : [{ account: '', debit: '', credit: '' }])
  );

  const addRow = () => {
    const newEntries = [...entries, { account: '', debit: '', credit: '' }];
    setEntries(newEntries);
    onChange(newEntries);
  };

  const removeRow = (index: number) => {
    if (entries.length > 1) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
      onChange(newEntries);
    }
  };

  const updateEntry = (index: number, field: keyof JournalEntryRow, val: string) => {
    const newEntries = [...entries];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newEntries[index] = { ...newEntries[index], [field]: val } as any;
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
const CalculationInput: React.FC<CalculationInputProps> = ({
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
const MultipleChoiceInput: React.FC<MultipleChoiceInputProps> = ({
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
const WrittenCommunicationInput: React.FC<WrittenCommunicationInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [wordCount, setWordCount] = useState(0);

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
    </div>
  );
};

// Simple Calculator Component
const SimpleCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let result = 0;

      switch (operation) {
        case '+': result = currentValue + inputValue; break;
        case '-': result = currentValue - inputValue; break;
        case '×': result = currentValue * inputValue; break;
        case '÷': result = inputValue !== 0 ? currentValue / inputValue : 0; break;
        default: result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    let result = 0;

    switch (operation) {
      case '+': result = currentValue + inputValue; break;
      case '-': result = currentValue - inputValue; break;
      case '×': result = currentValue * inputValue; break;
      case '÷': result = inputValue !== 0 ? currentValue / inputValue : 0; break;
      default: result = inputValue;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleButton = (btn: string) => {
    if (btn >= '0' && btn <= '9') inputDigit(btn);
    else if (btn === '.') inputDecimal();
    else if (btn === 'C') clear();
    else if (btn === '±') setDisplay(String(-parseFloat(display)));
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
    else if (btn === '=') calculate();
    else performOperation(btn);
  };

  return (
    <div className="p-3">
      <div className="bg-slate-900 text-white text-right text-2xl font-mono p-3 rounded mb-2 overflow-x-auto">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.flat().map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleButton(btn)}
            className={clsx(
              'p-3 rounded text-lg font-medium transition-colors',
              btn === '0' && 'col-span-2',
              btn === 'C' || btn === '±' || btn === '%'
                ? 'bg-slate-600 text-white hover:bg-slate-500'
                : btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '='
                ? 'bg-primary-500 text-white hover:bg-primary-400'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            )}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const TBSSimulator: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useAuth();
  const { completeSimulation } = useStudy();

  const [tbs, setTbs] = useState<TBSQuestion | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answer, setAnswer] = useState<any>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showExhibits, setShowExhibits] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentSection = (userProfile?.examSection || 'FAR') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  const tbsId = searchParams.get('id');
  
  // Daily plan awareness
  const fromDailyPlan = searchParams.get('from') === 'dailyplan';
  const activityId = searchParams.get('activityId');

  // Transform raw TBS data into the format expected by the component
  const transformTbs = (rawTbs: any): TBSQuestion | null => {
    if (!rawTbs) return null;
    
    // Get the first requirement for simple TBS types
    const firstReq = rawTbs.requirements?.[0];
    
    // Map TBS type to component type
    let componentType: 'journal' | 'calculation' | 'mcq' | 'wc' = 'calculation';
    if (rawTbs.type === 'journal_entry' || rawTbs.type === 'journal') componentType = 'journal';
    else if (rawTbs.type === 'multiple_choice' || firstReq?.type === 'multiple_choice') componentType = 'mcq';
    else if (rawTbs.type === 'written_communication') componentType = 'wc';
    else if (rawTbs.type === 'calculation' || firstReq?.type === 'calculation') componentType = 'calculation';
    
    return {
      id: rawTbs.id,
      type: componentType,
      title: rawTbs.title,
      description: rawTbs.scenario || rawTbs.description || '',
      question: firstReq?.question || rawTbs.question || '',
      data: {
        // For journal entries
        template: firstReq?.template || rawTbs.template || [{ account: '', debit: '', credit: '' }],
        correctEntries: firstReq?.correctEntries || rawTbs.correctEntries,
        // For calculations
        correctAnswer: firstReq?.correctAnswer ?? rawTbs.correctAnswer ?? 0,
        tolerance: firstReq?.tolerance ?? rawTbs.tolerance ?? 1,
        // For multiple choice
        options: firstReq?.options || rawTbs.options || [],
        // Hints - shown in panel when user needs help
        hints: rawTbs.hints ? rawTbs.hints.join('\n\n• ') : null,
        hasHints: !!rawTbs.hints && rawTbs.hints.length > 0,
        // Exhibits - reference materials (separate from hints)
        exhibits: rawTbs.exhibits,
      },
      explanation: firstReq?.explanation || rawTbs.explanation,
      difficulty: rawTbs.difficulty,
      estimatedTime: rawTbs.timeEstimate,
    };
  };

  useEffect(() => {
    // Load TBS
    const loadTBS = async () => {
      if (tbsId) {
        // Fetch specific TBS
        const loadedTbs = await fetchTBSById(tbsId);
        if (loadedTbs) {
          setTbs(transformTbs(loadedTbs));
          setStartTime(Date.now());
        } else {
          setError(`Simulation not found: ${tbsId}`);
        }
      } else {
        // Get random TBS for section
        const sectionTbs = await fetchTBSBySection(currentSection);
        if (sectionTbs && sectionTbs.length > 0) {
          const randomTbs = sectionTbs[Math.floor(Math.random() * sectionTbs.length)];
          setTbs(transformTbs(randomTbs));
          setStartTime(Date.now());
        } else {
          setError(`No simulations available for section: ${currentSection}`);
        }
      }
    };
    
    loadTBS();
  }, [tbsId, currentSection]);

  // Score Written Communication responses based on AICPA criteria
  // Evaluates: Organization, Development, Expression
  const scoreWrittenCommunication = (
    response: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _data: any // Reserved for future rubric-based scoring
  ): number => {
    if (!response || response.trim().length === 0) return 0;
    
    const text = response.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const lowerText = text.toLowerCase();
    
    let score = 0;
    const maxScore = 100;
    
    // 1. ORGANIZATION (30 points max)
    let orgScore = 0;
    
    // Has professional memo format (TO, FROM, RE/SUBJECT, DATE)
    const hasMemoFormat = /\b(to|from|re|subject|date)\s*:/i.test(text);
    if (hasMemoFormat) orgScore += 10;
    
    // Has greeting/salutation
    const hasGreeting = /\b(dear|hello|greetings|attention)\b/i.test(text);
    if (hasGreeting) orgScore += 3;
    
    // Has closing
    const hasClosing = /\b(sincerely|regards|respectfully|thank you|please (contact|let me know|reach out))\b/i.test(text);
    if (hasClosing) orgScore += 5;
    
    // Multiple paragraphs (structured response)
    if (paragraphs.length >= 3) orgScore += 12;
    else if (paragraphs.length >= 2) orgScore += 7;
    else orgScore += 2;
    
    score += Math.min(orgScore, 30);
    
    // 2. DEVELOPMENT (40 points max) - Content depth
    let devScore = 0;
    
    // Adequate length (minimum 150 words for a professional memo)
    if (wordCount >= 300) devScore += 15;
    else if (wordCount >= 200) devScore += 12;
    else if (wordCount >= 150) devScore += 8;
    else if (wordCount >= 100) devScore += 4;
    
    // Multiple sentences per paragraph (developed ideas)
    const avgSentencesPerParagraph = sentences.length / Math.max(paragraphs.length, 1);
    if (avgSentencesPerParagraph >= 3) devScore += 10;
    else if (avgSentencesPerParagraph >= 2) devScore += 5;
    
    // Technical/professional vocabulary usage
    const technicalTerms = [
      'internal control', 'audit', 'financial statement', 'material', 'reasonable',
      'compliance', 'gaap', 'gasb', 'fasb', 'aicpa', 'pcaob', 'sox', 'coso',
      'risk', 'procedure', 'assessment', 'framework', 'disclosure', 'opinion',
      'deficiency', 'significant', 'management', 'governance', 'objective',
      'component', 'monitoring', 'environment', 'activities', 'information'
    ];
    const technicalCount = technicalTerms.filter(term => lowerText.includes(term)).length;
    if (technicalCount >= 5) devScore += 15;
    else if (technicalCount >= 3) devScore += 10;
    else if (technicalCount >= 1) devScore += 5;
    
    score += Math.min(devScore, 40);
    
    // 3. EXPRESSION (30 points max) - Writing quality
    let expScore = 0;
    
    // Sentence variety (not all same length)
    const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(sentenceLengths.length, 1);
    
    // Good sentence length (15-25 words average is professional)
    if (avgSentenceLength >= 12 && avgSentenceLength <= 30) expScore += 10;
    else if (avgSentenceLength >= 8) expScore += 5;
    
    // No excessive repetition (same word > 3% of content)
    const wordFreq: Record<string, number> = {};
    words.forEach(w => {
      const word = w.toLowerCase().replace(/[^a-z]/g, '');
      if (word.length > 3) wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(wordFreq), 0);
    const repetitionRatio = maxFreq / wordCount;
    if (repetitionRatio < 0.03) expScore += 10;
    else if (repetitionRatio < 0.05) expScore += 5;
    
    // Uses transition words (indicates flow)
    const transitions = ['however', 'therefore', 'additionally', 'furthermore', 'moreover',
      'consequently', 'specifically', 'accordingly', 'in addition', 'as a result',
      'first', 'second', 'third', 'finally', 'in conclusion'];
    const transitionCount = transitions.filter(t => lowerText.includes(t)).length;
    if (transitionCount >= 3) expScore += 10;
    else if (transitionCount >= 1) expScore += 5;
    
    score += Math.min(expScore, 30);
    
    // Ensure minimum threshold (at least attempted the response)
    if (wordCount < 50) return Math.min(score, 25); // Cap very short responses
    
    return Math.min(Math.round(score), maxScore);
  };

  // Helper function to normalize account names for comparison
  const normalizeAccountName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[()]/g, '')
      .replace(/\bacct\b/g, 'account')
      .replace(/\bexp\b/g, 'expense')
      .replace(/\brec\b/g, 'receivable')
      .replace(/\bpay\b/g, 'payable')
      .replace(/\binv\b/g, 'inventory')
      .replace(/\bapic\b/g, 'additional paid in capital')
      .replace(/\brou\b/g, 'right of use')
      .replace(/\ba\/r\b/g, 'accounts receivable')
      .replace(/\ba\/p\b/g, 'accounts payable')
      .trim();
  };

  // Check if two account names are similar enough to be considered a match
  const accountNamesMatch = (userAccount: string, correctAccount: string): boolean => {
    const userNorm = normalizeAccountName(userAccount);
    const correctNorm = normalizeAccountName(correctAccount);
    
    // Exact match after normalization
    if (userNorm === correctNorm) return true;
    
    // Check if one contains the other (handles abbreviations)
    if (userNorm.includes(correctNorm) || correctNorm.includes(userNorm)) return true;
    
    // Check key words match (for compound account names)
    const userWords = userNorm.split(' ').filter(w => w.length > 2);
    const correctWords = correctNorm.split(' ').filter(w => w.length > 2);
    const matchingWords = userWords.filter(w => correctWords.some(cw => cw.includes(w) || w.includes(cw)));
    
    // If at least 50% of key words match, consider it a match
    return matchingWords.length >= Math.ceil(correctWords.length * 0.5);
  };

  // Score a journal entry against correct entries
  const scoreJournalEntry = (
    userEntries: JournalEntryRow[],
    correctEntries: { account: string; debit: number | null; credit: number | null }[],
    tolerance: number = 5
  ): number => {
    if (!correctEntries || correctEntries.length === 0) return 0;
    if (!userEntries || userEntries.length === 0) return 0;

    let totalPoints = 0;
    const maxPoints = correctEntries.length * 3; // 3 points per entry: account, debit, credit
    const matchedCorrectIndices = new Set<number>();

    // For each user entry, find the best matching correct entry
    for (const userEntry of userEntries) {
      const userAccount = (userEntry.account || '').trim();
      const userDebit = userEntry.debit ? parseFloat(String(userEntry.debit)) : null;
      const userCredit = userEntry.credit ? parseFloat(String(userEntry.credit)) : null;

      // Skip empty entries
      if (!userAccount && userDebit === null && userCredit === null) continue;

      let bestMatchIndex = -1;
      let bestMatchScore = 0;

      for (let i = 0; i < correctEntries.length; i++) {
        if (matchedCorrectIndices.has(i)) continue; // Already matched

        const correct = correctEntries[i];
        let matchScore = 0;

        // Check account name (1 point)
        if (userAccount && accountNamesMatch(userAccount, correct.account)) {
          matchScore += 1;
        }

        // Check debit (1 point)
        if (correct.debit !== null) {
          if (userDebit !== null && Math.abs(userDebit - correct.debit) <= tolerance) {
            matchScore += 1;
          }
        } else if (userDebit === null || userDebit === 0) {
          matchScore += 1; // Correctly left blank
        }

        // Check credit (1 point)
        if (correct.credit !== null) {
          if (userCredit !== null && Math.abs(userCredit - correct.credit) <= tolerance) {
            matchScore += 1;
          }
        } else if (userCredit === null || userCredit === 0) {
          matchScore += 1; // Correctly left blank
        }

        if (matchScore > bestMatchScore) {
          bestMatchScore = matchScore;
          bestMatchIndex = i;
        }
      }

      if (bestMatchIndex >= 0) {
        matchedCorrectIndices.add(bestMatchIndex);
        totalPoints += bestMatchScore;
      }
    }

    return Math.round((totalPoints / maxPoints) * 100);
  };

  const handleSubmit = async () => {
    if (!tbs) return;
    setSubmitted(true);
    let calculatedScore = 0;

    // Calculate score based on type
    if (tbs.type === 'journal') {
      // Score journal entries by matching accounts and amounts
      const userEntries = answer as JournalEntryRow[] || [];
      const correctEntries = tbs.data.correctEntries;
      const tolerance = tbs.data.tolerance || 5;
      
      calculatedScore = scoreJournalEntry(userEntries, correctEntries, tolerance);
    } else if (tbs.type === 'calculation') {
      const isCorrect =
        Math.abs(Number(answer) - tbs.data.correctAnswer) <= (tbs.data.tolerance || 0);
      calculatedScore = isCorrect ? 100 : 0;
    } else if (tbs.type === 'mcq') {
      calculatedScore = answer === tbs.data.correctAnswer ? 100 : 0;
    } else if (tbs.type === 'wc') {
      calculatedScore = scoreWrittenCommunication(answer as string || '', tbs.data);
    }

    setScore(calculatedScore);

    // Save progress
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 60000) : 0;
    await completeSimulation(tbs.id, calculatedScore, timeSpent);
    
    // If from daily plan, save completion to localStorage
    if (fromDailyPlan && activityId) {
      const today = new Date().toISOString().split('T')[0];
      const storageKey = `dailyplan_completed_${today}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!existing.includes(activityId)) {
        existing.push(activityId);
        localStorage.setItem(storageKey, JSON.stringify(existing));
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setAnswer(null);
    setStartTime(Date.now());
    setScore(0);
  };

  if (!tbs) {
    if (error) {
       return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100 max-w-md">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load Simulation</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={() => navigate('/practice')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Return to Practice
            </button>
          </div>
        </div>
       );
    }
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading Simulation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(fromDailyPlan ? '/home' : '/study')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="font-bold">{tbs.title}</div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="bg-primary-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                {TBS_LABELS[tbs.type] || tbs.type}
              </span>
              <span>{sectionInfo?.name || currentSection}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(tbs.data.hasHints || tbs.data.exhibits) && (
            <button
              onClick={() => setShowExhibits(!showExhibits)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                showExhibits ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              <FileText className="w-4 h-4" />
              {tbs.data.hasHints ? 'Hints' : 'Exhibits'}
            </button>
          )}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              showCalculator ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            )}
          >
            <Calculator className="w-4 h-4" />
            Calculator
          </button>
          <LinkButton to="/study" className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded text-sm text-white">
           Quit
          </LinkButton>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Context/Scenario */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning-500" />
                Scenario
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700">
                 {/* Replaced dangerouslySetInnerHTML with simple rendering for now, or use a sanitizer later */}
                 {tbs.description}
              </div>
            </div>

            {/* Hints Panel (Collapsible) */}
            {showExhibits && tbs.data.hasHints && (
              <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-5">
                <div className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </div>
                <div className="text-sm text-amber-900 space-y-2">
                  <p className="whitespace-pre-line">• {tbs.data.hints}</p>
                </div>
              </div>
            )}

            {/* Exhibits Panel (Collapsible) - for actual document exhibits */}
            {showExhibits && tbs.data.exhibits && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {tbs.data.exhibits.map((exhibit: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                    <div className="font-bold text-slate-800 border-b pb-2 mb-3">
                      {exhibit.title}
                    </div>
                    <div className="text-sm text-slate-600 font-mono bg-slate-50 p-3 rounded border">
                      {exhibit.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Answer Area */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Your Response</h3>
                {submitted && (
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1",
                    score >= 75 ? "bg-success-100 text-success-700" : "bg-error-100 text-error-700"
                  )}>
                    {score >= 75 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    Score: {score}%
                  </div>
                )}
              </div>
              
              {/* Question/Task */}
              {tbs.question && (
                <div className="px-6 py-4 bg-primary-50 border-b border-primary-100">
                  <p className="text-slate-800 font-medium">
                    <span className="text-primary-600 font-bold">Task:</span> {tbs.question}
                  </p>
                </div>
              )}
              
              <div className="p-6">
                {tbs.type === 'journal' && (
                  <JournalEntryInput
                    template={tbs.data.template}
                    value={answer}
                    onChange={setAnswer}
                    disabled={submitted}
                    showCorrect={submitted}
                    correctEntries={tbs.data.correctEntries}
                  />
                )}

                {tbs.type === 'calculation' && (
                  <CalculationInput
                    value={answer}
                    onChange={setAnswer}
                    disabled={submitted}
                    showCorrect={submitted}
                    correctAnswer={tbs.data.correctAnswer}
                    tolerance={tbs.data.tolerance}
                    explanation={tbs.explanation}
                  />
                )}

                {tbs.type === 'mcq' && (
                  <MultipleChoiceInput
                    options={tbs.data.options}
                    value={answer}
                    onChange={setAnswer}
                    disabled={submitted}
                    showCorrect={submitted}
                    correctAnswer={tbs.data.correctAnswer}
                    explanation={tbs.explanation}
                  />
                )}

                 {tbs.type === 'wc' && (
                  <WrittenCommunicationInput
                    value={answer}
                    onChange={setAnswer}
                    disabled={submitted}
                    showCorrect={submitted}
                  />
                )}
              </div>

               {submitted && tbs.explanation && (
                <div className="bg-blue-50 p-6 border-t border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Explanation</h4>
                    <p className="text-blue-800">{tbs.explanation}</p>
                </div>
               )}

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-4 py-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
                <div className="flex items-center gap-3">
                  {submitted && fromDailyPlan && (
                    <button
                      onClick={() => navigate('/home')}
                      className="btn-primary flex items-center gap-2 px-6"
                    >
                      Back to Daily Plan
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={submitted}
                    className={clsx(
                      "flex items-center gap-2 px-8",
                      submitted 
                        ? "bg-green-600 text-white rounded-lg py-2 cursor-default"
                        : "btn-primary"
                    )}
                  >
                    {submitted ? 'Submitted' : 'Submit Answer'}
                    {!submitted && <Send className="w-4 h-4" />}
                    {submitted && <CheckCircle className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
       {/* Calculator Overlay */}
          {showCalculator && (
            <div className="absolute top-20 right-4 w-64 bg-slate-800 rounded-lg shadow-2xl z-50 border border-slate-700 flex flex-col">
              <div className="bg-slate-700 p-2 flex justify-between items-center rounded-t-lg">
                <span className="text-xs text-slate-300 font-bold uppercase">Calculator</span>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <SimpleCalculator />
            </div>
          )}
    </div>
  );
};

// Helper for link button style
const LinkButton = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(to)} className={className}>
            {children}
        </button>
    )
}

export default TBSSimulator;
