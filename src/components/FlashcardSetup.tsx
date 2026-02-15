import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Brain,
  BookOpen,
  Calculator,
  Lightbulb,
  Shuffle,
  Eye,
  ChevronDown,
  ChevronRight,
  Play,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCourse } from '../providers/CourseProvider';
import { Button } from './common/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getFlashcardsBySection } from '../data/cpa/flashcards';
import { EASection, AllExamSections } from '../types';
import { getSectionDisplayInfo, getDefaultSection } from '../utils/sectionUtils';
import { getCurrentSection } from '../utils/profileHelpers';
import { EA_SECTION_CONFIG } from '../courses/ea/config';
import clsx from 'clsx';

// Helper to check if a section is an EA section
const isEASection = (section: string): section is EASection => {
  return ['SEE1', 'SEE2', 'SEE3'].includes(section);
};

// Mastery status categories (like Becker)
interface CategoryCount {
  all: number;
  toReview: number;
  mastered: number;
  notWorked: number;
}

// Flashcard session config
interface FlashcardConfig {
  categories: ('all' | 'toReview' | 'mastered' | 'notWorked')[];
  cardTypes: ('definition' | 'formula' | 'mnemonic' | 'question')[];
  unit: string; // 'all' or specific unit/blueprint area
  shuffle: boolean;
  showBothSides: boolean;
  count: number; // Number of cards to study
}

