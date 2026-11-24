# Move and Grow website

Static Astro site in Brazilian Portuguese. `README.md` covers the rest.

## Where things live

- Copy: `src/content/*.ts`
- Contact details and navigation: `src/site.config.ts`
- Brand name and theme: `visual-identity.config.ts`

## Commands

- `npm run dev`
- `npm run verify`
- `npm run og`

## Hard rules

- Changes go by pull request. Never commit or push to `main`.
- Merging into `main` publishes: the host builds every commit on `main`
  straight to the live site, with no further step. Leave merging to the
  maintainers. Each pull request gets a preview link in a comment from
  Cloudflare. See "Hosting and deploy" in `README.md`.
- Never loosen the avoided-terms list, the no-prices rule or the
  no-hard-coded-brand-name rule in `tests/content.test.ts`.
- Never edit the generated files (`*.generated.css`, `public/favicon.svg`,
  `public/og-default.png`).

For any request to change site text or contact details, use the
`atualizar-site` skill.
