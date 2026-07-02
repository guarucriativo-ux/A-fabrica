# Guaru App — UX Specification v2 (Redesign 2026)

**Autor:** ux-designer  
**Data:** 2026-07-01  
**Arquivo base analisado:** `Guaru_App.html` + `app.js` (Sprint 3)  
**Status:** Pronto para implementação por javascript-pro + frontend-developer

---

## Contexto de redesign

O app atual usa sidebar fixa de 220px que desaparece no mobile, deixando a navegação sem destino fixo. O redesign introduz bottom nav em mobile e sidebar compacta de ícones em desktop, mantendo compatibilidade total com os IDs e data-tabs que o `app.js` já usa.

As abas existentes confirmadas no código:  
`dashboard` / `fornecedores` / `clientes` / `produtos` / `vendas` / `apagar` / `areceber`

---

## 1. ESTRUTURA DE LAYOUT

### Mobile (< 768px) — padrão principal

```
┌─────────────────────────────┐
│ TOPBAR (56px) — sticky      │  greeting + busca + theme toggle
├─────────────────────────────┤
│ #filterbar (quando ativo)   │  injetado pelo app.js
├─────────────────────────────┤
│                             │
│ #content (scroll livre)     │  conteúdo da aba ativa
│                             │
│                             │
├─────────────────────────────┤
│ BOTTOM NAV (72px + safe)    │  5 destinos fixos
└─────────────────────────────┘
```

O `padding-bottom` do `#content` deve ser `calc(72px + env(safe-area-inset-bottom))` para não ficar por baixo do bottom nav.

### Desktop (>= 1024px)

```
┌──────┬──────────────────────────────┐
│SIDE  │ TOPBAR (56px) — sticky       │
│BAR   ├──────────────────────────────┤
│(72px)│ #filterbar (quando ativo)    │
│icons │──────────────────────────────│
│only  │                              │
│      │ #content (scroll)            │
│      │                              │
└──────┴──────────────────────────────┘
```

A sidebar passa de 220px (atual) para 72px, exibindo apenas ícones. Ao hover em cada ícone, um tooltip surge à direita com o nome da aba.

### Tablet (768px – 1023px)

Usa layout mobile (bottom nav) mas com padding lateral de 24px e grid de KPIs em 3 colunas.

---

## 2. TOPBAR

### Especificações de estrutura

```
[ESQUERDA: greeting]    [CENTRO: vazio/título]    [DIREITA: busca + tema]
```

| Propriedade | Valor |
|---|---|
| Altura | 56px |
| Position | `sticky; top: 0; z-index: 100` |
| Background | `rgba(7,11,20,0.8)` no tema dark; `rgba(255,255,255,0.85)` no tema light |
| Backdrop filter | `blur(20px) saturate(180%)` |
| Separador inferior | `border-bottom: 1px solid var(--border)` |
| Padding interno | `0 16px` (mobile) / `0 24px` (desktop) |

### Lado esquerdo — Greeting (mobile) / Título ativo (desktop)

**Mobile:**
```html
<div class="greeting">
  <span class="greeting-name">Olá, Marcos 👋</span>
  <span class="greeting-date"><!-- data atual via JS: "Terça, 01 jul" --></span>
</div>
```

- `.greeting-name`: `font-size: 15px; font-weight: 600; color: var(--text-primary)`
- `.greeting-date`: `font-size: 11px; color: var(--text-secondary); display: block; margin-top: 1px`

**Desktop:** substitui o greeting pelo `#tab-title` (já existente no `app.js`) reposicionado para o lado esquerdo da topbar, `font-size: 18px; font-weight: 700`.

### Centro

Vazio em mobile. Em desktop: nada (título já está à esquerda).

### Lado direito

#### Campo de busca (mobile)

Estado padrão: ícone de lupa (`24px`) em botão circular `icon-btn`.  
Ao tocar: o campo `#searchBox` expande com animação de `width: 0 → 100%` em `250ms ease-decel`. O ícone vira um X para fechar. O campo recebe foco automaticamente.

```css
#searchBox {
  width: 0;
  overflow: hidden;
  transition: width 250ms var(--ease-decel);
  opacity: 0;
}
#searchBox.expanded {
  width: 100%;       /* ou 200px no desktop */
  opacity: 1;
}
```

Em desktop o campo fica sempre visível com `width: 200px`.

