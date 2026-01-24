import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  FileText,
  Lightbulb,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  RotateCcw,
  BookOpen,
  Sparkles,
  Timer,
  Award,
  List,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import {
  BEC_WRITTEN_COMMUNICATIONS,
  WC_RUBRIC,
  getRandomWC,
} from '../../data/written-communication';
import clsx from 'clsx';

// Word Counter Component
const WordCounter = ({ text, minWords = 300, maxWords = 500 }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const isUnder = wordCount < minWords;
  const isOver = wordCount > maxWords;
  const isOptimal = wordCount >= minWords && wordCount <= maxWords;

  return (
    <div
      className={clsx(
        'text-sm font-medium',
        isUnder && 'text-warning-600',
        isOver && 'text-error-600',
        isOptimal && 'text-success-600'
      )}
    >
      {wordCount} words
      {isUnder && <span className="text-slate-500 ml-1">(min: {minWords})</span>}
      {isOver && <span className="text-slate-500 ml-1">(max: {maxWords})</span>}
      {isOptimal && <span className="text-slate-500 ml-1">✓</span>}
    </div>
  );
};

// Timer Component
const ExamTimer = ({ initialMinutes, onTimeUp, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLow = timeLeft < 300; // Less than 5 minutes

  return (
    <div
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg',
        isLow ? 'bg-error-100 text-error-700 animate-pulse' : 'bg-slate-100 text-slate-700'
      )}
    >
      <Timer className="w-5 h-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

// Rubric Display Component
const RubricDisplay = ({ scores }) => {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
        <Award className="w-5 h-5 text-primary-600" />
        Scoring Rubric
      </h4>
      <div className="space-y-3">
        {Object.entries(WC_RUBRIC).map(([key, rubric]) => (
          <div key={key} className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-900 capitalize">{key}</span>
              <span className="text-sm text-slate-500">{Math.round(rubric.weight * 100)}%</span>
            </div>
            {scores && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all',
                      scores[key] >= 4
                        ? 'bg-success-500'
                        : scores[key] >= 3
                          ? 'bg-warning-500'
                          : 'bg-error-500'
                    )}
                    style={{ width: `${(scores[key] / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600">{scores[key]}/5</span>
              </div>
            )}
            <ul className="text-sm text-slate-600 space-y-1">
              {rubric.criteria.map((criterion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-400">•</span>
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sample Response Viewer
const SampleResponseViewer = ({ sampleResponse, isVisible, onToggle }) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <span className="font-medium text-slate-900">View Sample Response</span>
        </div>
        <ChevronRight
          className={clsx('w-5 h-5 text-slate-400 transition-transform', isVisible && 'rotate-90')}
        />
      </button>
      {isVisible && (
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
              {sampleResponse}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// Task Selection Screen
const TaskSelectionScreen = ({ tasks, onSelectTask, onStartRandom }) => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      <div className="mb-8">
        <Link
          to="/study"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Study
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Written Communication Practice</h1>
        <p className="text-slate-600 mt-1">
          Practice professional business writing for the BEC section
        </p>
      </div>

      {/* Quick Start */}
      <div className="card-elevated p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-slate-900">Random Task</h2>
            <p className="text-sm text-slate-600">Get a randomly selected WC task for practice</p>
          </div>
          <button onClick={onStartRandom} className="btn-primary">
            Start
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 mb-3">Choose a Topic</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="w-full card-interactive p-4 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{task.topic}</h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {task.task.slice(0, 150)}...
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedTime} min
                    </span>
                    <span
                      className={clsx(
                        'text-xs px-2 py-0.5 rounded-full',
                        task.difficulty === 'easy' && 'bg-success-100 text-success-700',
                        task.difficulty === 'moderate' && 'bg-warning-100 text-warning-700',
                        task.difficulty === 'hard' && 'bg-error-100 text-error-700'
                      )}
                    >
                      {task.difficulty}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="card bg-blue-50 border-blue-200 p-4">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Tips for WC Tasks</h3>
            <ul className="text-sm text-blue-800 mt-2 space-y-1">
              <li>• Use a professional business memo format</li>
              <li>• Address all parts of the task requirement</li>
              <li>• Aim for 300-500 words</li>
              <li>• Proofread for grammar and clarity</li>
              <li>• Support your points with specific examples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Results Screen
const ResultsScreen = ({ task, response, scores, onTryAgain, onSelectNew }) => {
  const totalScore = Object.entries(scores).reduce((acc, [key, score]) => {
    return acc + score * WC_RUBRIC[key].weight;
  }, 0);

  const percentage = Math.round((totalScore / 5) * 100);
  const wordCount = response.trim().split(/\s+/).length;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto page-enter">
      <div className="mb-6">
        <Link
          to="/study"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Study
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Response Submitted</h1>
      </div>

      {/* Score Card */}
      <div className="card-elevated p-6 mb-6">
        <div className="text-center mb-6">
          <div
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4',
              percentage >= 80
                ? 'bg-success-100'
                : percentage >= 60
                  ? 'bg-warning-100'
                  : 'bg-error-100'
            )}
          >
            <span
              className={clsx(
                'text-3xl font-bold',
                percentage >= 80
                  ? 'text-success-600'
                  : percentage >= 60
                    ? 'text-warning-600'
                    : 'text-error-600'
              )}
            >
              {percentage}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {percentage >= 80
              ? 'Excellent Work!'
              : percentage >= 60
                ? 'Good Effort!'
                : 'Keep Practicing!'}
          </h2>
          <p className="text-slate-600 mt-1">Topic: {task.topic}</p>
          <p className="text-sm text-slate-500">{wordCount} words written</p>
        </div>

        <RubricDisplay scores={scores} />
      </div>

      {/* Your Response */}
      <div className="card p-4 mb-6">
        <h3 className="font-semibold text-slate-900 mb-3">Your Response</h3>
        <div className="bg-slate-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">{response}</pre>
        </div>
      </div>

      {/* Sample Response */}
      <SampleResponseViewer
        sampleResponse={task.sampleResponse}
        isVisible={true}
        onToggle={() => {}}
      />

      {/* Key Points */}
      <div className="card p-4 mt-6">
        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <List className="w-5 h-5 text-primary-600" />
          Key Points to Include
        </h3>
        <ul className="space-y-2">
          {task.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button onClick={onTryAgain} className="btn-ghost flex-1">
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </button>
        <button onClick={onSelectNew} className="btn-primary flex-1">
          New Task
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

// Main Component
const WrittenCommunication = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userProfile } = useAuth();

  const [screen, setScreen] = useState('select'); // select, task, results
  const [currentTask, setCurrentTask] = useState(null);
  const [response, setResponse] = useState('');
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [scores, setScores] = useState(null);
  const textareaRef = useRef(null);

  // Handle task selection from URL
  useEffect(() => {
    const taskId = searchParams.get('task');
    if (taskId) {
      const task = BEC_WRITTEN_COMMUNICATIONS.find((t) => t.id === taskId);
      if (task) {
        setCurrentTask(task);
        setScreen('task');
      }
    }
  }, [searchParams]);

  const handleSelectTask = (task) => {
    setCurrentTask(task);
    setResponse('');
    setShowHints(false);
    setShowSample(false);
    setScores(null);
    setScreen('task');
  };

  const handleStartRandom = () => {
    const randomTask = getRandomWC();
    handleSelectTask(randomTask);
  };

  const handleTimeUp = useCallback(() => {
    // Auto-submit when time is up
    handleSubmit();
  }, [response]);

  // Simple scoring simulation (in production, would use AI grading)
  const calculateScores = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const hasGreeting = /dear|to:|memo|memorandum/i.test(text);
    const hasConclusion = /regards|sincerely|respectfully|thank you/i.test(text);
    const hasParagraphs = (text.match(/\n\n/g) || []).length >= 2;

    // Simple heuristic scoring
    let organization = 2;
    if (hasGreeting) organization += 1;
    if (hasConclusion) organization += 1;
    if (hasParagraphs) organization += 1;

    let development = 2;
    if (wordCount >= 200) development += 1;
    if (wordCount >= 300) development += 1;
    if (wordCount >= 400) development += 1;

    let expression = 3;
    if (wordCount >= 250 && wordCount <= 500) expression += 1;
    if (hasParagraphs) expression += 1;

    return {
      organization: Math.min(5, organization),
      development: Math.min(5, development),
      expression: Math.min(5, expression),
    };
  };

  const handleSubmit = () => {
    if (response.trim().length < 50) {
      alert('Please write a more complete response before submitting.');
      return;
    }

    const calculatedScores = calculateScores(response);
    setScores(calculatedScores);
    setScreen('results');
  };

  const handleTryAgain = () => {
    setResponse('');
    setShowHints(false);
    setShowSample(false);
    setScores(null);
    setScreen('task');
  };

  const handleSelectNew = () => {
    setCurrentTask(null);
    setResponse('');
    setShowHints(false);
    setShowSample(false);
    setScores(null);
    setScreen('select');
  };

  // Select screen
  if (screen === 'select') {
    return (
      <TaskSelectionScreen
        tasks={BEC_WRITTEN_COMMUNICATIONS}
        onSelectTask={handleSelectTask}
        onStartRandom={handleStartRandom}
      />
    );
  }

  // Results screen
  if (screen === 'results' && scores) {
    return (
      <ResultsScreen
        task={currentTask}
        response={response}
        scores={scores}
        onTryAgain={handleTryAgain}
        onSelectNew={handleSelectNew}
      />
    );
  }

  // Task screen
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setScreen('select')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="font-semibold text-slate-900">{currentTask?.topic}</h1>
              <p className="text-sm text-slate-500">Written Communication</p>
            </div>
          </div>
          <ExamTimer
            initialMinutes={currentTask?.estimatedTime || 25}
            onTimeUp={handleTimeUp}
            isPaused={isTimerPaused}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Scenario */}
        <div className="card p-5">
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Scenario
          </h2>
          <div className="prose prose-sm max-w-none text-slate-700">
            <p className="whitespace-pre-wrap">{currentTask?.scenario}</p>
          </div>
        </div>

        {/* Task */}
        <div className="card p-5 border-2 border-primary-200 bg-primary-50/30">
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary-600" />
            Task
          </h2>
          <div className="prose prose-sm max-w-none text-slate-700">
            <p className="whitespace-pre-wrap">{currentTask?.task}</p>
          </div>
        </div>

        {/* Hints Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowHints(!showHints)}
            className={clsx('btn-ghost text-sm', showHints && 'bg-warning-100 text-warning-700')}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        </div>

        {/* Hints */}
        {showHints && (
          <div className="card bg-warning-50 border-warning-200 p-4">
            <h3 className="font-medium text-warning-900 mb-2">Key Points to Address</h3>
            <ul className="space-y-1">
              {currentTask?.keyPoints.map((point, idx) => (
                <li key={idx} className="text-sm text-warning-800 flex items-start gap-2">
                  <span className="text-warning-600">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Response Area */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-900">Your Response</h2>
            <WordCounter text={response} minWords={300} maxWords={500} />
          </div>
          <textarea
            ref={textareaRef}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Begin your professional memo here...

MEMORANDUM

TO: 
FROM: 
DATE: 
RE: 

"
            className="w-full h-96 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        {/* Rubric Reference */}
        <RubricDisplay />

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button onClick={() => setScreen('select')} className="btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={response.trim().length < 50}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrittenCommunication;
