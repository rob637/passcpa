// Production-safe logging utility
// Only logs in development mode, silent in production
// TEMPORARY: Force enable for debugging lesson cap issue

const isDev = import.meta.env.DEV;
const forceDebug = true; // TEMPORARY: Enable for debugging

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev || forceDebug) console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (isDev || forceDebug) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (isDev || forceDebug) console.error(...args);
  },
  info: (...args: unknown[]) => {
    if (isDev || forceDebug) console.info(...args);
  },
  debug: (...args: unknown[]) => {
    if (isDev || forceDebug) console.debug(...args);
  },
};

export default logger;
