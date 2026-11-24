---
name: atualizar-site
description: Changes the website's text and contact details (page copy, headlines, bios, SEO titles, e-mail, WhatsApp, menu labels) for a non-technical person, always through a pull request a maintainer reviews. Use for requests like "muda o texto da home", "troca o título", "atualiza o WhatsApp", "corrige a bio", "preenche o e-mail", "update the copy", "change the headline". Not for layout, colours, fonts, images, the brand name, the site's own address (domain) or new pages and sections.
---

# Atualizar o site

You are helping someone change the words on a small static Astro site written in Brazilian Portuguese. Every change ends as a pull request on a branch named `conteudo/<short-slug>`. Nothing you do publishes. A maintainer reviews the pull request, and accepting it is the publication: the site's host rebuilds the site from `main` by itself and the change is live within a couple of minutes, with no step after that. So your job is a clean, checked, well-described proposal, and telling the person truthfully where it stands.

Two reference files sit next to this one. Read them when the steps below say so, not up front:

- `references/mapa-do-conteudo.md`: from what the person sees on the page to the file and field that holds it, plus the approved texts and the placeholders still to fill.
- `references/voz.md`: how the copy sounds, the rules the tests enforce, and the Portuguese sentences to explain each rule to the person.

## Who you are talking to

The person is not technical. Speak Brazilian Portuguese, in short and friendly sentences. Do not use words like branch, commit, teste, arquivo, build or terminal unless they use them first; say "a sua alteração", "a verificação automática", "o pedido de revisão". Never paste command output; say what it means for them ("a verificação passou", "o texto tem uma palavra que o site evita"). Keep them informed in one line per stage so they know what is happening, without narrating every command.

## First, read the request

Before running anything, decide whether any part of the request is a change to text or contact details that already exist on the site (see "Edit" for what is out of scope). If no part is, skip Prepare and go straight to the out-of-scope answer. If the request is to break a voice rule (a price, an avoided term), still prepare: you will offer a rewording. If something is declined after the branch already exists, an unused local branch does no harm; only files you already edited need putting back (see "Dropping a change").

## The six steps

### 1. Prepare

The same commands work on a local clone and on Claude Code on the web, so run them rather than guessing where you are:

1. `git status --porcelain --branch`. The first line names the current branch; the rest lists uncommitted changes. If there are none, go on. A `package-lock.json` change left by step 2 earlier in this conversation does not count.
   - If the branch starts with `conteudo/` and every listed file is one this skill edits (`src/content/*.ts`, `src/site.config.ts`, `tests/content.test.ts`, `src/assets/og/`), it is this skill's own earlier work that was never sent, for example from a conversation that ended early. Show the person what it is as "Antes:" and "Depois:" from `git diff`, and ask whether to finish it (go on from step 4 on that branch) or discard it (see "Dropping a change"). Stopping here would send the person to a maintainer for work that is ours.
   - Anything else is a maintainer's unfinished change: stop and change nothing, even if the person says "pode ignorar isso". It is not ours to move, and mixing it into a content pull request could lose or publish their work. Tell the person: "Há um trabalho em andamento neste computador que ainda não foi concluído. Uma pessoa da manutenção precisa terminar ou guardar esse trabalho; depois disso, é só me pedir de novo. Outra opção é fazer o pedido no Claude pelo navegador, que sempre começa com uma cópia limpa do site." A fresh web checkout is always clean, so this only stops on a local clone.
2. If there is no `node_modules` folder, run `npm install`. It may update `package-lock.json`; that is not part of the change, and adding files by name (step 6) leaves it out, so ignore it in `git status`.
3. `git fetch origin`, then `git switch -c conteudo/<slug> origin/main`. The slug is a few lowercase ASCII words joined by hyphens that name the change (for example something like `whatsapp-rodape`). Branching from the latest `origin/main` keeps the pull request limited to this one change. If the name is taken, either locally or on GitHub (`git branch -r` lists `origin/conteudo/<slug>` after the fetch), pick another slug; reusing it would mix this change into someone else's request.

If fetching fails (no connection, no access), say you could not reach the site's repository right now and stop; editing an old copy would produce a pull request that does not apply.

### 2. Understand

