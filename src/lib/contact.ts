import { isConfigured } from '../site.config';
import contato from '../content/contato';

export type Brief = {
  nome: string;
  empresa: string;
  perfil: 'agencia' | 'empresa';
  email: string;
  whatsapp: string;
  mensagem: string;
};

const f = contato.form;

/** The pre-filled message, in Portuguese, one field per line. */
export function buildBriefText(brief: Brief): string {
  const perfil = brief.perfil === 'agencia' ? f.perfil.agencia : f.perfil.empresa;
  return [
    f.briefIntro,
    '',
    `${f.nome}: ${brief.nome.trim()}`,
    `${f.empresa}: ${brief.empresa.trim()}`,
    `${f.perfilLabel}: ${perfil}`,
    `${f.email}: ${brief.email.trim()}`,
    `${f.whatsapp}: ${brief.whatsapp.trim()}`,
    '',
    f.mensagem,
    brief.mensagem.trim(),
  ].join('\n');
}

/** mailto: URL with subject and body, or null while `to` is a placeholder. */
export function buildMailto(brief: Brief, to: string): string | null {
  if (!isConfigured(to)) return null;
  const subject = `${f.subject}: ${brief.empresa.trim() || brief.nome.trim()}`;
  return (
    `mailto:${to.trim()}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(buildBriefText(brief))}`
  );
}

/** wa.me URL with the brief as text, or null while `number` is a placeholder. */
export function buildWhatsappUrl(brief: Brief, number: string): string | null {
  if (!isConfigured(number)) return null;
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildBriefText(brief))}`;
}
