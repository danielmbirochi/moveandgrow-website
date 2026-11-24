# Move and Grow website

Static marketing site in Brazilian Portuguese, built with Astro, Tailwind CSS 4
and TypeScript. No JavaScript is shipped except a small script that enhances the
contact form.

Spec and plan: `docs/superpowers/`.

## Run it

```
npm install
npm run dev        # http://localhost:4321, plus the component gallery at /_kit/
npm run build      # static output in dist/
npm run preview    # serves dist/ at http://localhost:4321
npm run verify     # unit tests, astro check, build, and the dist/ checks
```

Node 22.23.4 or newer (developed on Node 24).

## Switch the visual identity

Everything visual (colours, typefaces, corners, label style, numbered items,
cards, favicon, share image) follows one line in `visual-identity.config.ts`:

```ts
export const activeTheme: ThemeName = 'oficina'; // or 'sistema'
```

Change it and rebuild. For a one-off build without editing the file:
`MG_THEME=sistema npm run build`.

The company name and short name are in the same file (`brand`). No other file
writes the name.

## Add a theme

1. Copy `src/themes/oficina.ts` to `src/themes/<name>.ts` and change the values.
   Every colour role, font, radius and style switch is required; a missing one
   stops the build with `Missing theme token: <path>`.
2. Add the name to `ThemeName` in `src/themes/types.ts` and to `themes` in
   `src/themes/index.ts`.
3. Fonts come from Fontsource: `npm install @fontsource/<font>` and set
   `fontsource` in the theme. Only the active theme's fonts are bundled.
4. Add the theme to the contrast test in `tests/themes.test.ts` and run `npm test`.
5. Run `npm run og` to render its share image into `src/assets/og/<name>.png`.

How it works: `astro.config.mjs` resolves the active theme and writes
`src/styles/theme.generated.css` (Tailwind `@theme` tokens such as
`--color-ground`, `--font-heading`, `--radius-card`) and
`src/styles/fonts.generated.css`, plus `public/favicon.svg` and
`public/og-default.png`. Components only use the role utilities (`bg-ground`,
`text-ink`, `rounded-card`, `font-label`, ...) and the `data-label`,
`data-numbered`, `data-card` attributes on `<html>`.

## Where things live

| What | Where |
| --- | --- |
| Page copy | `src/content/*.ts` (one module per page, plus `offers.ts`, `commitments.ts`, `shell.ts`) |
| Copy written by the builder, for review | `docs/copy-additions.md` |
| Contact e-mail, WhatsApp, site URL, navigation | `src/site.config.ts` |
| Themes | `src/themes/` |
| Pages | `src/pages/` |
| Components | `src/components/` |

## Placeholders still to fill

- `src/site.config.ts`: `url` is `https://example.com`; `email` is `[EMAIL]`;
  `whatsapp` is `[WHATSAPP]`. While the contact details are placeholders the
  form is disabled and the site shows "Contato em configuração." instead of
  any `mailto:` or WhatsApp link. Once set, the form opens the visitor's e-mail
  (works without JavaScript) or WhatsApp with the brief pre-filled.
- `src/content/sobre.ts`: the marketing founder's name (`[Nome]`), bio
  (`[Cargo e resultados a confirmar.]`) and initials. The card is marked
  "Texto provisório" until `placeholder: true` is removed.
- Founder photos: initials only.
- Logo: a text wordmark and a geometric mark (`src/components/Wordmark.astro`).
- After changing the brand name or the Home headline, run `npm run og`.

## Checks

- `tests/`: theme tokens and contrast, content rules (approved headlines,
  banned vocabulary, no prices, no hard-coded brand name, SEO lengths), and the
  contact link builders.
- `scripts/check-dist.mjs`: the six routes, one `h1`, title, description,
  canonical, `lang`, valid JSON-LD, internal links, no placeholder links,
  sitemap and robots, no Google Fonts, brand name on every page, no inactive
  theme in the CSS.
- `scripts/screenshots.mjs <baseUrl> <theme>`: no horizontal scroll at 360px
  and 1280px with JavaScript on and off, nav and form still present without
  JavaScript, and full-page screenshots into `docs/screenshots/`. Uses the
  installed Google Chrome.
- Lighthouse results: `docs/lighthouse.md`.
