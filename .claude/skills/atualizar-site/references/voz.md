# Voz do site

How the site's copy sounds, and how to explain a rule to the person when their wording breaks it. `tests/content.test.ts` is the enforced list: `npm run verify` fails when copy breaks a rule below. This file explains those rules; if the two ever disagree, the test wins. Never change the test to let a wording through (the approved texts in `mapa-do-conteudo.md` are the only exception).

For each rule, the line in Portuguese is what to tell the person, followed by a suggested rewording.

## Tom

Short sentences, concrete nouns, like a senior colleague explaining across a table. Headlines state a result or a situation the reader recognises; technology comes in the line below. English terms get a Portuguese explanation on first use, or are dropped.

Not enforced by the test, so suggest rather than insist.

> "O site usa frases curtas e concretas, como uma conversa. Posso deixar assim: ..."

## Termos evitados

The copy never contains these (case does not matter, and a term inside a longer word still counts):

| Evitar | Usar no lugar |
| --- | --- |
| escalar, acelerar, alavancar, decolar | evoluir, melhorar, organizar, conectar |
| transformação | o que você já tem |
| superpoderes, AI First, 24 horas | automação, integração, agente de IA, each with an example |
| ROI previsível, máquina de crescimento | quanto entrou, quanto custou, quanto vendeu |
| com a sua marca, nos bastidores | é seu, fica no seu nome |
| de ponta a ponta, full service, a maior | say plainly what we do and what we don't |

> "O site evita a palavra '<termo>' porque soa como promessa de agência. Que tal: '<alternativa>'?"

## "do zero"

"do zero" appears exactly once in all the copy: in the Para empresas diagnostic heading ("Você não precisa começar do zero..."). Do not add it anywhere else. If that heading changes and loses the phrase, the count in the test changes with it, and the PR is marked "**Texto aprovado alterado**".

> "A expressão 'do zero' já aparece uma vez no site, de propósito. Usar de novo enfraquece a ideia de que partimos do que você já tem. Posso dizer: '<alternativa>'?"

## Sem preços

No prices anywhere: nothing with `R$`. The price of the Mapa da Operação is "informado na primeira conversa".

> "O site não mostra preços; o valor é passado na primeira conversa. Posso escrever '<alternativa sem valor>'?"

## Nome da marca

The company name is never typed into copy. It comes from `visual-identity.config.ts` and the templates insert it. The test rejects "Move and Grow" and "M.G." in any content file. Write around it ("a gente", "nosso time") or leave the sentence without a name.

> "O nome da empresa é colocado pelo site automaticamente, então o texto não repete o nome. Fica assim: ..."

## Títulos e descrições para o Google

Each page has `seo.title` and `seo.description`. Every description is 70 to 160 characters long; every title is different from the other pages' titles. Count the characters before proposing a new description.

> "Esse texto aparece no Google embaixo do nome da página e precisa ter entre 70 e 160 caracteres. O seu tem <n>. Sugiro: '<alternativa>' (<n> caracteres)."

> "Esse título já é usado na página <outra página>. Cada página precisa de um título diferente para o Google. Que tal: '<alternativa>'?"
