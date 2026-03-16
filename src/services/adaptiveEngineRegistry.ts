/**
 * Adaptive Engine Registry
 * Maps course IDs to their respective adaptive engine modules.
 * This declarative map allows for clean auto-discovery without fragile regex manipulation.
 */

export const ADAPTIVE_ENGINES: Record<string, () => Promise<any>> = {
  cpa: () => import('./cpaAdaptiveEngine'),
  ea: () => import('./eaAdaptiveEngine'),
  cma: () => import('./cmaAdaptiveEngine'),
  cia: () => import('./ciaAdaptiveEngine'),
  cisa: () => import('./cisaAdaptiveEngine'),
  cfp: () => import('./cfpAdaptiveEngine'),
};
