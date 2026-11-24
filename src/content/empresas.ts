import type { Cta, Point, Seo } from './types';

export default {
  seo: {
    title: 'Para empresas: um marketing que funcione',
    description:
      'Site, anúncios, CRM e atendimento conectados em um funil só, medido do primeiro clique até a venda. Começamos pelo diagnóstico.',
  } satisfies Seo,
  breadcrumb: 'Para empresas',
  hero: {
    label: 'Para empresas',
    headline: 'Sua empresa já investe em marketing. Falta saber o que está funcionando.',
    lead: 'Conectamos site, anúncios, CRM e atendimento em um funil só, medido do primeiro clique até a venda.',
  },
  diagnostic: {
    label: 'Diagnóstico',
    heading: 'Você não precisa começar do zero. Precisa que o que já existe funcione.',
    point: {
      title: 'Diagnóstico antes de proposta.',
      text: 'Primeiro entendemos o que você já tem e onde o dinheiro está escapando.',
    } satisfies Point,
    link: 'Conheça o Mapa da Operação',
  },
  system: {
    label: 'Como funciona',
    heading: 'O marketing que você já faz, funcionando como um sistema.',
    items: [
      {
        title: 'Um funil só.',
        text: 'Site, anúncios, CRM e WhatsApp conectados, para nenhum contato se perder no caminho.',
      },
      {
        title: 'Números que o dono entende.',
        text: 'Quanto entrou, quanto custou, quanto vendeu.',
      },
      {
        title: 'Tudo fica no seu nome.',
        text: 'Contas, dados e automações são da sua empresa.',
      },
    ] satisfies Point[],
  },
  offers: {
    label: 'Ofertas',
    heading: 'O que fazemos para a sua empresa.',
  },
  cta: {
    heading: 'Comece pelo Mapa da Operação.',
    text: 'Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.',
  } satisfies Cta,
};
