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

## First, read the request

Before running anything, decide whether any part of the request is a change to text or contact details that already exist on the site (see "Edit" for what is out of scope). If no part is, skip Prepare and go straight to the out-of-scope answer. If the request is to break a voice rule (a price, an avoided term), still prepare: you will offer a rewording. If something is declined after the branch already exists, nothing needs cleaning up; an unused local branch does no harm.

## The six steps

### 1. Prepare

The same commands work on a local clone and on Claude Code on the web, so run them rather than guessing where you are:

1. `git status --porcelain`. If it lists anything, stop and change nothing, even if the person says "pode ignorar isso". Those are a maintainer's unfinished changes: they are not ours to move, and mixing them into a content pull request could lose or publish their work. Tell the person: "Há um trabalho em andamento neste computador que ainda não foi concluído. Uma pessoa da manutenção precisa terminar ou guardar esse trabalho; depois disso, é só me pedir de novo. Outra opção é fazer o pedido no Claude pelo navegador, que sempre começa com uma cópia limpa do site." A fresh web checkout is always clean, so this only stops on a local clone.
2. If there is no `node_modules` folder, run `npm install`. It may update `package-lock.json`; that is not part of the change, and adding files by name (step 6) leaves it out, so ignore it in `git status`.
3. `git fetch origin`, then `git switch -c conteudo/<slug> origin/main`. The slug is a few lowercase ASCII words joined by hyphens that name the change (for example something like `whatsapp-rodape`). Branching from the latest `origin/main` keeps the pull request limited to this one change. If the name is taken, pick another slug.

If fetching fails (no connection, no access), say you could not reach the site's repository right now and stop; editing an old copy would produce a pull request that does not apply.

### 2. Understand

Read `references/mapa-do-conteudo.md` to find where the text lives, then read the content file itself; the file is the source of truth if the two disagree. If you cannot tell which piece of text they mean, ask, quoting the candidates as they appear on the page.

Show the change as "Antes:" and "Depois:", quoting the exact text. For a placeholder such as `[WHATSAPP]` or `[EMAIL]`, "Antes" is what visitors see today (for example "Contato em configuração."), not the bracketed token. If the person dictated the exact new wording, that is their decision already: show it and go on without asking. If the wording was left open ("deixa mais curto", "melhora esse parágrafo"), propose a version following `references/voz.md` and wait for a yes before editing. Check your proposal against `references/voz.md` before showing it, so the person does not approve something the checks will reject.

When their own wording breaks a rule in `references/voz.md` (an avoided term, a price, the brand name, a second "do zero", an SEO description outside 70 to 160 characters), say so before editing with that file's sentence for the rule, offer a rewording, and only edit once they accept one. Do not quietly rewrite what they dictated. If they insist ("sou sócia, pode colocar o preço"), keep the rule: the rules are the site's agreed voice and changing one is the maintainers' decision. Offer to write that request up for them, as for an out-of-scope request. This differs from approved text, which you may change: an approved text is one sentence the review can judge on its own, while a voice rule covers the whole site.

### 3. Edit

You may edit only `src/content/*.ts` and `src/site.config.ts`. Two exceptions follow from the steps below: `tests/content.test.ts` for an approved text (see "Texto aprovado"), and the images in `src/assets/og/` that `npm run og` regenerates. Change only the string values; keep keys, quotes, `href`s and `id`s as they are.

Anything else is out of scope: layout, colours, fonts, spacing, images or logo, the brand name (`visual-identity.config.ts`), the theme, a new page, section, button or field that does not exist yet, or anything in `src/components/`, `src/pages/`, `src/themes/` or `scripts/`. Tell the person plainly that this needs someone from the maintenance team, and offer to write the request up for them: a short title and a description in Portuguese of what they want and where. Show that text so they can send it; only if they ask you to file it yourself, try `gh issue create`, and if that fails, just give them the text. A test of scope: if the words they want would need a new place on the page to appear, it is out of scope, even though it sounds like a text change.

Some cases need a judgement call:

- Text repeated across pages (the map lists them): ask whether to change it everywhere.
- WhatsApp numbers become `wa.me` links, which only work with the country code. If the person gives a Brazilian number without it, write it as `+55 11 ...` and mention that in the "Depois".
- Filling the marketing founder's card: remove `placeholder: true` only once the name and bio are both real; the map explains.

### 4. Check

If the Home headline or the small tag above it (`hero.headline` or `hero.label` in `home.ts`) changed, first run `npm run og`, which redraws the image shown when the site is shared, and include `src/assets/og/` in the commit. If `og` cannot run (it needs Google Chrome, like the screenshots), carry on, leave the images alone, and say in the pull request body that a maintainer must run `npm run og`. Then run `npm run verify`, so the check sees the final files.

If the check fails, read the output and work out the cause:

