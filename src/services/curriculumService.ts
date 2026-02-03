/**
 * Curriculum Service
 * 
 * Provides curriculum-aware learning features:
 * 1. Maps lessons to topics they cover
 * 2. Determines which topics a user has "unlocked" based on lesson progress
 * 3. Provides TBS unlock requirements based on lesson completion
 * 4. Supports "preview mode" for lookahead questions
 * 
 * Philosophy: Don't quiz users on topics they haven't studied yet.
 * This prevents frustration and ensures proper learning progression.
 */

import { fetchLessonsBySection } from './lessonService';
import type { Lesson, ExamSection, CourseId } from '../types';
import logger from '../utils/logger';

// Threshold for considering a lesson "completed" enough to unlock its topics
const LESSON_COMPLETION_THRESHOLD = 80; // 80% progress = topics unlocked

// Threshold for how much of each lesson must be complete to unlock TBS
const TBS_LESSON_THRESHOLD = 70; // 70% of related lessons must be 80%+ complete

/**
 * TBS type to required lesson topic mapping
 * Maps each TBS type to the lesson topics that should be completed first
 */
export const TBS_TOPIC_REQUIREMENTS: Record<string, Record<string, string[]>> = {
  FAR: {
    'Journal Entries': ['Conceptual Framework', 'Financial Statements', 'Revenue Recognition', 'Accruals'],
    'Bank Reconciliation': ['Cash', 'Internal Controls', 'Reconciliations'],
    'Depreciation': ['Fixed Assets', 'Property Plant Equipment', 'Depreciation', 'Asset Impairment'],
    'Lease Classification': ['Leases', 'Right-of-Use Assets', 'Lease Liability'],
    'Financial Statements': ['Conceptual Framework', 'Financial Statements', 'Statement of Cash Flows'],
  },
  AUD: {
    'Audit Sampling': ['Audit Sampling', 'Statistical Sampling', 'Substantive Testing'],
    'Risk Assessment': ['Risk Assessment', 'Internal Controls', 'Control Risk'],
    'Internal Control': ['Internal Controls', 'Control Environment', 'IT Controls'],
    'Substantive Procedures': ['Substantive Testing', 'Audit Evidence', 'Analytical Procedures'],
    'Audit Report': ['Audit Reports', 'Report Modifications', 'Emphasis of Matter'],
  },
  REG: {
    'Tax Return': ['Individual Taxation', 'Gross Income', 'Deductions', 'Credits'],
    'Basis Calculation': ['Basis', 'Stock Basis', 'Partnership Basis', 'Property Transactions'],
    'Entity Selection': ['Business Entities', 'C Corporations', 'S Corporations', 'Partnerships', 'LLCs'],
    'Tax Credits': ['Tax Credits', 'General Business Credit', 'Foreign Tax Credit'],
    'Depreciation': ['MACRS', 'Depreciation', 'Section 179', 'Bonus Depreciation'],
  },
  BAR: {
    'Cost Accounting': ['Cost Accounting', 'Job Order Costing', 'Process Costing'],
    'Variance Analysis': ['Variance Analysis', 'Standard Costs', 'Flexible Budgets'],
    'Data Analytics': ['Data Analytics', 'Business Intelligence', 'Data Visualization'],
    'Budgeting': ['Budgeting', 'Master Budget', 'Capital Budgeting'],
    'Performance Metrics': ['Performance Measurement', 'KPIs', 'Balanced Scorecard'],
  },
  ISC: {
    'IT Controls': ['IT Controls', 'General Controls', 'Application Controls'],
    'System Security': ['Cybersecurity', 'Access Controls', 'Encryption'],
    'Data Management': ['Data Governance', 'Database Management', 'Data Quality'],
    'SOC Reports': ['SOC Reports', 'SOC 1', 'SOC 2', 'Trust Services Criteria'],
    'Cybersecurity': ['Cybersecurity', 'Threat Assessment', 'Incident Response'],
  },
  TCP: {
    'Tax Planning': ['Tax Planning', 'Tax Strategies', 'Timing Strategies'],
    'Entity Restructuring': ['Entity Restructuring', 'Mergers', 'Acquisitions', 'Spin-offs'],
    'Compensation Planning': ['Compensation', 'Equity Compensation', 'Deferred Compensation'],
    'Retirement Planning': ['Retirement Plans', 'Qualified Plans', 'IRAs', '401k'],
    'Estate Planning': ['Estate Tax', 'Gift Tax', 'Trusts', 'Estate Planning'],
  },
};

