/**
 * guaru-motion.js — Sistema de animações 2026
 * Guaru App · ERP Financeiro Dark Premium
 *
 * Carregado com `defer` APÓS app.js.
 * Não redefine render(), setFilter() nem listeners do app.js.
 *
 * API pública: window.GuaruMotion
 *   .countUp(element, targetValue, options)
 *   .applyStagger(container)
 *   .createRipple(event)
 */
(function () {
  'use strict';

  /* =========================================================================
     1. CSS DE MOTION — injetado dinamicamente (keyframes não presentes no
        design-tokens.css, mais classes utilitárias de animação)
     ========================================================================= */

  var MOTION_CSS = [
    /* --- Stagger de entrada --- */
    '.stagger-item {',
    '  opacity: 0;',
    '  animation: guaru-slideUp var(--duration-enter, 500ms) var(--ease-enter, cubic-bezier(0.22,1,0.36,1)) forwards;',
    '  animation-delay: calc(var(--i, 0) * 60ms);',
    '}',

    /* Alias para a spec (stagger-enter) */
    '.stagger-enter {',
    '  animation: guaru-fadeSlideUp 300ms var(--ease-enter, cubic-bezier(0.22,1,0.36,1)) both;',
    '  animation-delay: calc(var(--i, 0) * 60ms);',
    '}',

    '@keyframes guaru-slideUp {',
    '  from { opacity: 0; transform: translateY(20px); }',
    '  to   { opacity: 1; transform: translateY(0); }',
    '}',

    '@keyframes guaru-fadeSlideUp {',
    '  from { opacity: 0; transform: translateY(16px); }',
    '  to   { opacity: 1; transform: translateY(0); }',
    '}',

    /* --- Ripple --- */
    '.ripple-effect {',
    '  position: absolute;',
    '  width: 0; height: 0;',
    '  border-radius: 50%;',
    '  background: rgba(255,255,255,0.25);',
    '  transform: translate(-50%, -50%);',
    '  pointer-events: none;',
    '  animation: guaru-ripple 600ms var(--ease-ripple, cubic-bezier(0.4,0,0.6,1)) forwards;',
    '}',

    '@keyframes guaru-ripple {',
    '  to { width: 200px; height: 200px; opacity: 0; }',
    '}',

    /* --- Transições de aba --- */
    '#content {',
    '  position: relative;',
    '  overflow: hidden;',
    '}',

    '.tab-enter {',
    '  animation: guaru-slideIn 300ms var(--ease-decel, cubic-bezier(0,0,0.2,1)) forwards;',
    '}',

    '.tab-exit {',
    '  animation: guaru-slideOut 300ms var(--ease-decel, cubic-bezier(0,0,0.2,1)) forwards;',
    '  position: absolute; top: 0; left: 0; right: 0;',
    '  pointer-events: none;',
    '}',

    '@keyframes guaru-slideIn {',
    '  from { transform: translateX(var(--slide-from, 100%)); opacity: 0; }',
    '  to   { transform: translateX(0);                       opacity: 1; }',
    '}',

    '@keyframes guaru-slideOut {',
    '  from { transform: translateX(0);                      opacity: 1; }',
    '  to   { transform: translateX(var(--slide-to, -100%)); opacity: 0; }',
    '}',

    /* --- Search box --- */
    '#searchBox {',
    '  overflow: hidden;',
    '  transition: width 250ms var(--ease-decel, cubic-bezier(0,0,0.2,1)), opacity 200ms;',
    '  width: 0; opacity: 0;',
    '}',

    '#searchBox.open {',
    '  width: 200px; opacity: 1;',
    '}',

    /* Reduced-motion: desabilita todas as animações se solicitado */
    '@media (prefers-reduced-motion: reduce) {',
    '  .stagger-item, .stagger-enter, .tab-enter, .tab-exit, .ripple-effect {',
    '    animation: none !important;',
    '    transition: none !important;',
    '  }',
    '  .stagger-item, .stagger-enter { opacity: 1; }',
    '}',
  ].join('\n');

  /**
   * Injeta o bloco de CSS no <head>.
   * Idempotente — verifica se já foi injetado.
   */
  function injectMotionCSS() {
    if (document.getElementById('guaru-motion-css')) return;
    var style = document.createElement('style');
    style.id = 'guaru-motion-css';
    style.textContent = MOTION_CSS;
    document.head.appendChild(style);
  }

  /* =========================================================================
     2. COUNT-UP
     Anima um número de 0 ao valor alvo, formatado em pt-BR.
     Usa IntersectionObserver — só inicia quando o elemento entra no viewport.
     Não re-anima se `data-counted="true"`.
     ========================================================================= */

  /**
   * @param {Element} element   — elemento cujo textContent será animado
   * @param {number}  target    — valor numérico final
   * @param {Object}  [options]
   * @param {number}  [options.duration=1200]  — ms
   * @param {number}  [options.decimals=2]
   * @param {string}  [options.prefix='']
   * @param {string}  [options.suffix='']
   */
  function countUp(element, target, options) {
    if (!element) return;
    options = options || {};
    var duration = options.duration !== undefined ? options.duration : 1200;
    var decimals = options.decimals !== undefined ? options.decimals : 2;
    var prefix   = options.prefix  !== undefined ? options.prefix  : '';
    var suffix   = options.suffix  !== undefined ? options.suffix  : '';

    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';

    var start = null;
    var numericTarget = parseFloat(target) || 0;

    function tick(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      /* ease-out cúbico, alinhado com a spec (seção 9.2) */
      var ease     = 1 - Math.pow(1 - progress, 3);
      var current  = numericTarget * ease;

      element.textContent =
        prefix +
        current.toLocaleString('pt-BR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        /* garante valor exato no frame final */
        element.textContent =
          prefix +
          numericTarget.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  /**
   * Configura o IntersectionObserver que dispara countUp quando o elemento
   * chega no viewport.
   * Suporta marcação declarativa:
   *   <span data-countup="12540.50" data-prefix="R$ " data-suffix="" data-decimals="2">R$ 0,00</span>
   */
  function setupCountUpObserver() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: anima imediatamente todos os elementos declarativos */
      runDeclarativeCountUps(document);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.dataset.counted === 'true') {
          observer.unobserve(el);
          return;
        }
        var target   = parseFloat(el.dataset.countup) || 0;
        var prefix   = el.dataset.prefix   || '';
        var suffix   = el.dataset.suffix   || '';
        var decimals = el.dataset.decimals !== undefined
          ? parseInt(el.dataset.decimals, 10)
          : 2;
        countUp(el, target, { prefix: prefix, suffix: suffix, decimals: decimals });
        observer.unobserve(el);
      });
    }, { threshold: 0.2 });

    /* Observa elementos já presentes */
    observeCountUpElements(observer, document);

    /* Observa elementos adicionados dinamicamente (via MutationObserver de #content) */
    window._guaruCountUpObserver = observer;
  }

  function observeCountUpElements(observer, root) {
    var els = root.querySelectorAll('[data-countup]');
    els.forEach(function (el) {
      if (el.dataset.counted !== 'true') observer.observe(el);
    });
  }

  function runDeclarativeCountUps(root) {
    root.querySelectorAll('[data-countup]').forEach(function (el) {
      var target   = parseFloat(el.dataset.countup) || 0;
      var prefix   = el.dataset.prefix   || '';
      var suffix   = el.dataset.suffix   || '';
      var decimals = el.dataset.decimals !== undefined
        ? parseInt(el.dataset.decimals, 10)
        : 2;
      countUp(el, target, { prefix: prefix, suffix: suffix, decimals: decimals });
    });
  }

  /* =========================================================================
     3. RIPPLE
     Cria efeito de onda no ponto exato do clique.
     Aplica em: button, .loadbtn, .action-pill, .navitem, .ripple, [data-ripple],
     .bnav-item, .bnav-fab, .drawer-item
     ========================================================================= */

  var RIPPLE_SELECTOR = [
    'button',
    '.loadbtn',
    '.action-pill',
    '.navitem',
    '.ripple',
    '[data-ripple]',
    '.bnav-item',
    '.bnav-fab',
    '.drawer-item',
    '.bottom-nav-item',
  ].join(', ');

  /**
   * Adiciona handler de ripple em um elemento.
   * Idempotente — verifica `_guaruRipple`.
   * @param {Element} el
   */
  function addRipple(el) {
    if (el._guaruRipple) return;
    el._guaruRipple = true;

    var position = window.getComputedStyle(el).position;
    if (position === 'static') el.style.position = 'relative';
    if (window.getComputedStyle(el).overflow === 'visible') {
      el.style.overflow = 'hidden';
    }

    el.addEventListener('click', createRipple);
  }

  /**
   * Handler de ripple (pode ser usado externamente).
   * @param {MouseEvent|TouchEvent} event
   */
  function createRipple(event) {
    var el   = event.currentTarget;
    var rect = el.getBoundingClientRect();

    var clientX = event.clientX;
    var clientY = event.clientY;

    /* Suporte a touch */
    if (event.touches && event.touches.length) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    var x = clientX - rect.left;
    var y = clientY - rect.top;

    var span = document.createElement('span');
    span.className = 'ripple-effect';
    span.style.left = x + 'px';
    span.style.top  = y + 'px';

    el.appendChild(span);

    /* Remove o span ao final da animação — com fallback para reduced-motion */
    var removed = false;
    function removeSpan() {
      if (removed) return;
      removed = true;
      if (span.parentNode) span.parentNode.removeChild(span);
    }
    span.addEventListener('animationend', removeSpan, { once: true });
    setTimeout(removeSpan, 700); /* fallback: prefers-reduced-motion ou animação interrompida */
  }

  /**
   * Configura ripple em todos os elementos elegíveis presentes no root.
   * @param {Document|Element} root
   */
  function setupRippleIn(root) {
    root.querySelectorAll(RIPPLE_SELECTOR).forEach(addRipple);
  }

  function setupRipple() {
    setupRippleIn(document);
  }

  /* =========================================================================
     4. STAGGER — entrada sequencial de cards
     Monitora mutações em #content e aplica --i: 0, 1, 2... nos filhos.
     ========================================================================= */

  var STAGGER_ITEMS_SELECTOR = [
    '.kpi-card',
    '.panel',
    '.donut-card',
    '.glass-card',
    '.glass-card-hero',
    'tbody tr',
    '.transaction-card',
    '.tx-card',
  ].join(', ');

  /**
   * Aplica stagger nos filhos diretos de container que correspondem ao seletor.
   * Idempotente via `data-staggered`.
   * @param {Element} container
   */
  function applyStagger(container) {
    if (!container) return;
    var items = container.querySelectorAll(STAGGER_ITEMS_SELECTOR);
    var index = 0;
    items.forEach(function (el) {
      if (el.dataset.staggered) return;
      el.dataset.staggered = 'true';
      el.style.setProperty('--i', Math.min(index, 8));
      el.classList.add('stagger-item');
      index++;
    });
  }

  /**
   * Configura MutationObserver em #content.
   * Quando app.js renderiza novo conteúdo, stagger é aplicado automaticamente.
   */
  function setupStaggerObserver() {
    var content = document.getElementById('content');
    if (!content) return;

    /* Aplica no conteúdo já presente */
    applyStagger(content);

    var observer = new MutationObserver(function (mutations) {
      var hasNewNodes = mutations.some(function (m) {
        return m.addedNodes.length > 0;
      });
      if (!hasNewNodes) return;

      /* Pequeno timeout para aguardar o render completo do app.js */
      setTimeout(function () {
        applyStagger(content);

        /* Aplica ripple nos elementos novos */
        setupRippleIn(content);

        /* Registra novos elementos de countUp no observer */
        if (window._guaruCountUpObserver) {
          observeCountUpElements(window._guaruCountUpObserver, content);
        } else {
          runDeclarativeCountUps(content);
        }
      }, 50);
    });

    observer.observe(content, { childList: true, subtree: true });
  }

  /* =========================================================================
     5. TRANSIÇÕES DE ABA
     Detecta mudança de aba via MutationObserver em .navitem.active
     e aplica slide horizontal em #content.
     NÃO quebra a lógica de tabs do app.js.
     ========================================================================= */

  var TAB_ORDER = ['dashboard', 'vendas', 'apagar', 'areceber', 'fornecedores', 'clientes', 'produtos'];

  var _currentTab = null;

  function getTabIndex(tabName) {
    return TAB_ORDER.indexOf(tabName);
  }

  /**
   * Observa mudanças de classe nos .navitem para detectar a aba ativa,
   * define a direção do slide e adiciona classes de transição no #content.
   */
  function setupTabTransitions() {
    var navItems = document.querySelectorAll('.navitem[data-tab]');
    if (!navItems.length) return;

    var content = document.getElementById('content');
    if (!content) return;

    /* Detecta aba inicial */
    navItems.forEach(function (item) {
      if (item.classList.contains('active')) {
        _currentTab = item.dataset.tab || null;
      }
    });

    /* Observa mudança de classe em cada navitem */
    navItems.forEach(function (item) {
      var classObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.attributeName !== 'class') return;
          if (!item.classList.contains('active')) return;

          var newTab = item.dataset.tab;
          if (!newTab || newTab === _currentTab) return;

          /* Determina direção */
          var prevIndex = getTabIndex(_currentTab);
          var nextIndex = getTabIndex(newTab);
          var goingForward = nextIndex > prevIndex || prevIndex === -1;

          var slideFrom = goingForward ? '100%'  : '-100%';
          var slideTo   = goingForward ? '-100%' : '100%';

          content.style.setProperty('--slide-from', slideFrom);
          content.style.setProperty('--slide-to',   slideTo);
          content.classList.add('tab-enter');

          /* Remove classe após animação — filtra pelo nome para ignorar
             animationend de elementos filhos (stagger) que sobem via bubble */
          content.addEventListener('animationend', function handler(e) {
            if (e.animationName !== 'guaru-slideIn') return;
            content.classList.remove('tab-enter');
            content.removeEventListener('animationend', handler);
          });

          _currentTab = newTab;
        });
      });

      classObserver.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* =========================================================================
     6. SEARCH TOGGLE MOBILE
     Expande/recolhe #searchBox ao clicar em #searchToggle ou #searchToggleBtn.
     ========================================================================= */

  function setupSearchToggle() {
    /* Suporta ambos os IDs mencionados na spec */
    var btn   = document.getElementById('searchToggle') ||
                document.getElementById('searchToggleBtn');
    var input = document.getElementById('searchBox');
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      var isOpen = input.classList.contains('open') ||
                   input.classList.contains('expanded');

      /* Remove ambas as classes para garantir estado limpo */
      input.classList.remove('open', 'expanded');

      if (!isOpen) {
        input.classList.add('open');
        setTimeout(function () { input.focus(); }, 250);
        btn.setAttribute('aria-label', 'Fechar busca');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-label', 'Abrir busca');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    /* Escape fecha */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.classList.remove('open', 'expanded');
        btn.setAttribute('aria-label', 'Abrir busca');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  /* =========================================================================
     7. SYNC ACTIVE NAV
     Mantém o bottom nav sincronizado com a sidebar quando app.js ativa uma aba.
     ========================================================================= */

  function syncActiveNav() {
    /* Quando um .navitem recebe .active, sincroniza o item correspondente
       no .bottom-nav (se existir) e vice-versa. */
    var allNavItems = document.querySelectorAll('.navitem[data-tab]');
    if (!allNavItems.length) return;

    allNavItems.forEach(function (item) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.attributeName !== 'class') return;
          if (!item.classList.contains('active')) return;

          var tab = item.dataset.tab;
          if (!tab) return;

          /* Sincroniza todos os outros elementos com o mesmo data-tab */
          document.querySelectorAll('[data-tab="' + tab + '"]').forEach(function (el) {
            if (el === item) return;
            el.classList.add('active');
            el.setAttribute('aria-current', 'page');
          });

          /* Remove active dos demais */
          document.querySelectorAll('[data-tab]:not([data-tab="' + tab + '"])').forEach(function (el) {
            el.classList.remove('active');
            el.removeAttribute('aria-current');
          });

          /* Aria-current no item original */
          item.setAttribute('aria-current', 'page');
        });
      });

      observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /* =========================================================================
     8. INIT
     ========================================================================= */

  function init() {
    injectMotionCSS();
    setupRipple();
    setupStaggerObserver();
    /* setupSearchToggle removido — handler já registrado no script inline do HTML */
    setupCountUpObserver();
    setupTabTransitions();
    /* syncActiveNav removido — app.js já remove/adiciona .active em todos os
       .navitem ao mesmo tempo, tornando a sincronização via MutationObserver
       desnecessária e potencialmente causando cascata de callbacks */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* =========================================================================
     API PÚBLICA
     ========================================================================= */

  window.GuaruMotion = {
    /**
     * Anima um número de 0 ao target em pt-BR.
     * @param {Element} element
     * @param {number}  targetValue
     * @param {Object}  [options] — { duration, decimals, prefix, suffix }
     */
    countUp: countUp,

    /**
     * Aplica stagger de entrada nos filhos de container.
     * @param {Element} container
     */
    applyStagger: applyStagger,

    /**
     * Handler de ripple — pode ser passado diretamente como listener.
     * @param {MouseEvent} event
     */
    createRipple: createRipple,

    /**
     * Adiciona ripple a um elemento específico.
     * @param {Element} el
     */
    addRipple: addRipple,
  };

})();
