import React, { useState, useRef, useEffect, useCallback } from 'react';
import logger from '../../utils/logger';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  Send,
  User,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Target,
  Brain,
  Trash2,
  Copy,
  Check,
  TrendingUp,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useStudy } from '../../hooks/useStudy';
import { useCourse } from '../../providers/CourseProvider';
import { CPA_SECTIONS } from '../../config/examConfig';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { generateAIResponse } from '../../services/aiService';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date | Timestamp;
  error?: boolean;
}

interface WeakArea {
  id: string;
  name: string;
  accuracy: number;
}

interface UserProfile {
  examSection?: string;
  displayName?: string;
}

interface SmartPrompt {
  icon: LucideIcon;
  text: string;
  category: string;
  topics: string[];
  priority?: boolean;
}

interface TutorMode {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  color: 'primary' | 'success' | 'warning';
}

// AI Tutor Modes
const TUTOR_MODES: Record<string, TutorMode> = {
  explain: {
    id: 'explain',
    label: 'Explain',
    icon: BookOpen,
    description: 'Get clear explanations',
    color: 'primary',
  },
  socratic: {
    id: 'socratic',
    label: 'Guide Me',
    icon: Brain,
    description: 'Learn by thinking',
    color: 'success',
  },
  quiz: {
    id: 'quiz',
    label: 'Quiz Me',
    icon: Target,
    description: 'Test your knowledge',
    color: 'warning',
  },
};

// Smart prompts based on user's weak areas
const getSmartPrompts = (weakAreas: WeakArea[] = [], section: string = 'REG'): SmartPrompt[] => {
  const basePrompts: SmartPrompt[] = [
    {
      icon: HelpCircle,
      text: "What's the difference between a finance lease and an operating lease?",
      category: 'Concept',
      topics: ['far-leases'],
    },
    {
      icon: Lightbulb,
      text: 'Give me a mnemonic for remembering the S-Corp requirements',
      category: 'Memory Tip',
      topics: ['reg-business-tax'],
    },
    {
      icon: Target,
      text: 'Walk me through calculating adjusted basis in a partnership',
      category: 'Step-by-Step',
      topics: ['reg-business-tax'],
    },
    {
      icon: TrendingUp,
      text: 'What are the most tested topics on the ' + section + ' exam?',
      category: 'High-Yield',
      topics: [],
    },
  ];

  // Add weak area prompt if available
  if (weakAreas.length > 0) {
    const weakTopic = weakAreas[0];
    basePrompts.unshift({
      icon: Zap,
      text: `Help me understand ${weakTopic.name} better - I keep getting questions wrong`,
      category: 'Weak Area',
      topics: [weakTopic.id],
      priority: true,
    });
  }

  return basePrompts.slice(0, 4);
};

// Format message content with XSS protection and markdown rendering
const formatMessage = (content: string) => {
  // Guard against non-string content
  if (typeof content !== 'string') {
    return '';
  }
  
  // Process markdown tables first (before other formatting)
  let formatted = content;
  
  // Match markdown tables and convert to HTML
  const tableRegex = /\|(.+)\|\n\|[-:|\s]+\|\n((?:\|.+\|\n?)+)/g;
  formatted = formatted.replace(tableRegex, (_match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').map((h: string) => h.trim()).filter(Boolean);
    const rows = bodyRows.trim().split('\n').map((row: string) => 
      row.split('|').map((cell: string) => cell.trim()).filter(Boolean)
    );
    
    let table = '<table class="ai-table">';
    table += '<thead><tr>' + headers.map((h: string) => `<th>${h}</th>`).join('') + '</tr></thead>';
    table += '<tbody>';
    rows.forEach((row: string[]) => {
      table += '<tr>' + row.map((cell: string) => `<td>${cell}</td>`).join('') + '</tr>';
    });
    table += '</tbody></table>';
    return table;
  });
  
  // Handle headers (####, ###, ##)
  formatted = formatted
    .replace(/^#### (.+)$/gm, '<h4 class="ai-h4">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="ai-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="ai-h2">$1</h2>');
  
  // Handle other markdown
  formatted = formatted
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="ai-code">$1</code>')
    .replace(/\n/g, '<br>')
    .replace(/• /g, '&bull; ');
  
  // Sanitize to prevent XSS attacks
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'br', 'span', 'p', 'ul', 'ol', 'li', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'h2', 'h3', 'h4'],
    ALLOWED_ATTR: ['class'],
  });
};

