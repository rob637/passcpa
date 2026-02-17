/**
 * CFP Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import { useCourseSchema } from '../../../hooks/useStructuredData';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CFP_CONFIG } from './ExamLandingData';

const CFPLandingNew = () => {
  useSEO({
    title: LANDING_SEO.cfp.title,
    description: LANDING_SEO.cfp.description,
    canonicalUrl: 'https://voraprep.com/cfp',
  });
  useCourseSchema('cfp');

  return <ExamLandingTemplate config={CFP_CONFIG} />;
};

export default CFPLandingNew;
