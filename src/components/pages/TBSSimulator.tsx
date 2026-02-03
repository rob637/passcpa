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

// Individual task/requirement within a TBS
interface TBSTask {
  id: string;
  type: 'journal' | 'calculation' | 'mcq' | 'wc';
  question: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // Flexible data depending on type
  explanation?: string;
}

// Full TBS with scenario + multiple tasks
interface TBSQuestion {
  id: string;
  title: string;
  description: string; // The scenario
  tasks: TBSTask[]; // Multiple tasks/tabs
  estimatedTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exhibits?: any[];
  hints?: string[];
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
  // Track answers for each task by task id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showExhibits, setShowExhibits] = useState(false);
  const [score, setScore] = useState(0);
  const [taskScores, setTaskScores] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  const currentSection = (userProfile?.examSection || 'FAR') as ExamSection;
  const sectionInfo = CPA_SECTIONS[currentSection];
  const tbsId = searchParams.get('id');
  
  // Daily plan awareness
  const fromDailyPlan = searchParams.get('from') === 'dailyplan';
  const activityId = searchParams.get('activityId');

  // Get current task
  const currentTask = tbs?.tasks[currentTaskIndex] || null;
  const totalTasks = tbs?.tasks.length || 0;

  // Transform raw TBS data into the format expected by the component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformTbs = (rawTbs: any): TBSQuestion | null => {
    if (!rawTbs) return null;
    
    // Get all requirements/tasks
    const requirements = rawTbs.requirements || [];
    
    // Transform each requirement into a task
    const tasks: TBSTask[] = requirements.map((req: any, index: number) => {
      // Map requirement type to component type
      let taskType: 'journal' | 'calculation' | 'mcq' | 'wc' = 'calculation';
      if (req.type === 'journal_entry' || req.type === 'journal') taskType = 'journal';
      else if (req.type === 'multiple_choice') taskType = 'mcq';
      else if (req.type === 'written_communication') taskType = 'wc';
      else if (req.type === 'calculation') taskType = 'calculation';
      
      return {
        id: req.id || `task-${index + 1}`,
        type: taskType,
        question: req.question || '',
        data: {
          // For journal entries
          template: req.template || [{ account: '', debit: '', credit: '' }],
          correctEntries: req.correctEntries,
          // For calculations
          correctAnswer: req.correctAnswer ?? 0,
          tolerance: req.tolerance ?? 1,
          // For multiple choice
          options: req.options || [],
          correctAnswer_mcq: req.correctAnswer, // Store separately for MCQ
        },
        explanation: req.explanation,
      };
    });
    
    // If no requirements, create a single task from the TBS itself (legacy format)
    if (tasks.length === 0) {
      let taskType: 'journal' | 'calculation' | 'mcq' | 'wc' = 'calculation';
      if (rawTbs.type === 'journal_entry' || rawTbs.type === 'journal') taskType = 'journal';
      else if (rawTbs.type === 'multiple_choice') taskType = 'mcq';
      else if (rawTbs.type === 'written_communication') taskType = 'wc';
      
      tasks.push({
        id: 'task-1',
        type: taskType,
        question: rawTbs.question || '',
        data: {
          template: rawTbs.template || [{ account: '', debit: '', credit: '' }],
          correctEntries: rawTbs.correctEntries,
          correctAnswer: rawTbs.correctAnswer ?? 0,
          tolerance: rawTbs.tolerance ?? 1,
          options: rawTbs.options || [],
          correctAnswer_mcq: rawTbs.correctAnswer,
        },
        explanation: rawTbs.explanation,
      });
    }
    
