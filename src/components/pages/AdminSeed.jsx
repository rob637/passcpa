import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Loader2, CheckCircle, AlertCircle, Trash2, Database } from 'lucide-react';

// Real CPA exam-style questions
const CPA_QUESTIONS = [
  // ========== REG - Regulation ==========
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question:
      'For the current tax year, a taxpayer has wages of $85,000, interest income of $2,500, and a long-term capital loss of $15,000. What is the maximum amount of capital loss the taxpayer can deduct against ordinary income?',
    options: ['$3,000', '$15,000', '$12,000', '$0'],
    correctAnswer: 0,
    explanation:
      'Under IRC §1211(b), individual taxpayers may deduct up to $3,000 ($1,500 if married filing separately) of net capital losses against ordinary income in any tax year. The remaining $12,000 loss would be carried forward to future tax years under IRC §1212(b).',
    reference: 'IRC §1211(b), §1212(b)',
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'hard',
    question:
      'A cash-basis taxpayer received a $10,000 check on December 30, Year 1, but did not deposit it until January 3, Year 2. In which year should the income be reported?',
    options: ['Year 1', 'Year 2', "Either year at taxpayer's election", 'Split between both years'],
    correctAnswer: 0,
    explanation:
      'Under the cash method and constructive receipt doctrine, income is taxable when actually or constructively received. A check received is constructively received when the taxpayer has unrestricted access to it, regardless of when deposited. The income is taxable in Year 1.',
    reference: 'IRC §451, Treasury Reg. §1.451-2',
  },
  {
    section: 'REG',
    topicId: 'reg-individual-tax',
    topic: 'Individual Taxation',
    difficulty: 'medium',
    question:
      'Which of the following is NOT considered an itemized deduction for individual taxpayers?',
    options: [
      'State income taxes paid',
      'Mortgage interest on acquisition debt',
      'Alimony payments under a 2020 divorce agreement',
      'Charitable contributions',
    ],
    correctAnswer: 2,
    explanation:
      'For divorce agreements executed after December 31, 2018, alimony payments are not deductible by the payor and are not includible in income by the recipient under the Tax Cuts and Jobs Act.',
    reference: 'IRC §215 (repealed for post-2018 agreements)',
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'hard',
    question:
      'A C corporation has accumulated earnings and profits of $100,000 and current earnings and profits of $30,000. During the year, the corporation distributes $150,000 to its sole shareholder. How is the distribution treated?',
    options: [
      '$130,000 dividend, $20,000 return of capital',
      '$150,000 dividend',
      '$100,000 dividend, $50,000 return of capital',
      '$30,000 dividend, $120,000 return of capital',
    ],
    correctAnswer: 0,
    explanation:
      'Corporate distributions are treated first as dividends to the extent of current E&P ($30,000), then accumulated E&P ($100,000), for total dividend treatment of $130,000. The remaining $20,000 is treated as a return of capital.',
    reference: 'IRC §301, §316',
  },
  {
    section: 'REG',
    topicId: 'reg-business-tax',
    topic: 'Business Taxation',
    difficulty: 'medium',
    question: 'Which of the following is a requirement for a valid S corporation election?',
    options: [
      'No more than 75 shareholders',
      'May have both common and preferred stock',
      'All shareholders must be U.S. citizens or resident aliens',
      'Corporate shareholders are permitted',
    ],
    correctAnswer: 2,
    explanation:
      'S corporation requirements include: domestic corporation, no more than 100 shareholders, only individuals/estates/certain trusts as shareholders, only one class of stock, and no nonresident alien shareholders.',
    reference: 'IRC §1361(b)',
  },
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'medium',
    question:
      "Under the UCC, a merchant's firm offer is irrevocable without consideration for a period not exceeding:",
    options: ['30 days', '60 days', 'Three months', 'Six months'],
    correctAnswer: 2,
    explanation:
      "Under UCC §2-205, a merchant's firm offer in a signed writing is irrevocable for the time stated or a reasonable time, but not exceeding three months, without consideration.",
    reference: 'UCC §2-205',
  },
  {
    section: 'REG',
    topicId: 'reg-business-law',
    topic: 'Business Law',
    difficulty: 'easy',
    question:
      'Which of the following would cause an agency relationship to terminate by operation of law?',
    options: [
      'The principal revokes authority',
      'The agent renounces',
      'Death of the principal',
      'Completion of the purpose',
    ],
    correctAnswer: 2,
    explanation:
      'Agency terminates by operation of law upon: death of principal/agent, incapacity, impossibility, or change in law. Revocation and renunciation are terminations by acts of the parties.',
    reference: 'Restatement (Third) of Agency §3.06-3.07',
  },
  {
    section: 'REG',
    topicId: 'reg-ethics',
    topic: 'Ethics and Professional Responsibility',
    difficulty: 'medium',
    question: 'Under Circular 230, which act would constitute disreputable conduct by a CPA?',
    options: [
      'Charging a contingent fee for preparing an original tax return',
      'Representing conflicting interests with consent',
      'Advertising professional services',
      'Using a firm name with a retired partner',
    ],
    correctAnswer: 0,
    explanation:
      'Under Circular 230 §10.27, practitioners may not charge contingent fees for preparing original tax returns. Contingent fees are only permitted for IRS examination matters, refund claims, and judicial proceedings.',
    reference: '31 CFR Part 10 (Circular 230) §10.27',
  },

  // ========== FAR - Financial Accounting ==========
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'hard',
    question: 'Under ASC 606, when should revenue be recognized?',
    options: [
      'When cash is received',
      'When the contract is signed',
      'When control of goods/services transfers to the customer',
      'When the performance obligation is identified',
    ],
    correctAnswer: 2,
    explanation:
      'Under ASC 606, revenue is recognized when (or as) the entity satisfies a performance obligation by transferring a promised good or service to a customer. Transfer occurs when the customer obtains control.',
    reference: 'ASC 606-10-25-23',
  },
  {
    section: 'FAR',
    topicId: 'far-revenue',
    topic: 'Revenue Recognition',
    difficulty: 'medium',
    question:
      'A construction company uses the input method (cost-to-cost). Contract price is $5,000,000, estimated total costs are $4,000,000, costs incurred to date are $2,400,000. What revenue should be recognized to date?',
    options: ['$3,000,000', '$2,400,000', '$5,000,000', '$2,000,000'],
    correctAnswer: 0,
    explanation:
      'Percentage complete = $2,400,000 / $4,000,000 = 60%. Revenue to date = $5,000,000 × 60% = $3,000,000.',
    reference: 'ASC 606-10-55-20',
  },
  {
    section: 'FAR',
    topicId: 'far-leases',
    topic: 'Leases',
    difficulty: 'medium',
    question:
      'Under ASC 842, which of the following would NOT cause a lessee to classify a lease as a finance lease?',
    options: [
      'Transfer of ownership at lease end',
      'Bargain purchase option',
      'Lease term is major part of economic life',
      'Lessee has termination right with penalty',
    ],
    correctAnswer: 3,
    explanation:
      'Finance lease criteria include: ownership transfer, purchase option reasonably certain, lease term is major part of life, PV equals substantially all of FV, and specialized asset. A termination right is not a criterion.',
    reference: 'ASC 842-10-25-2',
  },
  {
    section: 'FAR',
    topicId: 'far-consolidation',
    topic: 'Consolidations',
    difficulty: 'hard',
    question:
      'Parent sold inventory to 100%-owned Sub for $150,000 (cost $100,000). At year-end, 40% remains unsold by Sub. What is the consolidation elimination entry for unrealized profit?',
    options: [
      'Debit COGS $20,000, Credit Inventory $20,000',
      'Debit Inventory $20,000, Credit COGS $20,000',
      'Debit COGS $50,000, Credit Inventory $50,000',
      'Debit RE $20,000, Credit Inventory $20,000',
    ],
    correctAnswer: 0,
    explanation:
      'Intercompany profit = $50,000. Unrealized profit in ending inventory = $50,000 × 40% = $20,000. Eliminate by debiting COGS and crediting Inventory.',
    reference: 'ASC 810-10-45-1',
  },
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    difficulty: 'medium',
    question:
      'A city receives a $500,000 grant restricted for construction of low-income housing. In which fund should this be recorded?',
    options: ['General Fund', 'Special Revenue Fund', 'Capital Projects Fund', 'Enterprise Fund'],
    correctAnswer: 2,
    explanation:
      'Capital Projects Funds account for financial resources restricted for acquisition or construction of major capital facilities. A construction grant should be recorded in a Capital Projects Fund.',
    reference: 'GASB Statement No. 54',
  },
  {
    section: 'FAR',
    topicId: 'far-government',
    topic: 'Governmental Accounting',
    difficulty: 'hard',
    question:
      'Under modified accrual, property taxes are considered available if collected within how many days after year-end?',
    options: ['30 days', '45 days', '60 days', '90 days'],
    correctAnswer: 2,
    explanation:
      'Property tax revenues are recognized when levied, provided they are collected within 60 days after year-end (the availability period).',
    reference: 'GASB Statement No. 33',
  },
  {
    section: 'FAR',
    topicId: 'far-nfp',
    topic: 'Not-for-Profit Accounting',
    difficulty: 'medium',
    question:
      'A NFP receives $100,000 restricted for research and spends $60,000. How should the remaining $40,000 be reported?',
    options: [
      'Net assets without donor restrictions',
      'Net assets with donor restrictions',
      'Deferred revenue',
      'Restricted cash',
    ],
    correctAnswer: 1,
    explanation:
      'Contributions with donor-imposed restrictions are reported as net assets with donor restrictions until the restrictions are met. The unspent $40,000 remains as net assets with donor restrictions.',
    reference: 'ASC 958-205-45-4',
  },
  {
    section: 'FAR',
    topicId: 'far-income-tax',
    topic: 'Income Taxes',
    difficulty: 'hard',
    question:
      'A company has a DTA of $500,000 from an NOL carryforward but believes only $300,000 will be realized. What is the proper treatment?',
    options: [
      'Record DTA $500,000 with valuation allowance $200,000',
      'Record DTA $300,000 only',
      'Record DTA $500,000, no allowance',
      'Do not record any DTA',
    ],
    correctAnswer: 0,
    explanation:
      'Under ASC 740, record the full DTA and a valuation allowance for the portion not more likely than not to be realized. Net DTA = $300,000.',
    reference: 'ASC 740-10-30-5',
  },

  // ========== AUD - Auditing ==========
  {
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    difficulty: 'medium',
    question:
      'An auditor assesses inherent risk as high and control risk as low. What is the appropriate detection risk level?',
    options: ['High', 'Moderate', 'Low', 'Cannot be determined'],
    correctAnswer: 1,
    explanation:
      'Audit risk = IR × CR × DR. High IR × Low CR = Moderate RMM, allowing moderate detection risk.',
    reference: 'AU-C 315, AS 2110',
  },
  {
    section: 'AUD',
    topicId: 'aud-planning',
    topic: 'Audit Planning and Risk Assessment',
    difficulty: 'hard',
    question:
      'During planning, the auditor learns the CFO was terminated for suspected fraud. This most directly affects:',
    options: ['Control risk', 'Inherent risk', 'Detection risk', 'Sampling risk'],
    correctAnswer: 0,
    explanation:
      'CFO termination for fraud directly affects control risk as it indicates potential failure in the control environment regarding management integrity.',
    reference: 'AU-C 315.14',
  },
  {
    section: 'AUD',
    topicId: 'aud-internal-control',
    topic: 'Internal Control',
    difficulty: 'easy',
    question: "Which COSO component addresses an organization's attitude toward internal control?",
    options: ['Control activities', 'Risk assessment', 'Control environment', 'Monitoring'],
    correctAnswer: 2,
    explanation:
      'The control environment sets the tone of the organization and is the foundation for all other components of internal control.',
    reference: 'COSO Framework',
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'medium',
    question:
      'An auditor confirms accounts receivable directly with customers. This provides evidence primarily about which assertion?',
    options: ['Completeness', 'Existence and rights', 'Valuation', 'Presentation'],
    correctAnswer: 1,
    explanation:
      'Positive confirmations provide strong evidence about existence (receivables are real) and rights (entity owns them).',
    reference: 'AU-C 505, AS 2310',
  },
  {
    section: 'AUD',
    topicId: 'aud-evidence',
    topic: 'Audit Evidence',
    difficulty: 'hard',
    question:
      'An auditor selects recorded payables and examines supporting documents. This primarily addresses which assertion?',
    options: ['Completeness', 'Existence', 'Rights and obligations', 'Classification'],
    correctAnswer: 1,
    explanation:
      'Testing from recorded amounts to documents (vouching) tests existence. Testing from documents to records (tracing) tests completeness.',
    reference: 'AU-C 500.A31',
  },
  {
    section: 'AUD',
    topicId: 'aud-reports',
    topic: 'Audit Reports',
    difficulty: 'medium',
    question:
      'When substantial doubt exists about going concern but adequate disclosure is made, the auditor should:',
    options: [
      'Issue qualified opinion',
      'Issue adverse opinion',
      'Issue unmodified with emphasis-of-matter',
      'Issue disclaimer',
    ],
    correctAnswer: 2,
    explanation:
      'With substantial doubt about going concern but adequate disclosure, issue unmodified opinion with emphasis-of-matter paragraph.',
    reference: 'AU-C 570.22',
  },
  {
    section: 'AUD',
    topicId: 'aud-professional',
    topic: 'Professional Responsibilities',
    difficulty: 'medium',
    question: 'Which circumstance impairs auditor independence?',
    options: [
      "Partner's spouse works non-audit at client",
      'Auditor owns any direct client stock',
      'Providing tax services to audit client',
      "Staff's brother works at client",
    ],
    correctAnswer: 1,
    explanation:
      'Direct financial interests in an attest client, regardless of materiality, impair independence.',
    reference: 'AICPA Code ET §1.240',
  },
  {
    section: 'AUD',
    topicId: 'aud-sampling',
    topic: 'Audit Sampling',
    difficulty: 'medium',
    question:
      'Systematic sampling: population 5,000, sample 100, interval 50, random start 23. Which items are selected?',
    options: ['23, 50, 100, 150', '23, 73, 123, 173', '50, 100, 150, 200', '23, 46, 69, 92'],
    correctAnswer: 1,
    explanation: 'With interval 50 and start 23: selections are 23, 73, 123, 173, etc.',
    reference: 'AU-C 530.A10',
  },

  // ========== BAR - Business Analysis ==========
  {
    section: 'BAR',
    topicId: 'bar-financial-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'medium',
    question:
      'Current assets $500,000 (including inventory $200,000), current liabilities $250,000. What is the quick ratio?',
    options: ['2.0', '1.2', '1.0', '0.8'],
    correctAnswer: 1,
    explanation:
      'Quick ratio = (Current assets - Inventory) / Current liabilities = $300,000 / $250,000 = 1.2.',
    reference: 'Financial Statement Analysis',
  },
  {
    section: 'BAR',
    topicId: 'bar-financial-analysis',
    topic: 'Financial Statement Analysis',
    difficulty: 'hard',
    question:
      'ROE is 15%, profit margin 10%, asset turnover 1.0. Using DuPont, what is the equity multiplier?',
    options: ['1.5', '2.0', '1.25', '0.67'],
    correctAnswer: 0,
    explanation: 'ROE = PM × AT × EM. 15% = 10% × 1.0 × EM. EM = 15% / 10% = 1.5.',
    reference: 'DuPont Analysis',
  },
  {
    section: 'BAR',
    topicId: 'bar-tech-accounting',
    topic: 'Technical Accounting',
    difficulty: 'hard',
    question:
      '$1,000,000 5-year 6% bonds issued when market rate is 8%. PV of $1 = 0.6806, PV of annuity = 3.9927. Issue price?',
    options: ['$920,146', '$1,000,000', '$1,079,854', '$880,000'],
    correctAnswer: 0,
    explanation:
      'PV principal = $1,000,000 × 0.6806 = $680,600. PV interest = $60,000 × 3.9927 = $239,562. Total = $920,162.',
    reference: 'ASC 835-30',
  },
  {
    section: 'BAR',
    topicId: 'bar-data-analytics',
    topic: 'Data Analytics',
    difficulty: 'medium',
    question:
      'An auditor analyzes all journal entries using data analytics. This is an example of:',
    options: [
      'Statistical sampling',
      'Non-statistical sampling',
      'Population testing',
      'Judgmental selection',
    ],
    correctAnswer: 2,
    explanation:
      'Analyzing all journal entries is population testing (100% examination), not sampling.',
    reference: 'AICPA Data Analytics Guide',
  },
  {
    section: 'BAR',
    topicId: 'bar-data-analytics',
    topic: 'Data Analytics',
    difficulty: 'easy',
    question: 'Which visualization best shows monthly revenue trends over three years?',
    options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'],
    correctAnswer: 2,
    explanation: 'Line charts are ideal for showing trends over time.',
    reference: 'Data Visualization Best Practices',
  },
  {
    section: 'BAR',
    topicId: 'bar-economics',
    topic: 'Economic Concepts',
    difficulty: 'hard',
    question:
      'Project requires $500,000 investment, generates $150,000 annually for 5 years. Cost of capital 10%, PV annuity factor 3.7908. What is NPV?',
    options: ['$68,620', '$250,000', '$568,620', '$(68,620)'],
    correctAnswer: 0,
    explanation: 'PV inflows = $150,000 × 3.7908 = $568,620. NPV = $568,620 - $500,000 = $68,620.',
    reference: 'Capital Budgeting',
  },
  {
    section: 'BAR',
    topicId: 'bar-government',
    topic: 'State and Local Government',
    difficulty: 'medium',
    question: 'Which cash flow statement method is required for proprietary funds under GASB?',
    options: ['Indirect method', 'Either method', 'Direct method', 'Modified accrual method'],
    correctAnswer: 2,
    explanation:
      'GASB requires proprietary funds to present a Statement of Cash Flows using the DIRECT method.',
    reference: 'GASB Statement No. 34',
  },
];

