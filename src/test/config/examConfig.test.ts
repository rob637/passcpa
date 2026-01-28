import { describe, it, expect } from 'vitest';
import {
  getBlueprintForDate,
  isInBlueprintTransition,
  CPA_SECTIONS,
  EXAM_BLUEPRINTS,
  HR1_PROVISIONS,
  getAllTopicsForSection,
  getTopicById,
  isHR1Topic,
  getProgressByArea,
} from '../../config/examConfig';

describe('examConfig', () => {
  describe('getBlueprintForDate', () => {
    it('should return 2025 for dates before July 1, 2026', () => {
      const date = new Date('2026-01-15');
      expect(getBlueprintForDate(date)).toBe('2025');
    });

    it('should return 2025 for June 30, 2026', () => {
      const date = new Date('2026-06-30');
      expect(getBlueprintForDate(date)).toBe('2025');
    });

    it('should return 2026 for July 1, 2026', () => {
      const date = new Date('2026-07-01');
      expect(getBlueprintForDate(date)).toBe('2026');
    });

    it('should return 2026 for dates after July 1, 2026', () => {
      const date = new Date('2026-12-15');
      expect(getBlueprintForDate(date)).toBe('2026');
    });

    it('should return 2025 for dates in 2025', () => {
      const date = new Date('2025-06-15');
      expect(getBlueprintForDate(date)).toBe('2025');
    });

    it('should return 2026 for dates in 2027', () => {
      const date = new Date('2027-03-01');
      expect(getBlueprintForDate(date)).toBe('2026');
    });
  });

  describe('isInBlueprintTransition', () => {
    it('should return boolean', () => {
      const result = isInBlueprintTransition();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('CPA_SECTIONS', () => {
    it('should have PREP section', () => {
      expect(CPA_SECTIONS.PREP).toBeDefined();
      expect(CPA_SECTIONS.PREP.type).toBe('strategy');
    });

    it('should have all core sections', () => {
      expect(CPA_SECTIONS.AUD).toBeDefined();
      expect(CPA_SECTIONS.AUD.type).toBe('core');
      
      expect(CPA_SECTIONS.FAR).toBeDefined();
      expect(CPA_SECTIONS.FAR.type).toBe('core');
      
      expect(CPA_SECTIONS.REG).toBeDefined();
      expect(CPA_SECTIONS.REG.type).toBe('core');
    });

    it('should have all discipline sections', () => {
      expect(CPA_SECTIONS.BAR).toBeDefined();
      expect(CPA_SECTIONS.BAR.type).toBe('discipline');
      
      expect(CPA_SECTIONS.ISC).toBeDefined();
      expect(CPA_SECTIONS.ISC.type).toBe('discipline');
      
      expect(CPA_SECTIONS.TCP).toBeDefined();
      expect(CPA_SECTIONS.TCP.type).toBe('discipline');
    });

    it('should have BEC as discipline section (2025 Blueprint)', () => {
      expect(CPA_SECTIONS.BEC).toBeDefined();
      expect(CPA_SECTIONS.BEC.type).toBe('discipline');
    });

    it('should have correct exam lengths', () => {
      expect(CPA_SECTIONS.AUD.examLength).toBe(4);
      expect(CPA_SECTIONS.FAR.examLength).toBe(4);
      expect(CPA_SECTIONS.REG.examLength).toBe(4);
      expect(CPA_SECTIONS.PREP.examLength).toBe(0);
    });

    it('should have correct MCQ weights', () => {
      expect(CPA_SECTIONS.AUD.mcqWeight).toBe(50);
      expect(CPA_SECTIONS.ISC.mcqWeight).toBe(60); // ISC has highest MCQ weight
    });

    it('should have correct TBS weights', () => {
      expect(CPA_SECTIONS.AUD.tbsWeight).toBe(50);
      expect(CPA_SECTIONS.ISC.tbsWeight).toBe(40);
    });

    it('should mark blueprint sensitive sections', () => {
      expect(CPA_SECTIONS.REG.blueprintSensitive).toBe(true);
      expect(CPA_SECTIONS.TCP.blueprintSensitive).toBe(true);
      expect(CPA_SECTIONS.AUD.blueprintSensitive).toBe(false);
      expect(CPA_SECTIONS.FAR.blueprintSensitive).toBe(false);
    });

    it('should have pending updates for REG and TCP', () => {
      expect(CPA_SECTIONS.REG.pendingUpdate).toBeDefined();
      expect(CPA_SECTIONS.REG.pendingUpdate?.effectiveDate).toBe('2026-07-01');
      
      expect(CPA_SECTIONS.TCP.pendingUpdate).toBeDefined();
      expect(CPA_SECTIONS.TCP.pendingUpdate?.effectiveDate).toBe('2026-07-01');
    });

    it('should have career fit for discipline sections', () => {
      expect(CPA_SECTIONS.BAR.careerFit).toBeDefined();
      expect(CPA_SECTIONS.BAR.careerFit?.length).toBeGreaterThan(0);
      
      expect(CPA_SECTIONS.ISC.careerFit).toBeDefined();
      expect(CPA_SECTIONS.TCP.careerFit).toBeDefined();
    });
  });

  describe('EXAM_BLUEPRINTS', () => {
    it('should have blueprints for core sections', () => {
      expect(EXAM_BLUEPRINTS.AUD).toBeDefined();
      expect(EXAM_BLUEPRINTS.FAR).toBeDefined();
      expect(EXAM_BLUEPRINTS.REG).toBeDefined();
    });

    it('should have blueprints for discipline sections', () => {
      expect(EXAM_BLUEPRINTS.BAR).toBeDefined();
      expect(EXAM_BLUEPRINTS.ISC).toBeDefined();
      expect(EXAM_BLUEPRINTS.TCP).toBeDefined();
    });

    it('should have areas in each blueprint', () => {
      expect(EXAM_BLUEPRINTS.AUD.areas).toBeDefined();
      expect(EXAM_BLUEPRINTS.AUD.areas.length).toBeGreaterThan(0);
    });

    it('should have proper area structure', () => {
      const audArea = EXAM_BLUEPRINTS.AUD.areas[0];
      expect(audArea.id).toBeDefined();
      expect(audArea.name).toBeDefined();
      expect(audArea.groups).toBeDefined();
    });

    it('should have proper group structure', () => {
      const audArea = EXAM_BLUEPRINTS.AUD.areas[0];
      const group = audArea.groups[0];
      expect(group.id).toBeDefined();
      expect(group.name).toBeDefined();
      expect(group.topics).toBeDefined();
    });

    it('should have proper topic structure', () => {
      const audArea = EXAM_BLUEPRINTS.AUD.areas[0];
      const group = audArea.groups[0];
      const topic = group.topics[0];
      expect(topic.id).toBeDefined();
      expect(topic.name).toBeDefined();
    });
  });

  describe('HR1_PROVISIONS', () => {
    it('should be defined', () => {
      expect(HR1_PROVISIONS).toBeDefined();
    });

    it('should have key changes', () => {
      expect(HR1_PROVISIONS.keyChanges).toBeDefined();
      expect(Array.isArray(HR1_PROVISIONS.keyChanges)).toBe(true);
    });

    it('should have name for each key change', () => {
      HR1_PROVISIONS.keyChanges.forEach((change: any) => {
        expect(change.name).toBeDefined();
      });
    });

    it('should have topicIds for each key change', () => {
      HR1_PROVISIONS.keyChanges.forEach((change: any) => {
        expect(change.topicIds).toBeDefined();
        expect(Array.isArray(change.topicIds)).toBe(true);
      });
    });
  });

  describe('getAllTopicsForSection', () => {
    it('should return array of topics for AUD', () => {
      const topics = getAllTopicsForSection('AUD');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return array of topics for FAR', () => {
      const topics = getAllTopicsForSection('FAR');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return array of topics for REG', () => {
      const topics = getAllTopicsForSection('REG');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return array of topics for BAR', () => {
      const topics = getAllTopicsForSection('BAR');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return array of topics for ISC', () => {
      const topics = getAllTopicsForSection('ISC');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return array of topics for TCP', () => {
      const topics = getAllTopicsForSection('TCP');
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid section', () => {
      const topics = getAllTopicsForSection('INVALID' as any);
      expect(topics).toEqual([]);
    });

    it('should include area information in topics', () => {
      const topics = getAllTopicsForSection('AUD');
      const topic = topics[0];
      expect(topic.areaId).toBeDefined();
      expect(topic.areaName).toBeDefined();
    });

    it('should include group information in topics', () => {
      const topics = getAllTopicsForSection('AUD');
      const topic = topics[0];
      expect(topic.groupId).toBeDefined();
      expect(topic.groupName).toBeDefined();
    });

    it('should include full path in topics', () => {
      const topics = getAllTopicsForSection('AUD');
      const topic = topics[0];
      expect(topic.fullPath).toBeDefined();
      expect(topic.fullPath).toContain(' > ');
    });

    it('should include section ID in topics', () => {
      const topics = getAllTopicsForSection('FAR');
      const topic = topics[0];
      expect(topic.sectionId).toBe('FAR');
    });
  });

  describe('getTopicById', () => {
    it('should return topic for valid AUD topic ID', () => {
      const topics = getAllTopicsForSection('AUD');
      if (topics.length > 0) {
        const topicId = topics[0].id;
        const topic = getTopicById(topicId);
        expect(topic).toBeDefined();
        expect(topic?.id).toBe(topicId);
      }
    });

    it('should return topic with full path information', () => {
      const topics = getAllTopicsForSection('FAR');
      if (topics.length > 0) {
        const topicId = topics[0].id;
        const topic = getTopicById(topicId);
        expect(topic?.fullPath).toBeDefined();
        expect(topic?.areaId).toBeDefined();
        expect(topic?.groupId).toBeDefined();
      }
    });

    it('should return null for invalid topic ID', () => {
      const topic = getTopicById('INVALID-TOPIC-ID');
      expect(topic).toBeNull();
    });

    it('should return null for empty topic ID', () => {
      const topic = getTopicById('');
      expect(topic).toBeNull();
    });

    it('should extract section from topic ID', () => {
      // Topic IDs start with section prefix like 'AUD-I-A-1'
      const topics = getAllTopicsForSection('REG');
      if (topics.length > 0) {
        const topicId = topics[0].id;
        const topic = getTopicById(topicId);
        expect(topic?.sectionId).toBe('REG');
      }
    });
  });

  describe('isHR1Topic', () => {
    it('should return boolean', () => {
      const result = isHR1Topic('some-topic-id');
      expect(typeof result).toBe('boolean');
    });

    it('should return false for non-HR1 topic', () => {
      // AUD topics shouldn't be HR1 related
      const topics = getAllTopicsForSection('AUD');
      if (topics.length > 0) {
        const result = isHR1Topic(topics[0].id);
        expect(result).toBe(false);
      }
    });

    it('should check HR1 provisions for topic', () => {
      // Test with an HR1 topic ID if one exists
      const hr1TopicIds = HR1_PROVISIONS.keyChanges.flatMap((c: any) => c.topicIds);
      if (hr1TopicIds.length > 0) {
        const result = isHR1Topic(hr1TopicIds[0]);
        expect(result).toBe(true);
      }
    });
  });

  describe('getProgressByArea', () => {
    it('should return array for valid section', () => {
      const progress = getProgressByArea({}, 'AUD');
      expect(Array.isArray(progress)).toBe(true);
    });

    it('should return empty array for invalid section', () => {
      const progress = getProgressByArea({}, 'INVALID' as any);
      expect(progress).toEqual([]);
    });

    it('should include area information', () => {
      const progress = getProgressByArea({}, 'AUD');
      if (progress.length > 0) {
        expect(progress[0].areaId).toBeDefined();
        expect(progress[0].areaName).toBeDefined();
      }
    });

    it('should include weight range', () => {
      const progress = getProgressByArea({}, 'FAR');
      if (progress.length > 0) {
        expect(progress[0].weightRange).toBeDefined();
      }
    });

    it('should calculate topic counts', () => {
      const progress = getProgressByArea({}, 'REG');
      if (progress.length > 0) {
        expect(typeof progress[0].totalTopics).toBe('number');
        expect(progress[0].totalTopics).toBeGreaterThan(0);
      }
    });

    it('should have zero mastered topics when no progress', () => {
      const progress = getProgressByArea({}, 'BAR');
      if (progress.length > 0) {
        expect(progress[0].masteredTopics).toBe(0);
      }
    });

    it('should have zero accuracy when no progress', () => {
      const progress = getProgressByArea({}, 'ISC');
      if (progress.length > 0) {
        expect(progress[0].accuracy).toBe(0);
      }
    });

    it('should have zero total questions when no progress', () => {
      const progress = getProgressByArea({}, 'TCP');
      if (progress.length > 0) {
        expect(progress[0].totalQuestions).toBe(0);
      }
    });

    it('should calculate accuracy with user progress', () => {
      const topics = getAllTopicsForSection('AUD');
      if (topics.length > 0) {
        const userProgress = {
          [topics[0].id]: { attempted: 10, correct: 8, accuracy: 80 },
        };
        const progress = getProgressByArea(userProgress, 'AUD');
        
        expect(progress[0].totalQuestions).toBe(10);
        expect(progress[0].correctAnswers).toBe(8);
        expect(progress[0].accuracy).toBe(80);
      }
    });

    it('should count mastered topics correctly', () => {
      const topics = getAllTopicsForSection('FAR');
      if (topics.length > 0) {
        const userProgress = {
          [topics[0].id]: { attempted: 10, correct: 9, accuracy: 90 },
        };
        const progress = getProgressByArea(userProgress, 'FAR');
        
        // Should have 1 mastered topic (accuracy >= 80 && attempted >= 5)
        expect(progress[0].masteredTopics).toBe(1);
      }
    });

    it('should not count topic as mastered if accuracy below 80', () => {
      const topics = getAllTopicsForSection('REG');
      if (topics.length > 0) {
        const userProgress = {
          [topics[0].id]: { attempted: 10, correct: 5, accuracy: 50 },
        };
        const progress = getProgressByArea(userProgress, 'REG');
        
        expect(progress[0].masteredTopics).toBe(0);
      }
    });

    it('should not count topic as mastered if attempts below 5', () => {
      const topics = getAllTopicsForSection('BAR');
      if (topics.length > 0) {
        const userProgress = {
          [topics[0].id]: { attempted: 3, correct: 3, accuracy: 100 },
        };
        const progress = getProgressByArea(userProgress, 'BAR');
        
        expect(progress[0].masteredTopics).toBe(0);
      }
    });

    it('should calculate readiness percentage', () => {
      const topics = getAllTopicsForSection('ISC');
      if (topics.length > 0) {
        const userProgress = {
          [topics[0].id]: { attempted: 10, correct: 9, accuracy: 90 },
        };
        const progress = getProgressByArea(userProgress, 'ISC');
        
        expect(typeof progress[0].readiness).toBe('number');
        expect(progress[0].readiness).toBeGreaterThanOrEqual(0);
        expect(progress[0].readiness).toBeLessThanOrEqual(100);
      }
    });
  });
});
