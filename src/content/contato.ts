import type { Seo } from './types';

export default {
  seo: {
    title: 'Contato: mapeie a sua operação',
    description:
      'Conte como funciona o seu marketing hoje e o que você gostaria de melhorar. A conversa começa pelo Mapa da Operação.',
  } satisfies Seo,
  breadcrumb: 'Contato',
  hero: {
    label: 'Contato',
    headline: 'Vamos mapear a sua operação.',
    lead: 'Conte o que você usa hoje e o que gostaria de melhorar. A primeira conversa começa por aí.',
  },
  form: {
    nome: 'Nome',
    empresa: 'Empresa',
    perfilLegend: 'Você é',
    perfilLabel: 'Perfil',
    perfil: { agencia: 'Sou agência', empresa: 'Sou empresa' },
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    whatsappHint: 'Com DDD.',
    mensagem: 'O que você gostaria de melhorar?',
    sendEmail: 'Enviar por e-mail',
    sendWhatsapp: 'Enviar por WhatsApp',
    howItWorks:
      'Ao enviar, abrimos o seu e-mail ou o WhatsApp com a mensagem pronta. Nada fica guardado neste site.',
    notConfigured: 'Contato em configuração.',
    notConfiguredDetail:
      'O e-mail e o WhatsApp ainda estão sendo configurados. O formulário fica disponível assim que estiverem prontos.',
    subject: 'Mapa da Operação',
    briefIntro: 'Olá! Quero mapear a minha operação.',
  },
};
