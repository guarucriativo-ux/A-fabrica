# STATUS — p002-site (Guaru Estúdio)
**Última atualização:** 2026-06-29 23h32
**Status atual:** v4 EM DESENVOLVIMENTO — efeito Tresmares (WaveSections + parallax) implementado mas NÃO aprovado visualmente. Retomar amanhã.

## PRÓXIMA SESSÃO — RETOMAR AQUI
**Problema central:** efeito de scroll geométrico estilo tresmarescapital.com/en/ não está satisfatório.
- Referência: colinas SVG quase invisíveis (tom sobre tom), camadas em parallax ao scroll
- Implementado: `TremWaves.jsx` (6 camadas, motion.path, useTransform), `WaveSection.jsx` (useMotionValue + RAF)
- Resultado atual: Marcos disse "não estamos chegando no resultado"
- Dev server: `cd "clientes/c000-a-fabrica/p002-site" && npm run dev` → localhost:5173/A-fabrica/
- Repo: https://github.com/guarucriativo-ux/A-fabrica (branch master, commit ea3fb69)

**PRÓXIMO PASSO:** Abrir o site + abrir tresmarescapital.com/en/ lado a lado, comparar pixel a pixel e decidir nova abordagem para o efeito (talvez canvas/WebGL simplificado, ou ajuste agressivo de cores/contraste).

## CORREÇÕES APLICADAS (Design Chief — aprovadas por Marcos)
- ✅ B1 — Menu mobile drawer funcional (JS toggle, overlay, ARIA, fecha por link)
- ✅ B2 — Cases: só Alkimia + faixa "novos cases chegando @guaruestudio"
- ✅ B3 — Contraste hero-sub: `rgba(240,240,236,0.78)`
- ✅ A1 — Lime em **vende.** e **cresce.** (não mais nas conjunções "que")
- ✅ A6 — line-height hero headline: `0.96`

## FERRAMENTAS DISPONÍVEIS NO PROJETO
- `motion` instalado via npm (pronto para migrar/complementar GSAP)
- MCP `@21st-dev/magic` ativo (componentes UI por linguagem natural)
- Cookbooks Anthropic em `cookbooks-claude/` (referência de padrões multi-agente)

## PENDÊNCIAS DE CONTEÚDO (Marcos precisa fornecer)
- [ ] Número de WhatsApp real (atual: `5511999999999`)
- [ ] Foto do Marcos (seção Sobre — placeholder `👤` no momento)
- [ ] Domínio final do site (canonical tag)
- [ ] Depoimento de cliente (Alkimia ou outro)
- [ ] Logos dos clientes para o marquee

---

## DECISÃO DO MARCOS (definitiva)

### Paleta aprovada
- **NÃO predominantemente escuro** — site v2 rejeitado por ser muito dark
- **Mesclar:** off-white + black + lime (#CCFF00)
- Fundo principal: **off-white (#F0F0EC)** — não preto
- Preto em seções de contraste (ex: hero, CTA final)
- Lima como acento em headlines, CTAs, separadores

### Referências aprovadas (apenas essas 3)
1. **onzamarketing.com.br** — estrutura emocional, logos de clientes, cases por resultado
2. **seokagency.com.br** — método em etapas, tabela comparativa, marquee de logos, founder bio
3. **anfi.com.br** — cases com imagem+categoria+headline, headline de sistema, parceiros

---

## O QUE CONSTRUIR (v3 — próxima versão)

### Paleta final
| Token | Cor | Uso |
|---|---|---|
| `--off-white` | `#F0F0EC` | Fundo principal (maioria das seções) |
| `--black` | `#0A0A0A` | Hero, CTA final, texto principal |
| `--lime` | `#CCFF00` | Headlines de destaque, CTAs, separadores |
| `--gray-light` | `#E8E8E4` | Cards, fundo alternativo |
| `--gray-text` | `#555550` | Corpo de texto sobre off-white |

### Estrutura de seções (síntese das 3 referências)
```
1. NAV — sticky, logo + links + CTA lime
2. HERO — fundo preto, headline grande com lime, subtítulo, 2 CTAs
3. MARQUEE — logos de clientes em loop contínuo (fundo off-white)
4. MÉTODO — 4 etapas numeradas (Briefing → Proposta → Produção → Entrega)
5. SERVIÇOS — 6 cards em grid (fundo off-white)
6. TABELA COMPARATIVA — Freelancer vs Agência grande vs Guaru
7. CASES — imagem + categoria + headline de resultado (Alkimia + 2 placeholders)
8. SOBRE/FOUNDER — foto do Marcos + texto + credenciais
9. NÚMEROS — countUp animado (12 anos, 50+ projetos, etc.)
10. CTA FINAL — fundo preto, headline grande lime, botão WhatsApp
11. FOOTER — off-white, logo, links, @guaruestudio
```

### Animações (manter do v2)
- GSAP + ScrollTrigger (scroll reveals)
- Cursor circular lima
- Loader com logo
- Text reveal hero (por palavra)
- CountUp nos números
- Parallax no watermark do hero
- Marquee em loop (novidade v3)
- Hover nas work cards (borda lima)

### Pendências de conteúdo (Marcos precisa fornecer)
- [ ] Número de WhatsApp real
- [ ] Foto do Marcos (seção Sobre)
- [ ] Domínio final do site
- [ ] Depoimento de cliente (Alkimia ou outro)
- [ ] Logos dos clientes para o marquee

---

## HISTÓRICO DE VERSÕES
- **v1** — reprovado: "fraco, sem animação, sem profissionalismo"
- **v2** — reprovado: "muito escuro, prefiro mesclar off-white/black/lime"
- **v3** — a construir no próximo chat

---

## DOCUMENTOS DE REFERÊNCIA
- `IDENTIDADE.md` — tom de voz, copy fundacional
- `assets-marca/VISUAL-BIBLE.md` — paleta, tipografia, categorias visuais
- `APRENDIZADOS.md` — feedback acumulado

## COMO RETOMAR NO PRÓXIMO CHAT
1. Ler este STATUS.md
2. Ler `IDENTIDADE.md`
3. Construir v3 direto — sem perguntar, sem pedir aprovação de estrutura
4. Fundo principal: off-white, não preto
5. Manter GSAP + cursor custom
