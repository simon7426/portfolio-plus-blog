import type { AstroIntegration } from 'astro';
import { mkdirSync, writeFileSync, existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { generateOgImage } from '../utils/og-image';

function extractTitle(content: string): string {
  const match = content.match(/^title:\s*["']?([^"'\n]+)["']?/m);
  return match ? match[1].trim() : 'Untitled';
}

function extractDraft(content: string): boolean {
  const match = content.match(/^draft:\s*(true|false)/m);
  return match ? match[1] === 'true' : false;
}

export function ogImages(): AstroIntegration {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const contentDir = join(process.cwd(), 'src/content/writing');
        const ogDir = join(dir.pathname, 'og');

        if (!existsSync(ogDir)) {
          mkdirSync(ogDir, { recursive: true });
        }

        const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'));

        for (const file of files) {
          const content = readFileSync(join(contentDir, file), 'utf-8');

          if (extractDraft(content)) continue;

          const slug = file.replace(/\.md$/, '');
          const title = extractTitle(content);

          const png = await generateOgImage(title);
          writeFileSync(join(ogDir, `${slug}.png`), png);
        }
      },
    },
  };
}
