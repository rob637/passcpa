import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// Enable bundle analyzer via ANALYZE=true environment variable
const enableAnalyzer = process.env.ANALYZE === 'true';

export default defineConfig({
  plugins: [
    react(),
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
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB - main bundle is ~2.2MB
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
        manualChunks: {
          // Core vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'vendor-ui': ['lucide-react', 'clsx', 'date-fns'],
          'vendor-charts': ['recharts'],
          
          // Feature chunks - separated for lazy loading
          'feature-admin-cms': [
            './src/components/pages/admin/AdminCMS.tsx',
          ],
          'feature-admin-seed': [
            './src/components/pages/AdminSeed.tsx',
          ],
          'feature-ai': [
            './src/components/pages/AITutor.tsx',
            './src/services/aiService.ts',
          ],
          'feature-tbs': [
            './src/components/pages/TBSSimulator.tsx',
            './src/components/pages/WrittenCommunication.tsx',
          ],
          // Data chunks - only needed for admin seeding, dynamically imported
          // Removed explicit chunking since these are now dynamically imported via services
        },
      },
    },
    // Increase chunk warning limit since we're intentionally chunking
    chunkSizeWarningLimit: 700,
  },
});
