---
name: atualizar-site
description: Changes the website's text and contact details (page copy, headlines, bios, SEO titles, e-mail, WhatsApp, site URL, menu labels) for a non-technical person, always through a pull request a maintainer reviews. Use for requests like "muda o texto da home", "troca o título", "atualiza o WhatsApp", "corrige a bio", "preenche o e-mail", "update the copy", "change the headline". Not for layout, colours, fonts, images, the brand name or new pages and sections.
---

# Atualizar o site

You are helping someone change the words on a small static Astro site written in Brazilian Portuguese. Every change ends as a pull request on a branch named `conteudo/<short-slug>`; a maintainer reviews it before anything goes live, so your job is a clean, checked, well-described proposal, not a published change.

Two reference files sit next to this one. Read them when the steps below say so, not up front:

- `references/mapa-do-conteudo.md`: from what the person sees on the page to the file and field that holds it, plus the approved texts and the placeholders still to fill.
- `references/voz.md`: how the copy sounds, the rules the tests enforce, and the Portuguese sentences to explain each rule to the person.

## Who you are talking to

The person is not technical. Speak Brazilian Portuguese, in short and friendly sentences. Do not use words like branch, commit, teste, arquivo, build or terminal unless they use them first; say "a sua alteração", "a verificação automática", "o pedido de revisão". Never paste command output; say what it means for them ("a verificação passou", "o texto tem uma palavra que o site evita"). Keep them informed in one line per stage so they know what is happening, without narrating every command.

## The six steps

### 1. Prepare

The same commands work on a local clone and on Claude Code on the web, so run them rather than guessing where you are:

1. `git status --porcelain`. If it lists anything, stop and change nothing. Those are a maintainer's unfinished changes, and moving or mixing them into a content pull request could lose their work. Tell the person: "Há um trabalho em andamento neste computador que ainda não foi concluído. Uma pessoa da manutenção precisa olhar antes de eu mexer no site." A fresh web checkout is always clean, so this only stops on a local clone.
2. If there is no `node_modules` folder, run `npm install`.
3. `git fetch origin`, then `git switch -c conteudo/<slug> origin/main`. The slug is a few lowercase ASCII words joined by hyphens that name the change (for example something like `whatsapp-rodape`). Branching from the latest `origin/main` keeps the pull request limited to this one change. If the name is taken, pick another slug.

If fetching fails (no connection, no access), say you could not reach the site's repository right now and stop; editing an old copy would produce a pull request that does not apply.

### 2. Understand

Read `references/mapa-do-conteudo.md` to find where the text lives, then read the content file itself; the file is the source of truth if the two disagree. If you cannot tell which piece of text they mean, ask, quoting the candidates as they appear on the page.

Show the change as "Antes:" and "Depois:", quoting the exact text. If the person dictated the exact new wording, that is their decision already: show it and go on without asking. If the wording was left open ("deixa mais curto", "melhora esse parágrafo"), propose a version following `references/voz.md` and wait for a yes before editing. Check your proposal against `references/voz.md` before showing it, so the person does not approve something the checks will reject.

When their own wording breaks a rule in `references/voz.md` (an avoided term, a price, the brand name, a second "do zero", an SEO description outside 70 to 160 characters), say so before editing with that file's sentence for the rule, offer a rewording, and only edit once they accept one. Do not quietly rewrite what they dictated.

### 3. Edit

You may edit only `src/content/*.ts` and `src/site.config.ts`. Two exceptions follow from the steps below: `tests/content.test.ts` for an approved text (see "Texto aprovado"), and the images in `src/assets/og/` that `npm run og` regenerates. Change only the string values; keep keys, quotes, `href`s and `id`s as they are.

Anything else is out of scope: layout, colours, fonts, spacing, images or logo, the brand name (`visual-identity.config.ts`), the theme, a new page, section, button or field that does not exist yet, or anything in `src/components/`, `src/pages/`, `src/themes/` or `scripts/`. Tell the person plainly that this needs someone from the maintenance team, and offer to write the request up as an issue: a short title and a description in Portuguese of what they want and where. If they accept, show the text so they can send it, or create it with `gh issue create` if they prefer and `gh` is available. A test of scope: if the words they want would need a new place on the page to appear, it is out of scope, even though it sounds like a text change.

Some cases need a judgement call:

- Text repeated across pages (the map lists them): ask whether to change it everywhere.
- WhatsApp numbers become `wa.me` links, which only work with the country code. If the person gives a Brazilian number without it, write it as `+55 11 ...` and mention that in the "Depois".
- Filling the marketing founder's card: remove `placeholder: true` only once the name and bio are both real; the map explains.

### 4. Check

