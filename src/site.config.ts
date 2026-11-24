/**
 * Site-wide settings. Contact details stay as bracketed placeholders until
 * the real ones exist; while they are placeholders the site shows
 * "Contato em configuração." instead of emitting broken links.
 */
export const site = {
  url: 'https://example.com',
  email: '[EMAIL]',
  whatsapp: '[WHATSAPP]',
  nav: [
    { label: 'Para agências', href: '/para-agencias/' },
    { label: 'Para empresas', href: '/para-empresas/' },
    { label: 'Mapa da Operação', href: '/mapa-da-operacao/' },
    { label: 'Sobre', href: '/sobre/' },
  ] as { label: string; href: string }[],
};

/** False for empty values and bracketed placeholders such as `[EMAIL]`. */
export function isConfigured(value: string): boolean {
  const v = value.trim();
  return v !== '' && !/^\[.*\]$/.test(v);
}
