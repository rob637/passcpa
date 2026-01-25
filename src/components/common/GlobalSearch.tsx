import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  X,
  BookOpen,
  HelpCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Loader2,
  LucideIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import clsx from 'clsx';
// import { Question, Lesson } from '../../types';

interface SearchResultType {
  icon: LucideIcon;
  color: string;
  label: string;
}

const RESULT_TYPES: Record<string, SearchResultType> = {
  question: { icon: HelpCircle, color: 'primary', label: 'Question' },
  lesson: { icon: BookOpen, color: 'success', label: 'Lesson' },
  topic: { icon: FileText, color: 'warning', label: 'Topic' },
  ai: { icon: Sparkles, color: 'slate', label: 'Ask AI' },
};

interface SearchResult {
  id: string;
  type: 'question' | 'lesson' | 'topic' | 'ai';
  title: string;
  subtitle?: string;
  path?: string;
  data?: any;
}

interface RecentSearch {
  query: string;
  type: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSection = userProfile?.examSection || 'REG';

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search function
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchLower = searchQuery.toLowerCase();
        const searchResults: SearchResult[] = [];

        // Search questions
        const questionsSnap = await getDocs(
          query(collection(db, 'questions'), where('section', '==', currentSection), limit(50))
        );

        questionsSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (
            data.question?.toLowerCase().includes(searchLower) ||
            data.topic?.toLowerCase().includes(searchLower)
          ) {
            searchResults.push({
              id: doc.id,
              type: 'question',
              title: data.question?.slice(0, 100) + (data.question?.length > 100 ? '...' : ''),
              subtitle: data.topic,
              data: { id: doc.id, ...data },
            });
          }
        });

        // Add AI suggestion
        searchResults.push({
          id: 'ai-' + searchQuery,
          type: 'ai',
          title: `Ask AI: "${searchQuery}"`,
          subtitle: 'Get an explanation from AI Tutor',
          data: { query: searchQuery },
        });

        setResults(searchResults.slice(0, 10));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, currentSection]);

  const handleSelect = (result: SearchResult) => {
    // Save to recent searches
    const newRecent: RecentSearch[] = [
      { query: searchQuery, type: result.type },
      ...recentSearches.filter((r) => r.query !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));

    // Navigate based on type
    switch (result.type) {
      case 'question':
        navigate(`/practice?question=${result.id}`);
        break;
      case 'lesson':
        navigate(`/lessons/${result.id}`);
        break;
      case 'topic':
        navigate(`/practice?topic=${result.data.id}`);
        break;
      case 'ai':
        navigate(`/tutor?q=${encodeURIComponent(result.data.query)}`);
        break;
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Search Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, topics, or ask AI..."
              className="flex-1 text-lg outline-none placeholder:text-slate-400"
            />
            {loading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />}
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => {
                  const typeInfo = RESULT_TYPES[result.type];
                  const Icon = typeInfo.icon;

                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-50 text-left transition-colors"
                    >
                      <div
                        className={clsx(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          typeInfo.color === 'primary' && 'bg-primary-100 text-primary-600',
                          typeInfo.color === 'success' && 'bg-success-100 text-success-600',
                          typeInfo.color === 'warning' && 'bg-warning-100 text-warning-600',
                          typeInfo.color === 'slate' && 'bg-slate-100 text-slate-600'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 truncate">{result.title}</div>
                        <div className="text-sm text-slate-500 truncate">{result.subtitle}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 mt-3" />
                    </button>
                  );
                })}
              </div>
            ) : searchQuery.length >= 2 && !loading ? (
              <div className="py-8 text-center text-slate-500">
                No results found for "{searchQuery}"
              </div>
            ) : recentSearches.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-slate-400 uppercase">
                  Recent Searches
                </div>
                {recentSearches.map((recent, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(recent.query)}
                    className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 text-left"
                  >
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{recent.query}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400">Start typing to search...</div>
            )}
          </div>

          {/* Keyboard hints */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↵</kbd> to select
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white rounded border">esc</kbd> to close
              </span>
            </div>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white rounded border">⌘K</kbd> to open
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
