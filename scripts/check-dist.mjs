// Post-build checks on dist/. Exits non-zero with a named reason per failure.
//
// Usage: node scripts/check-dist.mjs   (honours MG_THEME, like the build)
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const failures = [];
const fail = (msg) => failures.push(msg);

// --- Read the identity config and the themes without a TS toolchain ---------
const identity = readFileSync(join(root, 'visual-identity.config.ts'), 'utf8');
const brandName = identity.match(/name:\s*'([^']+)'/)?.[1];
const configuredTheme = identity.match(/activeTheme:\s*ThemeName\s*=\s*'([^']+)'/)?.[1];
if (!brandName) fail('could not read brand.name from visual-identity.config.ts');
const activeName = process.env.MG_THEME || configuredTheme;

const themesDir = join(root, 'src/themes');
const themes = {};
for (const file of readdirSync(themesDir)) {
  if (['types.ts', 'index.ts'].includes(file) || !file.endsWith('.ts')) continue;
  const src = readFileSync(join(themesDir, file), 'utf8');
  const name = src.match(/name:\s*'([^']+)'/)?.[1];
  if (!name) continue;
  const families = [...src.matchAll(/family:\s*'([^']+)'/g)].map((m) => m[1]);
  const color = (role) => src.match(new RegExp(`\\b${role}:\\s*'(#[0-9A-Fa-f]{3,8})'`))?.[1];
  themes[name] = { families, ground: color('ground'), accent: color('accent') };
}
const active = themes[activeName];
if (!active) fail(`active theme "${activeName}" not found in src/themes/`);

// --- Collect files ----------------------------------------------------------
if (!existsSync(dist)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const cssFiles = files.filter((f) => f.endsWith('.css'));
const rel = (f) => relative(dist, f);

// --- Routes -----------------------------------------------------------------
const routes = ['/', '/para-agencias/', '/para-empresas/', '/mapa-da-operacao/', '/sobre/', '/contato/'];
const routeFile = (route) => join(dist, route, 'index.html');
for (const route of routes) {
  if (!existsSync(routeFile(route))) fail(`route ${route} missing (no ${rel(routeFile(route))})`);
}

// --- Per-page checks --------------------------------------------------------
const resolves = (href) => {
  const path = decodeURI(href.split('#')[0].split('?')[0]);
  if (path === '' || path === '/') return existsSync(join(dist, 'index.html'));
  const target = join(dist, path);
  if (path.endsWith('/')) return existsSync(join(target, 'index.html'));
  return existsSync(target) || existsSync(join(target, 'index.html'));
};
const forbidden = ['mailto:[', 'wa.me/[', 'lorem', 'R$', '_kit'];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const page = rel(file);
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(`${page}: expected exactly one <h1>, found ${h1s}`);
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${page}: missing <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`${page}: missing meta description`);
  if (!/<link rel="canonical" href="[^"]+"/.test(html)) fail(`${page}: missing canonical link`);
  if (!/<html[^>]*\slang="pt-BR"/.test(html)) fail(`${page}: missing lang="pt-BR" on <html>`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (ld.length === 0) fail(`${page}: no application/ld+json`);
  for (const [, json] of ld) {
    try {
      JSON.parse(json);
    } catch (e) {
      fail(`${page}: invalid JSON-LD (${e.message})`);
    }
  }

  for (const [, href] of html.matchAll(/\shref="([^"]*)"/g)) {
    if (href.startsWith('/') && !href.startsWith('//') && !resolves(href)) {
      fail(`${page}: internal link ${href} does not resolve to a file in dist/`);
    }
  }

  const lower = html.toLowerCase();
  for (const bad of forbidden) {
    if (lower.includes(bad.toLowerCase())) fail(`${page}: contains forbidden "${bad}"`);
  }
  for (const host of ['fonts.googleapis.com', 'fonts.gstatic.com']) {
    if (html.includes(host)) fail(`${page}: references ${host}`);
  }
  if (brandName && !html.includes(brandName)) fail(`${page}: brand name "${brandName}" not found`);
}

// --- Search files -----------------------------------------------------------
const sitemapIndex = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) fail('sitemap-index.xml missing');
const sitemaps = files.filter((f) => /sitemap.*\.xml$/.test(f));
for (const s of sitemaps) {
  if (readFileSync(s, 'utf8').includes('_kit')) fail(`${rel(s)}: lists _kit`);
}
const sitemapText = sitemaps.map((s) => readFileSync(s, 'utf8')).join('\n');
for (const route of routes) {
  if (existsSync(sitemapIndex) && !sitemapText.includes(`${route}<`)) {
    fail(`sitemap does not list ${route}`);
  }
}
if (!existsSync(join(dist, 'robots.txt'))) fail('robots.txt missing');
else if (!/Sitemap:\s*\S+sitemap-index\.xml/.test(readFileSync(join(dist, 'robots.txt'), 'utf8'))) {
  fail('robots.txt does not point to the sitemap');
}
for (const asset of ['favicon.svg', 'og-default.png']) {
  if (!existsSync(join(dist, asset))) fail(`${asset} missing`);
}

// --- Theme in the stylesheets -----------------------------------------------
const css = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');
const cssLower = css.toLowerCase();
if (cssFiles.length === 0) fail('no stylesheet in dist/');
const hexForms = (hex) => {
  const h = hex.toLowerCase();
  const short =
    h.length === 7 && h[1] === h[2] && h[3] === h[4] && h[5] === h[6] ? `#${h[1]}${h[3]}${h[5]}` : null;
  return [h, short].filter(Boolean);
};
const hasHex = (hex) => hexForms(hex).some((form) => new RegExp(`${form}(?![0-9a-f])`).test(cssLower));
if (active) {
  if (!hasHex(active.ground)) fail(`CSS lacks the active theme's ground colour ${active.ground}`);
  if (!hasHex(active.accent)) fail(`CSS lacks the active theme's accent colour ${active.accent}`);
  const activeFamilies = new Set(active.families);
  for (const [name, theme] of Object.entries(themes)) {
    if (name === activeName) continue;
    if (theme.accent.toLowerCase() !== active.accent.toLowerCase() && hasHex(theme.accent)) {
      fail(`CSS contains the inactive theme "${name}" accent ${theme.accent}`);
    }
    for (const family of theme.families) {
      if (activeFamilies.has(family)) continue;
      for (const f of cssFiles) {
        if (readFileSync(f, 'utf8').includes(family)) {
          fail(`${rel(f)}: contains font family "${family}" from inactive theme "${name}"`);
        }
      }
    }
  }
}

// --- Report -----------------------------------------------------------------
if (failures.length) {
  console.error(`check-dist: ${failures.length} problem(s) [theme ${activeName}]`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `check-dist: OK [theme ${activeName}] ${htmlFiles.length} pages, ${cssFiles.length} stylesheet(s), sitemap, robots.txt`,
);