/**
 * Normalize topic strings for comparison
 * Handles common variations in topic naming
 */
const normalizeTopicName = (topic: string): string => {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')         // Normalize whitespace
    .trim();
};

/**
 * Check if two topics match (handles variations in naming)
 */
export const topicsMatch = (lessonTopic: string, questionTopic: string): boolean => {
  const normalizedLesson = normalizeTopicName(lessonTopic);
  const normalizedQuestion = normalizeTopicName(questionTopic);
  
  // Exact match
  if (normalizedLesson === normalizedQuestion) return true;
  
  // One contains the other
  if (normalizedLesson.includes(normalizedQuestion) || normalizedQuestion.includes(normalizedLesson)) {
    return true;
  }
  
  // Handle common abbreviations and synonyms
  const synonyms: Record<string, string[]> = {
    'pp&e': ['property plant equipment', 'ppe', 'fixed assets'],
    'property plant equipment': ['pp&e', 'ppe', 'fixed assets'],
    'gaap': ['generally accepted accounting principles', 'us gaap'],
    'ifrs': ['international financial reporting standards'],
    'rou': ['right of use', 'right-of-use'],
    'nol': ['net operating loss', 'net operating losses'],
    'macrs': ['modified accelerated cost recovery', 'depreciation'],
  };
  
  const lessonSynonyms = synonyms[normalizedLesson] || [];
  const questionSynonyms = synonyms[normalizedQuestion] || [];
  
  return lessonSynonyms.includes(normalizedQuestion) || 
         questionSynonyms.includes(normalizedLesson);
};

/**
 * Get all topics covered by completed lessons for a user
 * 
 * @param lessonProgress - Map of lessonId -> progress percentage
 * @param section - Exam section to filter by
 * @param courseId - Course ID for multi-course support
 * @returns Set of topic strings that user has "covered" via lessons
 */
export const getCoveredTopics = async (
  lessonProgress: Record<string, number>,
  section: ExamSection,
  courseId: CourseId = 'cpa'
): Promise<Set<string>> => {
  const coveredTopics = new Set<string>();
  
  try {
    // Get all lessons for this section
    const lessons = await fetchLessonsBySection(section, courseId);
    
    // Find completed lessons (>= threshold)
    for (const lesson of lessons) {
      const progress = lessonProgress[lesson.id] || 0;
      
      if (progress >= LESSON_COMPLETION_THRESHOLD) {
        // Add all topics from this lesson
        for (const topic of lesson.topics) {
          coveredTopics.add(topic);
          // Also add normalized version for matching
          coveredTopics.add(normalizeTopicName(topic));
        }
      }
    }
    
    logger.debug(`Covered topics for ${section}: ${coveredTopics.size} topics from completed lessons`);
    return coveredTopics;
  } catch (error) {
    logger.error('Error getting covered topics:', error);
    return coveredTopics;
  }
};

/**
 * Get topics that are "coming up next" - for preview mode
 * Returns topics from the next N% of lessons (lookahead)
 * 
 * @param lessonProgress - Map of lessonId -> progress percentage
 * @param section - Exam section
 * @param lookaheadPercent - Percentage of remaining lessons to include (default 10%)
 * @param courseId - Course ID
 */
