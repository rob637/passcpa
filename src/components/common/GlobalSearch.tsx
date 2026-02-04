import { useState, useEffect, useRef, useCallback } from 'react';
import logger from '../../utils/logger';
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
  Filter,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { collection, query as firestoreQuery, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import clsx from 'clsx';
import type { Question, ExamSection } from '../../types';

// Lazy load questions only when search is actually used
let cachedQuestions: Question[] | null = null;
const loadQuestions = async (): Promise<Question[]> => {
  if (cachedQuestions) return cachedQuestions;
  const { ALL_QUESTIONS } = await import('../../data/questions');
  cachedQuestions = ALL_QUESTIONS;
  return ALL_QUESTIONS;
};

// ============================================================================
// Types
// ============================================================================

interface SearchResultType {
  icon: LucideIcon;
  color: string;
  label: string;
}

const RESULT_TYPES: Record<string, SearchResultType> = {
  question: { icon: HelpCircle, color: 'primary', label: 'Question' },
  lesson: { icon: BookOpen, color: 'success', label: 'Lesson' },
  topic: { icon: FileText, color: 'warning', label: 'Topic' },
  ai: { icon: Sparkles, color: 'slate', label: 'Ask Vory' },
};

const SECTIONS: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

interface SearchResult {
  id: string;
  type: 'question' | 'lesson' | 'topic' | 'ai';
  title: string;
  subtitle?: string;
  path?: string;
  data?: any;
  score?: number; // Relevance score for sorting
}

interface RecentSearch {
  query: string;
  type: string;
}

interface SearchFilters {
  section: ExamSection | 'all';
  type: 'all' | 'question' | 'lesson' | 'topic';
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// Search Utilities
// ============================================================================

/**
 * Calculate relevance score for search results
 */
function calculateRelevanceScore(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Exact match
  if (lowerText === lowerQuery) return 100;
  
  // Starts with query
  if (lowerText.startsWith(lowerQuery)) return 80;
  
  // Contains query as whole word
  if (new RegExp(`\\b${lowerQuery}\\b`).test(lowerText)) return 60;
  
  // Contains query
  if (lowerText.includes(lowerQuery)) return 40;
  
  // Query words match
  const queryWords = lowerQuery.split(/\s+/);
  const matchedWords = queryWords.filter(word => lowerText.includes(word));
  return (matchedWords.length / queryWords.length) * 30;
}

/**
 * Highlight matching text in search results
 */
function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 rounded px-0.5">$1</mark>');
}

// ============================================================================
// Component
// ============================================================================

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    section: 'all',
    type: 'all',
    difficulty: 'all',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const currentSection = (userProfile?.examSection as ExamSection) || 'REG';

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
      setSelectedIndex(0);
    } else {
      setSearchQuery('');
      setResults([]);
      setShowFilters(false);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedEl = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Search function - searches local questions first, then Firestore
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchLower = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    try {
      // Load questions on first search (lazy loading for better initial bundle)
      const ALL_QUESTIONS = await loadQuestions();
      
      // Search local questions first (faster, no network)
      const sectionFilter = filters.section === 'all' ? null : filters.section;
      const typeFilter = filters.type;
      const difficultyFilter = filters.difficulty === 'all' ? null : filters.difficulty;

      // Filter and score questions
      if (typeFilter === 'all' || typeFilter === 'question') {
        const matchingQuestions = ALL_QUESTIONS
          .filter((q: Question) => {
            // Section filter
            if (sectionFilter && q.section !== sectionFilter) return false;
            
            // Difficulty filter
            if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
            
            // Text search
            const searchableText = `${q.question} ${q.topic} ${q.explanation}`.toLowerCase();
            return searchableText.includes(searchLower);
          })
          .map((q: Question) => {
            const score = calculateRelevanceScore(
              `${q.question} ${q.topic}`,
              query
            );
            return {
              id: q.id,
              type: 'question' as const,
              title: q.question.slice(0, 100) + (q.question.length > 100 ? '...' : ''),
              subtitle: `${q.section} • ${q.topic} • ${q.difficulty}`,
              data: q,
              score,
            };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 8);

        searchResults.push(...matchingQuestions);
      }

      // Extract unique topics from matching questions
      if (typeFilter === 'all' || typeFilter === 'topic') {
        const topics = new Map<string, { count: number; section: string }>();
        ALL_QUESTIONS.forEach((q: Question) => {
          if (sectionFilter && q.section !== sectionFilter) return;
          if (q.topic.toLowerCase().includes(searchLower)) {
            const existing = topics.get(q.topic);
            if (existing) {
              existing.count++;
            } else {
              topics.set(q.topic, { count: 1, section: q.section });
            }
          }
        });

        const topicResults: SearchResult[] = Array.from(topics.entries())
          .map(([topic, { count, section }]) => ({
            id: `topic-${topic.replace(/\s+/g, '-').toLowerCase()}`,
            type: 'topic' as const,
            title: topic,
            subtitle: `${section} • ${count} questions`,
            data: { id: topic, section },
            score: calculateRelevanceScore(topic, query),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 4);

        searchResults.push(...topicResults);
      }

      // Also search Firestore for any questions not in local cache
      if (typeFilter === 'all' || typeFilter === 'question') {
        try {
          const fsQuery = firestoreQuery(
            collection(db, 'questions'),
            where('section', '==', sectionFilter || currentSection),
            limit(20)
          );
          const questionsSnap = await getDocs(fsQuery);
          
          questionsSnap.docs.forEach((doc) => {
            const data = doc.data() as Record<string, unknown>;
            const questionText = (data.question as string) || '';
            const topicText = (data.topic as string) || '';
            const sectionText = (data.section as string) || '';
            const searchableText = `${questionText} ${topicText}`.toLowerCase();
            
            if (searchableText.includes(searchLower)) {
              // Only add if not already in results (from local search)
              if (!searchResults.find(r => r.id === doc.id)) {
                searchResults.push({
                  id: doc.id,
                  type: 'question',
                  title: questionText.slice(0, 100) + (questionText.length > 100 ? '...' : ''),
                  subtitle: `${sectionText} • ${topicText}`,
                  data: { id: doc.id, ...data } as Question,
                  score: calculateRelevanceScore(searchableText, query),
                });
              }
            }
          });
        } catch (err) {
          logger.log('Firestore search failed, using local results only');
        }
      }

      // Add AI suggestion at the end
      searchResults.push({
        id: 'ai-' + query,
        type: 'ai',
        title: `Ask Vory: "${query}"`,
        subtitle: 'Ask Vory for an explanation',
        data: { query },
        score: 0,
      });

      // Sort by score and limit results
      const sortedResults = searchResults
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 15);

      setResults(sortedResults);
    } catch (error) {
      logger.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentSection]);

  // Debounced search
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      performSearch(searchQuery);
    }, 200);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, performSearch]);

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
        navigate(`/practice?topic=${encodeURIComponent(result.data.id)}&section=${result.data.section}`);
        break;
      case 'ai':
        navigate(`/tutor?q=${encodeURIComponent(result.data.query)}`);
        break;
    }

    onClose();
  };

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      {/* Search Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-[10vh] px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-700">
            <SearchIcon className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, topics, or ask Vory..."
              className="flex-1 text-lg outline-none placeholder:text-slate-400 bg-transparent dark:text-white"
              aria-label="Search"
              aria-controls="search-results"
              aria-activedescendant={results[selectedIndex]?.id}
            />
            {loading && <Loader2 className="w-5 h-5 text-slate-400 animate-spin" aria-hidden="true" />}
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                "p-1.5 rounded-lg transition-colors",
                showFilters ? "bg-primary-100 text-primary-600" : "hover:bg-slate-100 text-slate-400"
              )}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter className="w-5 h-5" aria-hidden="true" />
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              aria-label="Close search"
            >
              <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700">
              <div className="flex flex-wrap gap-4 text-sm">
                {/* Section Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-600 dark:text-slate-300">Section:</label>
                  <select
                    value={filters.section}
                    onChange={(e) => updateFilter('section', e.target.value as ExamSection | 'all')}
                    className="px-2 py-1 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="all">All Sections</option>
                    {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-600 dark:text-slate-300">Type:</label>
                  <select
                    value={filters.type}
                    onChange={(e) => updateFilter('type', e.target.value as SearchFilters['type'])}
                    className="px-2 py-1 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="question">Questions</option>
                    <option value="topic">Topics</option>
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-slate-600 dark:text-slate-300">Difficulty:</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value as SearchFilters['difficulty'])}
                    className="px-2 py-1 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div 
            ref={resultsRef}
            id="search-results"
            className="max-h-96 overflow-y-auto"
            role="listbox"
            aria-label="Search results"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => {
                  const typeInfo = RESULT_TYPES[result.type];
                  const Icon = typeInfo.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={result.id}
                      data-index={index}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={clsx(
                        "w-full px-4 py-3 flex items-start gap-3 text-left transition-colors",
                        isSelected 
                          ? "bg-primary-50 dark:bg-primary-900/20" 
                          : "hover:bg-slate-50 dark:hover:bg-slate-700"
                      )}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div
                        className={clsx(
                          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                          typeInfo.color === 'primary' && 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
                          typeInfo.color === 'success' && 'bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400',
                          typeInfo.color === 'warning' && 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400',
                          typeInfo.color === 'slate' && 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div 
                          className="font-medium text-slate-900 dark:text-white truncate"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightMatch(result.title, searchQuery) 
                          }}
                        />
                        <div className="text-sm text-slate-600 dark:text-slate-300 truncate">
                          {result.subtitle}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                          {typeInfo.label}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : searchQuery.length >= 2 && !loading ? (
              <div className="py-8 text-center text-slate-600 dark:text-slate-300">
                No results found for "{searchQuery}"
              </div>
            ) : recentSearches.length > 0 && !searchQuery ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-slate-400 uppercase">
                  Recent Searches
                </div>
                {recentSearches.map((recent, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(recent.query)}
                    className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                  >
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-300">{recent.query}</span>
                  </button>
                ))}
              </div>
            ) : searchQuery.length < 2 ? (
              <div className="py-8 text-center">
                <div className="text-slate-400 dark:text-slate-600 mb-4">Start typing to search...</div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Search across <strong>2,500+</strong> questions</div>
                  <div>Filter by section, type, or difficulty</div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Keyboard hints */}
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border dark:border-slate-600">↑↓</kbd> navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border dark:border-slate-600">↵</kbd> select
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border dark:border-slate-600">esc</kbd> close
              </span>
            </div>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border dark:border-slate-600">⌘K</kbd> open
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
