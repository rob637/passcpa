/**
 * EA Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import { useCourseSchema } from '../../../hooks/useStructuredData';
import ExamLandingTemplate from './ExamLandingTemplate';
import { EA_CONFIG } from './ExamLandingData';

const EALandingNew = () => {
  useSEO({
    title: LANDING_SEO.ea.title,
    description: LANDING_SEO.ea.description,
    canonicalUrl: 'https://voraprep.com/ea-prep',
  });
  useCourseSchema('ea');

  return <ExamLandingTemplate config={EA_CONFIG} />;
};

export default EALandingNew;
