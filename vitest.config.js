import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    // Use forks for isolation between test files
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false, // Each file gets its own fork
        isolate: true,     // Isolate each test file
        maxForks: 2,       // Limit parallel forks to save memory
        minForks: 1,
      },
    },
    // Limit concurrent tests within a file
    maxConcurrency: 5,
    // Add timeouts to prevent hung tests
    testTimeout: 15000, // 15 seconds per test
    hookTimeout: 10000, // 10 seconds for setup/teardown
    // Ensure vitest exits after tests complete
    teardownTimeout: 5000,
    // Sequence tests by file to allow garbage collection between files
    sequence: {
      shuffle: false,
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        'src/data/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.js',
      ],
      thresholds: {
        // Set realistic starting thresholds - increase over time
        lines: 40,
        functions: 35,
        branches: 30,
        statements: 40,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
});
