import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [tailwind(), react()],
  server: {
    host: '0.0.0.0',
    port: 4321,
    watch: {
      usePolling: true
    }
  },
  output: 'static',
  adapter: vercel(),
  vite: {
    optimizeDeps: {
      include: ['react-multi-carousel'],
    }
  }
});
