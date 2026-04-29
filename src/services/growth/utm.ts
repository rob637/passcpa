/**
 * UTM tagging helper. Append consistent UTM params to any landing URL
 * so Google Analytics / Stripe checkout attribution works end-to-end.
 */

export interface UtmParams {
  source: string;     // 'google'
  medium: string;     // 'cpc'
  campaign: string;   // 'cpa-prep' | 'cpa-daily'
  term?: string;      // {keyword} — Google Ads ValueTrack
  content?: string;   // ad-group / ad-variant / sitelink id
}

/**
 * Append UTM parameters to a URL. Existing params are preserved; UTMs win on conflict.
 * Uses Google Ads ValueTrack tokens by default for term ({keyword}) and content ({adgroupname}).
 */
export function withUtm(url: string, params: UtmParams): string {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', params.source);
    u.searchParams.set('utm_medium', params.medium);
    u.searchParams.set('utm_campaign', params.campaign);
    u.searchParams.set('utm_term', params.term ?? '{keyword}');
    u.searchParams.set('utm_content', params.content ?? '{adgroupname}');
    return u.toString();
  } catch {
    // Fallback for non-absolute URLs
    const sep = url.includes('?') ? '&' : '?';
    const qs = new URLSearchParams({
      utm_source: params.source,
      utm_medium: params.medium,
      utm_campaign: params.campaign,
      utm_term: params.term ?? '{keyword}',
      utm_content: params.content ?? '{adgroupname}',
    }).toString();
    return `${url}${sep}${qs}`;
  }
}
