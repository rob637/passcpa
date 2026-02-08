/**
 * CISA Landing Page - Uses unified template
 */
import { useSEO, LANDING_SEO } from '../../../hooks/useSEO';
import ExamLandingTemplate from './ExamLandingTemplate';
import { CISA_CONFIG } from './ExamLandingData';

const CISALandingNew = () => {
  useSEO({
    title: LANDING_SEO.cisa.title,
    description: LANDING_SEO.cisa.description,
    canonicalUrl: 'https://voraprep.com/cisa',
  });

  return <ExamLandingTemplate config={CISA_CONFIG} />;
};

export default CISALandingNew;
