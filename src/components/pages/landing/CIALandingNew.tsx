/**
 * CIA Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import { useCourseSchema } from '../../../hooks/useStructuredData';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CIA_CONFIG } from './ExamLandingData';

const CIALandingNew = () => {
  useSEO({
    title: LANDING_SEO.cia.title,
    description: LANDING_SEO.cia.description,
    canonicalUrl: 'https://voraprep.com/cia',
  });
  useCourseSchema('cia');

  return <ExamLandingTemplate config={CIA_CONFIG} />;
};

export default CIALandingNew;
