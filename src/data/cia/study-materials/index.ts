/**
 * CIA Study Materials Index
 * 
 * Comprehensive study guides for all three CIA exam parts
 */

export { CIA1_STUDY_GUIDE, default as CIA1StudyGuide } from './cia1-study-guide';
export { CIA2_STUDY_GUIDE, default as CIA2StudyGuide } from './cia2-study-guide';
export { CIA3_STUDY_GUIDE, default as CIA3StudyGuide } from './cia3-study-guide';

export type { 
  CIAStudyGuide, 
  CIADomain, 
  TopicDetail, 
  StudyWeek 
} from './cia1-study-guide';

// Helper functions
export const getAllCIAStudyGuides = async () => {
  const [cia1, cia2, cia3] = await Promise.all([
    import('./cia1-study-guide'),
    import('./cia2-study-guide'),
    import('./cia3-study-guide'),
  ]);
  return [cia1.CIA1_STUDY_GUIDE, cia2.CIA2_STUDY_GUIDE, cia3.CIA3_STUDY_GUIDE];
};

export const getCIAStudyGuideByPart = async (part: 'CIA1' | 'CIA2' | 'CIA3') => {
  switch (part) {
    case 'CIA1':
      return (await import('./cia1-study-guide')).CIA1_STUDY_GUIDE;
    case 'CIA2':
      return (await import('./cia2-study-guide')).CIA2_STUDY_GUIDE;
    case 'CIA3':
      return (await import('./cia3-study-guide')).CIA3_STUDY_GUIDE;
  }
};