#### Botão de tema

Mantém o `#themeToggle` existente. Ícone SVG: sol quando `data-theme="dark"` (mostra que vai para light), lua quando `data-theme="light"`. Transição do SVG: `opacity 200ms`.

#### Elementos ocultos que devem permanecer no DOM

Os seguintes elementos existem hoje dentro da `.topbar` e devem ser mantidos, mas invisíveis quando `ERP_EMBEDDED` estiver ativo:

- `#connectBtn` — `display: none` via CSS quando ERP embutido
- `#manualBtn` — idem
- `#fileInput` — sempre `display: none` (hidden file input)
- `#filestatus` — movido para dentro do greeting como linha adicional pequena; `font-size: 10px; color: var(--text-tertiary)`
- `#syncbadge` — permanece ao lado do `#filestatus`

---

## 3. BOTTOM NAV (mobile)

### Especificações gerais

| Propriedade | Valor |
|---|---|
| Altura total | `72px + env(safe-area-inset-bottom)` |
| Position | `fixed; bottom: 0; left: 0; right: 0; z-index: 200` |
| Background | `var(--bottom-nav-bg)` com `backdrop-filter: blur(20px)` |
| Border top | `1px solid var(--border)` |

### 5 itens em ordem

| Posição | Label | data-tab | Ícone |
|---|---|---|---|
| 1 | Dashboard | `dashboard` | Gráfico de área / home |
| 2 | Extrato | `vendas` | Lista de linhas (3 linhas horizontais com ponto à esquerda) |
| 3 | [central] | — | `+` grande (ação rápida, não é uma aba) |
| 4 | Contas | `apagar` | Carteira / ícone de cartão |
| 5 | Mais | — | Grid 2×2 (abre drawer) |

> O item "Extrato" mapeia para `data-tab="vendas"` pois é o extrato de lançamentos. O item "Contas" mapeia para `data-tab="apagar"` como ponto de entrada de contas financeiras.

### Anatomia de cada item (exceto central)

```
[ícone SVG 24px]
[label 10px — só visível se ativo]
```

- Ícone inativo: `color: var(--text-tertiary); opacity: 0.6`
- Ícone ativo: preenchido com `var(--accent)` ou `fill` com gradient via SVG linearGradient
- Label: `font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--accent)` — só aparece (`height: auto; opacity: 1`) quando ativo
- Área de toque mínima: 48×48px por item

### Botão central (+)

```
Largura/altura: 56px
Border-radius: 50%
Background: var(--gradient-accent)  /* ex: linear-gradient(135deg, #7C5CD6, #3B82C4) */
Box-shadow: var(--accent-glow)      /* ex: 0 4px 20px rgba(91,63,160,0.5) */
Margin-top: -8px                    /* levemente elevado acima do nav */
```

Ícone: `+` branco em `font-size: 28px` ou SVG linha cruzada.

Ao tocar: abre Action Sheet (ver seção 6).

### Badge de alerta no item "Contas"

Quando `checkVencimentos()` retornar itens, inserir badge:

```html
<span class="nav-badge">N</span>
```

```css
.nav-badge {
  position: absolute;
  top: 4px; right: 4px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: var(--red);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
```

### Drawer "Mais"

Ao tocar no item "Mais", um drawer sobe do rodapé com as abas secundárias:

- **Fornecedores** → `data-tab="fornecedores"`
- **Clientes** → `data-tab="clientes"`
- **Produtos** → `data-tab="produtos"`
- **Contas a Receber** → `data-tab="areceber"`

Drawer: `height: auto; max-height: 60vh; border-radius: 20px 20px 0 0; padding: 24px 16px; background: var(--surface)`. Fecha ao tocar fora ou deslizar para baixo.

---

## 4. SIDEBAR (desktop >= 1024px)

A sidebar existente de 220px é substituída por uma barra de 72px com apenas ícones.

```
┌──────┐
│  G   │  ← logo-mark (36px, sem logo-text)
├──────┤
│ [🏠] │  ← navitem data-tab="dashboard"
│ [📦] │  ← navitem data-tab="produtos"
│ [🛒] │  ← navitem data-tab="vendas"
│ [💳] │  ← navitem data-tab="apagar"
│ [💰] │  ← navitem data-tab="areceber"
│ [🏪] │  ← navitem data-tab="fornecedores"
│ [👤] │  ← navitem data-tab="clientes"
└──────┘
```