    return {
      id: rawTbs.id,
      title: rawTbs.title,
      description: rawTbs.scenario || rawTbs.description || '',
      tasks,
      estimatedTime: rawTbs.timeEstimate,
      difficulty: rawTbs.difficulty,
      exhibits: rawTbs.exhibits,
      hints: rawTbs.hints,
    };
  };

  // Update answer for current task
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateAnswer = (value: any) => {
    if (!currentTask) return;
    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: value
    }));
  };

  // Get answer for current task
  const currentAnswer = currentTask ? answers[currentTask.id] : null;

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

  // Score a single task
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scoreTask = (task: TBSTask, answer: any): number => {
    if (task.type === 'journal') {
      const userEntries = answer as JournalEntryRow[] || [];
      const correctEntries = task.data.correctEntries;
      const tolerance = task.data.tolerance || 5;
      return scoreJournalEntry(userEntries, correctEntries, tolerance);
    } else if (task.type === 'calculation') {
      const isCorrect = Math.abs(Number(answer) - task.data.correctAnswer) <= (task.data.tolerance || 0);
      return isCorrect ? 100 : 0;
    } else if (task.type === 'mcq') {
      // MCQ correct answer is stored in correctAnswer_mcq (index) or correctAnswer
      const correctIndex = task.data.correctAnswer_mcq ?? task.data.correctAnswer;
      return answer === correctIndex ? 100 : 0;
    } else if (task.type === 'wc') {
      return scoreWrittenCommunication(answer as string || '', task.data);
    }
    return 0;
  };

  const handleSubmit = async () => {
    if (!tbs) return;
    setSubmitted(true);
    
    // Score all tasks
    const scores: Record<string, number> = {};
    let totalScore = 0;
    
    for (const task of tbs.tasks) {
      const taskAnswer = answers[task.id];
      const taskScore = scoreTask(task, taskAnswer);
      scores[task.id] = taskScore;
      totalScore += taskScore;
    }
    
    setTaskScores(scores);
    
    // Calculate average score across all tasks
    const averageScore = tbs.tasks.length > 0 
      ? Math.round(totalScore / tbs.tasks.length) 
      : 0;
    setScore(averageScore);

    // Save progress
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 60000) : 0;
    await completeSimulation(tbs.id, averageScore, timeSpent);
    
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
    setAnswers({});
    setTaskScores({});
    setCurrentTaskIndex(0);
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
                {totalTasks} {totalTasks === 1 ? 'Task' : 'Tasks'}
              </span>
              <span>{sectionInfo?.name || currentSection}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(tbs.hints || tbs.exhibits) && (
            <button
              onClick={() => setShowExhibits(!showExhibits)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                showExhibits ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              <FileText className="w-4 h-4" />
              {tbs.hints ? 'Hints' : 'Exhibits'}
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
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line">
                 {tbs.description}
              </div>
            </div>

            {/* Hints Panel (Collapsible) */}
            {showExhibits && tbs.hints && tbs.hints.length > 0 && (
              <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-5">
                <div className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </div>
                <div className="text-sm text-amber-900 space-y-2">
                  {tbs.hints.map((hint, idx) => (
                    <p key={idx}>• {hint}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Exhibits Panel (Collapsible) - for actual document exhibits */}
            {showExhibits && tbs.exhibits && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {tbs.exhibits.map((exhibit: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                    <div className="font-bold text-slate-800 border-b pb-2 mb-3">
                      {exhibit.title}
                    </div>
                    <div className="text-sm text-slate-600 font-mono bg-slate-50 p-3 rounded border whitespace-pre-wrap">
                      {exhibit.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Task Tabs - Like real CPA exam */}
            {totalTasks > 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200 overflow-x-auto">
                  {tbs.tasks.map((task, index) => {
                    const taskScore = taskScores[task.id];
                    const hasAnswer = answers[task.id] !== undefined;
                    const isActive = index === currentTaskIndex;
                    
                    return (
                      <button
                        key={task.id}
                        onClick={() => setCurrentTaskIndex(index)}
                        className={clsx(
                          'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                          isActive
                            ? 'border-primary-600 text-primary-600 bg-primary-50'
                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        )}
                      >
                        <span className={clsx(
                          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                          submitted && taskScore !== undefined
                            ? taskScore >= 75
                              ? 'bg-success-100 text-success-700'
                              : 'bg-error-100 text-error-700'
                            : hasAnswer
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-slate-100 text-slate-600'
                        )}>
                          {submitted && taskScore !== undefined ? (
                            taskScore >= 75 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </span>
                        Task {index + 1}
                        <span className="text-xs text-slate-400">
                          ({TBS_LABELS[task.type] || task.type})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Answer Area for Current Task */}
            {currentTask && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-800">
                      {totalTasks > 1 ? `Task ${currentTaskIndex + 1} of ${totalTasks}` : 'Your Response'}
                    </h3>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                      {TBS_LABELS[currentTask.type] || currentTask.type}
                    </span>
                  </div>
                  {submitted && taskScores[currentTask.id] !== undefined && (
                    <div className={clsx(
                      "px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1",
                      taskScores[currentTask.id] >= 75 ? "bg-success-100 text-success-700" : "bg-error-100 text-error-700"
                    )}>
                      {taskScores[currentTask.id] >= 75 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {taskScores[currentTask.id]}%
                    </div>
                  )}
                </div>
                
                {/* Question/Task */}
                {currentTask.question && (
                  <div className="px-6 py-4 bg-primary-50 border-b border-primary-100">
                    <p className="text-slate-800 font-medium">
                      <span className="text-primary-600 font-bold">Task:</span> {currentTask.question}
                    </p>
                  </div>
                )}
                
                <div className="p-6">
                  {currentTask.type === 'journal' && (
                    <JournalEntryInput
                      template={currentTask.data.template}
                      value={currentAnswer}
                      onChange={updateAnswer}
                      disabled={submitted}
                      showCorrect={submitted}
                      correctEntries={currentTask.data.correctEntries}
                    />
                  )}

                  {currentTask.type === 'calculation' && (
                    <CalculationInput
                      value={currentAnswer}
                      onChange={updateAnswer}
                      disabled={submitted}
                      showCorrect={submitted}
                      correctAnswer={currentTask.data.correctAnswer}
                      tolerance={currentTask.data.tolerance}
                      explanation={currentTask.explanation}
                    />
                  )}

                  {currentTask.type === 'mcq' && (
                    <MultipleChoiceInput
                      options={currentTask.data.options}
                      value={currentAnswer}
                      onChange={updateAnswer}
                      disabled={submitted}
                      showCorrect={submitted}
                      correctAnswer={currentTask.data.correctAnswer_mcq ?? currentTask.data.correctAnswer}
                      explanation={currentTask.explanation}
                    />
                  )}

                  {currentTask.type === 'wc' && (
                    <WrittenCommunicationInput
                      value={currentAnswer}
                      onChange={updateAnswer}
                      disabled={submitted}
                      showCorrect={submitted}
                    />
                  )}
                </div>

                {submitted && currentTask.explanation && (
                  <div className="bg-blue-50 p-6 border-t border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Explanation</h4>
                    <p className="text-blue-800">{currentTask.explanation}</p>
                  </div>
                )}

                {/* Navigation + Submit */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-4 py-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Task navigation */}
                    {totalTasks > 1 && (
                      <div className="flex items-center gap-2 mr-4">
                        <button
                          onClick={() => setCurrentTaskIndex(Math.max(0, currentTaskIndex - 1))}
                          disabled={currentTaskIndex === 0}
                          className={clsx(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            currentTaskIndex === 0
                              ? "text-slate-400 cursor-not-allowed"
                              : "text-slate-600 hover:bg-slate-200"
                          )}
                        >
                          ← Previous
                        </button>
                        <span className="text-sm text-slate-500">
                          {currentTaskIndex + 1} / {totalTasks}
                        </span>
                        <button
                          onClick={() => setCurrentTaskIndex(Math.min(totalTasks - 1, currentTaskIndex + 1))}
                          disabled={currentTaskIndex === totalTasks - 1}
                          className={clsx(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            currentTaskIndex === totalTasks - 1
                              ? "text-slate-400 cursor-not-allowed"
                              : "text-slate-600 hover:bg-slate-200"
                          )}
                        >
                          Next →
                        </button>
                      </div>
                    )}
                    
                    {submitted && fromDailyPlan && (
                      <button
                        onClick={() => {
                          const params = new URLSearchParams();
                          params.set('from', 'dailyplan');
                          if (activityId) params.set('activityId', activityId);
                          params.set('completed', 'true');
                          navigate(`/home?${params.toString()}`);
                        }}
                        className="btn-primary flex items-center gap-2 px-6"
                      >
                        Back to Daily Plan
                      </button>
                    )}
                    
                    {/* Overall score badge when submitted */}
                    {submitted && (
                      <div className={clsx(
                        "px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2",
                        score >= 75 ? "bg-success-100 text-success-700" : "bg-error-100 text-error-700"
                      )}>
                        {score >= 75 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        Overall: {score}%
                      </div>
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
                      {submitted ? 'Submitted' : 'Submit All'}
                      {!submitted && <Send className="w-4 h-4" />}
                      {submitted && <CheckCircle className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
