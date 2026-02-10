import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import Pricing from '../../../components/pages/Pricing';

describe('Pricing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('redirect behavior', () => {
    it('should redirect to home page', () => {
      render(
        <MemoryRouter>
          <Pricing />
        </MemoryRouter>
      );
      
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    it('should render nothing (null)', () => {
      const { container } = render(
        <MemoryRouter>
          <Pricing />
        </MemoryRouter>
      );
      
      expect(container.innerHTML).toBe('');
    });
  });
});
