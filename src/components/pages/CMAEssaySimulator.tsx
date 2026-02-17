import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  FileText,
  BookOpen,
  Sparkles,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { CMA_ESSAYS } from '../../data/cma/essays/index';
import { WCTask } from '../../types';
import aiService from '../../services/aiService';
import logger from '../../utils/logger';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { recordEssayResult, getEssayHistory, EssayHistoryEntry } from '../../services/questionHistoryService';

// --- Components ---

const WordCounter: React.FC<{ text: string }> = ({ text }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  // CMA essays are typically longer/detailed, but quality > quantity
  const isOptimal = wordCount >= 150; 
  
  return (
    <div className={clsx('text-xs font-medium', isOptimal ? 'text-success-600' : 'text-slate-500')}>
      {wordCount} words
    </div>
  );
};

// --- Main Page ---

const CMAEssaySimulator: React.FC = () => {
  const { user } = useAuth();
  const { recordStudyActivity } = useStudy();
  const [currentTask, setCurrentTask] = useState<WCTask | null>(null);
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [viewState, setViewState] = useState<'select' | 'writing' | 'results'>('select');
  const [essayHistory, setEssayHistory] = useState<Map<string, EssayHistoryEntry>>(new Map());
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load essay history for completion indicators
  useEffect(() => {
    if (viewState !== 'select' || !user?.uid) return;
    const loadHistory = async () => {
      const history = await getEssayHistory(user.uid);
      setEssayHistory(new Map(history.map(h => [h.essayId, h])));
    };
    loadHistory();
  }, [viewState, user?.uid]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const handleStartTask = (task: WCTask) => {
    setCurrentTask(task);
    setResponse('');
    setTimeLeft(task.estimatedTime * 60);
    setIsTimerRunning(true);
    setViewState('writing');
    setAiFeedback(null);
  };

  const handleSubmit = async () => {
    if (!currentTask) return;
    setIsTimerRunning(false);
    setIsSubmitting(true);

    try {
      const completionPrompt = `
      Task Scenario: ${currentTask.scenario}
      
      Task Requirements: ${currentTask.task || currentTask.prompt}
      
      Student Response: ${response}
      
      Please evaluate this response based on the CMA Essay Grading Rubric.
      `;

      const feedback = await aiService.generateAIResponse(
        completionPrompt, 
        'evaluate', 
        [], 
        currentTask.section, 
        [], 
        'cma'
      );
      
      setAiFeedback(feedback);
      setViewState('results');
      
      // Record essay completion - use word count as a simple quality metric
      if (user?.uid && currentTask) {
        const wordCount = response.trim().split(/\s+/).length;
        // Score based on meeting word count threshold (150+ = good)
        const score = wordCount >= 150 ? 80 : Math.round((wordCount / 150) * 75);
        const timeSpent = (currentTask.estimatedTime * 60) - timeLeft;
        await recordEssayResult(user.uid, currentTask.id, score, currentTask.section, timeSpent);
        // Record points to daily log for daily goal progress (15 pts per essay)
        const timeSpentMinutes = Math.round(timeSpent / 60);
        await recordStudyActivity('essay', 15, timeSpentMinutes, {
          essayId: currentTask.id,
          section: currentTask.section,
          score,
        });
      }
      
      // Scroll to top so user sees the grading report immediately
      setTimeout(() => {
        resultsRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      logger.error('Error grading essay:', error);
      // Fallback if AI fails (offline or error)
      setAiFeedback("Unable to connect to AI Grading Service. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (viewState === 'select') {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link to="/cma/dashboard" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to CMA Dashboard
          </Link>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
               <FileText className="w-8 h-8 text-indigo-700 dark:text-indigo-400" />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">CMA Essay Simulator</h1>
                <p className="text-slate-600 dark:text-slate-400">AI-Graded Essay Practice for Part 1 & 2</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CMA_ESSAYS.map(task => {
            const history = essayHistory.get(task.id);
            const isCompleted = history?.mastered;
            const hasAttempted = history && history.attempts > 0;
            
            return (
            <Card key={task.id} variant="interactive" className={clsx(
              "p-6",
              isCompleted && "ring-2 ring-success-400 dark:ring-success-600"
            )}>
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                   <span className={clsx(
                     "px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
                     task.section === 'CMA1' 
                       ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300" 
                       : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                   )}>
                     {task.section === 'CMA1' ? 'Part 1' : 'Part 2'}
                   </span>
                   {isCompleted && (
                     <CheckCircle className="w-4 h-4 text-success-500" />
                   )}
                   {hasAttempted && !isCompleted && (
                     <span className="px-1.5 py-0.5 bg-warning-100 dark:bg-warning-900/30 rounded text-xs font-medium text-warning-700 dark:text-warning-300">
                       {history.attempts}x
                     </span>
                   )}
                 </div>
                 <span className={clsx("text-xs px-2 py-1 rounded-full", 
                   task.difficulty === 'hard' 
                     ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300" 
                     : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
                 )}>
                   {task.difficulty}
                 </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{task.topic}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{task.scenario}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  {task.estimatedTime} mins
                </div>
                <Button 
                  variant="primary"
                  onClick={() => handleStartTask(task)}
                  rightIcon={ChevronRight}
                >
                  Start Practicing
                </Button>
              </div>
            </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button 
             variant="ghost"
             size="icon"
             onClick={() => setViewState('select')}
             disabled={isSubmitting}
             className="text-slate-500 dark:text-slate-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">{currentTask?.topic}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Essay Practice Mode</p>
          </div>
        </div>
        
        {viewState === 'writing' && (
           <div className={clsx(
             "font-mono text-xl font-medium px-4 py-1 rounded-lg border",
             timeLeft < 300 
               ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400" 
               : "bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
           )}>
             {formatTime(timeLeft)}
           </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Scenario */}
        <div className="md:w-1/3 flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
           <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
             <BookOpen className="w-4 h-4" /> Scenario
           </div>
           <div className="flex-1 overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
             <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{currentTask?.scenario}</p>
             <hr className="my-4 border-slate-200 dark:border-slate-600" />
             <h4 className="font-bold text-slate-900 dark:text-slate-100">Task Requirements:</h4>
             <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{currentTask?.task || currentTask?.prompt}</p>
           </div>
        </div>

        {/* Right: Work Area or Results */}
        <div className="md:w-2/3 flex flex-col bg-slate-50 dark:bg-slate-900">
          {viewState === 'writing' ? (
            <>
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
                 <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                   <FileText className="w-4 h-4" /> Your Response
                 </span>
                 <WordCounter text={response} />
              </div>
              <textarea
                className="flex-1 w-full p-6 resize-none focus:outline-none font-serif text-lg leading-relaxed bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                spellCheck={false}
              />
              <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <Button 
                  variant="primary"
                  onClick={handleSubmit} 
                  disabled={isSubmitting || response.length < 50}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'Grading...' : 'Submit for Grading'}
                </Button>
              </div>
            </>
          ) : (
            <div ref={resultsRef} className="flex-1 overflow-y-auto p-8">
               <div className="max-w-3xl mx-auto">
                 <Card noPadding className="overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-indigo-50 dark:bg-indigo-900/30 flex items-center gap-3">
                       <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                       <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">AI Grading Report</h2>
                    </div>
                    <div className="p-6 prose prose-slate dark:prose-invert max-w-none">
                       {aiFeedback && (
                         <ReactMarkdown
                           remarkPlugins={[remarkGfm]}
                           components={{
                             h2: ({ children }) => <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-6 mb-3 first:mt-0">{children}</h2>,
                             h3: ({ children }) => <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">{children}</h3>,
                             strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-slate-100">{children}</strong>,
                             ul: ({ children }) => <ul className="space-y-1.5 my-3 list-disc list-inside">{children}</ul>,
                             ol: ({ children }) => <ol className="space-y-1.5 my-3 list-decimal list-inside">{children}</ol>,
                             li: ({ children }) => <li className="text-slate-700 dark:text-slate-300">{children}</li>,
                             p: ({ children }) => <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{children}</p>,
                             hr: () => <hr className="my-4 border-slate-200 dark:border-slate-700" />,
                           }}
                         >
                           {aiFeedback}
                         </ReactMarkdown>
                       )}
                    </div>
                 </Card>

                 <Card className="p-6">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Key Points You Should Have Covered:</h3>
                    <ul className="space-y-2">
                       {currentTask?.keyPoints?.map((idx, i) => (
                         <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            {idx}
                         </li>
                       ))}
                    </ul>
                 </Card>

                 <div className="mt-8 flex justify-center gap-4">
                    <Button 
                      variant="secondary"
                      onClick={() => setViewState('select')}
                      leftIcon={ArrowLeft}
                    >
                      Back to List
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => handleStartTask(currentTask!)}
                      leftIcon={RotateCcw}
                    >
                      Try Again
                    </Button>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CMAEssaySimulator;