- Ícone SVG 20px centralizado
- Hover: tooltip à direita com nome da aba (`position: absolute; left: 80px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 4px 10px; font-size: 12px; white-space: nowrap`)
- Ativo: `background: var(--sidebar-active); border-left: 3px solid var(--accent)`
- Os `.navitem[data-tab="..."]` mantêm seus `data-tab` — o `app.js` usa `querySelectorAll(".navitem")` para ligar listeners

---

## 5. DASHBOARD — HIERARQUIA VISUAL (de cima para baixo)

### 5.1 Alert Banner de Vencimento

Renderizado condicionalmente pelo `renderDashboard()` somente se `checkVencimentos()` retornar itens.

Mantém a classe `.alert-banner` existente. No redesign, posicionado como primeiro elemento após o topbar, antes do card hero.

```
[⚠️]  [N conta(s) vencendo em breve: Nome (hoje), Nome (em 2 dias)]
```

### 5.2 Card Hero — Saldo Atual

```
┌─────────────────────────────────────┐
│ SALDO DISPONÍVEL           [sparkline]│
│ R$ 12.450,00                         │
│ ↑ 12,3% vs mês anterior             │
└─────────────────────────────────────┘
```

| Elemento | Especificação |
|---|---|
| Container | `border-radius: var(--radius-lg); background: var(--gradient-accent); padding: 24px; margin-bottom: 20px` |
| Micro-label "SALDO DISPONÍVEL" | `font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.7)` |
| Valor | `font-size: 40px; font-weight: 800; color: #fff` (mobile: 36px) |
| Sparkline | SVG inline 80×36px, stroke branco 60% opacidade, 7 pontos (7 dias recentes) |
| Delta | `font-size: 13px; color: rgba(255,255,255,0.85)` com `↑` verde-claro ou `↓` vermelho-claro |

O saldo vem de `cell("Dashboard", "B37")`. O sparkline será alimentado com dados fictícios de variação (ou zeros se não houver histórico) — o `javascript-pro` deve expor um array `saldoHistory[]` para o frontend preencher.

### 5.3 Quick Actions Row

```
[＋ Lançar]  [↓ Receber]  [↑ Pagar]  [→ Extrato]
```

Row horizontal com scroll horizontal em mobile (sem quebra de linha).

| Pill | Ação | Estilo |
|---|---|---|
| `＋ Lançar` | Abre action sheet | `background: var(--gradient-accent); color: #fff` |
| `↓ Receber` | Navega para `data-tab="areceber"` | `background: var(--green-light); color: var(--green)` |
| `↑ Pagar` | Navega para `data-tab="apagar"` | `background: var(--red-light); color: var(--red)` |
| `→ Extrato` | Navega para `data-tab="vendas"` | `background: var(--surface-2); color: var(--text-primary)` |

Cada pill: `padding: 10px 18px; border-radius: var(--radius-pill); font-size: 13px; font-weight: 600; white-space: nowrap; cursor: pointer`.

### 5.4 KPI Grid

O `renderDashboard()` atual cria uma `.kpi-row` com 6 KPI cards. No redesign:

| Breakpoint | Colunas |
|---|---|
| Mobile < 768px | 2 colunas |
| Tablet 768–1023px | 3 colunas |
| Desktop >= 1024px | 4+ colunas (todos em 1 linha) |

Implementação com CSS Grid:
```css
.kpi-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
@media (min-width: 768px) { .kpi-row { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .kpi-row { grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); } }
```

Cada `.kpi-card` mantém o layout atual (ícone 42px + label + value + delta).

Os 6 KPIs existentes (mapeados das células do xlsx):
1. Saldo Atual (Pessoal) — `B37` — ícone 💰 verde
2. Gastos Fixos Pessoal — `B7` — ícone 🏠 âmbar
3. Vendas do Negócio — `B11` — ícone 📈 roxo
4. A Receber — `C11` — ícone ⬆️ verde
5. A Pagar — `D11` — ícone ⬇️ âmbar
6. Clientes — `E11` — ícone 👤 azul

### 5.5 Gráfico de Donuts

Mantém a `.donut-row` atual com 2 donut cards:
- Despesas Fixas por Categoria (Pessoal) — dados de `B15:D27`
- Vendas por Canal — dados de `C40:C43` (Shopee/WhatsApp/Site/Instagram)

