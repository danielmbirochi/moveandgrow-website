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
- Never loosen the avoided-terms list, the no-prices rule or the
  no-hard-coded-brand-name rule in `tests/content.test.ts`.
- Never edit the generated files (`*.generated.css`, `public/favicon.svg`,
  `public/og-default.png`).

For any request to change site text or contact details, use the
`atualizar-site` skill.
