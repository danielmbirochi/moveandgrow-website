import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, posix } from 'node:path';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const exists = (p: string) => existsSync(new URL(`../${p}`, import.meta.url));

// Repo paths cited in backticks in a prose file, including inside a command. Globs, placeholders and URLs
// are skipped, and so are gitignored (generated) paths, which a fresh clone
// does not have. A bare file name may be relative to the citing file, to the
// repo root, or a content module (`home.ts`).
const rootDirs = new Set(
  readdirSync(new URL('../', import.meta.url), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name),
);
const ignored = read('.gitignore').split('\n').map((l) => l.trim()).filter(Boolean);
function citedPaths(file: string): { path: string; found: boolean }[] {
  const here = dirname(file);
  return [...read(file).matchAll(/`([^`\n]+)`/g)]
    .flatMap((m) => m[1].split(/\s+/))
    .filter((p) => !/[*<>{}]|:\/\//.test(p) && !p.startsWith('/'))
    .filter((p) =>
      p.includes('/')
        ? rootDirs.has(p.split('/')[0]) || exists(posix.join(here, p.split('/')[0]))
        : /^[\w.-]+\.(?:ts|mjs|js|json|md)$/.test(p),
    )
    .filter((p) => !ignored.includes(p))
    .map((p) => ({
      path: p,
      found: [p, posix.join(here, p), `src/content/${p}`].some(exists),
    }));
}

describe('claude settings', () => {
  const settings = JSON.parse(read('.claude/settings.json'));

  it('denies pushes to main and force pushes', () => {
    const deny: string[] = settings.permissions.deny;
    expect(deny.some((r) => r.includes('git push') && r.includes('main'))).toBe(true);
    expect(deny.some((r) => r.includes('--force'))).toBe(true);
    for (const target of ['refs/heads/main', '--mirror', '--all']) {
      expect(deny.some((r) => r.includes('git push') && r.includes(target)), target).toBe(true);
    }

    const pushAllows = (settings.permissions.allow as string[]).filter((r) => r.includes('git push'));
    expect(pushAllows.length).toBeGreaterThan(0);
    for (const rule of pushAllows) expect(rule, rule).toContain('conteudo/');
  });

  it('allows the workflow commands', () => {
    const allow: string[] = settings.permissions.allow;
    for (const cmd of [
      'npm run verify',
      'npm run og',
      'gh pr create',
      'gh api repos/*/pulls',
      'git push',
      'npm run build',
      'npm run preview',
      'git remote get-url',
      'git restore src/site.config.ts',
    ]) {
      expect(allow.some((r) => r.includes(cmd)), cmd).toBe(true);
    }
  });

  it('allows only the bare npm install, not installing packages', () => {
    const installs = (settings.permissions.allow as string[]).filter((r) => r.includes('npm install'));
    expect(installs).toEqual(['Bash(npm install)']);
  });

  it('allows git restore only for single named copy files', () => {
    const restores = (settings.permissions.allow as string[]).filter((r) => r.includes('git restore'));
    expect(restores.length).toBeGreaterThan(0);
    for (const rule of restores) {
      expect(rule, rule).toMatch(/^Bash\(git restore (?:src\/content\/[\w-]+\.ts|src\/site\.config\.ts)\)$/);
      expect(exists(rule.slice('Bash(git restore '.length, -1)), rule).toBe(true);
    }
  });

  it('pre-approves edits to the copy files and nothing else', () => {
    const edits = (settings.permissions.allow as string[]).filter((r) => r.startsWith('Edit('));
    expect(edits.sort()).toEqual(['Edit(/src/content/**)', 'Edit(/src/site.config.ts)']);
  });

  it('denies merging and discarding uncommitted work', () => {
    const deny: string[] = settings.permissions.deny;
    for (const rule of [
      'Bash(gh pr merge*)',
      'Bash(gh api */merge*)',
      'Bash(git switch -f *)',
      'Bash(git switch *--force*)',
      'Bash(git switch *--discard-changes*)',
    ]) {
      expect(deny, rule).toContain(rule);
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

describe('content map', () => {
  const map = read('.claude/skills/atualizar-site/references/mapa-do-conteudo.md');

  it('mentions every content module and the site config', () => {
    const modules = readdirSync(new URL('../src/content/', import.meta.url))
      .filter((f) => f.endsWith('.ts') && f !== 'types.ts');
    for (const f of modules) expect(map, f).toContain(`src/content/${f}`);
    expect(map).toContain('src/site.config.ts');
  });

  it('only points at files that exist', () => {
    const paths = citedPaths('.claude/skills/atualizar-site/references/mapa-do-conteudo.md');
    expect(paths.length).toBeGreaterThan(5);
    for (const { path, found } of paths) expect(found, path).toBe(true);
  });
});

describe('prose that cites repo paths', () => {
  it.each([
    '.claude/skills/atualizar-site/SKILL.md',
    '.claude/skills/atualizar-site/references/voz.md',
    'CLAUDE.md',
  ])('%s only points at paths that exist', (file) => {
    const paths = citedPaths(file);
    expect(paths.length).toBeGreaterThan(2);
    for (const { path, found } of paths) expect(found, path).toBe(true);
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
