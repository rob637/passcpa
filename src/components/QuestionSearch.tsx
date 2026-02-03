/**
 * Question Search Component
 * 
 * Becker-style feature allowing users to search for specific questions
 * by ID, topic, or keyword. Can be used as a modal or inline component.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  FileText,
  Tag,
  Clock,
  AlertCircle,
  ChevronRight,
  Loader2,
  Hash,
  Filter,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCourse } from '../providers/CourseProvider';
import { fetchQuestions } from '../services/questionService';
import { CPA_SECTIONS } from '../config/examConfig';
import clsx from 'clsx';
import { Question, ExamSection } from '../types';
import logger from '../utils/logger';

interface QuestionSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion?: (question: Question) => void;
  defaultSection?: ExamSection;
}

interface SearchResult {
  question: Question;
  matchType: 'id' | 'topic' | 'content';
}

const QuestionSearch: React.FC<QuestionSearchProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  defaultSection,
}) => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { courseId } = useCourse();
  
  const [query, setQuery] = useState('');
  const [section, setSection] = useState<ExamSection>(
    defaultSection || (userProfile?.examSection as ExamSection) || 'FAR'
  );
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filterTopic, setFilterTopic] = useState<string>('all');
  
  // Get unique topics from loaded questions
  const topics = [...new Set(allQuestions.map(q => q.topic || q.topicId).filter(Boolean))];
  
  // Load all questions for the section
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const questions = await fetchQuestions({ section, count: 500 });
        setAllQuestions(questions);
      } catch (error) {
        logger.error('Error loading questions for search:', error);
      }
      setLoading(false);
    };
    
    if (isOpen) {
      loadQuestions();
    }
  }, [section, courseId, isOpen]);
  
  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('voraprep_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  
  // Save recent search
  const saveRecentSearch = useCallback((searchQuery: string) => {
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('voraprep_recent_searches', JSON.stringify(updated));
  }, [recentSearches]);
  
  // Search logic
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    const lowerQuery = searchQuery.toLowerCase().trim();
    
    // Filter by topic if set
    let questionsToSearch = allQuestions;
    if (filterTopic !== 'all') {
      questionsToSearch = allQuestions.filter(q => 
        (q.topic || q.topicId) === filterTopic
      );
    }
    
    const searchResults: SearchResult[] = [];
    
    for (const question of questionsToSearch) {
      // Match by ID (exact or partial)
      if (question.id.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ question, matchType: 'id' });
        continue;
      }
      
      // Match by topic
      const topic = (question.topic || question.topicId || '').toLowerCase();
      if (topic.includes(lowerQuery)) {
        searchResults.push({ question, matchType: 'topic' });
        continue;
      }
      
      // Match by question text content
      const questionText = (question.question || '').toLowerCase();
      if (questionText.includes(lowerQuery)) {
        searchResults.push({ question, matchType: 'content' });
        continue;
      }
      
      // Match by answer options
      const answerTexts = (question.options || []).map((a: string) => a.toLowerCase()).join(' ');
      if (answerTexts.includes(lowerQuery)) {
        searchResults.push({ question, matchType: 'content' });
      }
    }
    
    // Sort: ID matches first, then topic, then content
    searchResults.sort((a, b) => {
      const order = { id: 0, topic: 1, content: 2 };
      return order[a.matchType] - order[b.matchType];
    });
    
    setResults(searchResults.slice(0, 50)); // Limit to 50 results
  }, [allQuestions, filterTopic]);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, performSearch]);
  
  const handleSelect = (result: SearchResult) => {
    saveRecentSearch(query);
    if (onSelectQuestion) {
      onSelectQuestion(result.question);
    } else {
      // Navigate to practice with this question
      navigate(`/practice?questionId=${result.question.id}`);
    }
    onClose();
  };
  
  const handleRecentClick = (searchQuery: string) => {
    setQuery(searchQuery);
  };
  
  if (!isOpen) return null;
  
  const sectionInfo = CPA_SECTIONS[section];
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-primary-600" />
              Question Search
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by question ID, topic, or keyword..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3 mt-3">
            {/* Section */}
            <select
              value={section}
              onChange={(e) => setSection(e.target.value as ExamSection)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {Object.entries(CPA_SECTIONS).map(([key, s]) => (
                <option key={key} value={key}>
                  {(s as { shortName: string }).shortName}
                </option>
              ))}
            </select>
            
            {/* Topic Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <option value="all">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Stats */}
            <div className="ml-auto text-sm text-slate-500">
              {allQuestions.length} questions loaded
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
          ) : query ? (
            results.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {results.map((result) => (
                  <button
                    key={result.question.id}
                    onClick={() => handleSelect(result)}
                    className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={clsx(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        result.matchType === 'id' ? 'bg-primary-100 dark:bg-primary-900/30' :
                        result.matchType === 'topic' ? 'bg-primary-100 dark:bg-primary-900/30' :
                        'bg-slate-100 dark:bg-slate-700'
                      )}>
                        {result.matchType === 'id' ? (
                          <Hash className="w-5 h-5 text-primary-600" />
                        ) : result.matchType === 'topic' ? (
                          <Tag className="w-5 h-5 text-primary-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-400">
                            {result.question.id}
                          </span>
                          <span className="text-xs text-slate-500">
                            {result.question.topic || result.question.topicId}
                          </span>
                          <span className={clsx(
                            'text-xs px-2 py-0.5 rounded-full',
                            result.question.difficulty === 'easy' ? 'bg-success-100 text-success-700' :
                            result.question.difficulty === 'hard' ? 'bg-error-100 text-error-700' :
                            'bg-warning-100 text-warning-700'
                          )}>
                            {result.question.difficulty || 'medium'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-900 dark:text-white line-clamp-2">
                          {result.question.question}
                        </p>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Try searching with a different keyword, question ID, or topic name.
                </p>
              </div>
            )
          ) : (
            /* Recent Searches & Tips */
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentClick(search)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Search Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary-500" />
                    Search by Question ID (e.g., "FAR-001")
                  </li>
                  <li className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary-500" />
                    Search by topic name (e.g., "depreciation")
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Search by keyword in question text
                  </li>
                </ul>
              </div>
              
              {/* Quick topic shortcuts */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Browse by Topic
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.slice(0, 10).map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setQuery(topic || '')}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">{results.length}</span>
                results
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: sectionInfo?.color || '#2563EB' }}
              />
              <span>{sectionInfo?.name || section}</span>
            </div>
            <div className="text-xs">
              Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded">Enter</kbd> to select first result
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSearch;
