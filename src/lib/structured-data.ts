import { brand } from '../../visual-identity.config';
import { site, isConfigured } from '../site.config';
import { offers } from '../content/offers';

const abs = (path: string) => new URL(path, site.url).href;
const orgId = abs('/#organization');

export function organization(description: string): Record<string, unknown> {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: brand.name,
    alternateName: brand.shortName,
    url: abs('/'),
    logo: abs('/favicon.svg'),
    description,
    areaServed: 'BR',
    knowsLanguage: 'pt-BR',
  };
  if (isConfigured(site.email)) org.email = site.email;
  return org;
}

/** Service entries for the offers shown to an audience. */
export function services(
  audience: 'agencies' | 'companies' | 'all',
  pagePath: string,
): Record<string, unknown>[] {
  const shown = audience === 'all' ? offers : offers.filter((o) => o[audience] !== null);
  return shown.map((o) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': abs(`${pagePath}#${o.id}`),
    name: o.name,
    description: o.covers,
    serviceType: o.name,
    provider: { '@type': 'Organization', '@id': orgId, name: brand.name },
    areaServed: 'BR',
    availableLanguage: 'pt-BR',
    url: abs(pagePath),
  }));
}
