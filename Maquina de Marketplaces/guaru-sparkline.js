/* ============================================================================
   GUARU SPARKLINE — guaru-sparkline.js
   Renderizador de sparklines SVG inline para o card hero de saldo do ERP.

   Carregado com `defer` após app.js. Requer SheetJS (XLSX) e window.WB
   disponibilizado por app.js.

   API pública exposta em window.GuaruSparkline:
     .render(container, data, options)  → <svg>
     .renderBar(container, data, options) → <svg>
     .mount()                           → void  (auto-detecta #heroSparkline)
   ============================================================================ */
(function () {
  'use strict';

  /* ============================================================================
     1. renderSparkline — linha + área gradiente
     @param {HTMLElement|null} container  elemento onde inserir o SVG
     @param {number[]}         data       array de valores numéricos (mín. 2)
     @param {Object}           [options]
     @param {number}           [options.width=120]
     @param {number}           [options.height=48]
     @param {string}           [options.color='#8B6FFF']
     @param {string}           [options.areaColor]  sobrescrito pelo gradiente
     @param {number}           [options.strokeWidth=2]
     @returns {SVGSVGElement}
  ============================================================================ */
  function renderSparkline(container, data, options) {
    options = Object.assign(
      { width: 120, height: 48, color: '#8B6FFF', strokeWidth: 2 },
      options || {}
    );

    if (!data || data.length < 2) {
      data = [0, 1]; // fallback seguro
    }

    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = (max - min) || 1;
    var w = options.width;
    var h = options.height;
    var pad = 3;

    /* Mapeia cada valor em coordenadas SVG */
    var points = data.map(function (v, i) {
      var x = pad + (i / (data.length - 1)) * (w - pad * 2);
      var y = pad + (1 - (v - min) / range) * (h - pad * 2);
      return [x, y];
    });

    /* Path da linha */
    var linePath = 'M ' + points.map(function (p) {
      return p[0].toFixed(2) + ' ' + p[1].toFixed(2);
    }).join(' L ');

    /* Path da área (fecha no bottom) */
    var last = points[points.length - 1];
    var first = points[0];
    var areaPath =
      linePath +
      ' L ' + last[0].toFixed(2) + ' ' + h +
      ' L ' + first[0].toFixed(2) + ' ' + h + ' Z';

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('aria-hidden', 'true');
    svg.style.overflow = 'visible';
    svg.style.display = 'block';

    /* ---- Gradient def ---- */
    var defs = document.createElementNS(ns, 'defs');
    var gradId = 'spark-grad-' + Math.random().toString(36).substr(2, 6);
    var grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', gradId);
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0');
    grad.setAttribute('y2', '1');

    var stop1 = document.createElementNS(ns, 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', options.color);
    stop1.setAttribute('stop-opacity', '0.35');

    var stop2 = document.createElementNS(ns, 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', options.color);
    stop2.setAttribute('stop-opacity', '0');

    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    /* ---- Área preenchida ---- */
    var area = document.createElementNS(ns, 'path');
    area.setAttribute('d', areaPath);
    area.setAttribute('fill', 'url(#' + gradId + ')');
    svg.appendChild(area);

    /* ---- Linha principal ---- */
    var line = document.createElementNS(ns, 'path');
    line.setAttribute('d', linePath);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', options.color);
    line.setAttribute('stroke-width', options.strokeWidth);
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(line);

    /* ---- Ponto no último valor ---- */
    var dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('cx', last[0].toFixed(2));
    dot.setAttribute('cy', last[1].toFixed(2));
    dot.setAttribute('r', 3);
    dot.setAttribute('fill', options.color);
    svg.appendChild(dot);

    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }

    return svg;
  }


  /* ============================================================================
     2. renderMiniBar — barras verticais para cards KPI secundários
     @param {HTMLElement|null} container
     @param {number[]}         data       7 valores recomendados
     @param {Object}           [options]
     @param {number}           [options.width=60]
     @param {number}           [options.height=24]
     @param {string}           [options.color='#6C47FF']
     @param {number}           [options.gap=2]        espaço entre barras
     @returns {SVGSVGElement}
  ============================================================================ */
  function renderMiniBar(container, data, options) {
    options = Object.assign(
      { width: 60, height: 24, color: '#6C47FF', gap: 2 },
      options || {}
    );

    if (!data || data.length === 0) {
      data = [1];
    }

    var max = Math.max.apply(null, data) || 1;
    var w = options.width;
    var h = options.height;
    var n = data.length;
    var totalGap = options.gap * (n - 1);
    var barW = Math.max(1, (w - totalGap) / n);

    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('aria-hidden', 'true');
    svg.style.display = 'block';

    data.forEach(function (v, i) {
      var barH = Math.max(2, (v / max) * h);
      var x = i * (barW + options.gap);
      var y = h - barH;
      var isLast = (i === n - 1);

      var rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', x.toFixed(2));
      rect.setAttribute('y', y.toFixed(2));
      rect.setAttribute('width', barW.toFixed(2));
      rect.setAttribute('height', barH.toFixed(2));
      rect.setAttribute('rx', '1.5');
      rect.setAttribute('fill', options.color);
      rect.setAttribute('fill-opacity', isLast ? '1' : '0.3');
      svg.appendChild(rect);
    });

    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    }

    return svg;
  }


  /* ============================================================================
     3. extractSparklineData — obtém os últimos 7 saldos a partir do workbook
        Estratégia:
        a) Tenta ler da sheet "Lançamentos Pessoal" cols A (data) e E (saldo
           acumulado ou valor), ordenando por data e calculando saldo corrente.
        b) Se não houver dados suficientes, usa curva sintética baseada no
           saldo atual (Dashboard B37).
        c) Fallback final: valores de demonstração.
     @returns {number[]}  array com 7 números
  ============================================================================ */
  function extractSparklineData() {
    try {
      /* Tenta usar o workbook carregado por app.js */
      var wb = window.WB;

      if (wb) {
        /* --- Tenta extrair saldo dos últimos 7 dias via Lançamentos Pessoal --- */
        var ws = wb.Sheets['Lançamentos Pessoal'];
        if (ws) {
          var lancamentos = [];
          for (var r = 2; r <= 300; r++) {
            var dataCell  = ws['A' + r];
            var valorCell = ws['D' + r]; // coluna Valor (índice 3 no sheetToRows)
            var tipoCell  = ws['C' + r]; // Entrada / Saída

            if (!dataCell || !valorCell) continue;

            var dt = dataCell.v;
            var vl = Number(valorCell.v) || 0;
            var tp = tipoCell ? String(tipoCell.v) : '';

            if (vl === 0) continue;

            /* SheetJS retorna datas como Date ou número serial */
            var dateObj = (dt instanceof Date) ? dt : new Date(dt);
            if (isNaN(dateObj.getTime())) continue;

            lancamentos.push({
              date: dateObj,
              valor: (tp === 'Saída' || tp === 'Saida') ? -vl : vl
            });
          }

          if (lancamentos.length >= 3) {
            /* Ordena por data */
            lancamentos.sort(function (a, b) { return a.date - b.date; });

            /* Calcula saldo acumulado dia a dia */
            var saldoAcc = 0;
            var byDay = {};
            lancamentos.forEach(function (l) {
              saldoAcc += l.valor;
              var key = l.date.toISOString().substr(0, 10);
              byDay[key] = saldoAcc;
            });

            var days = Object.keys(byDay).sort();
            /* Pega os últimos 7 dias com lançamento */
            var last7 = days.slice(-7).map(function (k) { return byDay[k]; });

            if (last7.length >= 2) {
              /* Preenche até 7 pontos se houver menos */
              while (last7.length < 7) {
                last7.unshift(last7[0]);
              }
              return last7;
            }
          }
        }

        /* --- Fallback: curva sintética baseada no saldo atual (Dashboard B37) --- */
        var dshSheet = wb.Sheets['Dashboard'];
        if (dshSheet && dshSheet['B37']) {
          var saldoAtual = Number(dshSheet['B37'].v) || 0;
          if (saldoAtual > 0) {
            return _syntheticCurve(saldoAtual);
          }
        }
      }
    } catch (e) {
      /* Silencioso — cai no fallback */
    }

    /* --- Fallback final: dados de demonstração --- */
    return [7200, 8100, 7500, 9800, 9200, 11400, 12540];
  }

  /**
   * Gera uma curva plausível de 7 pontos terminando em `endValue`.
   * @param {number} endValue
   * @returns {number[]}
   */
  function _syntheticCurve(endValue) {
    /* Variações relativas simuladas (suave tendência de alta) */
    var ratios = [0.57, 0.65, 0.60, 0.78, 0.73, 0.91, 1.00];
    return ratios.map(function (r) {
      return Math.round(endValue * r);
    });
  }


  /* ============================================================================
     4. mountHeroSparkline — detecta o container e renderiza
        Procura por #heroSparkline ou .hero-sparkline no DOM.
        Se não encontrar, aguarda via MutationObserver até o app.js criar o hero.
  ============================================================================ */
  function mountHeroSparkline() {
    var container = _findContainer();
    if (container) {
      _doRender(container);
      return;
    }

    /* Observer para quando app.js inserir o hero card no DOM */
    var root = document.getElementById('content') || document.body;
    var observer = new MutationObserver(function () {
      var c = _findContainer();
      if (c) {
        _doRender(c);
        observer.disconnect();
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  }

  /**
   * Encontra o elemento container da sparkline no DOM.
   * @returns {HTMLElement|null}
   */
  function _findContainer() {
    return (
      document.getElementById('heroSparkline') ||
      document.querySelector('.hero-sparkline') ||
      null
    );
  }

  /**
   * Executa a renderização com dados extraídos do workbook.
   * @param {HTMLElement} container
   */
  function _doRender(container) {
    var data = extractSparklineData();
    renderSparkline(container, data, {
      width: 120,
      height: 48,
      color: '#8B6FFF',
      strokeWidth: 2
    });
  }


  /* ============================================================================
     5. API pública
  ============================================================================ */
  window.GuaruSparkline = {
    /** Renderiza sparkline de linha+área em container. */
    render: renderSparkline,
    /** Renderiza mini barras verticais em container. */
    renderBar: renderMiniBar,
    /** Monta a sparkline no card hero (auto-detecta container). */
    mount: mountHeroSparkline,
    /** Extrai / gera os dados para a sparkline. */
    extractData: extractSparklineData
  };


  /* ============================================================================
     6. Auto-mount
  ============================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHeroSparkline);
  } else {
    mountHeroSparkline();
  }

})();