const AITutor: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { weeklyStats } = useStudy();
  const { courseId } = useCourse();
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tutorMode, setTutorMode] = useState<string>('explain');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([]);
  const [memoryLoaded, setMemoryLoaded] = useState(false);
  const [contextFromPractice, setContextFromPractice] = useState<string | null>(null);
  const [returnTo, setReturnTo] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Safely cast userProfile
  const profile = userProfile as UserProfile | null;
  const currentSection = profile?.examSection || 'REG';
  const sectionInfo = CPA_SECTIONS[currentSection as keyof typeof CPA_SECTIONS];

  // Check for context passed from Practice page (via state or URL params)
  useEffect(() => {
    // Check location.state first (same-tab navigation)
    if (location.state?.returnTo) {
      setReturnTo(location.state.returnTo);
    }
    
    if (location.state?.context) {
      setContextFromPractice(location.state.context);
      // Clear the state so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
      return;
    }
    
    // Check URL params (new tab / window.open)
    const params = new URLSearchParams(location.search);
    const contextParam = params.get('context');
    const returnToParam = params.get('returnTo');
    
    if (returnToParam) {
      setReturnTo(returnToParam);
    }
    
    if (contextParam) {
      setContextFromPractice(decodeURIComponent(contextParam));
      // Clean URL but keep returnTo info in state
      window.history.replaceState({ returnTo: returnToParam }, document.title, '/ai-tutor');
    }
  }, [location.state, location.search]);

  // Load user's weak areas and conversation history
  useEffect(() => {
    if (!user?.uid) return;

    const loadMemory = async () => {
      try {
        // Load weak areas from progress
        const progressRef = doc(db, 'users', user.uid, 'progress', 'topics');
        const progressSnap = await getDoc(progressRef);

        if (progressSnap.exists()) {
          const data = progressSnap.data();
          const weak = Object.entries(data)
            .filter(([_, v]: [string, any]) => v.attempted >= 3 && v.correct / v.attempted < 0.7)
            .sort((a: [string, any], b: [string, any]) => a[1].correct / a[1].attempted - b[1].correct / b[1].attempted)
            .slice(0, 3)
            .map(([id, v]: [string, any]) => ({
              id,
              name: v.name || id,
              accuracy: Math.round((v.correct / v.attempted) * 100),
            }));
          setWeakAreas(weak);
        }

        // Don't restore old conversations - start fresh each time
        // This keeps Vory focused on the current study topic
        setMemoryLoaded(true);
      } catch (error) {
        logger.error('Error loading AI memory:', error);
        setMemoryLoaded(true);
      }
    };

    loadMemory();
  }, [user?.uid]);

  // Build personalized greeting
  const buildGreeting = useCallback(() => {
    const p = userProfile as UserProfile | null;
    const firstName = p?.displayName?.split(' ')[0] || 'there';
    
    // Check for context from navigation (e.g. from LessonViewer)
    const state = location.state as { lessonTitle?: string; section?: string; topic?: string } | null;
    
    if (state?.lessonTitle) {
      return `Hi ${firstName}! I see you're studying **${state.lessonTitle}**.\n\nI can help you understand this topic better. Would you like a **summary**, want me to **quiz you** on it, or help you **solve a specific problem**?`;
    }

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    let message = `${greeting}, ${firstName}! I'm **Vory**, your AI study companion for **${sectionInfo?.shortName || 'the CPA exam'}**. 🎓\n\n`;

    // Add context about weak areas
    if (weakAreas.length > 0) {
      message += `I noticed you're working on improving in **${weakAreas[0].name}** (${weakAreas[0].accuracy}% accuracy). I can help you strengthen that!\n\n`;
    }

    // Add context about study stats
    if (weeklyStats && weeklyStats.totalQuestions > 0) {
      message += `You've answered **${weeklyStats.totalQuestions} questions** this week with ${weeklyStats.accuracy}% accuracy. `;
      if (weeklyStats.accuracy >= 75) {
        message += `Great progress! 💪\n\n`;
      } else {
        message += `Let's work on getting that higher!\n\n`;
      }
    }

    message += `**Choose how you'd like to learn:**\n• **Explain** - I'll give you clear, complete explanations\n• **Guide Me** - I'll ask questions to help you think through problems (Socratic method)\n• **Quiz Me** - I'll test your knowledge with questions\n\nWhat would you like to explore?`;

    return message;
  }, [userProfile, sectionInfo?.shortName, weakAreas, weeklyStats, location.state]);

  // Show greeting after memory loads
  useEffect(() => {
    if (!memoryLoaded || messages.length > 0) return;

    const greeting = buildGreeting();
    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: greeting,
        timestamp: new Date(),
      },
    ]);
  }, [memoryLoaded, messages.length, buildGreeting]);

  // Generate a title from the conversation based on first user message
  const generateConversationTitle = (messages: Message[]): string => {
    // Find the first user message (skip greeting/system messages)
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (!firstUserMessage) return 'New Conversation';
    
    let title = firstUserMessage.content;
    
    // Remove markdown formatting
    title = title.replace(/\*\*/g, '').replace(/\*/g, '');
    
    // Clean up and truncate to a reasonable length
    title = title.trim();
    
    // Truncate at sentence end if possible, otherwise at word boundary
    const maxLength = 50;
    if (title.length > maxLength) {
      // Try to find a sentence end within the limit
      const sentenceEnd = title.substring(0, maxLength).lastIndexOf('.');
      const questionEnd = title.substring(0, maxLength).lastIndexOf('?');
      const breakPoint = Math.max(sentenceEnd, questionEnd);
      
      if (breakPoint > 20) {
        title = title.substring(0, breakPoint + 1);
      } else {
        // Fall back to word boundary
        const lastSpace = title.substring(0, maxLength).lastIndexOf(' ');
        title = title.substring(0, lastSpace > 20 ? lastSpace : maxLength) + '...';
      }
    }
    
    return title || 'New Conversation';
  };

  // Save conversation to Firestore
  const saveConversation = useCallback(
    async (newMessages: Message[]) => {
      if (!user?.uid || newMessages.length <= 1) return;

      try {
        // Generate title from conversation content
        const title = generateConversationTitle(newMessages);
        
        const convData = {
          messages: newMessages.map((m) => ({
            ...m,
            timestamp: m.timestamp instanceof Date ? m.timestamp : new Date(),
          })),
          title,
          section: currentSection,
          mode: tutorMode,
          updatedAt: new Date(),
        };

        if (conversationId) {
          await setDoc(doc(db, 'users', user.uid, 'conversations', conversationId), convData);
        } else {
          const newConvRef = await addDoc(collection(db, 'users', user.uid, 'conversations'), {
            ...convData,
            createdAt: new Date(),
          });
          setConversationId(newConvRef.id);
        }
      } catch (error) {
        logger.error('Error saving conversation:', error);
      }
    },
    [user?.uid, conversationId, currentSection, tutorMode]
  );

  // Send message with direct context (for auto-send)
  const handleSendWithContext = useCallback(async (contextMessage: string) => {
    if (!contextMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: contextMessage.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Adjusted generic usage since aiService expects separate args now.
      // previous incorrect call: generateAIResponse(contextMessage.trim(), { mode, section... })
      const response = await generateAIResponse(
        contextMessage.trim(),
        tutorMode,
        weakAreas,
        currentSection,
        newMessages.map(m => ({ 
            role: m.role, 
            content: m.content 
        })) as any, // Casting because types in aiService might differ slightly from local Message
        courseId
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveConversation(updatedMessages);
    } catch (error) {
      logger.error('AI response error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "I'm sorry, I had trouble processing that. Could you try rephrasing your question?",
          timestamp: new Date(),
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, tutorMode, currentSection, weakAreas, conversationId, user?.uid, saveConversation]);

  // Auto-send context from Practice page if present
  useEffect(() => {
    if (contextFromPractice && memoryLoaded && messages.length > 0 && !isLoading) {
      // Auto-submit the question from practice
      setInput(contextFromPractice);
      setContextFromPractice(null);
      // Small delay to let UI update, then send
      setTimeout(() => {
        handleSendWithContext(contextFromPractice);
      }, 500);
    }
  }, [contextFromPractice, memoryLoaded, messages.length, isLoading, handleSendWithContext]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Call real AI service
      const aiResponse = await generateAIResponse(
        input.trim(),
        tutorMode,
        weakAreas,
        currentSection,
        messages.map(m => ({ 
            role: m.role, 
            content: m.content 
        })) as any,
        courseId
      );

      const finalMessages: Message[] = [
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        },
      ];
      setMessages(finalMessages);
      saveConversation(finalMessages);
    } catch (error) {
      logger.error('AI response error:', error);
      const errorMessages: Message[] = [
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ];
      setMessages(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setConversationId(null);
    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: `Fresh start! ${buildGreeting().split('\n\n').slice(1).join('\n\n')}`,
        timestamp: new Date(),
      },
    ]);
  };

  const smartPrompts = getSmartPrompts(weakAreas, currentSection);

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] pb-16 md:pb-0 flex flex-col bg-slate-50 dark:bg-slate-900 page-enter">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(returnTo || '/home')}
                className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white">Vory</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">Your AI Study Companion</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearChat}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="New conversation"
              aria-label="Clear chat and start new conversation"
            >
              <Trash2 className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2">
            {Object.values(TUTOR_MODES).map((mode) => {
              const Icon = mode.icon;
              const isActive = tutorMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setTutorMode(mode.id)}
                  className={clsx(
                    'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? mode.color === 'primary'
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                        : mode.color === 'success'
                          ? 'bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-300'
                          : 'bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={clsx(
                'flex gap-3 stagger-item',
                message.role === 'user' && 'flex-row-reverse'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div
                className={clsx(
                  'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft',
                  message.role === 'assistant'
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                    : 'bg-slate-700'
                )}
              >
                {message.role === 'assistant' ? (
                  <Sparkles className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={clsx(
                  'flex-1 max-w-[85%]',
                  message.role === 'user' && 'flex flex-col items-end'
                )}
              >
                <div
                  className={clsx(
                    'px-4 py-3 rounded-2xl',
                    message.role === 'assistant'
                      ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-md shadow-soft'
                      : 'bg-primary-600 rounded-tr-md'
                  )}
                >
                  <div
                    className={clsx(
                      message.role === 'assistant' 
                        ? 'prose prose-sm max-w-none text-slate-700 dark:text-slate-100' 
                        : 'text-white text-sm'
                    )}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(message.content),
                    }}
                  />
                </div>

                {/* Copy action for assistant messages */}
                {message.role === 'assistant' && message.id !== 'greeting' && (
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 mt-1.5 ml-1"
                  >
                    {copiedId === message.id ? (
                      <>
                        <Check className="w-3 h-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-soft">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-md shadow-soft">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Smart Prompts - Show at start */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="flex md:grid md:grid-cols-2 gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
              {smartPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt.text)}
                    className={clsx(
                      'flex items-start gap-2 p-2.5 md:p-3 bg-white dark:bg-slate-800 border rounded-xl transition-all text-left flex-shrink-0 w-[200px] md:w-auto',
                      prompt.priority
                        ? 'border-warning-200 dark:border-warning-800 hover:border-warning-400 hover:bg-warning-50 dark:hover:bg-warning-900/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 shadow-sm'
                    )}
                  >
                    <div
                      className={clsx(
                        'w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                        prompt.priority ? 'bg-warning-100 dark:bg-warning-900/40' : 'bg-primary-100 dark:bg-primary-900/40'
                      )}
                    >
                      <Icon
                        className={clsx(
                          'w-3.5 h-3.5 md:w-4 md:h-4',
                          prompt.priority ? 'text-warning-600 dark:text-warning-400' : 'text-primary-600 dark:text-primary-400'
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={clsx(
                          'text-[10px] md:text-xs font-medium',
                          prompt.priority ? 'text-warning-600 dark:text-warning-400' : 'text-primary-600 dark:text-primary-400'
                        )}
                      >
                        {prompt.category}
                      </span>
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-0.5 line-clamp-2">{prompt.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-3 md:p-4 flex-shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={
                  tutorMode === 'socratic'
                    ? "Describe what you're trying to understand..."
                    : tutorMode === 'quiz'
                      ? 'Tell me a topic to quiz you on...'
                      : 'Ask anything about the CPA exam...'
                }
                className="input resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={clsx(
                'btn-icon rounded-xl transition-all flex-shrink-0',
                input.trim() && !isLoading
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-not-allowed'
              )}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-2 text-center">
            AI responses are for educational purposes only. Verify important information with authoritative sources.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AITutor;
