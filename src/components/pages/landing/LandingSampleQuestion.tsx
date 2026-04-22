/**
 * LandingSampleQuestion
 *
 * Inline, zero-friction sample question on the landing page.
 * Lets visitors taste the product (question quality, explanation depth)
 * before hitting any signup wall.
 *
 * Designed to be self-contained — no Firebase, no auth, no router state.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Check, X, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';

interface SampleQuestion {
  id: string;
  section: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  whyWrong: Record<string, string>;
}

// Curated CPA FAR question — high quality, demonstrates explanation depth.
const CPA_SAMPLE: SampleQuestion = {
  id: 'far-add-002',
  section: 'FAR',
  topic: 'FASB Conceptual Framework — Recognition Criteria',
  question:
    'Chen & Associates is determining whether to include a recently discovered patent on its balance sheet. For the patent to be recognized in the financial statements, it must:',
  options: [
    'Meet the definition of an element and be measurable',
    'Result from a transaction involving an outlay of cash only',
    'Be considered material to the financial statements only',
    'Receive explicit approval from the SEC prior to capitalization',
  ],
  correctAnswer: 0,
  explanation:
    'Recognition requires that the item (1) meets the definition of an element (asset, liability, equity, revenue, or expense) and (2) can be measured with sufficient reliability. Relevance and faithful representation must also be considered.',
  whyWrong: {
    '1': 'Assets can be acquired through non-cash transactions like stock issuances or exchanges. The method of acquisition does not determine whether it meets the definition of an asset.',
    '2': 'Materiality affects disclosure, but does not override the fundamental requirement that an item meet the definition of an element and be reliably measurable.',
    '3': 'The SEC does not approve specific accounting recognition decisions — recognition is governed by GAAP and the FASB conceptual framework.',
  },
};

const LETTERS = ['A', 'B', 'C', 'D'];

interface LandingSampleQuestionProps {
  courseId?: 'cpa' | 'ea' | 'cma' | 'cia' | 'cisa' | 'cfp';
  question?: SampleQuestion;
  registerPath?: string;
}

const LandingSampleQuestion = ({
  courseId = 'cpa',
  question = CPA_SAMPLE,
  registerPath = '/register?course=cpa',
}: LandingSampleQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correctAnswer;

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Try a Real Question
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            See the quality before you sign up
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Every one of our 9,000+ questions includes a deep explanation and breaks down
            why each wrong answer is wrong. No fluff. No sign-up needed to try one.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header chip */}
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-700 dark:text-blue-300">{question.section}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 dark:text-slate-400">{question.topic}</span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 capitalize">Medium</span>
          </div>

          {/* Question */}
          <div className="p-6 md:p-8">
            <p className="text-slate-900 dark:text-white text-lg leading-relaxed mb-6">
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isAnswer = idx === question.correctAnswer;
                const showCorrect = submitted && isAnswer;
                const showIncorrect = submitted && isSelected && !isAnswer;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={submitted}
                    className={clsx(
                      'w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all',
                      !submitted && 'hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer',
                      submitted && 'cursor-default',
                      isSelected && !submitted && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                      !isSelected && !submitted && 'border-slate-200 dark:border-slate-700',
                      showCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
                      showIncorrect && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                      submitted && !isSelected && !isAnswer && 'border-slate-200 dark:border-slate-700 opacity-60',
                    )}
                  >
                    <span
                      className={clsx(
                        'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold',
                        showCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                        showIncorrect && 'border-red-500 bg-red-500 text-white',
                        !submitted && isSelected && 'border-blue-500 bg-blue-500 text-white',
                        !submitted && !isSelected && 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400',
                        submitted && !isSelected && !isAnswer && 'border-slate-300 dark:border-slate-600 text-slate-400',
                      )}
                    >
                      {showCorrect ? <Check className="w-4 h-4" /> : showIncorrect ? <X className="w-4 h-4" /> : LETTERS[idx]}
                    </span>
                    <span className="text-slate-800 dark:text-slate-100 text-sm md:text-base leading-relaxed pt-0.5">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action row */}
            {!submitted ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selected === null}
                  className={clsx(
                    'px-6 py-3 rounded-xl font-bold transition-all',
                    selected === null
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
                  )}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {/* Result banner */}
                <div
                  className={clsx(
                    'rounded-xl p-4 flex items-start gap-3',
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800',
                  )}
                >
                  <div
                    className={clsx(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                      isCorrect ? 'bg-emerald-500' : 'bg-amber-500',
                    )}
                  >
                    {isCorrect ? <Check className="w-5 h-5 text-white" /> : <Lightbulb className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <p className={clsx('font-bold', isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-amber-900 dark:text-amber-200')}>
                      {isCorrect ? 'Correct! Well done.' : `Not quite — the answer is ${LETTERS[question.correctAnswer]}.`}
                    </p>
                    <p className={clsx('text-sm mt-1', isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300')}>
                      {question.explanation}
                    </p>
                  </div>
                </div>

                {/* Why each wrong answer is wrong */}
                <details className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 select-none">
                    Why each wrong answer is wrong
                  </summary>
                  <div className="px-4 pb-4 pt-2 space-y-3">
                    {Object.entries(question.whyWrong).map(([key, text]) => {
                      const idx = parseInt(key, 10);
                      return (
                        <div key={key} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                            {LETTERS[idx]}
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">{text}</p>
                        </div>
                      );
                    })}
                  </div>
                </details>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    to={registerPath}
                    className="flex-1 group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    See 9,000+ More Like This — Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl font-semibold border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
          Sample {courseId.toUpperCase()} {question.section} question. No account required.
        </p>
      </div>
    </section>
  );
};

export default LandingSampleQuestion;
