/**
 * CIA (Certified Internal Auditor) Course Configuration
 * 
 * IIA CIA Exam prep course
 * Based on 2025-2026 CIA Content Specification Outlines
 */

import { Course } from '../../types/course';

export const CIA_COURSE: Course = {
  id: 'cia',
  name: 'CIA Exam Review',
  shortName: 'CIA',
  description: 'Comprehensive preparation for the IIA Certified Internal Auditor Examination',
  passingScore: 600, // Scaled score out of 750
  totalTime: 150, // 2.5 hours per part (varies)
  
  sections: [
    {
      id: 'CIA1',
      name: 'Part 1: Essentials of Internal Auditing',
      shortName: 'CIA1',
      weight: '100%',
      questionCount: 125,
      timeAllowed: 150, // 2.5 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA1-I',
          name: 'Foundations of Internal Auditing',
          weight: '40%',
          topics: [
            'Mission of internal audit',
            'Definition of internal auditing',
            'Core principles',
            'Code of Ethics',
            'International Standards',
          ]
        },
        {
          id: 'CIA1-II',
          name: 'Independence and Objectivity',
          weight: '15%',
          topics: [
            'Organizational independence',
            'Individual objectivity',
            'Impairments',
          ]
        },
        {
          id: 'CIA1-III',
          name: 'Proficiency and Due Professional Care',
          weight: '15%',
          topics: [
            'Proficiency requirements',
            'Due professional care',
            'Continuing professional development',
          ]
        },
        {
          id: 'CIA1-IV',
          name: 'Quality Assurance and Improvement Program',
          weight: '10%',
          topics: [
            'Internal assessments',
            'External assessments',
            'Reporting on QAIP',
          ]
        },
        {
          id: 'CIA1-V',
          name: 'Governance, Risk Management, and Control',
          weight: '20%',
          topics: [
            'Corporate governance concepts',
            'Enterprise risk management',
            'Internal control frameworks',
          ]
        },
      ]
    },
    {
      id: 'CIA2',
      name: 'Part 2: Practice of Internal Auditing',
      shortName: 'CIA2',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 120, // 2 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA2-I',
          name: 'Managing the Internal Audit Activity',
          weight: '20%',
          topics: [
            'Audit planning and strategy',
            'Resource management',
            'Policies and procedures',
            'Coordination and reliance',
          ]
        },
        {
          id: 'CIA2-II',
          name: 'Planning the Engagement',
          weight: '20%',
          topics: [
            'Engagement planning',
            'Engagement objectives',
            'Engagement scope',
            'Resource allocation',
          ]
        },
        {
          id: 'CIA2-III',
          name: 'Performing the Engagement',
          weight: '40%',
          topics: [
            'Information gathering',
            'Analysis and evaluation',
            'Documentation',
            'Engagement supervision',
          ]
        },
        {
          id: 'CIA2-IV',
          name: 'Communicating Engagement Results and Monitoring Progress',
          weight: '20%',
          topics: [
            'Communication criteria and quality',
            'Disseminating results',
            'Monitoring progress',
          ]
        },
      ]
    },
    {
      id: 'CIA3',
      name: 'Part 3: Business Knowledge for Internal Auditing',
      shortName: 'CIA3',
      weight: '100%',
      questionCount: 100,
      timeAllowed: 120, // 2 hours
      questionTypes: ['mcq'],
      blueprintAreas: [
        {
          id: 'CIA3-I',
          name: 'Business Acumen',
          weight: '35%',
          topics: [
            'Strategic management',
            'Business processes and structures',
            'Organizational behavior',
            'Management frameworks',
          ]
        },
        {
          id: 'CIA3-II',
          name: 'Information Security',
          weight: '25%',
          topics: [
            'Information security fundamentals',
            'Information security governance',
            'Security risk assessment',
            'Security controls',
          ]
        },
        {
          id: 'CIA3-III',
          name: 'Information Technology',
          weight: '20%',
          topics: [
            'IT governance',
            'IT operations',
            'IT infrastructure',
            'Emerging technologies',
          ]
        },
        {
          id: 'CIA3-IV',
          name: 'Financial Management',
          weight: '20%',
          topics: [
            'Financial accounting and finance',
            'Managerial accounting',
          ]
        },
      ]
    },
  ],
  
  pricing: {
    monthly: 39,
    annual: 349,
    lifetime: 599,
  },
  
  metadata: {
    examProvider: 'Pearson VUE (IIA)',
    websiteUrl: 'https://www.theiia.org/en/certifications/cia/',
    averageStudyHours: 350,
    difficultyRating: 4,
    careerPaths: ['Internal Audit', 'Risk Management', 'Compliance', 'Corporate Governance'],
  },
  
  features: {
    hasTBS: false,
    hasWrittenCommunication: false,
    hasEssay: false,
    hasDataInsights: false,
  },
};

export default CIA_COURSE;
