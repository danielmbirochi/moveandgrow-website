import type { Cta, Point, Seo } from './types';

export default {
  seo: {
    title: 'Para agências: tecnologia na operação e na entrega',
    description:
      'Automatizamos relatórios, aprovações e repasse de leads da sua agência e construímos sites, funis e integrações para os seus clientes.',
  } satisfies Seo,
  breadcrumb: 'Para agências',
  hero: {
    label: 'Para agências',
    headline: 'Menos trabalho manual na operação. Mais tecnologia na entrega.',
    lead: 'Automatizamos os processos internos da sua agência e construímos o que os seus clientes pedem e o seu time não tem como fazer. Sem nunca falar com eles por fora.',
  },
  ways: {
    label: 'Como trabalhamos',
    heading: 'Duas formas de trabalhar com a gente.',
    items: [
      {
        title: 'Para dentro da agência.',
        text: 'Relatórios, entrada de novos clientes, aprovações, repasse de leads: o que hoje depende de planilha e de alguém lembrar passa a rodar sozinho.',
      },
      {
        title: 'Para os clientes da agência.',
        text: 'Sites rápidos, funis, integrações de CRM e agentes de IA, entregues pelo seu time e construídos pelo nosso.',
      },
    ] satisfies Point[],
  },
  offers: {
    label: 'Ofertas',
    heading: 'O que fazemos para agências.',
  },
  statement: {
    label: 'Compromisso',
    text: 'Não atendemos os seus clientes por fora. Isso está no contrato.',
  },
  cta: {
    heading: 'Comece pelo Mapa da Operação.',
    text: 'Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.',
  } satisfies Cta,
};
