# Guaru App — UI Spec v2.0
**Redesign 2026 · Dark-First ERP Financeiro**
Referências: Mobills · Pierre Finance · Linear · Nubank
Data: 2026-07-01

---

## Tokens de base (resumo)

Os tokens abaixo são os que esta spec referencia. Fonte canônica: `design-tokens.css`.

```
--bg:                #070B14
--surface-1:         #0D1221
--surface-2:         #141929
--surface-3:         #1C2235

--accent:            #6C47FF
--accent-2:          #B47BFF
--gradient-accent:   linear-gradient(135deg, #6C47FF 0%, #B47BFF 100%)
--gradient-accent-text: linear-gradient(135deg, #8B6FFF 0%, #C99FFF 100%)
--gradient-hero:     linear-gradient(135deg, rgba(108,71,255,.25) 0%, rgba(180,123,255,.12) 100%)

--green:   #00D97E   --green-dim:  rgba(0,217,126,.15)
--red:     #FF4D6A   --red-dim:    rgba(255,77,106,.15)
--amber:   #FFB547   --amber-dim:  rgba(255,181,71,.15)
--blue:    #4BA3E8   --blue-dim:   rgba(75,163,232,.15)

--text-primary:   rgba(255,255,255,.95)
--text-secondary: rgba(255,255,255,.55)
--text-tertiary:  rgba(255,255,255,.3)
--border:         rgba(255,255,255,.07)
--glass-bg-1:     rgba(255,255,255,.04)
--glass-border-1: rgba(255,255,255,.06)
```

---

## 1. Ícones SVG — Bottom Nav (24px viewBox)

Stroke `currentColor`, `stroke-width="1.75"`, linecaps round.
No fill, exceto o ícone `add` que tem versão filled para o botão central.

### 1.1 Dashboard (gráfico de área com linha e pontos)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Eixo base -->
  <line x1="3" y1="18" x2="21" y2="18"/>
  <!-- Linha do gráfico de área -->
  <polyline points="3,15 6,10 10,13 14,7 18,9 21,5"/>
  <!-- Área preenchida (fill semi-transparente via CSS) -->
  <polygon points="3,15 6,10 10,13 14,7 18,9 21,5 21,18 3,18" fill="currentColor" fill-opacity="0.12" stroke="none"/>
  <!-- Pontos de dado -->
  <circle cx="6"  cy="10" r="1.5" fill="currentColor" stroke="none"/>
  <circle cx="10" cy="13" r="1.5" fill="currentColor" stroke="none"/>
  <circle cx="14" cy="7"  r="1.5" fill="currentColor" stroke="none"/>
  <circle cx="18" cy="9"  r="1.5" fill="currentColor" stroke="none"/>
</svg>
```

### 1.2 Extrato (lista com bullet à esquerda)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Bullets (círculos preenchidos) -->
  <circle cx="5" cy="8"  r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none"/>
  <circle cx="5" cy="16" r="1.25" fill="currentColor" stroke="none"/>
  <!-- Linhas de texto -->
  <line x1="9"  y1="8"  x2="20" y2="8"/>
  <line x1="9"  y1="12" x2="20" y2="12"/>
  <line x1="9"  y1="16" x2="16" y2="16"/>
</svg>
```

### 1.3 Add — versão outline (para uso em botões secundários)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9"/>
  <line x1="12" y1="8" x2="12" y2="16"/>
  <line x1="8"  y1="12" x2="16" y2="12"/>
</svg>
```

### 1.3b Add — versão FILLED (botão central do Bottom Nav)

Usar como `background` no botão FAB central. O SVG fica branco dentro do gradiente.

```svg
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Círculo preenchido com gradiente via CSS (o elemento pai tem o gradient) -->
  <circle cx="12" cy="12" r="12" fill="white" fill-opacity="0.15"/>
  <!-- Cruz em branco -->
  <line x1="12" y1="6" x2="12" y2="18" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="6"  y1="12" x2="18" y2="12" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
```

Nota: o botão central recebe `background: var(--gradient-accent)` e `border-radius: 50%` no CSS; o SVG fica com `stroke="white"` simples.

### 1.4 Contas (wallet/carteira)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Corpo da carteira -->
  <rect x="2" y="6" width="20" height="14" rx="2"/>
  <!-- Aba superior da carteira -->
  <path d="M2 10 C2 8 4 6 6 6 L18 6 C20 6 22 8 22 10"/>
  <!-- Interior da carteira (detalhe da dobra) -->
  <path d="M16 13 a1.5 1.5 0 1 1 0 .01 Z" fill="currentColor" stroke="none"/>
  <!-- Divisória interna -->
  <line x1="16" y1="10" x2="22" y2="10"/>
</svg>
```

