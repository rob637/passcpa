import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Bookmark,
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
import { getLessonById, getLessonsBySection } from '../../data/lessons';
import clsx from 'clsx';
import { LessonContentSection, ExamSection } from '../../types';

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
          <div className="space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {listItems.map((item: any, i: number) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">{item.term}</dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-400">{item.definition}</dd>
              </div>
            ))}
          </div>
        );
      }
      
      // Simple string list
      return (
        <ul className="space-y-2 ml-4">
          {listItems.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <span className="text-primary-500 mt-1.5 text-sm">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      if (!section.headers || !section.rows) return null;
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
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
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
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
            {section.content.map((point: string, i: number) => (
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
          bg: 'bg-purple-50 dark:bg-purple-900/20', 
          border: 'border-purple-200 dark:border-purple-800', 
          text: 'text-purple-800 dark:text-purple-200',
          icon: '🧠'
        },
      };
      const style = calloutStyles[calloutType] || calloutStyles.info;
      
      return (
        <div className={`${style.bg} ${style.border} border rounded-xl p-4`}>
          <div className={`${style.text} whitespace-pre-line`}>
            {typeof section.content === 'string' 
              ? section.content.replace(/\*\*(.*?)\*\*/g, '$1') // Strip markdown bold for now
              : String(section.content)
            }
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
      return <p className="text-slate-600 dark:text-slate-400">{String(section.content)}</p>;
  }
};

const LessonViewer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson, logActivity } = useStudy();
  const { userProfile } = useAuth();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Get lesson from real data
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  
  // Get prev/next lessons
  const currentSection = (userProfile?.examSection || lesson?.section || 'FAR') as ExamSection;
  const sectionLessons = getLessonsBySection(currentSection);
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

    // Scroll to top when lesson changes
    window.scrollTo(0, 0);
    setProgress(0);
    setIsComplete(false);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lessonId, logActivity]);

  const handleComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000); // minutes
    
    if (completeLesson && lessonId && lesson) {
      await completeLesson(lessonId, lesson.section || currentSection, timeSpent);
    }
    
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    } else {
      navigate('/lessons');
    }
  };

  // Handle lesson not found
  if (!lesson) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Lesson Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            The lesson you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link to="/lessons" className="btn-primary">
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
            <Link
              to="/lessons"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Lessons</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  isBookmarked ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Bookmark className="w-5 h-5" />
              </button>
              <button 
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
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Share lesson"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if ('speechSynthesis' in window && lesson) {
                    if (isPlaying) {
                      window.speechSynthesis.cancel();
                      setIsPlaying(false);
                    } else {
                      const text = lesson.content.sections
                        .filter(s => s.type === 'text' && typeof s.content === 'string')
                        .map(s => s.content)
                        .join('. ');
                      const utterance = new SpeechSynthesisUtterance(text);
                      utterance.onend = () => setIsPlaying(false);
                      window.speechSynthesis.speak(utterance);
                      setIsPlaying(true);
                    }
                  }
                }}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  isPlaying
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
                aria-label={isPlaying ? 'Stop reading' : 'Read aloud'}
                title={isPlaying ? 'Stop reading' : 'Read lesson aloud'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{lesson.section}</span>
            {lesson.difficulty && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
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
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{lesson.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Lesson Content Sections */}
        {lesson.content?.sections && (
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

        {/* Quiz Section if available */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(lesson.content as any).quiz && (lesson.content as any).quiz.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              Quick Check ({(lesson.content as any).quiz.length} questions)
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
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
          <Link
            to={`/practice?section=${lesson.section}`}
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
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Test your knowledge
                </p>
              </div>
            </div>
          </Link>

          <Link to="/ai-tutor" className="card p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  Ask AI Tutor
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Get help understanding this topic</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
          {prevLesson ? (
            <Link
              to={`/lessons/${prevLesson.id}`}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs text-slate-400 dark:text-slate-500">Previous</div>
                <div className="font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 text-right"
            >
              <div>
                <div className="text-xs text-slate-400 dark:text-slate-500">Next</div>
                <div className="font-medium">{nextLesson.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isComplete && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-lg p-4 z-30">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
              </div>
              <div>
                <div className="font-medium text-slate-900 dark:text-slate-100">Lesson Complete!</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">+10 points earned</div>
              </div>
            </div>
            <button onClick={handleComplete} className="btn-primary">
              {nextLesson ? 'Continue to Next' : 'Back to Lessons'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
