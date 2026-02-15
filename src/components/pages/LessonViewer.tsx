import React, { useState, useEffect } from 'react';
import logger from '../../utils/logger';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  HelpCircle,
  Bot,
  Share2,
  Volume2,
  Pause,
  AlertCircle,
  List,
  Table,
  FileText,
} from 'lucide-react';
import { useStudy } from '../../hooks/useStudy';
import { useAuth } from '../../hooks/useAuth';
import { useCourse } from '../../providers/CourseProvider';
import { getDefaultSection } from '../../utils/sectionUtils';
import { fetchLessonById, fetchLessonsBySection } from '../../services/lessonService';
import { fetchQuestions } from '../../services/questionService';
import { BookmarkButton, NotesButton } from '../common/Bookmarks';
import { Button } from '../common/Button';
import clsx from 'clsx';
import { LessonContentSection, ExamSection, Lesson } from '../../types';

// Clean text for speech synthesis - remove markdown and punctuation that sounds weird
const cleanTextForSpeech = (text: string): string => {
  return text
    // Remove markdown headers
    .replace(/#{1,6}\s*/g, '')
    // Remove bold/italic markers
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
    // Remove bullet points
    .replace(/^[-*•]\s*/gm, '')
    // Remove numbered lists formatting
    .replace(/^\d+\.\s*/gm, '')
    // Replace multiple dashes/underscores with pause
    .replace(/[-_]{2,}/g, ', ')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Replace special characters that get spoken
    .replace(/[&]/g, ' and ')
    .replace(/[<>]/g, '')
    .replace(/\$/g, ' dollars ')
    .replace(/%/g, ' percent ')
    // Clean up parenthetical content - make it flow better
    .replace(/\(([^)]+)\)/g, ', $1, ')
    // Replace colons and semicolons with natural pauses
    .replace(/[:;]/g, ', ')
    // Remove quotes around words
    .replace(/["'`]/g, '')
    // Clean up multiple spaces/newlines
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    // Clean up multiple periods/commas
    .replace(/[.,]{2,}/g, '.')
    .replace(/,\s*\./g, '.')
    .trim();
};

// Get the best available voice for natural speech
const getBestVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  
  // Priority order for natural-sounding voices (free)
  const preferredVoices = [
    // Google voices (most natural, available in Chrome)
    'Google US English',
    'Google UK English Female',
    'Google UK English Male',
    // Microsoft Edge voices (very natural)
    'Microsoft Zira',
    'Microsoft David',
    'Microsoft Mark',
    'Microsoft Jenny',
    'Microsoft Aria',
    // macOS voices
    'Samantha',
    'Alex',
    'Karen',
    // Other natural voices
    'English United States',
    'en-US',
  ];
  
  // Try to find a preferred voice
  for (const preferred of preferredVoices) {
    const voice = voices.find(v => 
      v.name.includes(preferred) || 
      v.lang.startsWith('en') && v.name.toLowerCase().includes(preferred.toLowerCase())
    );
    if (voice) return voice;
  }
  
  // Fallback: find any English voice that's not the robotic default
  const englishVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    (v.name.includes('Female') || v.name.includes('Male') || v.localService === false)
  );
  if (englishVoice) return englishVoice;
  
  // Last resort: any English voice
  return voices.find(v => v.lang.startsWith('en')) || null;
};

// Sanitize HTML to prevent XSS attacks
const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'br', 'span', 'p', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
  });
};

interface ContentSectionProps {
  section: LessonContentSection;
}

