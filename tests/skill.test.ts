import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

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