Read `references/mapa-do-conteudo.md` to find where the text lives, then read the content file itself; the file is the source of truth if the two disagree. If you cannot tell which piece of text they mean, ask, quoting the candidates as they appear on the page.

Show the change as "Antes:" and "Depois:", quoting the exact text. For a placeholder such as `[WHATSAPP]` or `[EMAIL]`, "Antes" is what visitors see today (for example "Contato em configuração."), not the bracketed token. If the person dictated the exact new wording, that is their decision already: show it and go on without asking. If the wording was left open ("deixa mais curto", "melhora esse parágrafo"), propose a version following `references/voz.md` and wait for a yes before editing. Check your proposal against `references/voz.md` before showing it, so the person does not approve something the checks will reject.

When their own wording breaks a rule in `references/voz.md` (an avoided term, a price, the brand name, a second "do zero", an SEO description outside 70 to 160 characters), say so before editing with that file's sentence for the rule, offer a rewording, and only edit once they accept one. Do not quietly rewrite what they dictated. If they insist ("sou sócia, pode colocar o preço"), keep the rule: the rules are the site's agreed voice and changing one is the maintainers' decision. Offer to write that request up for them, as for an out-of-scope request. This differs from approved text, which you may change: an approved text is one sentence the review can judge on its own, while a voice rule covers the whole site.

### 3. Edit

You may edit only `src/content/*.ts` and `src/site.config.ts`. Two exceptions follow from the steps below: `tests/content.test.ts` for an approved text (see "Texto aprovado"), and the images in `src/assets/og/` that `npm run og` regenerates. Change only the string values; keep keys, quotes, `href`s and `id`s as they are.

Anything else is out of scope: layout, colours, fonts, spacing, images or logo, the brand name (`visual-identity.config.ts`), the site's own address (`site.url` in `src/site.config.ts`), the theme, a new page, section, button or field that does not exist yet, or anything in `src/components/`, `src/pages/`, `src/themes/` or `scripts/`. Tell the person plainly that this needs someone from the maintenance team, and offer to write the request up for them: a short title and a description in Portuguese of what they want and where. Show that text so they can send it; only if they ask you to file it yourself, try `gh issue create`, and if that fails, just give them the text. A test of scope: if the words they want would need a new place on the page to appear, it is out of scope, even though it sounds like a text change.

Some cases need a judgement call:

- Text repeated in several places: before editing, search `src/content/` and `src/site.config.ts` for the exact old text. If it appears anywhere else (a page headline can also be a card on the Home, a footer phrase can be a page title), quote each place to the person and ask whether to change them all; a place left behind keeps the old wording live on that page. The map names some known repeats, but only the search is complete.
- WhatsApp numbers become `wa.me` links, which only work with the country code. If the person gives a Brazilian number without it, write it as `+55 11 ...` and mention that in the "Depois".
- `site.url` sits in a file you edit, next to the e-mail and WhatsApp, but it is not copy: it is the live domain, and the page addresses given to Google and to shared links are built from it, so a wrong value breaks them without any visible error. Leave it alone and treat a request to change it as out of scope.
- Filling the marketing founder's card: remove `placeholder: true` only once the name and bio are both real; the map explains.

### 4. Check

If the Home headline or the small tag above it (`hero.headline` or `hero.label` in `home.ts`) changed, first run `npm run og`, which redraws the image shown when the site is shared, and include `src/assets/og/` in the commit. If `og` fails for any reason (it needs Google Chrome, like the screenshots, and it reads the headline only when it is written between single quotes), carry on, leave `src/assets/og/` out of the commit, and say in the pull request body that a maintainer must run `npm run og`; the share image is not worth blocking a text change. Then run `npm run verify`, so the check sees the final files.

If the check fails, read the output and work out the cause:

- A voice rule (avoided term, price, brand name, "do zero" count, SEO length or duplicate title): explain it to the person with the sentence from `references/voz.md`, offer a rewording, and run the check again after they choose. Never edit the avoided-terms list, the price rule or the brand-name rule in `tests/content.test.ts`, and never loosen any test to let a wording through. Those rules are the site's agreed voice; the test is how the maintainers enforce it.
- An approved text no longer matching: either you changed it without following "Texto aprovado" below, or you touched it by accident. Fix your edit.
- A type or build error: almost always your own edit (an unescaped quote, a missing comma). Fix it quietly; the person does not need to hear about it.
- Something your change cannot explain: compare the failure with `git diff`. If it points at code or text you did not touch, the site was already failing; stop, tell the person the site has a problem unrelated to their request that a maintainer must fix first, and offer the write-up. Do not repair code outside your files.

