# Content Maintenance Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `CLAUDE.md`, a project skill `atualizar-site` and a `.claude/settings.json` so a non-technical stakeholder can change site copy through Claude, always by pull request.

**Architecture:** `CLAUDE.md` carries the repo facts and hard rules that apply to every session. The skill carries the content-editing workflow, with two reference files (content map, voice rules) loaded on demand. `settings.json` pre-allows the workflow's commands and denies pushes to `main`. One vitest file guards the prose files against drifting from the code.

**Tech Stack:** Markdown, Claude Code project skills and settings, vitest (already in the repo).

**Spec:** `docs/superpowers/specs/2026-11-24-content-skill-design.md`

## Global Constraints

- No file under `src/`, `scripts/` or the existing `tests/*.test.ts` changes. The only new test file is `tests/skill.test.ts`.
- The skill directory and its frontmatter `name` are both `atualizar-site`.
- Skill, references and `CLAUDE.md` are written in English for the model, except phrases the skill says to the person, which are Brazilian Portuguese. Reference file names stay in Portuguese as in the spec.
- The skill edits only `src/content/*.ts` and `src/site.config.ts`, plus `tests/content.test.ts` for a pinned string under the locked-copy rule and `src/assets/og/*.png` after `npm run og`.
- Branch names the skill creates: `conteudo/<short-slug>`.
- Locked-copy marker, verbatim: `**Texto aprovado alterado**`.
- All work for this plan happens on branch `feat/content-skill`, created from `main`. The uncommitted change to `astro.config.mjs` is not part of this work: do not stage it.
- `npm run verify` passes at the end of every task.

## Review Focus

A prose skill has no unit under test, so each line is pinned by a scenario in Task 3 Step 4.

1. Local clone with someone else's uncommitted changes: the skill stops and says so in plain Portuguese; it does not stash, discard or commit them.
2. A request that would add an avoided term or a price ("coloca 'a partir de R$ 2.000'"): the skill explains the rule and offers a rewording; it does not touch the avoided-terms list.
3. A request outside copy (colour, layout, new page): the skill declines and offers an issue write-up; it edits nothing.
4. Local clone where `gh` is not logged in: the skill pushes the branch and gives the GitHub compare link.
5. Web session without Google Chrome: the skill skips screenshots, says so, and shows before/after text.

---

### Task 1: `CLAUDE.md` and `.claude/settings.json`

**Files:**
- Create: `CLAUDE.md`
- Create: `.claude/settings.json`
- Create: `tests/skill.test.ts`

**Interfaces:**
- Produces: `CLAUDE.md` names the skill `atualizar-site`; `tests/skill.test.ts` exists for Tasks 2 and 3 to extend.

- [ ] **Step 1: Create the branch and commit the spec and plan**

```bash
git switch -c feat/content-skill
git add docs/superpowers/specs/2026-11-24-content-skill-design.md docs/superpowers/plans/2026-11-24-content-skill.md
git commit -m "docs: add content skill design and plan"
```

- [ ] **Step 2: Write the failing test**

`tests/skill.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

describe('claude settings', () => {
  const settings = JSON.parse(read('.claude/settings.json'));

  it('denies pushes to main and force pushes', () => {
    const deny: string[] = settings.permissions.deny;
    expect(deny.some((r) => r.includes('git push') && r.includes('main'))).toBe(true);
    expect(deny.some((r) => r.includes('--force'))).toBe(true);
  });

  it('allows the workflow commands', () => {
    const allow: string[] = settings.permissions.allow;
    for (const cmd of ['npm run verify', 'npm run og', 'npm install', 'gh pr create', 'git push']) {
      expect(allow.some((r) => r.includes(cmd)), cmd).toBe(true);
    }
  });
});

describe('CLAUDE.md', () => {
  it('states the pull-request rule and names the skill', () => {
    const text = read('CLAUDE.md');
    expect(text).toContain('pull request');
    expect(text).toContain('atualizar-site');
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run tests/skill.test.ts`
Expected: FAIL, `.claude/settings.json` not found.

- [ ] **Step 4: Write `.claude/settings.json`**

Shape: `{ "permissions": { "allow": [...], "deny": [...] } }` with `Bash(<command prefix>:*)` rules. Confirm the current rule syntax against the Claude Code settings documentation before writing.

- Allow: `npm install`, `npm run verify`, `npm run og`, `npm run dev`, `node scripts/screenshots.mjs`, `git fetch`, `git switch`, `git status`, `git diff`, `git add`, `git commit`, `git push`, `gh pr create`, `gh pr view`, `gh auth status`.
- Deny: `git push` to `main` in both spellings (`git push origin main`, `git push origin HEAD:main`), `git push --force`, `git push -f`.

- [ ] **Step 5: Write `CLAUDE.md`**

