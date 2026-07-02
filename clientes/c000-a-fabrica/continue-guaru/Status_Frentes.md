# Status das Frentes — Guaru 2.0

> Criado em 21/06/2026. Antes de abrir/expandir qualquer frente (aqui ou no Cowork), checar este
> arquivo primeiro — ele existe pra evitar abrir trabalho novo enquanto ainda não há venda real.

## Critério dos tiers

- **🟢 Tier 1 — Foco até a primeira venda real.** Única prioridade de construção agora.
- **🟡 Tier 2 — Manutenção leve.** Já existe, só rodar/ajustar — não expandir estrutura.
- **🔴 Tier 3 — Congelado.** Só registrar ideia/aprendizado — não construir nada novo até ter venda validada.

Se uma ideia nova surgir e não se encaixar limpo em Tier 1, ela é Tier 3 por padrão até o usuário
sinalizar explicitamente que a fase mudou.

## 🟢 Tier 1 — Foco até a primeira venda real

| Frente | Onde está | Falta exatamente isso |
|---|---|---|
| Máquina de Marketplaces | `Maquina de Marketplaces/README.md` | Comprar lote piloto GIV (250un) → produzir arte/foto do Kit Doceria → publicar 1 SKU na Shopee (CNPJ/Bling/IE já prontos) |
| Hospedagem do site | `Tabela de preços/` + domínio `guaruestudio.com.br` (comprado 21/06/2026) | Decidir hospedagem (Netlify/Vercel) + apontar DNS — sem isso o domínio comprado não serve pra nada |

## 🟡 Tier 2 — Manutenção leve (não expandir)

| Frente | Status | Ação pendente |
|---|---|---|
| Financeiro/ERP | `lancar.py`/`registrar.py` em uso; `sync_produtos.js` e `organizar_arquivos_soltos.js` corrigidos em 21/06/2026 (rodam via Tarefa Agendada do Windows, zero custo de IA) | Fechar gap aberto: coluna "Vencimento" (Contas a Pagar) tem texto qualitativo ("Mensal"/"Anual"), não data real — sem isso não dá pra automatizar o alerta de vencimento sem custo de IA |
| Infra Dispatch/Remote Control | Pareada e funcionando (ver `contexto/guaru-cowork-master.md`) | Rotina de nuvem `guaru-radar-oportunidades-semanal` pausada em 21/06/2026 por custo (pool de uso de IA compartilhado entre Cowork/Code/Dispatch/rotinas) — reativar só quando justificar |
| Instagram @guaruestudio | Pilares e cadência já definidos (`Marketing/Estudo_e_Modelo_Instagram_Guaru_Estudio.md`) | Só executar o calendário já decidido — produção barata, não construção nova |

## 🔴 Tier 3 — Congelado até ter venda validada

| Frente | Arquivo | Por quê pausar |
|---|---|---|
| Automação financeira via WhatsApp | `Marketing/Arquitetura_WhatsApp_Lancamento_Automatico.md` | Regra do próprio `CLAUDE.md`: fase de pesquisa, não implementar direto. (Nome do arquivo confunde — é sobre lançar *gasto* na planilha via WhatsApp, não lançamento de produto) |
| Claude Design / Postiz | `Marketing/Guia_Claude_Design.md` | Pesquisa feita, zero implementação — ok ficar só registrado |
| Visão "vender orquestração de IA" | `Marketing/Estudo_Modelo_MazyOS_e_Oportunidade_Servico_IA.md`, `Marketing/Pesquisa_Mercado_Servico_Automacao_IA.md` | Visão de longo prazo — não deve competir com foco de venda agora |

## Fora deste sistema de tiers

| Frente | Onde está | Por quê está fora |
|---|---|---|
| Guaru Tech | `Desktop/Guaru Tech/README.md` | Marca separada do Guaru Estúdio — desenvolvimento de software/sites pra terceiros (branding como parte do pacote). Já gera caixa (1º cliente: Alkimia), então não se aplica o freio de "pré-faturamento" deste arquivo. Mantida fora do Tier 1/2/3 pra não confundir com as frentes do Guaru Estúdio. |

## Por que isso existe

Auditoria em 21/06/2026 encontrou dois sintomas de fragilidade reais: automações documentadas como
ativas que não existiam de fato, e dado financeiro qualitativo onde devia ter data real. Sintoma de
muitas frentes avançando em paralelo sem freio central, num negócio ainda pré-faturamento. Este
arquivo é o freio — revisar e mover itens entre tiers conforme a fase do negócio mudar.
