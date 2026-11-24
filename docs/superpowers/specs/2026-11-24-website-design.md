# Move and Grow website: design

Date: 2026-11-24. Status: approved by the founder in conversation.

## Intent

Move and Grow ("M.G." for short; working name, may change) is a new Brazilian firm that sells marketing and marketing technology. Its positioning: **the technology partner that evolves the marketing operation a client already has.** It leads with digital agencies (5 to 25 people) and keeps one door open for mid-size companies whose marketing is immature.

The website is the firm's first public proof. "Sites built for search and conversion" is one of the services sold, so the site itself has to be fast, well structured for search, and clear.

## Goals

- A static marketing site in Brazilian Portuguese with six pages: Home, Para agências, Para empresas, Mapa da Operação, Sobre, Contato.
- The whole visual identity (colours, typefaces, corners, label style, logo, company name) is defined in theme files and selected in one config file. Switching themes requires changing one line.
- Lighthouse scores of 95+ for performance, accessibility, best practices and SEO on every page (mobile profile).
- Copy lives in content files, separate from layout, so the founders can edit text without touching components.
- Ready for an English version later without restructuring.

## Non-goals (first version)

- No English pages yet.
- No CMS, blog, client area, analytics or cookie banner.
- No deployment or domain setup. The site is built and run locally.
- No real form backend. The contact form opens the visitor's email client or WhatsApp with the brief pre-filled.
- No final logo. A text wordmark plus a simple geometric mark is used.

## Anti-goals

- Invented proof: no client logos, testimonials, case numbers, team photos of people who do not exist, or "the largest" claims. The firm has no clients yet.
- Naming employers or giving specific figures in the engineering founder's bio beyond the approved text below.
- Published prices.
- Any statement about how many clients the firm takes.
- Copy that uses the avoided vocabulary listed under Voice.
- Components that hard-code a colour, font or radius instead of reading theme variables.

## Approaches considered

1. **Astro + Tailwind, static output (chosen).** Ships no JavaScript by default, strong for search and speed, built-in i18n routing for the later English version, content collections for copy.
2. **Next.js.** More than a marketing site needs; heavier output for no benefit here.
3. **A site builder (Framer, Webflow, Lovable).** Fastest to a first page, but undercuts the firm's engineering claim and cannot do config-file theming.

The founder agreed with option 1.

## Decided

- Stack: Astro (latest stable), Tailwind CSS, TypeScript, npm. Static output.
- Repo: `/Users/danielmiranda/Documents/mg/website`.
- Language: `pt-BR`, with Astro i18n configured so `en` can be added (default locale unprefixed).
- Fonts are self-hosted (for example via Fontsource), not loaded from Google at runtime.
- Theme system as described next.

## Theme system

- `visual-identity.config.ts` at the repo root is the single switch. It exports the active theme (default `oficina`) and the brand (name `Move and Grow`, short name `M.G.`).
- `src/themes/oficina.ts` and `src/themes/sistema.ts` each export a typed `Theme` object. `src/themes/types.ts` defines the type.
- A theme holds: colour roles, font families and weights, corner radii, and a few style switches for the structural differences between the two directions.
- At build time the active theme is turned into CSS custom properties on `:root`, and Tailwind is configured to read those variables. Components use only the semantic names (for example `bg-surface`, `text-ink`, `rounded-card`).
- Only the fonts of the active theme are bundled.
- Changing `activeTheme` from `oficina` to `sistema` and rebuilding must restyle the whole site with no other edit.

### Theme A, "Oficina" (default)

Feel: a workshop. Precise, plain, built by engineers.

| Role | Value |
| --- | --- |
| Ground (page background) | `#FFFFFF` |
| Ink (text, rules, dark sections) | `#0E1B2A` |
| Surface (quiet panels) | `#EEF1F4` |
| Muted text | `#44505E` |
| Body text secondary | `#2B3846` |
| Accent (button fill, marks) | `#FF5A1F`, always with Ink text on it |
| Accent as text on white | `#B93A0A` |
| Accent as text on Ink | `#FF8A5C` |
| Border, subtle | `#C9D0D8` |

- Headings: Space Grotesk 700, tight tracking (about -0.03em on large sizes).
- Body: Inter 400 and 600.
- Labels and numbers: JetBrains Mono 500, uppercase with 0.08em tracking for labels.
- Corners: 2px everywhere.
- Style switches: labels are mono uppercase text (not pills); numbered items show `01`, `02`, `03` in mono above a 3px Ink top rule; cards are outlined with a 1.5px Ink border, not filled.

### Theme B, "Sistema"

Feel: a tech platform. Dark, rounded.

