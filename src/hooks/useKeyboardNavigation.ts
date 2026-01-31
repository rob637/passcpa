/**
 * Keyboard Navigation Hook
 * Provides consistent keyboard handling for accessibility and power users
 */

import { useEffect, useCallback, useRef } from 'react';

// Common key codes
export const Keys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  // Number keys for quick selection
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  // Letter shortcuts
  N: 'n',
  P: 'p',
  S: 's',
  H: 'h',
  R: 'r',
  Q: 'q',
} as const;

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyBinding {
  key: string;
  handler: KeyHandler;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  description?: string;
}

interface UseKeyboardNavigationOptions {
  bindings: KeyBinding[];
  enabled?: boolean;
  scope?: 'global' | 'focused';
}

/**
 * Hook for declarative keyboard bindings
 */
export function useKeyboardNavigation({
  bindings,
  enabled = true,
  scope = 'global',
}: UseKeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Skip if user is typing in an input field (unless it's Escape)
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      for (const binding of bindings) {
        const keyMatches = event.key.toLowerCase() === binding.key.toLowerCase();
        const ctrlMatches = binding.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatches = binding.shift ? event.shiftKey : !event.shiftKey;
        const altMatches = binding.alt ? event.altKey : !event.altKey;

        // Allow Escape even when typing, block other keys
        if (isTyping && binding.key !== Keys.ESCAPE) continue;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          if (binding.preventDefault !== false) {
            event.preventDefault();
          }
          binding.handler(event);
          return;
        }
      }
    },
    [bindings, enabled]
  );

  useEffect(() => {
    if (scope === 'global') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, scope]);

  return { handleKeyDown };
}

/**
 * Hook for list/menu navigation with arrow keys
 */
