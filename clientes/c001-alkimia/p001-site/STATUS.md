# STATUS — Alkimia · p001 Site + Catálogo web embutido
Atualizado: 2026-06-29 (social rail mobile ✅; tudo em master; workflow desktop documentado).

Linha 3 (Site/Landing). Projeto VIVO, Fase 3 · PRODUÇÃO — site v3 iterado ao vivo com o Marcos.
Arquivo: `clientes/c001-alkimia/p001-site/index.html` (backup v2 em `index-v2-baseline.html`).
Site ao vivo: https://guarucriativo-ux.github.io/A-fabrica/
Identidade: P&B neutro alto contraste (#fff/#0a0a0a/cinzas). Cor só nas ESTAMPAS dos clientes e no mapa.
⚠️ Preview headless CONGELA animações/timers/transições e o screenshot trava com vídeo tocando → validar por DOM (eval), não por screenshot; ver de verdade no Chrome real.

## WORKFLOW (desktop ou nova sessão)
1. Abrir terminal na raiz do repo (`/A-fabrica`)
2. `git checkout master && git pull origin master`
3. Editar `clientes/c001-alkimia/p001-site/index.html`
4. Commitar e fazer push no master
5. Publicar no site: `bash deploy-alkimia.sh` → atualiza gh-pages automaticamente
6. Atualizar este STATUS.md antes de fechar a sessão

## FEITO NESTA SESSÃO (2026-06-29 — sessão web Claude Code)
- **Repositório pushado ao GitHub** (`guarucriativo-ux/A-fabrica`, público).
- **GitHub Pages:** ✅ ATIVO. URL ao vivo: `https://guarucriativo-ux.github.io/A-fabrica/`.
- **Drawer redesenhado:** painel flutuante compacto (244px, `top:74px right:16px`, border-radius 14px, sombra, anima scale+fade). Fecha ao clicar fora/ESC. Fonte 13.5px, padding 13px.
- **Social rail mobile ✅:** removido `display:none` <=980px. Mobile <=860px: botões 34px, gap 8px, right 12px — lateral direita igual ao desktop.

## FEITO NESTA SESSÃO (2026-06-28 tarde)
- **Hero mobile:** imagem aparece PRIMEIRO (acima do texto), produtos centralizados com zoom/crop (`object-fit:cover`). Gradiente fade na base da imagem para casar com entrada do texto. Todos os textos do hero centralizados no mobile.
- **Seção 02 mobile:** vídeo aparece ANTES do texto (corrigido com `#produtos .split .media{order:-1}`).
- **Clientes (marquee):** eyebrow `.cl-eyebrow` → cor `#fff` (era rgba com opacidade baixa).
- **Drawer hambúrguer:** redesignado ao estilo godaylight.com (referência do Marcos). Organizer especificou; implementado. HTML: `.drawer-head` (logo + ✕ SVG) + `.drawer-body` (nav com chevrons + CTA full-width preto). Links Archivo 500, 20px, sem uppercase; chevron `›` desliza no hover. `.drawer-cta` preto full-width na base. Está pendente VALIDAÇÃO visual no celular real.

## ESTADO ATUAL DO SITE (de cima pra baixo)
- **Nav:** pill BRANCA flutuante centralizada (godaylight). ALKIMIA · Sobre · Produtos · Processo · Contato · botão **Orçamento**. Mobile (<=860px): hambúrguer na pill → **painel flutuante compacto** (244px, canto sup-dir, border-radius 14px, sombra, anima scale+fade; links Archivo 500 13.5px com chevron; CTA preto com border-radius 8px; fecha ao clicar fora/ESC; backdrop invisível; a11y PASS).
- **Hero:** FOTO full-bleed `assets/hero-slides/hero-2.png` (pilha de peças c/ estampa de onda sonora COLORIDA; origem `fotos-site/hero_2.png`). SEM filtro P&B (sem classe `.ph`). ⚠️ PNG 1.96MB — otimizar. Texto pôster Archivo Black por cima: **"Vestimos equipes que levam a imagem a sério."** + apoio + "Fale com a Alkimia". Stagger + Ken Burns.
- **Contador:** "DESDE 2021 · **+50.000** · camisetas produzidas para equipes". Conta ao entrar (rAF, **2s**). ⚠️ 50.000 = número do Marcos, CONFIRMAR c/ Gustavo.
- **Clientes (marquee):** faixa PRETA, logos BRANCOS 132px, auto-scroll + segue o mouse (hover pausa). `samba-da-rosa` removido.
- **Quem é a Alkimia (01):** 2 colunas, `dgrid align-items:start`, gap 40px.
  - Texto (esq): 2 parágrafos (bold nos destaques, **SEM** sublinhado) + assinatura `.dsign` + ficha `.dfacts` (Space Mono, valores com DIGITAÇÃO `.typer`+`data-text`, sem cursor): NA CASA "corte, serigrafia, DTF e bordado" · EQUIPE "confecção familiar, atendimento humanizado" · DESDE "2021 · Vila Ema · São Paulo" · PEDIDO "a partir de 30 peças". `.dfacts` SEM border-top.
  - Vídeo-1 (dir): `assets/video-1.mp4` 9:16, COR, autoplay/mudo/loop, `max-width:430px` `max-height:600px` desktop / 480 mobile, cantos 8px. **Botão áudio `.vmute`** canto inferior-dir: ícone EQUALIZADOR (4 barras, 1 cor) — PARADO antes do clique, **dança via CSS `@keyframes eqbar`** quando `.sound` (após clique). NÃO usa Web Audio.
- **Produtos (02 "O que produzimos"):** `.split` foto→VÍDEO. `assets/video-2.mp4` vertical 9:16 COLOR (origem `videos_insta/video_2.mp4`). Desktop (≥881px): vídeo preenche a coluna até o fim da lista (`#produtos .split{align-items:stretch}` + vídeo `position:absolute;inset:0`), topo no "02", termina perto do Ecobag, sem gap. Mobile: 9:16. Cantos 8px. Legenda `.cap` PONTA A PONTA, centralizada, DIGITAÇÃO com cursor. Botão áudio `.vmute` canto inferior-dir (`bottom:54px`, acima da legenda). Botão "Ver catálogo completo" REMOVIDO (recolocar depois). Lista de produtos = texto estático (digitação foi testada e revertida).
- **Acabamentos (03):** `.split.rev` foto→CARROSSEL `#acabCarousel` (cross-fade 4 fotos de `fotos-site-antigo/`: SILK/DTF/BORDADO/EITQUETAS), COLOR, auto 3s (setInterval `.cslide.on`), cantos 8px, `align-items:start`. Legenda PONTA A PONTA com DIGITAÇÃO+cursor. Copy reformulada (3 parágrafos, ângulo OFÍCIO — ver APRENDIZADOS sobre private label). Cards técnica `.titem`: hover lift+sombra, `margin-top:48px`.
- **Como funciona (04):** 4 cards (Orçamento · Pagamento · Produção · Entrega) com conteúdo do site no ar (alkimiaprod.com.br). `.step` com hover lift+sombra (igual `.titem`). Lista `.cond` REMOVIDA inteira (incl. "Pedido mínimo: 30 peças").
- **Onde estamos (05):** mapa Google COLORIDO (única cor) + resumo Google embutido `.gmaps-rating`: ★★★★★ **Excelente · 5,0 · 12 avaliações no Google**. Botão "Ver no Google Meu Negócio". (Seção própria de Avaliações foi REMOVIDA — fundida aqui.)
- **CTA (preto):** headline **"Deixe sua equipe uniformizada."** + só botão WhatsApp (removidos a linha cinza "a partir de 30 peças…" e "ou veja o catálogo completo").
- **Rodapé PRETO:** tag "Confecção para equipes. São Paulo, desde 2021."; coluna Onde estamos: "Vila Ema · São Paulo · SP" + "Enviamos para todo o Brasil". Link "Catálogo →" ainda dá 404.
- **Social rail:** barra fixa lateral DIREITA (`.social-rail`), IG + TikTok + WhatsApp (SVG inline), centralizada, acompanha scroll, some <=980px. ⚠️ é `<nav>` → precisa `left:auto;padding:0` p/ não herdar a regra global `nav{}`. ⚠️ link TikTok = `tiktok.com/@alkimia.prod` (CHUTE — confirmar).
- **Motion:** SEMPRE ativo (desktop E mobile; `RM=false`, reduce-motion ignorado — decisão Marcos).
- **Typewriter:** genérico `.typer[data-text]` (IntersectionObserver, re-digita ao entrar, ~55ms/letra). Hoje em: legenda vídeo-2, legenda carrossel-03, 4 linhas da ficha-01. Cursor `_` só nas `.cap.typer`.

## DECISÕES PENDENTES (com o Marcos/Gustavo)
- nº **50.000** (confirmar com Gustavo) · **headline do hero** (atual vs "Vestimos produções que constroem imagem") · **link real do TikTok** · Acabamentos: legenda dinâmica por foto? velocidade do carrossel? · otimizar hero PNG (1.96MB).
- A confirmar no CELULAR real (não dá por código): CTA acima da dobra a 390px · `.vmute` tocando no iOS Safari.
- a11y (não bloqueiam): marquee WCAG 2.2.2 (pausa por teclado/touch) vs "motion sempre ativo".

## PRÓXIMO (retomar aqui)
1. **Validar drawer no celular real** — abrir `https://guarucriativo-ux.github.io/A-fabrica/` e confirmar drawer mobile visualmente. Drawer foi reescrito (flex:1 removido do nav, margin-top:auto no CTA, padding:26px nos links).
2. **Continuar responsivo mobile** — restam: seção 01 "Quem é a Alkimia", 03 Acabamentos, 04 Como funciona, 05 Mapa, CTA, footer, social rail.
2. **Hero carrossel:** Marcos gera imagens 2–4 no ChatGPT (prompts SEM texto em `hero-prompts-e-copy.md`) → `assets/hero-slides/` → montar carrossel (foto+copy trocam juntas). Copy: `copy-hero-carrossel.md`.
3. **catalogo.html:** construir (oculto/noindex, grid + página de produto). Hoje link "Catálogo →" (footer) dá 404; botão de Produtos foi removido (definir onde recolocar). Docs: `arquitetura-catalogo.md` · `copy-catalogo-web.md` · `schema-produtos.md`.
4. Resolver as pendências confirmadas c/ Gustavo (50.000 / TikTok).

## REGRAS DE OURO (modo de trabalho)
- Valido a mecânica e EXECUTO; mérito é do Marcos. Trabalho não-trivial / decisão de abordagem → o Marcos pede pra acionar o **agent-organizer** (ele designa o especialista; eu executo). Já rodaram: organizer (mobile + vazio da seção 01), copywriter (ficha + copy acabamentos), accessibility-expert (QA mobile).
- Copy passa pelas travas do `mapa-mensagem.md`. Cliente NÃO gosta de posicionamento "private label / virar marca" (ver APRENDIZADOS) — Acabamentos = ofício.
- Esperar comando explícito pra criar/alterar grande. Atualizar este STATUS antes de fechar.

## RESÍDUOS INERTES (limpar quando conveniente)
- CSS `.band`/`.media`-oficina + JS parallax `.band img` + `@keyframes scroll`: sem uso.
- CSS `.revs`/`.rev`/`.ex`/`.revs-head`: sem uso após remover a seção de Avaliações.
- `assets/hero-slides/slide1-camiseta.jpg` e `assets/technique.jpg`/`products.jpg`: substituídos, podem sair.

## INSUMOS / DOCS (p001-site/)
especificacao-visual · arquitetura-site · arquitetura-catalogo · copy-site-v3 · copy-catalogo-web · copy-hero-carrossel · mapa-mensagem · schema-produtos · hero-prompts-e-copy · plano-hero-carrossel · plano-motion · plano-mobile-responsivo · plano-site-catalogo-v1.
Cockpit cliente: ../IDENTIDADE.md · ../PRIMER.md · ../APRENDIZADOS.md · ../pesquisa-norte/.
