import { describe, it, expect } from 'vitest';
import {
  getCurrentBlueprintVersion,
  getBlueprintForExamDate,
  getDaysUntilBlueprintChange,
  BLUEPRINT_WINDOWS,
  BLUEPRINT_CHANGES,
  LESSON_BLUEPRINT_MARKERS,
  BLUEPRINT_SUMMARY,
} from '../../config/blueprintConfig';

describe('blueprintConfig', () => {
  describe('getCurrentBlueprintVersion', () => {
    it('should return a valid blueprint version', () => {
      const version = getCurrentBlueprintVersion();
      expect(['2025', '2026']).toContain(version);
    });

    it('should return string type', () => {
      const version = getCurrentBlueprintVersion();
      expect(typeof version).toBe('string');
    });
  });

  describe('getBlueprintForExamDate', () => {
    it('should return 2025 for dates before July 1, 2026', () => {
      const date = new Date('2026-01-15');
      expect(getBlueprintForExamDate(date)).toBe('2025');
    });

    it('should return 2025 for June 30, 2026', () => {
      const date = new Date('2026-06-30');
      expect(getBlueprintForExamDate(date)).toBe('2025');
    });

    it('should return 2026 for July 1, 2026', () => {
      const date = new Date('2026-07-01');
      expect(getBlueprintForExamDate(date)).toBe('2026');
    });

    it('should return 2026 for dates after July 1, 2026', () => {
      const date = new Date('2026-12-15');
      expect(getBlueprintForExamDate(date)).toBe('2026');
    });

    it('should return 2025 for dates in 2025', () => {
      const date = new Date('2025-06-15');
      expect(getBlueprintForExamDate(date)).toBe('2025');
    });

    it('should return 2026 for dates in 2027', () => {
      const date = new Date('2027-03-01');
      expect(getBlueprintForExamDate(date)).toBe('2026');
    });

    it('should handle edge cases', () => {
      // Just before midnight on June 30
      const date = new Date('2026-06-30T23:59:59');
      expect(getBlueprintForExamDate(date)).toBe('2025');
    });
  });

  describe('getDaysUntilBlueprintChange', () => {
    it('should return a number', () => {
      const days = getDaysUntilBlueprintChange();
      expect(typeof days).toBe('number');
    });

    it('should be an integer', () => {
      const days = getDaysUntilBlueprintChange();
      expect(Number.isInteger(days)).toBe(true);
    });
  });

  describe('BLUEPRINT_WINDOWS', () => {
    it('should have at least 2 windows', () => {
      expect(BLUEPRINT_WINDOWS.length).toBeGreaterThanOrEqual(2);
    });

    it('should have correct structure for each window', () => {
      BLUEPRINT_WINDOWS.forEach((window) => {
        expect(window.effectiveDate).toBeDefined();
        expect(window.endDate).toBeDefined();
        expect(window.blueprintVersion).toBeDefined();
        expect(window.description).toBeDefined();
      });
    });

    it('should have valid blueprint versions', () => {
      BLUEPRINT_WINDOWS.forEach((window) => {
        expect(['2025', '2026']).toContain(window.blueprintVersion);
      });
    });

    it('should have valid date strings', () => {
      BLUEPRINT_WINDOWS.forEach((window) => {
        expect(new Date(window.effectiveDate).getTime()).not.toBeNaN();
        expect(new Date(window.endDate).getTime()).not.toBeNaN();
      });
    });

    it('should have first window for 2025 Blueprint', () => {
      expect(BLUEPRINT_WINDOWS[0].blueprintVersion).toBe('2025');
    });

    it('should have second window for 2026 Blueprint', () => {
      expect(BLUEPRINT_WINDOWS[1].blueprintVersion).toBe('2026');
    });
  });

  describe('BLUEPRINT_CHANGES', () => {
    it('should be an array', () => {
      expect(Array.isArray(BLUEPRINT_CHANGES)).toBe(true);
    });

    it('should have changes defined', () => {
      expect(BLUEPRINT_CHANGES.length).toBeGreaterThan(0);
    });

    it('should have correct structure for each change', () => {
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

    it('should have valid change types', () => {
      const validTypes = ['added', 'removed', 'modified', 'weight-changed'];
      BLUEPRINT_CHANGES.forEach((change) => {
        expect(validTypes).toContain(change.changeType);
      });
    });

    it('should include REG section changes', () => {
      const regChanges = BLUEPRINT_CHANGES.filter((c) => c.section === 'REG');
      expect(regChanges.length).toBeGreaterThan(0);
    });

    it('should include TCP section changes', () => {
      const tcpChanges = BLUEPRINT_CHANGES.filter((c) => c.section === 'TCP');
      expect(tcpChanges.length).toBeGreaterThan(0);
    });
  });

  describe('LESSON_BLUEPRINT_MARKERS', () => {
    it('should be an array', () => {
      expect(Array.isArray(LESSON_BLUEPRINT_MARKERS)).toBe(true);
    });

    it('should have markers defined', () => {
      expect(LESSON_BLUEPRINT_MARKERS.length).toBeGreaterThan(0);
    });

    it('should have correct structure for each marker', () => {
      LESSON_BLUEPRINT_MARKERS.forEach((marker) => {
        expect(marker.lessonId).toBeDefined();
        expect(marker.status).toBeDefined();
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['both', '2025-only', '2026-only', '2025-version', '2026-version'];
      LESSON_BLUEPRINT_MARKERS.forEach((marker) => {
        expect(validStatuses).toContain(marker.status);
      });
    });

    it('should include REG lessons', () => {
      const regMarkers = LESSON_BLUEPRINT_MARKERS.filter((m) => m.lessonId.startsWith('REG'));
      expect(regMarkers.length).toBeGreaterThan(0);
    });

    it('should include TCP lessons', () => {
      const tcpMarkers = LESSON_BLUEPRINT_MARKERS.filter((m) => m.lessonId.startsWith('TCP'));
      expect(tcpMarkers.length).toBeGreaterThan(0);
    });

    it('should have notes for versioned lessons', () => {
      const versionedMarkers = LESSON_BLUEPRINT_MARKERS.filter(
        (m) => m.status === '2025-version' || m.status === '2026-version'
      );
      versionedMarkers.forEach((marker) => {
        expect(marker.note).toBeDefined();
      });
    });
  });

  describe('BLUEPRINT_SUMMARY', () => {
    it('should have currentBlueprint', () => {
      expect(BLUEPRINT_SUMMARY.currentBlueprint).toBeDefined();
      expect(['2025', '2026']).toContain(BLUEPRINT_SUMMARY.currentBlueprint);
    });

    it('should have daysUntilChange', () => {
      expect(typeof BLUEPRINT_SUMMARY.daysUntilChange).toBe('number');
    });

    it('should have transitionDate', () => {
      expect(BLUEPRINT_SUMMARY.transitionDate).toBe('2026-07-01');
    });

    it('should have majorChangeSections', () => {
      expect(Array.isArray(BLUEPRINT_SUMMARY.majorChangeSections)).toBe(true);
      expect(BLUEPRINT_SUMMARY.majorChangeSections).toContain('REG');
      expect(BLUEPRINT_SUMMARY.majorChangeSections).toContain('TCP');
    });

    it('should have minorChangeSections', () => {
      expect(Array.isArray(BLUEPRINT_SUMMARY.minorChangeSections)).toBe(true);
      expect(BLUEPRINT_SUMMARY.minorChangeSections).toContain('FAR');
      expect(BLUEPRINT_SUMMARY.minorChangeSections).toContain('AUD');
    });

    it('should have criticalTopics', () => {
      expect(Array.isArray(BLUEPRINT_SUMMARY.criticalTopics)).toBe(true);
      expect(BLUEPRINT_SUMMARY.criticalTopics.length).toBeGreaterThan(0);
    });

    it('should include SALT Cap in critical topics', () => {
      const hasSALT = BLUEPRINT_SUMMARY.criticalTopics.some((t) => t.includes('SALT'));
      expect(hasSALT).toBe(true);
    });

    it('should include QBI Deduction in critical topics', () => {
      const hasQBI = BLUEPRINT_SUMMARY.criticalTopics.some((t) => t.includes('QBI'));
      expect(hasQBI).toBe(true);
    });
  });
});