export const getPreviewTopics = async (
  lessonProgress: Record<string, number>,
  section: ExamSection,
  lookaheadPercent: number = 0.1,
  courseId: CourseId = 'cpa'
): Promise<Set<string>> => {
  const previewTopics = new Set<string>();
  
  try {
    const lessons = await fetchLessonsBySection(section, courseId);
    
    // Find incomplete lessons (not yet at threshold)
    const incompleteLessons = lessons.filter(l => {
      const progress = lessonProgress[l.id] || 0;
      return progress < LESSON_COMPLETION_THRESHOLD;
    });
    
    // Take the next X% of incomplete lessons as "preview"
    const lookaheadCount = Math.max(1, Math.ceil(incompleteLessons.length * lookaheadPercent));
    const previewLessons = incompleteLessons.slice(0, lookaheadCount);
    
    for (const lesson of previewLessons) {
      for (const topic of lesson.topics) {
        previewTopics.add(topic);
        previewTopics.add(normalizeTopicName(topic));
      }
    }
    
    logger.debug(`Preview topics for ${section}: ${previewTopics.size} topics (${lookaheadCount} lessons lookahead)`);
    return previewTopics;
  } catch (error) {
    logger.error('Error getting preview topics:', error);
    return previewTopics;
  }
};

/**
 * Filter question IDs to only those matching covered topics
 * 
 * @param questionTopics - Map of questionId -> topic name
 * @param coveredTopics - Set of covered topic names
 * @param previewTopics - Optional set of preview topics (for lookahead mode)
 * @returns Array of question IDs that match covered (or preview) topics
 */
export const filterQuestionsByCoveredTopics = (
  questionTopics: Map<string, string>,
  coveredTopics: Set<string>,
  previewTopics?: Set<string>
): string[] => {
  const allowedTopics = new Set([...coveredTopics]);
  
  // Add preview topics if provided
  if (previewTopics) {
    for (const topic of previewTopics) {
      allowedTopics.add(topic);
    }
  }
  
  const filteredIds: string[] = [];
  
  for (const [questionId, topic] of questionTopics) {
    const normalizedTopic = normalizeTopicName(topic);
    
    // Check if topic matches any allowed topic
    const isAllowed = Array.from(allowedTopics).some(allowed => 
      topicsMatch(normalizedTopic, allowed)
    );
    
    if (isAllowed) {
      filteredIds.push(questionId);
    }
  }
  
  return filteredIds;
};

/**
 * Check if a TBS type is unlocked based on lesson progress
 * 
 * @param tbsType - The TBS topic name (e.g., "Journal Entries")
 * @param section - Exam section
 * @param lessonProgress - Map of lessonId -> progress percentage
 * @param courseId - Course ID
 * @returns Object with isUnlocked boolean and progress info
 */
export const checkTBSUnlocked = async (
  tbsType: string,
  section: ExamSection,
  lessonProgress: Record<string, number>,
  courseId: CourseId = 'cpa'
): Promise<{
  isUnlocked: boolean;
  progress: number;
  requiredTopics: string[];
  coveredTopics: string[];
  missingTopics: string[];
}> => {
  const sectionRequirements = TBS_TOPIC_REQUIREMENTS[section] || {};
  const requiredTopics = sectionRequirements[tbsType] || [];
  
  if (requiredTopics.length === 0) {
    // No requirements defined - always unlocked
    return {
      isUnlocked: true,
      progress: 100,
      requiredTopics: [],
      coveredTopics: [],
      missingTopics: [],
    };
  }
  
  try {
    const coveredTopicsSet = await getCoveredTopics(lessonProgress, section, courseId);
    
    const coveredTopics: string[] = [];
    const missingTopics: string[] = [];
    
    for (const required of requiredTopics) {
      const normalizedRequired = normalizeTopicName(required);
      const isCovered = Array.from(coveredTopicsSet).some(covered =>
        topicsMatch(normalizedRequired, covered)
      );
      
      if (isCovered) {
        coveredTopics.push(required);
      } else {
        missingTopics.push(required);
      }
    }
    
    const progress = Math.round((coveredTopics.length / requiredTopics.length) * 100);
    const isUnlocked = progress >= TBS_LESSON_THRESHOLD;
    
    return {
      isUnlocked,
      progress,
      requiredTopics,
      coveredTopics,
      missingTopics,
    };
  } catch (error) {
    logger.error('Error checking TBS unlock status:', error);
    return {
      isUnlocked: true, // Default to unlocked on error
      progress: 100,
      requiredTopics,
      coveredTopics: [],
      missingTopics: [],
    };
  }
};

