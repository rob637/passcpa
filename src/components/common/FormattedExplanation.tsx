/**
 * FormattedExplanation.tsx
 * 
 * Renders explanation text that may contain markdown-like formatting:
 * - **bold** text
 * - • bullet points
 * - Numbered lists (1., 2., etc.)
 * - Paragraphs separated by blank lines
 * 
 * Used in Practice, DemoPractice, DemoQuestion, TBSSimulator, and LessonViewer.
 */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';

// Minimal styled components for explanation context
const explanationComponents = {
  // Paragraphs
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  // Bold
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  // Unordered lists (• bullets)
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc list-outside ml-5 mb-2 space-y-1 last:mb-0">{children}</ul>
  ),
  // Ordered lists (1., 2., etc.)
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal list-outside ml-5 mb-2 space-y-1 last:mb-0">{children}</ol>
  ),
  // List items
  li: ({ children }: { children?: ReactNode }) => (
    <li>{children}</li>
  ),
  // Headers within explanations
  h1: ({ children }: { children?: ReactNode }) => (
    <p className="font-bold text-base mb-1 mt-3 first:mt-0">{children}</p>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <p className="font-bold text-base mb-1 mt-3 first:mt-0">{children}</p>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <p className="font-semibold mb-1 mt-2 first:mt-0">{children}</p>
  ),
  // Tables (rare but possible)
  table: ({ children }: { children?: ReactNode }) => (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600 text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-slate-100 dark:bg-slate-700">{children}</thead>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border border-slate-300 dark:border-slate-600 px-3 py-1.5">{children}</td>
  ),
};

/**
 * Pre-process explanation text to convert common patterns into proper markdown.
 * Handles: • bullets → - bullets, embedded newlines, etc.
 */
function preprocessExplanation(text: string): string {
  // Replace literal • with - for markdown bullet parsing
  let processed = text.replace(/^•\s*/gm, '- ');
  // Also handle inline • that should be line breaks (e.g., "text • **A)** ...")
  processed = processed.replace(/\s+•\s+/g, '\n- ');
  return processed;
}

interface FormattedExplanationProps {
  text: string;
  className?: string;
}

const FormattedExplanation: React.FC<FormattedExplanationProps> = ({ text, className = '' }) => {
  const processed = preprocessExplanation(text);
  
  return (
    <div className={`formatted-explanation leading-relaxed ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={explanationComponents}>
        {processed}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedExplanation;
