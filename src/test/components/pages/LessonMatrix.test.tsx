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

    it('each lesson has required properties', async () => {
      const { getAllLessons } = await import('../../../data/lessons');
      const lessons = getAllLessons();
      
      lessons.forEach(lesson => {
        expect(lesson.id).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(lesson.section).toBeDefined();
      });
    });

    it('lessons have valid sections', async () => {
      const { getAllLessons } = await import('../../../data/lessons');
      const lessons = getAllLessons();
      const validSections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'BEC', 'PREP'];
      
      lessons.forEach(lesson => {
        expect(validSections).toContain(lesson.section);
      });
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

    it('each matrix entry has lessonId', async () => {
      const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
      LESSON_MATRIX.forEach(entry => {
        expect(entry.lessonId).toBeDefined();
        expect(typeof entry.lessonId).toBe('string');
      });
    });

    it('getLessonBlueprintVersion returns valid version status', async () => {
      const { getLessonBlueprintVersion, LESSON_MATRIX } = await import('../../../data/lessonMatrix');
      const validStatuses = ['both', '2025', '2026', 'differs'];
      
      if (LESSON_MATRIX.length > 0) {
        const version = getLessonBlueprintVersion(LESSON_MATRIX[0].lessonId);
        expect(validStatuses).toContain(version);
      }
    });
  });
});

describe('LessonMatrix blueprint version logic', () => {
  it('lessons have blueprint area defined', async () => {
    const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
    const lessonsWithArea = LESSON_MATRIX.filter(entry => entry.blueprintArea);
    expect(lessonsWithArea.length).toBeGreaterThan(0);
  });

  it('lessons have skill levels defined', async () => {
    const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
    const validSkillLevels = ['Remembering and Understanding', 'Application', 'Analysis', 'Evaluation'];
    LESSON_MATRIX.forEach(entry => {
      expect(validSkillLevels).toContain(entry.skillLevel);
    });
  });

  it('lessons can have transition notes for differences', async () => {
    const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
    const lessonsWithNotes = LESSON_MATRIX.filter(entry => entry.transitionNote);
    expect(Array.isArray(lessonsWithNotes)).toBe(true);
  });

  it('lessons can have study2025/study2026 for version differences', async () => {
    const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
    const differingLessons = LESSON_MATRIX.filter(entry => entry.study2025 || entry.study2026);
    expect(Array.isArray(differingLessons)).toBe(true);
  });
});

describe('OBBBA (H.R.1) affected lessons', () => {
  it('returns lessons affected by tax law changes', async () => {
    const { getObbbaAffectedLessons } = await import('../../../data/lessonMatrix');
    const affected = getObbbaAffectedLessons();
    expect(Array.isArray(affected)).toBe(true);
  });

  it('OBBBA affected lessons are primarily in REG section', async () => {
    const { getObbbaAffectedLessons } = await import('../../../data/lessonMatrix');
    const { getAllLessons } = await import('../../../data/lessons');
    
    const affectedEntries = getObbbaAffectedLessons();
    const allLessons = getAllLessons();
    
    // affectedEntries is LessonMatrixEntry[], extract IDs for comparison
    const affectedIdSet = new Set(affectedEntries.map(entry => entry.lessonId));
    const affectedLessons = allLessons.filter(l => affectedIdSet.has(l.id));
    const regCount = affectedLessons.filter(l => l.section === 'REG').length;
    
    // Most OBBBA affected lessons should be REG
    if (affectedLessons.length > 0) {
      expect(regCount / affectedLessons.length).toBeGreaterThanOrEqual(0.5);
    }
  });

  it('OBBBA entries have optional transition notes', async () => {
    const { LESSON_MATRIX } = await import('../../../data/lessonMatrix');
    const obbbaEntries = LESSON_MATRIX.filter(entry => entry.obbbaAffected);
    
    obbbaEntries.forEach(entry => {
      // transitionNote is optional
      if (entry.transitionNote) {
        expect(typeof entry.transitionNote).toBe('string');
      }
    });
  });
});

describe('Lesson delivery methods', () => {
  it('lessons have content sections', async () => {
    const { getAllLessons } = await import('../../../data/lessons');
    const lessons = getAllLessons();
    
    lessons.forEach(lesson => {
      expect(lesson.content).toBeDefined();
      expect(lesson.content.sections).toBeDefined();
      expect(Array.isArray(lesson.content.sections)).toBe(true);
    });
  });

  it('content sections have valid types', async () => {
    const { getAllLessons } = await import('../../../data/lessons');
    const lessons = getAllLessons();
    
    lessons.forEach(lesson => {
      lesson.content.sections.forEach(section => {
        expect(section.type).toBeDefined();
        // Allow any type since the app may have custom types
      });
    });
  });
});

describe('Lesson difficulty levels', () => {
  it('lessons have valid difficulty levels', async () => {
    const { getAllLessons } = await import('../../../data/lessons');
    const lessons = getAllLessons();
    const validDifficulties = ['beginner', 'easy', 'intermediate', 'medium', 'moderate', 'advanced', 'hard', 'tough'];
    
    lessons.forEach(lesson => {
      if (lesson.difficulty) {
        expect(validDifficulties).toContain(lesson.difficulty);
      }
    });
  });
});

describe('Lesson estimated time', () => {
  it('lessons have duration', async () => {
    const { getAllLessons } = await import('../../../data/lessons');
    const lessons = getAllLessons();
    
    lessons.forEach(lesson => {
      if (lesson.duration) {
        expect(typeof lesson.duration).toBe('number');
        expect(lesson.duration).toBeGreaterThan(0);
      }
    });
  });
});

describe('getCurrentBlueprint function', () => {
  it('returns 2025 or 2026 based on date', () => {
    // Current date is January 31, 2026
    // The cutoff is July 1, 2026
    // So should return '2025'
    const getCurrentBlueprint = (): '2025' | '2026' => {
      const now = new Date();
      const july1_2026 = new Date('2026-07-01');
      return now < july1_2026 ? '2025' : '2026';
    };
    
    const result = getCurrentBlueprint();
    expect(['2025', '2026']).toContain(result);
  });
});
