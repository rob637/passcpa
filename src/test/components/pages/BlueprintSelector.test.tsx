import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExamDateSelector } from '../../../components/pages/BlueprintSelector';

describe('BlueprintSelector', () => {
  describe('ExamDateSelector', () => {
    const mockOnDateSelected = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders the date selector', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      expect(screen.getByText(/When Are You Testing/i)).toBeInTheDocument();
    });

    it('renders exam date input label', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      expect(screen.getByText(/Target Exam Date/i)).toBeInTheDocument();
    });

    it('renders date input field', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      expect(dateInput).toBeInTheDocument();
      expect(dateInput).toHaveAttribute('type', 'date');
    });

    it('renders description text', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      expect(screen.getByText(/Your exam date determines which Blueprint applies/i)).toBeInTheDocument();
    });

    it('calls onDateSelected when date changes', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      fireEvent.change(dateInput, { target: { value: '2026-05-15' } });
      
      expect(mockOnDateSelected).toHaveBeenCalled();
    });

    it('determines 2025 blueprint for date before July 2026', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      fireEvent.change(dateInput, { target: { value: '2026-06-15' } });
      
      // Should call with 2025 blueprint
      expect(mockOnDateSelected).toHaveBeenCalledWith(
        expect.any(Date),
        '2025'
      );
    });

    it('determines 2026 blueprint for date on or after July 2026', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      fireEvent.change(dateInput, { target: { value: '2026-07-15' } });
      
      // Should call with 2026 blueprint
      expect(mockOnDateSelected).toHaveBeenCalledWith(
        expect.any(Date),
        '2026'
      );
    });

    it('accepts initial date prop', () => {
      const initialDate = new Date('2026-08-15');
      render(
        <ExamDateSelector 
          onDateSelected={mockOnDateSelected} 
          initialDate={initialDate}
        />
      );
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      expect(dateInput).toHaveValue('2026-08-15');
    });

    it('renders with proper container styling', () => {
      const { container } = render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('bg-white');
    });

    it('shows blueprint indicator after date selection', () => {
      render(<ExamDateSelector onDateSelected={mockOnDateSelected} />);
      
      const dateInput = screen.getByLabelText(/Target Exam Date/i);
      fireEvent.change(dateInput, { target: { value: '2026-05-15' } });
      
      // After date selection, blueprint info should appear (multiple elements match)
      expect(screen.getAllByText(/2025/).length).toBeGreaterThan(0);
    });
  });

  describe('BlueprintSelector module exports', () => {
    it('exports ExamDateSelector component', async () => {
      const module = await import('../../../components/pages/BlueprintSelector');
      expect(module.ExamDateSelector).toBeDefined();
      expect(typeof module.ExamDateSelector).toBe('function');
    });
  });
});
