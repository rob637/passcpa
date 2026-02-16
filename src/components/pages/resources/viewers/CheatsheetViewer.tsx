/**
 * Cheatsheet Viewer
 * 
 * Renders markdown cheatsheet content
 */

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { ResourceItem } from '../resourceConfig';

interface CheatsheetViewerProps {
  courseId: string;
  item: ResourceItem;
}

// Pre-load all markdown files using Vite's glob import
const cheatsheetModules = import.meta.glob('/src/data/**/cheatsheets/*.md', { 
  query: '?raw',
  import: 'default',
});

// Pre-load reference markdown files
const referenceModules = import.meta.glob('/src/data/**/references/*.md', { 
  query: '?raw',
  import: 'default',
});

// Map item IDs to their markdown file paths
const getCheatsheetPath = (courseId: string, itemId: string): { path: string; isReference: boolean } | null => {
  const folderMap: Record<string, string> = {
    'cpa-2025': 'cpa',
    'ea-2025': 'ea',
    'cma-2025': 'cma',
    'cia-2025': 'cia',
    'cfp-2025': 'cfp',
    'cisa-2025': 'cisa',
  };
  
  const folder = folderMap[courseId] || courseId.split('-')[0];
  
  // Map resourceConfig itemIds to filenames for cheatsheets
  const cheatsheetFilenameMap: Record<string, string> = {
    // CPA
    'cpa-cs-far': 'far-cheatsheet.md',
    'cpa-cs-aud': 'aud-cheatsheet.md',
    'cpa-cs-reg': 'reg-cheatsheet.md',
    'cpa-cs-bar': 'bar-cheatsheet.md',
    // EA
    'ea-cs-see1': 'see1-cheatsheet.md',
    'ea-cs-see2': 'see2-cheatsheet.md',
    'ea-cs-see3': 'see3-cheatsheet.md',
    // CMA (uses -p1, -p2 in config)
    'cma-cs-part1': 'part1-cheatsheet.md',
    'cma-cs-part2': 'part2-cheatsheet.md',
    'cma-cs-p1': 'part1-cheatsheet.md',
    'cma-cs-p2': 'part2-cheatsheet.md',
    // CIA
    'cia-cs-p1': 'cia1-cheatsheet.md',
    'cia-cs-p2': 'cia2-cheatsheet.md',
    'cia-cs-p3': 'cia3-cheatsheet.md',
    // CFP
    'cfp-cs-gpp': 'cfp-general-cheatsheet.md',
    'cfp-cs-ris': 'cfp-risk-cheatsheet.md',
    'cfp-cs-inv': 'cfp-investment-cheatsheet.md',
    'cfp-cs-tax': 'cfp-tax-cheatsheet.md',
    'cfp-cs-ret': 'cfp-retirement-cheatsheet.md',
    'cfp-cs-est': 'cfp-estate-cheatsheet.md',
    'cfp-cs-psy': 'cfp-psychology-cheatsheet.md',
    'cfp-cs-eth': 'cfp-professional-cheatsheet.md',
    // CISA
    'cisa-cs-d1': 'cisa1-cheatsheet.md',
    'cisa-cs-d2': 'cisa2-cheatsheet.md',
    'cisa-cs-d3': 'cisa3-cheatsheet.md',
    'cisa-cs-d4': 'cisa4-cheatsheet.md',
    'cisa-cs-d5': 'cisa5-cheatsheet.md',
  };
  
  // Map resourceConfig itemIds to filenames for references
  const referenceFilenameMap: Record<string, string> = {
    // CPA Quick References
    'cpa-ref-scoring': 'cpa-ref-scoring.md',
    'cpa-ref-timeline': 'cpa-ref-timeline.md',
    'cpa-ref-nts': 'cpa-ref-nts.md',
    'cpa-ref-ethics': 'cpa-ref-ethics.md',
    // EA Quick References
    'ea-ref-forms': 'ea-ref-forms.md',
    'ea-ref-penalties': 'ea-ref-penalties.md',
    'ea-ref-deadlines': 'ea-ref-deadlines.md',
    // CMA Quick References
    'cma-ref-testing': 'cma-ref-testing.md',
    'cma-ref-essay': 'cma-ref-essay.md',
    'cma-ref-calculator': 'cma-ref-calculator.md',
    // CIA Quick References
    'cia-ref-ippf': 'cia-ref-ippf.md',
    'cia-ref-standards': 'cia-ref-standards.md',
    'cia-ref-testing': 'cia-ref-testing.md',
    // CFP Quick References
    'cfp-ref-limits': 'cfp-ref-limits.md',
    'cfp-ref-ss': 'cfp-ref-ss.md',
    'cfp-ref-testing': 'cfp-ref-testing.md',
    'cfp-ref-calculator': 'cfp-ref-calculator.md',
    // CISA Quick References
    'cisa-ref-domains': 'cisa-ref-domains.md',
    'cisa-ref-acronyms': 'cisa-ref-acronyms.md',
    'cisa-ref-testing': 'cisa-ref-testing.md',
    'cisa-ref-frameworks': 'cisa-ref-frameworks.md',
  };
  
  // Check cheatsheets first
  const cheatsheetFilename = cheatsheetFilenameMap[itemId];
  if (cheatsheetFilename) {
    return { path: `/src/data/${folder}/cheatsheets/${cheatsheetFilename}`, isReference: false };
  }
  
  // Check references
  const referenceFilename = referenceFilenameMap[itemId];
  if (referenceFilename) {
    return { path: `/src/data/${folder}/references/${referenceFilename}`, isReference: true };
  }
  
  return null;
};

