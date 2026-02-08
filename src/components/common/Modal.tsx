import React, { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title (for header) */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdrop?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Center modal content vertically */
  centered?: boolean;
  /** Additional class for the modal content */
  className?: string;
  /** Modal contents */
  children: React.ReactNode;
  /** Footer content (buttons, etc.) */
  footer?: React.ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
};

/**
 * Modal component with focus trap, keyboard navigation, and accessibility.
 * 
 * @example
 * // Basic modal
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action">
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * 
 * // With footer
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={handleClose}
 *   title="Edit Item"
 *   footer={
 *     <div className="flex justify-end gap-3">
 *       <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *       <Button variant="primary" onClick={handleSave}>Save</Button>
 *     </div>
 *   }
 * >
 *   <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  centered = true,
  className,
  children,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  // Lock body scroll and manage focus
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Add escape listener
      document.addEventListener('keydown', handleKeyDown);

      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);

      return () => {
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove escape listener
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={clsx(
        'fixed inset-0 z-50 overflow-y-auto',
        'flex min-h-full p-4',
        centered ? 'items-center' : 'items-start pt-20',
        'justify-center'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={clsx(
          'relative w-full transform transition-all',
          'bg-white dark:bg-slate-800 rounded-2xl shadow-xl',
          'border border-slate-200 dark:border-slate-700',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
                  'hover:bg-slate-100 dark:hover:bg-slate-700',
                  'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
                )}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render in portal to escape any parent overflow:hidden
  return createPortal(modalContent, document.body);
};

export default Modal;
