import type { Cta, Seo } from './types';

export default {
  seo: {
    title: 'Marketing e engenharia para agências e empresas',
    description:
      'Marketing e engenharia no mesmo time. Evoluímos a operação de marketing de agências e empresas, começando pelo que você já tem.',
  } satisfies Seo,
  hero: {
    label: 'Marketing + engenharia',
    headline: 'Evoluímos a operação de marketing que você já tem.',
    lead: 'Marketing e engenharia no mesmo time. Para agências que querem ganhar eficiência e para empresas que querem um marketing que funcione.',
    doors: [
      { label: 'Sou agência', href: '/para-agencias/' },
      { label: 'Sou empresa', href: '/para-empresas/' },
    ],
  },
  commitments: {
    label: 'Compromissos',
    heading: 'Três regras que valem para qualquer projeto.',
  },
  audiences: {
    label: 'Para quem',
    heading: 'Dois pontos de partida.',
    cards: [
      {
        label: 'Para agências',
        text: 'O time de tecnologia que a sua agência ainda não tem.',
        link: 'Ver o trabalho com agências',
        href: '/para-agencias/',
      },
      {
        label: 'Para empresas',
        text: 'Sua empresa já investe em marketing. Falta saber o que está funcionando.',
        link: 'Ver o trabalho com empresas',
        href: '/para-empresas/',
      },
    ],
  },
  offers: {
    label: 'Ofertas',
    heading: 'O que fazemos.',
  },
  mapa: {
    label: 'Primeiro passo',
    heading: 'Mapa da Operação',
    text: 'Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.',
    more: 'Como funciona o mapa',
  } satisfies Cta & Record<string, string>,
};
