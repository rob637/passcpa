/**
 * CPA Course Module
 * 
 * Re-exports all CPA-specific configurations and utilities.
 */

export { 
  CPA_COURSE, 
  CPA_SECTIONS, 
  getCPASection,
  CPA_SECTION_CONFIG,
  CPA_CORE_SECTIONS,
  CPA_DISCIPLINE_SECTIONS,
} from './config';
export type { 
  CPASectionId, 
  CPACoreSectionId, 
  CPADisciplineSectionId,
  CPASectionConfig,
} from './config';
