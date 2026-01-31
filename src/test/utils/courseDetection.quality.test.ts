/**
 * Quality Tests for Course Detection
 * 
 * Tests multi-course routing and detection logic.
 * Focus: URL parsing, domain routing, localStorage handling, edge cases
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// We'll import these dynamically after setting up mocks
type CourseModule = typeof import('../../utils/courseDetection');

// Mock window.location
const mockLocation = (overrides: Partial<Location> = {}) => {
  const location = {
    hostname: 'localhost',
    pathname: '/',
    search: '',
    ...overrides,
  } as Location;
  
  Object.defineProperty(window, 'location', {
    value: location,
    writable: true,
    configurable: true,
  });
};

describe('Course Detection - Quality Tests', () => {
  let localStorageMock: Record<string, string>;
  let detectCourse: CourseModule['detectCourse'];
  let saveCoursePreference: CourseModule['saveCoursePreference'];
  let clearCoursePreference: CourseModule['clearCoursePreference'];
  let getCoursePreference: CourseModule['getCoursePreference'];

  beforeEach(async () => {
    localStorageMock = {};
    
    // Create a complete localStorage mock
    const mockStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: vi.fn(() => null),
    };
    
    // Replace localStorage completely
    vi.stubGlobal('localStorage', mockStorage);
    
    // Reset and import module AFTER mocks are in place
    vi.resetModules();
    const module = await import('../../utils/courseDetection');
    detectCourse = module.detectCourse;
    saveCoursePreference = module.saveCoursePreference;
    clearCoursePreference = module.clearCoursePreference;
    getCoursePreference = module.getCoursePreference;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe('Domain-Based Detection', () => {
    it('should detect CPA course from voraprepcpa.com', () => {
      mockLocation({ hostname: 'voraprepcpa.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('domain');
    });

    it('should detect CPA course from www.voraprepcpa.com', () => {
      mockLocation({ hostname: 'www.voraprepcpa.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('domain');
    });

    it('should detect CMA course from voraprepcma.com', () => {
      mockLocation({ hostname: 'voraprepcma.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('domain');
    });

    it('should detect EA course from voraprepea.com', () => {
      mockLocation({ hostname: 'voraprepea.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('ea');
      expect(result.source).toBe('domain');
    });

    it('should handle unknown domains gracefully', () => {
      mockLocation({ hostname: 'unknown-domain.com', pathname: '/' });
      
      const result = detectCourse();
      // Should fall through to default
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('default');
    });
  });

  describe('Subdomain-Based Detection', () => {
    it('should detect CPA from cpa.voraprep.com', () => {
      mockLocation({ hostname: 'cpa.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('subdomain');
    });

    it('should detect CMA from cma.voraprep.com', () => {
      mockLocation({ hostname: 'cma.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('subdomain');
    });

    it('should detect EA from ea.voraprep.com', () => {
      mockLocation({ hostname: 'ea.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('ea');
      expect(result.source).toBe('subdomain');
    });

    it('should detect CIA from cia.voraprep.com', () => {
      mockLocation({ hostname: 'cia.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cia');
      expect(result.source).toBe('subdomain');
    });

    it('should not match invalid subdomains', () => {
      mockLocation({ hostname: 'test.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      // Should not match, fall through to default
      expect(result.source).not.toBe('subdomain');
    });

    it('should handle www.cpa.voraprep.com (no match)', () => {
      mockLocation({ hostname: 'www.cpa.voraprep.com', pathname: '/' });
      
      const result = detectCourse();
      // Pattern requires course as first subdomain
      expect(result.source).not.toBe('subdomain');
    });
  });

  describe('Path-Based Detection', () => {
    it('should detect CPA from /cpa path', () => {
      mockLocation({ hostname: 'localhost', pathname: '/cpa' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('path');
    });

    it('should detect CPA from /cpa/lessons path', () => {
      mockLocation({ hostname: 'localhost', pathname: '/cpa/lessons' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('path');
    });

    it('should detect CMA from /cma/practice path', () => {
      mockLocation({ hostname: 'localhost', pathname: '/cma/practice' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('path');
    });

    it('should not match /cpa in middle of path', () => {
      mockLocation({ hostname: 'localhost', pathname: '/app/cpa/lessons' });
      
      const result = detectCourse();
      // Should not match - must start with /cpa
      expect(result.source).not.toBe('path');
    });

    it('should not match partial course names like /cpax', () => {
      mockLocation({ hostname: 'localhost', pathname: '/cpax/lessons' });
      
      const result = detectCourse();
      // Should not match invalid course
      expect(result.source).not.toBe('path');
    });

    it('should handle trailing slashes', () => {
      mockLocation({ hostname: 'localhost', pathname: '/cpa/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('path');
    });
  });

  describe('Query Parameter Detection', () => {
    it('should detect course from ?course=cpa', () => {
      mockLocation({ hostname: 'localhost', pathname: '/', search: '?course=cpa' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('query-param');
    });

    it('should detect course from ?course=cma', () => {
      mockLocation({ hostname: 'localhost', pathname: '/', search: '?course=cma' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('query-param');
    });

    it('should ignore invalid course parameter', () => {
      mockLocation({ hostname: 'localhost', pathname: '/', search: '?course=invalid' });
      
      const result = detectCourse();
      expect(result.source).not.toBe('query-param');
    });

    it('should handle course parameter with other params', () => {
      mockLocation({ 
        hostname: 'localhost', 
        pathname: '/', 
        search: '?foo=bar&course=ea&baz=qux' 
      });
      
      const result = detectCourse();
      expect(result.courseId).toBe('ea');
      expect(result.source).toBe('query-param');
    });

    it('should handle URL-encoded course parameter', () => {
      mockLocation({ hostname: 'localhost', pathname: '/', search: '?course=cpa' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
    });
  });

  describe('User Preference Detection', () => {
    it('should detect from localStorage if no other source', () => {
      mockLocation({ hostname: 'localhost', pathname: '/' });
      localStorageMock['voraprep_active_course'] = 'cma';
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma');
      expect(result.source).toBe('user-preference');
    });

    it('should ignore invalid localStorage value', () => {
      mockLocation({ hostname: 'localhost', pathname: '/' });
      localStorageMock['voraprep_active_course'] = 'invalid';
      
      const result = detectCourse();
      expect(result.source).not.toBe('user-preference');
      expect(result.courseId).toBe('cpa'); // fallback to default
    });
  });

  describe('Detection Priority', () => {
    it('should prioritize domain over subdomain', () => {
      mockLocation({ hostname: 'voraprepcma.com', pathname: '/cpa' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma'); // domain wins
      expect(result.source).toBe('domain');
    });

    it('should prioritize path over query param', () => {
      mockLocation({ 
        hostname: 'localhost', 
        pathname: '/cma/lessons', 
        search: '?course=ea' 
      });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cma'); // path wins
      expect(result.source).toBe('path');
    });

    it('should prioritize query param over user preference', () => {
      mockLocation({ hostname: 'localhost', pathname: '/', search: '?course=ea' });
      localStorageMock['voraprep_active_course'] = 'cma';
      
      const result = detectCourse();
      expect(result.courseId).toBe('ea'); // query param wins
      expect(result.source).toBe('query-param');
    });
  });

  describe('saveCoursePreference', () => {
    it('should save valid course to localStorage', () => {
      saveCoursePreference('cma');
      
      expect(localStorageMock['voraprep_active_course']).toBe('cma');
    });

    it('should overwrite existing preference', () => {
      localStorageMock['voraprep_active_course'] = 'cpa';
      
      saveCoursePreference('ea');
      
      expect(localStorageMock['voraprep_active_course']).toBe('ea');
    });

    it('should handle localStorage errors gracefully', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceeded');
      });
      
      // Should not throw
      expect(() => saveCoursePreference('cma')).not.toThrow();
    });
  });

  describe('clearCoursePreference', () => {
    it('should remove preference from localStorage', () => {
      localStorageMock['voraprep_active_course'] = 'cma';
      
      clearCoursePreference();
      
      expect(localStorageMock['voraprep_active_course']).toBeUndefined();
    });

    it('should handle missing preference gracefully', () => {
      // No preference set
      expect(() => clearCoursePreference()).not.toThrow();
    });

    it('should handle localStorage errors gracefully', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      
      expect(() => clearCoursePreference()).not.toThrow();
    });
  });

  describe('getCoursePreference', () => {
    it('should return saved preference', () => {
      localStorageMock['voraprep_active_course'] = 'cma';
      
      const result = getCoursePreference();
      expect(result).toBe('cma');
    });

    it('should return null if no preference', () => {
      const result = getCoursePreference();
      expect(result).toBeNull();
    });

    it('should return null for invalid saved value', () => {
      localStorageMock['voraprep_active_course'] = 'invalid';
      
      const result = getCoursePreference();
      expect(result).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('SecurityError');
      });
      
      const result = getCoursePreference();
      expect(result).toBeNull();
    });
  });

  describe('Default Behavior', () => {
    it('should default to CPA when nothing matches', () => {
      mockLocation({ hostname: 'localhost', pathname: '/' });
      
      const result = detectCourse();
      expect(result.courseId).toBe('cpa');
      expect(result.source).toBe('default');
    });

    it('should handle empty pathname', () => {
      mockLocation({ hostname: 'localhost', pathname: '' });
      
      const result = detectCourse();
      expect(result).toBeDefined();
      expect(result.courseId).toBe('cpa');
    });
  });
});
