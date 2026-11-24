# Mapa do conteúdo

Where each piece of visible text lives. Left column: how the person is likely to describe it, in Portuguese. Field paths are relative to the file's default export unless the row names an export (`offers`, `commitments`, `site`). Array items are numbered from 0.

Every page also has `seo.title` (the name in the browser tab and on Google) and `seo.description` (the line under it on Google). Inner pages have `breadcrumb`, which only appears in Google's results, not on the page.

## Home (`/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta pequena acima do título | `src/content/home.ts` | `hero.label` |
| o título grande no topo da página | `src/content/home.ts` | `hero.headline` (texto aprovado) |
| o parágrafo abaixo do título | `src/content/home.ts` | `hero.lead` |
| os botões "Sou agência" / "Sou empresa" | `src/content/home.ts` | `hero.doors[0].label`, `hero.doors[1].label` |
| o título da seção dos compromissos | `src/content/home.ts` | `commitments.label`, `commitments.heading` |
| os três compromissos | `src/content/commitments.ts` | see "Em todas as páginas" |
| a seção "Para quem" e os dois cartões | `src/content/home.ts` | `audiences.label`, `audiences.heading`, `audiences.cards[i].label` / `.text` / `.link` |
| o título acima da tabela de ofertas | `src/content/home.ts` | `offers.label`, `offers.heading` |
| o bloco do Mapa da Operação no fim da página | `src/content/home.ts` | `mapa.label`, `mapa.heading`, `mapa.text`, `mapa.more` (link "Como funciona o mapa") |

## Para agências (`/para-agencias/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta pequena acima do título | `src/content/agencias.ts` | `hero.label` |
| o título grande no topo da página | `src/content/agencias.ts` | `hero.headline` (texto aprovado) |
| o parágrafo abaixo do título | `src/content/agencias.ts` | `hero.lead` |
| "Duas formas de trabalhar com a gente" e os dois itens | `src/content/agencias.ts` | `ways.label`, `ways.heading`, `ways.items[i].title` / `.text` |
| o título acima da tabela de ofertas | `src/content/agencias.ts` | `offers.label`, `offers.heading` |
| a frase grande na faixa escura ("Não atendemos os seus clientes por fora") | `src/content/agencias.ts` | `statement.label`, `statement.text` |
| o chamado final no rodapé da página | `src/content/agencias.ts` | `cta.heading`, `cta.text` (also shown at the bottom of Sobre) |

## Para empresas (`/para-empresas/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta pequena acima do título | `src/content/empresas.ts` | `hero.label` |
| o título grande no topo da página | `src/content/empresas.ts` | `hero.headline` (texto aprovado) |
| o parágrafo abaixo do título | `src/content/empresas.ts` | `hero.lead` |
| a seção do diagnóstico ("Você não precisa começar do zero...") | `src/content/empresas.ts` | `diagnostic.label`, `diagnostic.heading` (texto aprovado), `diagnostic.point.title` / `.text`, `diagnostic.link` |
| "Como funciona" e os três itens | `src/content/empresas.ts` | `system.label`, `system.heading`, `system.items[i].title` / `.text` |
| o título acima da tabela de ofertas | `src/content/empresas.ts` | `offers.label`, `offers.heading` |
| o chamado final no rodapé da página | `src/content/empresas.ts` | `cta.heading`, `cta.text` |

`diagnostic.heading` holds the only "do zero" the voice rules allow (see `voz.md`).

## Mapa da Operação (`/mapa-da-operacao/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta, o título e a frase em negrito no topo | `src/content/mapa.ts` | `hero.label`, `hero.headline`, `hero.intro` |
| o parágrafo abaixo | `src/content/mapa.ts` | `hero.lead` |
| a lista "O que está incluído" (Duração, Investimento...) | `src/content/mapa.ts` | `facts.label`, `facts.heading`, `facts.items[i].term` / `.detail` |
| o quadro "Sem promessa" ao lado | `src/content/mapa.ts` | `honest.label`, `honest.text` |
| o chamado final | `src/content/mapa.ts` | `cta.heading` |

