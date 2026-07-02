# STATUS — Guaru App (ERP Offline)

> Atualizado em: 2026-07-01
> Regra: antes de abrir sessão, leia. Antes de fechar, atualize.

## O que é

Painel ERP offline (`Guaru_App.html`) que lê `ERP_Guaru_Estudio.xlsx` via SheetJS.
Roda via `file://` no Chrome ou via `npx serve` (porta 4444, configurado em `.claude/launch.json`).

Arquivos de código (todos na raiz de `Maquina de Marketplaces/`):
- `Guaru_App.html` — HTML principal + PIN + nav + sheets
- `app.js` — toda lógica: render, filtros, lançamentos locais
- `guaru-visual-v2.css` — layout dark-first + componentes
- `design-tokens.css` — tokens de cor/tipografia/espaço
- `guaru-motion.js` — ripple, stagger, tab-enter, countup
- `guaru-sparkline.js` — mini gráficos de linha
- `erp-data.js` — cache IndexedDB do xlsx (TTL 7 dias)
- `chart.umd.min.js`, `xlsx.full.min.js` — libs bundled

## Estado atual (2026-07-01)

### ✅ Funcionando

| Feature | Detalhe |
|---|---|
| PIN de acesso | SHA-256 hash no localStorage |
| Sidebar + bottom nav | Sem freezes — 3 bugs corrigidos (ver abaixo) |
| Dashboard | KPIs, donuts Chart.js, alertas de vencimento, próximas contas |
| Tabelas filtráveis | Fornecedores, Clientes, Produtos, Vendas, A Pagar, A Receber |
| Filter bar dark | `.filter-select` com design tokens — sem branco hardcoded |
| Tema claro/escuro | Toggle no header, salvo em localStorage |
| Busca global | Filtra qualquer tabela em tempo real |
| **Novo Lançamento** | Form completo no action sheet — salva em `localStorage['guaru-lancamentos']` |
| Lançamentos locais | Aparecem ANTES das linhas do xlsx em A Pagar / A Receber |
| Form dinâmico | Tipo "Conta a Receber" esconde Categoria, renomeia labels |

### 🔴 Bugs corrigidos nesta sessão

1. **Menu travava** — ripple spans acumulando (sem `animationend` com `prefers-reduced-motion`), stagger bubbling para `#content`, `syncActiveNav` MutationObserver em cascata
2. **Selects brancos** — `renderFilterBar()` tinha `background:#fff` hardcoded, trocado por `.filter-select` CSS
3. **Botões Receber/Pagar do hero** — chamavam `setFilter(string)` em vez de navitar para a aba correta

### 🟡 Pendente / Próxima sessão

| Item | Detalhe |
|---|---|
| **Chat inteligente** | Usuário mencionou. Não existe ainda. A definir: assistente IA no app que responde perguntas sobre dados financeiros (Claude API?). Pedir ao usuário o que exatamente quer. |
| Ajustes no form de lançamento | Usuário disse "está legal, depois ajustamos" — sem especificação ainda |
| Vencimento qualitativo | Coluna Vencimento de A Pagar tem "Mensal"/"Anual" (texto), não data real — alerta automático não funciona sem isso |
| Deletar lançamento local | Não tem UI para remover entradas do localStorage |

## Como rodar

```
# Terminal (na pasta raiz do projeto A fábrica):
npx serve "Maquina de Marketplaces" -l 4444

# Ou via Claude Code preview:
preview_start("guaru-app")  # config já está em .claude/launch.json
```

Depois abrir `http://localhost:4444/Guaru_App.html` no Chrome.
O xlsx precisa ser carregado manualmente na primeira vez (botão "Conectar Planilha") — depois fica em cache IndexedDB por 7 dias.

## Arquitetura localStorage

- `guaru-pin-hash` — hash SHA-256 do PIN
- `guaru-lancamentos` — array JSON de lançamentos manuais
  - Cada entrada: `{ id, tipo, data, descricao, categoria, valor, vencimento, status }`
  - `tipo: "apagar"` → aparece em Contas a Pagar
  - `tipo: "areceber"` → aparece em Contas a Receber
