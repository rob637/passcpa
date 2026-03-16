import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  outDir: '../dist-blog/blog',
  base: '/blog',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
