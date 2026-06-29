# Plano — Site + Catálogo Web Alkimia (v1, RASCUNHO p/ aprovação do Marcos)
> Saída do agent-organizer, 2026-06-28. Portão Fase 2 — NADA produzido até Marcos aprovar.
> Direção: estilo godaylight.com (image-forward, scroll-storytelling, full-bleed) com identidade Alkimia. Catálogo vira web embutido.

## Stack recomendada
HTML/CSS/JS estático, 2 arquivos:
- `index.html` — site principal evoluído da baseline v2 atual (que o Marcos aprovou).
- `catalogo.html` — catálogo web, página OCULTA (`<meta robots=noindex,nofollow>`, fora do menu), link compartilhável (`catalogo.html#produto` via hash routing JS puro).
Produtos num array JS inline (editar 1 linha pra atualizar). Zero framework/CMS/servidor — Gustavo hospeda em qualquer lugar e mantém sozinho. Fotos reais entram depois no mesmo `src=` sem mexer no layout.

## Time (agentes reais + orquestrador)
- `content-strategist` → arquitetura/UX do site + catálogo (seções, fluxo, hierarquia).
- `copywriter-specialist` → copy estilo godaylight (curta, incisiva) sem perder o tom artesanal.
- `messaging-architect` → trava de posicionamento (cada seção comunica o norte; veta "godaylight genérico").
- `brand-strategist` → schema de dados dos produtos pro catálogo.
- ORQUESTRADOR → análise das referências (godaylight, CATALOGO_FINAL 225MB, JPGs), build HTML/CSS/JS, stock Adobe, QA.

## Sequência
- **A · Referências (orquestrador):** analisa godaylight + CATALOGO_FINAL + JPGs → `especificacao-visual.md`. Build não começa sem isso.
- **B · Arquitetura + copy (agentes, paralelo):** arquitetura-site/catalogo, copy-site-v2, mapa-mensagem, schema-produtos.
- **C · Build (orquestrador):** licencia stock → evolui index.html (godaylight-style) + constrói catalogo.html (hash routing + JSON).
- **D · QA (orquestrador):** screenshots desktop/mobile, checklist IDENTIDADE+APRENDIZADOS+estilo godaylight, links WhatsApp, noindex.
- **E · Portão Marcos:** vê screenshots/preview → aprova ou ajusta.

## Seções do site (final pelo content-strategist)
nav fixa · hero full-bleed · marquee de clientes · declaração de posicionamento · produtos · acabamentos (foto de processo) · clientes em destaque · como funciona · CTA final preto · footer.

## Catálogo web
cabeçalho mínimo → grid de produtos (foto+nome+técnicas) → página de produto (foto grande+gramatura+técnicas+nota cores+CTA WhatsApp) → rodapé com condições. Campos [A CONFIRMAR] (medidas, cores) ficam como placeholder até o Gustavo mandar.

## Fotografia (ponte)
Adobe Stock com critério rígido (P&B/monocromático, produto em uso, luz de estúdio/natural, nada de stock genérico sorridente) até o Gustavo enviar as reais.

## Riscos (do organizador)
copiar godaylight literal e perder identidade · site fotográfico sem fotos reais (selecionar stock com rigor; layout pronto pra troca) · complexidade que o Gustavo não mantém (HTML puro) · scroll-storytelling soar frio/corporativo vs. tom artesanal · página do catálogo não ficar realmente oculta (noindex) · dados [A CONFIRMAR] · 225MB do PDF (paginar, não abrir inteiro).

## FLAG do orquestrador (não é do organizador)
O organizador citou um depoimento "Beto Picasso da Locadora Filmes do Bem" — NÃO temos esse depoimento confirmado; parece inventado. Regra: NÃO usar depoimento/nome fabricado. Seção de depoimento só com citação real fornecida pelo Gustavo, senão sai do escopo.
