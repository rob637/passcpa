import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Import after setting up mock
import { generateAIResponse } from '../../services/aiService';

describe('AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('generateAIResponse', () => {
    it('should return fallback response when no API key', async () => {
      // By default, no API key is set in tests
      const result = await generateAIResponse('What is GAAP?');

      // Should return a fallback response since no API key
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should handle depreciation questions with fallback', async () => {
      const result = await generateAIResponse('explain depreciation');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('depreciation');
    });

    it('should handle basis questions with fallback', async () => {
      const result = await generateAIResponse('what is tax basis?');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('basis');
    });

    it('should handle like-kind exchange questions', async () => {
      const result = await generateAIResponse('explain 1031 exchange');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('like-kind');
    });

    it('should handle S corp questions', async () => {
      const result = await generateAIResponse('what is an s corp?');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('s corp');
    });

    it('should handle lease questions', async () => {
      const result = await generateAIResponse('explain lease accounting');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('lease');
    });

    it('should handle capital gain questions', async () => {
      const result = await generateAIResponse('what is capital gain?');

      expect(result).toBeTruthy();
      expect(result.toLowerCase()).toContain('capital');
    });

    it('should provide generic response for unknown topics', async () => {
      const result = await generateAIResponse('some random topic');

      expect(result).toBeTruthy();
      expect(result).toContain('help');
    });

    it('should work with different modes', async () => {
      const explainResult = await generateAIResponse('test', 'explain');
      const quizResult = await generateAIResponse('test', 'quiz');
      const socraticResult = await generateAIResponse('test', 'socratic');

      expect(explainResult).toBeTruthy();
      expect(quizResult).toBeTruthy();
      expect(socraticResult).toBeTruthy();
    });

    it('should accept weak areas parameter', async () => {
      const weakAreas = [{ name: 'Depreciation', accuracy: 40 }];
      const result = await generateAIResponse('help me study', 'explain', weakAreas);

      expect(result).toBeTruthy();
    });

    it('should accept section parameter', async () => {
      const result = await generateAIResponse('test', 'explain', [], 'FAR');

      expect(result).toBeTruthy();
    });

    it('should accept conversation history', async () => {
      const history = [
        { role: 'user', content: 'Previous question' },
        { role: 'assistant', content: 'Previous answer' }
      ];
      const result = await generateAIResponse('Continue from before', 'explain', [], 'REG', history);

      expect(result).toBeTruthy();
    });
  });
});
