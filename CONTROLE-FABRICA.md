# A FÁBRICA — Manual de Operação & Board

> Documento central de gestão. Fonte da verdade do **modo de trabalho** e do **board de projetos**.
> Regra resumida vive na memória (`regra-modo-de-trabalho`); o detalhe completo vive aqui.

---

## 0. Modelo de negócio
Agência operada por IA. **Marcos = único humano / CEO**, faz a ponte com o cliente, entende a dor e aprova. O time de agentes (Claude Code) executa todas as frentes. **Vende-se o resultado** (site pronto, automação rodando, CRM configurado, peça publicável) — não horas. Ganha dinheiro entregando nível de agência sênior com custo marginal baixo, porque a força de trabalho são os agentes. **Qualidade alta é inegociável em toda entrega.**

---

## 1. Org chart

**Nível 1 — Liderança**
| Papel | Quem | Responsabilidade |
|---|---|---|
| CEO / Account | Marcos (humano) | Recebe a dor, define escopo, aprova entregas, fecha negócio |
| Gerente de Projeto / Organizador | Orquestrador (Claude principal) | Destrincha a dor, planeja quem faz o quê, orquestra agentes, controla qualidade |

**Nível 2 — Diretorias**
| Diretoria | Líder | Agentes |
|---|---|---|
| Criação & Marca | Orquestrador | brand-strategist, brand-voice-designer, graphic-designer, copywriter-specialist |
| Conteúdo & Social | Agentes | social-strategist, social-content-creator, content-strategist, content-editor |
| Tecnologia / Dev | Orquestrador + Agentes | architect, javascript-expert/typescript-expert/python-expert, database-architect |
| Automação & Sistemas | Orquestrador + Agentes | marketing-automation-expert, crm-specialist, martech-stack-architect |
| Performance & Tráfego | Agentes | social-ads-expert, conversion-optimizer, seo-expert, web-analytics-expert |
| QA & Revisão | Orquestrador | code-reviewer, content-editor, + QA visual do orquestrador |

**Divisão validada:** agentes = TEXTO (pesquisa, estratégia, copy, código). Orquestrador = único que vê/produz imagem (cura, trata, compõe, renderiza) e executa/roda código.

---

## 2. Workflow universal (qualquer demanda) — Shape Up + Kanban

Fases, dono e **portões do Marcos** (🚦):

| Fase | Dono | Entrada → Saída | Portão |
|---|---|---|---|
| 0 · INTAKE | Marcos | conversa com cliente → **Brief de Dor** | 🚦 valida o Brief |
| 1 · DISCOVERY | Orquestrador + agentes de pesquisa | Brief → **Documento de Discovery** (o que existe, o que falta, riscos) | 🚦 confirma o diagnóstico |
| 2 · ESCOPO & PLANO | Orquestrador | Discovery → **Plano de Produção** (entregáveis, agentes, sequência, riscos) | 🚦 **APROVA — libera a produção** |
| 3 · PRODUÇÃO | Orquestrador (+ agentes) | Plano → entregáveis (cada bloco salvo em `clientes/[cliente]/[projeto]/`) | — |
| 4 · QA | Orquestrador → Marcos | entregáveis → **QA cruzado com IDENTIDADE + APRENDIZADOS** → Relatório de QA | 🚦 aprova ou pede correção |
| 5 · ENTREGA | Marcos | entrega ao cliente, coleta feedback | — |
| 6 · RETRO | Orquestrador + Marcos | registra aprendizados na memória | — |

Ajuste fino (cor, texto, padding) após aprovação: orquestrador faz sem novo portão. Correção estrutural (refazer layout/arquitetura/fluxo): novo ciclo a partir da Fase 2.

**Brief de Dor (formato mínimo):** Cliente · Dor · Objetivo mensurável · Prazo · Restrições (orçamento/plataforma/identidade) · O que já tentou.

---

## 3. Método de decomposição da dor (4 perguntas)
1. **Qual o resultado final?** (entregável concreto e nomeado)
2. **Que tipo de trabalho predomina?** texto→agente lidera · visual/código→orquestrador lidera · misto→agentes geram insumo, orquestrador produz.
3. **Há dependências?** sequenciar (ex: copy só depois do branding; CRM só depois de mapear processo).
4. **Complexidade?** P (1 frente) = 1-2 agentes · M (2-3 frentes) = 3-4 agentes · G (multi-frente) = núcleos completos.

**Paralelismo:** dois agentes juntos só quando os outputs não dependem entre si. **1 agente** = escopo claro/domínio único. **Time** = pesquisa + produção + validação em sequência, cada um isolado pra não contaminar.

---

