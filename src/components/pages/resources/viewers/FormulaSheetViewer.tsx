/**
 * Formula Sheet Viewer
 * 
 * Renders formula sheets as organized tables by category
 */

import React, { useEffect, useState } from 'react';
import { Loader2, Calculator, Info } from 'lucide-react';
import { ResourceItem } from '../resourceConfig';

interface FormulaSheetViewerProps {
  courseId: string;
  item: ResourceItem;
}

interface Formula {
  name: string;
  formula: string;
  notes?: string;
  example?: string;
  tips?: string[];
  // Support both array format and Record format for variables
  variables?: { symbol: string; meaning: string }[] | Record<string, string>;
}

interface FormulaCategory {
  // Support multiple naming conventions
  category?: string;
  name?: string;
  section?: string;
  blueprintArea?: string;
  weight?: string;
  part?: string; // For CIA
  formulas: Formula[];
}

// Helper to normalize variables to array format
const normalizeVariables = (variables?: { symbol: string; meaning: string }[] | Record<string, string>): { symbol: string; meaning: string }[] | undefined => {
  if (!variables) return undefined;
  
  // Already an array
  if (Array.isArray(variables)) return variables;
  
  // Convert Record to array
  return Object.entries(variables).map(([symbol, meaning]) => ({ symbol, meaning }));
};

// Helper to get category title from various naming conventions
const getCategoryTitle = (cat: FormulaCategory): string => {
  return cat.category || cat.name || 'Formulas';
};

// Helper to get section from various naming conventions  
const getCategorySection = (cat: FormulaCategory): string | undefined => {
  return cat.section || cat.blueprintArea;
};

export const FormulaSheetViewer: React.FC<FormulaSheetViewerProps> = ({ courseId, item }) => {
  const [categories, setCategories] = useState<FormulaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

  useEffect(() => {
    const loadFormulas = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Map item IDs to formula sheet exports
        // IDs come from resourceConfig
        // Using 'any' type since different courses have slightly different structures
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formulaMap: Record<string, () => Promise<any[]>> = {
          // CPA
          'cpa-fs-all': () => import(`../../../../data/cpa/study-materials/cpa-formula-sheet`).then(m => m.CPA_FORMULA_SHEET),
          // EA
          'ea-fs-all': () => import(`../../../../data/ea/study-materials/ea-formula-sheet`).then(m => m.EA_FORMULA_SHEET),
          // CMA (uses -p1, -p2 in config)
          'cma-fs-part1': () => import(`../../../../data/cma/study-materials/cma1-formula-sheet`).then(m => m.CMA1_FORMULA_SHEET),
          'cma-fs-part2': () => import(`../../../../data/cma/study-materials/cma2-formula-sheet`).then(m => m.CMA2_FORMULA_SHEET),
          'cma-fs-p1': () => import(`../../../../data/cma/study-materials/cma1-formula-sheet`).then(m => m.CMA1_FORMULA_SHEET),
          'cma-fs-p2': () => import(`../../../../data/cma/study-materials/cma2-formula-sheet`).then(m => m.CMA2_FORMULA_SHEET),
          // CIA
          'cia-fs-all': () => import(`../../../../data/cia/study-materials/cia-formula-sheet`).then(m => m.CIA_FORMULA_SHEET),
          // CFP
          'cfp-fs-all': () => import(`../../../../data/cfp/study-materials/cfp-formula-sheet`).then(m => m.CFP_FORMULA_SHEET),
          // CISA
          'cisa-fs-all': () => import(`../../../../data/cisa/study-materials/cisa-formula-sheet`).then(m => m.CISA_FORMULA_SHEET),
        };
        
        const loader = formulaMap[item.id];
        if (loader) {
          const data = await loader();
          setCategories(data);
        } else {
          setError(`Formula sheet not found: ${item.id}`);
        }
      } catch (err) {
        console.error('Failed to load formula sheet:', err);
        setError('Unable to load formula sheet content');
      } finally {
        setLoading(false);
      }
    };

    loadFormulas();
  }, [courseId, item]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'No formulas available'}</p>
      </div>
    );
  }

  // Group by section if available
  const sections = categories.reduce((acc, cat) => {
    const section = getCategorySection(cat) || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(cat);
    return acc;
  }, {} as Record<string, FormulaCategory[]>);

  const hasSections = Object.keys(sections).length > 1 || !sections['General'];

  const toggleFormula = (formulaId: string) => {
    setExpandedFormula(prev => prev === formulaId ? null : formulaId);
  };

  return (
    <div className="space-y-8">
      {hasSections ? (
        // Grouped by section
        Object.entries(sections).map(([section, cats]) => (
          <div key={section}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <Calculator className="w-5 h-5 text-primary-500" />
              {section}
            </h2>
            <div className="space-y-6">
              {cats.map((category, idx) => (
                <FormulaTable 
                  key={getCategoryTitle(category) + '-' + idx} 
                  category={category}
                  expandedFormula={expandedFormula}
                  onToggle={toggleFormula}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Flat list
        <div className="space-y-6">
          {categories.map((category, idx) => (
            <FormulaTable 
              key={getCategoryTitle(category) + '-' + idx} 
              category={category}
              expandedFormula={expandedFormula}
              onToggle={toggleFormula}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FormulaTableProps {
  category: FormulaCategory;
  expandedFormula: string | null;
  onToggle: (id: string) => void;
}

const FormulaTable: React.FC<FormulaTableProps> = ({ category, expandedFormula, onToggle }) => {
  const title = getCategoryTitle(category);
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden">
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h3>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {category.formulas.map((formula, idx) => {
          const formulaId = `${title}-${idx}`;
          const isExpanded = expandedFormula === formulaId;
          const normalizedVars = normalizeVariables(formula.variables);
          const hasDetails = formula.notes || formula.example || normalizedVars;
          
          return (
            <div key={idx} className="bg-white dark:bg-slate-800">
              <div 
                className={`px-4 py-3 ${hasDetails ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50' : ''}`}
                onClick={() => hasDetails && onToggle(formulaId)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {formula.name}
                      </span>
                      {hasDetails && (
                        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="mt-1 font-mono text-sm bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg text-primary-600 dark:text-primary-400 overflow-x-auto">
                      {formula.formula}
                    </div>
                  </div>
                </div>
                
                {isExpanded && hasDetails && (
                  <div className="mt-3 pl-4 border-l-2 border-primary-300 dark:border-primary-600 space-y-2">
                    {normalizedVars && normalizedVars.length > 0 && (
                      <div className="text-sm">
                        <strong className="text-slate-700 dark:text-slate-300">Variables:</strong>
                        <ul className="mt-1 space-y-1 ml-4">
                          {normalizedVars.map((v, i) => (
                            <li key={i} className="text-slate-600 dark:text-slate-400">
                              <code className="text-primary-600 dark:text-primary-400">{v.symbol}</code> = {v.meaning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {formula.notes && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-700 dark:text-slate-300">Note:</strong> {formula.notes}
                      </p>
                    )}
                    {formula.example && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-700 dark:text-slate-300">Example:</strong> {formula.example}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormulaSheetViewer;
