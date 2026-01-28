import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock date-fns
vi.mock('date-fns', () => ({
  differenceInDays: vi.fn((date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = d1.getTime() - d2.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }),
  addDays: vi.fn((date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }),
  format: vi.fn((date, formatStr) => {
    const d = new Date(date);
    if (formatStr === 'MMM d') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[d.getMonth()]} ${d.getDate()}`;
    }
    return d.toISOString().split('T')[0];
  }),
}));

import { generateStudyPlan } from '../../utils/studyPlanner';
import { differenceInDays } from 'date-fns';

describe('studyPlanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock current date to be consistent
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('generateStudyPlan', () => {
    it('should generate a study plan with correct structure', () => {
      const examDate = new Date('2025-03-15'); // 59 days from mock date

      const plan = generateStudyPlan('FAR', examDate);

      expect(plan).toHaveProperty('examDate');
      expect(plan).toHaveProperty('totalDays');
      expect(plan).toHaveProperty('totalModules');
      expect(plan).toHaveProperty('modulesPerDay');
      expect(plan).toHaveProperty('milestones');
    });

    it('should calculate correct days until exam', () => {
      const examDate = new Date('2025-02-15'); // 31 days from Jan 15

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(31);

      const plan = generateStudyPlan('FAR', examDate);

      expect(plan.totalDays).toBe(31);
    });

    it('should reserve last 14 days for review', () => {
      const examDate = new Date('2025-03-15'); // 59 days

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('AUD', examDate);

      // 59 days total - 14 days review = 45 study days
      // 40 modules / 45 days = ~0.9 modules per day
      expect(plan.modulesPerDay).toBeCloseTo(40 / 45, 1);
    });

    it('should handle minimum 1 study day', () => {
      const examDate = new Date('2025-01-16'); // 1 day away

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(1);

      const plan = generateStudyPlan('REG', examDate);

      // Should handle edge case of very short time
      expect(plan.totalDays).toBe(1);
      expect(plan.modulesPerDay).toBeGreaterThan(0);
    });

    it('should include 4 milestones', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      expect(plan.milestones).toHaveLength(4);
    });

    it('should have Start milestone', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      const startMilestone = plan.milestones.find(m => m.label === 'Start');
      expect(startMilestone).toBeDefined();
    });

    it('should have Halfway Point milestone', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      const halfwayMilestone = plan.milestones.find(m => m.label === 'Halfway Point');
      expect(halfwayMilestone).toBeDefined();
    });

    it('should have Content Complete milestone', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      const completeMilestone = plan.milestones.find(m => m.label === 'Content Complete (Begin Review)');
      expect(completeMilestone).toBeDefined();
    });

    it('should have Exam Day milestone', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      const examMilestone = plan.milestones.find(m => m.label === 'Exam Day');
      expect(examMilestone).toBeDefined();
    });

    it('should return the original exam date', () => {
      const examDate = new Date('2025-04-01');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(76);

      const plan = generateStudyPlan('BEC', examDate);

      expect(plan.examDate).toEqual(examDate);
    });

    it('should use 40 total modules as estimate', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      expect(plan.totalModules).toBe(40);
    });

    it('should handle very long study period', () => {
      const examDate = new Date('2025-09-15'); // ~8 months

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(243);

      const plan = generateStudyPlan('FAR', examDate);

      expect(plan.totalDays).toBe(243);
      // With 243 days - 14 = 229 study days
      // 40 / 229 = very small number
      expect(plan.modulesPerDay).toBeLessThan(1);
    });

    it('should format milestone dates correctly', () => {
      const examDate = new Date('2025-03-15');

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      const plan = generateStudyPlan('FAR', examDate);

      // All milestones should have date strings
      plan.milestones.forEach(milestone => {
        expect(milestone.date).toBeDefined();
        expect(typeof milestone.date).toBe('string');
      });
    });

    it('should work for all exam sections', () => {
      const examDate = new Date('2025-03-15');
      const sections = ['FAR', 'AUD', 'REG', 'BEC'];

      (differenceInDays as ReturnType<typeof vi.fn>).mockReturnValue(59);

      sections.forEach(section => {
        const plan = generateStudyPlan(section, examDate);
        expect(plan).toBeDefined();
        expect(plan.totalDays).toBeGreaterThan(0);
      });
    });
  });
});
