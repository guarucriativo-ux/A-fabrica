# STATUS — p002-site (Guaru Estúdio)
**Última atualização:** 2026-07-01
**Status atual:** SITE PAUSADO — reformulação estratégica do negócio em andamento.

---

## PRÓXIMA SESSÃO — RETOMAR AQUI

O site volta depois que o **negócio estiver posicionado**. Não adianta construir vitrine sem saber o que vender.

**Próximos passos reais:**
1. Definir o que Marcos entrega **essa semana** (portfólio mínimo)
2. Escolher 2-3 clientes locais para laboratório
3. Reconstruir identidade do @guaruestudio com prova social
4. Site retoma quando tiver casos reais para mostrar

---

## CONTEXTO DA REFORMULAÇÃO (2026-07-01)

**Modelo de negócio consolidado:**
- Entra pelo produto físico (gráfica via revenda: givonline, cartoesmaisbarato, DTF local)
- Escala para serviços digitais (posts, site, CRM, delivery, tráfego)
- Operação leve: 100% Marcos + Fábrica (IA)
- Cliente ideal: pequeno empreendedor — laboratório no Guarujá, depois escala remota

**Referência estudada:** Adesivo Rápido — param no produto, Guaru entrega a transformação.

**@guaruestudio hoje:** 3 posts, 45 seguidores. Ponto de partida real, sem drama.

---

## ESTADO TÉCNICO DO SITE (para retomar quando chegar a hora)

- Stack: React + Vite + Framer Motion + Lenis
- Dev: `cd clientes/c000-a-fabrica/p002-site && npm run dev` → localhost:5173/A-fabrica/
- Último estado: v4, efeito Tresmares implementado mas não aprovado visualmente
- Conflito técnico: `useScroll` Framer não funciona com Lenis 1.3.25 — usar RAF + `getBoundingClientRect()`
- Repo: https://github.com/guarucriativo-ux/A-fabrica (branch master, commit 2a1f429)

## CORREÇÕES APLICADAS ANTERIORMENTE (aprovadas por Marcos)
- ✅ B1 — Menu mobile drawer funcional
- ✅ B2 — Cases: só Alkimia + faixa "novos cases chegando @guaruestudio"
- ✅ B3 — Contraste hero-sub: `rgba(240,240,236,0.78)`
- ✅ A1 — Lime em **vende.** e **cresce.**
- ✅ A6 — line-height hero headline: `0.96`

## PENDÊNCIAS DE CONTEÚDO (continuam válidas para quando retomar)
- [ ] Número de WhatsApp real
- [ ] Foto do Marcos (seção Sobre)
- [ ] Domínio final do site
- [ ] Depoimento de cliente
- [ ] Logos dos clientes para o marquee