### 1.5 Mais (grid 2x2)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Quadrante superior esquerdo -->
  <rect x="3"  y="3"  width="7" height="7" rx="1.5"/>
  <!-- Quadrante superior direito -->
  <rect x="14" y="3"  width="7" height="7" rx="1.5"/>
  <!-- Quadrante inferior esquerdo -->
  <rect x="3"  y="14" width="7" height="7" rx="1.5"/>
  <!-- Quadrante inferior direito -->
  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
</svg>
```

---

## 2. Ícones SVG — Sidebar Desktop (16px viewBox)

Stroke `currentColor`, `stroke-width="1.5"`. Mesma linguagem visual, reduzidos para densidade de sidebar.

### 2.1 Dashboard

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="2" y1="12" x2="14" y2="12"/>
  <polyline points="2,10 4,7 7,9 10,5 12,6 14,3"/>
  <polygon points="2,10 4,7 7,9 10,5 12,6 14,3 14,12 2,12" fill="currentColor" fill-opacity="0.15" stroke="none"/>
  <circle cx="4"  cy="7" r="1" fill="currentColor" stroke="none"/>
  <circle cx="10" cy="5" r="1" fill="currentColor" stroke="none"/>
</svg>
```

### 2.2 Fornecedores (caixa/package)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Caixa -->
  <rect x="2" y="5" width="12" height="9" rx="1.5"/>
  <!-- Tampa -->
  <path d="M2 5 L5 2 L11 2 L14 5"/>
  <!-- Linha central da caixa -->
  <line x1="8" y1="5" x2="8" y2="14"/>
  <!-- Alça/fita -->
  <line x1="5" y1="2" x2="5" y2="5"/>
  <line x1="11" y1="2" x2="11" y2="5"/>
</svg>
```

### 2.3 Clientes (pessoa/user)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="5" r="3"/>
  <path d="M2 14 C2 11 4.5 9 8 9 C11.5 9 14 11 14 14"/>
</svg>
```

### 2.4 Produtos (tag/label)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Tag shape -->
  <path d="M2 2 L9 2 L14 7 L8 13 L3 8 Z"/>
  <!-- Furo do lacre -->
  <circle cx="5.5" cy="5.5" r="1.25"/>
</svg>
```

### 2.5 Vendas (carrinho)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Corpo do carrinho -->
  <path d="M1 1 L3 1 L5 9 L12 9 L14 4 L4 4"/>
  <!-- Rodas -->
  <circle cx="6"  cy="12" r="1.5"/>
  <circle cx="11" cy="12" r="1.5"/>
</svg>
```

### 2.6 Contas a Pagar (seta baixo + círculo)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Círculo externo -->
  <circle cx="8" cy="8" r="6"/>
  <!-- Seta para baixo -->
  <line x1="8" y1="4" x2="8" y2="11"/>
  <polyline points="5,9 8,12 11,9"/>
</svg>
```

### 2.7 Contas a Receber (seta cima + círculo)

```svg
<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- Círculo externo -->
  <circle cx="8" cy="8" r="6"/>
  <!-- Seta para cima -->
  <line x1="8" y1="12" x2="8" y2="5"/>
  <polyline points="5,7 8,4 11,7"/>
</svg>
```

---

## 3. Card Hero de Saldo

### Anatomia

```
┌──────────────────────────────────────────────┐  ← borda gradiente 1px via ::before
│  Saldo Disponível               [sparkline]   │
│  [MICRO-LABEL · 11px muted]     ~~~~~~~~~~~~~ │
│                                               │
│  R$ 12.540,00                                 │
│  [GRADIENT TEXT · 52px · weight 800]          │
│                                               │
│  ↑ 18,3% vs. mês anterior                    │
│  [verde · 12px]                               │
└──────────────────────────────────────────────┘
```

### CSS Spec

```css
.hero-card {
  position: relative;
  width: 100%;
  min-height: 160px;
  padding: 20px 24px;
  border-radius: 20px;
  background: var(--gradient-hero);
  backdrop-filter: var(--glass-blur-2);
  overflow: hidden;
}

