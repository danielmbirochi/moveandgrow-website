import { activeTheme } from '../../visual-identity.config';
import { oficina } from './oficina';
import { sistema } from './sistema';
import { colorRoles, type FontSpec, type Theme, type ThemeName } from './types';

export type { Theme, ThemeName, ColorRole, FontSpec } from './types';

export const themes: Record<ThemeName, Theme> = { oficina, sistema };

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function missing(path: string): never {
  throw new Error(`Missing theme token: ${path}`);
}

/** Throws `Missing theme token: <path>` for the first absent token. */
export function validateTheme(theme: Theme): Theme {
  if (!theme || typeof theme !== 'object') missing('theme');
  if (!theme.name) missing('name');
  if (!theme.colors) missing('colors');
  for (const role of colorRoles) {
    const value = theme.colors[role];
    if (typeof value !== 'string' || value.trim() === '') missing(`colors.${role}`);
  }
  if (!theme.fonts) missing('fonts');
  for (const slot of ['heading', 'body', 'label'] as const) {
    const f = theme.fonts[slot];
    if (!f) missing(`fonts.${slot}`);
    if (!f.family) missing(`fonts.${slot}.family`);
    if (!f.fontsource) missing(`fonts.${slot}.fontsource`);
    if (!Array.isArray(f.weights) || f.weights.length === 0) missing(`fonts.${slot}.weights`);
  }
  if (!theme.radii) missing('radii');
  for (const r of ['control', 'card', 'pill'] as const) {
    if (!theme.radii[r]) missing(`radii.${r}`);
  }
  if (!theme.style) missing('style');
  for (const s of ['label', 'numbered', 'card'] as const) {
    if (!theme.style[s]) missing(`style.${s}`);
  }
  return theme;
}

function envTheme(): string | undefined {
  return typeof process !== 'undefined' ? process.env?.MG_THEME : undefined;
}

/** The theme by name; else `MG_THEME`; else `activeTheme` from visual-identity.config.ts. */
export function resolveTheme(name?: ThemeName): Theme {
  const chosen = (name ?? envTheme() ?? activeTheme) as ThemeName;
  const theme = themes[chosen];
  if (!theme) {
    throw new Error(
      `Unknown theme "${chosen}". Available: ${Object.keys(themes).join(', ')}`,
    );
  }
  return validateTheme(theme);
}

const fontStack = (f: FontSpec, fallback: string) => `'${f.family}', ${fallback}`;

/** CSS custom properties for a theme, named after Tailwind's theme namespaces. */
export function themeToCssVars(theme: Theme): Record<string, string> {
  validateTheme(theme);
  const vars: Record<string, string> = {};
  for (const role of colorRoles) vars[`--color-${kebab(role)}`] = theme.colors[role];
  vars['--font-heading'] = fontStack(theme.fonts.heading, 'ui-sans-serif, system-ui, sans-serif');
  vars['--font-body'] = fontStack(theme.fonts.body, 'ui-sans-serif, system-ui, sans-serif');
  vars['--font-label'] = fontStack(
    theme.fonts.label,
    theme.style.label === 'mono'
      ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
      : 'ui-sans-serif, system-ui, sans-serif',
  );
  vars['--radius-control'] = theme.radii.control;
  vars['--radius-card'] = theme.radii.card;
  vars['--radius-pill'] = theme.radii.pill;
  return vars;
}

/** Font weights per slot (kept outside Tailwind's `--font-*` namespace). */
export function themeWeights(theme: Theme): Record<string, string> {
  return {
    '--mg-weight-heading': String(Math.max(...theme.fonts.heading.weights)),
    '--mg-weight-body': String(Math.min(...theme.fonts.body.weights)),
    '--mg-weight-strong': String(Math.max(...theme.fonts.body.weights)),
    '--mg-weight-label': String(theme.fonts.label.weights[0]),
  };
}

/** Fontsource CSS entry points for the theme's fonts (latin subset only). */
export function themeFontImports(theme: Theme): string[] {
  const set = new Set<string>();
  for (const f of Object.values(theme.fonts)) {
    for (const w of f.weights) set.add(`${f.fontsource}/latin-${w}.css`);
  }
  return [...set];
}

function luminance(hex: string): number {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Not a hex colour: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2 contrast ratio between two hex colours. */
export function contrastRatio(hexA: string, hexB: string): number {
  const a = luminance(hexA);
  const b = luminance(hexB);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** The CSS file Tailwind reads: theme tokens as `@theme static` plus weights. */
export function themeToCss(theme: Theme): string {
  const vars = themeToCssVars(theme);
  const weights = themeWeights(theme);
  const lines = [
    `/* Generated from src/themes/${theme.name}.ts by astro.config.mjs. Do not edit. */`,
    '@theme static {',
    '  --color-*: initial;',
    '  --radius-*: initial;',
    '  --default-font-family: var(--font-body);',
    ...Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`),
    '}',
    ':root {',
    ...Object.entries(weights).map(([k, v]) => `  ${k}: ${v};`),
    '}',
    '',
  ];
  return lines.join('\n');
}

/** True when the theme's ground is dark (used for the color-scheme hint). */
export function isDarkTheme(theme: Theme): boolean {
  return luminance(theme.colors.ground) < 0.18;
}
