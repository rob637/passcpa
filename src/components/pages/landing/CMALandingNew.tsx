/**
 * CMA Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import { useCourseSchema } from '../../../hooks/useStructuredData';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CMA_CONFIG } from './ExamLandingData';

const CMALandingNew = () => {
  useSEO({
    title: LANDING_SEO.cma.title,
    description: LANDING_SEO.cma.description,
    canonicalUrl: 'https://voraprep.com/cma',
  });
  useCourseSchema('cma');

  return <ExamLandingTemplate config={CMA_CONFIG} />;
};

export default CMALandingNew;
