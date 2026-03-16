/**
 * Date helpers — timezone-safe parsing for date strings.
 *
 * HTML date inputs produce strings like "2026-05-18".
 * `new Date("2026-05-18")` parses as UTC midnight, which shifts back
 * a day in US timezones. These helpers parse in local timezone instead.
 */

/**
 * Parse a "YYYY-MM-DD" string as local midnight (not UTC).
 * Use this instead of `new Date(dateString)` for date-only strings.
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Safely convert an unknown value (Firestore Timestamp, Date, ISO string,
 * or "YYYY-MM-DD" string) to a local Date. Falls back to `new Date()`.
 */
export function toLocalDate(value: unknown): Date {
  if (value instanceof Date) return value;

  // Firestore Timestamp
  if (value && typeof value === 'object' && 'seconds' in value) {
    return new Date((value as { seconds: number }).seconds * 1000);
  }

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (typeof value === 'string') {
    // "YYYY-MM-DD" (date-only) — parse as local to avoid timezone shift
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return parseLocalDate(value);
    }
    // Full ISO string or other format — Date constructor handles correctly
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
  }

  return new Date(); // fallback
}