// Render different content section types
const ContentSection: React.FC<ContentSectionProps> = ({ section }) => {
  switch (section.type) {
    case 'text':
      if (typeof section.content !== 'string') return null;
      return (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {section.content.split('\n\n').map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ 
              __html: sanitizeHTML(
                paragraph
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/•/g, '&#8226;')
              )
            }} />
          ))}
        </div>
      );

    case 'list':
      // Handle both formats: items[] (simple strings) or content[] ({term, definition})
      const listItems = section.items || section.content;
      if (!Array.isArray(listItems)) return null;
      
      // Check if it's a definition list (has term/definition) or simple list (strings)
      const isDefinitionList = listItems.length > 0 && typeof listItems[0] === 'object' && 'term' in listItems[0];
      
      if (isDefinitionList) {
        return (
          <dl className="space-y-3" aria-label={section.title || "Terms and definitions"}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {listItems.map((item: any, i: number) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">{item.term}</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">{item.definition}</dd>
              </div>
            ))}
          </dl>
        );
      }
      
      // Simple string list
      return (
        <ul className="space-y-2 ml-4" aria-label={section.title || "List"}>
          {(listItems as string[]).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <span className="text-primary-500 mt-1.5 text-sm" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      if (!section.headers || !section.rows) return null;
      return (
        <div className="overflow-x-auto" role="region" aria-label={section.title || "Data table"}>
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <caption className="sr-only">{section.title}</caption>
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {section.headers.map((header, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
              {section.rows.map((row, i) => (
                <tr key={i}>
                  {(Array.isArray(row) ? row : (row as any).values || []).map((cell: string, j: number) => (
                    <td key={j} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'summary':
      if (!Array.isArray(section.content)) return null;
      return (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
          <h4 className="font-semibold text-primary-900 dark:text-primary-100 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Key Takeaways
          </h4>
          <ul className="space-y-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(section.content as unknown as string[]).map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-primary-800 dark:text-primary-200">
                <span className="text-primary-400 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'callout': {
      // Support calloutType for different styling: important, tip, warning, info, exam-trap, memory-aid
      const calloutType = (section as any).calloutType || 'info';
      const calloutStyles: Record<string, { bg: string; border: string; text: string; icon: string }> = {
        important: { 
          bg: 'bg-amber-50 dark:bg-amber-900/20', 
          border: 'border-amber-200 dark:border-amber-800', 
          text: 'text-amber-800 dark:text-amber-200',
          icon: '⚡'
        },
        tip: { 
          bg: 'bg-green-50 dark:bg-green-900/20', 
          border: 'border-green-200 dark:border-green-800', 
          text: 'text-green-800 dark:text-green-200',
          icon: '💡'
        },
        warning: { 
          bg: 'bg-red-50 dark:bg-red-900/20', 
          border: 'border-red-200 dark:border-red-800', 
          text: 'text-red-800 dark:text-red-200',
          icon: '⚠️'
        },
        info: { 
          bg: 'bg-blue-50 dark:bg-blue-900/20', 
          border: 'border-blue-200 dark:border-blue-800', 
          text: 'text-blue-800 dark:text-blue-200',
          icon: '💭'
        },
        'exam-trap': { 
          bg: 'bg-red-50 dark:bg-red-900/20', 
          border: 'border-red-300 dark:border-red-700', 
          text: 'text-red-900 dark:text-red-100',
          icon: '🎯'
        },
        'memory-aid': { 
          bg: 'bg-primary-50 dark:bg-primary-900/20', 
          border: 'border-primary-200 dark:border-primary-800', 
          text: 'text-primary-800 dark:text-primary-200',
          icon: '🧠'
        },
      };
      const style = calloutStyles[calloutType] || calloutStyles.info;
      
      return (
        <div 
          className={`${style.bg} ${style.border} border rounded-xl p-4`}
          role="note"
          aria-label={`${calloutType} callout`}
        >
          <div className="flex gap-3">
             <span className="text-xl" aria-hidden="true">{style.icon}</span>
             <div className={`${style.text} whitespace-pre-line flex-1`}>
              {typeof section.content === 'string' 
                ? section.content.replace(/\*\*(.*?)\*\*/g, '$1')
                : String(section.content)
              }
             </div>
          </div>
        </div>
      );
    }

    case 'warning':
      return (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-amber-800 dark:text-amber-200 whitespace-pre-line">
              {typeof section.content === 'string' 
                ? section.content.replace(/\*\*(.*?)\*\*/g, '$1')
                : String(section.content)
              }
            </div>
          </div>
        </div>
      );

    case 'example':
      return (
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
            📝 Example
          </h4>
          <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line font-mono text-sm">
            {typeof section.content === 'string' ? section.content : String(section.content)}
          </div>
        </div>
      );

    default:
      return <p className="text-slate-600 dark:text-slate-300">{String(section.content)}</p>;
  }
};

// Markdown Content Renderer - for CFP and other courses using markdown format
interface MarkdownContentProps {
  markdown: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ markdown }) => {
  // Parse markdown and render as React elements
  const lines = markdown.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let tableRows: string[] | null = null;

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={key++} className="list-disc pl-6 space-y-2 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-300" 
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(
                    item
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded text-sm">$1</code>')
                  )
                }}
              />
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key++} className="list-decimal pl-6 space-y-2 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-300"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(
                    item
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded text-sm">$1</code>')
                  )
                }}
              />
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const renderTable = (rows: string[]): JSX.Element => {
    // Parse table: first row is headers, second is separator, rest are data
    const dataRows = rows.filter((_, i) => i !== 1); // Skip separator row
    const headers = dataRows[0]?.split('|').filter(c => c.trim()).map(c => c.trim()) || [];
    const bodyRows = dataRows.slice(1).map(row => 
      row.split('|').filter(c => c.trim()).map(c => c.trim())
    );

    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {bodyRows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(
                        cell
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      )
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const parseInlineMarkdown = (text: string): string => {
    return DOMPurify.sanitize(
      text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Table detection
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      if (!tableRows) tableRows = [];
      tableRows.push(line.trim());
      continue;
    } else if (tableRows && tableRows.length > 0) {
      elements.push(<React.Fragment key={key++}>{renderTable(tableRows)}</React.Fragment>);
      tableRows = null;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-5 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={key++} className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-4 mb-2">
          {line.slice(5)}
        </h4>
      );
    }
    // Bullet lists
    else if (line.match(/^[-*•]\s+/)) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.replace(/^[-*•]\s+/, ''));
    }
    // Numbered lists
    else if (line.match(/^\d+\.\s+/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(line.replace(/^\d+\.\s+/, ''));
    }
    // Horizontal rule
    else if (line.match(/^---+$/)) {
      flushList();
      elements.push(<hr key={key++} className="my-6 border-slate-200 dark:border-slate-700" />);
    }
    // Blockquote (also handle callouts)
    else if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={key++} className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-primary-50 dark:bg-primary-900/20 italic text-slate-700 dark:text-slate-300">
          <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line.slice(2)) }} />
        </blockquote>
      );
    }
    // Empty line
    else if (line.trim() === '') {
      flushList();
    }
    // Regular paragraph
    else if (line.trim()) {
      flushList();
      elements.push(
        <p key={key++} className="text-slate-700 dark:text-slate-300 my-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(line) }}
        />
      );
    }
  }

  // Flush any remaining content
  flushList();
  if (tableRows && tableRows.length > 0) {
    elements.push(<React.Fragment key={key++}>{renderTable(tableRows)}</React.Fragment>);
  }

  return <div className="prose prose-slate dark:prose-invert max-w-none">{elements}</div>;
};

