# A Fábrica — Documento de Briefing para Colaboração Externa

## O que é a Fábrica

A Fábrica (operada sob o nome Guaru Estúdio, guarucriativo@gmail.com) é uma agência de serviços digitais onde o único humano é o fundador, Marcos. Todo o trabalho de execução é feito por um time de agentes de IA rodando dentro do Claude Code no Windows. A Fábrica vende resultado — site pronto, carrossel publicável, automação funcionando, CRM configurado — não horas de trabalho. O modelo ganha dinheiro entregando qualidade de agência sênior com custo marginal baixo, porque a força de trabalho é composta de agentes.

A Fábrica resolve dores de empreendedores em múltiplas frentes: identidade visual, peças de marketing, sites e landing pages, captação de leads, tráfego pago, automação de marketing, CRM e sistemas sob medida. Qualquer combinação dessas frentes pode ser acionada para um mesmo cliente.

---

## Modelo de Negócio

- **Cliente chega com uma dor.** Marcos faz a interface com o cliente, entende o problema e formula o briefing.
- **Marcos passa a dor para o time de agentes.** O orquestrador (Claude principal) recebe o briefing, decompõe em tarefas e aciona os agentes certos.
- **O time executa.** Agentes pesquisam, criam estratégia, escrevem copy e código. O orquestrador produz o visual, roda o código e entrega.
- **Marcos aprova nos portões.** Há portões de aprovação obrigatórios antes de qualquer produção grande começar. Marcos dirige o processo; o time executa dentro dos limites aprovados.
- **Entrega de nível alto é inegociável.** Não importa se é um carrossel ou um sistema de automação — a qualidade tem que ser de agência competente.

---

## Time e Papéis

O time funciona como uma empresa com org chart real:

**CEO / Account — Marcos (humano)**
Único ponto de contato com o cliente. Define escopo, aprova portões, fecha negócio. Não executa tarefas de produção.

**Organizador / Gerente de Projeto — Orquestrador (Claude principal, sessão interativa)**
Recebe a dor do Marcos, decompõe em tarefas, aciona os agentes certos na ordem certa, monitora qualidade, faz QA visual e entrega. É o único que vê imagens e executa código diretamente no sistema.

**Time de Agentes — Subagentes especializados (texto puro)**
Cerca de 521 agentes instalados, organizados em núcleos:

- Núcleo de Marca e Criação: brand-strategist, brand-voice-designer, copywriter-specialist
- Núcleo de Conteúdo e Social: social-strategist, social-content-creator, content-editor
- Núcleo de Tecnologia: architect, javascript-expert, python-expert, typescript-expert, database-architect
- Núcleo de Automação e CRM: marketing-automation-expert, crm-specialist, martech-stack-architect
- Núcleo de Performance: social-ads-expert, conversion-optimizer, seo-expert, web-analytics-expert
- Núcleo de QA Textual: code-reviewer, content-editor, accessibility-tester, business-analyst

**Divisão sagrada e inegociável:**
- Agentes = texto puro. Eles pesquisam na web, criam estratégia, escrevem copy e código. Não veem imagem, não geram pixel, não executam arquivo diretamente.
- Orquestrador = único que vê imagem. Faz curadoria de foto (Adobe Stock), tratamento de imagem (ferramentas Adobe via MCP), composição (SVG renderizado para PNG via Node/resvg), QA visual e entrega final.

---

## Como Operamos no Claude Code

O ambiente é Claude Code rodando no Windows. Os agentes são arquivos `.md` instalados em `.claude/agents/`. O orquestrador aciona subagentes quando a tarefa exige especialidade de domínio ou pesquisa real na web.

**Ferramentas disponíveis:**
- WebSearch e WebFetch: para pesquisa de mercado, extração de sites (Firecrawl via website-intel), captura de Instagram (puppeteer headless)
- Adobe MCP: curadoria no Adobe Stock (asset_search, asset_license_and_download_stock), tratamento de imagem (image_apply_monochromatic_tint, image_add_grain, image_apply_halftone, image_remove_background, image_generative_expand para outpainting)
- Node/resvg: renderização de SVG para PNG com fontes do Google Fonts embutidas
- Claude_Preview MCP: preview de sites no browser
- Bash/PowerShell: execução de código, movimentação de arquivos

**Critério para acionar agente vs. orquestrador resolver sozinho:**
Aciona agente quando a tarefa é texto puro com necessidade de pesquisa real ou especialização de domínio profunda. O orquestrador resolve sozinho quando a tarefa é visual, técnica de arquivo, ou quando o contexto necessário já está na sessão. Cada chamada de agente tem custo e latência — só acionar com necessidade concreta.

---

## Fluxo de um Projeto do Início ao Fim

