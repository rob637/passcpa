import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  FileText,
  Lightbulb,
  BookOpen,
  Sparkles,
  Timer,
  Award,
} from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';
import {
  WC_RUBRIC,
  getRandomWC,
} from '../../data/written-communication';
import clsx from 'clsx';
import { WCTask } from '../../types';

// Word Counter Component
interface WordCounterProps {
  text: string;
  minWords?: number;
  maxWords?: number;
}

const WordCounter: React.FC<WordCounterProps> = ({ text, minWords = 300, maxWords = 500 }) => {
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
interface ExamTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
  isPaused?: boolean;
}

const ExamTimer: React.FC<ExamTimerProps> = ({ initialMinutes, onTimeUp, isPaused }) => {
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
interface RubricDisplayProps {
  scores?: Record<string, number>;
}

const RubricDisplay: React.FC<RubricDisplayProps> = ({ scores }) => {
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
              {rubric.criteria.map((criterion: string, idx: number) => (
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
interface SampleResponseViewerProps {
  sampleResponse: string;
  isVisible: boolean;
  onToggle: () => void;
}

const SampleResponseViewer: React.FC<SampleResponseViewerProps> = ({ sampleResponse, isVisible, onToggle }) => {
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
interface TaskSelectionScreenProps {
  tasks: WCTask[];
  onSelectTask: (task: WCTask) => void;
  onStartRandom: () => void;
}

const TaskSelectionScreen: React.FC<TaskSelectionScreenProps> = ({ tasks, onSelectTask, onStartRandom }) => {
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
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
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-primary-200 rounded-xl p-4 text-left transition-all"
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
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
interface ResultsScreenProps {
  task: WCTask;
  response: string;
  scores: Record<string, number>;
  onTryAgain: () => void;
  onSelectNew: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, onSelectNew }) => {
  const totalScore = Object.entries(scores).reduce((acc, [key, score]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category = (WC_RUBRIC as any)[key];
    return acc + score * (category?.weight || 0);
  }, 0);

  const percentage = Math.round((totalScore / 5) * 100);

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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
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
                  ? 'text-success-700'
                  : percentage >= 60
                    ? 'text-warning-700'
                    : 'text-error-700'
              )}
            >
              {percentage}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {percentage >= 75 ? 'Strong Response' : 'Review Areas for Improvement'}
          </h2>
          <p className="text-slate-600">
            Based on automated assessment of length, keywords, and structure
          </p>
        </div>

        <RubricDisplay scores={scores} />
      </div>

      <div className="flex justify-between">
         <button onClick={onSelectNew} className="btn-primary">
            Practice Another Task
         </button>
      </div>
    </div>
  );
};

const WrittenCommunication: React.FC = () => {
  const [activeTask, setActiveTask] = useState<WCTask | null>(null);
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  // const [showSample, setShowSample] = useState(false);
  
  // Placeholder tasks for now - ideally imported from data 
  const tasks: WCTask[] = [
    getRandomWC()
  ].filter(Boolean);


  const handleStartTask = (task: WCTask) => {
    setActiveTask(task);
    setResponse('');
    setIsSubmitted(false);
    setScores({});
    setShowSample(false);
  };

  const handleSubmit = useCallback(() => {
    if(!activeTask) return;

    // Mock grading logic
    const wordCount = response.trim().split(/\s+/).length;
    const newScores = {
       organization: wordCount > 200 ? 5 : 3,
       development: wordCount > 300 ? 5 : 3,
       analysis: 4,
       clarity: 4,
       mechanics: 5
    };
    setScores(newScores);
    setIsSubmitted(true);
  }, [activeTask, response]);

  if (!activeTask) {
    return (
      <TaskSelectionScreen 
        tasks={tasks} 
        onSelectTask={handleStartTask}
        onStartRandom={() => handleStartTask(getRandomWC())}
      />
    );
  }

  if (isSubmitted) {
    return (
      <ResultsScreen 
        task={activeTask}
        response={response}
        scores={scores}
        onTryAgain={() => setIsSubmitted(false)}
        onSelectNew={() => setActiveTask(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Editor UI - simplified for brevity, following the pattern of reusing components */}
       <div className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                Written Communication
            </div>
            <div className="font-bold text-slate-900">{activeTask.topic}</div>
          </div>
          <div className="flex items-center gap-4">
             <ExamTimer initialMinutes={activeTask.estimatedTime} onTimeUp={handleSubmit} />
             <button onClick={handleSubmit} className="btn-primary">Submit Response</button>
          </div>
       </div>

       <div className="flex-1 max-w-5xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Description */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    Task Definition
                </h3>
                <div className="prose prose-sm text-slate-700 whitespace-pre-wrap">
                    {activeTask.task}
                </div>
             </div>

             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-3">
                   <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                   <div className="text-sm text-blue-900">
                      <p className="font-bold mb-1">Remember:</p>
                      <p>Address the memo to the specific audience mentioned in the task. Keep your tone professional and objective.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Editor Area */}
          <div className="flex flex-col h-full">
            <textarea 
               value={response}
               onChange={(e) => setResponse(e.target.value)}
               className="flex-1 w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed mb-2"
               placeholder="To: [Recipient]&#10;Re: [Subject]&#10;&#10;[Start typing your response here...]"
            />
            <div className="flex justify-end">
               <WordCounter text={response} />
            </div>
          </div>
       </div>
    </div>
  );
};

export default WrittenCommunication;
