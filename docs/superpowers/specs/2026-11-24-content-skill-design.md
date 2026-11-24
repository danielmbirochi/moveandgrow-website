# Content maintenance skill and CLAUDE.md: design

Date: 2026-11-24

## Intent

A non-technical stakeholder should be able to change the site's copy by asking
Claude in plain Portuguese, from Claude Code on the web or from a local clone
(desktop app or CLI). Every change reaches the site through a pull request that
a maintainer reviews. Maintainers who clone the repo get the same behaviour
without installing anything.

## Goals

- Copy and contact-detail changes without the stakeholder touching code, git or
  a terminal.
- Every change arrives as a pull request with a plain-language summary and a
  way to see the result.
- The voice rules already enforced by `tests/content.test.ts` hold for every
  change.
- Works the same on the web and on a local clone.

## Non-goals

- Design, layout, theme or component changes.
- Adding or removing pages (possible later as a second skill).
- Choosing a host or setting up preview deploys.

## Anti-goals

- A change landing on `main` without a pull request.
- A voice rule (avoided terms, no prices, no hard-coded brand name) being
  loosened to make a request pass.
- The stakeholder being shown stack traces, git jargon or permission prompts
  they cannot judge.

## Approaches considered

| | Approach | Trade-off |
| --- | --- | --- |
| A | Thin `CLAUDE.md` plus one project skill | Hard rules apply in every session; the workflow and the non-technical tone load only for content work. **Chosen.** |
| B | Everything in `CLAUDE.md` | Nothing depends on the skill triggering, but developer sessions carry the whole stakeholder workflow and tone. |
| C | Several small skills (edit text, fill placeholders, add a page) | The tasks share nearly all their steps; too much for six pages. |

Decided by the owner: approach A; the skill lives in the repo as a project
skill; both surfaces are supported; changes are always by pull request; the
repo gets a `CLAUDE.md`.

## What gets built

```
CLAUDE.md
.claude/
  settings.json
  skills/atualizar-site/
    SKILL.md
    references/
      mapa-do-conteudo.md
      voz.md
```

### `CLAUDE.md` (always loaded, short)

- What the site is: static Astro site in Brazilian Portuguese; pointer to
  `README.md` for the rest.
- Where things live: copy in `src/content/*.ts`, contact details and navigation
  in `src/site.config.ts`, brand name and theme in `visual-identity.config.ts`.
- Commands: `npm run dev`, `npm run verify`, `npm run og`.
- Hard rules:
  - Changes go by pull request. Never commit or push to `main`.
  - Never loosen the avoided-terms list, the no-prices rule or the
    no-hard-coded-brand-name rule in `tests/content.test.ts`.
  - Never edit the generated files (`*.generated.css`, `public/favicon.svg`,
    `public/og-default.png`).
- For any request to change site text or contact details, use the
  `atualizar-site` skill.

### Skill `atualizar-site`

Description written to trigger on plain requests in Portuguese and English
("muda o texto da home", "atualiza o WhatsApp", "troca a bio", "update the
copy"). Written in English for the model; tells Claude to talk to the person in
Brazilian Portuguese with no technical vocabulary.

Workflow:

1. **Prepare.** Work out the surface. Local clone: stop if there are
   uncommitted changes that are not the skill's own, fetch, and branch from the
   latest `origin/main`. Web: the checkout is fresh; run `npm install` if
   `node_modules` is missing. Branch name: `conteudo/<short-slug>`.
2. **Understand.** Find the current text using `references/mapa-do-conteudo.md`
   and by reading the content file itself. Show before and after, and wait for
   a yes when the request left the wording open.
3. **Edit.** Only `src/content/*.ts` and `src/site.config.ts`. Anything else
   (layout, colours, a new page) is out of scope: say so and offer to describe
   the request in an issue for a maintainer.
4. **Check.** Run `npm run verify`. Run `npm run og` and commit the result if
   the Home headline or brand name changed. On a failure, translate it: an
   avoided term, a price, an SEO description outside 70 to 160 characters.
   Offer a rewording; do not change the test.
5. **Show.** Local: start the dev server and give the page link. Web: take
   screenshots of the changed pages with `scripts/screenshots.mjs` and show
   them. If screenshots cannot be taken, say so and show the before/after text.
6. **Hand off.** Commit, push the branch, open a pull request. PR body in
   Portuguese: what changed, on which page, before and after text, and the
   check result. Give the person the PR link and say a maintainer will review
   it.

Locked copy (my call, not yet confirmed by the owner beyond the conversation):
the approved headlines and the engineering bio are pinned verbatim in
`tests/content.test.ts`. When the request is to change one of them, the skill
changes the copy and its pinned string together and puts
"**Texto aprovado alterado**" at the top of the PR body. The review is the
sign-off. The same applies to the "do zero" count only if the approved headline
containing it changes.

### `references/mapa-do-conteudo.md`

A table from what the person sees ("o título grande da página inicial", "a bio
dos sócios", "o WhatsApp do rodapé") to file and field. It also lists the
placeholders still to fill (`[EMAIL]`, `[WHATSAPP]`, `https://example.com`, the
marketing founder's name and bio with `placeholder: true`). The skill treats
the content files as the source of truth and the map as a guide.

### `references/voz.md`

The voice rules from the website spec: short sentences, concrete nouns, the
avoided-terms list, no prices, the brand name never typed into copy. Says that
`tests/content.test.ts` is the enforced list and this file explains it.

### `.claude/settings.json`

- Allow without prompting: `npm install`, `npm run verify`, `npm run og`,
  `npm run dev`, `node scripts/screenshots.mjs`, `git fetch`, `git switch`,
  `git add`, `git commit`, `git push` of the current branch, `gh pr create`,
  `gh pr view`.
- Deny: pushes to `main`, force pushes.

## Constraints

- `scripts/screenshots.mjs` launches the installed Google Chrome
  (`channel: 'chrome'`). The web environment may not have it; step 5 has a
  text-only fallback for that reason.
- Local pull requests need `gh` logged in once. If it is not, the skill pushes
  the branch and gives the GitHub "compare" link instead.
- The written rule does not enforce PR-only. Branch protection on `main` does;
  that is a GitHub setting for the owner to turn on.
- There is no host yet (`site.url` is `https://example.com`), so there are no
  preview links to put in the PR.

## Left to the builder

- Exact wording of the skill description and the Portuguese phrases the skill
  uses with the person.
- Exact permission-rule syntax in `.claude/settings.json`.
- Whether the web environment needs a setup script for `npm install` or the
  skill's own step is enough.
- A check that the skill triggers on a few sample requests and that a sample
  change (for example the Home lead) goes from request to pull request on a
  local clone.
