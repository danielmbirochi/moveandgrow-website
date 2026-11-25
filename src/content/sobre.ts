import type { Seo } from './types';
import type { FounderPhoto } from '../lib/founder-photos';

export type Founder = {
  role: string;
  name: string;
  bio: string;
  initials: string;
  /** Portrait in `src/assets/founders/`; without it the card shows the initials. */
  photo?: FounderPhoto;
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
      role: 'Especialista em Marketing',
      name: 'Luiz Dias',
      bio: 'Luiz tem mais de 16 anos de experiência fazendo marcas crescerem no digital. Foi Head de Marketing coordenando operações em cinco países simultaneamente e atuou em algumas das empresas de tecnologia que mais cresceram no mundo, sempre com um compromisso claro: transformar investimento em resultado. Sua marca é enxergar o marketing como parte integral do negócio, e não como despesa. Ele sabe onde vale colocar dinheiro e onde ele está sendo desperdiçado. Aqui, ele garante que cada real investido em marketing tenha um caminho claro até a receita.',
      initials: 'LD',
      photo: 'luiz',
    },
    {
      role: 'Head de Engenharia',
      name: 'Daniel Miranda Birochi',
      bio: 'Daniel tem mais de dez anos de experiência construindo tecnologia para o mercado financeiro, onde errar custa caro. Liderou sistemas usados por centenas de milhões de pessoas e esteve à frente de sistemas que operam agentes de inteligência artificial em escala, sempre ao lado de CEOs e fundadores, transformando estratégia em resultado. Sua marca é fazer a tecnologia trabalhar para o negócio: reduzir custos, eliminar retrabalho e tirar ideias do papel com segurança. Aqui, ele garante que tudo o que o marketing promete tenha uma operação sólida para entregar.',
      initials: 'DM',
      photo: 'daniel',
    },
  ] as Founder[],
  commitments: {
    label: 'Compromissos',
    heading: 'Três regras que valem para qualquer projeto.',
  },
};
