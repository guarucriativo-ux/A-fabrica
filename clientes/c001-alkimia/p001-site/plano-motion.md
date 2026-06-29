# Plano de Motion / "dar vida" ao site — Alkimia p001 (RASCUNHO p/ aprovação)
> agent-organizer, 2026-06-28. Objetivo: site no nível godaylight (vivo/moderno), sem jank, HTML/CSS/JS puro.

## Time
- Orquestrador: estuda godaylight ao vivo + implementa todo o código de uma vez + aplica ajustes do QA.
- `ui-designer`: especificação de interação final (timing/easing por seção) + redesenho da faixa de atributos → interaction-spec.md.
- `performance-engineer`: QA de performance (jank, compositing, reduced-motion, mobile) → performance-qa.md.
- (Fora: frontend-developer/React — stack é HTML puro; ux-researcher — direção já veio do Marcos.)

## Stack: JS puro + CSS (sem GSAP/Lenis)
IntersectionObserver (reveals/stagger), requestAnimationFrame (parallax/countUp), CSS transitions/keyframes. Anima SÓ `transform` e `opacity` (nunca height/width/top/margin). `will-change` só durante a animação. GSAP só se um dia houver scroll-scrub (ex: peça "desdobrando" no scroll) — hoje não.

## Decisões pendentes do Marcos
1. **Faixa de atributos** (a queixa "amadora"): **Opção A** (números grandes que CONTAM ao entrar na tela: 30+ peças · 4 sem. prazo · 100% algodão · 2021 — número é o "ícone", sem ícone) [RECOMENDADA] vs **Opção B** (manter 5 atributos, redesenhar ícones maiores/finos + entrada em stagger).
2. **Nav**: **dinâmico** (transparente no hero → preto sólido ao rolar, texto vira branco) [RECOMENDADO, resolve claro-vs-preto] vs fixo claro vs fixo preto.

## Motion por seção (CSS/JS puro)
- **Nav:** links com underline crescendo da esquerda no hover; fonte dos links Archivo SemiBold 600, 13px (resolve "fina demais"; wordmark mais pesado pra manter hierarquia); botão Orçamento com cursor-follow reativado (0.28s).
- **Hero:** entrada em stagger na carga (kicker→h1→sub→botão, translateY+opacity); foto com Ken Burns suave (scale 1.03→1, 1.8s).
- **Faixa atributos:** ver decisão (A = countUp via rAF, ease-out cubic, roda 1x ao entrar).
- **Marquee clientes:** 32s; hover abre letter-spacing do nome; pausa no hover.
- **Quem é a Alkimia:** os `<b>` ganham underline que "pinta" da esquerda (background-size 0→100%); stagger entre parágrafos.
- **Band oficina:** parallax suave (img a 30% do scroll, só transform; desativa <900px); caption fade da esquerda.
- **Produtos:** foto entra da esquerda / texto da direita (se encontram); `.prow` hover com barra vertical (scaleY); lista em stagger.
- **Acabamentos:** cards em stagger; hover com lift (translateY -3px + sombra suave); número com letter-spacing no hover.
- **Como funciona:** steps em stagger sequencial; `.crow` hover slide.
- **Avaliações:** estrelas aparecem uma a uma (stagger, scale 0.6→1).
- **CTA final:** headline com letter-spacing "fechando" na entrada; linha decorativa crescendo; cursor-follow no botão.

## Riscos / mitigações
Jank do cursor-follow → throttle com rAF (perf-engineer audita). Parallax mobile iOS → desativar <900px. will-change só durante anim. Reduced-motion → expandir o @media já existente p/ cobrir parallax/countUp/cursor/marquee. Manutenção → tudo em <script> comentado, sem toolchain; stagger observa todos os `.rv` (Gustavo adiciona item e funciona).

## Sequência
Marcos aprova (faixa A/B + nav + lista) → ui-designer faz interaction-spec.md → orquestrador implementa tudo de uma vez → performance-engineer audita → ajustes → portão Marcos.
