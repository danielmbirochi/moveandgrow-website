import type { Point } from './types';

/** The three commitments (spec, Home). `short` is used where space is tight. */
export const commitments: (Point & { short: string })[] = [
  {
    title: 'Começamos pelo que já existe.',
    text: 'Mapeamos o que você usa hoje antes de propor qualquer coisa. Nada é descartado para caber em um pacote.',
    short: 'Mapeamos o que você usa hoje antes de propor qualquer coisa.',
  },
  {
    title: 'O que construímos é seu.',
    text: 'Código, contas, automações e dados ficam no seu nome. Se a parceria terminar, tudo continua funcionando.',
    short: 'Código, contas, automações e dados ficam no seu nome.',
  },
  {
    title: 'Não disputamos os clientes dos nossos parceiros.',
    text: 'Nunca abordamos os clientes de uma agência parceira. Isso está no contrato.',
    short: 'Nunca abordamos os clientes de uma agência parceira. Isso está no contrato.',
  },
];