export const CheatsheetViewer: React.FC<CheatsheetViewerProps> = ({ courseId, item }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCheatsheet = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const pathInfo = getCheatsheetPath(courseId, item.id);
        
        if (!pathInfo) {
          setError(`Content mapping not found for: ${item.id}`);
          return;
        }
        
        // Choose the appropriate modules based on type
        const modules = pathInfo.isReference ? referenceModules : cheatsheetModules;
        const loader = modules[pathInfo.path];
        
        if (!loader) {
          // List available paths for debugging
          const availablePaths = pathInfo.isReference 
            ? Object.keys(referenceModules) 
            : Object.keys(cheatsheetModules);
          console.warn('Available paths:', availablePaths);
          setError(`Content file not found: ${pathInfo.path}`);
          return;
        }
        
        const md = await loader();
        setContent(md as string);
      } catch (err) {
        console.error('Failed to load cheatsheet:', err);
        setError('Unable to load cheatsheet content');
      } finally {
        setLoading(false);
      }
    };

    loadCheatsheet();
  }, [courseId, item]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">No content available</p>
      </div>
    );
  }

  // Simple markdown rendering (for better rendering, consider using react-markdown)
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MarkdownRenderer content={content} />
    </div>
  );
};

// Simple markdown renderer component
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Render a markdown table
  const renderTable = (rows: string[], tableKey: number): JSX.Element => {
    if (rows.length === 0) return <></>;
    
    // Parse cells from a row
    const parseCells = (row: string): string[] => {
      return row.split('|').slice(1, -1).map(cell => cell.trim());
    };
    
    // Check if a row is a separator (contains only |, -, :, and spaces)
    const isSeparatorRow = (row: string): boolean => {
      return /^[|\s:-]+$/.test(row) && row.includes('-');
    };
    
    // Check if second row is a separator (---|---|---)
    const hasSeparator = rows.length > 1 && isSeparatorRow(rows[1]);
    const headerRow = parseCells(rows[0]);
    const dataStartIndex = hasSeparator ? 2 : 1;
    const dataRows = rows.slice(dataStartIndex).map(parseCells);
    
    // Format inline content (bold, code, etc.)
    const formatCell = (text: string): string => {
      const html = text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-xs">$1</code>');
      return DOMPurify.sanitize(html);
    };
    
    return (
      <div key={tableKey} className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              {headerRow.map((cell, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                  dangerouslySetInnerHTML={{ __html: formatCell(cell) }}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {dataRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: formatCell(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Convert markdown to HTML (simplified version)
  const renderMarkdown = (md: string) => {
    // Split into lines for processing
    const lines = md.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let tableRows: string[] | null = null;
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={key++} className="list-disc pl-6 space-y-1 my-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-slate-700 dark:text-slate-300">{item}</li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={key++} className="list-decimal pl-6 space-y-1 my-4">
              {currentList.map((item, i) => (
                <li key={i} className="text-slate-700 dark:text-slate-300">{item}</li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={key++} className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm text-slate-800 dark:text-slate-200">
              {codeBlockContent.join('\n')}
            </code>
          </pre>
        );
        codeBlockContent = [];
      }
    };

    for (const line of lines) {
      // Code block handling
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Table detection - lines starting and ending with |
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushList();
        // Collect table rows
        if (!tableRows) {
          tableRows = [];
        }
        tableRows.push(line.trim());
        continue;
      } else if (tableRows && tableRows.length > 0) {
        // End of table, render it
        elements.push(renderTable(tableRows, key++));
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
          <h2 key={key++} className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        flushList();
        elements.push(
          <h4 key={key++} className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-3 mb-2">
            {line.slice(5)}
          </h4>
        );
      }
      // Bullet lists
      else if (line.match(/^[-*]\s+/)) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(line.replace(/^[-*]\s+/, ''));
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
      // Blockquote
      else if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={key++} className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-primary-50 dark:bg-primary-900/20 italic">
            {line.slice(2)}
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
        // Handle inline formatting
        let formattedLine = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`(.+?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-primary-600 dark:text-primary-400">$1</code>');
        formattedLine = DOMPurify.sanitize(formattedLine);
        
        elements.push(
          <p 
            key={key++} 
            className="text-slate-700 dark:text-slate-300 my-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      }
    }

    flushList();
    flushCodeBlock();
    
    // Flush any remaining table
    if (tableRows && tableRows.length > 0) {
      elements.push(renderTable(tableRows, key++));
    }

    return elements;
  };

  return <>{renderMarkdown(content)}</>;
};

export default CheatsheetViewer;
