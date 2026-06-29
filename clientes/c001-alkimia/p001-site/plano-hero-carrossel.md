# Plano — Hero Carrossel Alkimia (RASCUNHO p/ aprovação do Marcos)
> agent-organizer, 2026-06-28. Substitui o hero mosaico (rejeitado). Portão: Marcos aprova antes de produzir.

## Conceito
Hero = UMA foto forte por vez, em CARROSSEL. Estilo da foto: editorial, produto em contexto (ref. do Marcos: camiseta em corrimão rústico, luz natural, peça como herói). Cada slide TEMÁTICO com copy própria. Foto TRATADA (gradiente/escurecer só na zona da copy) pra legibilidade — sem engolir a peça.

## Equipe (agentes reais + orquestrador)
- **copywriter-specialist** → copy por slide (headline ≤8 palavras + apoio ≤12), passa pelas travas do mapa-mensagem (hero = capacidade, audiovisual implícito-zero). Output: copy-hero-carrossel.md.
- **messaging-architect** → valida cada slide vs mapa-mensagem (não gritar audiovisual; cada slide abre ângulo diferente; léxico proibido). Check de saída.
- **ORQUESTRADOR** → (C) sourcing+tratamento das fotos (Adobe Stock → escurecer/gradiente/crop full-bleed); (D) build do carrossel (HTML/CSS/JS puro, auto-advance 5s, pause on hover, dots, setas, reduced-motion, touch mobile); QA.

## Slides recomendados: 4 (não 5)
1. **Camiseta / produto-base** — carro-chefe, define o tom (foto estilo da ref.).
2. **Serigrafia/silkscreen** — técnica mais citada; DTF entra na copy de apoio (não merece slide próprio).
3. **Bordado + Oversized/frio** — acabamento sofisticado + peça que mais cresceu.
4. **Ecobag** — fecha com o nicho diferente, sinaliza amplitude.
- Opção 5º slide (se Marcos quiser): **Polo + Dry-fit / uniforme profissional** (ângulo B2B/corporativo).

## Sequência
1. **Marcos aprova nº de slides + temas** (sem isso o copywriter escreve no escuro).
2. copywriter → copy-hero-carrossel.md.
3. messaging-architect valida (máx. 1 ciclo de ajuste).
4. (PARALELO) Orquestrador busca no Adobe Stock 2–3 candidatos por slide → **Marcos aprova a foto** → orquestrador trata (gradiente/crop).
5. Orquestrador builda o carrossel (copy aprovada + fotos tratadas).
6. QA (legibilidade, P&B preservado, peça herói, peso das imagens, auto-advance/pause, mobile).
7. Portão Marcos (screenshots + preview).

## Riscos
foto fraca em full-bleed (→ aprovar foto antes de tratar) · copy ilegível (gradiente só na zona da copy) · carrossel pesado (WebP q80, lazy-load slides 2-4) · slides soando iguais (cada um abre ângulo diferente; messaging veta redundância) · cor vazando o P&B (buscar foto monocromática/desaturar) · carrossel confuso no mobile (dots + contador 1/4 + swipe).
