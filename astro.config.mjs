// @ts-check
import { writeFileSync, readFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { resolveTheme, themeToCss, themeFontImports } from './src/themes/index.ts';
import { site } from './src/site.config.ts';
import { paintLogo, logoMark, LOGO_MARK_WIDTH, LOGO_HEIGHT } from './src/lib/logo.ts';

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

// Theme-dependent public files, all drawn from src/assets/logo.svg: the
// favicon (the logo's mark on a ground tile) and the full logo for structured
// data. The share image is rendered per theme by scripts/make-og.mjs.
mkdirSync(fileURLToPath(new URL('./public/', import.meta.url)), { recursive: true });
const c = theme.colors;
const logo = paintLogo(readFileSync(new URL('./src/assets/logo.svg', import.meta.url), 'utf8'), c.ink, c.accent);
const tile = LOGO_MARK_WIDTH + 128;
const tileTop = (LOGO_HEIGHT - tile) / 2;
writeIfChanged(
  './public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-64 ${tileTop} ${tile} ${tile}">` +
    `<rect x="-64" y="${tileTop}" width="${tile}" height="${tile}" rx="${parseFloat(theme.radii.control) > 4 ? 150 : 50}" fill="${c.ground}"/>` +
    `${logoMark(logo)}</svg>\n`,
);
writeIfChanged('./public/logo.svg', logo);
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
