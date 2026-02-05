/**
 * EA (Enrolled Agent) Course Configuration
 * 
 * Special Enrollment Examination (SEE) prep course
 * Based on IRS SEE Content Outline 2025-2026
 */

import { Course } from '../../types/course';

export const EA_COURSE: Course = {
  id: 'ea',
  name: 'Enrolled Agent Exam Review',
  shortName: 'EA',
  description: 'Comprehensive preparation for the IRS Special Enrollment Examination (SEE)',
  passingScore: 105, // Scaled score out of 130
  totalTime: 210, // 3.5 hours per part
  
  sections: [
    {
      id: 'SEE1',
      name: 'Part 1: Individuals',
      shortName: 'SEE1',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE1-1',
          name: 'Preliminary Work and Taxpayer Data',
          weight: '15-25%',
          topics: [
            'Filing requirements',
            'Filing status',
            'Exemptions and dependents',
            'Taxpayer identification numbers',
          ]
        },
        {
          id: 'SEE1-2',
          name: 'Income and Assets',
          weight: '25-35%',
          topics: [
            'Wages and salaries',
            'Interest and dividends',
            'Business income (Schedule C)',
            'Capital gains and losses',
            'Rental income',
            'Retirement income',
          ]
        },
        {
          id: 'SEE1-3',
          name: 'Deductions and Credits',
          weight: '25-35%',
          topics: [
            'Adjustments to income',
            'Standard vs itemized deductions',
            'Nonrefundable credits',
            'Refundable credits',
          ]
        },
        {
          id: 'SEE1-4',
          name: 'Taxation and Advice',
          weight: '15-20%',
          topics: [
            'Tax computations',
            'Alternative minimum tax',
            'Self-employment tax',
            'Tax planning strategies',
          ]
        },
        {
          id: 'SEE1-5',
          name: 'Specialized Returns',
          weight: '5-10%',
          topics: [
            'Amended returns',
            'Foreign income',
            'Expatriation',
          ]
        },
      ]
    },
    {
      id: 'SEE2',
      name: 'Part 2: Businesses',
      shortName: 'SEE2',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE2-1',
          name: 'Business Entities',
          weight: '20-30%',
          topics: [
            'Sole proprietorships',
            'Partnerships',
            'C Corporations',
            'S Corporations',
            'LLCs',
          ]
        },
        {
          id: 'SEE2-2',
          name: 'Business Financial Information',
          weight: '25-35%',
          topics: [
            'Accounting methods',
            'Business income',
            'Cost of goods sold',
            'Business expenses',
          ]
        },
        {
          id: 'SEE2-3',
          name: 'Specialized Business Entities',
          weight: '20-30%',
          topics: [
            'Farming',
            'Trusts and estates',
            'Tax-exempt organizations',
          ]
        },
        {
          id: 'SEE2-4',
          name: 'Business Tax Computations',
          weight: '15-25%',
          topics: [
            'Depreciation and amortization',
            'Credits',
            'Alternative minimum tax',
            'Estimated taxes',
          ]
        },
      ]
    },
    {
      id: 'SEE3',
      name: 'Part 3: Representation, Practices, and Procedures',
      shortName: 'SEE3',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 210,
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'SEE3-1',
          name: 'Practices and Procedures',
          weight: '25-35%',
          topics: [
            'Power of attorney',
            'Tax information authorization',
            'Centralized Authorization File',
            'Practitioner responsibilities',
          ]
        },
        {
          id: 'SEE3-2',
          name: 'Representation Before the IRS',
          weight: '20-30%',
          topics: [
            'Who may practice',
            'Circular 230 requirements',
            'Conflicts of interest',
            'Due diligence',
          ]
        },
        {
          id: 'SEE3-3',
          name: 'Specific Types of Representation',
          weight: '15-25%',
          topics: [
            'Audits and examinations',
            'Appeals',
            'Collections',
            'Offers in compromise',
          ]
        },
        {
          id: 'SEE3-4',
          name: 'Completion of Filing Process',
          weight: '15-25%',
          topics: [
            'Amended returns',
            'Claims for refund',
            'Statute of limitations',
            'Penalties and interest',
          ]
        },
        {
          id: 'SEE3-5',
          name: 'Recordkeeping',
          weight: '5-10%',
          topics: [
            'Document retention',
            'Client records',
            'Electronic records',
          ]
        },
      ]
    },
  ],
  
  pricing: {
    monthly: 29,
    annual: 249,
    lifetime: 499,
  },
  
  metadata: {
    examProvider: 'Prometric (IRS)',
    websiteUrl: 'https://www.prometric.com/irs',
    averageStudyHours: 150,
    difficultyRating: 3,
    careerPaths: ['Tax Practice', 'IRS Representation', 'Tax Resolution', 'Enrolled Agent'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
  },
};

export default EA_COURSE;
