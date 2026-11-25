import { describe, it, expect } from 'vitest';
import home from '../src/content/home';
import agencias from '../src/content/agencias';
import empresas from '../src/content/empresas';
import mapa from '../src/content/mapa';
import sobre from '../src/content/sobre';
import contato from '../src/content/contato';
import notFound from '../src/content/not-found';
import { offers, offerTableCopy } from '../src/content/offers';
import { commitments } from '../src/content/commitments';
import shell from '../src/content/shell';

const pages = { home, agencias, empresas, mapa, sobre, contato, notFound };
const modules = { ...pages, offers, offerTableCopy, commitments, shell };

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const all = Object.values(modules).flatMap(strings);

const banned = [
  'escalar',
  'acelerar',
  'alavancar',
  'decolar',
  'transformação',
  'superpoderes',
  'AI First',
  'ROI previsível',
  'máquina de crescimento',
  'com a sua marca',
  'nos bastidores',
  'de ponta a ponta',
  'full service',
  'a maior',
  '24 horas',
];

const ENGINEERING_BIO =
  'Daniel tem mais de dez anos de experiência construindo tecnologia para o mercado financeiro, onde errar custa caro. Liderou sistemas usados por centenas de milhões de pessoas e esteve à frente de sistemas que operam agentes de inteligência artificial em escala, sempre ao lado de CEOs e fundadores, transformando estratégia em resultado. Sua marca é fazer a tecnologia trabalhar para o negócio: reduzir custos, eliminar retrabalho e tirar ideias do papel com segurança. Aqui, ele garante que tudo o que o marketing promete tenha uma operação sólida para entregar.';

describe('content', () => {
  it('collects a meaningful amount of copy', () => {
    expect(all.length).toBeGreaterThan(50);
  });

  it.each(banned)('never uses the avoided term "%s"', (term) => {
    const hits = all.filter((s) => s.toLowerCase().includes(term.toLowerCase()));
    expect(hits).toEqual([]);
  });

  it('uses "do zero" exactly once (the approved headline)', () => {
    const count = all.reduce((n, s) => n + (s.match(/do zero/gi)?.length ?? 0), 0);
    expect(count).toBe(1);
  });

  it('publishes no prices', () => {
    expect(all.filter((s) => s.includes('R$'))).toEqual([]);
  });

  it('keeps the approved headlines verbatim', () => {
    expect(home.hero.headline).toBe('Evoluímos a operação de marketing que você já tem.');
    expect(agencias.hero.headline).toBe(
      'Menos trabalho manual na operação. Mais tecnologia na entrega.',
    );
    expect(empresas.hero.headline).toBe(
      'Sua empresa já investe em marketing. Falta saber o que está funcionando.',
    );
  });

  it('keeps the engineering bio exactly as approved', () => {
    expect(sobre.founders[1].bio).toBe(ENGINEERING_BIO);
  });

  it('never hard-codes the brand name', () => {
    expect(all.filter((s) => s.includes('Move and Grow') || s.includes('M.G.'))).toEqual([]);
  });

  it('has SEO descriptions of 70 to 160 characters and unique titles', () => {
    const seos = Object.values(pages).map((p) => p.seo);
    for (const seo of seos) {
      expect(seo.description.length, seo.description).toBeGreaterThanOrEqual(70);
      expect(seo.description.length, seo.description).toBeLessThanOrEqual(160);
    }
    const titles = seos.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
