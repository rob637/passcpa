import { describe, it, expect } from 'vitest';
import {
  buildContentGenerationPrompt,
  generateFullContentMatrix,
  getContentPipelineSummary,
} from '../../services/growth/contentEngine';

describe('contentEngine growth briefs', () => {
  it('expands the content matrix with 60 more wow-factor CPA briefs', () => {
    const summary = getContentPipelineSummary();
    const briefs = generateFullContentMatrix();

    expect(summary.totalBriefs).toBeGreaterThanOrEqual(350);
    expect(summary.byType['cheat-sheet']).toBeGreaterThanOrEqual(27);
    expect(summary.byType['career-guide']).toBeGreaterThanOrEqual(6);
    expect(summary.byType['news-update']).toBeGreaterThanOrEqual(6);
    expect(summary.byType['case-study']).toBeGreaterThanOrEqual(6);
    expect(summary.byType['topic-explainer']).toBeGreaterThanOrEqual(147);

    expect(briefs.some(entry => entry.slug.includes('far-consolidations'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('aud-audit-sampling'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('reg-partnership-basis'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('isc-zero-trust'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('tcp-advanced-entity-basis'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('far-consolidations-trap-guide'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('aud-audit-sampling-decision-tree'))).toBe(true);
    expect(briefs.some(entry => entry.slug.includes('reg-partnership-basis-mini-case'))).toBe(true);
  });

  it('tells the generator to teach with links, references, and memorable coaching', () => {
    const brief = generateFullContentMatrix().find(
      entry => entry.slug.includes('far-consolidations') || (entry.courseId === 'cpa' && entry.section === 'FAR'),
    );

    expect(brief).toBeTruthy();

    const prompt = buildContentGenerationPrompt(brief!);

    expect(prompt).toContain('Related VoraPrep resources');
    expect(prompt).toContain('Official resources and references');
    expect(prompt).toMatch(/2-4 of these internal links|2–4 of these internal links/);
    expect(prompt).toContain('worked example');
    expect(prompt).toContain('analogy');
    expect(prompt).toContain('common traps');
    expect(prompt).toContain('quick self-check');
    expect(prompt).toContain('decision tree');
    expect(prompt).toContain('aha moment');
    expect(prompt).toContain('trap-vs-truth');
  });
});
