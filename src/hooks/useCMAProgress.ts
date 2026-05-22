
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCMAProgress, CMAOverallProgress } from '../services/cmaProgressService';
import { CMASectionId } from '../courses/cma';
import logger from '../utils/logger';

export function useCMAProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CMAOverallProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getCMAProgress(user.uid);
        setProgress(data);
      } catch (err) {
        logger.error('Failed to load CMA progress', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user]);

  const updateProgress = async (sectionId: CMASectionId, updates: any) => {
    logger.info('Update progress requested', { sectionId, updates });
  };

  return { progress, loading, error, updateProgress };
}