Under 40 lines. Sections and content exactly as the spec's "`CLAUDE.md` (always loaded, short)" section: what the site is with a pointer to `README.md`; where things live; the three commands; the three hard rules; the line sending text and contact-detail requests to the `atualizar-site` skill. Do not repeat what `README.md` already explains.

- [ ] **Step 6: Run the tests**

Run: `npx vitest run tests/skill.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 7: Commit**

```bash
git add CLAUDE.md .claude/settings.json tests/skill.test.ts
git commit -m "feat: add CLAUDE.md and project permissions"
```

---

### Task 2: Reference files

**Files:**
- Create: `.claude/skills/atualizar-site/references/mapa-do-conteudo.md`
- Create: `.claude/skills/atualizar-site/references/voz.md`
- Modify: `tests/skill.test.ts`

**Interfaces:**
- Consumes: `read()` helper in `tests/skill.test.ts` from Task 1.
- Produces: the two reference paths above, which `SKILL.md` links to in Task 3.

- [ ] **Step 1: Write the failing tests**

Append to `tests/skill.test.ts` (add `readdirSync` and `existsSync` to the `node:fs` import):

```ts
describe('content map', () => {
  const map = read('.claude/skills/atualizar-site/references/mapa-do-conteudo.md');

  it('mentions every content module and the site config', () => {
    const modules = readdirSync(new URL('../src/content/', import.meta.url))
      .filter((f) => f.endsWith('.ts') && f !== 'types.ts');
    for (const f of modules) expect(map, f).toContain(`src/content/${f}`);
    expect(map).toContain('src/site.config.ts');
  });

  it('only points at files that exist', () => {
    const paths = [...map.matchAll(/`((?:src|tests|docs)\/[^`\s]+\.\w+)`/g)].map((m) => m[1]);
    expect(paths.length).toBeGreaterThan(5);
    for (const p of paths) expect(existsSync(new URL(`../${p}`, import.meta.url)), p).toBe(true);
  });
});

describe('voice reference', () => {
  it('lists every avoided term the content test enforces', () => {
    const voz = read('.claude/skills/atualizar-site/references/voz.md').toLowerCase();
    const src = read('tests/content.test.ts');
    const block = src.slice(src.indexOf('const banned = ['), src.indexOf('];', src.indexOf('const banned = [')));
    const terms = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1]);
    expect(terms.length).toBeGreaterThan(10);
    for (const t of terms) expect(voz, t).toContain(t.toLowerCase());
  });
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run tests/skill.test.ts`
Expected: FAIL, reference files not found.

- [ ] **Step 3: Write `mapa-do-conteudo.md`**

Read every file in `src/content/` and `src/site.config.ts` first. One section per page (Home, Para agências, Para empresas, Mapa da Operação, Sobre, Contato) plus "Em todas as páginas" (`shell.ts`, `offers.ts`, `commitments.ts`, `site.config.ts`). Each section is a table: what the person sees, in their words in Portuguese ("o título grande no topo") | file in backticks | field path (`hero.headline`). Then:

- "Texto aprovado": the three pinned headlines and the engineering bio, each marked as pinned in `tests/content.test.ts`.
- "Ainda por preencher": `site.url` (`https://example.com`), `site.email` (`[EMAIL]`), `site.whatsapp` (`[WHATSAPP]`), and in `src/content/sobre.ts` the marketing founder's name, bio, initials and the `placeholder: true` flag to remove once filled.
- A closing line: the content files are the source of truth; if this map disagrees with them, follow the files.

- [ ] **Step 4: Write `voz.md`**

Take the Voice section of `docs/superpowers/specs/2026-11-24-website-design.md` and the rules in `tests/content.test.ts`. Content: short sentences and concrete nouns; the full avoided-terms list copied from the test; no prices (`R$`); the brand name is never typed into copy (it comes from `visual-identity.config.ts`); "do zero" appears once, in the approved headline; SEO descriptions are 70 to 160 characters and titles are unique. For each rule, one line on how to explain a violation to the person in plain Portuguese. State that `tests/content.test.ts` is the enforced list.

- [ ] **Step 5: Run the tests**

Run: `npx vitest run tests/skill.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/atualizar-site/references tests/skill.test.ts
git commit -m "feat: add content map and voice reference for the content skill"
```

---

### Task 3: `SKILL.md` and scenario check

**Files:**
- Create: `.claude/skills/atualizar-site/SKILL.md`
- Modify: `tests/skill.test.ts`

**Interfaces:**
- Consumes: `references/mapa-do-conteudo.md` and `references/voz.md` from Task 2.

- [ ] **Step 1: Write the failing test**

Append to `tests/skill.test.ts`:

```ts
describe('skill', () => {
  const skill = read('.claude/skills/atualizar-site/SKILL.md');

  it('has matching frontmatter and a description', () => {
    expect(skill).toMatch(/^---\nname: atualizar-site\ndescription: .{80,}\n/);
  });

  it('links both references and carries the fixed strings', () => {
    for (const s of [
      'references/mapa-do-conteudo.md',
      'references/voz.md',
      'conteudo/',
      '**Texto aprovado alterado**',
      'npm run verify',
      'npm run og',
    ]) expect(skill, s).toContain(s);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run tests/skill.test.ts`
Expected: FAIL, `SKILL.md` not found.

- [ ] **Step 3: Write `SKILL.md`**

Frontmatter: `name: atualizar-site`; `description` on one line, saying what it does and when to use it, with trigger phrases in both languages ("muda o texto", "troca o título", "atualiza o WhatsApp", "corrige a bio", "update the copy", "change the headline") and what it is not for (layout, colours, new pages).

Body, under 150 lines, in this order:

1. **Who you are talking to.** A non-technical person. Speak Brazilian Portuguese. No git, test or file vocabulary unless they use it first. Never show raw command output; say what it means.
2. **The six steps**, exactly as the spec's Workflow list (Prepare, Understand, Edit, Check, Show, Hand off), with these decisions made:
   - Prepare, local: `git status --porcelain`; if anything is listed, stop and say there is unfinished work on this computer that a maintainer needs to look at. Otherwise `git fetch origin` and `git switch -c conteudo/<slug> origin/main`.
   - Prepare, web: run `npm install` if `node_modules` is missing; create the same branch.
   - Tell surfaces apart by trying, not by guessing: the checks above work on both.
   - Understand: read `references/mapa-do-conteudo.md`, then the content file. Show "Antes" and "Depois". Ask for a yes only when the wording was left open; an exact replacement the person dictated needs no confirmation.
   - Edit: the allowed files from Global Constraints. Out of scope: say so, offer to write the request up as an issue.
   - Check: `npm run verify`; `npm run og` when the Home headline or brand name changed, and stage `src/assets/og/`. Translate failures using `references/voz.md`. Never edit the avoided-terms list, the price rule or the brand-name rule.
   - Locked copy: when the request is to change a pinned headline or the engineering bio, update the copy and the pinned string in `tests/content.test.ts` together and open the PR body with `**Texto aprovado alterado**`.
   - Show, local: `npm run dev` in the background, give `http://localhost:4321/<page>/`. Show, web: build, `npm run preview` in the background, `node scripts/screenshots.mjs http://localhost:4321 <active theme> <scratch dir> <changed paths>`; show the images. If Chrome is missing, say screenshots are unavailable here and show the before/after text.
   - Hand off: one commit, `git push -u origin conteudo/<slug>`, `gh pr create`. If `gh auth status` fails, push and give `https://github.com/<owner>/<repo>/compare/conteudo/<slug>?expand=1`, with owner and repo read from `git remote get-url origin`. PR title and body in Portuguese: what changed, which page, before and after, check result. Give the link and say a maintainer will review before it goes live.
3. **Never.** Push to `main`; merge the pull request; edit components, themes, pages or generated files; loosen a voice rule.

- [ ] **Step 4: Scenario check**

Dispatch one fresh subagent per scenario, read-only, with this prompt: "Read `CLAUDE.md` and `.claude/skills/atualizar-site/SKILL.md` in this repo and any file they point you to. Do not change anything. A person writes: `<request>`. Situation: `<situation>`. List the exact commands and file edits you would make, in order, and what you would say to the person." Compare each answer with the expected behaviour; where it differs, fix the wording in `SKILL.md` and rerun that scenario.

| Request | Situation | Expected |
| --- | --- | --- |
| "Muda o subtítulo da home para: Marketing e engenharia juntos, do diagnóstico à entrega." | local, clean tree | branch `conteudo/...` from `origin/main`; edits `hero.lead` in `src/content/home.ts` only; verify; dev link; PR |
| same | local, `astro.config.mjs` modified | stops, edits nothing |
| "Coloca 'a partir de R$ 2.000' na página de empresas" | any | explains the no-prices rule, offers a rewording, leaves the test alone |
| "Deixa o botão verde" | any | declines, offers an issue write-up |
| "Troca o título da home para: A operação de marketing que você já tem, melhor." | local, `gh` not logged in | updates copy and pinned string, runs `npm run og`, PR text starts with the marker, compare link given |
| "Atualiza o WhatsApp para 11 99999-0000" | web, no Chrome | edits `src/site.config.ts`; says screenshots unavailable; before/after text; PR |

- [ ] **Step 5: Run everything**

Run: `npm run verify`
Expected: all tests pass (8 in `tests/skill.test.ts`), `astro check` clean, build and dist checks pass.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/atualizar-site/SKILL.md tests/skill.test.ts
git commit -m "feat: add atualizar-site content skill"
```

- [ ] **Step 7: Update the README**

In `README.md`, add one row to the "Where things live" table: `Content updates through Claude` | `.claude/skills/atualizar-site/` (rules in `CLAUDE.md`). Commit: `docs: point README at the content skill`.
