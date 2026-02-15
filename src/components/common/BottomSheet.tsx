import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { Button } from './Button';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Maximum height as percentage of viewport (default: 85) */
  maxHeight?: number;
  /** Show drag handle indicator */
  showHandle?: boolean;
  /** Allow closing by swiping down */
  swipeToClose?: boolean;
}

/**
 * Mobile-first bottom sheet component with spring animations.
 * Follows Google Material Design 3 patterns.
 * 
 * Features:
 * - Spring-based slide animation
 * - Backdrop blur
 * - Swipe-to-dismiss
 * - Keyboard accessible
 * - Body scroll lock
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = 85,
  showHandle = true,
  swipeToClose = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const canSwipeClose = useRef<boolean>(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Touch handlers for swipe-to-dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!swipeToClose) return;
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
    
    // Only allow swipe-to-close if content is scrolled to top
    // This prevents the sheet from being dismissed when user is scrolling content
    const content = contentRef.current;
    canSwipeClose.current = !content || content.scrollTop <= 0;
  }, [swipeToClose]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    // Only allow dragging down if content is at top (can close) and swiping down
    if (deltaY > 0 && canSwipeClose.current) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    
    const deltaY = currentY.current - startY.current;
    isDragging.current = false;
    
    // Close if dragged more than 100px or 25% of sheet height (and swipe was allowed)
    if (canSwipeClose.current && (deltaY > 100 || deltaY > sheetRef.current.offsetHeight * 0.25)) {
      onClose();
    } else {
      // Snap back
      sheetRef.current.style.transform = '';
    }
    
    canSwipeClose.current = false;
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'bottom-sheet-title' : undefined}
    >
      {/* Backdrop */}
      <div 
        className={clsx(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div
        ref={sheetRef}
        className={clsx(
          'relative w-full max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl',
          'transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'animate-slide-up sm:animate-fade-in'
        )}
        style={{ 
          maxHeight: `${maxHeight}vh`,
          height: 'auto', // Auto-size to content instead of filling maxHeight
          willChange: 'transform',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle - only shown on mobile bottom sheet mode */}
        {showHandle && (
          <div className="flex sm:hidden justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
          </div>
        )}
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <h2 
              id="bottom-sheet-title"
              className="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              {title}
            </h2>
            <Button 
              onClick={onClose}
              variant="ghost"
              size="icon"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <div 
          ref={contentRef}
          className="overflow-y-auto overscroll-contain px-4 pb-6"
          style={{ maxHeight: `calc(${maxHeight}vh - ${title ? '80px' : '40px'})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