## Sobre (`/sobre/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta e o título no topo | `src/content/sobre.ts` | `hero.label`, `hero.headline` |
| os dois parágrafos abaixo do título | `src/content/sobre.ts` | `hero.paragraphs[0]`, `hero.paragraphs[1]` |
| o título da seção dos sócios | `src/content/sobre.ts` | `foundersSection.label`, `foundersSection.heading` |
| o selo "Texto provisório" no cartão do sócio | `src/content/sobre.ts` | `foundersSection.placeholderNote` |
| o cartão do sócio de engenharia (nome, área, iniciais, bio) | `src/content/sobre.ts` | `founders[0].name` / `.role` / `.initials` / `.bio` (bio é texto aprovado) |
| o cartão do sócio de marketing | `src/content/sobre.ts` | `founders[1].name` / `.role` / `.initials` / `.bio` / `.placeholder` |
| o título da seção dos compromissos | `src/content/sobre.ts` | `commitments.label`, `commitments.heading` |
| os compromissos (versão curta) | `src/content/commitments.ts` | `commitments[i].title`, `commitments[i].short` |
| o chamado final | `src/content/agencias.ts` | `cta.heading`, `cta.text` (shared with Para agências) |

## Contato (`/contato/`)

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta, o título e o parágrafo no topo | `src/content/contato.ts` | `hero.label`, `hero.headline`, `hero.lead` |
| os nomes dos campos do formulário | `src/content/contato.ts` | `form.nome`, `form.empresa`, `form.email`, `form.whatsapp`, `form.mensagem` (also label each line of the message that is sent) |
| a pergunta "Você é" e as opções | `src/content/contato.ts` | `form.perfilLegend`, `form.perfil.agencia`, `form.perfil.empresa` (the chosen option also goes into the message that is sent) |
| a dica abaixo do WhatsApp ("Com DDD.") | `src/content/contato.ts` | `form.whatsappHint` |
| os botões de envio | `src/content/contato.ts` | `form.sendEmail`, `form.sendWhatsapp` |
| a explicação de como o envio funciona | `src/content/contato.ts` | `form.howItWorks` |
| o aviso enquanto o contato não está pronto | `src/content/contato.ts` | `form.notConfigured`, `form.notConfiguredDetail` |
| o assunto, a primeira linha e o rótulo "Perfil" da mensagem que chega por e-mail ou WhatsApp | `src/content/contato.ts` | `form.subject`, `form.briefIntro`, `form.perfilLabel` |

## Página não encontrada (erro 404)

Shown for any address that does not exist on the site.

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| a etiqueta "Erro 404", o título e o parágrafo | `src/content/not-found.ts` | `hero.label`, `hero.headline`, `hero.lead` |
| os dois links ("Voltar para o início", "Ir para o contato") | `src/content/not-found.ts` | `links.home`, `links.contact` |

## Em todas as páginas

| O que a pessoa vê | Arquivo | Campo |
| --- | --- | --- |
| o botão laranja "Mapear minha operação" (topo e chamados finais) | `src/content/shell.ts` | `cta` |
| os links do menu (also the "Páginas" list in the footer) | `src/site.config.ts` | `site.nav[i].label` (leave `href` alone) |
| o botão do menu no celular | `src/content/shell.ts` | `menu`, `menuClose` |
| a frase do rodapé | `src/content/shell.ts` | `footer.tagline` |
| os títulos das colunas do rodapé ("Páginas", "Contato") | `src/content/shell.ts` | `footer.pages`, `footer.contact` |
| o link "Contato" na lista de páginas do rodapé | `src/content/shell.ts` | `footer.contactPage` |
| as palavras "E-mail:" e "WhatsApp:" antes dos contatos no rodapé | `src/content/shell.ts` | `footer.email`, `footer.whatsapp` |
| o aviso "Contato em configuração." no rodapé | `src/content/shell.ts` | `footer.notConfigured` |
| o e-mail e o WhatsApp (rodapé e formulário) | `src/site.config.ts` | `site.email`, `site.whatsapp` |
| as quatro ofertas da tabela (Home, Para agências, Para empresas) | `src/content/offers.ts` | `offers[i].name`, `.covers`, `.agencies`, `.companies` (`null` = "Não oferecido"; leave `id` alone) |
| os títulos das colunas e a nota abaixo da tabela | `src/content/offers.ts` | `offerTableCopy.offer`, `.covers`, `.agencies`, `.companies`, `.notOffered`, `.campaignsNote` |
| os três compromissos (Home completa, Sobre curta) | `src/content/commitments.ts` | `commitments[i].title`, `.text`, `.short` |