/* Borda gradiente 1px — técnica mask-composite */
.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(108,71,255,.6) 0%, rgba(180,123,255,.2) 50%, rgba(255,255,255,.05) 100%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Ruído de textura sutil */
.hero-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: .4;
  pointer-events: none;
}

.hero-card__label {
  font-size: var(--text-xs);        /* 11px */
  font-weight: var(--font-medium);  /* 500 */
  color: var(--text-secondary);
  letter-spacing: .04em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.hero-card__value {
  font-size: var(--kpi-main);       /* 52px */
  font-weight: var(--font-extrabold); /* 800 */
  font-variant-numeric: tabular-nums;
  line-height: 1;
  background: var(--gradient-accent-text); /* #8B6FFF → #C99FFF */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: -.02em;
}

.hero-card__delta {
  font-size: var(--text-sm);        /* 12px */
  font-weight: var(--font-semibold); /* 600 */
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 4px;
}

.hero-card__delta--negative {
  color: var(--red);
}

/* Sparkline posicionada no canto superior direito */
.hero-card__sparkline {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 120px;
  height: 48px;
  opacity: .7;
}
```

### SVG Sparkline (placeholder — substituir por dados reais via JS)

```svg
<svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-card__sparkline">
  <defs>
    <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#8B6FFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#8B6FFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <!-- Área preenchida -->
  <path d="M0,40 C10,38 20,30 30,28 C40,26 45,32 55,24 C65,16 75,20 85,14 C95,8 105,12 120,6 L120,48 L0,48 Z"
        fill="url(#spark-fill)"/>
  <!-- Linha principal -->
  <path d="M0,40 C10,38 20,30 30,28 C40,26 45,32 55,24 C65,16 75,20 85,14 C95,8 105,12 120,6"
        stroke="#B47BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Ponto ativo final -->
  <circle cx="120" cy="6" r="3" fill="#B47BFF"/>
  <circle cx="120" cy="6" r="6" fill="#B47BFF" opacity="0.3"/>
</svg>
```

### HTML de referência

```html
<article class="hero-card">
  <div class="hero-card__header">
    <span class="hero-card__label">Saldo Disponível</span>
    <svg class="hero-card__sparkline"><!-- sparkline svg acima --></svg>
  </div>
  <p class="hero-card__value">R$ 12.540,00</p>
  <p class="hero-card__delta">
    <!-- seta cima 12px SVG -->
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><line x1="6" y1="10" x2="6" y2="2"/><polyline points="3,5 6,2 9,5"/></svg>
    18,3% vs. mês anterior
  </p>
</article>
```

### Estados do Hero Card

| Estado | Comportamento |
|--------|--------------|
| `default` | Background gradient + borda gradiente + sparkline visível |
| `hover (desktop)` | `transform: translateY(-1px)`, `--accent-glow` intensifica para `0 0 32px rgba(108,71,255,.5)` — transição `200ms ease` |
| `loading/skeleton` | Substituir `.hero-card__value` por bloco skeleton: `width: 220px; height: 52px; border-radius: 8px; background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%); background-size: 200%; animation: shimmer 1.4s infinite` |
| `erro de dados` | `--gradient-hero` troca para `rgba(255,77,106,.08)` e label muda para "Dados indisponíveis" |
| `sem ERP` | Card inteiro exibe o empty-state 3a (ver seção 7) |

---

## 4. Quick Actions Row

### Anatomia

```
┌─────────────────────────────────────────────────────────┐
│  [+ Lançar]   [↓ Receber]   [↑ Pagar]   [→ Extrato]   │
│  gradient      verde         vermelho     neutro         │
└─────────────────────────────────────────────────────────┘
```

Container com `display: flex; gap: 8px; overflow-x: auto; padding: 0 16px; scrollbar-width: none`.

### CSS de cada pill

```css
/* Base — todos os pills */
.quick-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: var(--text-sm);        /* 12px */
  font-weight: var(--font-semibold); /* 600 */
  white-space: nowrap;
  cursor: pointer;
  transition: all 160ms ease;
  border: 1px solid transparent;
  flex-shrink: 0;
  /* Ícone SVG dentro do pill */
  /* svg { width: 16px; height: 16px; } */
}