Run `npm run verify`. If the Home headline changed, also run `npm run og`, which redraws the image shown when the site is shared, and include `src/assets/og/` in the commit. (The share image also carries the brand name, but changing the brand is a maintainer's job.)

If the check fails, read the output and work out the cause:

- A voice rule (avoided term, price, brand name, "do zero" count, SEO length or duplicate title): explain it to the person with the sentence from `references/voz.md`, offer a rewording, and run the check again after they choose. Never edit the avoided-terms list, the price rule or the brand-name rule in `tests/content.test.ts`, and never loosen any test to let a wording through. Those rules are the site's agreed voice; the test is how the maintainers enforce it.
- An approved text no longer matching: either you changed it without following "Texto aprovado" below, or you touched it by accident. Fix your edit.
- A type or build error: almost always your own edit (an unescaped quote, a missing comma). Fix it quietly; the person does not need to hear about it.
- Something your change cannot explain: compare the failure with `git diff`. If it points at code or text you did not touch, the site was already failing; stop, tell the person the site has a problem unrelated to their request that a maintainer must fix first, and offer the issue write-up. Do not repair code outside your files.

### Texto aprovado

Some copy was approved word for word, and `tests/content.test.ts` pins it so nobody changes it by accident: the three page headlines (`hero.headline` in `home.ts`, `agencias.ts` and `empresas.ts`), the engineering founder's bio (`founders[0].bio` in `sobre.ts`, pinned as `ENGINEERING_BIO`), and the Para empresas diagnostic heading (`diagnostic.heading` in `empresas.ts`), which holds the site's only "do zero" and is counted by the test.

When the person asks to change one of these, the request itself is the reason to change it; the maintainer's review is the sign-off. Before editing, tell them: "Esse texto foi aprovado palavra por palavra. Posso propor a mudança, e ela vai marcada para a revisão olhar com atenção." Then, in the same change, update the copy and its pinned string in `tests/content.test.ts` (for the diagnostic heading, update the expected "do zero" count if the phrase is removed or kept), and start the pull request body with `**Texto aprovado alterado**` as its first line. Change nothing else in that test file.

### 5. Show

You need to know here whether the person can open a link on this machine. On Claude Code on the web the environment variable `CLAUDE_CODE_REMOTE` is `true`; if you cannot tell, ask whether they are using Claude in the browser or on their own computer.

- Local: start `npm run dev` in the background and give the link to the changed page, `http://localhost:4321/<page>/` (for example `/para-empresas/`; the home is `/`). Ask them to look and tell you if anything should change.
- Web: run `npm run build`, start `npm run preview` in the background, then `node scripts/screenshots.mjs http://localhost:4321 <theme> <scratch dir> <changed paths>`, where `<theme>` is the `activeTheme` value in `visual-identity.config.ts`, `<scratch dir>` is a temporary folder outside the repository (so the screenshots do not end up in the commit), and the paths are the changed pages, such as `/` or `/contato/`. Show the images. A change to the footer, menu or contact details appears on every page; one page is enough to show it.
- If the screenshots cannot be taken (usually because Google Chrome is not installed there), say "Não consigo tirar fotos das páginas neste ambiente" and show the "Antes" and "Depois" text again instead. This does not block the hand-off.

Stop the server once they have seen it, unless they are still looking.

### 6. Hand off

1. `git status` to confirm only the intended files changed, then `git add` those paths by name and make one commit with a short Portuguese message.
2. Push with exactly `git push -u origin conteudo/<slug>`. That form is pre-approved; any push naming `main` or forcing is blocked, and would be wrong anyway.
3. Run `gh auth status`. If it succeeds, `gh pr create --base main --head conteudo/<slug>` with a Portuguese title and body. If `gh` is missing or not logged in, read the owner and repository from `git remote get-url origin` and give the person `https://github.com/<owner>/<repo>/compare/conteudo/<slug>?expand=1`, with the title and body ready to paste.

The body says what changed, on which page, the before and after text, and the result of the check (and that `npm run og` ran, if it did). One possible shape, not a template: a one-line summary, a "Página" line, then "Antes" and "Depois" quotes, then "Verificação: passou". Start with `**Texto aprovado alterado**` when the previous section applies.

Finish by giving the link and saying, in your words, that the change is ready for review and that a person from the maintenance team will check it before it appears on the site.

If the person then asks for an adjustment to the same change, edit, check, commit and push again on the same branch with the same push command; the pull request updates by itself. A different change starts again at step 1.

## Never

- Push to `main`, force a push, or merge the pull request; the review is the point of the process.
- Edit components, pages, themes, scripts, configuration other than `src/site.config.ts`, or generated files (`*.generated.css`, `public/favicon.svg`, `public/og-default.png`).
- Loosen a voice rule or any test to make a wording pass.
- Move, stash, commit or discard changes you did not make.
