/**
 * Written Communication Service - DEPRECATED
 * 
 * Written Communication (WC) was removed from the CPA Exam when BEC was retired
 * on December 15, 2023. The CPA Evolution exam introduced Task-Based Simulations (TBS)
 * as the sole simulation type across all sections.
 * 
 * This service is retained as a stub for backward compatibility but returns empty results.
 * 
 * @deprecated Written Communication is no longer part of the CPA Exam (retired Dec 2023)
 */

import { WCTask, WCRubric, ExamSection } from '../types';
import logger from '../utils/logger';

// Legacy rubric - retained for reference only
export const WC_RUBRIC: WCRubric = {
  organization: {
    weight: 0.25,
    criteria: [
      'Clear opening that addresses the task',
      'Logical flow of ideas',
      'Effective transitions',
      'Strong conclusion',
    ],
  },
  development: {
    weight: 0.4,
    criteria: [
      'Addresses all aspects of the task',
      'Provides relevant examples',
      'Demonstrates understanding of concepts',
      'Sufficient depth of analysis',
    ],
  },
  expression: {
    weight: 0.35,
    criteria: [
      'Professional business tone',
      'Correct grammar and punctuation',
      'Appropriate vocabulary',
      'Clear and concise language',
    ],
  },
};

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function fetchAllWCTasks(): Promise<WCTask[]> {
  logger.warn('fetchAllWCTasks called - WC was retired with BEC on December 15, 2023');
  return [];
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function fetchWCTasksBySection(_section: ExamSection): Promise<WCTask[]> {
  logger.warn('fetchWCTasksBySection called - WC was retired with BEC on December 15, 2023');
  return [];
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function fetchWCTaskById(_taskId: string): Promise<WCTask | null> {
  logger.warn('fetchWCTaskById called - WC was retired with BEC on December 15, 2023');
  return null;
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function getRandomWCTask(_section?: ExamSection): Promise<WCTask | null> {
  logger.warn('getRandomWCTask called - WC was retired with BEC on December 15, 2023');
  return null;
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function searchWCTasks(_searchTerm: string): Promise<WCTask[]> {
  logger.warn('searchWCTasks called - WC was retired with BEC on December 15, 2023');
  return [];
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export function clearWCCache(): void {
  // No-op - no cache to clear
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function getWCStats(): Promise<{ section: string; count: number }[]> {
  logger.warn('getWCStats called - WC was retired with BEC on December 15, 2023');
  return [];
}

/**
 * @deprecated WC was removed from the CPA Exam December 15, 2023
 */
export async function getWCTotalCount(): Promise<number> {
  return 0;
}
