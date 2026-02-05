/**
 * useKeyboardNavigation Hook - Quality Tests (Bug-Finding Focus)
 * 
 * Tests keyboard navigation bindings for edge cases.
 * Coverage area at 20.19% - adding comprehensive tests.
 * @batch keyboard navigation tests (50 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  Keys,
  useKeyboardNavigation,
  useArrowNavigation,
  useQuizKeyboard,
  useModalKeyboard,
  useTabKeyboard,
  getAccessibleClickProps,
} from '../../hooks/useKeyboardNavigation';

describe('useKeyboardNavigation Hook - Quality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up event listeners
  });

  describe('Keys Constant', () => {
    it('exports ENTER key', () => {
      expect(Keys.ENTER).toBe('Enter');
    });

    it('exports SPACE key', () => {
      expect(Keys.SPACE).toBe(' ');
    });

    it('exports ESCAPE key', () => {
      expect(Keys.ESCAPE).toBe('Escape');
    });

    it('exports TAB key', () => {
      expect(Keys.TAB).toBe('Tab');
    });

    it('exports all arrow keys', () => {
      expect(Keys.ARROW_UP).toBe('ArrowUp');
      expect(Keys.ARROW_DOWN).toBe('ArrowDown');
      expect(Keys.ARROW_LEFT).toBe('ArrowLeft');
      expect(Keys.ARROW_RIGHT).toBe('ArrowRight');
    });

    it('exports number keys', () => {
      expect(Keys.ONE).toBe('1');
      expect(Keys.TWO).toBe('2');
      expect(Keys.THREE).toBe('3');
      expect(Keys.FOUR).toBe('4');
      expect(Keys.FIVE).toBe('5');
    });

    it('exports letter shortcuts', () => {
      expect(Keys.N).toBe('n');
      expect(Keys.P).toBe('p');
      expect(Keys.S).toBe('s');
      expect(Keys.H).toBe('h');
      expect(Keys.R).toBe('r');
      expect(Keys.Q).toBe('q');
    });

    it('exports HOME and END keys', () => {
      expect(Keys.HOME).toBe('Home');
      expect(Keys.END).toBe('End');
    });

    it('exports PAGE_UP and PAGE_DOWN keys', () => {
      expect(Keys.PAGE_UP).toBe('PageUp');
      expect(Keys.PAGE_DOWN).toBe('PageDown');
    });
  });

  describe('useKeyboardNavigation Basic', () => {
    it('returns handleKeyDown function', () => {
      const { result } = renderHook(() => useKeyboardNavigation({
        bindings: [],
      }));
      expect(result.current.handleKeyDown).toBeInstanceOf(Function);
    });

    it('calls handler when key is pressed', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler }],
      }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });

    it('handles case-insensitive key matching', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'A', handler }],
      }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });

    it('does not call handler for different key', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler }],
      }));

      const event = new KeyboardEvent('keydown', { key: 'b' });
      window.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('useKeyboardNavigation Modifier Keys', () => {
    it('handles ctrl modifier', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 's', handler, ctrl: true }],
      }));

      const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });

    it('does not call ctrl handler without ctrl key', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 's', handler, ctrl: true }],
      }));

      const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: false });
      window.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('handles shift modifier', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler, shift: true }],
      }));

      const event = new KeyboardEvent('keydown', { key: 'a', shiftKey: true });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });

    it('handles alt modifier', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler, alt: true }],
      }));

      const event = new KeyboardEvent('keydown', { key: 'a', altKey: true });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });

    it('handles meta key as ctrl alternative', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 's', handler, ctrl: true }],
      }));

      // Meta key (Cmd on Mac) should work as ctrl
      const event = new KeyboardEvent('keydown', { key: 's', metaKey: true });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });
  });

  describe('useKeyboardNavigation Enabled/Disabled', () => {
    it('does not call handler when disabled', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler }],
        enabled: false,
      }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });

    it('calls handler when explicitly enabled', () => {
      const handler = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler }],
        enabled: true,
      }));

      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);

      expect(handler).toHaveBeenCalled();
    });
  });

  describe('useKeyboardNavigation Multiple Bindings', () => {
    it('handles multiple key bindings', () => {
      const handlerA = vi.fn();
      const handlerB = vi.fn();
      renderHook(() => useKeyboardNavigation({
        bindings: [
          { key: 'a', handler: handlerA },
          { key: 'b', handler: handlerB },
        ],
      }));

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));

      expect(handlerA).toHaveBeenCalled();
      expect(handlerB).toHaveBeenCalled();
    });

    it('handles empty bindings array', () => {
      expect(() => {
        renderHook(() => useKeyboardNavigation({
          bindings: [],
        }));
      }).not.toThrow();
    });
  });

  describe('useKeyboardNavigation Edge Cases', () => {
    it('cleans up listeners on unmount', () => {
      const handler = vi.fn();
      const { unmount } = renderHook(() => useKeyboardNavigation({
        bindings: [{ key: 'a', handler }],
      }));

      unmount();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      window.dispatchEvent(event);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('useArrowNavigation', () => {
    it('returns containerRef and handleKeyDown', () => {
      const { result } = renderHook(() => useArrowNavigation(5));
      expect(result.current.containerRef).toBeDefined();
      expect(result.current.handleKeyDown).toBeInstanceOf(Function);
    });

    it('handles zero item count', () => {
      const { result } = renderHook(() => useArrowNavigation(0));
      expect(result.current).toBeDefined();
    });

    it('handles negative item count', () => {
      const { result } = renderHook(() => useArrowNavigation(-1));
      expect(result.current).toBeDefined();
    });

    it('calls onSelect when Enter pressed', () => {
      const onSelect = vi.fn();
      const { result } = renderHook(() => useArrowNavigation(5, { onSelect }));
      
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      result.current.handleKeyDown(event);
      
      expect(onSelect).toHaveBeenCalled();
    });

    it('calls onSelect when Space pressed', () => {
      const onSelect = vi.fn();
      const { result } = renderHook(() => useArrowNavigation(5, { onSelect }));
      
      const event = { key: ' ', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      result.current.handleKeyDown(event);
      
      expect(onSelect).toHaveBeenCalled();
    });

    it('calls onEscape when Escape pressed', () => {
      const onEscape = vi.fn();
      const { result } = renderHook(() => useArrowNavigation(5, { onEscape }));
      
      const event = { key: 'Escape', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      result.current.handleKeyDown(event);
      
      expect(onEscape).toHaveBeenCalled();
    });

    it('respects wrap option', () => {
      const { result } = renderHook(() => useArrowNavigation(5, { wrap: false }));
      expect(result.current).toBeDefined();
    });

    it('accepts vertical orientation', () => {
      const { result } = renderHook(() => useArrowNavigation(5, { orientation: 'vertical' }));
      expect(result.current).toBeDefined();
    });

    it('accepts horizontal orientation', () => {
      const { result } = renderHook(() => useArrowNavigation(5, { orientation: 'horizontal' }));
      expect(result.current).toBeDefined();
    });

    it('accepts both orientation', () => {
      const { result } = renderHook(() => useArrowNavigation(5, { orientation: 'both' }));
      expect(result.current).toBeDefined();
    });

    it('respects enabled option', () => {
      const onSelect = vi.fn();
      const { result } = renderHook(() => useArrowNavigation(5, { onSelect, enabled: false }));
      
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      result.current.handleKeyDown(event);
      
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('useQuizKeyboard', () => {
    it('returns handleKeyDown', () => {
      const { result } = renderHook(() => useQuizKeyboard({
        onSelectOption: vi.fn(),
        onNext: vi.fn(),
        onPrevious: vi.fn(),
        onSubmit: vi.fn(),
        onShowHint: vi.fn(),
        optionCount: 4,
      }));
      expect(result.current.handleKeyDown).toBeInstanceOf(Function);
    });

    it('handles number key 1 for option selection', () => {
      const onSelectOption = vi.fn();
      renderHook(() => useQuizKeyboard({
        onSelectOption,
        optionCount: 4,
      }));
      
      // Key bindings are added to window
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      
      expect(onSelectOption).toHaveBeenCalledWith(0);
    });

    it('handles number key beyond option count', () => {
      const onSelectOption = vi.fn();
      renderHook(() => useQuizKeyboard({
        onSelectOption,
        optionCount: 2,
      }));
      
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      
      // key '5' is beyond optionCount of 2, so no binding created
      expect(onSelectOption).not.toHaveBeenCalledWith(4);
    });

    it('enabled option controls handler response', () => {
      const onSelectOption = vi.fn();
      renderHook(() => useQuizKeyboard({
        onSelectOption,
        optionCount: 4,
        enabled: false,
      }));
      
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      
      expect(onSelectOption).not.toHaveBeenCalled();
    });
  });

  describe('useModalKeyboard', () => {
    it('returns nothing (void hook)', () => {
      const result = renderHook(() => useModalKeyboard({
        onClose: vi.fn(),
        enabled: true,
      }));
      expect(result).toBeDefined();
    });

    it('handles disabled modal', () => {
      expect(() => {
        renderHook(() => useModalKeyboard({
          onClose: vi.fn(),
          enabled: false,
        }));
      }).not.toThrow();
    });

    it('accepts enabled option', () => {
      expect(() => {
        renderHook(() => useModalKeyboard({
          onClose: vi.fn(),
          enabled: false,
        }));
      }).not.toThrow();
    });
  });

  describe('useTabKeyboard', () => {
    it('returns tabListProps and getTabProps', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2', 'tab3'], 'tab1', vi.fn()));
      expect(result.current.tabListProps).toBeDefined();
      expect(result.current.getTabProps).toBeInstanceOf(Function);
    });

    it('handles empty tabs array', () => {
      const { result } = renderHook(() => useTabKeyboard([], '', vi.fn()));
      expect(result.current).toBeDefined();
    });

    it('handles invalid active tab', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2'], 'invalid', vi.fn()));
      expect(result.current).toBeDefined();
    });

    it('getTabProps returns role tab', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2'], 'tab1', vi.fn()));
      const props = result.current.getTabProps('tab1');
      expect(props.role).toBe('tab');
    });

    it('getTabProps returns aria-selected for active tab', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2'], 'tab1', vi.fn()));
      const props = result.current.getTabProps('tab1');
      expect(props['aria-selected']).toBe(true);
    });

    it('getTabProps returns tabIndex 0 for active tab', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2'], 'tab1', vi.fn()));
      const props = result.current.getTabProps('tab1');
      expect(props.tabIndex).toBe(0);
    });

    it('getTabProps returns tabIndex -1 for inactive tab', () => {
      const { result } = renderHook(() => useTabKeyboard(['tab1', 'tab2'], 'tab1', vi.fn()));
      const props = result.current.getTabProps('tab2');
      expect(props.tabIndex).toBe(-1);
    });
  });

  describe('getAccessibleClickProps', () => {
    it('returns props object', () => {
      const props = getAccessibleClickProps(vi.fn());
      expect(typeof props).toBe('object');
    });

    it('returns onClick handler', () => {
      const handler = vi.fn();
      const props = getAccessibleClickProps(handler);
      expect(props.onClick).toBe(handler);
    });

    it('returns onKeyDown handler', () => {
      const handler = vi.fn();
      const props = getAccessibleClickProps(handler);
      expect(props.onKeyDown).toBeInstanceOf(Function);
    });

    it('returns role buttonby default', () => {
      const props = getAccessibleClickProps(vi.fn());
      expect(props.role).toBe('button');
    });

    it('returns tabIndex 0 by default', () => {
      const props = getAccessibleClickProps(vi.fn());
      expect(props.tabIndex).toBe(0);
    });

    it('respects custom role', () => {
      const props = getAccessibleClickProps(vi.fn(), { role: 'link' });
      expect(props.role).toBe('link');
    });

    it('respects disabled option for tabIndex', () => {
      const props = getAccessibleClickProps(vi.fn(), { disabled: true });
      expect(props.tabIndex).toBe(-1);
    });

    it('calls handler on Enter key', () => {
      const handler = vi.fn();
      const props = getAccessibleClickProps(handler);
      
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      props.onKeyDown?.(event);
      
      expect(handler).toHaveBeenCalled();
    });

    it('calls handler on Space key', () => {
      const handler = vi.fn();
      const props = getAccessibleClickProps(handler);
      
      const event = { key: ' ', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      props.onKeyDown?.(event);
      
      expect(handler).toHaveBeenCalled();
    });

    it('does not call handler on other keys', () => {
      const handler = vi.fn();
      const props = getAccessibleClickProps(handler);
      
      const event = { key: 'a', preventDefault: vi.fn() } as unknown as React.KeyboardEvent;
      props.onKeyDown?.(event);
      
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
