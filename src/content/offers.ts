export type Offer = {
  id: string;
  name: string;
  covers: string;
  /** How the offer works for agencies; null when not offered to agencies. */
  agencies: string | null;
  /** How the offer works for companies; null when not offered to companies. */
  companies: string | null;
};

const forAgencyClients = 'Construído para os clientes da agência e entregue pelo time dela';

/** The four offers (spec, Services). */
export const offers: Offer[] = [
  {
    id: 'operacao-automatizada',
    name: 'Operação automatizada',
    covers:
      'Automação do trabalho da própria agência: relatórios, entrada de clientes, aprovações, repasse de leads e agentes de IA para tarefas repetitivas',
    agencies: 'Oferta principal',
    companies: null,
  },
  {
    id: 'motor-de-vendas',
    name: 'Motor de vendas',
    covers:
      'Funil e automação de vendas: captação de leads, qualificação, CRM, acompanhamento e WhatsApp',
    agencies: forAgencyClients,
    companies: 'Contratação direta',
  },
  {
    id: 'site-que-vende',
    name: 'Site que vende',
    covers: 'Sites e landing pages rápidos, feitos para serem encontrados na busca e para converter',
    agencies: forAgencyClients,
    companies: 'Contratação direta',
  },
  {
    id: 'midia-e-remarketing',
    name: 'Mídia e remarketing',
    covers: 'Google, Meta e outras plataformas de anúncios, com remarketing',
    agencies:
      'Só rastreamento, mensuração e automação; a agência continua gerenciando as campanhas',
    companies: 'Gestão completa das campanhas',
  },
];

/** Table headings and the note shown under the table. */
export const offerTableCopy = {
  caption: 'Ofertas',
  offer: 'Oferta',
  covers: 'O que cobre',
  agencies: 'Para agências',
  companies: 'Para empresas',
  notOffered: 'Não oferecido',
  campaignsNote:
    'Gerimos campanhas de anúncios apenas para os nossos próprios clientes, nunca para os clientes de uma agência.',
};