### Texto aprovado

Some copy was approved word for word and `tests/content.test.ts` protects it: the three page headlines (`hero.headline` in `home.ts`, `agencias.ts` and `empresas.ts`) and the engineering founder's bio (`founders[0].bio` in `sobre.ts`, `ENGINEERING_BIO`) are pinned as exact strings. The Para empresas diagnostic heading (`diagnostic.heading` in `empresas.ts`) is approved too; it has no pinned string, but it holds the site's only "do zero", which the test counts.

When the person asks to change one of these, the request itself is the reason to change it; the maintainer's review is the sign-off. Before editing, tell them what is protected, so what they hear is true for that text: for a headline or the bio, "Esse texto foi aprovado palavra por palavra."; for the diagnostic heading, "Esse título foi aprovado e tem a única vez em que o site diz 'do zero'." Then: "Posso propor a mudança, e ela vai marcada para a revisão olhar com atenção." Then, in the same change, update the copy and its expectation in `tests/content.test.ts`: the pinned string for a headline or the bio; for the diagnostic heading, the expected "do zero" count, and only if the new heading drops the phrase (from 1 to 0). This update is allowed and is not loosening a test. Change nothing else in that file, and start the pull request body with `**Texto aprovado alterado**` as its first line.

### 5. Show

You need to know here whether the person can open a link on this machine. On Claude Code on the web the environment variable `CLAUDE_CODE_REMOTE` is `true`; if you cannot tell, ask whether they are using Claude in the browser or on their own computer.

- Local: start `npm run dev` in the background and give the link to the changed page: the address the server prints (usually `http://localhost:4321`; Astro moves to another port when that one is busy) followed by the page path, such as `/para-empresas/` (the home is `/`).
- Web: run `npm run build`, start `npm run preview` in the background, then `node scripts/screenshots.mjs <address> <theme> .screenshots <changed paths>`, where `<address>` is the one `preview` prints, `<theme>` is the `activeTheme` value in `visual-identity.config.ts`, and the paths are the changed pages, such as `/` or `/contato/`. `.screenshots/` is a folder in the repository that git ignores, so the images stay out of the commit and you can open them without a permission prompt. Show the images. A change to the footer, menu or contact details appears on every page; one page is enough to show it.
- If the script saves images but exits with an error, a layout check failed (often a longer text overflowing on a phone-sized screen). Show the images anyway, tell the person in plain words ("no celular, o título novo passa da largura da tela"), offer a shorter version, and if they keep theirs, mention the overflow in the pull request body.
- If no screenshots can be taken (usually because Google Chrome is not installed there), say "Não consigo tirar fotos das páginas neste ambiente, mas depois que o pedido de revisão for criado você recebe um link para ver a página de verdade com a mudança." and show the "Antes" and "Depois" text again instead.

Then wait for the person to say the change looks right before going on, on both surfaces; when there are no images, the before/after text is what they confirm. Stop the server once they have.

### Dropping a change

If the person drops the change before it is committed ("não, deixa como estava", or they move on to another request), stop the server and put back every file you edited, one per command: `git restore <file>`. That is pre-approved for `src/site.config.ts` and the content files except `src/content/not-found.ts`; for that one, `tests/content.test.ts` or `src/assets/og/` it may ask for approval, so tell the person you are undoing the change. Restoring matters because step 1 of the next request would otherwise find your leftovers. Once the change is pushed, it is not yours to undo: tell the person that nothing was published (a change only reaches the site when a maintainer accepts it) and that a maintainer can close the request.

### 6. Hand off