Todo projeto — independente do tipo — passa pelas mesmas 7 fases:

**Fase 0 — Intake** | Dono: Marcos
Marcos recebe a dor do cliente e escreve o Brief de Dor: cliente, problema, objetivo mensurável, prazo, restrições.
Portão 0: Marcos valida o Brief. Sem Brief claro, nada avança.

**Fase 1 — Discovery** | Dono: Orquestrador + Agentes
O orquestrador lê tudo que já existe na pasta do cliente. Agentes de pesquisa entram conforme o tipo: brand-strategist pesquisa nicho e concorrentes; website-intel extrai o site real do cliente; o orquestrador captura Instagram e descreve a identidade visual em texto para os agentes.
Portão 1: Marcos confirma se o diagnóstico bate com o que ele sabe do cliente.

**Fase 2 — Escopo e Plano** | Dono: Orquestrador
Lista de entregáveis concretos, sequência de agentes, dependências, estimativa de volume (P/M/G), riscos identificados.
Portão 2: Marcos aprova o Plano de Produção. Este portão libera a produção. Sem aprovação, nenhuma fase criativa começa.

**Fase 3 — Produção** | Dono: Orquestrador + Agentes
Execução por blocos conforme a linha de produção acionada. Cada bloco salva seu output em arquivo antes de passar para o próximo. Nenhuma produção roda sem o Plano aprovado.

**Fase 4 — QA** | Dono: Orquestrador (primário) + Marcos (final)
O orquestrador cruza cada entregável contra o IDENTIDADE.md e o APRENDIZADOS.md do cliente. Agentes especializados validam copy (content-editor), código (code-reviewer) e acessibilidade (accessibility-tester) conforme o tipo de entrega. O Marcos vê o entregável só depois de passar no QA interno.
Portão 3: Marcos aprova ou pede correção. Ajuste fino executa direto. Correção estrutural volta ao Portão 2.

**Fase 5 — Entrega** | Dono: Marcos
Marcos entrega ao cliente e coleta feedback.

**Fase 6 — Retro** | Dono: Orquestrador + Marcos
Aprendizados registrados em APRENDIZADOS.md do cliente e, se a regra vale para todos os clientes, na memória global da fábrica.

---

## Linhas de Produção Disponíveis

Cada tipo de demanda tem um mini-time pré-definido:

| Linha | O que entrega | Agentes principais |
|---|---|---|
| 1 — Identidade e Branding | Logo, paleta, tipografia, tom de voz | brand-strategist, brand-voice-designer, copywriter-specialist |
| 2 — Peças de Marketing | Carrossel, post, peça gráfica on-brand | brand-strategist, social-strategist, copywriter-specialist + orquestrador (visual) |
| 3 — Site e Landing Page | HTML/CSS/JS, product-forward, on-brand | website-intel, brand-strategist, conversion-optimizer, copywriter-specialist + orquestrador (build) |
| 4 — Captação de Lead | Funil, isca digital, página de captura | conversion-optimizer, copywriter-specialist, email-copywriter + orquestrador (landing) |
| 5 — Tráfego Pago | Estratégia de campanha, criativo, briefing de anúncio | social-ads-expert, copywriter-specialist, conversion-optimizer + orquestrador (criativo visual) |
| 6 — Automação de Marketing | Fluxos de email, gatilhos, nutrição de lead | marketing-automation-expert, email-copywriter, crm-specialist |
| 7 — CRM | Pipeline de vendas, configuração, integração | business-analyst, crm-specialist, marketing-automation-expert |
| 8 — Sistema e Automação Técnica | Scripts, integração de APIs, bots, webhooks | business-analyst, architect, javascript-expert ou python-expert + orquestrador (execução) |

---

## Como Organizamos Arquivos e Contexto

A Fábrica opera com vários terminais abertos ao mesmo tempo, cada um atendendo um cliente diferente. Para não perder contexto entre sessões, adotamos uma arquitetura de pastas e um ritual de continuidade.

**Árvore de diretórios raiz:**
```
Desktop/A fábrica/
  CONTROLE-FABRICA.md   ← board Kanban global (todos os clientes, todas as fases)
  agentes/              ← agentes instalados (não mexer)
  referencias/          ← banco de referências visuais globais
  clientes/
    c000-a-fabrica/     ← a própria fábrica como cliente interno
    c001-alkimia/       ← cliente externo #001
    c002-[nome]/        ← próximo cliente
```

