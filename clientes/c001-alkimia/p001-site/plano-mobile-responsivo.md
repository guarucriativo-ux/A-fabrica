# Plano — Mobile / Responsivo Alkimia p001 (feedback dos especialistas + plano)
> agent-organizer, 2026-06-28. Acionado pelo Marcos: desktop OK, mobile deixando a desejar; foco em NAVEGABILIDADE. Não implementar antes do "go" do Marcos.

## Time designado (capability matching)
- **ux-researcher** (antes do build) — valida abordagem da nav mobile + hierarquia/ordem das seções no scroll (público chega via WhatsApp/Instagram no celular).
- **ui-designer** (junto do dev) — define como a pill branca flutuante vira menu mobile sem perder identidade godaylight; estados (fechada/aberta/drawer/transição); tap targets 44px sem ficar "gordinho".
- **frontend-developer** (executor principal) — media queries, flex/grid, touch, tap targets em HTML/CSS/JS puro (sem dependência).
- **accessibility-expert** (portão de saída) — WCAG 2.1 AA, define critérios de aceite e QA final.
- **performance-engineer** — NÃO entra agora (sem queixa de perf); entra quando o carrossel de hero (imagens 2–4) existir.
- Ordem: ux-researcher → (ui-designer ∥ frontend-developer) → accessibility-expert. Orquestrador implementa.

## Diagnóstico (preview real a 390px)
- ✅ viewport OK; SEM overflow horizontal; breakpoints já existem (480/560/680/760/820/860/880/900).
- ✅ Hero: scrim vira vertical <900px, foto cobre, h1 clamp escala. Contador clamp OK. Grids empilham (split/dgrid/steps/crow/revgrid). Marquee recortado = esperado.
- 🔴 **CRÍTICO — nav morta no mobile:** linha CSS `@media(max-width:860px){.navlinks a:not(.btn){display:none}}` esconde Sobre/Produtos/Processo/Contato e NÃO há hambúrguer. Só "Orçamento" sobra. One-page sem navegação.
- 🟠 **Tap targets <44px:** `.btn` da nav ~37px; `.vmute` (áudio do vídeo) 38px.
- 🟡 "Quem é a Alkimia" (`.declar .dgrid`): ao empilhar, texto vem antes do vídeo — talvez vídeo deva subir (`order:-1`). Vídeo 9:16 a 330px = ~587px de altura, domina o scroll → considerar `max-height:480px`.
- 🟡 Hero spec-line (a partir de 30 peças etc.) ainda não existe; quando entrar, testar dobra no mobile.
- 🔵 `.prow` sem `position:relative` explícito (pseudo `::before` pode vazar). `.wrap` padding 28px → 20px <480px. `.titem` padding 34/30 → 28/20 no mobile.

## Plano priorizado (orquestrador executa após go)
**P0 — Navegação mobile (bloqueador).** Abordagem recomendada: **hambúrguer que NASCE da pill** (não barra inferior, não comprimir links).
- <860px a pill mostra `[ALKIMIA]` + `[≡]` + `[Orçamento]`. Clique no ≡ → drawer full-screen branco (#fff) nascendo da pill; links centralizados Archivo 700 uppercase (`clamp(28px,8vw,48px)`), underline crescente; Orçamento repetido no fim do drawer; fecha no X / clique fora / clique em link (+scroll suave).
- CSS: classe `.nav-open`; drawer `position:fixed;inset:0;background:#fff;z-index:59` (pill em 60). JS: toggle de classe (já há `<script>`).
- Prós: mantém identidade da pill, padrão reconhecível, JS puro simples, CTA exposto 2x. Contra: 1 clique a mais.

**P1 —** Tap targets: `nav .btn` `min-height:44px`; `.vmute` 38→44px. · Ordem mobile da declaração: `.dvid` com `order:-1` (vídeo primeiro). · `@media(max-width:880px){.dvid{max-height:480px}}` (corte topo/base a confirmar c/ Marcos).

**P2 —** `.wrap` padding 20px <480px · `.titem` 28/20 <680px · `.prow{position:relative}` · mapa `height:260px` mobile (opcional).

**Sem mexer:** marquee, rodapé, mapa base, avaliações.

## Critérios de aceite / QA mobile (portão Marcos)
Referência 390px; testar 360 e 414.
- Nav: 4 links acessíveis no mobile; ≡ aparece <860px e some acima; clique fecha drawer + scroll; Orçamento sempre visível; drawer sem scroll-x.
- Tap: `.btn` e `.vmute` ≥44px; links do drawer ≥44px.
- Hero: h1 ≥34px legível; foto sem overflow; CTA acima da dobra a 390px.
- Declaração: empilha certo; vídeo não excede viewport; `.vmute` toca no iOS Safari.
- Produtos: `.prow` 1 coluna; split foto+lista empilha.
- Processo: steps 1 coluna <480px; crow 1 coluna.
- Identidade: pill visível em todo scroll; P&B mantido (sem acento); motion roda no mobile; ZERO overflow-x em qualquer seção.
- Regressão desktop: revalidar 1280/1440px após cada mudança (nav com links, split 2col, steps 4col, dgrid 2col).

## Decisões que dependem do Marcos antes do P1
1. "Quem é a Alkimia" no mobile: vídeo ANTES ou DEPOIS do texto?
2. Vídeo no mobile com `max-height:480px` (corte leve topo/base) — pode?

## Sequência
Marcos dá "go" → orquestrador executa P0 (nav) → QA a11y → portão Marcos → P1 → P2. Desktop não pode regredir (tudo encapsulado em media query).
