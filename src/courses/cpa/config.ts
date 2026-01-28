/**
 * CPA Course Configuration
 * 
 * Complete definition of the CPA Exam prep course including all sections,
 * blueprint areas, pricing, and metadata.
 */

import { Course } from '../../types/course';

export const CPA_COURSE: Course = {
  id: 'cpa',
  name: 'CPA Exam Review',
  shortName: 'CPA',
  description: 'Comprehensive preparation for the Uniform CPA Examination',
  passingScore: 75,
  totalTime: 240, // 4 hours per section
  
  sections: [
    {
      id: 'FAR',
      name: 'Financial Accounting and Reporting',
      shortName: 'FAR',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'FAR-I', 
          name: 'Conceptual Framework and Financial Reporting', 
          weight: '25-35%', 
          topics: [
            'GAAP hierarchy',
            'Financial statement presentation',
            'Fair value measurements',
            'Revenue recognition',
          ]
        },
        { 
          id: 'FAR-II', 
          name: 'Select Financial Statement Accounts', 
          weight: '30-40%', 
          topics: [
            'Cash and cash equivalents',
            'Receivables',
            'Inventory',
            'Property, plant, and equipment',
            'Investments',
            'Intangible assets',
          ]
        },
        { 
          id: 'FAR-III', 
          name: 'Select Transactions', 
          weight: '20-30%', 
          topics: [
            'Business combinations',
            'Contingencies and commitments',
            'Leases',
            'Employee benefits',
            'Income taxes',
          ]
        },
        { 
          id: 'FAR-IV', 
          name: 'State and Local Governments', 
          weight: '5-15%', 
          topics: [
            'Government-wide financial statements',
            'Fund financial statements',
            'Government accounting standards',
          ]
        },
      ]
    },
    {
      id: 'AUD',
      name: 'Auditing and Attestation',
      shortName: 'AUD',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'AUD-I', 
          name: 'Ethics, Professional Responsibilities, and General Principles', 
          weight: '15-25%', 
          topics: [
            'Code of Professional Conduct',
            'Independence',
            'Professional skepticism',
          ]
        },
        { 
          id: 'AUD-II', 
          name: 'Assessing Risk and Developing a Planned Response', 
          weight: '25-35%', 
          topics: [
            'Planning the engagement',
            'Understanding internal control',
            'Risk assessment procedures',
          ]
        },
        { 
          id: 'AUD-III', 
          name: 'Performing Further Procedures and Obtaining Evidence', 
          weight: '30-40%', 
          topics: [
            'Audit evidence',
            'Sampling',
            'Substantive procedures',
          ]
        },
        { 
          id: 'AUD-IV', 
          name: 'Forming Conclusions and Reporting', 
          weight: '10-20%', 
          topics: [
            'Audit reports',
            'Review and compilation',
            'Attestation engagements',
          ]
        },
      ]
    },
    {
      id: 'REG',
      name: 'Regulation',
      shortName: 'REG',
      weight: '100%',
      questionCount: 72,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs', 'wc'],
      blueprintAreas: [
        { 
          id: 'REG-I', 
          name: 'Ethics and Responsibilities in Tax Practice', 
          weight: '10-20%', 
          topics: [
            'Circular 230',
            'Tax return positions',
            'Penalties',
          ]
        },
        { 
          id: 'REG-II', 
          name: 'Federal Taxation of Property Transactions', 
          weight: '12-22%', 
          topics: [
            'Basis of assets',
            'Capital gains and losses',
            'Section 1231 assets',
            'Like-kind exchanges',
          ]
        },
        { 
          id: 'REG-III', 
          name: 'Federal Taxation of Individuals', 
          weight: '22-32%', 
          topics: [
            'Gross income',
            'Adjustments and deductions',
            'Tax credits',
            'Alternative minimum tax',
          ]
        },
        { 
          id: 'REG-IV', 
          name: 'Federal Taxation of Entities', 
          weight: '28-38%', 
          topics: [
            'C corporations',
            'S corporations',
            'Partnerships',
            'Trusts and estates',
          ]
        },
      ]
    },
    {
      id: 'BAR',
      name: 'Business Analysis and Reporting',
      shortName: 'BAR',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs', 'wc'],
      blueprintAreas: [
        { 
          id: 'BAR-I', 
          name: 'Business Analysis', 
          weight: '40-50%', 
          topics: [
            'Financial statement analysis',
            'Prospective financial information',
            'Corporate governance',
          ]
        },
        { 
          id: 'BAR-II', 
          name: 'Technical Accounting and Reporting', 
          weight: '35-45%', 
          topics: [
            'State and local governments',
            'Not-for-profit entities',
            'Employee benefits',
          ]
        },
        { 
          id: 'BAR-III', 
          name: 'State and Local Governments', 
          weight: '10-20%', 
          topics: [
            'Government-wide statements',
            'Fund accounting',
          ]
        },
      ]
    },
    {
      id: 'ISC',
      name: 'Information Systems and Controls',
      shortName: 'ISC',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs'],
      blueprintAreas: [
        { 
          id: 'ISC-I', 
          name: 'Information Systems', 
          weight: '35-45%', 
          topics: [
            'IT governance',
            'System development',
            'Database management',
          ]
        },
        { 
          id: 'ISC-II', 
          name: 'Security, Confidentiality, and Privacy', 
          weight: '35-45%', 
          topics: [
            'Access controls',
            'Encryption',
            'Privacy regulations',
          ]
        },
        { 
          id: 'ISC-III', 
          name: 'Considerations for System and Organization Controls', 
          weight: '15-25%', 
          topics: [
            'SOC reports',
            'Trust services criteria',
          ]
        },
      ]
    },
    {
      id: 'TCP',
      name: 'Tax Compliance and Planning',
      shortName: 'TCP',
      weight: '100%',
      questionCount: 66,
      timeAllowed: 240,
      questionTypes: ['mcq', 'tbs', 'wc'],
      blueprintAreas: [
        { 
          id: 'TCP-I', 
          name: 'Tax Compliance and Planning for Individuals', 
          weight: '35-45%', 
          topics: [
            'Individual tax returns',
            'Tax planning strategies',
            'Retirement planning',
          ]
        },
        { 
          id: 'TCP-II', 
          name: 'Tax Compliance and Planning for Entities', 
          weight: '35-45%', 
          topics: [
            'Entity selection',
            'Business tax returns',
            'Multi-jurisdictional taxation',
          ]
        },
        { 
          id: 'TCP-III', 
          name: 'Tax Compliance and Planning for Special Situations', 
          weight: '15-25%', 
          topics: [
            'Gift and estate taxes',
            'Exempt organizations',
          ]
        },
      ]
    },
  ],
  
  pricing: {
    monthly: 29,
    annual: 99,
    lifetime: 299,
    bundleDiscount: 25,
  },
  
  metadata: {
    examProvider: 'AICPA',
    websiteUrl: 'https://www.aicpa.org/cpa-exam',
    averageStudyHours: 400,
    difficultyRating: 5,
    careerPaths: ['Public Accounting', 'Corporate Finance', 'Tax', 'Audit', 'Consulting'],
  },
  
  features: {
    hasTBS: true,
    hasWrittenCommunication: true,
    hasEssay: false,
    hasDataInsights: false,
  },
};

/**
 * CPA exam sections (convenience export)
 */
export const CPA_SECTIONS = CPA_COURSE.sections.map(s => s.id);

/**
 * Get CPA section config by ID
 */
export const getCPASection = (sectionId: string) => 
  CPA_COURSE.sections.find(s => s.id === sectionId);