No mobile os cards ficam em coluna (`flex-direction: column`). No desktop ficam lado a lado.

### 5.6 Próximas Contas

Tabela simples (renderizada por `renderTableHTML`), mantém o `#dashboardContasTable`.

No redesign: substituir o `<table>` por lista de cards de transação (ver seção 7) dentro deste container. O `javascript-pro` adapta `renderTableHTML` para detectar se `el.id === 'dashboardContasTable'` e usar o layout de cards.

### 5.7 Extrato Recente

Mantém o `#dashboardExtratoTable`. Exibe apenas as 5 transações mais recentes da aba "Lançamentos Pessoal", usando cards de transação (ver seção 7), não tabela HTML.

---

## 6. CARDS DE TRANSAÇÃO

Substituem `<table>` nas abas de listagem e nas seções de extrato/contas do dashboard.

### Anatomia (altura mínima 64px)

```
┌──────────────────────────────────────────────┐
│ [Avatar 40px]  [Nome principal]    [R$ 50,00]│
│  círculo ícone  [Data secundária]  [badge]   │
└──────────────────────────────────────────────┘
```

```css
.tx-card {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 150ms;
  position: relative;
  overflow: hidden;
}
.tx-card:hover { background: var(--surface-2); }
.tx-card:last-child { border-bottom: none; }
```

### Avatar (40px)

Círculo com ícone SVG ou inicial da categoria, fundo colorido por tipo:

| Tipo | Cor de fundo | Ícone |
|---|---|---|
| Entrada | `var(--green-light)` | ↑ (verde) |
| Saída | `var(--red-light)` | ↓ (vermelho) |
| Conta a Pagar | `var(--amber-light)` | relógio (âmbar) |
| Conta a Receber | `var(--green-light)` | seta recebimento (verde) |
| Fornecedor | `rgba(91,63,160,0.15)` | caixa (roxo) |
| Cliente | `rgba(59,130,196,0.15)` | pessoa (azul) |

### Coluna central (flex: 1)

```html
<div class="tx-info">
  <span class="tx-name">Nome / Descrição</span>
  <span class="tx-date">01/07/2026 · Categoria</span>
</div>
```

- `.tx-name`: `font-size: 14px; font-weight: 500; color: var(--text-primary)`
- `.tx-date`: `font-size: 12px; color: var(--text-tertiary); margin-top: 2px`

### Coluna direita

```html
<div class="tx-amount">
  <span class="tx-value">R$ 50,00</span>
  <span class="badge badge-pago">Pago</span>
</div>
```

- `.tx-value`: `font-size: 15px; font-weight: 700; color: var(--green)` (entradas) ou `var(--red)` (saídas)
- `.badge`: `padding: 2px 8px; border-radius: var(--radius-pill); font-size: 10px; font-weight: 700`
  - `.badge-pago`: `background: var(--green-light); color: var(--green)`
  - `.badge-pendente`: `background: var(--amber-light); color: var(--amber)`
  - `.badge-atrasado`: `background: var(--red-light); color: var(--red)`

### Swipe para ações (mobile)

Ao deslizar o card para a esquerda, revela duas ações:

```
[card desliza para esquerda]  [Editar 64px âmbar] [Excluir 64px vermelho]
```

Implementação via `touchstart` / `touchmove` / `touchend`. O container usa `overflow: hidden` e os botões de ação ficam em `position: absolute; right: 0; height: 100%`.

---

## 7. ACTION SHEET — LANÇAMENTO RÁPIDO

Ativado pelo botão `+` central do bottom nav.

### Comportamento

1. Backdrop escuro (`rgba(0,0,0,0.5)`) aparece com `opacity: 0 → 1` em `200ms`
2. Sheet sobe do rodapé: `transform: translateY(100%) → translateY(0)` em `300ms var(--ease-decel)`
3. Handle visual no topo da sheet (pill cinza 40px × 4px)
4. Fecha ao tocar no backdrop, deslizar para baixo, ou pressionar Escape

### Conteúdo da sheet

```
┌────────────────────────────┐
│ ─────────── (handle)       │
│ Novo Lançamento            │
│                            │
│ [Valor]        R$ _______  │
│ [Descrição]    ___________  │
│ [Categoria]    [dropdown]  │
│ [Tipo]  ● Entrada  ○ Saída │
│                            │
│ [Salvar Lançamento]        │
└────────────────────────────┘
```