**Padrão de pasta por cliente (suporta múltiplos projetos):**
```
clientes/c001-alkimia/
  CLIENTE.md            ← dados fixos (contato, segmento, canais)
  IDENTIDADE.md         ← mapa de identidade da marca (compartilhado entre projetos)
  APRENDIZADOS.md       ← feedbacks e regras acumuladas (compartilhado entre projetos)
  PROJETOS.md           ← índice dos projetos ativos e encerrados
  p001-site/            ← Projeto #001 — Site
    STATUS.md           ← cockpit do projeto (fase atual, próximo passo, portão pendente)
    BRIEF.md            ← dor e escopo (congela após Portão 2)
    fase-1-discovery/
    fase-2-escopo/
    fase-3-producao/
    fase-4-qa/
    index.html          ← entregável final
  p002-social/          ← Projeto #002 — Social (quando existir)
```

**Três camadas de contexto sem sobreposição:**
- Global: `.claude/projects/.../memory/` — regras da fábrica que valem para todos os clientes (modo de trabalho, erros sistemáticos, método de produção)
- Por cliente: `clientes/[cliente]/` — identidade, aprendizados, briefings, entregáveis específicos deste cliente
- Por sessão: efêmero, existe só na memória do chat ativo. Se não foi salvo em arquivo, considera-se perdido.

**Ritual de continuidade (regra de ouro):**
Antes de abrir qualquer chat: lê o STATUS.md do projeto. Antes de fechar qualquer chat: atualiza o STATUS.md.

O STATUS.md contém: fase atual, próximo passo, portão pendente (sim/não), sessão ativa (aberta/nenhuma), última ação concluída, lista de arquivos relevantes para o próximo chat.

Convenção anti-conflito: 1 terminal ativo = 1 cliente por vez. O campo "Sessão ativa" no STATUS.md age como trava leve — se estiver "aberta", o próximo terminal pergunta ao Marcos antes de continuar.

---

## Como o Cliente "Aprende" — Memória Acumulada

Cada cliente tem um `APRENDIZADOS.md` que cresce com o tempo. Ele registra o que foi aprovado, o que foi reprovado e as regras derivadas dos feedbacks do Marcos.

Formato de cada entrada:
```
data | tipo | descrição
```

Tipos: APROVADO, REPROVADO, REGRA, PREFERÊNCIA, FIXO.

Exemplo real (Alkimia):
```
2026-06-27 | REPROVADO   | Acento laranja — marca é P&B, nenhuma cor de acento
2026-06-27 | REPROVADO   | Archivo Black + bloco invertido — clichê contaminado
2026-06-27 | APROVADO    | Selo circular como assinatura no footer e emendas de seção
2026-06-27 | REGRA       | Copy: direto e técnico. Nunca "arte" ou "criatividade"
```

No início de cada sessão do cliente, o orquestrador lê o APRENDIZADOS.md e injeta as regras relevantes no prompt dos agentes como restrições obrigatórias. O agente não "lembra" — ele recebe o contexto construído. O aprendizado está no arquivo, não no agente.

Quando um feedback é específico do cliente, fica no APRENDIZADOS.md dele. Quando revela um erro sistemático que vale para todos os clientes, vai para a memória global da fábrica.

---

## O que Conseguimos e o que NÃO Conseguimos Entregar

**Conseguimos:**

- Identidade visual completa (paleta, tipografia, logo em SVG, tom de voz, manual básico)
- Peças gráficas on-brand (carrossel, post, banner) compostas via SVG renderizado para PNG com foto tratada do Adobe Stock
- Sites e landing pages em HTML/CSS/JS, responsivos, on-brand, com QA de identidade
- Copy para qualquer formato (social, email, landing, ads, produto)
- Configuração de CRM (HubSpot, Pipedrive) via API ou guia passo a passo para o cliente implementar
- Fluxos de automação de marketing (sequências de email, gatilhos comportamentais, lead scoring)
- Sistemas e integrações técnicas (scripts Python/JavaScript, webhooks, integração de APIs)
- Estratégia de tráfego pago com criativos e briefing completo de campanha

**Não conseguimos (limites honestos):**

- Geração de imagem por IA de texto para imagem: o ambiente Adobe só tem outpainting (image_generative_expand). Não há Midjourney, DALL-E nem Firefly full disponível. Fotos vêm do Adobe Stock (curadoria real, não geração).
- Subir anúncio em plataforma: Meta Ads, Google Ads e similares exigem login humano. O time entrega o criativo e o briefing; Marcos sobe na plataforma.
- Login em serviços externos em nome do cliente: qualquer ação que exige credencial do cliente é executada pelo Marcos, não pelo time.
- Teto de qualidade: "agência competente". Para resultados verdadeiramente fora da curva em fotografia autoral ou ilustração, é necessário um designer humano no polimento final.

---

*Documento gerado em 2026-06-27. Representa o estado operacional atual da Fábrica — Guaru Estúdio.*