const LessonViewer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeLesson, logActivity } = useStudy();
  const { userProfile } = useAuth();
  const { courseId } = useCourse();
  
  // Get section from URL or lesson ID to preserve navigation context
  const sectionFromUrl = searchParams.get('section');
  
  // Helper to get back URL - preserve section for PREP (Strategy & Tips) lessons
  const getBackUrl = (lessonSection?: string) => {
    const section = sectionFromUrl || lessonSection || (lessonId?.startsWith('PREP-') ? 'PREP' : null);
    if (section === 'PREP') {
      return '/lessons?section=PREP';
    }
    return '/lessons';
  };
  
  // Check if coming from daily plan
  const fromDailyPlan = searchParams.get('from') === 'dailyplan';
  const activityId = searchParams.get('activityId');
  const returnTo = searchParams.get('returnTo'); // For returning to practice questions

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [sectionLessons, setSectionLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPracticeQuestions, setHasPracticeQuestions] = useState<boolean>(false);

  // Use the lesson's actual section, not the user's profile section
  // This ensures PREP lessons stay within the PREP section
  const currentSection = (lesson?.section || userProfile?.examSection || getDefaultSection(courseId)) as ExamSection;
  
  // Cleanup TTS when navigating away from the lesson
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (lessonId) {
          const fetchedLesson = await fetchLessonById(lessonId);
          setLesson(fetchedLesson || undefined);
          
          // Use the lesson's actual section for navigation, not the user's profile section
          // This ensures PREP lessons navigate within PREP, not the user's exam section
          const section = fetchedLesson?.section || userProfile?.examSection || 'FAR';
          const lessons = await fetchLessonsBySection(section, courseId);
          setSectionLessons(lessons);

          // Check if practice questions exist for this lesson
          if (fetchedLesson) {
            const questions = await fetchQuestions({
              section: fetchedLesson.section,
              subtopic: fetchedLesson.topics?.[fetchedLesson.topics.length - 1],
              blueprintArea: fetchedLesson.blueprintArea,
              count: 1
            });
            setHasPracticeQuestions(questions.length > 0);
          }
        }
      } catch (error) {
        logger.error('Error fetching lesson:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [lessonId, userProfile?.examSection, courseId]);
  
  const currentIndex = lessonId ? sectionLessons.findIndex(l => l.id === lessonId) : -1;
  const prevLesson = currentIndex > 0 ? sectionLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < sectionLessons.length - 1 ? sectionLessons[currentIndex + 1] : null;

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(Math.min(100, scrollPercent));

      // Show completion prompt when user has read most of the lesson
      if (scrollPercent >= 90) {
        setIsComplete((prev) => (prev ? prev : true));
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    if (logActivity && lessonId) {
      logActivity({
        type: 'lesson_started',
        points: 0,
        details: { lessonId },
      });
    }

    // Stop TTS and scroll to top when lesson changes
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    window.scrollTo(0, 0);
    setProgress(0);
    setIsComplete(false);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lessonId, logActivity]);

  const handleComplete = async (goToNext: boolean = true) => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000); // minutes
    
    if (completeLesson && lessonId && lesson) {
      await completeLesson(lessonId, lesson.section || currentSection, timeSpent);
    }
    
    // If coming from daily plan, save completion to localStorage and return to home
    if (fromDailyPlan) {
      if (activityId) {
        // Save completion directly to localStorage
        const storageKey = `dailyplan_completed_${new Date().toISOString().split('T')[0]}`;
        try {
          const existing = localStorage.getItem(storageKey);
          const completed = existing ? JSON.parse(existing) : [];
          if (!completed.includes(activityId)) {
            completed.push(activityId);
            localStorage.setItem(storageKey, JSON.stringify(completed));
          }
        } catch (e) {
          logger.error('Failed to save daily plan completion:', e);
        }
      }
      
      // Navigate back with completion signal for DailyPlanCard
      const params = new URLSearchParams();
      params.set('from', 'dailyplan');
      if (activityId) params.set('activityId', activityId);
      params.set('completed', 'true');
      navigate(`/home?${params.toString()}`);
      return;
    }
    
    if (goToNext && nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    } else {
      navigate('/lessons');
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading lesson...</p>
        </div>
      </div>
    );
  }

  // Handle lesson not found
  if (!lesson) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Lesson Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            The lesson you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link to={getBackUrl()} className="btn-primary">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(returnTo || (fromDailyPlan ? '/home' : getBackUrl(lesson?.section)))}
              leftIcon={ArrowLeft}
              className="text-slate-600 dark:text-slate-300"
            >
              <span className="hidden sm:inline">{returnTo ? 'Back to Practice' : fromDailyPlan ? 'Back to Daily Plan' : 'Back to Lessons'}</span>
            </Button>

            <div className="flex items-center gap-2">
              <BookmarkButton 
                itemId={lessonId || ''} 
                itemType="lesson" 
                itemData={{ 
                  title: lesson?.title,
                  section: lesson?.section,
                }}
                size="md"
              />
              <NotesButton 
                itemId={lessonId || ''}
                itemData={{
                  section: lesson?.section,
                  title: lesson?.title,
                }}
                size="md"
              />
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (navigator.share && lesson) {
                    navigator.share({
                      title: lesson.title,
                      text: `Check out this CPA lesson: ${lesson.title}`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    // Fallback: copy link to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                aria-label="Share lesson"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if ('speechSynthesis' in window && lesson) {
                    if (isPlaying) {
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                    } else {
                      // Build complete lesson text starting from title
                      const textParts: string[] = [];
                      
                      // Start with title and description
                      textParts.push(lesson.title);
                      if (lesson.description) {
                        textParts.push(lesson.description);
                      }
                      
                      // Get text from all readable sections
                      lesson.content.sections.forEach(section => {
                        if (section.title) {
                          textParts.push(section.title);
                        }
                        
                        if (typeof section.content === 'string') {
                          textParts.push(section.content);
                        } else if (Array.isArray(section.content)) {
                          // Handle list content (strings or definition items)
                          section.content.forEach(item => {
                            if (typeof item === 'string') {
                              textParts.push(item);
                            } else if (item && typeof item === 'object' && 'term' in item) {
                              textParts.push(`${item.term}: ${item.definition}`);
                            }
                          });
                        }
                        
                        // Handle items array for lists
                        if (section.items && Array.isArray(section.items)) {
                          section.items.forEach(item => {
                            if (typeof item === 'string') {
                              textParts.push(item);
                            }
                          });
                        }
                      });
                      
                      const rawText = textParts.join('. ');
                      
                      // Clean text for natural speech
                      const cleanedText = cleanTextForSpeech(rawText);
                      
                      const utterance = new SpeechSynthesisUtterance(cleanedText);
                      
                      // Get a natural-sounding voice
                      const voice = getBestVoice();
                      if (voice) {
                        utterance.voice = voice;
                      }
                      
                      // Natural speech settings
                      utterance.rate = 0.95; // Slightly slower than default
                      utterance.pitch = 1.0;
                      
                      utterance.onend = () => setIsPlaying(false);
                      utterance.onerror = () => setIsPlaying(false);
                      
                      window.speechSynthesis.speak(utterance);
                      setIsPlaying(true);
                    }
                  }
                }}
                className={clsx(
                  isPlaying && 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                )}
                aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
                title={isPlaying ? 'Stop reading' : 'Read lesson aloud'}
              >
                {isPlaying ? <Pause className="w-5 h-5" aria-hidden="true" /> : <Volume2 className="w-5 h-5" aria-hidden="true" />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-28 md:pb-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{lesson.section}</span>
            {lesson.difficulty && (
              <>
                <span className="text-slate-300 dark:text-slate-500">•</span>
                <span className={clsx(
                  'px-2 py-0.5 rounded text-xs font-medium',
                  lesson.difficulty === 'beginner' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                  lesson.difficulty === 'intermediate' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                  lesson.difficulty === 'advanced' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                )}>
                  {lesson.difficulty}
                </span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{lesson.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lesson.duration} min read
            </span>
            {lesson.topics && lesson.topics.length > 0 && (
              <span className="flex items-center gap-1">
                <List className="w-4 h-4" />
                {lesson.topics.length} topics
              </span>
            )}
          </div>
        </div>

        {/* Topics Tags */}
        {lesson.topics && lesson.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {lesson.topics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Lesson Content - Markdown format (CFP, CIA, etc.) */}
        {(lesson.content as any)?.markdown && (
          <div className="mb-12">
            <MarkdownContent markdown={(lesson.content as any).markdown} />
          </div>
        )}

        {/* Lesson Content Sections - structured format (CPA, etc.) */}
        {lesson.content?.sections && lesson.content.sections.length > 0 && (
          <div className="space-y-8 mb-12">
            {lesson.content.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                  {section.type === 'list' && <List className="w-5 h-5 text-primary-500" />}
                  {section.type === 'table' && <Table className="w-5 h-5 text-primary-500" />}
                  {section.type === 'text' && <FileText className="w-5 h-5 text-primary-500" />}
                  {section.type === 'summary' && <CheckCircle className="w-5 h-5 text-primary-500" />}
                  {section.title}
                </h2>
                <ContentSection section={section as LessonContentSection} />
              </div>
            ))}
          </div>
        )}

        {/* Quiz Section if available - not shown for PREP (Strategy & Tips) lessons */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {lesson.section !== 'PREP' && (lesson.content as any).quiz && (lesson.content as any).quiz.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              Quick Check ({(lesson.content as any).quiz.length} questions)
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Test your understanding of this lesson before moving on.
            </p>
            <Link
              to={`/practice?lesson=${lessonId}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Start Quiz
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Hide practice questions for PREP (Strategy & Tips) lessons */}
          {lesson.section !== 'PREP' && hasPracticeQuestions && (
            <Link
              to={`/practice?section=${lesson.section}${lesson.topics?.[lesson.topics.length - 1] ? `&subtopic=${encodeURIComponent(lesson.topics[lesson.topics.length - 1])}` : lesson.blueprintArea ? `&blueprintArea=${lesson.blueprintArea}` : ''}`}
              className="card p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-success-600 dark:group-hover:text-success-400">
                    Practice Questions
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Test your knowledge on this topic
                  </p>
                </div>
              </div>
            </Link>
          )}

          <Link 
            to={`/ai-tutor?returnTo=${encodeURIComponent(`/lessons/${lesson.id}`)}`}
            state={{ 
              lessonTitle: lesson.title, 
              lessonId: lesson.id,
              section: lesson.section,
              topic: lesson.topics?.[lesson.topics.length - 1],
              returnTo: `/lessons/${lesson.id}`
            }}
            className="card p-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  Ask Vory
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Get help understanding this topic</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Spacer for fixed bottom bar + mobile nav */}
        <div className="h-40 md:h-28" />
      </div>

      {/* Unified Bottom Navigation Bar - positioned above mobile nav, aligned with content pane on desktop */}
      <div className="fixed bottom-14 md:bottom-0 left-0 md:left-64 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 z-40 pb-safe md:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Mobile Layout */}
          <div className="md:hidden flex items-center gap-2">
            {/* Previous */}
            {prevLesson ? (
              <Link
                to={`/lessons/${prevLesson.id}`}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0"
                aria-label="Previous lesson"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            ) : (
              <Button
                variant="secondary"
                onClick={() => navigate(fromDailyPlan ? '/home' : '/lessons')}
                className="shrink-0"
              >
                Exit
              </Button>
            )}
            
            {/* Primary CTA */}
            <Button
              variant="primary"
              fullWidth
              onClick={() => handleComplete(fromDailyPlan ? false : (nextLesson ? true : false))}
              leftIcon={isComplete ? CheckCircle : undefined}
              rightIcon={!fromDailyPlan && nextLesson ? ChevronRight : undefined}
              className="shadow-lg shadow-primary-600/20"
            >
              <span className="truncate">
                {fromDailyPlan ? 'Complete & Return' : (nextLesson ? 'Complete & Continue' : 'Complete')}
              </span>
            </Button>
            
            {/* Next (skip) */}
            {nextLesson && !fromDailyPlan ? (
              <Link
                to={`/lessons/${nextLesson.id}`}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0"
                aria-label="Skip to next lesson"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : !prevLesson ? (
              <div className="w-12" /> /* Spacer for balance when no next */
            ) : null}
          </div>

          {/* Desktop Layout - All controls in one row */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {/* Left: Previous lesson or Exit */}
            <div className="flex-1 flex items-center">
              {prevLesson ? (
                <Link
                  to={`/lessons/${prevLesson.id}`}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs text-slate-600 dark:text-slate-400">Previous</div>
                    <div className="font-medium truncate max-w-[200px]">{prevLesson.title}</div>
                  </div>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate(fromDailyPlan ? '/home' : getBackUrl(lesson?.section))}
                  leftIcon={ArrowLeft}
                >
                  Exit to Lessons
                </Button>
              )}
            </div>
            
            {/* Center: Primary Action */}
            <Button
              variant="primary"
              onClick={() => handleComplete(fromDailyPlan ? false : (nextLesson ? true : false))}
              leftIcon={isComplete ? CheckCircle : undefined}
              rightIcon={!fromDailyPlan && nextLesson ? ChevronRight : undefined}
              className="shadow-lg shadow-primary-600/20"
            >
              {fromDailyPlan ? 'Complete & Return to Plan' : (nextLesson ? 'Complete & Continue' : 'Complete Lesson')}
            </Button>
            
            {/* Right: Next lesson */}
            <div className="flex-1 flex items-center justify-end">
              {nextLesson ? (
                <Link
                  to={`/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 text-right transition-colors group"
                >
                  <div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Next</div>
                    <div className="font-medium truncate max-w-[200px]">{nextLesson.title}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => navigate(fromDailyPlan ? '/home' : getBackUrl(lesson?.section))}
                  rightIcon={ArrowLeft}
                  className="[&>svg:last-child]:rotate-180"
                >
                  Back to Lessons
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
