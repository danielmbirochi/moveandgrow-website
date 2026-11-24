# Copy additions

Every line of site copy that is not taken verbatim from the spec
(`docs/superpowers/specs/2026-11-24-website-design.md`). All of it lives in
`src/content/`. Written to the spec's Voice section: short sentences, concrete
nouns, no avoided vocabulary. Founders: please review and replace freely.

## SEO titles and descriptions

Titles are rendered as `<title> | <brand name>`; the brand name comes from
`visual-identity.config.ts`.

| Page | Title | Description |
| --- | --- | --- |
| Home | Marketing e engenharia para agências e empresas | Marketing e engenharia no mesmo time. Evoluímos a operação de marketing de agências e empresas, começando pelo que você já tem. |
| Para agências | Para agências: tecnologia na operação e na entrega | Automatizamos relatórios, aprovações e repasse de leads da sua agência e construímos sites, funis e integrações para os seus clientes. |
| Para empresas | Para empresas: um marketing que funcione | Site, anúncios, CRM e atendimento conectados em um funil só, medido do primeiro clique até a venda. Começamos pelo diagnóstico. |
| Mapa da Operação | Mapa da Operação: o primeiro passo | Em duas semanas, um mapa por escrito do que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente. |
| Sobre | Sobre: marketing e engenharia no mesmo time | Marketing e engenharia no mesmo time, sem repasse entre agência e fornecedor de software. Conheça os sócios e os nossos compromissos. |
| Contato | Contato: mapeie a sua operação | Conte como funciona o seu marketing hoje e o que você gostaria de melhorar. A conversa começa pelo Mapa da Operação. |

## Site shell (`src/content/shell.ts`)

- Skip link: "Pular para o conteúdo"
- Wordmark link label: "<brand name>, página inicial"
- Navigation label: "Principal"; mobile menu button: "Menu" / "Fechar"
- Breadcrumb root (structured data only): "Início"
- Footer tagline: "Marketing e engenharia no mesmo time." (reused from the approved Home supporting line)
- Footer column headings: "Páginas", "Contato"; footer link: "Contato"
- Footer, while contact details are placeholders: "Contato em configuração."
- Footer, once configured: "E-mail: …", "WhatsApp: …"

## Home (`src/content/home.ts`)

- Commitments section: label "Compromissos", heading "Três regras que valem para qualquer projeto."
- Audience section: label "Para quem", heading "Dois pontos de partida."
- Audience card labels: "Para agências", "Para empresas" (page names)
- Audience card links: "Ver o trabalho com agências", "Ver o trabalho com empresas"
- Offers section: label "Ofertas", heading "O que fazemos."
- Mapa teaser: label "Primeiro passo", heading "Mapa da Operação" (the offer's name), secondary link "Como funciona o mapa"

## Offers table (`src/content/offers.ts`)

The spec's Services table gives some cells as instructions in English; these are the Portuguese cell texts used for them.

- Operação automatizada, agencies column ("Main offer"): "Oferta principal"
- Motor de vendas and Site que vende, companies column ("Sold directly"): "Contratação direta"
- Operação automatizada, companies column ("Not shown"): row omitted on Para empresas; on Home the cell reads "Não oferecido"
- Column headings: "Oferta", "O que cobre", "Para agências", "Para empresas"; table caption (screen readers): "Ofertas"
- Note under the table, from the spec's rule that the firm manages campaigns for its own clients only: "Gerimos campanhas de anúncios apenas para os nossos próprios clientes, nunca para os clientes de uma agência."

## Para agências (`src/content/agencias.ts`)

- Hero label: "Para agências"
- Ways section: label "Como trabalhamos", heading "Duas formas de trabalhar com a gente."
- Offers section: label "Ofertas", heading "O que fazemos para agências."
- Statement band label: "Compromisso"
- Closing call to action heading: "Comece pelo Mapa da Operação." (text below it is the approved Mapa description)

## Para empresas (`src/content/empresas.ts`)

- Hero label: "Para empresas"
- Section labels: "Diagnóstico", "Como funciona"
- Link from the diagnostic: "Conheça o Mapa da Operação"
- Offers section: label "Ofertas", heading "O que fazemos para a sua empresa."
- Closing call to action heading: "Comece pelo Mapa da Operação." (text below it is the approved Mapa description)

## Mapa da Operação (`src/content/mapa.ts`)

- Hero label: "Primeiro passo"; heading "Mapa da Operação" (the offer's name)
- Intro line (from the spec's "the paid, fixed-scope first step of every engagement"): "O primeiro passo de todo projeto, com escopo fechado e valor fixo."
- Facts section: label "Como funciona", heading "O que está incluído."
- Fact values are the spec's facts with the leading word capitalised ("Duas semanas.", "Ferramentas, contas, …", "Seu. Você pode …", "Valor fixo, …"); the "Duração" value is written as a full sentence.
- Label beside the honest line: "Sem promessa"
- Closing call to action heading: "Vamos mapear a sua operação."

## Sobre (`src/content/sobre.ts`)

- Hero label: "Sobre"; heading "Marketing e engenharia no mesmo time." (reused from the approved Home supporting line)
- Idea paragraphs (from the spec's "Idea" note):
  - "Quem contrata uma agência de marketing e um fornecedor de software costuma ficar no meio, repassando pedidos de um para o outro. Aqui as duas disciplinas trabalham no mesmo projeto, sem esse repasse."
  - "Os sócios lideram pessoalmente um time que trabalha lado a lado com o cliente e respondem pelo resultado."
- Founders section: label "Sócios", heading "Quem responde pelo trabalho."
- Founder role labels: "Engenharia", "Marketing"
- Marker on the marketing founder's card: "Texto provisório"
- Placeholder initials: "DB" (engineering founder), "[N]" (marketing founder)
- Commitments section: label "Compromissos", heading "Três regras que valem para qualquer projeto."

## Contato (`src/content/contato.ts`)

- Hero label: "Contato"
- Heading: "Vamos mapear a sua operação."
- Lead: "Conte o que você usa hoje e o que gostaria de melhorar. A primeira conversa começa por aí."
- Field labels: "Nome", "Empresa", "E-mail", "WhatsApp", "O que você gostaria de melhorar?" (from the spec); profile group legend "Você é" with "Sou agência" / "Sou empresa" (from the spec)
- WhatsApp hint: "Com DDD."
- Buttons: "Enviar por e-mail", "Enviar por WhatsApp"
- How it works: "Ao enviar, abrimos o seu e-mail ou o WhatsApp com a mensagem pronta. Nada fica guardado neste site."
- While contact details are placeholders: "Contato em configuração." and "O e-mail e o WhatsApp ainda estão sendo configurados. O formulário fica disponível assim que estiverem prontos."
- Pre-filled message: subject "Mapa da Operação: <empresa>"; first line "Olá! Quero mapear a minha operação."; the profile line is labelled "Perfil"; other lines reuse the field labels

## Theme adjustments

None. Every colour pair in both themes passes the contrast test with the spec's values.

## Share image

`src/assets/og/<theme>.png` (rendered by `scripts/make-og.mjs`) shows the brand name, the Home label "Marketing + engenharia" and the approved Home headline. No new copy.
