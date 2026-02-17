/**
 * CPA Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import { useCourseSchema } from '../../../hooks/useStructuredData';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CPA_CONFIG } from './ExamLandingData';

const CPALandingNew = () => {
  useSEO({
    title: LANDING_SEO.cpa.title,
    description: LANDING_SEO.cpa.description,
    canonicalUrl: 'https://voraprep.com/cpa',
  });
  useCourseSchema('cpa');

  return <ExamLandingTemplate config={CPA_CONFIG} />;
};

export default CPALandingNew;