/* Pill primário — Lançar */
.quick-action--primary {
  background: var(--gradient-accent);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(108,71,255,.3);
}
.quick-action--primary:hover {
  box-shadow: 0 6px 20px rgba(108,71,255,.45);
  transform: translateY(-1px);
}

/* Pill Receber — verde */
.quick-action--receive {
  background: var(--glass-bg-1);
  color: var(--green);
  border-color: rgba(0,217,126,.25);
}
.quick-action--receive:hover {
  background: var(--green-dim);
}

/* Pill Pagar — vermelho */
.quick-action--pay {
  background: var(--glass-bg-1);
  color: var(--red);
  border-color: rgba(255,77,106,.25);
}
.quick-action--pay:hover {
  background: var(--red-dim);
}

/* Pill Extrato — neutro */
.quick-action--neutral {
  background: var(--glass-bg-1);
  color: var(--text-secondary);
  border-color: var(--glass-border-1);
}
.quick-action--neutral:hover {
  background: var(--glass-bg-3);
  color: var(--text-primary);
}

/* Estado active/pressed (mobile) */
.quick-action:active {
  transform: scale(0.96);
  transition: transform 80ms ease;
}

/* Estado disabled */
.quick-action:disabled,
.quick-action[aria-disabled="true"] {
  opacity: .35;
  pointer-events: none;
}
```

### SVGs dos ícones de pill (16px)

**Lançar (+)**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="8" y1="3" x2="8" y2="13"/>
  <line x1="3" y1="8" x2="13" y2="8"/>
</svg>
```

**Receber (↓)**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="8" y1="2" x2="8" y2="12"/>
  <polyline points="4,9 8,13 12,9"/>
  <line x1="3" y1="14" x2="13" y2="14"/>
</svg>
```

**Pagar (↑)**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="8" y1="14" x2="8" y2="4"/>
  <polyline points="4,7 8,3 12,7"/>
  <line x1="3" y1="14" x2="13" y2="14"/>
</svg>
```

**Extrato (→)**
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="2" y1="8" x2="13" y2="8"/>
  <polyline points="9,4 13,8 9,12"/>
</svg>
```

### Estados da Quick Actions Row

| Estado | Comportamento |
|--------|--------------|
| `default` | Pills visíveis, cor semântica por tipo |
| `hover (desktop)` | Elevação sutil + intensificação de cor — transição `160ms ease` |
| `active/pressed` | `scale(0.96)` — transição `80ms ease` |
| `disabled` | `opacity: .35`, `pointer-events: none` |
| `loading` | Substituir cada pill por skeleton oval: `width: 100px; height: 36px; border-radius: 999px` com shimmer |

---

## 5. Card KPI Secundário

### Anatomia

```
┌────────────────────────────────────┐
│ [ícone 40px]   Vendas do mês       │
│  [bg dim]      [label · 11px]      │
│                R$ 4.200,00         │
│                [24px · bold 700]   │
│                ↑ 8,2%  [verde]     │
└────────────────────────────────────┘
```

### CSS Spec

```css
.kpi-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: var(--glass-bg-1);
  border: 1px solid var(--glass-border-1);
  border-radius: 16px;
  backdrop-filter: var(--glass-blur-1);
  transition: all 200ms ease;
}

/* Ícone container circular */
.kpi-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* background definido via modificador semântico */
}

/* Modificadores de cor do ícone */
.kpi-card__icon--green  { background: var(--green-dim); }
.kpi-card__icon--red    { background: var(--red-dim); }
.kpi-card__icon--accent { background: rgba(108,71,255,.15); }
.kpi-card__icon--amber  { background: var(--amber-dim); }
.kpi-card__icon--blue   { background: var(--blue-dim); }

/* SVG do ícone — 20px */
.kpi-card__icon svg {
  width: 20px;
  height: 20px;
}
.kpi-card__icon--green  svg { color: var(--green); }
.kpi-card__icon--red    svg { color: var(--red); }
.kpi-card__icon--accent svg { color: var(--accent-2); }
.kpi-card__icon--amber  svg { color: var(--amber); }
.kpi-card__icon--blue   svg { color: var(--blue); }

/* Corpo de texto */
.kpi-card__body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.kpi-card__label {
  font-size: var(--text-xs);        /* 11px */
  font-weight: var(--font-medium);  /* 500 */
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: .04em;
}

