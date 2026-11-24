// Renders the default share image (1200x630) for every theme into
// src/assets/og/<theme>.png. astro.config.mjs copies the active theme's image
// to public/og-default.png at build time, so switching themes needs no extra
// step. Re-run (`npm run og`) after changing a theme, the brand name or the
// Home headline. Uses the installed Google Chrome through Playwright.
import { chromium } from 'playwright';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const identity = readFileSync(join(root, 'visual-identity.config.ts'), 'utf8');
const brand = identity.match(/name:\s*'([^']+)'/)[1];
const home = readFileSync(join(root, 'src/content/home.ts'), 'utf8');
const headline = home.match(/headline:\s*'([^']+)'/)[1];
const label = home.match(/label:\s*'([^']+)'/)[1];

const themesDir = join(root, 'src/themes');
const themes = readdirSync(themesDir)
  .filter((f) => f.endsWith('.ts') && !['types.ts', 'index.ts'].includes(f))
  .map((f) => {
    const src = readFileSync(join(themesDir, f), 'utf8');
    const color = (role) => src.match(new RegExp(`\\b${role}:\\s*'(#[0-9A-Fa-f]{3,8})'`))[1];
    const font = (slot) => {
      const m = src.match(
        new RegExp(`${slot}:\\s*\\{\\s*family:\\s*'([^']+)',\\s*weights:\\s*\\[([^\\]]+)\\],\\s*fontsource:\\s*'([^']+)'`),
      );
      return { family: m[1], weight: Number(m[2].split(',').map((w) => w.trim()).at(-1)), pkg: m[3] };
    };
    return {
      name: src.match(/name:\s*'([^']+)'/)[1],
      ground: color('ground'),
      ink: color('ink'),
      accent: color('accent'),
      accentText: color('accentText'),
      muted: color('muted'),
      heading: font('heading'),
      labelFont: font('label'),
      radius: src.match(/control:\s*'([^']+)'/)[1],
      mono: /label:\s*'mono'/.test(src),
    };
  });

const face = (f) => {
  const file = join(root, 'node_modules', f.pkg, 'files', `${f.pkg.split('/')[1]}-latin-${f.weight}-normal.woff2`);
  const data = readFileSync(file).toString('base64');
  return `@font-face{font-family:'${f.family}';font-weight:${f.weight};src:url(data:font/woff2;base64,${data}) format('woff2');}`;
};

const outDir = join(root, 'src/assets/og');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const t of themes) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    ${face(t.heading)}${face(t.labelFont)}
    *{margin:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:${t.ground};color:${t.ink};padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;font-family:'${t.heading.family}';}
    .top{display:flex;align-items:center;gap:20px;font-weight:${t.heading.weight};font-size:36px;letter-spacing:-0.02em}
    .mark{position:relative;width:48px;height:48px;background:${t.ink};border-radius:${t.radius};overflow:hidden}
    .mark i{position:absolute;right:0;bottom:0;width:20px;height:20px;background:${t.accent}}
    .label{font-family:'${t.labelFont.family}';font-weight:${t.labelFont.weight};font-size:24px;color:${t.accentText};${t.mono ? 'text-transform:uppercase;letter-spacing:0.08em;' : ''}}
    h1{font-weight:${t.heading.weight};font-size:84px;line-height:1.02;letter-spacing:-0.035em;max-width:1000px;margin-top:22px;text-wrap:balance}
    .rule{height:6px;width:120px;background:${t.accent}}
  </style></head><body>
    <div class="top"><span class="mark"><i></i></span>${brand}</div>
    <div><p class="label">${label}</p><h1>${headline}</h1></div>
    <div class="rule"></div>
  </body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(outDir, `${t.name}.png`);
  await page.screenshot({ path: out });
  console.log(`wrote ${out}`);
}
await browser.close();
