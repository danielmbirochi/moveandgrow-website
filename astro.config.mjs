// @ts-check
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
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

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
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