export function useArrowNavigation<T extends HTMLElement>(
  itemCount: number,
  options: {
    onSelect?: (index: number) => void;
    onEscape?: () => void;
    wrap?: boolean;
    orientation?: 'vertical' | 'horizontal' | 'both';
    enabled?: boolean;
  } = {}
) {
  const {
    onSelect,
    onEscape,
    wrap = true,
    orientation = 'vertical',
    enabled = true,
  } = options;

  const currentIndex = useRef(0);
  const containerRef = useRef<T>(null);

  const focusItem = useCallback((index: number) => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll<HTMLElement>(
      '[role="option"], [role="menuitem"], [data-focusable="true"], button, a'
    );
    if (items[index]) {
      items[index].focus();
      currentIndex.current = index;
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      const isVertical = orientation === 'vertical' || orientation === 'both';
      const isHorizontal = orientation === 'horizontal' || orientation === 'both';

      let newIndex = currentIndex.current;

      switch (event.key) {
        case Keys.ARROW_DOWN:
          if (isVertical) {
            event.preventDefault();
            newIndex = wrap
              ? (currentIndex.current + 1) % itemCount
              : Math.min(currentIndex.current + 1, itemCount - 1);
          }
          break;

        case Keys.ARROW_UP:
          if (isVertical) {
            event.preventDefault();
            newIndex = wrap
              ? (currentIndex.current - 1 + itemCount) % itemCount
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case Keys.ARROW_RIGHT:
          if (isHorizontal) {
            event.preventDefault();
            newIndex = wrap
              ? (currentIndex.current + 1) % itemCount
              : Math.min(currentIndex.current + 1, itemCount - 1);
          }
          break;

        case Keys.ARROW_LEFT:
          if (isHorizontal) {
            event.preventDefault();
            newIndex = wrap
              ? (currentIndex.current - 1 + itemCount) % itemCount
              : Math.max(currentIndex.current - 1, 0);
          }
          break;

        case Keys.HOME:
          event.preventDefault();
          newIndex = 0;
          break;

        case Keys.END:
          event.preventDefault();
          newIndex = itemCount - 1;
          break;

        case Keys.ENTER:
        case Keys.SPACE:
          event.preventDefault();
          onSelect?.(currentIndex.current);
          return;

        case Keys.ESCAPE:
          event.preventDefault();
          onEscape?.();
          return;

        default:
          return;
      }

      if (newIndex !== currentIndex.current) {
        focusItem(newIndex);
      }
    },
    [enabled, itemCount, onSelect, onEscape, wrap, orientation, focusItem]
  );

  return {
    containerRef,
    handleKeyDown,
    focusItem,
    currentIndex: currentIndex.current,
  };
}

/**
 * Hook for quiz/practice keyboard shortcuts
 */
export function useQuizKeyboard(options: {
  onSelectOption?: (index: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  onShowHint?: () => void;
  onFlag?: () => void;
  optionCount?: number;
  enabled?: boolean;
}) {
  const {
    onSelectOption,
    onNext,
    onPrevious,
    onSubmit,
    onShowHint,
    onFlag,
    optionCount = 4,
    enabled = true,
  } = options;

  const bindings: KeyBinding[] = [
    // Number keys 1-5 for answer selection
    ...(onSelectOption
      ? Array.from({ length: Math.min(optionCount, 5) }, (_, i) => ({
          key: String(i + 1),
          handler: () => onSelectOption(i),
          description: `Select option ${i + 1}`,
        }))
      : []),
    // A-E keys for answer selection (alternative)
    ...(onSelectOption
      ? ['a', 'b', 'c', 'd', 'e'].slice(0, optionCount).map((key, i) => ({
          key,
          handler: () => onSelectOption(i),
          description: `Select option ${key.toUpperCase()}`,
        }))
      : []),
    // Navigation
    ...(onNext
      ? [
          { key: Keys.ARROW_RIGHT, handler: onNext, description: 'Next question' },
          { key: Keys.N, handler: onNext, description: 'Next question' },
        ]
      : []),
    ...(onPrevious
      ? [
          { key: Keys.ARROW_LEFT, handler: onPrevious, description: 'Previous question' },
          { key: Keys.P, handler: onPrevious, description: 'Previous question' },
        ]
      : []),
    // Actions
    ...(onSubmit
      ? [{ key: Keys.ENTER, handler: onSubmit, description: 'Submit answer' }]
      : []),
    ...(onShowHint
      ? [{ key: Keys.H, handler: onShowHint, description: 'Show hint' }]
      : []),
    ...(onFlag
      ? [{ key: 'f', handler: onFlag, description: 'Flag question' }]
      : []),
  ];

  return useKeyboardNavigation({ bindings, enabled });
}

/**
 * Hook for modal keyboard handling
 */
export function useModalKeyboard(options: {
  onClose: () => void;
  onConfirm?: () => void;
  enabled?: boolean;
}) {
  const { onClose, onConfirm, enabled = true } = options;

  const bindings: KeyBinding[] = [
    { key: Keys.ESCAPE, handler: onClose, description: 'Close modal' },
    ...(onConfirm
      ? [{ key: Keys.ENTER, handler: onConfirm, ctrl: true, description: 'Confirm' }]
      : []),
  ];

  return useKeyboardNavigation({ bindings, enabled });
}

/**
 * Hook for tab panel navigation
 * Supports both index-based and string ID-based tabs
 */
export function useTabKeyboard(
  tabIds: string[],
  activeTab: string,
  onTabChange: (tabId: string) => void,
  enabled: boolean = true
) {
  const activeIndex = tabIds.indexOf(activeTab);
  const tabCount = tabIds.length;

  const handlePrevTab = useCallback(() => {
    const newIndex = (activeIndex - 1 + tabCount) % tabCount;
    onTabChange(tabIds[newIndex]);
  }, [activeIndex, tabCount, tabIds, onTabChange]);

  const handleNextTab = useCallback(() => {
    const newIndex = (activeIndex + 1) % tabCount;
    onTabChange(tabIds[newIndex]);
  }, [activeIndex, tabCount, tabIds, onTabChange]);

  const handleFirstTab = useCallback(() => {
    onTabChange(tabIds[0]);
  }, [tabIds, onTabChange]);

  const handleLastTab = useCallback(() => {
    onTabChange(tabIds[tabCount - 1]);
  }, [tabIds, tabCount, onTabChange]);

  const bindings: KeyBinding[] = [
    {
      key: Keys.ARROW_LEFT,
      handler: handlePrevTab,
      description: 'Previous tab',
    },
    {
      key: Keys.ARROW_RIGHT,
      handler: handleNextTab,
      description: 'Next tab',
    },
    {
      key: Keys.HOME,
      handler: handleFirstTab,
      description: 'First tab',
    },
    {
      key: Keys.END,
      handler: handleLastTab,
      description: 'Last tab',
    },
  ];

  useKeyboardNavigation({ bindings, enabled, scope: 'focused' });

  // Return props for tablist container and individual tabs
  return {
    tabListProps: {
      role: 'tablist' as const,
      'aria-orientation': 'horizontal' as const,
    },
    getTabProps: (tabId: string) => ({
      role: 'tab' as const,
      'aria-selected': activeTab === tabId,
      tabIndex: activeTab === tabId ? 0 : -1,
      id: `tab-${tabId}`,
      'aria-controls': `panel-${tabId}`,
    }),
  };
}

/**
 * Utility: Make an element focusable and handle click/keyboard activation
 */
export function getAccessibleClickProps(
  onClick: () => void,
  options: { role?: string; disabled?: boolean } = {}
) {
  const { role = 'button', disabled = false } = options;

  return {
    role,
    tabIndex: disabled ? -1 : 0,
    onClick: disabled ? undefined : onClick,
    onKeyDown: disabled
      ? undefined
      : (e: React.KeyboardEvent) => {
          if (e.key === Keys.ENTER || e.key === Keys.SPACE) {
            e.preventDefault();
            onClick();
          }
        },
    'aria-disabled': disabled,
  };
}

export default useKeyboardNavigation;
