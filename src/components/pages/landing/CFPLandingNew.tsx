/**
 * CFP Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CFP_CONFIG } from './ExamLandingData';

const CFPLandingNew = () => {
  useSEO({
    title: LANDING_SEO.cfp.title,
    description: LANDING_SEO.cfp.description,
    canonicalUrl: 'https://voraprep.com/cfp',
  });

  return <ExamLandingTemplate config={CFP_CONFIG} />;
};

export default CFPLandingNew;
