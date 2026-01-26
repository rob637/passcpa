import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Enable PWA in development for testing
      },
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'PassCPA - CPA Exam Prep',
        short_name: 'PassCPA',
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
        runtimeCaching: [
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
    })
  ],
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
          'feature-admin': [
            './src/components/pages/admin/AdminCMS.jsx',
            './src/components/pages/AdminSeed.jsx',
          ],
          'feature-ai': [
            './src/components/pages/AITutor.tsx',
            './src/services/aiService.ts',
          ],
          'feature-tbs': [
            './src/components/pages/TBSSimulator.tsx',
            './src/components/pages/WrittenCommunication.tsx',
          ],
          // Data chunks - large lesson/question content
          'data-lessons-far': ['./src/data/lessons/far.ts'],
          'data-lessons-aud': ['./src/data/lessons/aud.ts'],
          'data-lessons-reg': ['./src/data/lessons/reg.ts'],
          'data-lessons-bar': ['./src/data/lessons/bar.ts'],
          'data-lessons-isc': ['./src/data/lessons/isc.ts'],
          'data-lessons-tcp': ['./src/data/lessons/tcp.ts'],
          'data-tbs': ['./src/data/tbs/index.ts'],
        },
      },
    },
    // Increase chunk warning limit since we're intentionally chunking
    chunkSizeWarningLimit: 700,
  },
});
