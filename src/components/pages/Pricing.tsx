import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Legacy /pricing route - redirects to main page
 * 
 * Per-exam pricing is now shown on each exam's landing page:
 * - /cpa#pricing
 * - /ea#pricing
 * - /cma#pricing
 * etc.
 */
const Pricing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page where users can select their exam
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Pricing;
