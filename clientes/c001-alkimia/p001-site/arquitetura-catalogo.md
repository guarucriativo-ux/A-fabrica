# Arquitetura de Conteúdo/UX — Catálogo web (catalogo.html)
> content-strategist, Fase B · cliente Alkimia (c001/p001-site) · 2026-06-28
> NÃO é copy final (é do copywriter). É a ESTRUTURA: ordem, objetivo, blocos, anatomia da página de produto e fluxo de navegação.
> Direção: PROFUNDIDADE de catálogo da referência Real Serigrafia (página de produto rica + spreads editoriais) ADAPTADA a P&B/scroll, vestida de Alkimia.
> REGRA DURA: referência = linguagem, NÃO cópia. NÃO usar copy/medidas/cores/gramaturas da Real. Tudo que é dado-da-Alkimia ainda não confirmado = [A CONFIRMAR] (Gustavo preenche).
> Técnico: página OCULTA (noindex, sem link de busca), URL compartilhável, HTML/CSS/JS puro (Gustavo mantém). Mesma identidade do site: off-white/quase-preto, selo SVG, Inter/Archivo/Space Mono, reveal-on-scroll, P&B puro.

---

## Princípios da arquitetura
- **Profundidade que o v1 não teve:** o v1 foi rejeitado por raso. O catálogo entrega ficha técnica de verdade por produto (composição, medidas, cores, "modelo veste X"), intercalada com respiro editorial (lookbook).
- **Web scroll, não PDF:** cada PRODUTO é uma SEÇÃO rica de scroll; os SPREADS editoriais são seções full-bleed entre produtos. Sem paginação 16:9.
- **Navegação por hash:** grid no topo → clicar leva ao produto via âncora (#camiseta, #moletom...). Voltar ao grid sempre acessível.
- **P&B puro:** cor só dentro de foto de estampa. Bolinhas de "cores disponíveis" são amostras P&B/tom-sobre-tom ou rótulos textuais — nunca cor de marca.
- **Integridade:** nenhum número/medida/cor/gramatura copiado da Real. Gramaturas/malhas que JÁ temos do levantamento (literais do site Alkimia) entram fixas; o resto é [A CONFIRMAR].

---

## Seções em ordem (scroll do catalogo.html)

### A · CABEÇALHO MÍNIMO (topo)
- **Objetivo:** identificar o documento sem competir com os produtos; dar volta-pro-site.
- **Blocos:** selo SVG + wordmark "ALKIMIA" pequeno · rótulo mono ("Catálogo e condições — 2026") · link discreto "← Site" (volta pro index) · botão WhatsApp pequeno fixo/sticky.
- **Mudança vs nav do site:** mais enxuto — é uma página de consulta, não vitrine. Sem menu completo.
- **Papel:** moldura sóbria; o produto manda.

### B · ABERTURA / ÍNDICE DE PRODUTOS (grid)
- **Objetivo:** dar o mapa do catálogo e ser o hub de navegação por hash.
- **Blocos:**
  - Linha de moldura curta (1 frase, tom seco): o que é este catálogo (modelagens e peças que trabalhamos; tecidos/gramaturas confirmados no orçamento). Base: Seção 3 do copy-catalogo.
  - **Grid de produtos:** cada card = foto P&B da peça (modelo vestindo, fundo branco seamless) + nome + 1 linha técnica (malha/gramatura). Clicar = âncora pra seção do produto.
  - Agrupamento por linha (espelha o copy-catalogo): Camisetas e modelagens · Esporte e polo · Frio · Acessórios.
- **Fluxo:** card → `#hash` da seção do produto. É o ponto de partida da navegação.
- **Papel:** sumário navegável + primeira prova de padrão visual.

### C · PÁGINAS DE PRODUTO (uma SEÇÃO rica por peça) — ANATOMIA
> Modelo na referência Real (página de produto rica), adaptado a P&B/scroll. Repetir esta anatomia por produto. Ordem dos produtos = ordem do grid.

**Anatomia (de cima pra baixo, dentro de cada seção de produto):**
1. **Foto do modelo vestindo** — corpo inteiro, fundo branco seamless, P&B, luz de estúdio. Full-bleed ou coluna dominante. (FIXO como padrão; src evolui Stock→ChatGPT→foto real do Gustavo, layout não muda.)
2. **Título do produto** — nome da peça (Archivo display). Âncora `id` aqui.
3. **Descrição** — 1 parágrafo seco: o que é, pra que serve, caimento. Tom técnico, sem floreio. (Copywriter escreve do zero — NÃO da Real.)
4. **Ficha de composição** — lista rotulada (labels mono): malha/tecido, fio, gramatura, ribana/gola, costura. **FIXO o que temos do levantamento** (ex.: camiseta = meia malha penteada 100% algodão 30.1 fios; oversized = +moletinho 210g, gola canelada 3 cm; polo = piquet PA 50/50; moletom = felpado 2/3 cabos 50/50; ecobag = lona 100% algodão 350g). O que faltar = [A CONFIRMAR].
5. **Tabela de medidas** — grade própria por modelagem (tamanhos × largura/comprimento/manga). Reservar área de tabela cheia. **[A CONFIRMAR — medidas reais por tamanho/modelagem + range de tamanhos]**. Linha de instrução fixa: "medidas em cm, peça pronta no plano; compare com uma peça que você já usa". Nota de variação só quando Gustavo confirmar a tolerância (NÃO copiar os "~3cm" da Real).
6. **Cores disponíveis** — amostras + rótulo textual. **[A CONFIRMAR — cartela por modelagem]**. Render P&B/tom-sobre-tom ou lista de nomes; nunca inventar a paleta da Real.
7. **"Modelo veste X / mede Y"** — linha factual. **[A CONFIRMAR]** quando houver foto/modelo real. NÃO inventar.
8. **CTA de produto** — "Pedir orçamento desta peça" → WhatsApp com texto pré-preenchido do nome da peça.

**Fixo vs [A CONFIRMAR] por produto:**
- FIXO: foto-layout, título, estrutura da ficha, malhas/gramaturas literais já levantadas, instrução da tabela, CTA.
- [A CONFIRMAR]: números da tabela de medidas, range de tamanhos, cartela de cores, "modelo veste/mede", variações/gramaturas alternativas por peça.

### D · SPREADS EDITORIAIS / LOOKBOOK (entre produtos)
- **Objetivo:** respiro e elevação de marca; "editorial de moda" entre fichas técnicas. Quebra o ritmo de catálogo seco.
- **Blocos:** seção full-bleed com foto editorial — modelo em look completo OU detalhe macro (textura de tecido, costura, estampa, cordão). P&B, clima de estúdio/campanha. Texto mínimo ou nenhum (caption mono opcional, factual).
- **Cadência:** inserir 1 spread a cada 2–3 produtos (entre grupos é natural: depois de Camisetas, depois de Frio).
- **Integridade:** NÃO recriar o estilo "polaroid + fita kraft colorida" da Real (paleta dela). Tradução P&B: foto editorial limpa, espaço negativo, alto contraste. Sem depoimento/nome inventado.
- **Papel:** prova de estética editorial; sustenta o posicionamento "alto nível, não estamparia".

### E · FECHAMENTO (condições + ficha técnica/créditos)
- **Objetivo:** consolidar o operacional e assinar o documento (fecho premium da referência).
- **Blocos:**
  - **Como funciona / condições** (repetido do site, versão consulta): pedido mínimo · prazo · pagamento (50/50 pix/boleto, 12x cartão) · entrega (Lalamove capital / Correios-transportadora Brasil). [A CONFIRMAR — mínimo por pedido/modelo; prazo a partir da aprovação].
  - **Passo a passo** (4 etapas): Orçamento → Aprovação da arte → Produção → Entrega.
  - **Como pedir / contato:** frase de ação (mandar peça+quantidade+prazo no WhatsApp; volta proposta+mockup) + WhatsApp principal, Instagram, e-mail.
  - **Ficha técnica/créditos** (fecho premium): direção de arte, fotografia, modelos — **[A CONFIRMAR]** (preencher só com créditos reais quando houver produção real; até lá omitir, não inventar).
  - **Disclaimer de cor:** nota factual de que cores de tela/impressão podem variar do produto físico. (Reescrever na voz Alkimia, não copiar a da Real.)
  - Selo SVG como assinatura final + CTA WhatsApp.
- **Papel:** transformar consulta em ação; assinar com peso de marca.

---

## Fluxo de navegação (resumo)
1. Entra via link compartilhável (catalogo.html) — vindo do site (Produtos/Nav/CTA/Footer) ou WhatsApp.
2. **Cabeçalho mínimo** → **Grid (B)** dá o mapa.
3. Card do grid → `#hash` → **Página de produto (C)** com ficha completa.
4. Scroll contínuo passa por produtos + **spreads (D)** intercalados.
5. CTA por produto OU **Fechamento (E)** → WhatsApp.
6. "← Site" e WhatsApp sticky disponíveis o tempo todo. Voltar ao topo retorna ao grid.

## Fixo vs [A CONFIRMAR] — visão geral
- **FIXO (já temos):** identidade P&B/selo/tipografia; estrutura de seções; anatomia da página de produto; lista de produtos por grupo; malhas/gramaturas literais do levantamento; condições comerciais conhecidas; passo a passo; contatos.
- **[A CONFIRMAR] (Gustavo):** tabela de medidas por modelagem + range de tamanhos; cartela de cores por modelagem; gramaturas/variações alternativas por peça; "modelo veste/mede"; tolerância de variação de medida; créditos da ficha técnica; 1 case/foto real.
- **NUNCA:** transplantar medida/cor/gramatura/copy da Real; inventar depoimento, nome, crédito ou paleta.