const FlashcardSetup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userProfile } = useAuth();
  const { courseId } = useCourse();
  
  // Support URL param for section (for EA sections) or fall back to user profile
  const sectionFromUrl = searchParams.get('section');
  const currentSection: AllExamSections = sectionFromUrl 
    ? (sectionFromUrl as AllExamSections)
    : getCurrentSection(userProfile, courseId, getDefaultSection) as AllExamSections;
  
  // Get section info - handle both CPA and EA sections
  const isEA = isEASection(currentSection);
  const sectionInfo = isEA 
    ? { name: EA_SECTION_CONFIG[currentSection as EASection].name, color: EA_SECTION_CONFIG[currentSection as EASection].color }
    : getSectionDisplayInfo(currentSection, courseId);
  
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<CategoryCount>({ all: 0, toReview: 0, mastered: 0, notWorked: 0 });
  
  const [config, setConfig] = useState<FlashcardConfig>({
    categories: ['all'],
    cardTypes: ['definition', 'formula', 'mnemonic'],
    unit: 'all',
    shuffle: false,
    showBothSides: false,
    count: 25, // Default to 25 cards
  });

  // Advanced options toggle
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get blueprint areas for unit filter
  const sectionCards = getFlashcardsBySection(currentSection);
  const blueprintAreas = [...new Set(sectionCards.map(c => c.blueprintArea).filter((a): a is string => !!a))];
  
  // Load user's flashcard mastery data
  useEffect(() => {
    const loadMasteryData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const srsRef = doc(db, 'users', user.uid, 'srs', 'cards');
        const srsSnap = await getDoc(srsRef);
        const srsData = srsSnap.exists() ? srsSnap.data() : {};
        
        const allCards = sectionCards;
        let toReview = 0;
        let mastered = 0;
        let notWorked = 0;
        
        allCards.forEach(card => {
          const cardSrs = srsData[card.id];
          if (!cardSrs || !cardSrs.nextReview) {
            notWorked++;
          } else if (cardSrs.masteryLevel === 'mastered') {
            mastered++;
          } else {
            // Has been worked but not mastered = to review
            toReview++;
          }
        });
        
        setCounts({
          all: allCards.length,
          toReview,
          mastered,
          notWorked,
        });
      } catch (error) {
        console.error('Error loading mastery data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMasteryData();
  }, [user, currentSection]);

  // Toggle card type
  const toggleCardType = (type: 'definition' | 'formula' | 'mnemonic' | 'question') => {
    setConfig(prev => {
      const current = prev.cardTypes;
      const newTypes = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
      return { ...prev, cardTypes: newTypes.length > 0 ? newTypes : [type] }; // Keep at least one
    });
  };

  // Start session with config
  const startSession = () => {
    const params = new URLSearchParams();
    
    // Always include section for EA (so session knows which cards to use)
    if (isEA) {
      params.set('section', currentSection);
    }
    
    // Mode based on categories
    if (config.categories.includes('toReview')) {
      params.set('mode', 'review');
    } else if (config.categories.includes('notWorked')) {
      params.set('mode', 'new');
    } else {
      params.set('mode', 'all');
    }
    
    // Card type filter
    if (config.cardTypes.length === 1) {
      params.set('type', config.cardTypes[0] + 's'); // 'definitions', 'formulas', etc.
    }
    
    // Unit filter
    if (config.unit !== 'all') {
      params.set('topic', config.unit);
    }
    
    // Shuffle (stored in session for use by Flashcards component)
    if (config.shuffle) {
      params.set('shuffle', 'true');
    }

    // Card count
    params.set('count', config.count.toString());

    // Show both sides simultaneously
    if (config.showBothSides) {
      params.set('showBothSides', 'true');
    }
    
    navigate(`/flashcards/session?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Flashcards
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {sectionInfo?.name || currentSection}
          </p>
        </div>

        <div className="card">
          <div className="card-body space-y-5">
            {/* Card Count - Simplified to 3 options */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Cards
              </label>
              <div className="flex items-center gap-3">
                {[10, 25, 50].map((count) => (
                  <button
                    key={count}
                    onClick={() => setConfig((prev) => ({ ...prev, count }))}
                    className={clsx(
                      'flex-1 py-3 rounded-xl border-2 font-semibold text-lg transition-all focus:ring-2 focus:ring-primary-500/50',
                      config.count === count
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-300'
                    )}
                    aria-label={`${count} cards`}
                    aria-pressed={config.count === count}
                  >
                    {count}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                {loading ? '...' : counts.all} cards available
              </p>
            </div>

            {/* Simple Toggles */}
            <div className="space-y-3">
              {/* Shuffle Toggle */}
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={config.shuffle}
                  onChange={(e) => setConfig((prev) => ({ ...prev, shuffle: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Shuffle className="w-5 h-5 text-slate-500" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">Shuffle</div>
                    <div className="text-xs text-slate-500">Randomize card order</div>
                  </div>
                </div>
              </label>

              {/* Focus on Weak Areas Toggle */}
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={config.categories.includes('toReview') || config.categories.includes('notWorked')}
                  onChange={(e) => setConfig((prev) => ({ 
                    ...prev, 
                    categories: e.target.checked ? ['toReview', 'notWorked'] : ['all']
                  }))}
                  className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-slate-500" />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">Focus on weak areas</div>
                    <div className="text-xs text-slate-500">{counts.toReview + counts.notWorked} cards to review</div>
                  </div>
                </div>
              </label>
            </div>

            {/* More Options Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              More options
            </button>

            {/* Advanced Options Panel */}
            {showAdvanced && (
              <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                {/* Card Types */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Card Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'definition', label: 'Definitions', icon: BookOpen },
                      { id: 'formula', label: 'Formulas', icon: Calculator },
                      { id: 'mnemonic', label: 'Mnemonics', icon: Lightbulb },
                      { id: 'question', label: 'Questions', icon: Brain },
                    ].map((type) => {
                      const Icon = type.icon;
                      const isSelected = config.cardTypes.includes(type.id as any);
                      return (
                        <button
                          key={type.id}
                          onClick={() => toggleCardType(type.id as any)}
                          className={clsx(
                            'flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Filter by Mastery
                  </label>
                  <select
                    value={config.categories.includes('all') ? 'all' : config.categories.join(',')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'all') {
                        setConfig(prev => ({ ...prev, categories: ['all'] }));
                      } else {
                        setConfig(prev => ({ ...prev, categories: val.split(',') as any[] }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  >
                    <option value="all">All Cards ({counts.all})</option>
                    <option value="toReview">To Review ({counts.toReview})</option>
                    <option value="mastered">Mastered ({counts.mastered})</option>
                    <option value="notWorked">Not Worked ({counts.notWorked})</option>
                  </select>
                </div>

                {/* Units Filter */}
                {blueprintAreas.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={config.unit}
                      onChange={(e) => setConfig(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    >
                      <option value="all">All Units</option>
                      {blueprintAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Show Both Sides */}
                <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={config.showBothSides}
                    onChange={(e) => setConfig((prev) => ({ ...prev, showBothSides: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="font-medium text-slate-700 dark:text-slate-300">Show both sides</div>
                      <div className="text-xs text-slate-500">See front and back simultaneously</div>
                    </div>
                  </div>
                </label>
              </div>
            )}

            {/* Start Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={startSession}
              disabled={loading}
              leftIcon={Play}
            >
              Start Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardSetup;
