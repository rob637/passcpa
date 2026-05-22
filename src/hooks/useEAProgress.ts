
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getEAProgress, EAOverallProgress } from '../services/eaProgressService';
import { EASectionId } from '../courses/ea';
import logger from '../utils/logger';

export function useEAProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<EAOverallProgress | null>(null);
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
        const data = await getEAProgress(user.uid);
        setProgress(data);
      } catch (err) {
        logger.error('Failed to load EA progress', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user]);

  const updateProgress = async (sectionId: EASectionId, updates: any) => {
    logger.info('Update progress requested', { sectionId, updates });
  };

  return { progress, loading, error, updateProgress };
}