1. `git status` to confirm only the intended files changed, then `git add` those paths by name and make one commit with a short Portuguese message.
2. Push with exactly `git push -u origin conteudo/<slug>`. That form is pre-approved; any push naming `main` or forcing is blocked, and would be wrong anyway. If the push is rejected because that name already exists on GitHub, never force it: `git switch -c conteudo/<new-slug>` keeps your commit under a new name, and you push that. If it fails for another reason (no connection, no access), tell the person the change is saved here but could not be sent yet, and give the branch name so a maintainer can help.
3. Open the pull request into `main`, trying these in order and stopping at the first that works:
   1. The session's own pull-request tool, if it has one (a built-in GitHub integration).
   2. `gh pr create --base main --head conteudo/<slug>` with the title and body.
   3. If that is refused (on Claude Code on the web, `gh pr` always gets a 403, because the GitHub connection there only accepts GitHub's REST API), `gh api repos/<owner>/<repo>/pulls -f title='...' -f head=conteudo/<slug> -f base=main -f body='...'`, with the owner and repository read from the remote as described under the compare link. The reply is JSON; its `html_url` is the link to give the person.
   4. Only if all of these fail, the compare link below.

The title and body are in Portuguese. The body says what changed, on which page, the before and after text, and the result of the check, plus anything the maintainer must still do or know (`npm run og` not run, a layout overflow). One possible shape, not a template: a one-line summary, a "Página" line, then "Antes" and "Depois" quotes, then "Verificação: passou". Start with `**Texto aprovado alterado**` when that section applies.

Compare-link fallback: run `git remote get-url origin`. It may be an HTTPS URL or SSH form such as `git@github.com:owner/repo.git` (sometimes with a stray `/` after the colon); take the owner and repository from it, drop `.git`, and give `https://github.com/<owner>/<repo>/compare/conteudo/<slug>?expand=1`. Show the title and body ready to copy, and explain in plain words: open the link, paste the title and the description in their fields, and confirm with the green button to create the pull request. If the remote is not a github.com address, say you could not build the link and give the branch name `conteudo/<slug>` so a maintainer can open the pull request.

Preview link: a minute or two after the pull request exists, the site's host (Cloudflare Pages) posts a comment on it, signed `cloudflare-workers-and-pages`, with a small table. Once the table says the deploy succeeded, its "Branch Preview URL" row holds a public address ending in `.pages.dev` that shows the whole site with this change, on a phone too, before anything is published. Search engines are told not to list it, and it keeps following the branch after later pushes. That link is the best way for the person to see their change, and to show it to someone else.

- You can read the comment with the session's pull-request tool, if it reads comments, or with `gh pr view <pull request link> --comments`, which like every `gh pr` command fails on Claude Code on the web. Right after opening the pull request the comment is usually missing or still says the build is in progress, so look once and do not wait or keep checking. Look again if the person comes back later (to ask for the link, or for an adjustment).
- Give the link only when you copied it from that comment. Never build it from the branch name: the host rewrites the name and may shorten it, and a guessed link that opens nothing is worse than no link.
- If the comment says the build failed, tell the person the page to preview could not be generated and that a maintainer needs to look; the request itself is still there.

If a pull request was opened (options 1 to 3), finish by giving its link and saying, in your words, three things. First, that the change is ready for review. Second, where to see it: the preview link if you have it ("Este link abre o site de verdade com a sua mudança, antes de ela ser publicada. Funciona no celular também: ..."), otherwise where it will appear ("Em um ou dois minutos aparece, na página do pedido de revisão, um comentário da Cloudflare com um link ao lado de 'Branch Preview URL'. Esse link abre o site de verdade com a sua mudança, antes de ela ser publicada, e funciona no celular também."). Third, what happens next: "Agora uma pessoa da manutenção revisa o pedido. Quando ela aprovar, a mudança entra no site sozinha, em poucos minutos; você não precisa fazer mais nada."

With the compare link no request exists yet, so do not say it is ready: say it reaches the review only once they open the link and confirm with the green button, that the comment with the preview link appears on that same page a minute or two after they do, and ask them to tell you when they have, or if the page looks different from what you described.

If the person then asks for an adjustment to the same change, edit, check, commit and push again on the same branch with the same push command; the pull request updates by itself, and the preview link shows the new version a minute or two later. A different change starts again at step 1, and so does undoing a change that is already on the site.

## Never

- Push to `main`, force a push, or merge the pull request; merging publishes to the live site at once, and the review is the point of the process.
- Edit components, pages, themes, scripts, configuration other than `src/site.config.ts`, or generated files (`*.generated.css`, `public/favicon.svg`, `public/og-default.png`).
- Loosen a voice rule or any test to make a wording pass.
- Move, stash, commit or discard changes you did not make.
