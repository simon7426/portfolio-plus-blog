import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ogImages } from './src/integrations/og-images';

export default defineConfig({
  site: 'https://simonislam.com',
  integrations: [sitemap(), ogImages()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