.kpi-card__value {
  font-size: var(--text-2xl);       /* 24px */
  font-weight: var(--font-bold);    /* 700 */
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.kpi-card__delta {
  font-size: var(--text-xs);        /* 11px */
  font-weight: var(--font-semibold); /* 600 */
  display: flex;
  align-items: center;
  gap: 3px;
}
.kpi-card__delta--up   { color: var(--green); }
.kpi-card__delta--down { color: var(--red); }

/* Hover desktop */
.kpi-card:hover {
  background: var(--glass-bg-3);
  border-color: var(--glass-border-2);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}
```

### Estados do KPI Card

| Estado | Comportamento |
|--------|--------------|
| `default` | Glass bg + borda sutil, ícone colorido |
| `hover (desktop)` | `bg: --glass-bg-3`, borda accent, `translateY(-1px)`, sombra suave |
| `active/pressed` | `scale(0.985)`, transição `80ms` |
| `disabled` | `opacity: .4`, ícone dessaturado |
| `skeleton` | Bloco ícone cinza 40px + duas linhas de texto skeleton (80px e 120px) |

---

## 6. Card de Transação

### Anatomia

```
┌───────────────────────────────────────────────┐
│ [Avatar 40px]   Nome da Transação   R$ 50,00  │
│  [ícone+bg]     12 jul · Alimentação  ↓ vermelho│
└───────────────────────────────────────────────┘
```

Sem border individual — separação feita por `border-bottom: 1px solid var(--border)`.

### CSS Spec

```css
.tx-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  transition: background 120ms ease;
  cursor: default;
}

/* Remover borda do último item */
.tx-card:last-child {
  border-bottom: none;
}

/* Avatar circular */
.tx-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* SVG do ícone de categoria — 18px */
.tx-card__avatar svg {
  width: 18px;
  height: 18px;
}

/* Corpo central — ocupa espaço restante */
.tx-card__body {
  flex: 1;
  min-width: 0;
}

