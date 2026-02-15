import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

// Read version from package.json
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Enable bundle analyzer via ANALYZE=true environment variable
const enableAnalyzer = process.env.ANALYZE === 'true';

/**
 * Vite plugin: inject Firebase config into the messaging service worker.
 * The SW file in public/ uses `self.__FIREBASE_CONFIG__` placeholder.
 * This plugin writes the config from VITE_FIREBASE_* env vars into the
 * built file so no API keys are hardcoded in source control.
 */
function firebaseMessagingSWPlugin() {
  return {
    name: 'firebase-messaging-sw-config',
    writeBundle(options) {
      const outDir = options.dir || 'dist';
      const swPath = path.resolve(outDir, 'firebase-messaging-sw.js');
      if (!existsSync(swPath)) return;

      // Load env vars (Vite doesn't expose them to config plugins by default)
      const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'VITE_');

      const firebaseConfig = JSON.stringify({
        apiKey: env.VITE_FIREBASE_API_KEY || '',
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
        projectId: env.VITE_FIREBASE_PROJECT_ID || '',
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
        appId: env.VITE_FIREBASE_APP_ID || '',
        measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || '',
      });

      let content = readFileSync(swPath, 'utf-8');
      // Inject config by replacing the placeholder assignment
      content = content.replace(
        /self\.__FIREBASE_CONFIG__\s*\|\|\s*\{[^}]*\}/,
        firebaseConfig
      );
      writeFileSync(swPath, content, 'utf-8');
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    firebaseMessagingSWPlugin(),
    VitePWA({
      registerType: 'prompt', // Don't auto-refresh - let user decide when to update
      devOptions: {
        enabled: false // Disable PWA in development to avoid IndexedDB issues
      },
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'VoraPrep - CPA Exam Prep',
        short_name: 'VoraPrep',
        description: 'AI-powered CPA exam prep that gets you to 75+',
        theme_color: '#1a73e8',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Practice Questions',
            short_name: 'Practice',
            description: 'Start a practice session',
            url: '/practice',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Study Session',
            short_name: 'Study',
            description: 'Continue studying',
            url: '/study',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8 MiB - CPA questions bundle is ~5.8MB
        skipWaiting: false, // Don't auto-activate new service worker during exam!
        clientsClaim: true, // Take control immediately after activation (when user clicks Update)
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // Cache questions and lessons data including TBS
          {
            urlPattern: /\/src\/data\/.*\.(ts|json)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'content-data-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firestore-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    // Bundle analyzer - run with ANALYZE=true npm run build
    enableAnalyzer && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // or 'sunburst', 'network'
    }),
  ].filter(Boolean),
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
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
  server: {
    port: 5174, // Different from Reppy's 5173
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting - Google/Apple quality
        manualChunks(id) {
          // Core vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('date-fns')) {
              return 'vendor-ui';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
          }
          
          // Question data chunks - split CPA by section since it's very large
          if (id.includes('/data/cpa/questions')) {
            if (id.includes('far-questions') || id.includes('far_questions')) return 'data-cpa-questions-far';
            if (id.includes('aud-questions') || id.includes('aud_questions')) return 'data-cpa-questions-aud';
            if (id.includes('reg-questions') || id.includes('reg_questions')) return 'data-cpa-questions-reg';
            if (id.includes('bar-questions') || id.includes('bar_questions')) return 'data-cpa-questions-bar';
            if (id.includes('isc-questions') || id.includes('isc_questions')) return 'data-cpa-questions-isc';
            if (id.includes('tcp-questions') || id.includes('tcp_questions')) return 'data-cpa-questions-tcp';
            return 'data-cpa-questions-misc'; // world-class batches, easy-questions, etc.
          }
          if (id.includes('/data/ea/questions')) {
            return 'data-ea-questions';
          }
          if (id.includes('/data/cma/questions')) {
            return 'data-cma-questions';
          }
          if (id.includes('/data/cia/questions')) {
            return 'data-cia-questions';
          }
          if (id.includes('/data/cisa/questions')) {
            return 'data-cisa-questions';
          }
          if (id.includes('/data/cfp/questions')) {
            return 'data-cfp-questions';
          }
          
          // Study materials chunks - split by course
          if (id.includes('/data/cpa/study-materials') || id.includes('/data/cpa/lessons')) {
            return 'data-cpa-content';
          }
          if (id.includes('/data/ea/study-materials') || id.includes('/data/ea/lessons')) {
            return 'data-ea-content';
          }
          if (id.includes('/data/cma/') && !id.includes('questions')) {
            return 'data-cma-content';
          }
          if (id.includes('/data/cia/') && !id.includes('questions')) {
            return 'data-cia-content';
          }
          if (id.includes('/data/cisa/') && !id.includes('questions')) {
            return 'data-cisa-content';
          }
          if (id.includes('/data/cfp/') && !id.includes('questions')) {
            return 'data-cfp-content';
          }
          
          // Feature chunks
          if (id.includes('AdminCMS')) {
            return 'feature-admin-cms';
          }
          if (id.includes('AdminSeed')) {
            return 'feature-admin-seed';
          }
          // Merged AI and TBS into single chunk to prevent circular dependency
          if (id.includes('AITutor') || id.includes('aiService') || 
              id.includes('TBSSimulator') || id.includes('WrittenCommunication')) {
            return 'feature-ai-tbs';
          }
        },
      },
    },
    // Increase chunk warning limit since we're intentionally chunking
    chunkSizeWarningLimit: 700,
  },
});
