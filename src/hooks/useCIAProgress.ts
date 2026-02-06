
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCIAProgress, CIAOverallProgress } from '../services/ciaProgressService';
import { CIASectionId } from '../utils/ciaStudyPlanner';
import logger from '../utils/logger';

export function useCIAProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CIAOverallProgress | null>(null);
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
        const data = await getCIAProgress(user.uid);
        setProgress(data);
      } catch (err) {
        logger.error('Failed to load CIA progress', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user]);

  const updateProgress = async (sectionId: CIASectionId, updates: any) => {
      // Wrapper for update service
      logger.info('Update progress requested', { sectionId, updates });
  }

  return { progress, loading, error, updateProgress };
}
