import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  BLUEPRINT_WINDOWS,
  BLUEPRINT_CHANGES,
  getCurrentBlueprintVersion,
  getBlueprintForExamDate,
  getDaysUntilBlueprintChange,
} from '../../config/blueprintConfig';

describe('blueprintConfig', () => {
  describe('BLUEPRINT_WINDOWS', () => {
    it('has two blueprint windows defined', () => {
      expect(BLUEPRINT_WINDOWS).toHaveLength(2);
    });

    it('has 2025 blueprint window first', () => {
      const first = BLUEPRINT_WINDOWS[0];
      expect(first.blueprintVersion).toBe('2025');
      expect(first.effectiveDate).toBe('2026-01-01');
      expect(first.endDate).toBe('2026-06-30');
    });

    it('has 2026 blueprint window second', () => {
      const second = BLUEPRINT_WINDOWS[1];
      expect(second.blueprintVersion).toBe('2026');
      expect(second.effectiveDate).toBe('2026-07-01');
      expect(second.endDate).toBe('2026-12-31');
    });

    it('has descriptions for all windows', () => {
      BLUEPRINT_WINDOWS.forEach((window) => {
        expect(window.description).toBeDefined();
        expect(window.description.length).toBeGreaterThan(10);
      });
    });
  });

  describe('BLUEPRINT_CHANGES', () => {
    it('has topic changes defined', () => {
      expect(BLUEPRINT_CHANGES.length).toBeGreaterThan(0);
    });

    it('all changes have required fields', () => {
      BLUEPRINT_CHANGES.forEach((change) => {
        expect(change.topicId).toBeDefined();
        expect(change.topicName).toBeDefined();
        expect(change.section).toBeDefined();
        expect(change.changeType).toBeDefined();
        expect(typeof change.in2025).toBe('boolean');
        expect(typeof change.in2026).toBe('boolean');
        expect(change.description).toBeDefined();
        expect(change.userAction).toBeDefined();
      });
    });

    it('has valid change types', () => {
      const validChangeTypes = ['added', 'removed', 'modified', 'weight-changed'];
      BLUEPRINT_CHANGES.forEach((change) => {
        expect(validChangeTypes).toContain(change.changeType);
      });
    });

    it('includes REG section changes for tax law updates', () => {
      const regChanges = BLUEPRINT_CHANGES.filter((c) => c.section === 'REG');
      expect(regChanges.length).toBeGreaterThan(0);
    });

    it('includes SALT deduction change', () => {
      const saltChange = BLUEPRINT_CHANGES.find((c) => c.topicName.includes('SALT'));
      expect(saltChange).toBeDefined();
      expect(saltChange?.description).toContain('$10,000');
      expect(saltChange?.description).toContain('$40,000');
    });

    it('includes QBI deduction change', () => {
      const qbiChange = BLUEPRINT_CHANGES.find((c) => c.topicId === 'REG-III-013');
      expect(qbiChange).toBeDefined();
      expect(qbiChange?.description).toContain('20%');
      expect(qbiChange?.description).toContain('23%');
    });

    it('includes bonus depreciation change', () => {
      const bonusChange = BLUEPRINT_CHANGES.find((c) => c.topicName.includes('Bonus Depreciation'));
      expect(bonusChange).toBeDefined();
      expect(bonusChange?.description).toContain('40%');
      expect(bonusChange?.description).toContain('100%');
    });
  });

  describe('getCurrentBlueprintVersion', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns 2025 for dates before July 1, 2026', () => {
      vi.setSystemTime(new Date('2026-06-15'));
      expect(getCurrentBlueprintVersion()).toBe('2025');
    });

    it('returns 2026 for dates on or after July 1, 2026', () => {
      vi.setSystemTime(new Date('2026-07-01'));
      expect(getCurrentBlueprintVersion()).toBe('2026');
    });

    it('returns 2026 for dates well after July 1, 2026', () => {
      vi.setSystemTime(new Date('2026-12-25'));
      expect(getCurrentBlueprintVersion()).toBe('2026');
    });
  });

  describe('getBlueprintForExamDate', () => {
    it('returns 2025 for exam dates before July 1, 2026', () => {
      const examDate = new Date('2026-06-15');
      expect(getBlueprintForExamDate(examDate)).toBe('2025');
    });

    it('returns 2026 for exam dates on July 1, 2026', () => {
      const examDate = new Date('2026-07-01');
      expect(getBlueprintForExamDate(examDate)).toBe('2026');
    });

    it('returns 2026 for exam dates after July 1, 2026', () => {
      const examDate = new Date('2026-08-15');
      expect(getBlueprintForExamDate(examDate)).toBe('2026');
    });

    it('returns 2025 for early 2026 exam dates', () => {
      const examDate = new Date('2026-02-01');
      expect(getBlueprintForExamDate(examDate)).toBe('2025');
    });
  });

  describe('getDaysUntilBlueprintChange', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns positive days when before transition', () => {
      vi.setSystemTime(new Date('2026-06-01'));
      const days = getDaysUntilBlueprintChange();
      expect(days).toBeGreaterThan(0);
      expect(days).toBeLessThanOrEqual(30); // About 30 days
    });

    it('returns negative/zero days when after transition', () => {
      vi.setSystemTime(new Date('2026-07-15'));
      const days = getDaysUntilBlueprintChange();
      expect(days).toBeLessThanOrEqual(0);
    });

    it('calculates correct days until July 1', () => {
      vi.setSystemTime(new Date('2026-06-30'));
      const days = getDaysUntilBlueprintChange();
      expect(days).toBe(1);
    });
  });
});
