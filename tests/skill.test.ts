import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

describe('claude settings', () => {
  const settings = JSON.parse(read('.claude/settings.json'));

  it('denies pushes to main and force pushes', () => {
    const deny: string[] = settings.permissions.deny;
    expect(deny.some((r) => r.includes('git push') && r.includes('main'))).toBe(true);
    expect(deny.some((r) => r.includes('--force'))).toBe(true);

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
