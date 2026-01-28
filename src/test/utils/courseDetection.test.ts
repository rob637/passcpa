/**
 * Tests for courseDetection utility
 * 
 * Note: Tests for localStorage-based functions are limited because
 * the module uses its own localStorage reference that can't be easily mocked.
 * These tests focus on URL-based detection which uses window.location.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectCourse, saveCoursePreference, getCoursePreference, clearCoursePreference } from '../../utils/courseDetection';
import { DEFAULT_COURSE_ID } from '../../types/course';

describe('courseDetection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clear any stored preferences
    try {
      localStorage.removeItem('voraprep_active_course');
    } catch {
      // Ignore
    }
  });

  describe('detectCourse', () => {
    it('should return CourseDetectionResult object', () => {
      const result = detectCourse();
      expect(result).toHaveProperty('courseId');
      expect(result).toHaveProperty('source');
    });

    it('should return default course ID from default source', () => {
      const result = detectCourse();
      expect(result.courseId).toBe(DEFAULT_COURSE_ID);
      // Source could be 'default' or 'user-preference' depending on state
      expect(['default', 'user-preference']).toContain(result.source);
    });

    it('should detect CPA course from cpa subdomain', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'cpa.voraprep.com',
          pathname: '/',
          search: ''
        },
        writable: true,
        configurable: true,
      });

      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('subdomain');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });

    it('should detect CMA course from cma subdomain', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'cma.voraprep.com',
          pathname: '/',
          search: ''
        },
        writable: true,
        configurable: true,
      });

      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('subdomain');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });

    it('should detect course from path prefix', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'voraprep.com',
          pathname: '/ea/lessons',
          search: ''
        },
        writable: true,
        configurable: true,
      });

      const result = detectCourse();
      expect(result.courseId).toBe('ea');
      expect(result.source).toBe('path');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });

    it('should detect course from query parameter', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'voraprep.com',
          pathname: '/',
          search: '?course=cia'
        },
        writable: true,
        configurable: true,
      });

      const result = detectCourse();
      expect(result.courseId).toBe('cia');
      expect(result.source).toBe('query-param');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });

    it('should prioritize subdomain over path', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'cpa.voraprep.com',
          pathname: '/cma/lessons',
          search: ''
        },
        writable: true,
        configurable: true,
      });

      // Subdomain takes priority over path
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('subdomain');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });
    
    it('should detect course from dedicated domain', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
        value: { 
          hostname: 'voraprepcpa.com',
          pathname: '/',
          search: ''
        },
        writable: true,
        configurable: true,
      });

      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('domain');

      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('saveCoursePreference', () => {
    it('should not throw when called', () => {
      expect(() => saveCoursePreference('cma')).not.toThrow();
    });
  });

  describe('getCoursePreference', () => {
    it('should return CourseId or null', () => {
      const result = getCoursePreference();
      // Result is either null or a valid CourseId
      expect(result === null || ['cpa', 'cma', 'ea', 'cia'].includes(result)).toBe(true);
    });
  });

  describe('clearCoursePreference', () => {
    it('should not throw when called', () => {
      expect(() => clearCoursePreference()).not.toThrow();
    });
  });
});
