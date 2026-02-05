/**
 * Logger Utilities - Quality Tests (Bug-Finding Focus)
 * 
 * Tests production-safe logging for edge cases.
 * @batch additional (20 tests)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../../utils/logger';

describe('Logger Utilities - Quality Tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let logSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let warnSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errorSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let infoSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let debugSpy: any;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
    infoSpy.mockRestore();
    debugSpy.mockRestore();
  });

  describe('Logger Interface', () => {
    it('exports log method', () => {
      expect(typeof logger.log).toBe('function');
    });

    it('exports warn method', () => {
      expect(typeof logger.warn).toBe('function');
    });

    it('exports error method', () => {
      expect(typeof logger.error).toBe('function');
    });

    it('exports info method', () => {
      expect(typeof logger.info).toBe('function');
    });

    it('exports debug method', () => {
      expect(typeof logger.debug).toBe('function');
    });
  });

  describe('logger.log', () => {
    it('does not throw on simple message', () => {
      expect(() => logger.log('test message')).not.toThrow();
    });

    it('handles multiple arguments', () => {
      expect(() => logger.log('test', 123, { key: 'value' })).not.toThrow();
    });

    it('handles no arguments', () => {
      expect(() => logger.log()).not.toThrow();
    });

    it('handles null argument', () => {
      expect(() => logger.log(null)).not.toThrow();
    });

    it('handles undefined argument', () => {
      expect(() => logger.log(undefined)).not.toThrow();
    });

    it('handles object argument', () => {
      expect(() => logger.log({ nested: { deep: 'value' } })).not.toThrow();
    });

    it('handles array argument', () => {
      expect(() => logger.log([1, 2, 3])).not.toThrow();
    });
  });

  describe('logger.warn', () => {
    it('does not throw on warning message', () => {
      expect(() => logger.warn('warning!')).not.toThrow();
    });

    it('handles Error objects', () => {
      expect(() => logger.warn(new Error('test error'))).not.toThrow();
    });
  });

  describe('logger.error', () => {
    it('does not throw on error message', () => {
      expect(() => logger.error('error occurred')).not.toThrow();
    });

    it('handles Error objects', () => {
      expect(() => logger.error(new Error('test error'))).not.toThrow();
    });

    it('handles error with stack trace', () => {
      const err = new Error('test');
      expect(() => logger.error(err, err.stack)).not.toThrow();
    });
  });

  describe('logger.info', () => {
    it('does not throw on info message', () => {
      expect(() => logger.info('info message')).not.toThrow();
    });

    it('handles formatted strings', () => {
      expect(() => logger.info('User %s logged in', 'john')).not.toThrow();
    });
  });

  describe('logger.debug', () => {
    it('does not throw on debug message', () => {
      expect(() => logger.debug('debug info')).not.toThrow();
    });

    it('handles complex objects', () => {
      expect(() => logger.debug({
        user: 'test',
        timestamp: Date.now(),
        data: { nested: { value: 123 } },
      })).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('handles circular references gracefully', () => {
      const obj: Record<string, unknown> = { a: 1 };
      obj.self = obj; // Circular reference
      // Should not throw - logger should handle or ignore
      expect(() => logger.log(obj)).not.toThrow();
    });

    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      expect(() => logger.log(longString)).not.toThrow();
    });

    it('handles Symbol values', () => {
      expect(() => logger.log(Symbol('test'))).not.toThrow();
    });

    it('handles BigInt values', () => {
      expect(() => logger.log(BigInt(9007199254740991))).not.toThrow();
    });

    it('handles function references', () => {
      expect(() => logger.log(() => {})).not.toThrow();
    });

    it('handles mixed types in same call', () => {
      expect(() => logger.log(
        'string',
        123,
        true,
        null,
        undefined,
        { obj: true },
        [1, 2, 3]
      )).not.toThrow();
    });
  });
});