- Sheet: `background: var(--surface); border-radius: 20px 20px 0 0; padding: 20px 20px calc(20px + env(safe-area-inset-bottom))`
- Campo valor: `font-size: 32px; text-align: center; border: none; border-bottom: 2px solid var(--accent); background: transparent; color: var(--text-primary)`
- Botão Salvar: largura 100%, gradient accent, altura 52px, `border-radius: var(--radius-md)`

---

## 8. TRANSIÇÕES DE ABA

### Lógica de direção

```javascript
const TAB_ORDER = ['dashboard', 'vendas', 'apagar', 'areceber', 'fornecedores', 'clientes', 'produtos'];
// Indo para índice maior = slide para esquerda (saída: translateX(-100%), entrada: translateX(100%))
// Indo para índice menor = slide para direita (saída: translateX(100%), entrada: translateX(-100%))
```

### Implementação CSS

```css
#content {
  position: relative;
  overflow: hidden;
}

.tab-enter {
  animation: slideIn 300ms var(--ease-decel) forwards;
}
.tab-exit {
  animation: slideOut 300ms var(--ease-decel) forwards;
  position: absolute; top: 0; left: 0; right: 0;
  pointer-events: none;
}

@keyframes slideIn {
  from { transform: translateX(var(--slide-from)); opacity: 0; }
  to   { transform: translateX(0);                 opacity: 1; }
}
@keyframes slideOut {
  from { transform: translateX(0);               opacity: 1; }
  to   { transform: translateX(var(--slide-to)); opacity: 0; }
}
```

A variável `--slide-from` é setada via JS antes de inserir o conteúdo:
- Slide para esquerda: `--slide-from: 100%; --slide-to: -100%`
- Slide para direita: `--slide-from: -100%; --slide-to: 100%`

Fade: `opacity 0 → 1` em `200ms` acontece junto com o translate.

---

## 9. REGRAS DE COMPORTAMENTO (para javascript-pro e frontend-developer)

### 9.1 Stagger de entrada em listas

Ao montar qualquer lista de `.tx-card` ou `.kpi-card`, aplicar índice CSS `--i`:

```javascript
container.querySelectorAll('.tx-card, .kpi-card').forEach((el, i) => {
  el.style.setProperty('--i', i);
  el.style.animationDelay = `calc(${i} * 60ms)`;
  el.classList.add('stagger-enter');
});
```

