/**
 * CISA Course Module
 * Certified Information Systems Auditor (ISACA)
 */

// Re-export CISA_COURSE from config (single source of truth)
export { CISA_COURSE, CISA_SECTIONS, CISA_SECTION_CONFIG, CISA_SECTION_IDS, getCISASection } from './config';
export type { CISASectionId, CISASectionConfig } from './config';
export { CISA_PASS_GUARANTEE, PASS_GUARANTEE_SUMMARY, checkPassGuaranteeEligibility } from './pass-guarantee';
export type { PassGuaranteeConfig, UserProgress } from './pass-guarantee';
