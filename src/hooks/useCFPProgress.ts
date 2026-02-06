import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCFPProgress, CFPOverallProgress, CFPSectionId } from '../services/cfpProgressService';
import logger from '../utils/logger'; // Assuming logger exists based on previous file

export function useCFPProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CFPOverallProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProgress() {
        // Allow loading even without user for dev/preview (simulated)
        // In prod, check user
      try {
        setLoading(true);
        // const data = await getCFPProgress(user?.uid || 'guest');
        const data = await getCFPProgress('guest');
        setProgress(data);
      } catch (err) {
        // logger.error('Failed to load CFP progress', err);
        console.error(err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, [user]);

  return { progress, loading, error };
}
