import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { CMA_ESSAY_TASKS } from '../../data/cma/essays';
import { WCTask } from '../../types';
import aiService from '../../services/aiService';
import logger from '../../utils/logger';

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
  const [currentTask, setCurrentTask] = useState<WCTask | null>(null);
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [viewState, setViewState] = useState<'select' | 'writing' | 'results'>('select');

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
          <Link to="/cma/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to CMA Dashboard
          </Link>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-indigo-100 rounded-xl">
               <FileText className="w-8 h-8 text-indigo-700" />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-slate-900">CMA Essay Simulator</h1>
                <p className="text-slate-600">AI-Graded Essay Practice for Part 1 & 2</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CMA_ESSAY_TASKS.map(task => (
            <div key={task.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                 <span className={clsx(
                   "px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
                   task.section === 'CMA1' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                 )}>
                   {task.section === 'CMA1' ? 'Part 1' : 'Part 2'}
                 </span>
                 <span className={clsx("text-xs px-2 py-1 rounded-full", 
                   task.difficulty === 'hard' ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                 )}>
                   {task.difficulty}
                 </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{task.topic}</h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3">{task.scenario}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {task.estimatedTime} mins
                </div>
                <button 
                  onClick={() => handleStartTask(task)}
                  className="btn-primary flex items-center gap-2"
                >
                  Start Practicing <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
             onClick={() => setViewState('select')}
             className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"
             disabled={isSubmitting}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-slate-900">{currentTask?.topic}</h2>
            <p className="text-xs text-slate-500">Essay Practice Mode</p>
          </div>
        </div>
        
        {viewState === 'writing' && (
           <div className={clsx(
             "font-mono text-xl font-medium px-4 py-1 rounded-lg border",
             timeLeft < 300 ? "bg-red-50 border-red-200 text-red-700" : "bg-slate-100 border-slate-200 text-slate-700"
           )}>
             {formatTime(timeLeft)}
           </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Scenario */}
        <div className="md:w-1/3 flex flex-col border-r border-slate-200 bg-white">
           <div className="p-4 bg-slate-50 border-b border-slate-200 font-medium text-slate-700 flex items-center gap-2">
             <BookOpen className="w-4 h-4" /> Scenario
           </div>
           <div className="flex-1 overflow-y-auto p-6 prose prose-sm max-w-none">
             <p className="whitespace-pre-wrap">{currentTask?.scenario}</p>
             <hr className="my-4" />
             <h4 className="font-bold text-slate-900">Task Requirements:</h4>
             <p className="whitespace-pre-wrap">{currentTask?.task || currentTask?.prompt}</p>
           </div>
        </div>

        {/* Right: Work Area or Results */}
        <div className="md:w-2/3 flex flex-col bg-slate-50">
          {viewState === 'writing' ? (
            <>
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                 <span className="font-medium text-slate-700 flex items-center gap-2">
                   <FileText className="w-4 h-4" /> Your Response
                 </span>
                 <WordCounter text={response} />
              </div>
              <textarea
                className="flex-1 w-full p-6 resize-none focus:outline-none font-serif text-lg leading-relaxed bg-white"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                spellCheck={false}
              />
              <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || response.length < 50}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Grading...' : 'Submit for Grading'}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-8">
               <div className="max-w-3xl mx-auto">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 border-b border-slate-200 bg-indigo-50 flex items-center gap-3">
                       <Sparkles className="w-6 h-6 text-indigo-600" />
                       <h2 className="text-xl font-bold text-indigo-900">AI Grading Report</h2>
                    </div>
                    <div className="p-6 prose prose-slate max-w-none">
                       {/* Render AI Feedback - It might be markdown */}
                       <div dangerouslySetInnerHTML={{ 
                         // Simple protection since this comes from our internal AI service, though in prod use a sanitizer
                         __html: aiFeedback ? aiFeedback.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') : '' 
                       }} />
                    </div>
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Key Points You Should Have Covered:</h3>
                    <ul className="space-y-2">
                       {currentTask?.keyPoints?.map((idx, i) => (
                         <li key={i} className="flex gap-3 text-slate-700 text-sm">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            {idx}
                         </li>
                       ))}
                    </ul>
                 </div>

                 <div className="mt-8 flex justify-center gap-4">
                    <button 
                      onClick={() => setViewState('select')}
                      className="btn-secondary"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </button>
                    <button 
                      onClick={() => handleStartTask(currentTask!)}
                      className="btn-primary"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                    </button>
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