const AdminSeed = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [questionCount, setQuestionCount] = useState(null);

  const checkQuestionCount = async () => {
    try {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);
      setQuestionCount(snapshot.size);
    } catch (error) {
      console.error('Error checking questions:', error);
    }
  };

  const seedQuestions = async () => {
    setStatus('loading');
    setMessage('Seeding questions...');

    try {
      const batchSize = 400;
      let batch = writeBatch(db);
      let batchCount = 0;
      let totalCount = 0;

      for (const question of CPA_QUESTIONS) {
        const questionRef = doc(collection(db, 'questions'));
        batch.set(questionRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          usageCount: 0,
          reportCount: 0,
        });

        batchCount++;
        totalCount++;

        if (batchCount >= batchSize) {
          await batch.commit();
          batch = writeBatch(db);
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }

      setStatus('success');
      setMessage(`Successfully seeded ${totalCount} questions!`);
      checkQuestionCount();
    } catch (error) {
      console.error('Error seeding:', error);
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  const deleteAllQuestions = async () => {
    if (!window.confirm('Are you sure you want to delete ALL questions? This cannot be undone.')) {
      return;
    }

    setStatus('loading');
    setMessage('Deleting questions...');

    try {
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);

      const batchSize = 400;
      let batch = writeBatch(db);
      let batchCount = 0;
      let totalDeleted = 0;

      for (const docSnap of snapshot.docs) {
        batch.delete(docSnap.ref);
        batchCount++;
        totalDeleted++;

        if (batchCount >= batchSize) {
          await batch.commit();
          batch = writeBatch(db);
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }

      setStatus('success');
      setMessage(`Deleted ${totalDeleted} questions.`);
      setQuestionCount(0);
    } catch (error) {
      console.error('Error deleting:', error);
      setStatus('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  // Check count on mount
  useState(() => {
    checkQuestionCount();
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Please log in to access admin tools.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto page-transition">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <Database className="w-7 h-7 text-primary-600" />
          Admin: Seed Questions
        </h1>

        {/* Question Count */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-slate-600">
            Current questions in database:{' '}
            <span className="font-bold text-slate-900">
              {questionCount === null ? 'Loading...' : questionCount}
            </span>
          </p>
          <button
            onClick={checkQuestionCount}
            className="text-primary-600 text-sm hover:underline mt-1"
          >
            Refresh count
          </button>
        </div>

        {/* Status Message */}
        {status !== 'idle' && (
          <div
            className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
              status === 'loading'
                ? 'bg-blue-50 text-blue-700'
                : status === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
            }`}
          >
            {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="w-5 h-5" />}
            {status === 'error' && <AlertCircle className="w-5 h-5" />}
            <span>{message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={seedQuestions}
            disabled={status === 'loading'}
            className="btn-primary w-full disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Seeding...
              </>
            ) : (
              <>
                <Database className="w-5 h-5 mr-2" />
                Seed {CPA_QUESTIONS.length} CPA Questions
              </>
            )}
          </button>

          <button
            onClick={deleteAllQuestions}
            disabled={status === 'loading'}
            className="btn-secondary w-full text-red-600 disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Delete All Questions
          </button>
        </div>

        {/* Question Preview */}
        <div className="mt-8">
          <h2 className="font-semibold text-slate-900 mb-3">Questions to seed:</h2>
          <div className="space-y-2 text-sm">
            {['REG', 'FAR', 'AUD', 'BAR'].map((section) => {
              const count = CPA_QUESTIONS.filter((q) => q.section === section).length;
              return (
                <div key={section} className="flex justify-between text-slate-600">
                  <span>{section}</span>
                  <span className="font-medium">{count} questions</span>
                </div>
              );
            })}
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-slate-900">
              <span>Total</span>
              <span>{CPA_QUESTIONS.length} questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeed;
