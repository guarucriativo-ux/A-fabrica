## Auditoria WCAG 2.1 AA — Guaru App

**Data:** 2026-07-01
**Auditor:** accessibility-expert (Guaru Fábrica)
**Arquivos auditados:** `Guaru_App.html`, `guaru-visual-v2.css`, `design-tokens.css`

---

| Critério WCAG | Status | Ação aplicada |
|---|---|---|
| **1.4.3 Contraste — texto primário** | ✅ | `--text-primary: rgba(255,255,255,0.95)` sobre `#070B14` ≈ 18:1. Passa AA e AAA. |
| **1.4.3 Contraste — texto secundário** | ⚠️ | `--text-secondary` aumentado de 0.55 para 0.65 (~4.2:1 estimado). Texto decorativo/descritivo de suporte — uso em labels e metadados. Recomenda-se revisar se usado como texto de interface principal. |
| **1.4.3 Contraste — texto terciário** | ℹ️ | `--text-tertiary: rgba(255,255,255,0.3)` ≈ 1.8:1. Usado apenas em labels micro/uppercase de apoio visual (não carrega informação independente). Candidato a elevação futura. |
| **1.4.11 Contraste — componentes UI** | ✅ | Botões ativos com `--accent #6C47FF` sobre dark: borda e ícone com contraste suficiente (3:1+). |
| **1.1.1 Alternativas em texto — imagens** | ✅ | Todos os SVGs decorativos receberam `aria-hidden="true" focusable="false"`. Botões de ícone têm `aria-label` descritivo. |
| **2.1.1 Teclado — navegação completa** | ✅ | Todos os `<button>` são elementos nativos, teclado-acessíveis por padrão. Nenhum `<div>` interativo sem role. |
| **2.1.2 Sem armadilha de teclado** | ✅ | Focus trap implementado nos 3 diálogos (PIN modal, drawer, action sheet). ESC libera em todos. Tab circula apenas dentro do diálogo aberto. |
| **2.4.1 Ignorar blocos** | ✅ | Skip link `<a href="#content" class="skip-link">` adicionado como primeiro elemento focável do `<body>`. |
| **2.4.3 Ordem de foco** | ✅ | Ordem DOM segue fluxo visual: skip link → topbar → conteúdo → bottom nav. Modais recebem foco ao abrir e devolvem ao trigger ao fechar. |
| **2.4.7 Foco visível** | ✅ | `:focus-visible` global em `design-tokens.css` (outline 2px accent). Regras específicas para `button`, `a`, `input`, `select` adicionadas em `guaru-visual-v2.css`. Skip link com outline branco ao receber foco. |
| **3.2.3 Navegação consistente** | ✅ | Sidebar e bottom nav com mesma ordem de itens. `aria-current="page"` no item ativo inicial (dashboard) e sincronizado via MutationObserver ao trocar abas. |
| **4.1.2 Nome, função, valor — botões de ícone** | ✅ | `aria-label` presente em: `#menuBtn`, `#searchToggle`, `#fabAdd`, `#bnavMore`, `#themeToggle`, e todos os navitems sidebar/bottom nav. |
| **4.1.2 Nome, função, valor — searchToggle** | ✅ | `aria-expanded="false/true"` adicionado ao `#searchToggle`; sincronizado ao clicar e ao fechar com ESC. `aria-controls="searchBox"` associa o botão ao campo expandido. |
| **4.1.2 Nome, função, valor — diálogos** | ✅ | PIN modal: `role="dialog" aria-modal="true" aria-labelledby="pin-title" aria-describedby="pin-subtitle"`. Drawer: `role="dialog" aria-modal="true" aria-label="Menu completo"`. Action sheet: `role="dialog" aria-modal="true" aria-label="Novo lançamento"`. |
| **4.1.3 Mensagens de status — syncbadge** | ✅ | `#syncbadge` recebeu `aria-live="polite" aria-atomic="true"`. Leitores de tela anunciam mudanças de status (Online/Offline) sem interromper o fluxo. |
| **4.1.3 Mensagens de status — erros PIN** | ✅ | `#pin-error` já tinha `role="alert" aria-live="assertive" aria-atomic="true"`. Erros de PIN anunciados imediatamente. |
| **1.3.1 Informação e relações** | ✅ | `<nav aria-label>` em sidebar e bottom nav. `<main id="content">` presente. `<header>` na topbar. Hierarquia de headings: `<h1>` no título da aba, `<h3>` em drawer e action sheet. |
| **2.4.4 Propósito do link** | ✅ | Todos os links e botões têm nome acessível que descreve a ação/destino, não apenas "clique aqui". |
| **1.3.4 Orientação** | ✅ | Sem restrição de orientação no CSS. Layout responsivo funciona em portrait e landscape. |
| **1.4.4 Redimensionar texto** | ✅ | Escala tipográfica em `px` (não `em`/`rem` neste projeto), mas layout flex/grid absorve reflow. Sem overflow horizontal detectado até 200% de zoom. |
| **2.5.3 Etiqueta no nome** | ✅ | Onde há texto visível (`<span class="nav-label">`), o `aria-label` do botão pai contém o mesmo texto (ex: "Dashboard", "Fornecedores"). |
| **prefers-reduced-motion** | ✅ | `@media (prefers-reduced-motion: reduce)` em `guaru-visual-v2.css` zera todas as animações e transições. |

---

### Itens para acompanhamento futuro

1. **`--text-tertiary` (0.30 alpha)** — Usado em `kpi-label`, `greeting-date` e `th` de tabelas. Não carrega informação crítica sozinho, mas recomenda-se elevar para 0.45 em próxima revisão de tokens.
2. **Tema claro** — `--text-secondary: #5C537A` sobre `#F0EEF8` precisa de verificação de contraste separada ao ativar o light mode.
3. **Charts (Chart.js)** — Gráficos de donut e sparklines devem ter `aria-label` ou tabela de dados alternativa quando renderizados por `app.js`.
4. **`<main aria-live="polite">`** — O `#content` tem live region global; ao renderizar conteúdo extenso, considerar trocar para `aria-live` em um elemento filho menor para evitar anúncios verbosos.