- A voice rule (avoided term, price, brand name, "do zero" count, SEO length or duplicate title): explain it to the person with the sentence from `references/voz.md`, offer a rewording, and run the check again after they choose. Never edit the avoided-terms list, the price rule or the brand-name rule in `tests/content.test.ts`, and never loosen any test to let a wording through. Those rules are the site's agreed voice; the test is how the maintainers enforce it.
- An approved text no longer matching: either you changed it without following "Texto aprovado" below, or you touched it by accident. Fix your edit.
- A type or build error: almost always your own edit (an unescaped quote, a missing comma). Fix it quietly; the person does not need to hear about it.
- Something your change cannot explain: compare the failure with `git diff`. If it points at code or text you did not touch, the site was already failing; stop, tell the person the site has a problem unrelated to their request that a maintainer must fix first, and offer the write-up. Do not repair code outside your files.

### Texto aprovado

Some copy was approved word for word and `tests/content.test.ts` protects it: the three page headlines (`hero.headline` in `home.ts`, `agencias.ts` and `empresas.ts`) and the engineering founder's bio (`founders[0].bio` in `sobre.ts`, `ENGINEERING_BIO`) are pinned as exact strings. The Para empresas diagnostic heading (`diagnostic.heading` in `empresas.ts`) is approved too; it has no pinned string, but it holds the site's only "do zero", which the test counts.

When the person asks to change one of these, the request itself is the reason to change it; the maintainer's review is the sign-off. Before editing, tell them: "Esse texto foi aprovado palavra por palavra. Posso propor a mudança, e ela vai marcada para a revisão olhar com atenção." Then, in the same change, update the copy and its expectation in `tests/content.test.ts`: the pinned string for a headline or the bio; for the diagnostic heading, the expected "do zero" count, and only if the new heading drops the phrase (from 1 to 0). This update is allowed and is not loosening a test. Change nothing else in that file, and start the pull request body with `**Texto aprovado alterado**` as its first line.

### 5. Show

You need to know here whether the person can open a link on this machine. On Claude Code on the web the environment variable `CLAUDE_CODE_REMOTE` is `true`; if you cannot tell, ask whether they are using Claude in the browser or on their own computer.

- Local: start `npm run dev` in the background and give the link to the changed page, `http://localhost:4321/<page>/` (for example `/para-empresas/`; the home is `/`).
- Web: run `npm run build`, start `npm run preview` in the background, then `node scripts/screenshots.mjs http://localhost:4321 <theme> <scratch dir> <changed paths>`, where `<theme>` is the `activeTheme` value in `visual-identity.config.ts`, `<scratch dir>` is a temporary folder outside the repository (so the screenshots do not end up in the commit), and the paths are the changed pages, such as `/` or `/contato/`. Show the images. A change to the footer, menu or contact details appears on every page; one page is enough to show it.
- If the script saves images but exits with an error, a layout check failed (often a longer text overflowing on a phone-sized screen). Show the images anyway, tell the person in plain words ("no celular, o título novo passa da largura da tela"), offer a shorter version, and if they keep theirs, mention the overflow in the pull request body.
- If no screenshots can be taken (usually because Google Chrome is not installed there), say "Não consigo tirar fotos das páginas neste ambiente" and show the "Antes" and "Depois" text again instead.

Then wait for the person to say the change looks right before going on, on both surfaces; when there are no images, the before/after text is what they confirm. Stop the server once they have.

### 6. Hand off

1. `git status` to confirm only the intended files changed, then `git add` those paths by name and make one commit with a short Portuguese message.
2. Push with exactly `git push -u origin conteudo/<slug>`. That form is pre-approved; any push naming `main` or forcing is blocked, and would be wrong anyway.
3. Open the pull request into `main`. If the session offers its own way to do that (a pull-request tool or a built-in GitHub integration), use it. Otherwise try `gh pr create --base main --head conteudo/<slug>`. If that fails for any reason (not installed, not logged in, or refused by the session), fall back to the compare link below.

The title and body are in Portuguese. The body says what changed, on which page, the before and after text, and the result of the check, plus anything the maintainer must still do or know (`npm run og` not run, a layout overflow). One possible shape, not a template: a one-line summary, a "Página" line, then "Antes" and "Depois" quotes, then "Verificação: passou". Start with `**Texto aprovado alterado**` when that section applies.

Compare-link fallback: run `git remote get-url origin`. It may be an HTTPS URL or SSH form such as `git@github.com:owner/repo.git` (sometimes with a stray `/` after the colon); take the owner and repository from it, drop `.git`, and give `https://github.com/<owner>/<repo>/compare/conteudo/<slug>?expand=1`. Show the title and body ready to copy, and explain in plain words: open the link, paste the title and the description in their fields, and confirm with the green button to create the pull request. If the remote is not a github.com address, say you could not build the link and give the branch name `conteudo/<slug>` so a maintainer can open the pull request.

Finish by giving the link and saying, in your words, that the change is ready for review and that a person from the maintenance team will check it before it appears on the site.

If the person then asks for an adjustment to the same change, edit, check, commit and push again on the same branch with the same push command; the pull request updates by itself. A different change starts again at step 1.

## Never

- Push to `main`, force a push, or merge the pull request; the review is the point of the process.
- Edit components, pages, themes, scripts, configuration other than `src/site.config.ts`, or generated files (`*.generated.css`, `public/favicon.svg`, `public/og-default.png`).
- Loosen a voice rule or any test to make a wording pass.
- Move, stash, commit or discard changes you did not make.
