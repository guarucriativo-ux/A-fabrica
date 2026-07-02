# Performance Audit — Guaru App
Data: 2026-07-01

## Auditoria e Correções

### 1. Google Fonts — bloqueio de renderização (CORRIGIDO)
**Arquivo:** `Guaru_App.html` (linha 7–10)

**Problema:** O `<link>` do Google Fonts usava `rel="stylesheet"` padrão, que é render-blocking. O browser parava de renderizar a página inteira até baixar e processar a fonte. Em conexões lentas isso pode atrasar o First Contentful Paint em centenas de milissegundos.

**Solução aplicada:** Substituído pelo padrão não-bloqueante via `media="print" onload="this.media='all'"`. O browser baixa a fonte em segundo plano sem bloquear a renderização. Adicionado `<noscript>` como fallback para ambientes sem JavaScript.

**Antes:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Depois:**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
```

**Impacto esperado:** Redução do bloqueio de renderização; FCP melhora em ~200–500ms em conexões 3G.

---

### 2. Ordem dos scripts (SEM ALTERAÇÃO — já estava correta)
**Arquivo:** `Guaru_App.html` (linhas 450–455)

A ordem encontrada já era a correta:
1. `erp-data.js` — sem defer (define `window.ERP_EMBEDDED`)
2. `xlsx.full.min.js` — sem defer
3. `chart.umd.min.js` — sem defer (Chart deve existir quando app.js rodar)
4. `guaru-motion.js` — com defer
5. `guaru-sparkline.js` — com defer
6. `app.js` — sem defer, último

Nenhuma alteração necessária.

---

### 3. Stagger em tabelas grandes — cap de índice (CORRIGIDO)
**Arquivo:** `guaru-motion.js` (função `applyStagger`, linha ~350)

**Problema:** O stagger aplicava `--i` com o índice real do elemento sem limite. Em tabelas com 50, 100 ou mais linhas, o último item ficaria com `animation-delay: calc(100 * 60ms) = 6000ms` — aparecendo após 6 segundos. Isso causava degradação severa de UX e travamento visual perceptível.

**Solução aplicada:** Limitado o índice máximo a 8 via `Math.min(index, 8)`. Isso garante que o delay máximo seja `8 * 60ms = 480ms`, mantendo a animação fluida independente do tamanho da lista.

**Antes:**
```js
el.style.setProperty('--i', index);
```

**Depois:**
```js
el.style.setProperty('--i', Math.min(index, 8));
```

**Impacto esperado:** Tabelas com muitas linhas não travam a UX. Animação de entrada completa em no máximo ~780ms (480ms delay + 300ms duration) para qualquer número de itens.

---

### 4. Duplicação de variáveis CSS em guaru-visual-v2.css (SEM ALTERAÇÃO — não há duplicatas)
**Arquivo:** `guaru-visual-v2.css`

Inspeção completa do arquivo revelou que ele apenas **consome** tokens via `var(--bg)`, `var(--surface-1)`, `var(--accent)`, `var(--text-primary)` etc., sem **declarar** nenhum deles. O comentário no topo do arquivo ("NÃO duplica tokens do design-tokens.css") está correto e honrado.

Nenhuma declaração duplicada encontrada. Arquivo está limpo.

---

## Resumo

| # | Item | Status | Arquivo |
|---|------|--------|---------|
| 1 | Google Fonts render-blocking | Corrigido | `Guaru_App.html` |
| 2 | Ordem dos scripts | OK — sem alteração | `Guaru_App.html` |
| 3 | Stagger sem cap em tabelas grandes | Corrigido | `guaru-motion.js` |
| 4 | Duplicação de tokens CSS | OK — sem duplicatas | `guaru-visual-v2.css` |
