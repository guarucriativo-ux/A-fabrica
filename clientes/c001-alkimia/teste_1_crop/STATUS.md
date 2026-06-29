# STATUS — Alkimia · teste de geração visual (ChatGPT + crop)
Atualizado: 2026-06-27

Fase atual: TESTE do workflow visual (loop completo rodado).
Sessão ativa: nenhuma (chat antigo ficou pesado; Marcos vai retomar em chat novo).

## O que JÁ foi validado
- **Pipeline de crop FUNCIONA** — agora provado em 3 layouts:
  - tira horizontal 4-slides → `slides/` (1080×1350)
  - grid 2×2 quadrado → `slides2/` (1080×1080)
  - **grid 2×2 prancha 4:5 → `slides_final/` (1080×1350)** ← WORKFLOW COMPLETO FECHADO 2026-06-27
  - sharp reinstalado no scratchpad por sessão (efêmero); detecção de gutter por análise de pixel (`detect.js`) + corte por coordenada (`slice_final.js`).
- **Loop completo rodou** (social-strategist → copywriter → brand-strategist → prompt-crafter) e gerou o PROMPT FINAL do carrossel.
- **Teste end-to-end concluído:** prompt → prancha ChatGPT (`Crop_testefinal.png`, 1122×1402) → crop 4× 1080×1350. Gutters detectados limpos (vert x552-567, horiz y694-708 = 16px conforme spec). Nenhum vazamento de borda, copy/CTA intactos.

## PRÓXIMO PASSO (retomar aqui)
- Workflow visual validado de ponta a ponta. Aguardando decisão do Marcos sobre adotar/registrar (ver "Decisões em ABERTO").
- Obs de marca (mérito do Marcos): headlines saíram em ALL-CAPS pôster bold — tensiona IDENTIDADE (Archivo sentence case, sem all-caps gritando) e APRENDIZADOS (REPROVADO Archivo Black pôster). Aceitável pra teste de pipeline; revisar se virar entrega real.

## Decisões em ABERTO (Marcos disse "aguarde" — NÃO registrar até ele confirmar)
- Adotar o **workflow dual** (prancha=conceito/preview · slide-a-slide=entrega final em alta) como oficial da Linha 2?
- Registrar o **método de geração visual consolidado** (workflow dual + spec de prancha/slides) no metodo-geracao-visual.md?
- Formato IG confirmado por Marcos: **4:5 (1080×1350)**. (1:1 só quando composição for quadrada por natureza.)
- Organização de conteúdo: padrão de pastas definido (p002-social/AAAA-MM/data_tema/fonte+final) mas Marcos pediu "usar sem registrar"; o teste atual está em `teste_1_crop/` (pasta dele).

## Contexto que o chat novo já tem (via MEMORY.md, carregado sozinho)
Todas as regras da fábrica: modo de trabalho, arquitetura de pastas, continuidade, memória por cliente, geração visual (ChatGPT=diretor de arte). Cockpit da Alkimia: CLIENTE/IDENTIDADE/APRENDIZADOS/PRIMER (reposicionada: camisetas pra empresas/audiovisual, estética editorial, P&B).
