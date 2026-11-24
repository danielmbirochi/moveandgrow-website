// Layout check and screenshots (plan Task 6 Step 6).
//
// Usage: node scripts/screenshots.mjs <baseUrl> <themeName> [outDir] [paths...]
// For every page at 360px and 1280px, with JavaScript on and off, asserts
// no horizontal scroll; with JavaScript off, asserts the nav links and the
// form's submit control are present. Saves one full-page screenshot per page
// per width to <outDir>/<theme>-<page>-<width>.png. Uses the installed
// Google Chrome (no browser download).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [base = 'http://localhost:4321', theme = 'oficina', outDir = 'docs/screenshots', ...rest] =
  process.argv.slice(2);
const pages = rest.length
  ? rest
  : ['/', '/para-agencias/', '/para-empresas/', '/mapa-da-operacao/', '/sobre/', '/contato/'];
const widths = [360, 1280];
const navHrefs = ['/para-agencias/', '/para-empresas/', '/mapa-da-operacao/', '/sobre/'];

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const failures = [];

for (const js of [true, false]) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      javaScriptEnabled: js,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const path of pages) {
      await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      const tag = `${path} @${width}px js=${js ? 'on' : 'off'}`;
      if (scrollWidth > innerWidth) failures.push(`${tag}: horizontal scroll (${scrollWidth} > ${innerWidth})`);
      if (!js) {
        for (const href of navHrefs) {
          const n = await page.locator(`header a[href="${href}"]`).count();
          if (n === 0) failures.push(`${tag}: nav link ${href} missing`);
        }
        if (path === '/contato/') {
          const submit = await page.locator('form button[type="submit"], form input[type="submit"]').count();
          if (submit === 0) failures.push(`${tag}: form submit control missing`);
        }
      }
      if (js) {
        const name = path === '/' ? 'home' : path.replace(/\//g, '');
        await page.screenshot({ path: `${outDir}/${theme}-${name}-${width}.png`, fullPage: true });
      }
      console.log(`ok  ${tag} (scrollWidth ${scrollWidth})`);
    }
    await context.close();
  }
}
await browser.close();

if (failures.length) {
  console.error('\nFAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
console.log('\nLayout checks passed.');
