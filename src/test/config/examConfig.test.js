import { describe, it, expect } from 'vitest';
import {
  CPA_SECTIONS,
  getBlueprintForDate,
  isBefore2026Blueprint,
  CORE_SECTIONS,
  DISCIPLINE_SECTIONS,
  STRATEGY_SECTIONS,
  EXAM_RULES,
  POINT_VALUES,
  DAILY_GOAL_PRESETS,
  DIFFICULTY_LEVELS,
  PASSING_SCORE,
  EXAM_BLUEPRINTS,
} from '../../config/examConfig';

describe('Exam Configuration', () => {
  describe('CPA_SECTIONS', () => {
    it('should define all core sections', () => {
      expect(CPA_SECTIONS.AUD).toBeDefined();
      expect(CPA_SECTIONS.FAR).toBeDefined();
      expect(CPA_SECTIONS.REG).toBeDefined();
    });

    it('should define all discipline sections', () => {
      expect(CPA_SECTIONS.BAR).toBeDefined();
      expect(CPA_SECTIONS.ISC).toBeDefined();
      expect(CPA_SECTIONS.TCP).toBeDefined();
    });

    it('should define strategy section', () => {
      expect(CPA_SECTIONS.PREP).toBeDefined();
      expect(CPA_SECTIONS.PREP.type).toBe('strategy');
    });

    it('should have correct types for core sections', () => {
      expect(CPA_SECTIONS.AUD.type).toBe('core');
      expect(CPA_SECTIONS.FAR.type).toBe('core');
      expect(CPA_SECTIONS.REG.type).toBe('core');
    });

    it('should have correct types for discipline sections', () => {
      expect(CPA_SECTIONS.BAR.type).toBe('discipline');
      expect(CPA_SECTIONS.ISC.type).toBe('discipline');
      expect(CPA_SECTIONS.TCP.type).toBe('discipline');
    });

    it('should have exam lengths for test sections', () => {
      expect(CPA_SECTIONS.AUD.examLength).toBeGreaterThan(0);
      expect(CPA_SECTIONS.FAR.examLength).toBeGreaterThan(0);
      expect(CPA_SECTIONS.REG.examLength).toBeGreaterThan(0);
    });

    it('should have MCQ and TBS weights', () => {
      expect(CPA_SECTIONS.AUD.mcqWeight).toBeGreaterThan(0);
      expect(CPA_SECTIONS.AUD.tbsWeight).toBeGreaterThan(0);
      expect(CPA_SECTIONS.AUD.mcqWeight + CPA_SECTIONS.AUD.tbsWeight).toBe(100);
    });

    it('should have question type counts', () => {
      expect(CPA_SECTIONS.FAR.questionTypes.mcq).toBeGreaterThan(0);
      expect(CPA_SECTIONS.FAR.questionTypes.tbs).toBeGreaterThan(0);
    });

    it('should have required string fields', () => {
      Object.values(CPA_SECTIONS).forEach(section => {
        expect(section.name).toBeTruthy();
        expect(section.shortName).toBeTruthy();
        expect(section.color).toBeTruthy();
        expect(section.description).toBeTruthy();
      });
    });

    it('should mark blueprint sensitive sections', () => {
      expect(CPA_SECTIONS.REG.blueprintSensitive).toBe(true);
      expect(CPA_SECTIONS.TCP.blueprintSensitive).toBe(true);
      expect(CPA_SECTIONS.AUD.blueprintSensitive).toBe(false);
    });

    it('should have pendingUpdate for blueprint-sensitive sections', () => {
      expect(CPA_SECTIONS.REG.pendingUpdate).toBeDefined();
      expect(CPA_SECTIONS.TCP.pendingUpdate).toBeDefined();
      expect(CPA_SECTIONS.REG.pendingUpdate.effectiveDate).toBe('2026-07-01');
    });

    it('should have careerFit for discipline sections', () => {
      expect(CPA_SECTIONS.BAR.careerFit).toBeDefined();
      expect(Array.isArray(CPA_SECTIONS.BAR.careerFit)).toBe(true);
      expect(CPA_SECTIONS.ISC.careerFit.length).toBeGreaterThan(0);
    });

    it('should have BEC marked as retired (December 15, 2023)', () => {
      expect(CPA_SECTIONS.BEC).toBeDefined();
      expect(CPA_SECTIONS.BEC.type).toBe('discipline');
      expect(CPA_SECTIONS.BEC.retired).toBe(true);
      expect(CPA_SECTIONS.BEC.retiredDate).toBe('2023-12-15');
    });
  });

  describe('getBlueprintForDate', () => {
    it('should return 2025 for dates before July 1, 2026', () => {
      const jan2026 = new Date('2026-01-15');
      const june2026 = new Date('2026-06-30');
      
      expect(getBlueprintForDate(jan2026)).toBe('2025');
      expect(getBlueprintForDate(june2026)).toBe('2025');
    });

    it('should return 2026 for dates on or after July 1, 2026', () => {
      const july2026 = new Date('2026-07-01');
      const dec2026 = new Date('2026-12-15');
      
      expect(getBlueprintForDate(july2026)).toBe('2026');
      expect(getBlueprintForDate(dec2026)).toBe('2026');
    });

    it('should return 2026 for future years', () => {
      const future = new Date('2027-03-01');
      expect(getBlueprintForDate(future)).toBe('2026');
    });
  });

  describe('isBefore2026Blueprint', () => {
    it('should return boolean', () => {
      const result = isBefore2026Blueprint();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Section arrays', () => {
    it('should have correct CORE_SECTIONS', () => {
      expect(CORE_SECTIONS).toEqual(['AUD', 'FAR', 'REG']);
    });

    it('should have correct DISCIPLINE_SECTIONS (BAR, ISC, TCP only)', () => {
      // BEC was retired December 15, 2023
      // Only BAR, ISC, TCP are valid discipline sections
      expect(DISCIPLINE_SECTIONS).toContain('BAR');
      expect(DISCIPLINE_SECTIONS).toContain('ISC');
      expect(DISCIPLINE_SECTIONS).toContain('TCP');
      expect(DISCIPLINE_SECTIONS).not.toContain('BEC');
    });

    it('should have correct STRATEGY_SECTIONS', () => {
      expect(STRATEGY_SECTIONS).toEqual(['PREP']);
    });
  });

  describe('EXAM_RULES', () => {
    it('should have passing window', () => {
      expect(EXAM_RULES.passingWindowMonths).toBe(30);
    });

    it('should have passing score', () => {
      expect(EXAM_RULES.passingScore).toBe(75);
    });

    it('should require 4 sections', () => {
      expect(EXAM_RULES.sectionsRequired).toBe(4);
    });

    it('should have testing windows info', () => {
      expect(EXAM_RULES.testingWindows).toBeDefined();
    });

    it('should have score release info', () => {
      expect(EXAM_RULES.scoreRelease).toBeDefined();
    });
  });

  describe('POINT_VALUES', () => {
    it('should have MCQ point values', () => {
      expect(POINT_VALUES.mcq_easy).toBe(1);
      expect(POINT_VALUES.mcq_medium).toBe(2);
      expect(POINT_VALUES.mcq_hard).toBe(3);
    });

    it('should have TBS point values', () => {
      expect(POINT_VALUES.tbs_basic).toBe(5);
      expect(POINT_VALUES.tbs_complex).toBe(10);
    });

    it('should have lesson point values', () => {
      expect(POINT_VALUES.lesson_short).toBe(10);
      expect(POINT_VALUES.lesson_medium).toBe(15);
      expect(POINT_VALUES.lesson_long).toBe(20);
    });

    it('should have weak area multiplier', () => {
      expect(POINT_VALUES.weak_area_multiplier).toBe(1.5);
    });
  });

  describe('DAILY_GOAL_PRESETS', () => {
    it('should have multiple presets', () => {
      expect(DAILY_GOAL_PRESETS.length).toBeGreaterThan(0);
    });

    it('should have light preset', () => {
      const light = DAILY_GOAL_PRESETS.find(p => p.id === 'light');
      expect(light).toBeDefined();
      expect(light.points).toBe(30);
    });

    it('should have moderate preset', () => {
      const moderate = DAILY_GOAL_PRESETS.find(p => p.id === 'moderate');
      expect(moderate).toBeDefined();
      expect(moderate.points).toBe(50);
    });

    it('should have intensive preset', () => {
      const intensive = DAILY_GOAL_PRESETS.find(p => p.id === 'intensive');
      expect(intensive).toBeDefined();
      expect(intensive.points).toBe(80);
    });

    it('should have full-time preset', () => {
      const fullTime = DAILY_GOAL_PRESETS.find(p => p.id === 'full-time');
      expect(fullTime).toBeDefined();
      expect(fullTime.points).toBe(150);
    });

    it('each preset should have required fields', () => {
      DAILY_GOAL_PRESETS.forEach(preset => {
        expect(preset.id).toBeDefined();
        expect(preset.name).toBeDefined();
        expect(preset.points).toBeGreaterThan(0);
        expect(preset.time).toBeDefined();
        expect(preset.description).toBeDefined();
        expect(preset.weeksToPass).toBeGreaterThan(0);
      });
    });
  });

  describe('DIFFICULTY_LEVELS', () => {
    it('should have easy level', () => {
      expect(DIFFICULTY_LEVELS.easy).toBeDefined();
      expect(DIFFICULTY_LEVELS.easy.color).toBe('green');
    });

    it('should have medium level', () => {
      expect(DIFFICULTY_LEVELS.medium).toBeDefined();
      expect(DIFFICULTY_LEVELS.medium.color).toBe('amber');
    });

    it('should have hard level', () => {
      expect(DIFFICULTY_LEVELS.hard).toBeDefined();
      expect(DIFFICULTY_LEVELS.hard.color).toBe('red');
    });

    it('should have skill levels', () => {
      expect(DIFFICULTY_LEVELS.easy.skillLevel).toBeDefined();
      expect(DIFFICULTY_LEVELS.medium.skillLevel).toBeDefined();
      expect(DIFFICULTY_LEVELS.hard.skillLevel).toBeDefined();
    });

    it('weights should sum to 1', () => {
      const totalWeight = 
        DIFFICULTY_LEVELS.easy.weight + 
        DIFFICULTY_LEVELS.medium.weight + 
        DIFFICULTY_LEVELS.hard.weight;
      expect(totalWeight).toBe(1);
    });
  });

  describe('PASSING_SCORE', () => {
    it('should be 75', () => {
      expect(PASSING_SCORE).toBe(75);
    });
  });

  describe('EXAM_BLUEPRINTS', () => {
    it('should have AUD blueprint', () => {
      expect(EXAM_BLUEPRINTS.AUD).toBeDefined();
      expect(EXAM_BLUEPRINTS.AUD.name).toBe('Auditing and Attestation');
    });

    it('should have areas for AUD', () => {
      expect(EXAM_BLUEPRINTS.AUD.areas).toBeDefined();
      expect(Array.isArray(EXAM_BLUEPRINTS.AUD.areas)).toBe(true);
      expect(EXAM_BLUEPRINTS.AUD.areas.length).toBeGreaterThan(0);
    });

    it('AUD areas should have groups', () => {
      EXAM_BLUEPRINTS.AUD.areas.forEach(area => {
        expect(area.id).toBeDefined();
        expect(area.name).toBeDefined();
        expect(area.groups).toBeDefined();
      });
    });

    it('should have FAR blueprint', () => {
      expect(EXAM_BLUEPRINTS.FAR).toBeDefined();
    });

    it('should have REG blueprint', () => {
      expect(EXAM_BLUEPRINTS.REG).toBeDefined();
    });

    it('should have discipline blueprints', () => {
      expect(EXAM_BLUEPRINTS.BAR).toBeDefined();
      expect(EXAM_BLUEPRINTS.ISC).toBeDefined();
      expect(EXAM_BLUEPRINTS.TCP).toBeDefined();
    });
  });
});