## 4. Linhas de produção (mini-time por frente)
1. **Identidade & Branding** — brand-strategist, brand-voice-designer, copywriter-specialist · orquestrador faz manual visual.
2. **Peças de Marketing** — brand-strategist, social-strategist, copywriter-specialist · orquestrador cura/trata/compõe/QA.
3. **Site & Landing** — website-intel, brand-strategist (Mapa de Identidade), conversion-optimizer, copywriter-specialist · orquestrador HTML/CSS/JS + QA.
4. **Captação de Lead** — conversion-optimizer, copywriter-specialist, email-copywriter · orquestrador monta landing + form.
5. **Tráfego Pago** — social-ads-expert, copywriter-specialist, conversion-optimizer · orquestrador faz criativos. *(Subir anúncio na plataforma = acesso do Marcos.)*
6. **Automação de Marketing** — marketing-automation-expert, email-copywriter, crm-specialist · orquestrador configura via API ou entrega doc.
7. **CRM** — business-analyst (mapeia AS-IS), crm-specialist, marketing-automation-expert · orquestrador configura via API ou guia passo a passo.
8. **Sistema & Automação Técnica** — business-analyst, architect, python-expert/javascript-expert · orquestrador implementa/testa/entrega código.

**Recorrência (quando vira retenção):** conteúdo contínuo, SEO, email marketing recorrente, análise de performance.

---

## 5. Time mínimo & escala
**Núcleo fixo (todo projeto):** brand-strategist · copywriter-specialist · social-strategist · website-intel.
**Núcleo técnico (sistema/automação/CRM):** business-analyst · marketing-automation-expert · crm-specialist · python-expert/javascript-expert.
**Núcleo tráfego (captação/ads):** social-ads-expert · conversion-optimizer · seo-expert.
Não buscar agente fora dos núcleos sem tarefa específica nomeada. Há ~521 instalados — o resto fica em standby.

---

## 6. Gatilho de criação
**"Explorar e perguntar é sempre livre. Produzir ou alterar em peso exige comando do Marcos."**
- EXIGE comando: gerar arquivo visual, licenciar foto Adobe Stock, escrever/reescrever código ou HTML estrutural, iniciar qualquer fase criativa (≥ Fase 2 sem portão), refazer/redesenhar algo existente, tratar imagem (exceto visualizar).
- LIVRE: ler/listar/explorar, analisar, perguntar, `asset_search` sem download, ajuste fino sob pedido já dado.

---

## 7. Riscos a evitar
1. **Contaminação entre projetos** (ex: Archivo Black+bloco vazou Guaru→Alkimia) — no briefing do agente dizer o que NÃO usar; no QA sinalizar elemento repetido 2+ vezes.
2. **Output vago do agente** — exigir campos concretos (hex, não "tons terrosos"); não seguir com campo indefinido.
3. **Orquestrador criando antes do portão** — parar e esperar comando.
4. **Multiplicar agentes sem necessidade** — padrão é orquestrador; agente é exceção justificada.
5. **Agente descrevendo visual que não viu** — orquestrador descreve o visual em texto ANTES de acionar brand-strategist.
6. **Perda de rastreabilidade** — salvar output de cada fase em arquivo.

---

## 9. Arquitetura de pastas

```
Desktop/A fábrica/
  CONTROLE-FABRICA.md          board + manual
  agentes/  referencias/       coleções e referências globais
  clientes/
    c000-a-fabrica/            a própria fábrica (cliente interno)
    c001-alkimia/              1º cliente real
      CLIENTE.md               dados fixos do cliente
      IDENTIDADE.md            mapa da marca (nível-cliente, reusado nos projetos)
      APRENDIZADOS.md          memória viva: feedback + correções acumulados
      PRIMER.md                onboarding do chat do cliente no ChatGPT (único usado fora da fábrica)
      PROJETOS.md              índice dos projetos do cliente
      p001-site/               projeto = instância de linha de produção
        STATUS.md  BRIEF.md
        fase-1-discovery/ … fase-4-qa/
        [entregáveis: index.html, assets/, …]
```

- **Nível-cliente** (compartilhado): `CLIENTE.md`, `IDENTIDADE.md`, `APRENDIZADOS.md`, `PRIMER.md`, `PROJETOS.md`.
- **Nível-projeto** (isolado): `STATUS.md`, `BRIEF.md`, pastas de fase, entregáveis.
- **Nomes:** cliente = `cNNN-nome` · projeto = `pNNN-linha` (reinicia por cliente) · controle em MAIÚSCULAS `.md` · assets em kebab-case.
- **Continuidade:** o STATUS é por PROJETO → caminho `clientes/[cliente]/[projeto]/STATUS.md`. Ver memória `metodo-continuidade`.
- **3 camadas:** GLOBAL = memória `.claude` · POR CLIENTE = `clientes/[cliente]/` · POR SESSÃO = efêmero.

