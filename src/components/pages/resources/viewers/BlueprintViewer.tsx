/**
 * Blueprint Viewer
 * 
 * Visual representation of exam blueprint with:
 * - Domain weight visualization (donut chart)
 * - Interactive domain cards with subtopics
 * - Study progress integration
 * - Exam structure details
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Target,
  BookOpen,
  Lightbulb,
  Clock,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { ResourceItem } from '../resourceConfig';

interface BlueprintViewerProps {
  courseId: string;
  item?: ResourceItem;
}

// Blueprint data structure
interface BlueprintDomain {
  id: string;
  name: string;
  code: string;
  weight: number;
  color: string;
  subtopics: BlueprintSubtopic[];
  examTips: string[];
}

interface BlueprintSubtopic {
  name: string;
  description: string;
  skills: string[];
}

// Course-specific blueprint data
const BLUEPRINTS: Record<string, { 
  title: string; 
  examCode: string;
  domains: BlueprintDomain[];
  examFormat: {
    duration: string;
    questions: string;
    passingScore: string;
    questionTypes?: string[];
  };
}> = {
  'cpa': {
    title: 'CPA Exam Blueprint',
    examCode: 'Uniform CPA Examination',
    domains: [
      {
        id: 'FAR-I',
        name: 'Financial Reporting',
        code: 'FAR Area I',
        weight: 30,
        color: '#4F46E5',
        subtopics: [
          { name: 'Conceptual Framework', description: 'FASB standards and principles', skills: ['Apply ASC guidance', 'Identify reporting requirements'] },
          { name: 'Financial Statements', description: 'Preparation and presentation', skills: ['Balance sheet', 'Income statement', 'Cash flows'] },
          { name: 'Notes & Disclosures', description: 'Required disclosures', skills: ['Segment reporting', 'Fair value disclosures'] },
        ],
        examTips: ['Know the conceptual framework hierarchy', 'Focus on changes in recent FASB updates'],
      },
      {
        id: 'FAR-II',
        name: 'Select Transactions',
        code: 'FAR Area II',
        weight: 35,
        color: '#7C3AED',
        subtopics: [
          { name: 'Revenue Recognition', description: 'ASC 606 five-step model', skills: ['Identify performance obligations', 'Allocate transaction price'] },
          { name: 'Leases', description: 'ASC 842 lease accounting', skills: ['Operating vs finance leases', 'ROU asset calculations'] },
          { name: 'Stock Compensation', description: 'Share-based payments', skills: ['Grant date fair value', 'Vesting conditions'] },
        ],
        examTips: ['ASC 606 and ASC 842 are heavily tested', 'Practice TBS questions with multiple transactions'],
      },
      {
        id: 'FAR-III',
        name: 'State & Local Governments',
        code: 'FAR Area III',
        weight: 20,
        color: '#2563EB',
        subtopics: [
          { name: 'Government-Wide Statements', description: 'Accrual basis reporting', skills: ['Statement of net position', 'Statement of activities'] },
          { name: 'Fund Accounting', description: 'Governmental, proprietary, fiduciary', skills: ['Major vs non-major funds', 'Fund balance classifications'] },
          { name: 'GASB Standards', description: 'Government accounting standards', skills: ['Measurement focus', 'Basis of accounting'] },
        ],
        examTips: ['Know the difference between government-wide and fund statements', 'GASB 34 is foundational'],
      },
      {
        id: 'FAR-IV',
        name: 'Non-Profit Accounting',
        code: 'FAR Area IV',
        weight: 15,
        color: '#059669',
        subtopics: [
          { name: 'Financial Statements', description: 'NFP presentation requirements', skills: ['Net asset classes', 'Statement of functional expenses'] },
          { name: 'Contributions', description: 'With and without donor restrictions', skills: ['Revenue recognition', 'Conditional vs unconditional'] },
          { name: 'NFP-Specific Topics', description: 'Collections, split-interest agreements', skills: ['Endowment accounting', 'In-kind contributions'] },
        ],
        examTips: ['Focus on net asset classifications', 'Know contribution recognition rules'],
      },
    ],
    examFormat: {
      duration: '4 hours',
      questions: '50 MCQ + 7 TBS',
      passingScore: '75',
      questionTypes: ['Multiple Choice (50%)', 'Task-Based Simulations (50%)'],
    },
  },
  'ea': {
    title: 'EA Exam Blueprint',
    examCode: 'IRS Special Enrollment Examination',
    domains: [
      {
        id: 'SEE1',
        name: 'Individuals (Part 1)',
        code: 'SEE Part 1',
        weight: 33,
        color: '#4F46E5',
        subtopics: [
          { name: 'Filing Status & Dependents', description: 'Determining correct filing status', skills: ['Qualifying child/relative tests', 'Head of household rules'] },
          { name: 'Income', description: 'Taxable and non-taxable income', skills: ['W-2 income', 'Investment income', 'Retirement distributions'] },
          { name: 'Deductions & Credits', description: 'Above/below the line deductions', skills: ['Standard vs itemized', 'Refundable vs non-refundable credits'] },
        ],
        examTips: ['Know current year tax limits', 'Filing status questions are common'],
      },
      {
        id: 'SEE2',
        name: 'Businesses (Part 2)',
        code: 'SEE Part 2',
        weight: 33,
        color: '#7C3AED',
        subtopics: [
          { name: 'Entity Types', description: 'Sole proprietor, partnership, S-corp, C-corp', skills: ['Entity selection', 'Formation requirements'] },
          { name: 'Income & Deductions', description: 'Business income and expenses', skills: ['Section 199A QBI', 'Depreciation methods'] },
          { name: 'Basis & Distributions', description: 'Partner and shareholder basis', skills: ['At-risk limitations', 'Passive activity rules'] },
        ],
        examTips: ['Basis calculations are heavily tested', 'Know the QBI deduction rules'],
      },
      {
        id: 'SEE3',
        name: 'Representation (Part 3)',
        code: 'SEE Part 3',
        weight: 34,
        color: '#2563EB',
        subtopics: [
          { name: 'Circular 230', description: 'Practice before the IRS', skills: ['Duties and restrictions', 'Sanctions and penalties'] },
          { name: 'Tax Procedures', description: 'IRS processes and timelines', skills: ['Audit procedures', 'Appeals process'] },
          { name: 'Penalties', description: 'Taxpayer and preparer penalties', skills: ['Accuracy-related penalties', 'Fraud penalties'] },
        ],
        examTips: ['Circular 230 is 40%+ of Part 3', 'Know penalty amounts and thresholds'],
      },
    ],
    examFormat: {
      duration: '3.5 hours per part',
      questions: '100 MCQ per part',
      passingScore: '105/130 scaled',
      questionTypes: ['Multiple Choice (100%)'],
    },
  },
  'cma': {
    title: 'CMA Exam Blueprint',
    examCode: 'Certified Management Accountant',
    domains: [
      {
        id: 'CMA1-A',
        name: 'Financial Planning',
        code: 'Part 1: Section A',
        weight: 20,
        color: '#4F46E5',
        subtopics: [
          { name: 'Strategic Planning', description: 'Strategy formulation and implementation', skills: ['SWOT analysis', 'Budgeting process'] },
          { name: 'Budgeting Concepts', description: 'Master budgets and forecasting', skills: ['Pro forma statements', 'Flexible budgets'] },
        ],
        examTips: ['Know how to prepare a master budget', 'Understand flexible budget variances'],
      },
      {
        id: 'CMA1-B',
        name: 'Performance Management',
        code: 'Part 1: Section B',
        weight: 20,
        color: '#7C3AED',
        subtopics: [
          { name: 'Cost Measurement', description: 'Job, process, activity-based costing', skills: ['Cost allocation', 'Overhead application'] },
          { name: 'Variance Analysis', description: 'Standard costing variances', skills: ['Price and quantity variances', 'Overhead variances'] },
        ],
        examTips: ['Master the variance formulas', 'Expect calculation-heavy questions'],
      },
      {
        id: 'CMA1-C',
        name: 'Cost Management',
        code: 'Part 1: Section C',
        weight: 15,
        color: '#2563EB',
        subtopics: [
          { name: 'Supply Chain', description: 'Inventory management and logistics', skills: ['EOQ', 'Just-in-time systems'] },
          { name: 'Business Process', description: 'Improvement and quality management', skills: ['Lean operations', 'Six Sigma'] },
        ],
        examTips: ['Understand lean and JIT concepts', 'Know quality cost categories'],
      },
      {
        id: 'CMA2-A',
        name: 'Financial Statement Analysis',
        code: 'Part 2: Section A',
        weight: 20,
        color: '#059669',
        subtopics: [
          { name: 'Ratio Analysis', description: 'Liquidity, profitability, leverage', skills: ['DuPont analysis', 'Trend analysis'] },
          { name: 'Analytical Issues', description: 'Earnings quality, off-balance sheet', skills: ['Pro forma adjustments', 'Operating vs capital leases'] },
        ],
        examTips: ['Know ratio formulas cold', 'Understand earnings quality metrics'],
      },
      {
        id: 'CMA2-B',
        name: 'Corporate Finance',
        code: 'Part 2: Section B',
        weight: 20,
        color: '#DC2626',
        subtopics: [
          { name: 'Capital Structure', description: 'Debt vs equity financing', skills: ['Cost of capital', 'WACC calculation'] },
          { name: 'Working Capital', description: 'Short-term financial management', skills: ['Cash conversion cycle', 'Credit policy'] },
        ],
        examTips: ['WACC calculations appear frequently', 'Understand working capital trade-offs'],
      },
    ],
    examFormat: {
      duration: '4 hours per part',
      questions: '100 MCQ + 2 Essays per part',
      passingScore: '360/500',
      questionTypes: ['Multiple Choice (75%)', 'Essay Questions (25%)'],
    },
  },
  'cia': {
    title: 'CIA Exam Blueprint',
    examCode: 'Certified Internal Auditor',
    domains: [
      {
        id: 'CIA1',
        name: 'Part 1: Essentials',
        code: 'Part 1',
        weight: 38,
        color: '#4F46E5',
        subtopics: [
          { name: 'IIA Standards', description: 'Mandatory guidance for internal audit', skills: ['Attribute Standards', 'Performance Standards'] },
          { name: 'Independence & Ethics', description: 'Objectivity and ethical conduct', skills: ['IIA Code of Ethics', 'Impairments to independence'] },
          { name: 'Governance & Risk', description: 'Corporate governance and ERM', skills: ['Three Lines Model', 'Risk assessment'] },
        ],
        examTips: ['Know the IPPF structure', 'Ethics questions are heavily tested'],
      },
      {
        id: 'CIA2',
        name: 'Part 2: Practice',
        code: 'Part 2',
        weight: 31,
        color: '#7C3AED',
        subtopics: [
          { name: 'Managing the IA Activity', description: 'Planning and organizing audit function', skills: ['Audit planning', 'Resource management'] },
          { name: 'Individual Engagement', description: 'Conducting audit engagements', skills: ['Fieldwork', 'Documentation'] },
          { name: 'Communication', description: 'Reporting and follow-up', skills: ['Audit reports', 'Monitoring corrective action'] },
        ],
        examTips: ['Think practically - what would an auditor do?', 'Communication criteria are testable'],
      },
      {
        id: 'CIA3',
        name: 'Part 3: Business Knowledge',
        code: 'Part 3',
        weight: 31,
        color: '#2563EB',
        subtopics: [
          { name: 'Business Acumen', description: 'Strategic management and operations', skills: ['Industry analysis', 'Performance measurement'] },
          { name: 'Information Security', description: 'IT controls and cybersecurity', skills: ['Access controls', 'IT governance'] },
          { name: 'Financial Management', description: 'Accounting and finance concepts', skills: ['Financial statements', 'Capital budgeting'] },
        ],
        examTips: ['Part 3 is the broadest - study all areas', 'IT security is increasingly important'],
      },
    ],
    examFormat: {
      duration: '2-2.5 hours per part',
      questions: '100-125 MCQ per part',
      passingScore: '600 (scale 250-750)',
      questionTypes: ['Multiple Choice (100%)'],
    },
  },
  'cfp': {
    title: 'CFP Exam Blueprint',
    examCode: 'Certified Financial Planner',
    domains: [
      {
        id: 'CFP-PCR',
        name: 'Professional Conduct & Regulation',
        code: 'Domain 1',
        weight: 7,
        color: '#6B7280',
        subtopics: [
          { name: 'CFP Board Standards', description: 'Code of Ethics and Standards of Conduct', skills: ['Fiduciary duty', 'Duty of loyalty'] },
          { name: 'Regulatory Framework', description: 'SEC, FINRA, state regulations', skills: ['Registration requirements', 'Compliance'] },
        ],
        examTips: ['Ethics is integrated throughout all domains', 'Know fiduciary vs suitability standards'],
      },
      {
        id: 'CFP-GPP',
        name: 'General Principles',
        code: 'Domain 2',
        weight: 15,
        color: '#4F46E5',
        subtopics: [
          { name: 'Financial Planning Process', description: 'Seven-step planning process', skills: ['Data gathering', 'Plan implementation'] },
          { name: 'Time Value of Money', description: 'Present/future value calculations', skills: ['Calculator proficiency', 'Cash flow analysis'] },
        ],
        examTips: ['Know your calculator (HP or TI) cold', 'TVM underlies many exam questions'],
      },
      {
        id: 'CFP-RISK',
        name: 'Risk & Insurance',
        code: 'Domain 3',
        weight: 11,
        color: '#7C3AED',
        subtopics: [
          { name: 'Risk Management', description: 'Identifying and managing risk', skills: ['Risk assessment', 'Insurance needs analysis'] },
          { name: 'Insurance Products', description: 'Life, health, disability, property', skills: ['Policy provisions', 'Coverage analysis'] },
        ],
        examTips: ['Focus on needs analysis', 'Know disability income policy features'],
      },
      {
        id: 'CFP-INV',
        name: 'Investment Planning',
        code: 'Domain 4',
        weight: 15,
        color: '#2563EB',
        subtopics: [
          { name: 'Investment Theory', description: 'MPT, CAPM, efficient markets', skills: ['Risk-adjusted returns', 'Portfolio construction'] },
          { name: 'Securities & Markets', description: 'Equities, bonds, alternatives', skills: ['Valuation methods', 'Asset allocation'] },
        ],
        examTips: ['Know your calculator for TVM', 'Portfolio theory questions are common'],
      },
      {
        id: 'CFP-TAX',
        name: 'Tax Planning',
        code: 'Domain 5',
        weight: 12,
        color: '#059669',
        subtopics: [
          { name: 'Income Tax', description: 'Individual income taxation', skills: ['Filing status', 'Deductions and credits'] },
          { name: 'Tax Planning Strategies', description: 'Tax-efficient planning', skills: ['Timing of income', 'Investment tax management'] },
        ],
        examTips: ['Current year limits are tested', 'Understand tax bracket optimization'],
      },
      {
        id: 'CFP-RET',
        name: 'Retirement Planning',
        code: 'Domain 6',
        weight: 17,
        color: '#DC2626',
        subtopics: [
          { name: 'Qualified Plans', description: '401(k), pension, profit sharing', skills: ['Plan selection', 'Contribution limits'] },
          { name: 'Social Security', description: 'Benefits and claiming strategies', skills: ['FRA calculation', 'Spousal benefits'] },
        ],
        examTips: ['SECURE 2.0 changes are tested', 'Social Security optimization is key'],
      },
      {
        id: 'CFP-EST',
        name: 'Estate Planning',
        code: 'Domain 7',
        weight: 11,
        color: '#7C3AED',
        subtopics: [
          { name: 'Estate Transfer', description: 'Wills, trusts, transfers', skills: ['Probate process', 'Trust types'] },
          { name: 'Estate Tax', description: 'Gift and estate taxation', skills: ['Unified credit', 'Generation-skipping tax'] },
        ],
        examTips: ['Know trust types and their uses', 'Portability rules are tested'],
      },
      {
        id: 'CFP-PSY',
        name: 'Psychology of Planning',
        code: 'Domain 8',
        weight: 12,
        color: '#2563EB',
        subtopics: [
          { name: 'Behavioral Finance', description: 'Client decision-making biases', skills: ['Cognitive biases', 'Heuristics'] },
          { name: 'Client Communication', description: 'Effective advisory relationships', skills: ['Active listening', 'Counseling techniques'] },
        ],
        examTips: ['Behavioral biases appear frequently', 'Client communication is practical'],
      },
    ],
    examFormat: {
      duration: '6 hours (2 sessions with 40-min break)',
      questions: '170 MCQ (4 subsections of 85 questions)',
      passingScore: 'Criterion-referenced',
      questionTypes: ['Stand-alone MCQ', 'Short Scenarios', 'Case Study MCQ'],
    },
  },
  'cisa': {
    title: 'CISA Exam Blueprint',
    examCode: 'Certified Information Systems Auditor',
    domains: [
      {
        id: 'CISA1',
        name: 'IS Audit Process',
        code: 'Domain 1',
        weight: 18,
        color: '#4F46E5',
        subtopics: [
          { name: 'Audit Planning', description: 'Risk-based audit approach', skills: ['Audit universe', 'Risk assessment'] },
          { name: 'Audit Execution', description: 'Evidence and CAATs', skills: ['Audit evidence', 'Sampling techniques'] },
          { name: 'Reporting', description: 'Findings and communication', skills: ['Five Cs of findings', 'Follow-up'] },
        ],
        examTips: ['Know ISACA standards (mandatory) vs guidelines (recommended)', 'Evidence quality: SCAR'],
      },
      {
        id: 'CISA2',
        name: 'IT Governance',
        code: 'Domain 2',
        weight: 18,
        color: '#7C3AED',
        subtopics: [
          { name: 'IT Governance Framework', description: 'COBIT and governance structures', skills: ['COBIT 2019', 'IT strategy alignment'] },
          { name: 'IT Management', description: 'Resource and performance management', skills: ['IT balanced scorecard', 'HR policies'] },
        ],
        examTips: ['COBIT 2019 is heavily tested', 'Understand governance vs management'],
      },
      {
        id: 'CISA3',
        name: 'IS Acquisition & Development',
        code: 'Domain 3',
        weight: 12,
        color: '#2563EB',
        subtopics: [
          { name: 'Systems Development', description: 'SDLC and methodologies', skills: ['Waterfall vs Agile', 'Testing approaches'] },
          { name: 'Project Management', description: 'IT project governance', skills: ['Project risk', 'Change management'] },
        ],
        examTips: ['Know SDLC phases and controls', 'Agile methodologies are tested'],
      },
      {
        id: 'CISA4',
        name: 'IS Operations & Resilience',
        code: 'Domain 4',
        weight: 26,
        color: '#059669',
        subtopics: [
          { name: 'IT Operations', description: 'Infrastructure and service management', skills: ['ITIL processes', 'Incident management'] },
          { name: 'Business Resilience', description: 'BCP and disaster recovery', skills: ['BIA', 'RTO/RPO/MTPD'] },
        ],
        examTips: ['Know RTO, RPO, MTPD definitions', 'BCP/DRP is heavily tested'],
      },
      {
        id: 'CISA5',
        name: 'Protection of Information Assets',
        code: 'Domain 5',
        weight: 26,
        color: '#DC2626',
        subtopics: [
          { name: 'Information Security', description: 'Security governance and policies', skills: ['Classification', 'Security frameworks'] },
          { name: 'Access Controls', description: 'Logical and physical access', skills: ['Authentication', 'Biometrics'] },
          { name: 'Network Security', description: 'Firewalls, IDS/IPS, encryption', skills: ['Network architecture', 'Cryptography'] },
        ],
        examTips: ['Domains 4 & 5 are 52% of exam - study thoroughly', 'Know biometric error rates (FAR/FRR)'],
      },
    ],
    examFormat: {
      duration: '4 hours',
      questions: '150 MCQ',
      passingScore: '450/800 scaled',
      questionTypes: ['Multiple Choice (100%)'],
    },
  },
};

export const BlueprintViewer: React.FC<BlueprintViewerProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  
  // Get course key without version suffix
  const courseKey = courseId.split('-')[0];
  const blueprint = BLUEPRINTS[courseKey];
  
  if (!blueprint) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">Blueprint data not available for this course</p>
        <Link to="/resources" className="text-primary-600 hover:underline mt-2 inline-block">
          ← Back to Resources
        </Link>
      </div>
    );
  }

  const toggleDomain = (domainId: string) => {
    setExpandedDomain(expandedDomain === domainId ? null : domainId);
  };

  return (
    <div className="space-y-8">
      {/* Exam Format Card */}
      <div className="card bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {blueprint.examCode}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Exam format and structure
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {blueprint.examFormat.duration}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <BookOpen className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {blueprint.examFormat.questions}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Pass: {blueprint.examFormat.passingScore}
                </span>
              </div>
            </div>
          </div>
          
          {blueprint.examFormat.questionTypes && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Question Types
              </p>
              <div className="flex flex-wrap gap-2">
                {blueprint.examFormat.questionTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Domain Weight Visualization */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Domain Weights
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Relative importance of each exam domain
          </p>
        </div>
        <div className="card-body">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Visual Bar Chart */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-3">
                {blueprint.domains.map((domain) => (
                  <div key={domain.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {domain.name}
                      </span>
                      <span className="font-bold" style={{ color: domain.color }}>
                        {domain.weight}%
                      </span>
                    </div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${domain.weight}%`,
                          backgroundColor: domain.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-3">
                {blueprint.domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => toggleDomain(domain.id)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: domain.color }}
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                      {domain.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Domain Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Domain Details
        </h2>
        
        {blueprint.domains.map((domain) => (
          <div
            key={domain.id}
            className="card overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleDomain(domain.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: domain.color }}
                >
                  {domain.weight}%
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {domain.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {domain.code}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                  expandedDomain === domain.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedDomain === domain.id && (
              <div className="border-t border-slate-100 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/50">
                {/* Subtopics */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Key Topics
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {domain.subtopics.map((subtopic, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                          {subtopic.name}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          {subtopic.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {subtopic.skills.map((skill, skillIdx) => (
                            <span
                              key={skillIdx}
                              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Exam Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    <Lightbulb className="w-4 h-4 inline-block mr-1 text-amber-500" />
                    Exam Tips
                  </h4>
                  <ul className="space-y-1">
                    {domain.examTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Study Recommendation */}
      <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-700">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Study Strategy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Allocate your study time proportionally to domain weights. Higher-weighted domains should receive more focus, but don't neglect lower-weighted areas.
              </p>
              <button
                onClick={() => navigate('/resources/study-guide')}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-1"
              >
                View Study Guides
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintViewer;