| Role | Value |
| --- | --- |
| Ground | `#12102E` |
| Ink (text) | `#F3F2FF` |
| Surface | `#1C1946` |
| Surface raised / pill background | `#2A2566` |
| Muted text | `#B9B7D9` |
| Body text secondary | `#D5D3EE` |
| Accent (button fill) | `#6C4DFF`, with white text |
| Highlight (labels, numbers) | `#7CF2C4` |
| Border | `#8F8CC4` |
| Inverted section | background `#F3F2FF`, text `#12102E` |

- Headings: Manrope 800. Body: Inter 400 and 600. No mono face.
- Corners: 12px buttons, 16 to 20px cards, full radius pills.
- Style switches: labels are pills; numbered items show the number in a circle; cards are filled with Surface, no border.

Both themes must keep text contrast at 4.5:1 or better (3:1 for text 24px and larger).

## Pages and copy

All copy below is approved Portuguese text and should be used as written. Where a section needs a line that is not given here, the builder writes it in the same voice and lists every such addition in the final report.

Global: header with wordmark, links (Para agências, Para empresas, Mapa da Operação, Sobre), and a button "Mapear minha operação" leading to Contato. Footer with wordmark, the same links, and contact placeholders.

### Home

- Label: Marketing + engenharia
- Headline: Evoluímos a operação de marketing que você já tem.
- Supporting line: Marketing e engenharia no mesmo time. Para agências que querem ganhar eficiência e para empresas que querem um marketing que funcione.
- Two doors directly under the headline: "Sou agência" (to Para agências) and "Sou empresa" (to Para empresas).
- The three commitments, numbered:
  1. **Começamos pelo que já existe.** Mapeamos o que você usa hoje antes de propor qualquer coisa. Nada é descartado para caber em um pacote.
  2. **O que construímos é seu.** Código, contas, automações e dados ficam no seu nome. Se a parceria terminar, tudo continua funcionando.
  3. **Não disputamos os clientes dos nossos parceiros.** Nunca abordamos os clientes de uma agência parceira. Isso está no contrato.
- Two audience cards:
  - Agencies: "O time de tecnologia que a sua agência ainda não tem." Link to Para agências.
  - Companies: "Sua empresa já investe em marketing. Falta saber o que está funcionando." Link to Para empresas.
- The four offers (see Services), short form.
- Mapa da Operação teaser: "Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente." Button: Mapear minha operação.

### Para agências

- Headline: Menos trabalho manual na operação. Mais tecnologia na entrega.
- Supporting line: Automatizamos os processos internos da sua agência e construímos o que os seus clientes pedem e o seu time não tem como fazer. Sem nunca falar com eles por fora.
- Two ways to work with us:
  - **Para dentro da agência.** Relatórios, entrada de novos clientes, aprovações, repasse de leads: o que hoje depende de planilha e de alguém lembrar passa a rodar sozinho.
  - **Para os clientes da agência.** Sites rápidos, funis, integrações de CRM e agentes de IA, entregues pelo seu time e construídos pelo nosso.
- Offers for agencies (see Services, agency column).
- A prominent statement, on its own band: **Não atendemos os seus clientes por fora. Isso está no contrato.**
- Call to action: Mapear minha operação.

### Para empresas

- Headline: Sua empresa já investe em marketing. Falta saber o que está funcionando.
- Supporting line: Conectamos site, anúncios, CRM e atendimento em um funil só, medido do primeiro clique até a venda.
- Section opened by "Você não precisa começar do zero. Precisa que o que já existe funcione.": the diagnostic. **Diagnóstico antes de proposta.** Primeiro entendemos o que você já tem e onde o dinheiro está escapando. Links to Mapa da Operação.
- Section opened by "O marketing que você já faz, funcionando como um sistema.": **Um funil só.** Site, anúncios, CRM e WhatsApp conectados, para nenhum contato se perder no caminho.
- **Números que o dono entende.** Quanto entrou, quanto custou, quanto vendeu.
- **Tudo fica no seu nome.** Contas, dados e automações são da sua empresa.
- Offers for companies (see Services, company column).
- Call to action: Mapear minha operação.
- Technology is never the headline on this page; it appears in supporting lines only.

### Services (used on Home and both audience pages)

| Offer | What it covers | For agencies | For companies |
| --- | --- | --- | --- |
| Operação automatizada | Automação do trabalho da própria agência: relatórios, entrada de clientes, aprovações, repasse de leads e agentes de IA para tarefas repetitivas | Main offer | Not shown |
| Motor de vendas | Funil e automação de vendas: captação de leads, qualificação, CRM, acompanhamento e WhatsApp | Construído para os clientes da agência e entregue pelo time dela | Sold directly |
| Site que vende | Sites e landing pages rápidos, feitos para serem encontrados na busca e para converter | Construído para os clientes da agência e entregue pelo time dela | Sold directly |
| Mídia e remarketing | Google, Meta e outras plataformas de anúncios, com remarketing | Só rastreamento, mensuração e automação; a agência continua gerenciando as campanhas | Gestão completa das campanhas |