```css
.stagger-enter {
  animation: fadeSlideUp 300ms var(--ease-decel) both;
  animation-delay: calc(var(--i, 0) * 60ms);
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### 9.2 CountUp nos KPIs

Ao montar ou re-montar a aba, os valores numéricos dos `.kpi-value` que contêm moeda ou número animam de 0 ao valor real em 1200ms com easing `ease-out`:

```javascript
function countUp(el, target, duration = 1200, prefix = 'R$ ') {
  const start = performance.now();
  requestAnimationFrame(function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * ease;
    el.textContent = prefix + current.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (progress < 1) requestAnimationFrame(tick);
  });
}
```

CountUp é executado apenas na primeira carga de cada aba, ou quando o usuário muda de aba (não em re-renders de busca/filtro).

### 9.3 Ripple em botões e pills

Todo `<button>`, `.loadbtn`, `.action-pill` e `.navitem` recebe ripple ao clique/toque:

```javascript
function addRipple(el) {
  el.style.position = 'relative';
  el.style.overflow = 'hidden';
  el.addEventListener('click', function(e) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `left:${x}px;top:${y}px`;
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}
```

```css
.ripple-effect {
  position: absolute;
  width: 0; height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: translate(-50%, -50%);
  animation: ripple 600ms var(--ease-decel) forwards;
  pointer-events: none;
}
@keyframes ripple {
  to { width: 200px; height: 200px; opacity: 0; }
}
```

### 9.4 Badge de vencimento no bottom nav

Após `renderDashboard()` calcular os alertas, publicar o resultado:

```javascript
// No final de renderDashboard():
const alertCount = alertas.length;
const badge = document.querySelector('.bottom-nav-item[data-tab="apagar"] .nav-badge');
if (badge) {
  badge.textContent = alertCount;
  badge.style.display = alertCount > 0 ? 'flex' : 'none';
}
```

### 9.5 Busca mobile (expand/collapse)

```javascript
const searchIcon = document.getElementById('searchToggleBtn'); // novo botão lupa no topbar
const searchBox = document.getElementById('searchBox');

searchIcon.addEventListener('click', () => {
  searchBox.classList.toggle('expanded');
  if (searchBox.classList.contains('expanded')) {
    searchBox.focus();
    searchIcon.setAttribute('aria-label', 'Fechar busca');
  } else {
    searchBox.value = '';
    renderView();
    searchIcon.setAttribute('aria-label', 'Abrir busca');
  }
});
```

### 9.6 Action sheet "Lançar"

```javascript
function openLaunchSheet() {
  const backdrop = document.createElement('div');
  backdrop.className = 'sheet-backdrop';
  const sheet = document.createElement('div');
  sheet.className = 'action-sheet';
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <h3 class="sheet-title">Novo Lançamento</h3>
    <input id="sheet-valor" type="number" inputmode="decimal" placeholder="0,00" class="sheet-input-valor">
    <input id="sheet-descricao" type="text" placeholder="Descrição" class="sheet-input">
    <select id="sheet-categoria" class="sheet-select">
      <option value="">Categoria...</option>
      <option>Moradia</option><option>Alimentação</option><option>Transporte</option>
      <option>Assinaturas</option><option>Vendas</option><option>Outros</option>
    </select>
    <div class="sheet-tipo-row">
      <label><input type="radio" name="tipo" value="Entrada" checked> Entrada</label>
      <label><input type="radio" name="tipo" value="Saída"> Saída</label>
    </div>
    <button class="loadbtn sheet-submit">Salvar Lançamento</button>
  `;
  backdrop.appendChild(sheet);
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => backdrop.classList.add('open'));
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeSheet(backdrop);
  });
}

function closeSheet(backdrop) {
  backdrop.classList.remove('open');
  backdrop.addEventListener('transitionend', () => backdrop.remove(), { once: true });
}
```

---

## 10. IDs E CLASSES QUE app.js PRECISA MANTER

A tabela abaixo lista todos os identificadores que o `app.js` atual referencia. O HTML redesenhado DEVE mantê-los com exatamente estes IDs:

| ID / Seletor | Uso no app.js | Obrigatorio |
|---|---|---|
| `#filestatus` | `document.getElementById("filestatus").textContent` | Sim |
| `#syncbadge` | `document.getElementById("syncbadge").innerHTML` | Sim |
| `#searchBox` | Event listener de input + leitura de `.value` | Sim |
| `#fileInput` | `addEventListener("change", ...)` e `.click()` | Sim |
| `#connectBtn` | `addEventListener("click", ...)` | Sim |
| `#manualBtn` | `onclick` para abrir fileInput (pode ser inline) | Sim |
| `#content` | `document.getElementById("content")` — container principal | Sim |
| `#filterbar` | `document.getElementById("filterbar").innerHTML` | Sim |
| `#tab-title` | `document.getElementById("tab-title").textContent` | Sim |
| `.navitem[data-tab="..."]` | `querySelectorAll(".navitem")` + `classList.add("active")` | Sim |
| `#themeToggle` | Event listener de click (já no HTML inline) | Sim |
| `#connectionArea` | `style.display = 'none'` quando ERP embutido | Sim |
| `#skeleton-loader` | Presente no HTML inicial, removido ao carregar dados | Recomendado |
| `window._charts` | Registro de instâncias Chart.js para destruir/recriar | Sim (window) |
| `window.render` | Exposto para chamadas externas | Sim (window) |
| `window.setFilter` | Exposto para `onchange` inline nos selects | Sim (window) |

### Elementos novos que o redesign adiciona (sem conflito com app.js)

| ID / Classe | Finalidade |
|---|---|
| `#searchToggleBtn` | Botão lupa mobile para expandir #searchBox |
| `.bottom-nav` | Container do bottom nav mobile |
| `.bottom-nav-item` | Cada item do bottom nav |
| `.nav-badge` | Badge numérico de alerta |
| `.action-sheet` | Sheet de lançamento rápido |
| `.sheet-backdrop` | Overlay da action sheet |
| `.greeting` | Bloco de saudação no topbar |
| `.tx-card` | Card de transação (substitui `<tr>` nas listas) |
| `.stagger-enter` | Classe de animação de entrada em listas |
| `.ripple-effect` | Elemento de ripple criado dinamicamente |

---

## 11. TOKENS CSS NECESSÁRIOS

Os seguintes tokens devem existir no `design-tokens.css` (alguns já existem, outros são novos):

```css
:root {
  /* Existentes — manter */
  --accent: #5B3FA0;
  --accent-dark: #4a3280;
  --accent-light: rgba(91,63,160,0.1);
  --green: #1E8A5F;
  --green-light: rgba(30,138,95,0.12);
  --red: #D33030;
  --red-light: rgba(211,48,48,0.12);
  --amber: #C77700;
  --amber-light: #FFF8E7;
  --border: rgba(0,0,0,0.1);
  --surface: #ffffff;
  --surface-2: #f8f7fc;
  --text-primary: #1A1A2E;
  --text-secondary: #6B6880;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.08);
  --transition: 0.18s ease;

  /* Novos — adicionar */
  --gradient-accent: linear-gradient(135deg, #7C5CD6 0%, #3B82C4 100%);
  --accent-glow: 0 4px 24px rgba(91,63,160,0.4);
  --text-tertiary: #9AA0AE;
  --text-micro: 10px;
  --bottom-nav-bg: rgba(255,255,255,0.9);
  --ease-decel: cubic-bezier(0.0, 0.0, 0.2, 1);
  --sidebar-bg: #13102A;
  --sidebar-text: rgba(255,255,255,0.7);
  --sidebar-active: rgba(255,255,255,0.1);
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base: 13px;
  --text-2xl: 22px;
}

[data-theme="dark"] {
  --border: rgba(255,255,255,0.1);
  --surface: #1A1030;
  --surface-2: #221540;
  --text-primary: #F0EEF8;
  --text-secondary: #9A96B0;
  --text-tertiary: #6B6880;
  --bg: #0F0A1E;
  --bottom-nav-bg: rgba(26,16,48,0.9);
  --amber-light: rgba(199,119,0,0.15);
  --green-light: rgba(30,138,95,0.15);
  --red-light: rgba(211,48,48,0.15);
  --accent-light: rgba(91,63,160,0.2);
}
```

---

## 12. ACESSIBILIDADE

| Requisito | Implementação |
|---|---|
| Contraste mínimo AA (4.5:1) | Verificar `--text-secondary` sobre `--surface` em ambos os temas |
| Foco visível | `outline: 2px solid var(--accent); outline-offset: 2px` em todos os elementos interativos |
| Aria labels | `#themeToggle`: `aria-label="Alternar tema claro/escuro"`. Bottom nav items: `aria-label="[nome da aba]"`. Botão central: `aria-label="Novo lançamento"` |
| Aria current | `.navitem.active` deve receber `aria-current="page"` |
| Teclado | Manter atalhos 1–7 existentes no `app.js`. Escape fecha action sheet e limpa busca. Tab navega pelos itens do bottom nav |
| Motion | Envolver todas as animações em `@media (prefers-reduced-motion: no-preference)` |
| Screen reader | Action sheet deve receber `role="dialog"` e `aria-modal="true"` com foco preso dentro |

---

## 13. ORDEM DE IMPLEMENTAÇÃO RECOMENDADA

1. Atualizar `design-tokens.css` com tokens novos (seção 11)
2. Reescrever estrutura HTML: topbar + sidebar icon-only + bottom nav (sem alterar `#content` e IDs internos)
3. Implementar CSS do bottom nav, badge, drawer "Mais"
4. Implementar CSS dos `.tx-card` substituindo `<table>` no `renderTableHTML`
5. Adaptar `renderDashboard()` para card hero + quick actions acima da `.kpi-row`
6. Adicionar CountUp, stagger de entrada e ripple como utilitários JS
7. Implementar transições de aba (slide horizontal)
8. Implementar action sheet de lançamento rápido
9. Implementar busca expansível no mobile
10. Testar em mobile real (iPhone Safari + Android Chrome) — especialmente `env(safe-area-inset-bottom)` e swipe cards

---

*Especificação produzida com base na análise completa de `Guaru_App.html` e `app.js` Sprint 3.*  
*Todos os IDs e data-tabs do app.js foram preservados. Nenhuma mudança de comportamento de dados é necessária — apenas camada visual e navegação.*
