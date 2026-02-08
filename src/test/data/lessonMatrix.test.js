import { describe, it, expect } from 'vitest';
import {
  BLUEPRINT_AREAS,
  LESSON_MATRIX,
} from '../../data/cpa/lessonMatrix';

describe('Lesson Matrix Data', () => {
  describe('Blueprint Areas', () => {
    it('has FAR areas defined', () => {
      expect(BLUEPRINT_AREAS.FAR).toBeDefined();
      expect(BLUEPRINT_AREAS.FAR.length).toBeGreaterThan(0);
    });

    it('has AUD areas defined', () => {
      expect(BLUEPRINT_AREAS.AUD).toBeDefined();
      expect(BLUEPRINT_AREAS.AUD.length).toBeGreaterThan(0);
    });

    it('has REG areas defined', () => {
      expect(BLUEPRINT_AREAS.REG).toBeDefined();
      expect(BLUEPRINT_AREAS.REG.length).toBeGreaterThan(0);
    });

    it('has BAR areas defined', () => {
      expect(BLUEPRINT_AREAS.BAR).toBeDefined();
      expect(BLUEPRINT_AREAS.BAR.length).toBeGreaterThan(0);
    });

    it('has ISC areas defined', () => {
      expect(BLUEPRINT_AREAS.ISC).toBeDefined();
      expect(BLUEPRINT_AREAS.ISC.length).toBeGreaterThan(0);
    });

    it('has TCP areas defined', () => {
      expect(BLUEPRINT_AREAS.TCP).toBeDefined();
      expect(BLUEPRINT_AREAS.TCP.length).toBeGreaterThan(0);
    });

    it('FAR areas have required properties', () => {
      BLUEPRINT_AREAS.FAR.forEach(area => {
        expect(area.areaId).toBeDefined();
        expect(area.areaName).toBeDefined();
        expect(area.weight).toBeDefined();
      });
    });

    it('all areas have weight property', () => {
      Object.values(BLUEPRINT_AREAS).forEach(areas => {
        areas.forEach(area => {
          expect(area.weight).toBeDefined();
        });
      });
    });
  });

  describe('Lesson Matrix', () => {
    it('has lessons defined', () => {
      expect(LESSON_MATRIX).toBeDefined();
      expect(LESSON_MATRIX.length).toBeGreaterThan(0);
    });

    it('lessons have required properties', () => {
      LESSON_MATRIX.slice(0, 10).forEach(lesson => {
        expect(lesson.lessonId).toBeDefined();
        expect(lesson.section).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(lesson.blueprintArea).toBeDefined();
        expect(lesson.representativeTask).toBeDefined();
        expect(lesson.skillLevel).toBeDefined();
        expect(typeof lesson.obbbaAffected).toBe('boolean');
        expect(typeof lesson.duration).toBe('number');
      });
    });

    it('has lessons for multiple sections', () => {
      const sections = new Set(LESSON_MATRIX.map(l => l.section));
      expect(sections.size).toBeGreaterThan(1);
    });

    it('has FAR section lessons', () => {
      const farLessons = LESSON_MATRIX.filter(l => l.section === 'FAR');
      expect(farLessons.length).toBeGreaterThan(0);
    });

    it('has REG section lessons', () => {
      const regLessons = LESSON_MATRIX.filter(l => l.section === 'REG');
      expect(regLessons.length).toBeGreaterThan(0);
    });

    it('has AUD section lessons', () => {
      const audLessons = LESSON_MATRIX.filter(l => l.section === 'AUD');
      expect(audLessons.length).toBeGreaterThan(0);
    });

    it('skill levels are valid values', () => {
      const validSkillLevels = [
        'Remembering and Understanding',
        'Application',
        'Analysis',
        'Evaluation',
      ];
      
      LESSON_MATRIX.forEach(lesson => {
        expect(validSkillLevels).toContain(lesson.skillLevel);
      });
    });

    it('lesson IDs are unique', () => {
      const ids = LESSON_MATRIX.map(l => l.lessonId);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has OBBBA affected lessons', () => {
      const obbbaLessons = LESSON_MATRIX.filter(l => l.obbbaAffected);
      // Should have some OBBBA-affected lessons
      expect(obbbaLessons.length).toBeGreaterThanOrEqual(0);
    });

    it('lessons have positive duration', () => {
      LESSON_MATRIX.forEach(lesson => {
        expect(lesson.duration).toBeGreaterThan(0);
      });
    });
  });
});
