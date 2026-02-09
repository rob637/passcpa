/**
 * Mnemonic Viewer
 * 
 * Renders mnemonics as flashcard-style cards
 */

import React, { useEffect, useState } from 'react';
import { Loader2, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { ResourceItem } from '../resourceConfig';

interface MnemonicViewerProps {
  courseId: string;
  item: ResourceItem;
}

interface MnemonicCard {
  id: string;
  section?: string;
  type?: string;
  topic?: string;
  blueprintArea?: string;
  front: string;
  mnemonic?: string;
  back: string;
  difficulty?: string;
  tags?: string[];
}

export const MnemonicViewer: React.FC<MnemonicViewerProps> = ({ courseId, item }) => {
  const [mnemonics, setMnemonics] = useState<MnemonicCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadMnemonics = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Map item IDs (from resourceConfig - they all point to a single consolidated mnemonics file per course)
        // For now, filter by section after loading
        const mnemonicMap: Record<string, () => Promise<MnemonicCard[]>> = {
          // CPA - all sections load full mnemonics
          'cpa-mn-far': async () => {
            const m = await import(`../../../../data/cpa/flashcards/mnemonics`);
            return m.FAR_MNEMONICS || [];
          },
          'cpa-mn-aud': async () => {
            const m = await import(`../../../../data/cpa/flashcards/mnemonics`);
            return m.AUD_MNEMONICS || [];
          },
          'cpa-mn-reg': async () => {
            const m = await import(`../../../../data/cpa/flashcards/mnemonics`);
            return m.REG_MNEMONICS || [];
          },
          'cpa-mn-bar': async () => {
            const m = await import(`../../../../data/cpa/flashcards/mnemonics`);
            return m.BAR_MNEMONICS || [];
          },
          // EA - separate files per section
          'ea-mn-see1': async () => {
            const m = await import(`../../../../data/ea/flashcards/see1-mnemonics`);
            return m.SEE1_MNEMONICS || [];
          },
          'ea-mn-see2': async () => {
            const m = await import(`../../../../data/ea/flashcards/see2-mnemonics`);
            return m.SEE2_MNEMONICS || [];
          },
          'ea-mn-see3': async () => {
            const m = await import(`../../../../data/ea/flashcards/see3-mnemonics`);
            return m.SEE3_MNEMONICS || [];
          },
          // CMA - separate files per part
          'cma-mn-part1': async () => {
            const m = await import(`../../../../data/cma/flashcards/cma1-mnemonics`);
            return m.CMA1_MNEMONICS || [];
          },
          'cma-mn-part2': async () => {
            const m = await import(`../../../../data/cma/flashcards/cma2-mnemonics`);
            return m.CMA2_MNEMONICS || [];
          },
          'cma-mn-var': async () => {
            const m = await import(`../../../../data/cma/flashcards/cma1-mnemonics`);
            return m.CMA1_MNEMONICS || [];
          },
          'cma-mn-ratio': async () => {
            const m = await import(`../../../../data/cma/flashcards/cma2-mnemonics`);
            return m.CMA2_MNEMONICS || [];
          },
          // CIA - consolidated
          'cia-mn-3lines': async () => {
            const m = await import(`../../../../data/cia/flashcards/mnemonics`);
            return (m.CIA1_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('Three Lines'));
          },
          'cia-mn-qaip': async () => {
            const m = await import(`../../../../data/cia/flashcards/mnemonics`);
            return (m.CIA2_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('QAIP'));
          },
          'cia-mn-fraud': async () => {
            const m = await import(`../../../../data/cia/flashcards/mnemonics`);
            return (m.CIA3_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('Fraud'));
          },
          // CFP
          'cfp-mn-secure': async () => {
            const m = await import(`../../../../data/cfp/flashcards/mnemonics`);
            return (m.CFP_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('SECURE') || c.mnemonic?.includes('SECURE'));
          },
          'cfp-mn-ethics': async () => {
            const m = await import(`../../../../data/cfp/flashcards/mnemonics`);
            return (m.CFP_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('Ethics') || c.mnemonic?.includes('ACT'));
          },
          'cfp-mn-trusts': async () => {
            const m = await import(`../../../../data/cfp/flashcards/mnemonics`);
            return (m.CFP_MNEMONICS || []).filter((c: MnemonicCard) => c.topic?.includes('Trust'));
          },
          // CISA - filter by domain and topic keywords, or return all from domain
          'cisa-mn-cobit': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return COBIT-related from D2 or all D2 if no match
            const cobitFiltered = (m.CISA2_MNEMONICS || []).filter((c: MnemonicCard) => 
              c.mnemonic?.includes('COBIT') || c.front?.includes('COBIT') || (c.tags && c.tags.includes('COBIT'))
            );
            return cobitFiltered.length > 0 ? cobitFiltered : (m.CISA2_MNEMONICS || []);
          },
          'cisa-mn-sdlc': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return SDLC-related from D3 or all D3 if no match
            const sdlcFiltered = (m.CISA3_MNEMONICS || []).filter((c: MnemonicCard) => 
              c.mnemonic?.includes('SDLC') || c.front?.includes('SDLC') || (c.tags && c.tags.includes('SDLC'))
            );
            return sdlcFiltered.length > 0 ? sdlcFiltered : (m.CISA3_MNEMONICS || []);
          },
          'cisa-mn-bcp': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return BCP/DRP-related from D4 or all D4
            const bcpFiltered = (m.CISA4_MNEMONICS || []).filter((c: MnemonicCard) => 
              c.mnemonic?.includes('BCP') || c.mnemonic?.includes('DRP') || c.mnemonic?.includes('RTO') || 
              c.front?.includes('BCP') || c.front?.includes('DRP') || c.front?.includes('Recovery') || 
              (c.tags && (c.tags.includes('BCP') || c.tags.includes('DRP') || c.tags.includes('disaster recovery')))
            );
            return bcpFiltered.length > 0 ? bcpFiltered : (m.CISA4_MNEMONICS || []);
          },
          'cisa-mn-crypto': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return cryptography-related from D5 or all D5
            const cryptoFiltered = (m.CISA5_MNEMONICS || []).filter((c: MnemonicCard) => 
              c.mnemonic?.toLowerCase().includes('crypt') || c.mnemonic?.toLowerCase().includes('sym') || c.mnemonic?.toLowerCase().includes('hash') ||
              c.front?.toLowerCase().includes('crypt') || c.front?.toLowerCase().includes('encrypt') || c.front?.toLowerCase().includes('hash') ||
              (c.tags && c.tags.some((t: string) => t.toLowerCase().includes('crypt') || t.toLowerCase().includes('encrypt') || t.toLowerCase().includes('hash')))
            );
            return cryptoFiltered.length > 0 ? cryptoFiltered : (m.CISA5_MNEMONICS || []);
          },
          'cisa-mn-risk': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return risk-related from D2 or all D2
            const riskFiltered = (m.CISA2_MNEMONICS || []).filter((c: MnemonicCard) => 
              (c.tags && c.tags.includes('risk')) || c.front?.toLowerCase().includes('risk')
            );
            return riskFiltered.length > 0 ? riskFiltered : (m.CISA2_MNEMONICS || []);
          },
          'cisa-mn-controls': async () => {
            const m = await import(`../../../../data/cisa/flashcards/mnemonics`);
            // Return control-related from D1 or all D1
            const controlFiltered = (m.CISA1_MNEMONICS || []).filter((c: MnemonicCard) => 
              (c.tags && c.tags.includes('control')) || c.front?.toLowerCase().includes('control')
            );
            return controlFiltered.length > 0 ? controlFiltered : (m.CISA1_MNEMONICS || []);
          },
        };
        
        const loader = mnemonicMap[item.id];
        if (loader) {
          const data = await loader();
          setMnemonics(data);
        } else {
          setError(`Mnemonics not found: ${item.id}`);
        }
      } catch (err) {
        console.error('Failed to load mnemonics:', err);
        setError('Unable to load mnemonic content');
      } finally {
        setLoading(false);
      }
    };

    loadMnemonics();
  }, [courseId, item]);

  const toggleCard = (cardId: string) => {
    setRevealedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealedCards(new Set(mnemonics.map(m => m.id)));
  };

  const hideAll = () => {
    setRevealedCards(new Set());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || mnemonics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'No mnemonics available'}</p>
      </div>
    );
  }

  // Group by section if available
  const bySection = mnemonics.reduce((acc, m) => {
    const section = m.section || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(m);
    return acc;
  }, {} as Record<string, MnemonicCard[]>);

  const hasSections = Object.keys(bySection).length > 1 || !bySection['General'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {mnemonics.length} memory aids
        </p>
        <div className="flex gap-2">
          <button
            onClick={revealAll}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Reveal All
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={hideAll}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Hide All
          </button>
        </div>
      </div>

      {hasSections ? (
        // Grouped by section
        Object.entries(bySection).map(([section, cards]) => (
          <div key={section}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {section}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((card) => (
                <MnemonicCardComponent
                  key={card.id}
                  card={card}
                  isRevealed={revealedCards.has(card.id)}
                  onToggle={() => toggleCard(card.id)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Flat grid
        <div className="grid gap-4 sm:grid-cols-2">
          {mnemonics.map((card) => (
            <MnemonicCardComponent
              key={card.id}
              card={card}
              isRevealed={revealedCards.has(card.id)}
              onToggle={() => toggleCard(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MnemonicCardProps {
  card: MnemonicCard;
  isRevealed: boolean;
  onToggle: () => void;
}

const MnemonicCardComponent: React.FC<MnemonicCardProps> = ({ card, isRevealed, onToggle }) => {
  return (
    <div 
      className={`
        rounded-xl border-2 transition-all cursor-pointer
        ${isRevealed 
          ? 'border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20' 
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-200 dark:hover:border-amber-700'
        }
      `}
      onClick={onToggle}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1">
            {card.topic && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {card.topic}
              </span>
            )}
            {card.difficulty && (
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${card.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  card.difficulty === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}
              `}>
                {card.difficulty}
              </span>
            )}
          </div>
          {isRevealed ? (
            <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          )}
        </div>

        {/* Question */}
        <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">
          {card.front}
        </p>

        {/* Mnemonic */}
        {card.mnemonic && (
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 dark:bg-amber-800/30 rounded-lg text-amber-700 dark:text-amber-300 font-bold text-lg mb-2">
            <Lightbulb className="w-4 h-4" />
            {card.mnemonic}
          </div>
        )}

        {/* Answer (revealed) */}
        {isRevealed && (
          <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-700">
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
              {card.back}
            </p>
            
            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {card.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {!isRevealed && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Click to reveal answer
          </p>
        )}
      </div>
    </div>
  );
};

export default MnemonicViewer;
