
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Save
} from 'lucide-react';
import { CIA_SECTION_CONFIG, CIASectionId } from '../../courses/cia/config';
import { getCIAMockExamConfig, generateCIAMockExam, GeneratedCIAMockExam } from '../../data/cia/mock-exams';
import { getAllCIAQuestions } from '../../data/cia';
import { PageLoader } from '../../components/common/PageLoader';

export default function CIAExamSimulator() {
  const navigate = useNavigate();
  const [setupMode, setSetupMode] = useState(true);
  const [selectedSection, setSelectedSection] = useState<CIASectionId>('CIA1');
  const [examMode, setExamMode] = useState<'full' | 'quick'>('quick');
  const [activeExam, setActiveExam] = useState<GeneratedCIAMockExam | null>(null);
  
  // Exam Execution State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startExam = () => {
    const config = getCIAMockExamConfig(examMode, selectedSection);
    // In a real app we would import questions specific to the section
    // Here we use the generic pool getter and filter
    const allQuestions = getAllCIAQuestions().filter(q => q.domainId.startsWith(selectedSection));
    const exam = generateCIAMockExam(config, allQuestions);
    setActiveExam(exam);
    setSetupMode(false);
  };

  const currentQuestion = activeExam?.questions[currentQuestionIndex];

  if (!setupMode && activeExam && currentQuestion) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            {/* Exam Header */}
            <div className="bg-white dark:bg-slate-800 shadow-sm px-4 py-3 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                        {CIA_SECTION_CONFIG[selectedSection].shortName} Exam
                    </h2>
                    <div className="text-sm text-slate-500">
                        Question {currentQuestionIndex + 1} of {activeExam.questions.length}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono font-medium">--:--</span>
                    </div>
                    <button onClick={() => navigate('/cia/dashboard')} className="text-sm text-red-500 hover:text-red-600">
                        Exit
                    </button>
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
                <div className="card p-6 md:p-8 min-h-[400px] flex flex-col">
                    <div className="flex-1">
                        <p className="text-lg mb-8 leading-relaxed text-slate-900 dark:text-slate-100">
                            {currentQuestion.text}
                        </p>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedAnswer(option.id)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                        selectedAnswer === option.id 
                                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                                        : 'border-slate-200 dark:border-slate-700 hover:border-amber-200'
                                    }`}
                                >
                                    <span className="inline-block w-6 h-6 rounded-full border border-slate-300 mr-3 text-center text-sm leading-5">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 mt-8 pt-6 flex justify-between">
                        <button 
                            className="btn btn-outline"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </button>
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                if (currentQuestionIndex < activeExam.questions.length - 1) {
                                    setCurrentQuestionIndex(prev => prev + 1);
                                    setSelectedAnswer(null); // Reset for visual simplicity in this sprint
                                } else {
                                    // Submit
                                    navigate('/cia/dashboard');
                                }
                            }}
                        >
                            {currentQuestionIndex === activeExam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                            {currentQuestionIndex < activeExam.questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">CIA Exam Simulator</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">1. Select Section</h3>
                <div className="space-y-2">
                    {(Object.keys(CIA_SECTION_CONFIG) as CIASectionId[]).map(id => (
                        <button
                            key={id}
                            onClick={() => setSelectedSection(id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                                selectedSection === id 
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-500' 
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            <div className="font-medium text-slate-900 dark:text-slate-100">{CIA_SECTION_CONFIG[id].name}</div>
                            <div className="text-sm text-slate-500">{CIA_SECTION_CONFIG[id].questionsCount} Questions • {id === 'CIA1' ? '2.5' : '2.0'} Hours</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">2. Select Mode</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setExamMode('quick')}
                        className={`p-4 rounded-lg border text-center transition-all ${
                            examMode === 'quick' 
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                    >
                        <Clock className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                        <div className="font-medium">Quick Practice</div>
                        <div className="text-xs text-slate-500">25 Questions</div>
                    </button>
                    <button
                        onClick={() => setExamMode('full')}
                        className={`p-4 rounded-lg border text-center transition-all ${
                            examMode === 'full' 
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                    >
                        <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-medium">Full Exam</div>
                        <div className="text-xs text-slate-500">Real Simulation</div>
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <Play className="w-8 h-8 ml-1" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Ready to Start?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs">
                You are about to start a {examMode === 'full' ? 'full length' : 'quick'} practice exam for {CIA_SECTION_CONFIG[selectedSection].shortName}.
            </p>
            <button 
                onClick={startExam}
                className="btn btn-primary btn-lg w-full max-w-xs shadow-lg shadow-amber-500/20"
            >
                Start Exam Now
            </button>
        </div>
      </div>
    </div>
  );
}
