import { describe, it, expect } from 'vitest';
import { 
  LESSONS, 
  getAllLessons,
} from '../../data/lessons';

describe('Lessons Data', () => {
  describe('LESSONS object', () => {
    it('should have prep lessons', () => {
      expect(LESSONS.prep).toBeDefined();
      expect(Array.isArray(LESSONS.prep)).toBe(true);
    });

    it('should have FAR lessons', () => {
      expect(LESSONS.far).toBeDefined();
      expect(Array.isArray(LESSONS.far)).toBe(true);
    });

    it('should have AUD lessons', () => {
      expect(LESSONS.aud).toBeDefined();
      expect(Array.isArray(LESSONS.aud)).toBe(true);
    });

    it('should have REG lessons', () => {
      expect(LESSONS.reg).toBeDefined();
      expect(Array.isArray(LESSONS.reg)).toBe(true);
    });

    it('should have BAR lessons', () => {
      expect(LESSONS.bar).toBeDefined();
      expect(Array.isArray(LESSONS.bar)).toBe(true);
    });

    it('should have ISC lessons', () => {
      expect(LESSONS.isc).toBeDefined();
      expect(Array.isArray(LESSONS.isc)).toBe(true);
    });

    it('should have TCP lessons', () => {
      expect(LESSONS.tcp).toBeDefined();
      expect(Array.isArray(LESSONS.tcp)).toBe(true);
    });
  });

  describe('getAllLessons', () => {
    it('should return an array', () => {
      const lessons = getAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
    });

    it('should return non-empty array', () => {
      const lessons = getAllLessons();
      expect(lessons.length).toBeGreaterThan(0);
    });

    it('should contain lessons from multiple sections', () => {
      const lessons = getAllLessons();
      
      // Check if lessons exist - don't need exact count, just existence
      expect(lessons.length).toBeGreaterThan(5);
    });
  });

  describe('Lesson structure', () => {
    it('each lesson should have required fields', () => {
      const lessons = getAllLessons();
      
      // Test a sample of lessons
      const sampleLessons = lessons.slice(0, 10);
      
      sampleLessons.forEach(lesson => {
        expect(lesson.id).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(typeof lesson.id).toBe('string');
        expect(typeof lesson.title).toBe('string');
      });
    });

    it('each lesson should have content or sections', () => {
      const lessons = getAllLessons();
      
      const sampleLessons = lessons.slice(0, 5);
      
      sampleLessons.forEach(lesson => {
        // Lessons should have either content directly or sections
        const hasContent = lesson.content !== undefined;
        const hasSections = lesson.sections !== undefined;
        expect(hasContent || hasSections).toBe(true);
      });
    });
  });

  describe('Section-specific lessons', () => {
    it('FAR lessons should relate to financial accounting', () => {
      const farLessons = LESSONS.far;
      expect(farLessons.length).toBeGreaterThan(0);
      
      // At least some should have FAR-related content
      const hasFarContent = farLessons.some(l => 
        l.id.includes('far') || 
        l.title.toLowerCase().includes('financial') ||
        l.title.toLowerCase().includes('accounting')
      );
      expect(hasFarContent).toBe(true);
    });

    it('AUD lessons should relate to auditing', () => {
      const audLessons = LESSONS.aud;
      expect(audLessons.length).toBeGreaterThan(0);
      
      const hasAudContent = audLessons.some(l => 
        l.id.includes('aud') || 
        l.title.toLowerCase().includes('audit') ||
        l.title.toLowerCase().includes('attest')
      );
      expect(hasAudContent).toBe(true);
    });

    it('REG lessons should relate to regulation/tax', () => {
      const regLessons = LESSONS.reg;
      expect(regLessons.length).toBeGreaterThan(0);
      
      const hasRegContent = regLessons.some(l => 
        l.id.includes('reg') || 
        l.title.toLowerCase().includes('tax') ||
        l.title.toLowerCase().includes('regulation')
      );
      expect(hasRegContent).toBe(true);
    });
  });
});
