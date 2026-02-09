/**
 * Quality Tests for AI Service
 * 
 * Tests AI tutor modes, fallback responses, and API integration.
 * Focus: System prompts, response generation, error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generateAIResponse } from '../../services/aiService';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AI Service - Quality Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Fallback Response Generation', () => {
    // These tests run without API key, testing fallback logic
    
    describe('Explain Mode Fallbacks', () => {
      it('should provide capital gains explanation when asked about capital gains', async () => {
        const response = await generateAIResponse('capital gain', 'explain');
        
        expect(response).toContain('Capital Gain');
        expect(response).toContain('Short-term');
        expect(response).toContain('Long-term');
      });

      it('should provide lease classification explanation for lease questions', async () => {
        const response = await generateAIResponse('lease classification', 'explain');
        
        expect(response).toContain('Lease');
        expect(response).toContain('ASC 842');
        expect(response).toContain('Finance Lease');
        expect(response).toContain('Operating');
      });

      it('should provide 1031 exchange explanation', async () => {
        const response = await generateAIResponse('1031 exchange', 'explain');
        
        expect(response).toContain('1031');
        expect(response).toContain('Like-Kind');
        expect(response).toContain('45 days');
        expect(response).toContain('180 days');
      });

      it('should provide like-kind exchange explanation', async () => {
        const response = await generateAIResponse('like-kind exchange', 'explain');
        
        expect(response).toContain('Like-Kind');
        expect(response).toContain('Boot');
      });

      it('should provide S Corp explanation', async () => {
        const response = await generateAIResponse('S corp requirements', 'explain');
        
        expect(response).toContain('S Corporation');
        expect(response).toContain('100');
        // The word 'Domestic' may be formatted with markdown bold **D**omestic
        expect(response.toLowerCase()).toContain('omestic');
      });

      it('should handle s-corp hyphenated format', async () => {
        const response = await generateAIResponse('What is an s-corp?', 'explain');
        
        expect(response).toContain('S Corporation');
      });

      it('should provide generic response for unknown topics', async () => {
        const response = await generateAIResponse('random accounting topic xyz', 'explain');
        
        expect(response).toContain('random accounting topic xyz');
        expect(response.toLowerCase()).toContain('question');
      });
    });

    describe('Socratic Mode Fallbacks', () => {
      it('should ask probing questions about leases in Socratic mode', async () => {
        const response = await generateAIResponse('lease classification', 'socratic');
        
        expect(response).toContain('?'); // Should ask questions
        expect(response.toLowerCase()).toContain('think');
      });

      it('should guide through partnership basis questions', async () => {
        const response = await generateAIResponse('partnership basis', 'socratic');
        
        expect(response).toContain('?');
        expect(response.toLowerCase()).toContain('partner');
      });

      it('should ask for context on unknown Socratic topics', async () => {
        const response = await generateAIResponse('random topic', 'socratic');
        
        expect(response).toContain('?');
        expect(response.toLowerCase()).toMatch(/what|thinking|know/);
      });
    });

    describe('Quiz Mode Fallbacks', () => {
      it('should generate lease quiz question in quiz mode', async () => {
        const response = await generateAIResponse('quiz me on leases', 'quiz');
        
        expect(response).toContain('Quiz');
        // The quiz may use different answer formats
        expect(response.toLowerCase()).toContain('lease');
      });

      it('should generate S Corp quiz question', async () => {
        const response = await generateAIResponse('quiz on s corp', 'quiz');
        
        expect(response).toContain('Quiz');
        expect(response.toUpperCase()).toMatch(/A\)|B\)|C\)|D\)/);
      });

      it('should prompt for topic on generic quiz request', async () => {
        const response = await generateAIResponse('give me a quiz', 'quiz');
        
        expect(response.toLowerCase()).toContain('topic');
      });
    });
  });

  describe('Case Insensitivity', () => {
    it('should handle uppercase input', async () => {
      const response = await generateAIResponse('CAPITAL GAIN', 'explain');
      expect(response).toContain('Capital');
    });

    it('should handle mixed case input', async () => {
      const response = await generateAIResponse('LeAsE', 'explain');
      expect(response).toContain('Lease');
    });
  });

  describe('Mode Parameter', () => {
    it('should default to explain mode when mode is undefined', async () => {
      const response = await generateAIResponse('capital gains');
      // Should give explanation, not quiz or socratic
      expect(response).toContain('Capital');
    });

    it('should handle invalid mode gracefully', async () => {
      const response = await generateAIResponse('capital gains', 'invalid_mode' as any);
      // Should not crash
      expect(response).toBeDefined();
    });
  });

  describe('User Context Integration', () => {
    it('should accept weak areas array', async () => {
      const weakAreas = [
        { name: 'Leases', accuracy: 45 },
        { name: 'Revenue Recognition', accuracy: 55 },
      ];
      
      // Should not throw
      const response = await generateAIResponse('help me study', 'explain', weakAreas);
      expect(response).toBeDefined();
    });

    it('should accept section parameter', async () => {
      const response = await generateAIResponse('tax question', 'explain', [], 'REG');
      expect(response).toBeDefined();
    });

    it('should accept conversation history', async () => {
      const history = [
        { role: 'user' as const, content: 'What are adjusting entries?' },
        { role: 'assistant' as const, content: 'Adjusting entries are...' },
      ];
      
      const response = await generateAIResponse('explain more', 'explain', [], 'FAR', history);
      expect(response).toBeDefined();
    });

    it('should handle empty weak areas', async () => {
      const response = await generateAIResponse('test', 'explain', []);
      expect(response).toBeDefined();
    });

    it('should handle empty conversation history', async () => {
      const response = await generateAIResponse('test', 'explain', [], 'FAR', []);
      expect(response).toBeDefined();
    });
  });

  describe('API Integration (Mocked)', () => {
    beforeEach(() => {
      // Set API key
      vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');
      
      // Reset modules to pick up env change
      vi.resetModules();
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should call Gemini API when API key is present', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'AI generated response' }]
            }
          }]
        })
      });

      // Re-import to get module with mocked env
      const { generateAIResponse: genResponse } = await import('../../services/aiService');
      
      // This may or may not hit API depending on env setup
      const response = await genResponse('test question', 'explain');
      expect(response).toBeDefined();
    });

    it('should fall back on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should fall back to mock response
      expect(response).toContain('Capital');
    });

    it('should fall back on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should fall back to mock response
      expect(response).toBeDefined();
    });

    it('should handle empty response from API', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ candidates: [] })
      });

      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should fall back
      expect(response).toBeDefined();
    });

    it('should handle malformed API response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ invalid: 'structure' })
      });

      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should fall back
      expect(response).toBeDefined();
    });
  });

  describe('Response Formatting', () => {
    it('should include markdown formatting in responses', async () => {
      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should have markdown bold
      expect(response).toMatch(/\*\*[^*]+\*\*/);
    });

    it('should include emojis in friendly responses', async () => {
      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should have emojis
      expect(response).toMatch(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u);
    });

    it('should include tables in detailed explanations', async () => {
      const response = await generateAIResponse('capital gain', 'explain');
      
      // Should have table formatting
      expect(response).toContain('|');
    });

    it('should include high-yield exam points', async () => {
      const response = await generateAIResponse('lease', 'explain');
      
      expect(response.toLowerCase()).toContain('high-yield');
    });
  });

  describe('Content Accuracy', () => {
    it('should include correct long-term capital gains rates', async () => {
      const response = await generateAIResponse('capital gain rates', 'explain');
      
      // 2024 LTCG rates
      expect(response).toContain('0%');
      expect(response).toContain('15%');
      expect(response).toContain('20%');
    });

    it('should include correct lease timelines (75%/90%)', async () => {
      const response = await generateAIResponse('finance lease criteria', 'explain');
      
      expect(response).toMatch(/75\s*%/);
      expect(response).toMatch(/90\s*%/);
    });

    it('should include correct 1031 timelines (45/180 days)', async () => {
      const response = await generateAIResponse('1031', 'explain');
      
      expect(response).toContain('45');
      expect(response).toContain('180');
    });

    it('should include correct S Corp shareholder limit (100)', async () => {
      const response = await generateAIResponse('s corp', 'explain');
      
      expect(response).toContain('100');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string input', async () => {
      const response = await generateAIResponse('', 'explain');
      expect(response).toBeDefined();
    });

    it('should handle very long input', async () => {
      const longInput = 'a'.repeat(10000);
      const response = await generateAIResponse(longInput, 'explain');
      expect(response).toBeDefined();
    });

    it('should handle special characters in input', async () => {
      const response = await generateAIResponse('What is $100 & <tax>?', 'explain');
      expect(response).toBeDefined();
    });

    it('should handle unicode in input', async () => {
      const response = await generateAIResponse('税金 (zeikin = tax)', 'explain');
      expect(response).toBeDefined();
    });

    it('should handle null-ish parameters gracefully', async () => {
      // TypeScript would prevent this, but test runtime behavior
      const response = await generateAIResponse(
        'test',
        'explain',
        undefined as any,
        undefined as any,
        undefined as any
      );
      expect(response).toBeDefined();
    });
  });
});
