import { describe, it, expect } from 'vitest';
import { resolveTheme, themeToCssVars, contrastRatio } from '../src/themes';
import { oficina } from '../src/themes/oficina';

describe('themes', () => {
  it('defaults to oficina', () => {
    expect(resolveTheme().name).toBe('oficina');
  });
  it('maps oficina colours from the spec', () => {
    const v = themeToCssVars(resolveTheme('oficina'));
    expect(v['--color-ground']).toBe('#FFFFFF');
    expect(v['--color-ink']).toBe('#0E1B2A');
    expect(v['--color-accent']).toBe('#FF5A1F');
    expect(v['--radius-control']).toBe('2px');
  });
  it('maps sistema colours from the spec', () => {
    const v = themeToCssVars(resolveTheme('sistema'));
    expect(v['--color-ground']).toBe('#12102E');
    expect(v['--color-accent']).toBe('#6C4DFF');
    expect(v['--radius-control']).toBe('12px');
  });
  it.each(['oficina', 'sistema'] as const)('%s meets text contrast', (name) => {
    const c = resolveTheme(name).colors;
    expect(contrastRatio(c.ink, c.ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.muted, c.ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.muted, c.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.body, c.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.onAccent, c.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.accentText, c.ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.inverseInk, c.inverseGround)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(c.accentTextOnInverse, c.inverseGround)).toBeGreaterThanOrEqual(4.5);
  });
  it('names the missing token', () => {
    const broken = structuredClone(oficina) as any;
    delete broken.colors.accent;
    expect(() => themeToCssVars(broken)).toThrow('Missing theme token: colors.accent');
  });
});
