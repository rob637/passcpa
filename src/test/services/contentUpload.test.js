import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collection, doc, writeBatch, getDocs } from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  writeBatch: vi.fn(() => ({
    set: vi.fn(),
    commit: vi.fn().mockResolvedValue(undefined),
  })),
  getDocs: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({
  db: {},
}));

vi.mock('../../data/questions', () => ({
  ALL_QUESTIONS: [
    { id: 'q1', text: 'Question 1', section: 'REG' },
    { id: 'q2', text: 'Question 2', section: 'FAR' },
    { id: 'q3', text: 'Question 3', section: 'AUD' },
  ],
}));

vi.mock('../../data/tbs', () => ({
  FAR_TBS_ALL: [{ id: 'far-tbs-1', title: 'FAR TBS 1' }],
  REG_TBS_ALL: [{ id: 'reg-tbs-1', title: 'REG TBS 1' }],
  AUD_TBS_ALL: [{ id: 'aud-tbs-1', title: 'AUD TBS 1' }],
}));

// Import after mocks
import { uploadAllMCQs, uploadTBS } from '../../services/contentUpload';

describe('contentUpload Service', () => {
  let mockBatch;

  beforeEach(() => {
    vi.clearAllMocks();
    mockBatch = {
      set: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(writeBatch).mockReturnValue(mockBatch);
  });

  describe('uploadAllMCQs', () => {
    it('uploads new questions that do not exist', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [], // No existing questions
      });
      vi.mocked(collection).mockReturnValue({});
      vi.mocked(doc).mockReturnValue({});

      const onProgress = vi.fn();
      const result = await uploadAllMCQs(onProgress);

      expect(result.skipped).toBe(0);
      expect(mockBatch.set).toHaveBeenCalledTimes(3); // 3 questions
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('skips existing questions', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ id: 'q1' }, { id: 'q2' }], // q1 and q2 exist
      });
      vi.mocked(collection).mockReturnValue({});
      vi.mocked(doc).mockReturnValue({});

      const onProgress = vi.fn();
      const result = await uploadAllMCQs(onProgress);

      expect(result.skipped).toBe(2); // 2 skipped
      expect(mockBatch.set).toHaveBeenCalledTimes(1); // Only q3
    });

    it('returns message when all questions exist', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }],
      });

      const onProgress = vi.fn();
      const result = await uploadAllMCQs(onProgress);

      expect(result.uploaded).toBe(0);
      expect(result.skipped).toBe(3);
      expect(result.message).toBe('All questions already exist');
    });

    it('calls progress callback during upload', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [],
      });
      vi.mocked(collection).mockReturnValue({});
      vi.mocked(doc).mockReturnValue({});

      const onProgress = vi.fn();
      await uploadAllMCQs(onProgress);

      expect(onProgress).toHaveBeenCalled();
    });
  });

  describe('uploadTBS', () => {
    it('uploads TBS simulations', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [], // No existing TBS
      });
      vi.mocked(collection).mockReturnValue({});
      vi.mocked(doc).mockReturnValue({});

      const onProgress = vi.fn();
      const result = await uploadTBS(onProgress);

      expect(result.skipped).toBe(0);
      expect(mockBatch.set).toHaveBeenCalledTimes(3); // 3 TBS (1 each from FAR, REG, AUD)
    });

    it('skips existing TBS', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ id: 'far-tbs-1' }], // FAR TBS exists
      });
      vi.mocked(collection).mockReturnValue({});
      vi.mocked(doc).mockReturnValue({});

      const onProgress = vi.fn();
      const result = await uploadTBS(onProgress);

      expect(result.skipped).toBe(1);
      expect(mockBatch.set).toHaveBeenCalledTimes(2); // Only REG and AUD TBS
    });

    it('returns message when all TBS exist', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{ id: 'far-tbs-1' }, { id: 'reg-tbs-1' }, { id: 'aud-tbs-1' }],
      });

      const onProgress = vi.fn();
      const result = await uploadTBS(onProgress);

      expect(result.uploaded).toBe(0);
      expect(result.skipped).toBe(3);
      expect(result.message).toBe('All TBS already exist');
    });
  });
});