Text read only by screen readers: `shell.skipLink`, `shell.homeLink`, `shell.mainNav`, `offerTableCopy.caption`.

`shell.breadcrumbRoot` ("Início") is not on the page at all: like `breadcrumb`, it only appears in Google's results.

`site.url` in `src/site.config.ts` is the site's live address, not copy. The sitemap, `robots.txt` and the page addresses given to Google and to shared links are built from it, so it is out of scope: changing it is a maintainer's decision.

The brand name is not in any of these files. It lives in `visual-identity.config.ts` and is out of scope for copy changes.

## Texto repetido

Some text appears in more than one place. These are known examples, not a complete list: before editing, search `src/content/` and `src/site.config.ts` for the exact old text, and ask the person about every other place it appears.

- "Em duas semanas, você recebe o mapa da sua operação..." in `home.ts` (`mapa.text`), `mapa.ts` (`hero.lead`), `agencias.ts` and `empresas.ts` (`cta.text`).
- The Para empresas headline (`hero.headline` in `empresas.ts`, texto aprovado) is also the Home card `audiences.cards[1].text` in `home.ts`.
- "Três regras que valem para qualquer projeto." is `commitments.heading` in `home.ts` and in `sobre.ts`.
- "Marketing e engenharia no mesmo time." is `footer.tagline` in `shell.ts` and `hero.headline` in `sobre.ts`; it also opens `hero.lead` and `seo.description` in `home.ts`.
- "Comece pelo Mapa da Operação." is `cta.heading` in `agencias.ts` and in `empresas.ts`.
- "Vamos mapear a sua operação." is `cta.heading` in `mapa.ts` and `hero.headline` in `contato.ts`.

## Texto aprovado

Protected by `tests/content.test.ts`. Changing one means changing the copy and its test expectation together, and the PR body starts with "**Texto aprovado alterado**".

- Home `hero.headline` in `src/content/home.ts` (pinned in `tests/content.test.ts`)
- Para agências `hero.headline` in `src/content/agencias.ts` (pinned in `tests/content.test.ts`)
- Para empresas `hero.headline` in `src/content/empresas.ts` (pinned in `tests/content.test.ts`)
- The engineering bio, `founders[0].bio` in `src/content/sobre.ts` (pinned in `tests/content.test.ts` as `ENGINEERING_BIO`)
- Para empresas `diagnostic.heading` in `src/content/empresas.ts`: not pinned word for word, but it holds the site's only "do zero" and the test counts it. If a change removes the phrase, the expected count in `tests/content.test.ts` goes from 1 to 0 in the same change.

## Ainda por preencher

A bracketed value such as `[EMAIL]` means not filled yet. This list was true when it was written and goes stale after the first fill, so check the file itself rather than trusting it. Placeholders waiting for real values:

- `site.email` in `src/site.config.ts`: `[EMAIL]`
- `site.whatsapp` in `src/site.config.ts`: `[WHATSAPP]`
- In `src/content/sobre.ts`, the marketing founder (`founders[1]`): `name` (`[Nome]`), `bio` (contains `[Cargo e resultados a confirmar.]`), `initials` (`[N]`), and the `placeholder: true` flag. Remove the flag once name and bio are real; it is what shows the "Texto provisório" badge.

With neither email nor WhatsApp filled, the footer shows "Contato em configuração." and the contact form stays disabled; filling either one turns them on for that channel.

The content files are the source of truth. If this map disagrees with them, follow the files.