The firm manages ad campaigns for its own clients only, never for an agency's clients.

### Mapa da Operação

- What it is: the paid, fixed-scope first step of every engagement.
- Description: Em duas semanas, você recebe o mapa da sua operação: o que funciona, onde está o desperdício e o que fazer primeiro. O mapa é seu, com ou sem a gente.
- Facts to present (as a short table or list):
  - Duração: duas semanas.
  - O que analisamos: ferramentas, contas, processos e números que você já tem.
  - O que você recebe: um mapa por escrito com o que funciona, onde tempo ou dinheiro estão escapando e de três a cinco prioridades ordenadas por retorno, cada uma com estimativa de esforço.
  - De quem é: seu. Você pode executar com a gente, com o seu time ou com outro fornecedor.
  - Investimento: valor fixo, informado na primeira conversa e descontado do primeiro projeto se você continuar com a gente.
- Honest line, shown next to it: O mapa não é promessa de vendas. É a base para decidir onde investir.
- No price on the page.
- Call to action: Mapear minha operação.

### Sobre

- Idea: the two disciplines in one team, with no hand-off between a marketing agency and a software vendor. The founders lead a team that works hands-on, side by side with the client, and are accountable for the result.
- Founder, engineering. Use this text exactly:
  > Daniel Miranda Birochi. Há 10 anos constrói sistemas financeiros de missão crítica, onde um erro custa caro e parar não é opção. Projeta agentes de IA desde 2024 e já liderou arquitetura de agentes que operam em produção, todos os dias. Passou por grandes empresas de tecnologia, como a Binance. Começou a carreira ao lado do cliente, como engenheiro alocado na operação, e leva essa prática até hoje: entender o negócio antes de desenhar a solução. Também atua como mentor de startups no ecossistema brasileiro.
- Founder, marketing. Not yet written. Show clearly marked placeholders: `[Nome]`, and "15 anos de marketing digital, com passagem pela TikTok. [Cargo e resultados a confirmar.]"
- Photos: neutral placeholders with initials. No stock photos.
- The three commitments again, short.

### Contato

- Headline in the same voice, inviting the visitor to map their operation.
- A short brief form: nome, empresa, "Sou agência / Sou empresa" choice, e-mail, WhatsApp, and "O que você gostaria de melhorar?".
- On submit, with no backend: build a pre-filled message and open WhatsApp or the email client. Works without JavaScript as a `mailto:` fallback.
- Contact details are placeholders kept in one config location: `[EMAIL]`, `[WHATSAPP]`.

## Voice

Short sentences, concrete nouns, like a senior colleague explaining across a table.

| Use | Avoid |
| --- | --- |
| evoluir, melhorar, organizar, conectar | escalar, acelerar, alavancar, decolar |
| o que você já tem | do zero (except in the approved headline), transformação |
| automação, integração, agente de IA, each with an example | IA que trabalha 24 horas, superpoderes, AI First |
| quanto entrou, quanto custou, quanto vendeu | ROI previsível, máquina de crescimento |
| é seu, fica no seu nome | com a sua marca, nos bastidores |
| what we don't do, said plainly | de ponta a ponta, full service, a maior |

Headlines state a result or a situation the reader recognises; technology comes in the line below. English terms get a Portuguese explanation on first use, or are dropped.

## Search and quality basics

- Unique `<title>` and meta description per page, canonical URLs, Open Graph and Twitter tags, a default share image generated from the theme.
- `sitemap.xml`, `robots.txt`, `lang="pt-BR"`.
- Structured data: `Organization` on Home, `Service` entries for the offers, `BreadcrumbList` on inner pages.
- Semantic HTML, one `h1` per page, skip link, visible focus states, real links and buttons, form labels.
- Responsive from 360px wide upward.
- The site URL is a config value (`https://example.com` placeholder) until the domain exists.

## Left to the builder

- Component breakdown, file layout inside `src/`, Tailwind version and how variables are wired.
- Section layouts and spacing, following the two identity boards in spirit: board A is white with navy text, one orange accent, square corners, mono labels and numbered rules.
- Exact wording of small connective copy not given above (listed in the final report).
- How the wordmark and placeholder mark are drawn (board A used a 28px Ink square with a 12px accent square in its bottom-right corner, next to the name in the heading face).
- Tests or checks appropriate to a static site: a build, a link check, a theme-switch check, and Lighthouse runs.
