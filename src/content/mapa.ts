import type { Cta, Seo } from './types';

export default {
  seo: {
    title: 'Mapa da Operação: o primeiro passo',
    description:
      'Em duas semanas, um mapa por escrito do que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.',
  } satisfies Seo,
  breadcrumb: 'Mapa da Operação',
  hero: {
    label: 'Primeiro passo',
    headline: 'Mapa da Operação',
    intro: 'O primeiro passo de todo projeto, com escopo fechado e valor fixo.',
    lead: 'Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.',
  },
  facts: {
    label: 'Como funciona',
    heading: 'O que está incluído.',
    items: [
      { term: 'Duração', detail: 'Duas semanas.' },
      {
        term: 'O que analisamos',
        detail: 'Ferramentas, contas, processos e números que você já tem.',
      },
      {
        term: 'O que você recebe',
        detail:
          'Um mapa por escrito com o que funciona, onde tempo ou dinheiro estão escapando e de três a cinco prioridades ordenadas por retorno, cada uma com estimativa de esforço.',
      },
      {
        term: 'De quem é',
        detail: 'Seu. Você pode executar com a gente, com o seu time ou com outro fornecedor.',
      },
      {
        term: 'Investimento',
        detail:
          'Valor fixo, informado na primeira conversa e descontado do primeiro projeto se você continuar com a gente.',
      },
    ],
  },
  honest: {
    label: 'Sem promessa',
    text: 'O mapa não é promessa de vendas. É a base para decidir onde investir.',
  },
  cta: {
    heading: 'Vamos mapear a sua operação.',
  } satisfies Cta,
};
