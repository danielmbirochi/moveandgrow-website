// @ts-check
import { writeFileSync, readFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { resolveTheme, themeToCss, themeFontImports } from './src/themes/index.ts';
import { site } from './src/site.config.ts';

// The active theme (visual-identity.config.ts, or MG_THEME) becomes two CSS
// files before Vite starts: Tailwind tokens, and the theme's own fonts only.
const theme = resolveTheme();
/** @param {string} rel @param {string} text */
const writeIfChanged = (rel, text) => {
  const path = fileURLToPath(new URL(rel, import.meta.url));
  if (!existsSync(path) || readFileSync(path, 'utf8') !== text) writeFileSync(path, text);
};
writeIfChanged('./src/styles/theme.generated.css', themeToCss(theme));
writeIfChanged(
  './src/styles/fonts.generated.css',
  `/* Generated: fonts of theme "${theme.name}". Do not edit. */\n` +
    themeFontImports(theme).map((f) => `@import '${f}';`).join('\n') +
    '\n',
);

// Theme-dependent public files: the favicon (the wordmark's mark) and the
// share image rendered per theme by scripts/make-og.mjs.
mkdirSync(fileURLToPath(new URL('./public/', import.meta.url)), { recursive: true });
const c = theme.colors;
writeIfChanged(
  './public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">` +
    `<rect width="28" height="28" rx="${parseFloat(theme.radii.control) > 4 ? 6 : 2}" fill="${c.ink}"/>` +
    `<rect x="16" y="16" width="12" height="12" fill="${c.accent}"/></svg>\n`,
);
const ogSource = fileURLToPath(new URL(`./src/assets/og/${theme.name}.png`, import.meta.url));
if (!existsSync(ogSource)) throw new Error(`Missing share image ${ogSource}. Run npm run og.`);
copyFileSync(ogSource, fileURLToPath(new URL('./public/og-default.png', import.meta.url)));

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('_kit') }),
    {
      // Component gallery at /_kit/, served by the dev server only.
      name: 'mg-dev-kit',
      hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
          if (command === 'dev') {
            injectRoute({ pattern: '/_kit', entrypoint: './src/pages/_kit.astro' });
          }
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