/**
 * Get all unlocked TBS types for a section
 */
export const getUnlockedTBSTypes = async (
  section: ExamSection,
  lessonProgress: Record<string, number>,
  courseId: CourseId = 'cpa'
): Promise<{ type: string; isUnlocked: boolean; progress: number }[]> => {
  const sectionRequirements = TBS_TOPIC_REQUIREMENTS[section] || {};
  const tbsTypes = Object.keys(sectionRequirements);
  
  const results = await Promise.all(
    tbsTypes.map(async (tbsType) => {
      const status = await checkTBSUnlocked(tbsType, section, lessonProgress, courseId);
      return {
        type: tbsType,
        isUnlocked: status.isUnlocked,
        progress: status.progress,
      };
    })
  );
  
  return results;
};

/**
 * Build a topic map from lessons for quick lookup
 * Maps each topic to the lessons that cover it
 */
export const buildTopicToLessonsMap = async (
  section: ExamSection,
  courseId: CourseId = 'cpa'
): Promise<Map<string, Lesson[]>> => {
  const topicMap = new Map<string, Lesson[]>();
  
  try {
    const lessons = await fetchLessonsBySection(section, courseId);
    
    for (const lesson of lessons) {
      for (const topic of lesson.topics) {
        const normalizedTopic = normalizeTopicName(topic);
        
        if (!topicMap.has(normalizedTopic)) {
          topicMap.set(normalizedTopic, []);
        }
        topicMap.get(normalizedTopic)!.push(lesson);
        
        // Also add the original topic name
        if (!topicMap.has(topic)) {
          topicMap.set(topic, []);
        }
        topicMap.get(topic)!.push(lesson);
      }
    }
    
    return topicMap;
  } catch (error) {
    logger.error('Error building topic to lessons map:', error);
    return topicMap;
  }
};

/**
 * Get curriculum progress summary for a section
 */
export const getCurriculumProgress = async (
  lessonProgress: Record<string, number>,
  section: ExamSection,
  courseId: CourseId = 'cpa'
): Promise<{
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  totalTopics: number;
  coveredTopics: number;
  tbsUnlocked: number;
  tbsTotal: number;
}> => {
  try {
    const lessons = await fetchLessonsBySection(section, courseId);
    const coveredTopicsSet = await getCoveredTopics(lessonProgress, section, courseId);
    const tbsStatus = await getUnlockedTBSTypes(section, lessonProgress, courseId);
    
    // Calculate lesson counts
    let completedLessons = 0;
    let inProgressLessons = 0;
    const allTopics = new Set<string>();
    
    for (const lesson of lessons) {
      const progress = lessonProgress[lesson.id] || 0;
      
      if (progress >= LESSON_COMPLETION_THRESHOLD) {
        completedLessons++;
      } else if (progress > 0) {
        inProgressLessons++;
      }
      
      for (const topic of lesson.topics) {
        allTopics.add(normalizeTopicName(topic));
      }
    }
    
    return {
      totalLessons: lessons.length,
      completedLessons,
      inProgressLessons,
      totalTopics: allTopics.size,
      coveredTopics: coveredTopicsSet.size,
      tbsUnlocked: tbsStatus.filter(t => t.isUnlocked).length,
      tbsTotal: tbsStatus.length,
    };
  } catch (error) {
    logger.error('Error getting curriculum progress:', error);
    return {
      totalLessons: 0,
      completedLessons: 0,
      inProgressLessons: 0,
      totalTopics: 0,
      coveredTopics: 0,
      tbsUnlocked: 0,
      tbsTotal: 0,
    };
  }
};

export default {
  getCoveredTopics,
  getPreviewTopics,
  filterQuestionsByCoveredTopics,
  checkTBSUnlocked,
  getUnlockedTBSTypes,
  buildTopicToLessonsMap,
  getCurriculumProgress,
  topicsMatch,
  TBS_TOPIC_REQUIREMENTS,
};
