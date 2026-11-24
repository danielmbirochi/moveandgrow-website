import { describe, it, expect } from 'vitest';
import { buildBriefText, buildMailto, buildWhatsappUrl, type Brief } from '../src/lib/contact';

const brief: Brief = {
  nome: 'Ana Souza',
  empresa: 'Agência Exemplo',
  perfil: 'agencia',
  email: 'ana@exemplo.com.br',
  whatsapp: '(11) 98888-7777',
  mensagem: 'Relatórios manuais toda segunda-feira.',
};

const bodyOf = (url: string) => {
  const query = url.slice(url.indexOf('?') + 1);
  return new URLSearchParams(query.replace(/\+/g, '%2B'));
};

describe('contact', () => {
  it('returns null while the email is a placeholder', () => {
    expect(buildMailto(brief, '[EMAIL]')).toBeNull();
  });

  it('returns null while the WhatsApp number is a placeholder', () => {
    expect(buildWhatsappUrl(brief, '[WHATSAPP]')).toBeNull();
  });

  it('builds a mailto link carrying every field', () => {
    const url = buildMailto(brief, 'a@b.co');
    expect(url).not.toBeNull();
    expect(url!.startsWith('mailto:a@b.co?subject=')).toBe(true);
    const body = bodyOf(url!).get('body')!;
    for (const value of [brief.nome, brief.empresa, 'Sou agência', brief.email, brief.whatsapp, brief.mensagem]) {
      expect(body).toContain(value);
    }
  });

  it('builds a wa.me link from a formatted number', () => {
    const url = buildWhatsappUrl(brief, '+55 (11) 90000-0000');
    expect(url!.startsWith('https://wa.me/5511900000000?text=')).toBe(true);
  });

  it('survives special characters in an encode/decode round trip', () => {
    const tricky: Brief = { ...brief, mensagem: 'Preço & prazo #1\nsegunda linha: ação' };
    const mail = buildMailto(tricky, 'a@b.co')!;
    expect(bodyOf(mail).get('body')).toContain(tricky.mensagem);
    const wa = buildWhatsappUrl(tricky, '+55 11 90000-0000')!;
    expect(new URL(wa).searchParams.get('text')).toContain(tricky.mensagem);
    expect(buildBriefText(tricky)).toContain(tricky.mensagem);
  });

  it('renders the profile as the visitor chose it', () => {
    expect(buildBriefText(brief)).toContain('Sou agência');
    expect(buildBriefText({ ...brief, perfil: 'empresa' })).toContain('Sou empresa');
  });
});
