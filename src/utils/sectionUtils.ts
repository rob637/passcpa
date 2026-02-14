/**
 * Section Utilities
 * 
 * Course-agnostic utilities for working with exam sections.
 * Use these instead of importing CPA_SECTIONS directly to support multi-course.
 */

import { ExamSectionConfig, Course } from '../types/course';
import { CPA_SECTIONS } from '../config/examConfig';
import { COURSES } from '../courses';

/**
 * Get section configuration by ID from a course
 */
export function getSectionById(course: Course, sectionId: string): ExamSectionConfig | undefined {
  return course.sections.find(s => s.id === sectionId);
}

/**
 * Get section display info (name, color, icon) - backwards compatible with CPA_SECTIONS format
 */
export interface SectionDisplayInfo {
  name: string;
  shortName: string;
  description?: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon?: string;
  weight?: string;
}

/**
 * Get display info for a section across any course
 * Falls back to CPA_SECTIONS for CPA sections to maintain backwards compatibility
 */
export function getSectionDisplayInfo(sectionId: string, courseId: string = 'cpa'): SectionDisplayInfo | null {
  // Try CPA_SECTIONS first for CPA course (maintains exact styling)
  if (courseId === 'cpa' && sectionId in CPA_SECTIONS) {
    const cpaSectionInfo = CPA_SECTIONS[sectionId as keyof typeof CPA_SECTIONS];
    return {
      name: cpaSectionInfo.name,
      shortName: sectionId,
      description: cpaSectionInfo.description,
      color: cpaSectionInfo.color,
      bgColor: cpaSectionInfo.bgColor ?? `${cpaSectionInfo.color}20`,
      textColor: cpaSectionInfo.textColor ?? cpaSectionInfo.color,
      icon: cpaSectionInfo.icon,
    };
  }
  
  // Otherwise get from course config
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return null;
  
  const section = course.sections.find(s => s.id === sectionId);
  if (!section) return null;
  
  // Generate default colors based on section index
  const sectionIndex = course.sections.indexOf(section);
  const colors = [
    { color: 'blue', bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-600 dark:text-blue-400' },
    { color: 'green', bgColor: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-600 dark:text-green-400' },
    { color: 'purple', bgColor: 'bg-purple-100 dark:bg-purple-900/30', textColor: 'text-purple-600 dark:text-purple-400' },
    { color: 'orange', bgColor: 'bg-orange-100 dark:bg-orange-900/30', textColor: 'text-orange-600 dark:text-orange-400' },
    { color: 'teal', bgColor: 'bg-teal-100 dark:bg-teal-900/30', textColor: 'text-teal-600 dark:text-teal-400' },
    { color: 'pink', bgColor: 'bg-pink-100 dark:bg-pink-900/30', textColor: 'text-pink-600 dark:text-pink-400' },
  ];
  const colorSet = colors[sectionIndex % colors.length];
  
  return {
    name: section.name,
    shortName: section.shortName,
    weight: section.weight,
    ...colorSet,
  };
}

/**
 * Get all sections for a course as a map (similar to CPA_SECTIONS format)
 */
export function getSectionsMap(courseId: string = 'cpa'): Record<string, SectionDisplayInfo> {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return {};
  
  const result: Record<string, SectionDisplayInfo> = {};
  for (const section of course.sections) {
    const info = getSectionDisplayInfo(section.id, courseId);
    if (info) {
      result[section.id] = info;
    }
  }
  return result;
}

/**
 * Check if a section ID is valid for a given course
 */
export function isValidSection(sectionId: string, courseId: string = 'cpa'): boolean {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return false;
  return course.sections.some(s => s.id === sectionId);
}

/**
 * Get current section for a course, validating profile section against course
 * Use this when you want a valid section for the current course, falling back to default
 */
export function getCurrentSectionForCourse(
  profileSection: string | undefined | null,
  courseId: string
): string {
  // Only use profile section if it's valid for the current course
  if (profileSection && isValidSection(profileSection, courseId)) {
    return profileSection;
  }
  return getDefaultSection(courseId);
}

/**
 * Get the first/default section for a course
 */
export function getDefaultSection(courseId: string = 'cpa'): string {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course || course.sections.length === 0) return 'FAR'; // Fallback
  return course.sections[0].id;
}

/**
 * Study unit definition for study journey
 */
export interface StudyUnitDef {
  id: string;
  name: string;
  blueprintPrefix: string;
}

/**
 * CPA-specific unit definitions (more detailed than blueprint areas for study journey)
 * These are the Becker-style unit names (F1, A1, etc.)
 */
const CPA_UNIT_DEFINITIONS: Record<string, StudyUnitDef[]> = {
  FAR: [
    { id: 'F1', name: 'Conceptual Framework', blueprintPrefix: 'FAR-I' },
    { id: 'F2', name: 'Financial Statement Accounts', blueprintPrefix: 'FAR-II' },
    { id: 'F3', name: 'Transactions', blueprintPrefix: 'FAR-III' },
    { id: 'F4', name: 'State & Local Government', blueprintPrefix: 'FAR-IV' },
    { id: 'F5', name: 'Not-for-Profit Entities', blueprintPrefix: 'FAR-V' },
  ],
  AUD: [
    { id: 'A1', name: 'Ethics & Professional Responsibilities', blueprintPrefix: 'AUD-I' },
    { id: 'A2', name: 'Risk Assessment & Planning', blueprintPrefix: 'AUD-II' },
    { id: 'A3', name: 'Performing Procedures & Evidence', blueprintPrefix: 'AUD-III' },
    { id: 'A4', name: 'Forming Conclusions & Reporting', blueprintPrefix: 'AUD-IV' },
  ],
  REG: [
    { id: 'R1', name: 'Ethics & Federal Tax Procedures', blueprintPrefix: 'REG-I' },
    { id: 'R2', name: 'Business Law', blueprintPrefix: 'REG-II' },
    { id: 'R3', name: 'Federal Taxation of Property', blueprintPrefix: 'REG-III' },
    { id: 'R4', name: 'Federal Taxation of Individuals', blueprintPrefix: 'REG-IV' },
    { id: 'R5', name: 'Federal Taxation of Entities', blueprintPrefix: 'REG-V' },
  ],
  BAR: [
    { id: 'B1', name: 'Business Analysis', blueprintPrefix: 'BAR-I' },
    { id: 'B2', name: 'Technical Accounting', blueprintPrefix: 'BAR-II' },
    { id: 'B3', name: 'State & Local Government', blueprintPrefix: 'BAR-III' },
    { id: 'B4', name: 'Not-for-Profit Accounting', blueprintPrefix: 'BAR-IV' },
    { id: 'B5', name: 'Financial Management', blueprintPrefix: 'BAR-V' },
  ],
  ISC: [
    { id: 'I1', name: 'IT Governance & Risk', blueprintPrefix: 'ISC-I' },
    { id: 'I2', name: 'Security & Controls', blueprintPrefix: 'ISC-II' },
    { id: 'I3', name: 'SOC Engagements', blueprintPrefix: 'ISC-III' },
    { id: 'I4', name: 'Data Management', blueprintPrefix: 'ISC-IV' },
  ],
  TCP: [
    { id: 'T1', name: 'Tax Compliance', blueprintPrefix: 'TCP-I' },
    { id: 'T2', name: 'Individual Tax Planning', blueprintPrefix: 'TCP-II' },
    { id: 'T3', name: 'Entity Tax Planning', blueprintPrefix: 'TCP-III' },
    { id: 'T4', name: 'Property Transactions', blueprintPrefix: 'TCP-IV' },
    { id: 'T5', name: 'Gift & Estate Tax', blueprintPrefix: 'TCP-V' },
  ],
};

/**
 * Get study units for a section - course-aware
 * 
 * For CPA: Returns Becker-style units (F1, A1, etc.)
 * For other courses: Generates units from blueprint areas in course config
 * 
 * This allows StudyJourney to work for any course without hardcoding.
 */
export function getStudyUnits(sectionId: string, courseId: string = 'cpa'): StudyUnitDef[] {
  // CPA uses custom unit names (Becker-style)
  if (courseId === 'cpa' && sectionId in CPA_UNIT_DEFINITIONS) {
    return CPA_UNIT_DEFINITIONS[sectionId];
  }
  
  // For other courses, derive from blueprint areas
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return [];
  
  const section = course.sections.find(s => s.id === sectionId);
  if (!section || !section.blueprintAreas) return [];
  
  // Generate unit definitions from blueprint areas
  return section.blueprintAreas.map((area, index) => {
    // Create short unit ID (e.g., SEE1-1 -> E1-1, CIA1-I -> C1-1)
    const prefix = sectionId.charAt(0);
    const partNum = sectionId.replace(/\D/g, '') || '1';
    const unitNum = index + 1;
    
    return {
      id: `${prefix}${partNum}-${unitNum}`,
      name: area.name,
      blueprintPrefix: area.id,
    };
  });
}

/**
 * Get all section IDs for a course
 */
export function getSectionIds(courseId: string = 'cpa'): string[] {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return [];
  return course.sections.map(s => s.id);
}

/**
 * Blueprint area with shortName for UI display
 */
export interface BlueprintAreaDisplay {
  id: string;
  name: string;
  shortName: string;
  weight?: string;
  topics?: string[];
}

/**
 * Get blueprint areas for a section from course config
 * Single source of truth for all blueprint area data
 */
export function getBlueprintAreas(sectionId: string, courseId: string = 'cpa'): BlueprintAreaDisplay[] {
  const course = COURSES[courseId as keyof typeof COURSES];
  if (!course) return [];
  
  const section = course.sections.find(s => s.id === sectionId);
  if (!section?.blueprintAreas) return [];
  
  return section.blueprintAreas.map(area => ({
    id: area.id,
    name: area.name,
    // Generate shortName from the name (take first significant word or last part after colon)
    shortName: generateShortName(area.name),
    weight: area.weight,
    topics: area.topics,
  }));
}

/**
 * Generate a short display name from a full blueprint area name
 */
function generateShortName(name: string): string {
  // If name has a colon, take the part after it
  if (name.includes(':')) {
    const afterColon = name.split(':')[1].trim();
    // Take first two words max
    return afterColon.split(' ').slice(0, 2).join(' ');
  }
  
  // Common patterns to shorten
  const shortenings: Record<string, string> = {
    'Ethics, Professional Responsibilities': 'Ethics',
    'Not-for-Profit': 'NFP',
    'State and Local Government': "Gov't",
    'Information Systems': 'Systems',
    'Tax Compliance': 'Compliance',
    'Tax Planning': 'Planning',
    'Property Transactions': 'Property',
    'Business Entities': 'Entities',
    'Individuals': 'Individual',
    'Preliminary Work': 'Prelim',
    'Income and Assets': 'Income',
    'Deductions and Credits': 'Deductions',
    'Specialized Returns': 'Specialized',
    'Financial Reporting': 'Reporting',
    'Financial Statement': 'Fin Stmt',
    'Internal Audit': 'IA',
  };
  
  for (const [pattern, short] of Object.entries(shortenings)) {
    if (name.includes(pattern)) return short;
  }
  
  // Default: take first two significant words
  const words = name.split(' ').filter(w => w.length > 2 && !['and', 'the', 'for', 'of'].includes(w.toLowerCase()));
  return words.slice(0, 2).join(' ') || name.substring(0, 15);
}
