# Lighthouse scores

Run on 2026-11-24 with Lighthouse 13.6.0 (local devDependency), mobile form factor
with Lighthouse's default simulated throttling, headless Google Chrome, against
`npm run preview` (the static `dist/` build) on `http://localhost:4401`.

Command per page:

```
npx lighthouse http://localhost:4401/<path> \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --output=json --chrome-flags="--headless=new"
```

## Theme "oficina" (default)

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/para-agencias/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0.001 |
| `/para-empresas/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/mapa-da-operacao/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0 |
| `/sobre/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0.001 |
| `/contato/` | 100 | 100 | 100 | 100 | 0.8 s | 0.8 s | 0 ms | 0.019 |

## Theme "sistema" (`MG_THEME=sistema npm run build`)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 0.8 s | 0.001 |
| `/para-agencias/` | 100 | 100 | 100 | 100 | 0.8 s | 0.002 |
| `/para-empresas/` | 100 | 100 | 100 | 100 | 0.8 s | 0.002 |
| `/mapa-da-operacao/` | 100 | 100 | 100 | 100 | 0.8 s | 0.014 |
| `/sobre/` | 100 | 100 | 100 | 100 | 0.8 s | 0.001 |
| `/contato/` | 100 | 100 | 100 | 100 | 0.8 s | 0.019 |

## Caveats

- Local runs: no CDN, no real network, no HTTP compression from a production
  host. Re-run against the real host once the site is deployed.
- The canonical and Open Graph URLs point at the placeholder `https://example.com`
  until the domain exists.
- The small CLS on some pages is the self-hosted fonts swapping in
  (`font-display: swap`).