.tx-card__name {
  font-size: var(--text-base);      /* 13px */
  font-weight: var(--font-medium);  /* 500 */
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tx-card__meta {
  font-size: var(--text-sm);        /* 12px */
  color: var(--text-tertiary);
  margin-top: 2px;
}

/* Valor — lado direito */
.tx-card__amount {
  font-size: var(--text-base);      /* 13px */
  font-weight: var(--font-semibold); /* 600 */
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.tx-card__amount--negative { color: var(--red); }
.tx-card__amount--positive { color: var(--green); }
.tx-card__amount--neutral  { color: var(--text-secondary); }

/* Hover desktop */
.tx-card:hover {
  background: var(--glass-bg-1);
  border-radius: 8px;
}

/* Active mobile */
.tx-card:active {
  background: var(--glass-bg-2);
}
```

### Mapa de categorias — cor + ícone SVG

| Categoria | Cor do avatar | Ícone (18px, inline) |
|-----------|--------------|----------------------|
| Alimentação | `var(--green-dim)` · ícone `var(--green)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2 C9 2 4 6 4 10 a5 5 0 0 0 10 0 C14 6 9 2 9 2Z"/><line x1="9" y1="10" x2="9" y2="16"/></svg>` |
| Moradia | `rgba(108,71,255,.15)` · ícone `var(--accent-2)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8 L9 2 L16 8 L16 16 L2 16 Z"/><rect x="6" y="11" width="6" height="5"/></svg>` |
| Transporte | `var(--amber-dim)` · ícone `var(--amber)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="8" rx="2"/><circle cx="5" cy="14" r="1.5"/><circle cx="13" cy="14" r="1.5"/><path d="M2 10 L16 10"/><path d="M6 6 L6 2 L12 2 L12 6"/></svg>` |
| Saúde | `var(--red-dim)` · ícone `var(--red)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 2 C5 2 2 5 2 8 C2 11 5 14 9 16 C13 14 16 11 16 8 C16 5 13 2 9 2Z"/></svg>` |
| Lazer | `var(--blue-dim)` · ícone `var(--blue)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/></svg>` |
| Fornecedor | `rgba(108,71,255,.15)` · ícone `var(--accent)` | ícone 2.2 da sidebar, `width="18" height="18"` |
| Vendas / Receita | `var(--green-dim)` · ícone `var(--green)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="14" x2="9" y2="4"/><polyline points="5,7 9,3 13,7"/></svg>` |
| Outros | `rgba(255,255,255,.05)` · ícone `var(--text-tertiary)` | `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="7"/><circle cx="9" cy="9" r="2" fill="currentColor" stroke="none"/></svg>` |

### Estados do Transaction Card

| Estado | Comportamento |
|--------|--------------|
| `default` | Fundo transparente, `border-bottom` como separador |
| `hover (desktop)` | `background: var(--glass-bg-1)`, `border-radius: 8px` |
| `active/pressed` | `background: var(--glass-bg-2)` |
| `selecionado` | `background: var(--glass-bg-2)`, `border-left: 2px solid var(--accent)`, `padding-left: 14px` |
| `skeleton` | Avatar cinza 40px + duas linhas (140px e 90px) à esquerda + bloco 60px à direita |

---

## 7. Empty States — SVGs completos inline

### 7a. ERP não conectado

```svg
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="es-accent-a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6C47FF" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#B47BFF" stop-opacity="0.3"/>
    </linearGradient>
  </defs>

  <!-- Documento/planilha base -->
  <rect x="28" y="18" width="50" height="64" rx="5" fill="url(#es-accent-a)" stroke="#6C47FF" stroke-opacity="0.5" stroke-width="1.5"/>

  <!-- Cabeçalho do documento -->
  <rect x="28" y="18" width="50" height="14" rx="5" fill="#6C47FF" fill-opacity="0.4"/>
  <rect x="32" y="35" width="42" height="3" rx="1.5" fill="#6C47FF" fill-opacity="0.4"/>
  <rect x="32" y="42" width="36" height="3" rx="1.5" fill="#6C47FF" fill-opacity="0.25"/>
  <rect x="32" y="49" width="40" height="3" rx="1.5" fill="#6C47FF" fill-opacity="0.25"/>
  <rect x="32" y="56" width="30" height="3" rx="1.5" fill="#6C47FF" fill-opacity="0.15"/>

  <!-- Seta upload circular -->
  <circle cx="88" cy="28" r="14" fill="#6C47FF" fill-opacity="0.15" stroke="#6C47FF" stroke-opacity="0.4" stroke-width="1.5"/>
  <!-- Seta para cima -->
  <line x1="88" y1="35" x2="88" y2="21" stroke="#8B6FFF" stroke-width="2" stroke-linecap="round"/>
  <polyline points="83,26 88,21 93,26" stroke="#8B6FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Título -->
  <text x="60" y="97" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.85)">ERP não conectado</text>
  <!-- Subtítulo -->
  <text x="60" y="111" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="7.5" fill="rgba(255,255,255,0.4)">Execute atualizar-erp.ps1</text>
</svg>
```

### 7b. Sem transações

```svg
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="es-accent-b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6C47FF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#B47BFF" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <!-- Documento em branco -->
  <rect x="34" y="18" width="52" height="64" rx="5" fill="url(#es-accent-b)" stroke="#6C47FF" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- Linhas em branco (representam registros vazios) -->
  <line x1="44" y1="35" x2="76" y2="35" stroke="#6C47FF" stroke-opacity="0.25" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="44" y1="43" x2="76" y2="43" stroke="#6C47FF" stroke-opacity="0.2"  stroke-width="1.5" stroke-linecap="round"/>
  <line x1="44" y1="51" x2="68" y2="51" stroke="#6C47FF" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Ícone de documento em branco no centro -->
  <circle cx="60" cy="62" r="12" fill="#6C47FF" fill-opacity="0.15"/>
  <!-- Página dobrada -->
  <path d="M54 56 L54 68 L66 68 L66 59 L63 56 Z" stroke="#8B6FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M63 56 L63 59 L66 59" stroke="#8B6FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Título -->
  <text x="60" y="97" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.85)">Nenhum registro ainda</text>
  <!-- Subtítulo -->
  <text x="60" y="109" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="7" fill="rgba(255,255,255,0.4)">Dados aparecerão após adicionar ao ERP</text>
</svg>
```

### 7c. Sem resultados de busca

```svg
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="es-accent-c" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6C47FF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#B47BFF" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Círculo da lupa -->
  <circle cx="54" cy="50" r="22" fill="url(#es-accent-c)" stroke="#6C47FF" stroke-opacity="0.4" stroke-width="1.75"/>

  <!-- Cabo da lupa -->
  <line x1="70" y1="66" x2="83" y2="79" stroke="#6C47FF" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>

  <!-- X dentro da lupa -->
  <line x1="47" y1="43" x2="61" y2="57" stroke="#8B6FFF" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="61" y1="43" x2="47" y2="57" stroke="#8B6FFF" stroke-width="2.5" stroke-linecap="round"/>

  <!-- Título -->
  <text x="60" y="97" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.85)">Nenhum resultado</text>
  <!-- Subtítulo -->
  <text x="60" y="109" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="7.5" fill="rgba(255,255,255,0.4)">Tente outros termos ou limpe os filtros</text>
</svg>
```

### Container padrão para empty states

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  gap: 4px;
}

.empty-state svg {
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
}

/* Os textos já estão embutidos no SVG via <text>,
   mas se preferir separar em HTML: */
.empty-state__title {
  font-size: var(--text-base);       /* 13px */
  font-weight: var(--font-semibold); /* 600 */
  color: var(--text-secondary);
}

.empty-state__subtitle {
  font-size: var(--text-sm);        /* 12px */
  color: var(--text-tertiary);
  max-width: 240px;
  line-height: 1.5;
}

.empty-state__cta {
  margin-top: 16px;
  /* Usar .quick-action--primary */
}
```

### Estados dos Empty States

| Estado | Comportamento |
|--------|--------------|
| `default` | SVG estático, título e subtítulo visíveis |
| `hover (desktop)` | SVG leve pulse: `animation: pulse 2s ease-in-out infinite` (`opacity: .7 → 1`) |
| `loading` | Substituir SVG por spinner circular accent 32px com `border: 2px solid var(--surface-3); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite` |
| `com CTA` | Botão `.quick-action--primary` abaixo do subtítulo após 300ms (stagger) |

---

## 8. Especificação consolidada de estados — todos os componentes

### Tabela mestre de transições

| Componente | default | hover | active/pressed | disabled | skeleton/loading |
|-----------|---------|-------|----------------|----------|-----------------|
| **Hero Card** | gradient-hero bg + borda gradiente + sparkline | `translateY(-1px)` + glow intenso | — | `opacity: .6` | shimmer 220×52px + sparkline substituída por retângulo |
| **Quick Action Pill (primary)** | gradient accent bg + shadow | shadow intensificado + `translateY(-1px)` | `scale(0.96)` | `opacity: .35`, no pointer | skeleton oval shimmer |
| **Quick Action Pill (semantic)** | glass bg + borda semântica 25% | bg dim semântico | `scale(0.96)` | `opacity: .35`, no pointer | skeleton oval shimmer |
| **KPI Card** | glass bg-1 + borda sutil | glass bg-3 + borda accent + `translateY(-1px)` | `scale(0.985)` | `opacity: .4` | avatar 40px + 2 linhas text skeleton |
| **Transaction Card** | fundo transparente + border-bottom | glass bg-1 + border-radius | glass bg-2 | `opacity: .4` | avatar 40px + 3 blocos skeleton |
| **Empty State** | SVG estático | SVG pulse (opacity .7→1, 2s loop) | — | — | spinner accent 32px |
| **Bottom Nav item** | ícone `text-tertiary` + label | — (sem hover no mobile) | scale(0.9) + ícone accent | — | — |
| **Bottom Nav item (ativo)** | ícone accent + indicador dot 4px abaixo | — | — | — | — |
| **Sidebar item** | ícone + label `text-secondary` | bg glass-bg-1 + `border-radius: 8px` | bg glass-bg-2 | `opacity: .4` | — |
| **Sidebar item (ativo)** | bg `rgba(108,71,255,.15)` + borda esquerda 2px accent + ícone accent | intensifica bg | — | — | — |

### Especificação de transições

```css
/* Padrão global de easing */
--ease-ui:    cubic-bezier(0.4, 0, 0.2, 1); /* Material-style */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring — para scale */

/* Durações por tipo */
--duration-fast:   80ms;   /* active/pressed */
--duration-normal: 160ms;  /* hover padrão */
--duration-slow:   240ms;  /* modais, drawers */
--duration-layout: 320ms;  /* layout shifts */
```

### Animação shimmer (skeleton)

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-2) 25%,
    var(--surface-3) 50%,
    var(--surface-2) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: 6px;
}

/* Variante arredondada para avatares */
.skeleton--circle { border-radius: 50%; }
/* Variante pill para quick actions */
.skeleton--pill   { border-radius: 999px; }
```

### Animação spinner (loading de dados)

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--surface-3);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}
```

### Animação pulse (empty states hover)

```css
@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1;   }
}
```

---

## 9. Bottom Nav — Layout e Posicionamento

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  padding-bottom: env(safe-area-inset-bottom); /* iPhone notch */
  background: rgba(7, 11, 20, 0.92);
  backdrop-filter: var(--glass-blur-2);
  border-top: 1px solid var(--glass-border-1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 16px;
  cursor: pointer;
  color: var(--text-tertiary);
  transition: color var(--duration-normal) var(--ease-ui);
}

.bottom-nav__item svg {
  width: 24px;
  height: 24px;
}

.bottom-nav__label {
  font-size: var(--text-micro); /* 10px */
  font-weight: var(--font-medium);
  letter-spacing: .02em;
}

/* Item ativo */
.bottom-nav__item--active {
  color: var(--accent-2);
  position: relative;
}
.bottom-nav__item--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-2);
}

/* Botão FAB central (Add) */
.bottom-nav__fab {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--gradient-accent);
  box-shadow: 0 4px 20px rgba(108, 71, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform var(--duration-normal) var(--ease-spring),
              box-shadow var(--duration-normal) var(--ease-ui);
  margin-bottom: 8px; /* flutua levemente acima */
}
.bottom-nav__fab:hover {
  box-shadow: 0 6px 28px rgba(108, 71, 255, 0.6);
}
.bottom-nav__fab:active {
  transform: scale(0.92);
  transition-duration: var(--duration-fast);
}
.bottom-nav__fab svg {
  width: 26px;
  height: 26px;
}
```

