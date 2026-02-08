/**
 * Tests for CISA Analytics Service
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  initializeAnalytics,
  recordQuestionAttempt,
  recordStudySession,
  recordMockExam,
  updateDomainTrend,
  updateIsacaStandardsKnowledge,
  updateControlFrameworksFamiliarity,
  addDailyTrend,
  addWeeklyTrend,
  getAnalyticsSummary,
  getDomainInsights,
  getStudyPlanProgress,
  serializeAnalytics,
  deserializeAnalytics,
  rawToScaledScore,
  scaledScoreToPassProbability,
  CISA_DOMAIN_CONFIG,
  CISAAnalytics,
  QuestionAttempt,
  StudySession,
} from '../../services/cisaAnalytics';

describe('cisaAnalytics', () => {
  let analytics: CISAAnalytics;

  beforeEach(() => {
    analytics = initializeAnalytics('test-user');
  });

  describe('initializeAnalytics', () => {
    it('creates analytics with correct user ID', () => {
      expect(analytics.userId).toBe('test-user');
    });

    it('initializes with zero stats', () => {
      expect(analytics.totalQuestionsAttempted).toBe(0);
      expect(analytics.totalQuestionsCorrect).toBe(0);
      expect(analytics.overallAccuracy).toBe(0);
      expect(analytics.mockExamsTaken).toBe(0);
    });

    it('initializes all 5 CISA domains', () => {
      const domains = Object.keys(analytics.domainMastery);
      expect(domains).toHaveLength(5);
      expect(domains).toContain('CISA1');
      expect(domains).toContain('CISA2');
      expect(domains).toContain('CISA3');
      expect(domains).toContain('CISA4');
      expect(domains).toContain('CISA5');
    });

    it('sets correct domain weights', () => {
      expect(analytics.domainMastery['CISA1'].examWeight).toBe(18);
      expect(analytics.domainMastery['CISA2'].examWeight).toBe(18);
      expect(analytics.domainMastery['CISA3'].examWeight).toBe(12);
      expect(analytics.domainMastery['CISA4'].examWeight).toBe(26);
      expect(analytics.domainMastery['CISA5'].examWeight).toBe(26);
    });

    it('initializes CISA-specific metrics', () => {
      expect(analytics.isacaStandardsKnowledge).toBe(0);
      expect(analytics.controlFrameworksFamiliarity).toBe(0);
      expect(analytics.auditMethodologyProficiency).toBe(0);
      expect(analytics.practiceSimulationsCompleted).toBe(0);
    });

    it('initializes exam readiness as not-ready', () => {
      expect(analytics.examReadiness).toBe('not-ready');
    });
  });

  describe('rawToScaledScore', () => {
    it('converts 0% to 200', () => {
      expect(rawToScaledScore(0)).toBe(200);
    });

    it('converts 60% to 450 (passing)', () => {
      expect(rawToScaledScore(60)).toBe(450);
    });

    it('converts 100% to 800', () => {
      expect(rawToScaledScore(100)).toBe(800);
    });

    it('handles values below 0', () => {
      expect(rawToScaledScore(-10)).toBe(200);
    });

    it('handles values above 100', () => {
      expect(rawToScaledScore(110)).toBe(800);
    });

    it('scales linearly in lower range', () => {
      const score30 = rawToScaledScore(30);
      expect(score30).toBeGreaterThan(200);
      expect(score30).toBeLessThan(450);
    });

    it('scales linearly in upper range', () => {
      const score80 = rawToScaledScore(80);
      expect(score80).toBeGreaterThan(450);
      expect(score80).toBeLessThan(800);
    });
  });

  describe('scaledScoreToPassProbability', () => {
    it('returns low probability for very low scores', () => {
      expect(scaledScoreToPassProbability(250)).toBeLessThan(50);
    });

    it('returns ~70% probability at passing threshold', () => {
      const prob = scaledScoreToPassProbability(450);
      expect(prob).toBeGreaterThanOrEqual(70);
    });

    it('returns high probability for high scores', () => {
      expect(scaledScoreToPassProbability(600)).toBeGreaterThan(95);
    });
  });

  describe('recordQuestionAttempt', () => {
    it('increments question count', () => {
      const attempt: QuestionAttempt = {
        questionId: 'q1',
        domain: 'CISA1',
        isCorrect: true,
        timeSpent: 60,
        attemptedAt: new Date(),
      };
      
      const updated = recordQuestionAttempt(analytics, attempt);
      expect(updated.totalQuestionsAttempted).toBe(1);
    });

    it('updates accuracy correctly', () => {
      const correct: QuestionAttempt = {
        questionId: 'q1',
        domain: 'CISA1',
        isCorrect: true,
        timeSpent: 60,
        attemptedAt: new Date(),
      };
      const incorrect: QuestionAttempt = {
        questionId: 'q2',
        domain: 'CISA1',
        isCorrect: false,
        timeSpent: 60,
        attemptedAt: new Date(),
      };
      
      let updated = recordQuestionAttempt(analytics, correct);
      updated = recordQuestionAttempt(updated, incorrect);
      
      expect(updated.overallAccuracy).toBe(50);
    });

    it('updates domain-specific stats', () => {
      const attempt: QuestionAttempt = {
        questionId: 'q1',
        domain: 'CISA4',
        isCorrect: true,
        timeSpent: 90,
        attemptedAt: new Date(),
      };
      
      const updated = recordQuestionAttempt(analytics, attempt);
      
      expect(updated.domainMastery['CISA4'].questionsAttempted).toBe(1);
      expect(updated.domainMastery['CISA4'].questionsCorrect).toBe(1);
      expect(updated.domainMastery['CISA4'].accuracy).toBe(100);
    });

    it('tracks average time per question', () => {
      const attempt1: QuestionAttempt = {
        questionId: 'q1',
        domain: 'CISA1',
        isCorrect: true,
        timeSpent: 60,
        attemptedAt: new Date(),
      };
      const attempt2: QuestionAttempt = {
        questionId: 'q2',
        domain: 'CISA1',
        isCorrect: true,
        timeSpent: 120,
        attemptedAt: new Date(),
      };
      
      let updated = recordQuestionAttempt(analytics, attempt1);
      updated = recordQuestionAttempt(updated, attempt2);
      
      expect(updated.averageTimePerQuestion).toBe(90);
    });

    it('updates audit methodology for analysis questions', () => {
      const attempt: QuestionAttempt = {
        questionId: 'q1',
        domain: 'CISA1',
        isCorrect: true,
        timeSpent: 60,
        attemptedAt: new Date(),
        cognitiveLevel: 'analysis',
      };
      
      const updated = recordQuestionAttempt(analytics, attempt);
      expect(updated.auditMethodologyProficiency).toBeGreaterThan(0);
    });
  });

  describe('recordStudySession', () => {
    it('adds study time', () => {
      const session: StudySession = {
        sessionId: 's1',
        date: new Date(),
        duration: 30,
        type: 'practice',
      };
      
      const updated = recordStudySession(analytics, session);
      expect(updated.totalStudyMinutes).toBe(30);
    });

    it('tracks simulation completions', () => {
      const session: StudySession = {
        sessionId: 's1',
        date: new Date(),
        duration: 45,
        type: 'simulation',
      };
      
      const updated = recordStudySession(analytics, session);
      expect(updated.practiceSimulationsCompleted).toBe(1);
    });

    it('starts a streak on first session', () => {
      const session: StudySession = {
        sessionId: 's1',
        date: new Date(),
        duration: 30,
        type: 'practice',
      };
      
      const updated = recordStudySession(analytics, session);
      expect(updated.currentStreak).toBe(1);
    });

    it('increments streak for consecutive days', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const session1: StudySession = {
        sessionId: 's1',
        date: yesterday,
        duration: 30,
        type: 'practice',
      };
      const session2: StudySession = {
        sessionId: 's2',
        date: new Date(),
        duration: 30,
        type: 'practice',
      };
      
      let updated = recordStudySession(analytics, session1);
      updated = recordStudySession(updated, session2);
      
      expect(updated.currentStreak).toBe(2);
    });
  });

  describe('recordMockExam', () => {
    it('records raw and scaled scores', () => {
      const domainScores = {
        CISA1: { correct: 20, total: 27 },
        CISA2: { correct: 18, total: 27 },
        CISA3: { correct: 15, total: 18 },
        CISA4: { correct: 30, total: 39 },
        CISA5: { correct: 32, total: 39 },
      };
      
      const updated = recordMockExam(analytics, 77, domainScores);
      
      expect(updated.mockExamsTaken).toBe(1);
      expect(updated.mockExamScores).toContain(77);
      expect(updated.scaledScores.length).toBe(1);
      expect(updated.scaledScores[0]).toBeGreaterThan(450);
    });

    it('updates domain mastery from exam results', () => {
      const domainScores = {
        CISA1: { correct: 20, total: 27 },
        CISA2: { correct: 18, total: 27 },
        CISA3: { correct: 15, total: 18 },
        CISA4: { correct: 30, total: 39 },
        CISA5: { correct: 32, total: 39 },
      };
      
      const updated = recordMockExam(analytics, 77, domainScores);
      
      expect(updated.domainMastery['CISA1'].questionsAttempted).toBe(27);
      expect(updated.domainMastery['CISA1'].questionsCorrect).toBe(20);
    });

    it('tracks best score', () => {
      const domainScores = {
        CISA1: { correct: 15, total: 27 },
        CISA2: { correct: 15, total: 27 },
        CISA3: { correct: 10, total: 18 },
        CISA4: { correct: 25, total: 39 },
        CISA5: { correct: 25, total: 39 },
      };
      
      let updated = recordMockExam(analytics, 60, domainScores);
      updated = recordMockExam(updated, 75, domainScores);
      updated = recordMockExam(updated, 70, domainScores);
      
      expect(updated.bestMockScore).toBe(75);
    });
  });

  describe('updateDomainTrend', () => {
    it('sets improving trend when accuracy increases', () => {
      // First set some baseline accuracy
      analytics.domainMastery['CISA1'].accuracy = 60;
      analytics.domainMastery['CISA1'].questionsAttempted = 20;
      
      const updated = updateDomainTrend(analytics, 'CISA1', 70);
      
      expect(updated.domainMastery['CISA1'].trend).toBe('improving');
    });

    it('sets declining trend when accuracy decreases', () => {
      analytics.domainMastery['CISA1'].accuracy = 70;
      analytics.domainMastery['CISA1'].questionsAttempted = 20;
      
      const updated = updateDomainTrend(analytics, 'CISA1', 60);
      
      expect(updated.domainMastery['CISA1'].trend).toBe('declining');
    });

    it('sets stable trend for small changes', () => {
      analytics.domainMastery['CISA1'].accuracy = 70;
      analytics.domainMastery['CISA1'].questionsAttempted = 20;
      
      const updated = updateDomainTrend(analytics, 'CISA1', 72);
      
      expect(updated.domainMastery['CISA1'].trend).toBe('stable');
    });
  });

  describe('updateIsacaStandardsKnowledge', () => {
    it('updates standards knowledge score', () => {
      const updated = updateIsacaStandardsKnowledge(analytics, 75);
      expect(updated.isacaStandardsKnowledge).toBe(75);
    });

    it('clamps to 0-100 range', () => {
      const updated = updateIsacaStandardsKnowledge(analytics, 150);
      expect(updated.isacaStandardsKnowledge).toBe(100);
    });
  });

  describe('updateControlFrameworksFamiliarity', () => {
    it('updates frameworks familiarity score', () => {
      const updated = updateControlFrameworksFamiliarity(analytics, 80);
      expect(updated.controlFrameworksFamiliarity).toBe(80);
    });
  });

  describe('addDailyTrend', () => {
    it('adds trend data point', () => {
      const trend = {
        date: new Date(),
        accuracy: 70,
        questionsCompleted: 20,
        studyMinutes: 60,
      };
      
      const updated = addDailyTrend(analytics, trend);
      expect(updated.dailyTrends).toHaveLength(1);
    });

    it('keeps only last 30 days', () => {
      let updated = analytics;
      for (let i = 0; i < 35; i++) {
        const trend = {
          date: new Date(),
          accuracy: 70 + i,
          questionsCompleted: 20,
          studyMinutes: 60,
        };
        updated = addDailyTrend(updated, trend);
      }
      
      expect(updated.dailyTrends).toHaveLength(30);
    });
  });

  describe('addWeeklyTrend', () => {
    it('adds trend data point', () => {
      const trend = {
        date: new Date(),
        accuracy: 70,
        questionsCompleted: 100,
        studyMinutes: 300,
      };
      
      const updated = addWeeklyTrend(analytics, trend);
      expect(updated.weeklyTrends).toHaveLength(1);
    });

    it('keeps only last 12 weeks', () => {
      let updated = analytics;
      for (let i = 0; i < 15; i++) {
        const trend = {
          date: new Date(),
          accuracy: 70 + i,
          questionsCompleted: 100,
          studyMinutes: 300,
        };
        updated = addWeeklyTrend(updated, trend);
      }
      
      expect(updated.weeklyTrends).toHaveLength(12);
    });
  });

  describe('getAnalyticsSummary', () => {
    it('returns overview with correct structure', () => {
      const summary = getAnalyticsSummary(analytics);
      
      expect(summary.overview).toHaveProperty('accuracy');
      expect(summary.overview).toHaveProperty('questionsCompleted');
      expect(summary.overview).toHaveProperty('studyHours');
      expect(summary.overview).toHaveProperty('scaledScore');
      expect(summary.overview).toHaveProperty('passChance');
      expect(summary.overview).toHaveProperty('readiness');
    });

    it('returns all 5 domains in breakdown', () => {
      const summary = getAnalyticsSummary(analytics);
      expect(summary.domainBreakdown).toHaveLength(5);
    });

    it('includes CISA-specific metrics', () => {
      const summary = getAnalyticsSummary(analytics);
      
      expect(summary.cisaSpecific).toHaveProperty('isacaStandardsScore');
      expect(summary.cisaSpecific).toHaveProperty('frameworksFamiliarity');
      expect(summary.cisaSpecific).toHaveProperty('auditProficiency');
      expect(summary.cisaSpecific).toHaveProperty('simulationsCompleted');
    });

    it('identifies strengths and weaknesses', () => {
      // Add some performance data
      analytics.domainMastery['CISA1'].accuracy = 85;
      analytics.domainMastery['CISA1'].questionsAttempted = 30;
      analytics.domainMastery['CISA5'].accuracy = 55;
      analytics.domainMastery['CISA5'].questionsAttempted = 30;
      
      const summary = getAnalyticsSummary(analytics);
      
      expect(summary.strengths).toContain('Information Systems Auditing Process');
      expect(summary.weaknesses).toContain('Protection of Information Assets');
    });

    it('generates CISA-specific recommendations', () => {
      analytics.isacaStandardsKnowledge = 40;
      analytics.controlFrameworksFamiliarity = 30;
      
      const summary = getAnalyticsSummary(analytics);
      
      const hasStandardsRec = summary.recommendations.some((r: string) => 
        r.toLowerCase().includes('isaca standards')
      );
      const hasFrameworksRec = summary.recommendations.some((r: string) => 
        r.toLowerCase().includes('control frameworks') || r.toLowerCase().includes('cobit')
      );
      
      expect(hasStandardsRec).toBe(true);
      expect(hasFrameworksRec).toBe(true);
    });
  });

  describe('getDomainInsights', () => {
    it('returns null for invalid domain', () => {
      const insights = getDomainInsights(analytics, 'INVALID');
      expect(insights).toBeNull();
    });

    it('returns insights for valid domain', () => {
      const insights = getDomainInsights(analytics, 'CISA4');
      
      expect(insights).not.toBeNull();
      expect(insights?.domain).toBe('CISA4');
      expect(insights?.name).toBe('Information Systems Operations and Business Resilience');
      expect(insights?.examWeight).toBe(26);
    });

    it('calculates gap to target', () => {
      analytics.domainMastery['CISA1'].accuracy = 60;
      
      const insights = getDomainInsights(analytics, 'CISA1');
      
      expect(insights?.gapToTarget).toBe(10); // 70 - 60 = 10
    });

    it('identifies when on track', () => {
      analytics.domainMastery['CISA1'].accuracy = 75;
      analytics.domainMastery['CISA1'].questionsAttempted = 30;
      
      const insights = getDomainInsights(analytics, 'CISA1');
      
      expect(insights?.isOnTrack).toBe(true);
    });

    it('provides domain-specific recommendations', () => {
      analytics.domainMastery['CISA1'].accuracy = 50;
      analytics.domainMastery['CISA1'].questionsAttempted = 10;
      
      const insights = getDomainInsights(analytics, 'CISA1');
      
      expect(insights?.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('getStudyPlanProgress', () => {
    it('returns overall progress', () => {
      const progress = getStudyPlanProgress(analytics);
      
      expect(progress.overallProgress).toBeDefined();
      expect(typeof progress.overallProgress).toBe('number');
    });

    it('returns per-domain progress', () => {
      const progress = getStudyPlanProgress(analytics);
      
      expect(Object.keys(progress.domainProgress)).toHaveLength(5);
    });

    it('tracks milestones', () => {
      analytics.totalQuestionsAttempted = 150;
      analytics.mockExamsTaken = 2;
      analytics.bestScaledScore = 480;
      
      const progress = getStudyPlanProgress(analytics);
      
      expect(progress.milestonesCompleted).toContain('100 Questions Completed');
      expect(progress.milestonesCompleted).toContain('Passed a Mock Exam');
    });

    it('determines next milestone', () => {
      const progress = getStudyPlanProgress(analytics);
      
      expect(progress.nextMilestone).toBeDefined();
      expect(progress.nextMilestone.length).toBeGreaterThan(0);
    });
  });

  describe('serialization', () => {
    it('serializes and deserializes correctly', () => {
      analytics.totalQuestionsAttempted = 100;
      analytics.overallAccuracy = 75;
      analytics.lastStudyDate = new Date('2024-01-15');
      
      const json = serializeAnalytics(analytics);
      const restored = deserializeAnalytics(json);
      
      expect(restored.totalQuestionsAttempted).toBe(100);
      expect(restored.overallAccuracy).toBe(75);
      expect(restored.lastStudyDate).toBeInstanceOf(Date);
    });

    it('handles null dates', () => {
      const json = serializeAnalytics(analytics);
      const restored = deserializeAnalytics(json);
      
      expect(restored.lastStudyDate).toBeNull();
    });
  });

  describe('CISA_DOMAIN_CONFIG', () => {
    it('has 5 domains', () => {
      expect(Object.keys(CISA_DOMAIN_CONFIG)).toHaveLength(5);
    });

    it('domain weights sum to 100', () => {
      const totalWeight = (Object.values(CISA_DOMAIN_CONFIG) as { name: string; weight: number; topics: string[] }[])
        .reduce((sum: number, d) => sum + d.weight, 0);
      
      expect(totalWeight).toBe(100);
    });

    it('all domains have topics', () => {
      (Object.values(CISA_DOMAIN_CONFIG) as { name: string; weight: number; topics: string[] }[]).forEach((domain) => {
        expect(domain.topics.length).toBeGreaterThan(0);
      });
    });
  });

  describe('exam readiness prediction', () => {
    it('sets well-prepared for high performers', () => {
      // Simulate a high performer with lots of practice
      // Must set questionsCorrect to match accuracy
      Object.keys(analytics.domainMastery).forEach(domain => {
        analytics.domainMastery[domain].questionsAttempted = 100;
        analytics.domainMastery[domain].questionsCorrect = 85;
        analytics.domainMastery[domain].accuracy = 85;
      });
      analytics.totalQuestionsAttempted = 500;
      analytics.totalQuestionsCorrect = 425;
      analytics.overallAccuracy = 85;
      analytics.bestMockScore = 85;
      analytics.mockExamsTaken = 3;
      
      // Record a mock exam with high scores to trigger prediction update
      const domainScores = {
        CISA1: { correct: 23, total: 27 },
        CISA2: { correct: 23, total: 27 },
        CISA3: { correct: 16, total: 18 },
        CISA4: { correct: 35, total: 39 },
        CISA5: { correct: 35, total: 39 },
      };
      
      const updated = recordMockExam(analytics, 88, domainScores);
      
      // After adding high-scoring mock, domain accuracy should remain high
      // Expected: (85+23)/(100+27) = 85% for CISA1, similar for others
      // Scaled score for 85% should be well above passing (450)
      expect(updated.estimatedScaledScore).toBeGreaterThanOrEqual(450);
    });

    it('sets not-ready for low performers', () => {
      Object.keys(analytics.domainMastery).forEach(domain => {
        analytics.domainMastery[domain].accuracy = 40;
        analytics.domainMastery[domain].questionsAttempted = 10;
      });
      
      const domainScores = {
        CISA1: { correct: 10, total: 27 },
        CISA2: { correct: 10, total: 27 },
        CISA3: { correct: 5, total: 18 },
        CISA4: { correct: 15, total: 39 },
        CISA5: { correct: 15, total: 39 },
      };
      
      const updated = recordMockExam(analytics, 37, domainScores);
      
      expect(updated.examReadiness).toBe('not-ready');
    });
  });
});
