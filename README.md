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
`src/styles/fonts.generated.css`, plus `public/favicon.svg`, `public/logo.svg` and
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
| Content updates through Claude | `.claude/skills/atualizar-site/` (rules in `CLAUDE.md`) |

## Hosting and deploy

The site is hosted on Cloudflare Pages, project `moveandgrow-website`,
connected to this repository through the "Cloudflare Workers and Pages" GitHub
app (installed for this repository only). There is no deploy workflow and no
deploy command here: Cloudflare builds on its side.

- Production: every commit that lands on `main`, which means every merged pull
  request, is built and published at https://moveandgrow.com.br, usually within
  a minute or two. `www.moveandgrow.com.br` and
  `moveandgrow-website.pages.dev` serve the same build. Merging is publishing.
- Previews: every pushed branch other than `main` gets its own preview
  deployment. On a pull request Cloudflare adds a check named "Cloudflare
  Pages" and a comment from `cloudflare-workers-and-pages` with a per-commit
  "Preview URL" (`https://<hash>.moveandgrow-website.pages.dev`) and a "Branch
  Preview URL" that follows the branch. For the branch `fix/site-url-and-404`
  it was `https://fix-site-url-and-404.moveandgrow-website.pages.dev`. Copy
  the address from the comment instead of building it from the branch name:
  Cloudflare rewrites the name and may shorten a long one. Previews are public
  addresses served with `X-Robots-Tag: noindex`.
- Build settings live in the Cloudflare dashboard, not in this repository:
  build command `npm run build`, output directory `dist`, environment variable
  `NODE_VERSION=24`, no framework preset. A change to how the site builds may
  need a change there too.
- What is published: only what Astro writes to `dist/`, which is the pages in
  `src/pages/`, the files in `public/` and the bundled assets. `README.md`,
  `CLAUDE.md`, `.claude/`, `docs/`, `tests/`, `scripts/` and the config files
  are never published. `scripts/check-dist.mjs` (part of `npm run verify`)
  checks the build output. `src/pages/404.astro` is there so that Cloudflare
  answers an unknown address with a real 404 instead of the home page.
- Site address: `site.url` in `src/site.config.ts` is the production domain.
  The sitemap, `robots.txt` and the canonical and share tags are built from
  it, on previews as well, so change it only if the domain changes.
- DNS for moveandgrow.com.br is managed in Cloudflare. The domain is
  registered through Locaweb, with its nameservers pointing at Cloudflare.
  Cloudflare's "Bot Preference Sync" is off, so the `robots.txt` this
  repository builds is the only one.
- `main` is protected by a GitHub ruleset: changes reach it only through a
  pull request with one approving review, and force pushes and deletion are
  blocked. Only the repository owner (admin) can bypass it; the other
  collaborator with write access always goes through a pull request the owner
  approves.

That ruleset is the real enforcement for the content skill.
`.claude/settings.json` only pre-approves the skill's commands and blocks the
usual ways of pushing to `main` or merging, which is a best-effort
convenience, not a security boundary, and the GitHub connection used by Claude
Code on the web does not limit which branches a push can update.

## Placeholders still to fill

- `src/site.config.ts`: `email` is `[EMAIL]`; `whatsapp` is `[WHATSAPP]`.
  While the contact details are placeholders the
  form is disabled and the site shows "Contato em configuração." instead of
  any `mailto:` or WhatsApp link. Once set, the form opens the visitor's e-mail
  (works without JavaScript) or WhatsApp with the brief pre-filled.
- `src/content/sobre.ts`: the marketing founder's name (`[Nome]`), bio
  (`[Cargo e resultados a confirmar.]`) and initials. The card is marked
  "Texto provisório" until `placeholder: true` is removed.
- Founder photos: initials only.
- Logo: `src/assets/logo.svg` is the single source. `src/components/Wordmark.astro`,
  the favicon, `public/logo.svg` and the share image repaint it in theme
  colours (`src/lib/logo.ts`).
- After changing the logo or the Home headline, run `npm run og`.

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
