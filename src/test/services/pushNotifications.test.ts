import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Capacitor before importing
vi.mock('@capacitor/core', () => ({
  Capacitor: {
    isNativePlatform: () => false // Test web behavior by default
  }
}));

vi.mock('@capacitor/local-notifications', () => ({
  LocalNotifications: {
    requestPermissions: vi.fn(),
    addListener: vi.fn(),
    schedule: vi.fn(),
    getPending: vi.fn(),
    cancel: vi.fn()
  }
}));

// Mock Firebase config
vi.mock('../../config/firebase', () => ({
  db: {},
  auth: {}
}));

// Mock Firebase functions
vi.mock('firebase/app', () => ({
  getApp: vi.fn(() => ({}))
}));

const mockOnMessage = vi.fn();
const mockGetToken = vi.fn();
const mockGetMessaging = vi.fn();

vi.mock('firebase/messaging', () => ({
  getMessaging: () => mockGetMessaging(),
  getToken: (...args: unknown[]) => mockGetToken(...args),
  onMessage: (...args: unknown[]) => mockOnMessage(...args)
}));

const mockUpdateDoc = vi.fn();
const mockDoc = vi.fn();
const mockArrayUnion = vi.fn((val) => ({ _arrayUnion: val }));
const mockArrayRemove = vi.fn((val) => ({ _arrayRemove: val }));

vi.mock('firebase/firestore', () => ({
  doc: (...args: unknown[]) => mockDoc(...args),
  updateDoc: (...args: unknown[]) => mockUpdateDoc(...args),
  arrayUnion: (val: unknown) => mockArrayUnion(val),
  arrayRemove: (val: unknown) => mockArrayRemove(val)
}));

// Import after all mocks
import {
  isNative,
  isWeb,
  getDailyReminderSettings,
  getContextualReminderMessage
} from '../../services/pushNotifications';

describe('pushNotifications service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock: Record<string, string> = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
        clear: vi.fn(() => {
          Object.keys(localStorageMock).forEach(key => delete localStorageMock[key]);
        })
      },
      writable: true
    });
    
    mockDoc.mockReturnValue({ path: 'users/test-user' });
    mockUpdateDoc.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('platform detection', () => {
    it('should detect web platform', () => {
      expect(isWeb).toBe(true);
      expect(isNative).toBe(false);
    });
  });

  describe('getDailyReminderSettings', () => {
    it('should return default settings when none saved', () => {
      const settings = getDailyReminderSettings();
      
      expect(settings.enabled).toBe(false);
      expect(settings.time).toBe('09:00');
    });

    it('should return saved settings from localStorage', () => {
      // Pre-populate localStorage mock
      const localStorageMock = {
        'dailyReminderEnabled': 'true',
        'dailyReminderTime': '08:30'
      };
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn((key: string) => localStorageMock[key as keyof typeof localStorageMock] || null),
          setItem: vi.fn(),
          removeItem: vi.fn(),
          clear: vi.fn()
        },
        writable: true
      });

      const settings = getDailyReminderSettings();
      
      expect(settings.enabled).toBe(true);
      expect(settings.time).toBe('08:30');
    });
  });

  describe('getContextualReminderMessage', () => {
    it('should return a message object with title and body', () => {
      const message = getContextualReminderMessage();
      
      expect(message).toHaveProperty('title');
      expect(message).toHaveProperty('body');
      expect(typeof message.title).toBe('string');
      expect(typeof message.body).toBe('string');
    });

    it('should return morning messages early in the day', () => {
      // Mock date to 8 AM on a weekday (Wednesday)
      const mockDate = new Date('2024-01-10T08:00:00');
      vi.setSystemTime(mockDate);

      const message = getContextualReminderMessage();
      
      // Morning messages contain sun/morning related emojis
      expect(message.title.match(/🌅|☀️/)).toBeTruthy();

      vi.useRealTimers();
    });

    it('should return afternoon messages in the afternoon', () => {
      // Mock date to 2 PM on a weekday
      const mockDate = new Date('2024-01-10T14:00:00');
      vi.setSystemTime(mockDate);

      const message = getContextualReminderMessage();
      
      // Afternoon messages
      expect(message.title.match(/💪|📝/)).toBeTruthy();

      vi.useRealTimers();
    });

    it('should return evening messages in the evening', () => {
      // Mock date to 7 PM on a weekday
      const mockDate = new Date('2024-01-10T19:00:00');
      vi.setSystemTime(mockDate);

      const message = getContextualReminderMessage();
      
      // Evening messages
      expect(message.title.match(/🌙|🦉/)).toBeTruthy();

      vi.useRealTimers();
    });

    it('should return weekend messages on Saturday', () => {
      // Mock date to Saturday at noon
      const mockDate = new Date('2024-01-13T12:00:00'); // Saturday
      vi.setSystemTime(mockDate);

      const message = getContextualReminderMessage();
      
      // Weekend messages
      expect(message.title.match(/📅|🚀/)).toBeTruthy();

      vi.useRealTimers();
    });

    it('should return weekend messages on Sunday', () => {
      // Mock date to Sunday morning
      const mockDate = new Date('2024-01-14T10:00:00'); // Sunday
      vi.setSystemTime(mockDate);

      const message = getContextualReminderMessage();
      
      // Weekend messages
      expect(message.title.match(/📅|🚀/)).toBeTruthy();

      vi.useRealTimers();
    });
  });

  describe('Firestore token operations', () => {
    it('should have mock arrayUnion function', () => {
      const result = mockArrayUnion('test-token');
      expect(result).toEqual({ _arrayUnion: 'test-token' });
    });

    it('should have mock arrayRemove function', () => {
      const result = mockArrayRemove('test-token');
      expect(result).toEqual({ _arrayRemove: 'test-token' });
    });
  });
});
