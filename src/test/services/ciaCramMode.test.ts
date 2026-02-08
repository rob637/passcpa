/**
 * Tests for CIA Cram Mode Service
 * 5-day intensive prep with IPPF, IIA Standards, and Code of Ethics focus
 */
import { describe, it, expect } from 'vitest';
import {
  generateCramPlan,
  completeSession,
  getDaySessions,
  advanceDay,
  getCramFlashcards,
  getExamDayTips,
  IPPF_COMPONENTS,
  IIA_STANDARDS,
  CODE_OF_ETHICS,
  HIGH_YIELD_TOPICS,
  CramPlan,
  CramSession,
  IPPFComponent,
  IIAStandard,
  EthicsRule,
} from '../../services/ciaCramMode';

describe('ciaCramMode', () => {
  describe('IPPF_COMPONENTS', () => {
    it('contains all IPPF framework components', () => {
      expect(IPPF_COMPONENTS.length).toBeGreaterThanOrEqual(5);
    });

    it('includes Mission', () => {
      const mission = IPPF_COMPONENTS.find((c: IPPFComponent) => c.code === 'MISSION');
      expect(mission).toBeDefined();
      expect(mission?.description).toContain('enhance');
    });

    it('includes Core Principles', () => {
      const principles = IPPF_COMPONENTS.find((c: IPPFComponent) => c.code === 'PRINCIPLES');
      expect(principles).toBeDefined();
    });

    it('includes Definition of Internal Auditing', () => {
      const definition = IPPF_COMPONENTS.find((c: IPPFComponent) => c.code === 'DEFINITION');
      expect(definition).toBeDefined();
    });

    it('includes Code of Ethics reference', () => {
      const ethics = IPPF_COMPONENTS.find((c: IPPFComponent) => c.code === 'COE');
      expect(ethics).toBeDefined();
    });

    it('includes Standards', () => {
      const standards = IPPF_COMPONENTS.find((c: IPPFComponent) => c.code === 'STANDARDS');
      expect(standards).toBeDefined();
    });

    it('each component has key points', () => {
      IPPF_COMPONENTS.forEach((component: IPPFComponent) => {
        expect(component.keyPoints).toBeDefined();
        expect(component.keyPoints.length).toBeGreaterThan(0);
      });
    });

    it('each component has exam tips', () => {
      IPPF_COMPONENTS.forEach((component: IPPFComponent) => {
        expect(component.examTips).toBeDefined();
        expect(component.examTips.length).toBeGreaterThan(0);
      });
    });
  });

  describe('IIA_STANDARDS', () => {
    it('contains multiple standards', () => {
      expect(IIA_STANDARDS.length).toBeGreaterThan(0);
    });

    it('includes Attribute standards (1000 series)', () => {
      const attribute = IIA_STANDARDS.filter((s: IIAStandard) => s.number.startsWith('1'));
      expect(attribute.length).toBeGreaterThan(0);
    });

    it('includes Performance standards (2000 series)', () => {
      const performance = IIA_STANDARDS.filter((s: IIAStandard) => s.number.startsWith('2'));
      expect(performance.length).toBeGreaterThan(0);
    });

    it('each standard has title and summary', () => {
      IIA_STANDARDS.forEach((standard: IIAStandard) => {
        expect(standard.title).toBeDefined();
        expect(standard.summary).toBeDefined();
      });
    });

    it('each standard has key requirements', () => {
      IIA_STANDARDS.forEach((standard: IIAStandard) => {
        expect(standard.keyRequirements).toBeDefined();
        expect(standard.keyRequirements.length).toBeGreaterThan(0);
      });
    });

    it('each standard has exam focus', () => {
      IIA_STANDARDS.forEach((standard: IIAStandard) => {
        expect(standard.examFocus).toBeDefined();
      });
    });
  });

  describe('CODE_OF_ETHICS', () => {
    it('contains all 4 principles', () => {
      expect(CODE_OF_ETHICS).toHaveLength(4);
    });

    it('includes Integrity', () => {
      const integrity = CODE_OF_ETHICS.find((c: EthicsRule) => c.principle === 'Integrity');
      expect(integrity).toBeDefined();
    });

    it('includes Objectivity', () => {
      const objectivity = CODE_OF_ETHICS.find((c: EthicsRule) => c.principle === 'Objectivity');
      expect(objectivity).toBeDefined();
    });

    it('includes Confidentiality', () => {
      const confidentiality = CODE_OF_ETHICS.find((c: EthicsRule) => c.principle === 'Confidentiality');
      expect(confidentiality).toBeDefined();
    });

    it('includes Competency', () => {
      const competency = CODE_OF_ETHICS.find((c: EthicsRule) => c.principle === 'Competency');
      expect(competency).toBeDefined();
    });

    it('each principle has rules', () => {
      CODE_OF_ETHICS.forEach((principle: EthicsRule) => {
        expect(principle.rules).toBeDefined();
        expect(principle.rules.length).toBeGreaterThan(0);
      });
    });

    it('each principle has examples', () => {
      CODE_OF_ETHICS.forEach((principle: EthicsRule) => {
        expect(principle.examples).toBeDefined();
        expect(principle.examples.length).toBeGreaterThan(0);
      });
    });

    it('each principle has violations', () => {
      CODE_OF_ETHICS.forEach((principle: EthicsRule) => {
        expect(principle.violations).toBeDefined();
        expect(principle.violations.length).toBeGreaterThan(0);
      });
    });
  });

  describe('HIGH_YIELD_TOPICS', () => {
    it('has topics for all 3 parts', () => {
      expect(HIGH_YIELD_TOPICS).toHaveProperty('CIA1');
      expect(HIGH_YIELD_TOPICS).toHaveProperty('CIA2');
      expect(HIGH_YIELD_TOPICS).toHaveProperty('CIA3');
    });

    it('CIA1 has high-yield topics', () => {
      expect(HIGH_YIELD_TOPICS.CIA1.length).toBeGreaterThan(0);
    });

    it('CIA2 has high-yield topics', () => {
      expect(HIGH_YIELD_TOPICS.CIA2.length).toBeGreaterThan(0);
    });

    it('CIA3 has high-yield topics', () => {
      expect(HIGH_YIELD_TOPICS.CIA3.length).toBeGreaterThan(0);
    });

    it('topics have weights', () => {
      HIGH_YIELD_TOPICS.CIA1.forEach((topic: { topic: string; weight: string; tips: string[] }) => {
        expect(topic.weight).toBeDefined();
      });
    });

    it('topics have tips', () => {
      HIGH_YIELD_TOPICS.CIA1.forEach((topic: { topic: string; weight: string; tips: string[] }) => {
        expect(topic.tips).toBeDefined();
        expect(topic.tips.length).toBeGreaterThan(0);
      });
    });
  });

  describe('generateCramPlan', () => {
    it('generates plan for user', () => {
      const examDate = new Date(Date.now() + 5 * 86400000); // 5 days from now
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      expect(plan.userId).toBe('user-123');
    });

    it('generates 5-day plan', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const uniqueDays = new Set(plan.sessions.map((s: CramSession) => s.day));
      expect(uniqueDays.size).toBe(5);
    });

    it('includes multiple sessions per day', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      expect(plan.sessions.length).toBeGreaterThan(5);
    });

    it('initializes with zero progress', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      expect(plan.progress.sessionsCompleted).toBe(0);
      expect(plan.progress.hoursStudied).toBe(0);
    });

    it('starts at day 1', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      expect(plan.currentDay).toBe(1);
    });

    it('includes various session types', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const types = new Set(plan.sessions.map((s: CramSession) => s.type));
      expect(types.size).toBeGreaterThan(1);
    });
  });

  describe('completeSession', () => {
    it('marks session as completed', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const sessionId = plan.sessions[0].id;
      const updated = completeSession(plan, sessionId, 85);
      const session = updated.sessions.find((s: CramSession) => s.id === sessionId);
      expect(session?.completed).toBe(true);
    });

    it('records session score', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const sessionId = plan.sessions[0].id;
      const updated = completeSession(plan, sessionId, 85);
      const session = updated.sessions.find((s: CramSession) => s.id === sessionId);
      expect(session?.score).toBe(85);
    });

    it('updates progress', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const sessionId = plan.sessions[0].id;
      const updated = completeSession(plan, sessionId, 85);
      expect(updated.progress.sessionsCompleted).toBe(1);
    });

    it('updates hours studied', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const sessionId = plan.sessions[0].id;
      const duration = plan.sessions[0].duration;
      const updated = completeSession(plan, sessionId, 85);
      expect(updated.progress.hoursStudied).toBeCloseTo(duration / 60, 1);
    });
  });

  describe('getDaySessions', () => {
    it('returns sessions for specified day', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const day1Sessions = getDaySessions(plan, 1);
      expect(day1Sessions.length).toBeGreaterThan(0);
      expect(day1Sessions.every((s: CramSession) => s.day === 1)).toBe(true);
    });

    it('returns empty array for invalid day', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const invalidDay = getDaySessions(plan, 10);
      expect(invalidDay).toHaveLength(0);
    });
  });

  describe('advanceDay', () => {
    it('increments current day', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const advanced = advanceDay(plan);
      expect(advanced.currentDay).toBe(2);
    });

    it('caps at day 5', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      let plan = generateCramPlan('user-123', examDate, 'CIA1');
      for (let i = 0; i < 10; i++) {
        plan = advanceDay(plan);
      }
      expect(plan.currentDay).toBeLessThanOrEqual(5);
    });
  });

  describe('getCramFlashcards', () => {
    it('returns flashcards', () => {
      const cards = getCramFlashcards();
      expect(cards).toBeDefined();
      expect(cards.length).toBeGreaterThan(0);
    });

    it('flashcards have front and back', () => {
      const cards = getCramFlashcards();
      cards.forEach((card: { front: string; back: string; category: string }) => {
        expect(card.front).toBeDefined();
        expect(card.back).toBeDefined();
      });
    });

    it('flashcards have category', () => {
      const cards = getCramFlashcards();
      cards.forEach((card: { front: string; back: string; category: string }) => {
        expect(card.category).toBeDefined();
      });
    });

    it('includes IPPF flashcards', () => {
      const cards = getCramFlashcards();
      const ippfCards = cards.filter((c: { front: string; back: string; category: string }) => 
        c.category.toLowerCase().includes('ippf') || 
        c.category.toLowerCase().includes('framework')
      );
      expect(ippfCards.length).toBeGreaterThan(0);
    });

    it('includes Standards flashcards', () => {
      const cards = getCramFlashcards();
      const standardsCards = cards.filter((c: { front: string; back: string; category: string }) => 
        c.category.toLowerCase().includes('standard')
      );
      expect(standardsCards.length).toBeGreaterThan(0);
    });
  });

  describe('getExamDayTips', () => {
    it('returns tips for Part 1', () => {
      const tips = getExamDayTips('CIA1');
      expect(tips).toBeDefined();
      expect(tips.length).toBeGreaterThan(0);
    });

    it('returns tips for Part 2', () => {
      const tips = getExamDayTips('CIA2');
      expect(tips).toBeDefined();
      expect(tips.length).toBeGreaterThan(0);
    });

    it('returns tips for Part 3', () => {
      const tips = getExamDayTips('CIA3');
      expect(tips).toBeDefined();
      expect(tips.length).toBeGreaterThan(0);
    });

    it('Part 1 tips include IPPF focus', () => {
      const tips = getExamDayTips('CIA1');
      const ippfTip = tips.some((t: string) =>
        t.toLowerCase().includes('ippf') ||
        t.toLowerCase().includes('framework') ||
        t.toLowerCase().includes('standard')
      );
      expect(ippfTip).toBe(true);
    });

    it('tips include time management advice', () => {
      const tips = getExamDayTips('CIA1');
      const timeTip = tips.some((t: string) =>
        t.toLowerCase().includes('time') ||
        t.toLowerCase().includes('pace') ||
        t.toLowerCase().includes('minutes')
      );
      expect(timeTip).toBe(true);
    });
  });

  describe('cram plan structure', () => {
    it('day 1 focuses on foundations', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const day1 = getDaySessions(plan, 1);
      expect(day1.length).toBeGreaterThan(0);
    });

    it('day 5 includes review and practice', () => {
      const examDate = new Date(Date.now() + 5 * 86400000);
      const plan = generateCramPlan('user-123', examDate, 'CIA1');
      const day5 = getDaySessions(plan, 5);
      const hasReview = day5.some((s: CramSession) => 
        s.type === 'review' || s.type === 'practice'
      );
      expect(hasReview).toBe(true);
    });
  });

  describe('part-specific content', () => {
    describe('Part 1 - Essentials of Internal Auditing', () => {
      it('emphasizes IPPF framework', () => {
        const examDate = new Date(Date.now() + 5 * 86400000);
        const plan = generateCramPlan('user-123', examDate, 'CIA1');
        const ippfSessions = plan.sessions.filter((s: CramSession) =>
          s.topic.toLowerCase().includes('ippf') ||
          s.topic.toLowerCase().includes('framework') ||
          s.topic.toLowerCase().includes('standard')
        );
        expect(ippfSessions.length).toBeGreaterThan(0);
      });
    });

    describe('Part 2 - Practice of Internal Auditing', () => {
      it('includes engagement topics', () => {
        const examDate = new Date(Date.now() + 5 * 86400000);
        const plan = generateCramPlan('user-123', examDate, 'CIA2');
        const engagementSessions = plan.sessions.filter((s: CramSession) =>
          s.topic.toLowerCase().includes('engagement') ||
          s.topic.toLowerCase().includes('planning') ||
          s.topic.toLowerCase().includes('performing')
        );
        expect(engagementSessions.length).toBeGreaterThan(0);
      });
    });

    describe('Part 3 - Business Knowledge', () => {
      it('covers business and IT topics', () => {
        const examDate = new Date(Date.now() + 5 * 86400000);
        const plan = generateCramPlan('user-123', examDate, 'CIA3');
        const businessSessions = plan.sessions.filter((s: CramSession) =>
          s.topic.toLowerCase().includes('business') ||
          s.topic.toLowerCase().includes('it') ||
          s.topic.toLowerCase().includes('governance')
        );
        expect(businessSessions.length).toBeGreaterThan(0);
      });
    });
  });
});