---

## 10. Sidebar Desktop — Layout

```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  background: var(--surface-1);
  border-right: 1px solid var(--glass-border-1);
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 50;
  overflow-y: auto;
}

/* Logomarca no topo */
.sidebar__brand {
  padding: 0 8px 20px;
  border-bottom: 1px solid var(--glass-border-1);
  margin-bottom: 8px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--text-base);      /* 13px */
  font-weight: var(--font-medium);  /* 500 */
  color: var(--text-secondary);
  transition: all var(--duration-normal) var(--ease-ui);
  text-decoration: none;
}

.sidebar__item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.sidebar__item:hover {
  background: var(--glass-bg-1);
  color: var(--text-primary);
}

.sidebar__item--active {
  background: rgba(108, 71, 255, 0.15);
  color: var(--accent-2);
  border-left: 2px solid var(--accent);
  padding-left: 8px; /* -2px para compensar a borda */
}

/* Grupo/section da sidebar */
.sidebar__section-label {
  font-size: var(--text-micro);     /* 10px */
  font-weight: var(--font-semibold);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: 12px 10px 4px;
}
```

---

## 11. Notas de implementação para o Frontend Developer

### Prioridade de entrega

1. **Design tokens** — `design-tokens.css` já existe; confirmar variáveis `--font-extrabold` (800) se não declarada
2. **Bottom Nav** — implementar primeiro (mobile-first); FAB tem `z-index` acima do nav
3. **Hero Card** — peça mais visível; sparkline pode usar dados mockados inicialmente
4. **Quick Actions** — scroll horizontal nativo no mobile; `scrollbar-width: none` no container
5. **KPI Cards** — grid 2-colunas no mobile, 4-colunas no desktop a partir de 1024px
6. **Transaction Cards** — virtualização recomendada se lista > 100 itens (IntersectionObserver ou react-virtual)
7. **Empty States** — carregar SVGs inline (não como `<img src>`) para herdar as CSS vars de cor
8. **Sidebar** — apenas para `min-width: 768px`; no mobile usar somente o Bottom Nav

### Fontes e carregamento

```html
<!-- No <head>, antes do CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Checklist a11y mínimo

- `aria-label` em todos os botões icon-only (Bottom Nav, FAB, pills de ação)
- `aria-current="page"` no item ativo da navegação
- `role="list"` e `role="listitem"` nos cards de transação
- Contrastes: valores monetários usam `var(--text-primary)` (passa AA 4.5:1 sobre `--surface-2`)
- Valores coloridos (verde/vermelho) não são a única distinção — incluir prefixo ↑/↓ em texto
- Skeleton loaders devem ter `aria-busy="true"` no container pai

---

*Documento gerado pelo ui-designer · Guaru App UI Spec v2.0 · 2026-07-01*
*Próximo passo: frontend-developer implementa a partir deste documento + design-tokens.css existente*
