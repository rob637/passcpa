import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateAIResponse } from '../../services/aiService';

describe('aiService.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Reset import.meta.env mock
    vi.stubEnv('VITE_GEMINI_API_KEY', '');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  describe('generateAIResponse - Fallback Mode (no API key)', () => {
    describe('explain mode', () => {
      it('should return capital gains explanation', async () => {
        const response = await generateAIResponse('capital gains', 'explain');
        
        expect(response).toContain('Capital');
        expect(response).toContain('Gain');
      });

      it('should return lease explanation', async () => {
        const response = await generateAIResponse('lease classification', 'explain');
        
        expect(response).toContain('Lease');
        expect(response).toContain('Finance');
      });

      it('should return 1031 like-kind exchange explanation', async () => {
        const response = await generateAIResponse('1031 exchange', 'explain');
        
        expect(response).toContain('1031');
        expect(response).toContain('Like-Kind');
      });

      it('should return like-kind exchange explanation', async () => {
        const response = await generateAIResponse('like-kind exchange', 'explain');
        
        expect(response).toContain('Like-Kind');
      });

      it('should return S corp explanation', async () => {
        const response = await generateAIResponse('s corp requirements', 'explain');
        
        expect(response).toContain('S Corporation');
      });

      it('should return S-corp explanation with hyphen', async () => {
        const response = await generateAIResponse('s-corp', 'explain');
        
        expect(response).toContain('S Corporation');
      });

      it('should return default explanation for unknown topic', async () => {
        const response = await generateAIResponse('depreciation methods', 'explain');
        
        expect(response).toContain('Let me help you');
        expect(response).toContain('depreciation methods');
      });
    });

    describe('socratic mode', () => {
      it('should return socratic lease response', async () => {
        const response = await generateAIResponse('lease accounting', 'socratic');
        
        expect(response).toContain('think through');
        expect(response).toContain('lease');
      });

      it('should return socratic partnership basis response', async () => {
        const response = await generateAIResponse('partnership basis', 'socratic');
        
        expect(response).toContain('partnership basis');
        expect(response).toContain('step by step');
      });

      it('should return socratic basis response', async () => {
        const response = await generateAIResponse('what is tax basis', 'socratic');
        
        expect(response).toContain('step by step');
      });

      it('should return default socratic response for unknown topic', async () => {
        const response = await generateAIResponse('unknown topic', 'socratic');
        
        expect(response).toContain('explore this together');
      });
    });

    describe('quiz mode', () => {
      it('should return quiz for lease topic', async () => {
        const response = await generateAIResponse('quiz me on leases', 'quiz');
        
        expect(response).toContain('Quiz');
        expect(response).toContain('Lease');
      });

      it('should return quiz for S corp topic', async () => {
        const response = await generateAIResponse('quiz me on s corp', 'quiz');
        
        expect(response).toContain('Quiz');
        expect(response).toContain('S Corporation');
      });

      it('should return quiz for s-corp topic', async () => {
        const response = await generateAIResponse('s-corp quiz', 'quiz');
        
        expect(response).toContain('Quiz');
        expect(response).toContain('S Corporation');
      });

      it('should return default quiz response for unknown topic', async () => {
        const response = await generateAIResponse('quiz me', 'quiz');
        
        expect(response).toContain('quiz you');
      });
    });

    describe('with user context', () => {
      it('should accept weak areas parameter', async () => {
        const weakAreas = [
          { name: 'Revenue Recognition', accuracy: 45 },
          { name: 'Leases', accuracy: 52 },
        ];
        
        const response = await generateAIResponse(
          'explain leases',
          'explain',
          weakAreas,
          'FAR'
        );
        
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
      });

      it('should accept conversation history parameter', async () => {
        const conversationHistory = [
          { role: 'user' as const, content: 'What is a lease?' },
          { role: 'assistant' as const, content: 'A lease is...' },
        ];
        
        const response = await generateAIResponse(
          'tell me more',
          'explain',
          [],
          'FAR',
          conversationHistory
        );
        
        expect(response).toBeDefined();
      });

      it('should handle empty weak areas', async () => {
        const response = await generateAIResponse(
          'lease classification',
          'explain',
          [],
          'AUD'
        );
        
        expect(response).toBeDefined();
      });
    });
  });

  describe('generateAIResponse - API Mode (with API key)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');
    });

    it('should call Gemini API when API key is available', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'AI Response about leases' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      const response = await generateAIResponse('explain leases', 'explain');
      
      expect(fetchMock).toHaveBeenCalled();
      expect(response).toBe('AI Response about leases');
    });

    it('should handle API error and fallback', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });
      vi.stubGlobal('fetch', fetchMock);

      const response = await generateAIResponse('explain leases', 'explain');
      
      // Should fallback to mock response
      expect(response).toContain('Lease');
    });

    it('should handle missing candidates in response', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });
      vi.stubGlobal('fetch', fetchMock);

      const response = await generateAIResponse('explain leases', 'explain');
      
      // Should fallback to mock response
      expect(response).toContain('Lease');
    });

    it('should handle network error', async () => {
      const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
      vi.stubGlobal('fetch', fetchMock);

      const response = await generateAIResponse('explain leases', 'explain');
      
      // Should fallback to mock response
      expect(response).toContain('Lease');
    });

    it('should include conversation history in API call', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'AI Response' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      const conversationHistory = [
        { role: 'user' as const, content: 'Previous question' },
        { role: 'assistant' as const, content: 'Previous answer' },
      ];

      await generateAIResponse(
        'follow up question',
        'explain',
        [],
        'REG',
        conversationHistory
      );
      
      const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(callBody.contents.length).toBeGreaterThan(1);
    });

    it('should use socratic system prompt for socratic mode', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'Socratic response' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      await generateAIResponse('help me understand leases', 'socratic');
      
      const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(callBody.systemInstruction.parts[0].text).toContain('Socratic');
    });

    it('should use quiz system prompt for quiz mode', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'Quiz response' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      await generateAIResponse('quiz me', 'quiz');
      
      const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(callBody.systemInstruction.parts[0].text).toContain('quiz master');
    });

    it('should include weak areas in context', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'AI Response' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      const weakAreas = [
        { name: 'Leases', accuracy: 40 },
      ];

      await generateAIResponse('help', 'explain', weakAreas, 'FAR');
      
      const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(callBody.systemInstruction.parts[0].text).toContain('Leases');
      expect(callBody.systemInstruction.parts[0].text).toContain('40%');
    });

    it('should limit conversation history to last 6 messages', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{
            content: {
              parts: [{ text: 'AI Response' }]
            }
          }]
        }),
      });
      vi.stubGlobal('fetch', fetchMock);

      const conversationHistory = Array(10).fill(null).map((_, i) => ({
        role: (i % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
        content: `Message ${i}`,
      }));

      await generateAIResponse('new question', 'explain', [], 'REG', conversationHistory);
      
      const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
      // Should have 6 history messages + 1 current message = 7
      expect(callBody.contents.length).toBe(7);
    });
  });

  describe('default export', () => {
    it('should export generateAIResponse', async () => {
      const module = await import('../../services/aiService');
      
      expect(module.default).toBeDefined();
      expect(module.default.generateAIResponse).toBe(module.generateAIResponse);
    });
  });
});