---

## 10. Memória do cliente & validação de entrega

**Cada cliente aprende.** `APRENDIZADOS.md` (nível-cliente) acumula feedback + correções. Loop: Marcos pede alteração → corrige → registra a regra no encerramento → próxima entrega lê o arquivo no start-up e **injeta os aprendizados como restrição obrigatória no briefing do agente** (o agente não tem memória; o arquivo é a memória).

**Fronteira:** "vale só pra este cliente ou pra todos?" — só este → APRENDIZADOS do cliente; todos / erro de processo / ambiente técnico → memória global `.claude`. Na dúvida, no cliente; se repetir em 2+ clientes, promover a global.

**Validação em 2 camadas:**
- **Visual / on-brand = ORQUESTRADOR** (agentes não veem imagem). Checklist antes de mostrar ao Marcos:
  - [ ] Paleta dentro da identidade?  [ ] Logo/selo correto (tipo/posição/escala)?
  - [ ] Linguagem visual on-brand (product/type-forward conforme identidade)?
  - [ ] Nada marcado REPROVADO nos APRENDIZADOS está presente?
  - [ ] Tom de copy bate com a voz da marca + regras aprendidas?
  - [ ] CTA correto (canal/forma)?  [ ] Restrições técnicas (nº slides, extensão)?
  - Resultado: APROVADO / AJUSTE FINO (corrige e revalida) / REJEITAR E REFAZER. Só chega ao Marcos o que passa.
- **Por domínio = AGENTES:** content-editor (copy) · code-reviewer (código) · accessibility-tester (a11y) · business-analyst (lógica de fluxo) — revisam antes do QA visual.

**Anti-bloat:** registrar só padrão/preferência/restrição recorrente ou erro sistêmico. Não registrar correção trivial, nem o que já está no BRIEF/IDENTIDADE. Teto ~30 linhas por APRENDIZADOS.

---

# 8. BOARD DE PROJETOS (Kanban em arquivo)

> Mover o card do cliente entre as seções conforme avança. Modelo de card abaixo.

### 📥 INTAKE
- **c000 · A Fábrica (interno)** — backlog priorizado: p001-identidade → p002-site → p003-crm → p004-social → p005-captacao. Nenhum iniciado. Índice: `clientes/c000-a-fabrica/PROJETOS.md`.

### 🔎 DISCOVERY
_(vazio)_

### 📝 ESCOPO APROVADO
_(vazio)_

### 🏭 EM PRODUÇÃO
- **c001 · Alkimia · p001-site (Site + Catálogo web)** — linha 3 · EM PRODUÇÃO. Site v3 com vida/motion (estilo godaylight, P&B neutro): **nav pill flutuante centralizada** · hero foto full-bleed + texto pôster (Archivo Black) · **contador "+50.000 camisetas"** · faixa de clientes PRETA c/ logos brancos grandes + **carrossel que segue o mouse** · "Quem é a Alkimia" c/ **vídeo** (video-1.mp4, 9:16) · rodapé preto · mapa colorido. Motion sempre ativo (reduce-motion ignorado) e re-anima na navegação. **Pendente:** imgs 2–4 do hero (ChatGPT) → carrossel; construir `catalogo.html` (links Catálogo dão 404 hoje). Cockpit: `clientes/c001-alkimia/p001-site/STATUS.md`.
- **c001 · Alkimia · CAPTAÇÃO (1º cliente pagante)** — pesquisa de norte feita (`pesquisa-norte/`). NORTE: audiovisual c/ porta pro criativo. Plano de engajamento aprovado: caminho 50K→100K, 8 frentes, recorrência = IG mensal.
- **c001 · Alkimia · p002-catálogo** — ⛔ SUPERSEDED: PDF estático rejeitado pelo Marcos; catálogo migrou pra WEB no p001-site. Pasta = arquivo da tentativa.
- **c001 · Alkimia · conteúdo (teste workflow visual)** — workflow visual fechado ponta a ponta (prompt→prancha→crop 1080×1350). Concluído como teste.

### ✅ QA
_(vazio)_

### 👀 AGUARDANDO APROVAÇÃO
_(vazio)_

### 📦 ENTREGUE
_(vazio)_

### 🔁 RETRO
_(vazio)_

---

### Modelo de card
```
- **[Cliente]** — [tipo de demanda] · linha [nº] · [status curto]
  Dor: [resumo] · Prazo: [data] · Pasta: clientes/[cliente]/[projeto]/
```
