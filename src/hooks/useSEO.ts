import { useEffect } from 'react';
import { COURSE_DISPLAY_STATS, TOTAL_DISPLAY } from '../config/contentStats';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

/**
 * Hook to set SEO meta tags for a page
 * Updates document title, meta description, and Open Graph tags
 * 
 * @example
 * useSEO({
 *   title: 'CPA Exam Prep',
 *   description: 'Free AI-powered CPA exam prep with 5,000+ questions.',
 *   canonicalUrl: 'https://voraprep.com/cpa'
 * });
 */
export const useSEO = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/og-image.png',
}: SEOProps) => {
  useEffect(() => {
    const baseTitle = 'VoraPrep';
    
    // Set document title
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Update or create meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (title) {
      setOgTag('og:title', `${title} | ${baseTitle}`);
    }
    if (description) {
      setOgTag('og:description', description);
    }
    if (ogType) {
      setOgTag('og:type', ogType);
    }
    if (ogImage) {
      setOgTag('og:image', ogImage);
    }

    // Set canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
      setOgTag('og:url', canonicalUrl);
    }

    // Announce to screen readers
    const announcement = document.getElementById('route-announcement');
    if (announcement) {
      announcement.textContent = `Navigated to ${title || 'page'}`;
    }

    // Cleanup: reset title on unmount
    return () => {
      document.title = baseTitle;
    };
  }, [title, description, canonicalUrl, ogType, ogImage]);
};

/**
 * SEO metadata for all landing pages
 */
export const LANDING_SEO = {
  home: {
    title: 'Free AI-Powered Exam Prep',
    description: `VoraPrep offers free AI-powered exam prep for CPA, EA, CMA, CIA, CFP, and CISA certifications. ${TOTAL_DISPLAY.questions} practice questions with adaptive learning.`,
  },
  cpa: {
    title: 'CPA Exam Prep',
    description: `Pass your CPA exam with VoraPrep's free AI-powered prep. ${COURSE_DISPLAY_STATS.cpa.questions} questions, adaptive learning, SM-2 spaced repetition. 2025 & 2026 blueprint ready.`,
  },
  ea: {
    title: 'Enrolled Agent (EA) Exam Prep',
    description: `Free EA exam prep for the Special Enrollment Examination. ${COURSE_DISPLAY_STATS.ea.questions} questions covering all 3 SEE parts. AI-powered adaptive learning.`,
  },
  cma: {
    title: 'CMA Exam Prep',
    description: `Free CMA exam prep with ${COURSE_DISPLAY_STATS.cma.questions} practice questions. Master financial planning, performance management, and cost management with AI-powered learning.`,
  },
  cia: {
    title: 'CIA Exam Prep',
    description: `Free CIA exam prep covering all 3 parts. ${COURSE_DISPLAY_STATS.cia.questions} practice questions for internal audit certification with adaptive AI learning.`,
  },
  cfp: {
    title: 'CFP Exam Prep',
    description: `Free CFP exam prep covering all 8 CFP Board knowledge domains. ${COURSE_DISPLAY_STATS.cfp.questions} questions with AI-powered adaptive learning.`,
  },
  cisa: {
    title: 'CISA Exam Prep',
    description: `Free CISA exam prep for IT auditors. ${COURSE_DISPLAY_STATS.cisa.questions} questions covering all 5 ISACA domains with AI-powered learning.`,
  },
};

export default useSEO;
