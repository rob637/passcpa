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
  Check,
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCourse } from '../providers/CourseProvider';
import { BackButton } from './navigation';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getFlashcardsBySection } from '../data/cpa/flashcards';
import { ExamSection, EASection, AllExamSections } from '../types';
import { getSectionDisplayInfo, getDefaultSection } from '../utils/sectionUtils';
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
    : (userProfile?.examSection || getDefaultSection(courseId)) as ExamSection;
  
  // Get section info - handle both CPA and EA sections
  const isEA = isEASection(currentSection);
  const sectionInfo = isEA 
    ? { name: EA_SECTION_CONFIG[currentSection as EASection].name, color: EA_SECTION_CONFIG[currentSection as EASection].color }
    : getSectionDisplayInfo(currentSection, courseId);
  
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<CategoryCount>({ all: 0, toReview: 0, mastered: 0, notWorked: 0 });
  const [showUnits, setShowUnits] = useState(false);
  
  const [config, setConfig] = useState<FlashcardConfig>({
    categories: ['all'],
    cardTypes: ['definition', 'formula', 'mnemonic'],
    unit: 'all',
    shuffle: false,
    showBothSides: false,
  });

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

  // Toggle category selection
  const toggleCategory = (cat: 'all' | 'toReview' | 'mastered' | 'notWorked') => {
    if (cat === 'all') {
      setConfig(prev => ({ ...prev, categories: ['all'] }));
    } else {
      setConfig(prev => {
        const current = prev.categories.filter(c => c !== 'all');
        const newCats = current.includes(cat) 
          ? current.filter(c => c !== cat)
          : [...current, cat];
        return { ...prev, categories: newCats.length > 0 ? newCats : ['all'] };
      });
    }
  };

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
    
    navigate(`/flashcards/session?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <BackButton />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Create a Flashcard Session
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {sectionInfo?.name || currentSection}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Categories Section - Like Becker */}
        <Card noPadding className="p-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Categories
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Filter flashcards by mastery status
          </p>
          
          <div className="space-y-2">
            {[
              { id: 'all', label: 'All', count: counts.all, icon: Brain },
              { id: 'toReview', label: 'To Review', count: counts.toReview, icon: RotateCcw },
              { id: 'mastered', label: 'Mastered', count: counts.mastered, icon: CheckCircle },
              { id: 'notWorked', label: 'Not Worked', count: counts.notWorked, icon: AlertCircle },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = config.categories.includes(cat.id as any);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id as any)}
                  className={clsx(
                    'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all',
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  )}
                >
                  <div className={clsx(
                    'w-5 h-5 rounded border-2 flex items-center justify-center',
                    isSelected ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-slate-600'
                  )}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <Icon className={clsx('w-5 h-5', isSelected ? 'text-primary-600' : 'text-slate-600')} />
                  <span className={clsx('flex-1 text-left font-medium', isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300')}>
                    {cat.label}
                  </span>
                  <span className={clsx(
                    'px-2 py-0.5 rounded-full text-sm font-semibold',
                    isSelected ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  )}>
                    {loading ? '...' : cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Card Types */}
        <Card noPadding className="p-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Card Types
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'definition', label: 'Definitions', icon: BookOpen, color: 'blue' },
              { id: 'formula', label: 'Formulas', icon: Calculator, color: 'blue' },
              { id: 'mnemonic', label: 'Mnemonics', icon: Lightbulb, color: 'amber' },
              { id: 'question', label: 'Questions', icon: Brain, color: 'emerald' },
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
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20 text-${type.color}-700 dark:text-${type.color}-400`
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  )}
                  style={isSelected ? { 
                    borderColor: type.color === 'blue' ? '#1a73e8' : type.color === 'amber' ? '#f59e0b' : '#10b981',
                    backgroundColor: type.color === 'blue' ? '#e8f0fe' : type.color === 'amber' ? '#fffbeb' : '#ecfdf5',
                  } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Units & Modules (collapsible) */}
        <Card noPadding>
          <button
            onClick={() => setShowUnits(!showUnits)}
            className="w-full flex items-center justify-between p-4"
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Units & Modules
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">{config.unit === 'all' ? 'All' : config.unit}</span>
              <ChevronDown className={clsx('w-5 h-5 text-slate-600 transition-transform', showUnits && 'rotate-180')} />
            </div>
          </button>
          
          {showUnits && (
            <div className="px-4 pb-4 space-y-2 border-t border-slate-200 dark:border-slate-700 pt-3">
              <button
                onClick={() => setConfig(prev => ({ ...prev, unit: 'all' }))}
                className={clsx(
                  'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all',
                  config.unit === 'all'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-slate-200 dark:border-slate-700'
                )}
              >
                <span className={clsx('font-medium', config.unit === 'all' ? 'text-primary-700' : 'text-slate-700 dark:text-slate-300')}>
                  All Units
                </span>
                <span className="text-sm text-slate-600">{counts.all}</span>
              </button>
              {blueprintAreas.map((area) => {
                const areaCount = sectionCards.filter(c => c.blueprintArea === area).length;
                return (
                  <button
                    key={area}
                    onClick={() => setConfig(prev => ({ ...prev, unit: area }))}
                    className={clsx(
                      'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all',
                      config.unit === area
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-slate-200 dark:border-slate-700'
                    )}
                  >
                    <span className={clsx('font-medium text-left', config.unit === area ? 'text-primary-700' : 'text-slate-700 dark:text-slate-300')}>
                      {area}
                    </span>
                    <span className="text-sm text-slate-600">{areaCount}</span>
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {/* Flashcard Mode Options */}
        <Card noPadding className="p-4 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Flashcard mode
          </h2>
          
          {/* Shuffle Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Shuffle order</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 ml-6">
                Randomize card order for better retention
              </p>
            </div>
            <button
              onClick={() => setConfig(prev => ({ ...prev, shuffle: !prev.shuffle }))}
              role="switch"
              aria-checked={config.shuffle}
              className={clsx(
                'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                config.shuffle ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-600'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                  config.shuffle ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {/* Show Both Sides Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Show both sides</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 ml-6">
                See front and back simultaneously
              </p>
            </div>
            <button
              onClick={() => setConfig(prev => ({ ...prev, showBothSides: !prev.showBothSides }))}
              role="switch"
              aria-checked={config.showBothSides}
              className={clsx(
                'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                config.showBothSides ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-600'
              )}
            >
              <span
                className={clsx(
                  'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
                  config.showBothSides ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </Card>

        {/* Start Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={startSession}
          disabled={loading}
          leftIcon={Play}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-lg shadow-amber-400/30"
        >
          Start session
        </Button>
      </div>
    </div>
  );
};

export default FlashcardSetup;
