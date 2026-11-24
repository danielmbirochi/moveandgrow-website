import type { Seo } from './types';

export type Founder = {
  role: string;
  name: string;
  bio: string;
  initials: string;
  placeholder?: boolean;
};

export default {
  seo: {
    title: 'Sobre: marketing e engenharia no mesmo time',
    description:
      'Marketing e engenharia no mesmo time, sem repasse entre agência e fornecedor de software. Conheça os sócios e os nossos compromissos.',
  } satisfies Seo,
  breadcrumb: 'Sobre',
  hero: {
    label: 'Sobre',
    headline: 'Marketing e engenharia no mesmo time.',
    paragraphs: [
      'Quem contrata uma agência de marketing e um fornecedor de software costuma ficar no meio, repassando pedidos de um para o outro. Aqui as duas disciplinas trabalham no mesmo projeto, sem esse repasse.',
      'Os sócios lideram pessoalmente um time que trabalha lado a lado com o cliente e respondem pelo resultado.',
    ],
  },
  foundersSection: {
    label: 'Sócios',
    heading: 'Quem responde pelo trabalho.',
    placeholderNote: 'Texto provisório',
  },
  founders: [
    {
      role: 'Engenharia',
      name: 'Daniel Miranda Birochi',
      bio: 'Daniel Miranda Birochi. Há 10 anos constrói sistemas financeiros de missão crítica, onde um erro custa caro e parar não é opção. Projeta agentes de IA desde 2024 e já liderou arquitetura de agentes que operam em produção, todos os dias. Passou por grandes empresas de tecnologia, como a Binance. Começou a carreira ao lado do cliente, como engenheiro alocado na operação, e leva essa prática até hoje: entender o negócio antes de desenhar a solução. Também atua como mentor de startups no ecossistema brasileiro.',
      initials: 'DB',
    },
    {
      role: 'Marketing',
      name: '[Nome]',
      bio: '15 anos de marketing digital, com passagem pela TikTok. [Cargo e resultados a confirmar.]',
      initials: '[N]',
      placeholder: true,
    },
  ] as Founder[],
  commitments: {
    label: 'Compromissos',
    heading: 'Três regras que valem para qualquer projeto.',
  },
};
