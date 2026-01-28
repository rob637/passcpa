import { describe, it, expect } from 'vitest';

// Test module exports and structure - avoid complex component rendering
describe('LessonMatrix module', () => {
  it('exports LessonMatrix component', async () => {
    const module = await import('../../../components/pages/LessonMatrix');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });
});

// Test related utilities
describe('Lesson utilities', () => {
  describe('getAllLessons', () => {
    it('returns array of lessons', async () => {
      const { getAllLessons } = await import('../../../data/lessons');
      const lessons = getAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
    });
  });

  describe('LESSON_MATRIX', () => {
    it('exports lesson matrix data', async () => {
      const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
      expect(Array.isArray(LESSON_MATRIX)).toBe(true);
    });

    it('exports getObbbaAffectedLessons', async () => {
      const { getObbbaAffectedLessons } = await import('../../../data/lessonMatrix');
      expect(typeof getObbbaAffectedLessons).toBe('function');
    });

    it('exports getDifferingLessons', async () => {
      const { getDifferingLessons } = await import('../../../data/lessonMatrix');
      expect(typeof getDifferingLessons).toBe('function');
    });

    it('exports getLessonBlueprintVersion', async () => {
      const { getLessonBlueprintVersion } = await import('../../../data/lessonMatrix');
      expect(typeof getLessonBlueprintVersion).toBe('function');
    });

    it('getObbbaAffectedLessons returns array', async () => {
      const { getObbbaAffectedLessons } = await import('../../../data/lessonMatrix');
      const affected = getObbbaAffectedLessons();
      expect(Array.isArray(affected)).toBe(true);
    });

    it('getDifferingLessons returns array', async () => {
      const { getDifferingLessons } = await import('../../../data/lessonMatrix');
      const differing = getDifferingLessons();
      expect(Array.isArray(differing)).toBe(true);
    });
  });
});
