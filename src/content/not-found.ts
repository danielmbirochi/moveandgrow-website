import type { Seo } from './types';

/** Copy of the 404 page, served for any unknown URL. */
export default {
  seo: {
    title: 'Página não encontrada',
    description:
      'Esta página não existe ou mudou de endereço. Volte para o início ou conte o que você procurava na página de contato.',
  } satisfies Seo,
  hero: {
    label: 'Erro 404',
    headline: 'Página não encontrada.',
    lead: 'O endereço pode ter mudado ou nunca ter existido. O restante do site continua no lugar.',
  },
  links: {
    home: 'Voltar para o início',
    contact: 'Ir para o contato',
  },
};
