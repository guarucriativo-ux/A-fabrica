/* ============================================================================
   GUARU APP — app.js  (Sprint 3)
   Painel interno offline da Guaru Estúdio + Máquina de Marketplaces.
   Lê o ERP_Guaru_Estudio.xlsx direto do disco (File System Access API) e
   renderiza um dashboard + tabelas com busca e filtros.

   ÍNDICE:
   1. ESTADO GLOBAL
   2. NAVEGAÇÃO (sidebar / troca de aba)
   3. CARREGAMENTO DO ARQUIVO — manual (input file) e automático (IndexedDB)
   4. LEITURA DA PLANILHA — helpers genéricos
   5. BUSCA E FILTROS — genérico, usado por toda tabela do app
   6. RENDERIZAÇÃO — roteador
   7. RENDERIZAÇÃO — tabelas genéricas
   8. RENDERIZAÇÃO — Dashboard (KPIs, donuts Chart.js, alertas, próximas contas)
   9. ATALHOS DE TECLADO

   Células que o Dashboard lê na aba "Dashboard" do xlsx:
     B7  = Gastos Fixos Pessoal / mês
     B37 = Saldo Atual (pessoal) — valor manual
     B11 = Vendas do Negócio (mês)
     C11 = A Receber (negócio)
     D11 = A Pagar (negócio)
     E11 = Nº Clientes Cadastrados
     B15:D27 = lista de gastos fixos pessoais (Item/Valor/Vencimento)
     B28:D35 = lista de contas a pagar do negócio (Item/Valor/Vencimento)
     C40:C43 = vendas por canal (Shopee/WhatsApp/Site/Instagram), mês atual
   ============================================================================ */

(function () {

/* ============================================================================
   HELPERS DE SEGURANÇA
   ============================================================================ */
/**
 * Escapa caracteres HTML para evitar XSS.
 * @param {*} v
 * @returns {string}
 */
function escHtml(v) {
  if (v === undefined || v === null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Injeta CSS adicional de runtime (KPI delta + alert banner) */
(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .kpi-delta { font-size: 11px; font-weight: 600; margin-top: 3px; }
    .text-green { color: var(--green, #1E8A5F); }
    .text-red   { color: var(--red, #D33030); }
    .alert-banner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: var(--amber-dim, rgba(255,181,71,0.15));
      border: 1px solid var(--amber, #FFB547);
      border-radius: var(--radius-md, 10px);
      padding: 12px 16px;
      margin-bottom: 20px;
      font-size: 13px;
      color: var(--text-primary, rgba(255,255,255,0.9));
    }
    .alert-icon { font-size: 18px; flex-shrink: 0; }
  `;
  document.head.appendChild(style);
})();


/* ============================================================================
   1. ESTADO GLOBAL
   ============================================================================ */
let WB = null;            // workbook carregado (SheetJS)
let currentTab = "dashboard";
const titles = {
  dashboard: "Dashboard", fornecedores: "Fornecedores", clientes: "Clientes",
  produtos: "Produtos", vendas: "Vendas", apagar: "Contas a Pagar", areceber: "Contas a Receber"
};

/** Registro de instâncias Chart.js para destruir antes de recriar. */
window._charts = window._charts || {};


/* ============================================================================
   2. NAVEGAÇÃO
   ============================================================================ */
document.querySelectorAll(".navitem").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".navitem").forEach(n => n.classList.remove("active"));
    el.classList.add("active");
    currentTab = el.dataset.tab;
    document.getElementById("tab-title").textContent = titles[currentTab];
    render();
  });
});


/* ============================================================================
   3. CARREGAMENTO DO ARQUIVO
   ============================================================================ */

/* ---- IndexedDB: salva/recupera conteúdo do arquivo entre sessões ---- */
function idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("guaru-app-db", 2);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("handles")) db.createObjectStore("handles");
      if (!db.objectStoreNames.contains("files")) db.createObjectStore("files");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * @param {string} store
 * @param {string} key
 * @param {*} val
 * @returns {Promise<void>}
 */
async function idbSet(store, key, val) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * @param {string} store
 * @param {string} key
 * @returns {Promise<*>}
 */
async function idbGet(store, key) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function setSyncBadge(state, text) {
  const el = document.getElementById("syncbadge");
  if (state === "live") {
    el.innerHTML = '<span class="synctag live"><span class="dot pulse"></span>' + escHtml(text) + '</span>';
  } else if (state === "off") {
    el.innerHTML = '<span class="synctag off"><span class="dot"></span>' + escHtml(text) + '</span>';
  } else {
    el.innerHTML = "";
  }
}

/**
 * Lê o ArrayBuffer, inicializa o workbook e renderiza.
 * @param {ArrayBuffer} buf
 * @param {string} name
 */
function loadFromBuffer(buf, name) {
  WB = XLSX.read(new Uint8Array(buf), { type: "array", cellNF: false, cellDates: true });
  const connArea = document.getElementById('connectionArea');
  if (connArea) connArea.style.display = 'none';
  document.getElementById("filestatus").textContent = "Conectado: " + escHtml(name);
  setSyncBadge("live", "Carregado — " + new Date().toLocaleTimeString("pt-BR"));
  render();
}

/* ---- Carregamento via input (sempre funciona) + salva no IndexedDB ---- */
document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function (ev) {
    const buf = ev.target.result;
    await idbSet("files", "erp-buf", buf);
    await idbSet("files", "erp-name", file.name);
    await idbSet("files", "erp-ts", Date.now());
    loadFromBuffer(buf, file.name);
  };
  reader.readAsArrayBuffer(file);
});

/* Botão Conectar abre o seletor de arquivo */
document.getElementById("connectBtn").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

/** TTL de 7 dias para o cache IndexedDB. */
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

/* ---- Startup: carrega ERP embutido (erp-data.js) ou restaura do IndexedDB ---- */
(async () => {
  if (window.ERP_EMBEDDED) {
    const bin = atob(window.ERP_EMBEDDED);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    loadFromBuffer(buf.buffer, window.ERP_NAME || "ERP_Guaru_Estudio.xlsx");
    setSyncBadge("live", "ERP permanente — atualizado em " + (window.ERP_TS || ""));
    return;
  }
  /* Fallback: tenta IndexedDB (carregado manualmente antes) */
  try {
    const buf  = await idbGet("files", "erp-buf");
    const name = await idbGet("files", "erp-name");
    const ts   = await idbGet("files", "erp-ts");

    if (buf && name && ts && (Date.now() - ts) < TTL_MS) {
      loadFromBuffer(buf, name);
    } else if (buf) {
      /* Expirado — limpar silenciosamente */
      const db = await idbOpen();
      const tx = db.transaction("files", "readwrite");
      ["erp-buf", "erp-name", "erp-ts"].forEach(k => tx.objectStore("files").delete(k));
    }
  } catch (_) { /* primeira vez */ }

  /* Se nenhum dado foi carregado, mostrar área de conexão */
  if (WB === null) {
    const connArea = document.getElementById('connectionArea');
    if (connArea) connArea.style.display = '';
  }
})();


/* ============================================================================
   4. LEITURA DA PLANILHA — helpers genéricos
   ============================================================================ */
/**
 * Lê o valor de uma célula do workbook.
 * @param {string} sheetName
 * @param {string} ref  ex: "B7"
 * @returns {*}
 */
function cell(sheetName, ref) {
  if (!WB) return "";
  const ws = WB.Sheets[sheetName];
  if (!ws) return "";
  const c = ws[ref];
  return c ? c.v : "";
}

/**
 * Formata um número como moeda BRL.
 * @param {*} v
 * @returns {string}
 */
function fmtMoney(v) {
  if (v === "" || v === undefined || v === null || isNaN(v)) return "—";
  return "R$ " + Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Formata uma data para pt-BR.
 * @param {*} v
 * @returns {string}
 */
function fmtDate(v) {
  if (v instanceof Date) return v.toLocaleDateString("pt-BR");
  return v === undefined || v === null ? "" : String(v);
}

/**
 * Converte linhas de uma aba do workbook em array de arrays.
 * @param {string} sheetName
 * @param {number} startRow
 * @param {number} endRow
 * @param {string[]} cols  ex: ["A","B","C"]
 * @returns {Array[]}
 */
function sheetToRows(sheetName, startRow, endRow, cols) {
  if (!WB) return [];
  const ws = WB.Sheets[sheetName];
  if (!ws) return [];
  const rows = [];
  for (let r = startRow; r <= endRow; r++) {
    const row = cols.map(c => { const cc = ws[c + r]; return cc ? cc.v : ""; });
    if (row.some(v => v !== "" && v !== undefined)) rows.push(row);
  }
  return rows;
}


/* ============================================================================
   5. BUSCA E FILTROS GENÉRICOS
   ============================================================================ */
let VIEW = null; // {headers, allRows, moneyCols, filterableCols, target, activeFilters}

/**
 * Define a view ativa (tabela visível com busca e filtros).
 * @param {string[]} headers
 * @param {Array[]} rows
 * @param {number[]} moneyCols
 * @param {HTMLElement} target
 */
function setView(headers, rows, moneyCols, target) {
  const filterableCols = [];
  headers.forEach((h, i) => {
    if (moneyCols && moneyCols.includes(i)) return;
    const distinct = new Set(rows.map(r => r[i]));
    if (distinct.size > 1 && distinct.size <= 8) filterableCols.push(i);
  });
  VIEW = { headers, allRows: rows, moneyCols: moneyCols || [], filterableCols, target, activeFilters: {} };
  const sb = document.getElementById("searchBox");
  if (sb) sb.value = "";
  renderFilterBar();
  renderView();
}

function renderFilterBar() {
  const bar = document.getElementById("filterbar");
  if (!bar) return;
  if (!VIEW || VIEW.filterableCols.length === 0) { bar.innerHTML = ""; return; }
  bar.innerHTML = VIEW.filterableCols.map(i => {
    const distinct = [...new Set(VIEW.allRows.map(r => r[i]))].filter(v => v !== undefined && v !== "").sort();
    const current = VIEW.activeFilters[i] || "";
    const opts = ['<option value="">' + escHtml(VIEW.headers[i]) + ' (todos)</option>'].concat(
      distinct.map(v => '<option value="' + escHtml(String(v)) + '"' + (String(v) === current ? " selected" : "") + '>' + escHtml(String(v)) + '</option>')
    ).join("");
    return '<select data-col="' + i + '" onchange="setFilter(this)" class="filter-select">' + opts + '</select>';
  }).join("");
}

/**
 * Atualiza o filtro ativo da coluna selecionada e re-renderiza.
 * Chamada via onchange="setFilter(this)" no HTML gerado.
 * @param {HTMLSelectElement} sel
 */
function setFilter(sel) {
  const col = +sel.dataset.col;
  if (sel.value) VIEW.activeFilters[col] = sel.value;
  else delete VIEW.activeFilters[col];
  renderView();
}

function renderView() {
  if (!VIEW) return;
  const sb = document.getElementById("searchBox");
  const term = (sb ? sb.value : "").toLowerCase();
  const rows = VIEW.allRows.filter(r => {
    for (const col in VIEW.activeFilters) {
      if (String(r[col]) !== VIEW.activeFilters[col]) return false;
    }
    if (!term) return true;
    return r.some(v => String(v).toLowerCase().includes(term));
  });
  renderTableHTML(VIEW.target, VIEW.headers, rows, VIEW.moneyCols);
}

/**
 * Renderiza uma tabela HTML dentro de um elemento container.
 * @param {HTMLElement} el
 * @param {string[]} headers
 * @param {Array[]} rows
 * @param {number[]} moneyCols
 */
function renderTableHTML(el, headers, rows, moneyCols) {
  if (!el) return;
  if (rows.length === 0) {
    el.innerHTML = '<div class="panel"><div class="empty">Nenhum resultado encontrado.</div></div>';
    return;
  }
  const origemCol = headers.indexOf("Origem");
  const tipoCol   = headers.indexOf("Tipo");
  let html = '<table><tr>' + headers.map(h => '<th>' + escHtml(h) + '</th>').join('') + '</tr>';
  rows.forEach(r => {
    html += '<tr>' + r.map((v, i) => {
      if (moneyCols.includes(i)) return '<td>' + fmtMoney(v) + '</td>';
      if (i === origemCol) {
        const cls = v === "Pessoal" ? "pessoal" : "negocio";
        return '<td><span class="tag ' + cls + '">' + escHtml(String(v)) + '</span></td>';
      }
      if (i === tipoCol && (v === "Entrada" || v === "Saída")) {
        const cls = v === "Entrada" ? "entrada" : "saida";
        return '<td><span class="tag ' + cls + '">' + escHtml(String(v)) + '</span></td>';
      }
      if (v instanceof Date) return '<td>' + fmtDate(v) + '</td>';
      return '<td>' + escHtml(v) + '</td>';
    }).join('') + '</tr>';
  });
  html += '</table>';
  el.innerHTML = html;
}

/* ---- Busca com debounce ---- */
const __searchBoxEl = document.getElementById("searchBox");
let _searchDebounce = null;
if (__searchBoxEl) {
  __searchBoxEl.addEventListener("input", () => {
    clearTimeout(_searchDebounce);
    _searchDebounce = setTimeout(renderView, 180);
  });
}


/* ============================================================================
   6. RENDERIZAÇÃO — ROTEADOR
   ============================================================================ */
/**
 * Roteia a renderização para a aba ativa.
 * Exposta em window.render para chamadas do HTML.
 */
function render() {
  const el = document.getElementById("content");
  const filterbar = document.getElementById("filterbar");
  if (!WB) {
    if (filterbar) filterbar.innerHTML = "";
    VIEW = null;
    el.innerHTML = '<div class="dropzone">Clique em "Conectar Planilha" e selecione o arquivo<br><b>ERP_Guaru_Estudio.xlsx</b></div>';
    return;
  }
  if (currentTab === "dashboard")    return renderDashboard(el);
  if (currentTab === "fornecedores") return renderTable(el, "Fornecedores",      2, 50, ["A","B","C","D","E","F"],           ["Fornecedor","O que fornece","Contato","Condições","Usado em","Status"]);
  if (currentTab === "clientes")     return renderTable(el, "Clientes",           2, 60, ["A","B","C","D","E","F"],           ["Nome","Contato","Canal","1º Contato","Total Comprado","Observação"], [4]);
  if (currentTab === "produtos")     return renderTable(el, "Produtos",            2, 40, ["A","B","C","D","E","F","G","H","I"], ["Produto","Categoria","Faixa Custo","Faixa Venda","Margem %","Nº Variações","Fornecedor","Status","Observação"]);
  if (currentTab === "vendas")       return renderTable(el, "Vendas",              2, 50, ["A","B","C","D","E","F","G","H","I"], ["Data","Cliente","Produto","Qtd","Vl.Unit","Vl.Total","Canal","Status","NF"], [4,5]);
  if (currentTab === "apagar")       return renderTable(el, "Contas a Pagar",     2, 30, ["A","B","C","D","E","F"],           ["Data","Descrição","Categoria","Valor","Vencimento","Status"], [3], lancamentosRows("apagar"));
  if (currentTab === "areceber")     return renderTable(el, "Contas a Receber",   2, 30, ["A","B","C","D","E"],               ["Data Esperada","Cliente/Canal","Pedido","Valor","Status"], [3], lancamentosRows("areceber"));
}
window.render = render;
window.setFilter = setFilter;


/* ============================================================================
   7. RENDERIZAÇÃO — TABELAS GENÉRICAS
   ============================================================================ */
/**
 * Lê dados de uma aba e configura a VIEW para busca/filtro.
 */
function renderTable(el, sheetName, start, end, cols, headers, moneyCols, extraRows) {
  const xlsxRows = sheetToRows(sheetName, start, end, cols);
  const rows = (extraRows && extraRows.length) ? extraRows.concat(xlsxRows) : xlsxRows;
  const filterbar = document.getElementById("filterbar");
  if (rows.length === 0) {
    if (filterbar) filterbar.innerHTML = "";
    VIEW = null;
    el.innerHTML = '<div class="panel"><div class="empty">Nenhum registro ainda em ' + escHtml(sheetName) + '.</div></div>';
    return;
  }
  setView(headers, rows, moneyCols || [], el);
}


/* ============================================================================
   LANÇAMENTOS LOCAIS (localStorage)
   ============================================================================ */
var LS_LANC = "guaru-lancamentos";

function getLancamentos() {
  try { return JSON.parse(localStorage.getItem(LS_LANC) || "[]"); } catch (e) { return []; }
}

function _saveLancEntry(entry) {
  var list = getLancamentos();
  entry.id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
  list.unshift(entry);
  localStorage.setItem(LS_LANC, JSON.stringify(list));
}

function lancamentosRows(tipo) {
  return getLancamentos()
    .filter(function (l) { return l.tipo === tipo; })
    .map(function (l) {
      if (tipo === "apagar") {
        return [l.data || "", l.descricao || "", l.categoria || "", Number(l.valor) || 0, l.vencimento || "", l.status || "Pendente"];
      }
      if (tipo === "areceber") {
        return [l.vencimento || "", l.descricao || "", "", Number(l.valor) || 0, l.status || "Pendente"];
      }
      return [];
    })
    .filter(function (r) { return r.length > 0; });
}

function atualizarFormLanc() {
  var tipo = (document.getElementById("lancTipo") || {}).value;
  var labelDesc = document.getElementById("labelDescLanc");
  var grupoCategoria = document.getElementById("grupoCategoriaLanc");
  var labelVenc = document.getElementById("labelVencLanc");
  var selStatus = document.getElementById("lancStatus");
  if (tipo === "areceber") {
    if (labelDesc) labelDesc.textContent = "Cliente / Canal";
    if (grupoCategoria) grupoCategoria.style.display = "none";
    if (labelVenc) labelVenc.textContent = "Data Esperada";
    if (selStatus) selStatus.innerHTML =
      '<option value="Pendente">Pendente</option>' +
      '<option value="Recebido">Recebido</option>' +
      '<option value="Atrasado">Atrasado</option>';
  } else {
    if (labelDesc) labelDesc.textContent = "Descrição";
    if (grupoCategoria) grupoCategoria.style.display = "";
    if (labelVenc) labelVenc.textContent = "Vencimento";
    if (selStatus) selStatus.innerHTML =
      '<option value="Pendente">Pendente</option>' +
      '<option value="Pago">Pago</option>' +
      '<option value="Mensal">Mensal</option>' +
      '<option value="Atrasado">Atrasado</option>';
  }
}

function salvarLancamento(e) {
  if (e && e.preventDefault) e.preventDefault();
  var tipo       = (document.getElementById("lancTipo")       || {}).value || "apagar";
  var data       = (document.getElementById("lancData")       || {}).value || "";
  var descricao  = ((document.getElementById("lancDescricao") || {}).value || "").trim();
  var categoria  = ((document.getElementById("lancCategoria") || {}).value || "").trim();
  var valorRaw   = (document.getElementById("lancValor")      || {}).value || "0";
  var valor      = parseFloat(valorRaw.replace(",", ".")) || 0;
  var vencimento = (document.getElementById("lancVencimento") || {}).value || "";
  var status     = (document.getElementById("lancStatus")     || {}).value || "Pendente";

  if (!descricao || !valor) {
    alert("Preencha pelo menos Descrição e Valor.");
    return;
  }

  _saveLancEntry({ tipo: tipo, data: data, descricao: descricao, categoria: categoria, valor: valor, vencimento: vencimento, status: status });

  ["lancData", "lancDescricao", "lancCategoria", "lancValor", "lancVencimento"].forEach(function (id) {
    var el2 = document.getElementById(id);
    if (el2) el2.value = "";
  });

  var overlay = document.getElementById("sheetOverlay");
  if (overlay) overlay.style.display = "none";

  if (currentTab === tipo) render();
}
window.salvarLancamento = salvarLancamento;
window.atualizarFormLanc = atualizarFormLanc;


/* ============================================================================
   8. RENDERIZAÇÃO — DASHBOARD
   ============================================================================ */
function classifyExpense(name) {
  const n = String(name).toLowerCase();
  if (/aluguel|luz|água|agua|internet casa|condom/.test(n)) return { label: "Moradia",           color: "#5B3FA0" };
  if (/celular|telefone/.test(n))                            return { label: "Telefonia",          color: "#3B82C4" };
  if (/spotify|netflix|adobe|claude|assinatura/.test(n))    return { label: "Assinaturas",        color: "#1FA39C" };
  if (/carro|perua|combust/.test(n))                        return { label: "Transporte",          color: "#C77700" };
  if (/cart[aã]o de cr[eé]dito/.test(n))                   return { label: "Cartão de Crédito",  color: "#C2487A" };
  return { label: "Outros", color: "#9AA0AE" };
}

/**
 * Cria um elemento wrapper donut com Chart.js.
 * O canvas é montado via innerHTML; initCharts() cria o gráfico depois
 * que o elemento estiver no DOM.
 *
 * @param {string} containerId  ID do canvas
 * @param {Array<{label:string, value:number, color:string}>} data
 * @returns {HTMLElement}
 */
function buildDonut(containerId, data) {
  const labels = data.map(d => d.label);
  const values = data.map(d => d.value);
  const colors = data.map(d => d.color);

  const legend = data.map(d =>
    '<div class="donut-legend-item">' +
      '<span class="legend-dot" style="background:' + d.color + '"></span>' +
      escHtml(d.label) +
      '<span class="legend-val">' + fmtMoney(d.value) + '</span>' +
    '</div>'
  ).join('');

  const wrap = document.createElement('div');
  wrap.className = 'donut-wrap';
  wrap.innerHTML =
    '<div style="width:120px;height:120px;flex-shrink:0;position:relative">' +
      '<canvas id="' + escHtml(containerId) + '"></canvas>' +
    '</div>' +
    '<div class="donut-legend">' + legend + '</div>';

  /* Guarda os dados no elemento para initCharts() consumir */
  wrap._chartData = { labels, values, colors };
  return wrap;
}

/**
 * Inicializa todos os canvas com id^="donut-" que ainda não têm chart.
 * Chamada com setTimeout após inserção no DOM.
 */
function initCharts() {
  if (typeof Chart === 'undefined') return;
  document.querySelectorAll('canvas[id^="donut-"]').forEach(canvas => {
    const id = canvas.id;
    const wrap = canvas.closest('.donut-wrap');
    if (!wrap || !wrap._chartData) return;

    const { labels, values, colors } = wrap._chartData;

    if (window._charts[id]) {
      window._charts[id].destroy();
      delete window._charts[id];
    }

    window._charts[id] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: '72%',
        animation: { duration: 700, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ' ' + ctx.label + ': ' + fmtMoney(ctx.raw)
            }
          }
        }
      }
    });
  });
}

/**
 * Gera o HTML de um card KPI com delta opcional.
 * @param {string} icon
 * @param {string} iconBg  cor hex ou var()
 * @param {string} label
 * @param {string} value   já formatado
 * @param {number|null} [delta]  percentual (positivo = alta, negativo = queda)
 * @returns {string}
 */
function kpiCard(icon, iconBg, label, value, delta) {
  let deltaHtml = '';
  if (delta !== undefined && delta !== null && !isNaN(delta)) {
    const isPos  = delta >= 0;
    const arrow  = isPos ? '↑' : '↓';
    const cls    = isPos ? 'text-green' : 'text-red';
    deltaHtml = '<div class="kpi-delta ' + cls + '">' + arrow + ' ' + Math.abs(delta).toFixed(1) + '%</div>';
  }
  return (
    '<div class="kpi-card">' +
      '<div class="kpi-icon" style="background:' + iconBg + '22;color:' + iconBg + ';">' + icon + '</div>' +
      '<div class="kpi-text">' +
        '<div class="kpi-label">' + escHtml(label) + '</div>' +
        '<div class="kpi-value">' + escHtml(String(value)) + '</div>' +
        deltaHtml +
      '</div>' +
    '</div>'
  );
}

/**
 * Retorna alertas de vencimento para contas vencendo em até 5 dias.
 * @param {Array[]} rows  cada linha: [Item, Valor, Vencimento, Origem]
 * @returns {Array<{nome:string, valor:*, dias:number, origem:string}>}
 */
function checkVencimentos(rows) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const alertas = [];
  rows.forEach(r => {
    const venc = r[2];
    if (!venc) return;
    const d = venc instanceof Date ? venc : new Date(venc);
    if (isNaN(d.getTime())) return;
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    if (diff >= 0 && diff <= 5) {
      alertas.push({ nome: r[0], valor: r[1], dias: diff, origem: r[3] || '' });
    }
  });
  return alertas;
}

/**
 * Renderiza o dashboard completo via appendChild (necessário para Chart.js).
 * @param {HTMLElement} el  #content
 */
function renderDashboard(el) {
  /* Limpar charts anteriores */
  Object.keys(window._charts).forEach(id => {
    try { window._charts[id].destroy(); } catch (_) {}
    delete window._charts[id];
  });
  el.innerHTML = '';

  /* Dados do Dashboard */
  const gastosFixos = cell("Dashboard", "B7");
  const saldoAtual  = cell("Dashboard", "B37");
  const vendasMes   = cell("Dashboard", "B11");
  const aReceber    = cell("Dashboard", "C11");
  const aPagar      = cell("Dashboard", "D11");
  const clientes    = cell("Dashboard", "E11");

  /* --- Hero Card: Saldo + Quick Actions --- */
  /* Delta vs mês anterior: calculado se existir célula B38, senão 0 */
  const saldoAnterior = cell("Dashboard", "B38");
  const delta = (saldoAnterior && Number(saldoAnterior) !== 0)
    ? ((Number(saldoAtual) - Number(saldoAnterior)) / Math.abs(Number(saldoAnterior))) * 100
    : 0;

  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card glass-card-hero stagger-item';
  heroCard.style.cssText = '--i:0;margin-bottom:16px';
  heroCard.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
      '<div>' +
        '<span class="label-micro" style="color:rgba(255,255,255,0.5)">SALDO DISPONÍVEL</span>' +
        '<div class="gradient-text" style="font-size:52px;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums;margin-top:4px" id="heroSaldo">' +
          escHtml(fmtMoney(saldoAtual)) +
        '</div>' +
        '<div style="font-size:12px;color:' + (delta >= 0 ? '#00D97E' : '#FF4D6A') + ';margin-top:6px;font-weight:600">' +
          (delta >= 0 ? '↑' : '↓') + ' ' +
          Math.abs(delta).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) +
          '% vs mês anterior' +
        '</div>' +
      '</div>' +
      '<div id="heroSparkline" class="hero-sparkline" style="width:120px;height:48px;flex-shrink:0"></div>' +
    '</div>' +
    '<div class="quick-actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">' +
      '<button class="action-pill primary ripple" onclick="document.getElementById(\'fabAdd\')?.click()">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
        'Lançar' +
      '</button>' +
      '<button class="action-pill ripple" onclick="document.querySelector(\'.navitem[data-tab=areceber]\')?.click()" style="color:var(--green)">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' +
        'Receber' +
      '</button>' +
      '<button class="action-pill ripple" onclick="document.querySelector(\'.navitem[data-tab=apagar]\')?.click()" style="color:var(--red)">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>' +
        'Pagar' +
      '</button>' +
      '<button class="action-pill ripple" onclick="document.querySelector(\'.navitem[data-tab=vendas]\')?.click()">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 10h8M8 14h5"/></svg>' +
        'Extrato' +
      '</button>' +
    '</div>';
  el.appendChild(heroCard);

  /* --- KPI row --- */
  const kpiDiv = document.createElement('div');
  kpiDiv.className = 'kpi-row';
  kpiDiv.innerHTML = [
    kpiCard("💰", "#1E8A5F", "Saldo Atual (Pessoal)",       fmtMoney(saldoAtual)),
    kpiCard("🏠", "#C77700", "Gastos Fixos Pessoal / mês",  fmtMoney(gastosFixos)),
    kpiCard("📈", "#5B3FA0", "Vendas do Negócio (mês)",     fmtMoney(vendasMes)),
    kpiCard("⬆️", "#1E8A5F", "A Receber (negócio)",         fmtMoney(aReceber)),
    kpiCard("⬇️", "#C77700", "A Pagar (negócio)",           fmtMoney(aPagar)),
    kpiCard("👤", "#3B82C4", "Clientes Cadastrados",        String(clientes || "0"))
  ].join('');
  el.appendChild(kpiDiv);

  /* --- Dados donuts --- */
  const pessoalRows = sheetToRows("Dashboard", 15, 27, ["B", "C"]);
  const byCategory = {};
  pessoalRows.forEach(r => {
    const c = classifyExpense(r[0]);
    if (!byCategory[c.label]) byCategory[c.label] = { value: 0, color: c.color };
    byCategory[c.label].value += Number(r[1]) || 0;
  });
  const donut1Data = Object.entries(byCategory)
    .map(([label, d]) => ({ label, value: d.value, color: d.color }))
    .sort((a, b) => b.value - a.value);

  const canais = [
    ["Shopee",    "C40", "#5B3FA0"],
    ["WhatsApp",  "C41", "#1E8A5F"],
    ["Site",      "C42", "#3B82C4"],
    ["Instagram", "C43", "#C2487A"]
  ];
  const donut2Data = canais.map(c => ({
    label: c[0],
    value: Number(cell("Dashboard", c[1])) || 0,
    color: c[2]
  }));

  /* --- Donut row --- */
  const donutRow = document.createElement('div');
  donutRow.className = 'donut-row';

  const card1 = document.createElement('div');
  card1.className = 'donut-card';
  const h4a = document.createElement('h4');
  h4a.textContent = 'Despesas Fixas por Categoria (Pessoal)';
  card1.appendChild(h4a);
  card1.appendChild(buildDonut('donut-pessoal', donut1Data));

  const card2 = document.createElement('div');
  card2.className = 'donut-card';
  const h4b = document.createElement('h4');
  h4b.textContent = 'Vendas por Canal (Negócio, mês atual)';
  card2.appendChild(h4b);
  card2.appendChild(buildDonut('donut-canais', donut2Data));

  donutRow.appendChild(card1);
  donutRow.appendChild(card2);
  el.appendChild(donutRow);

  /* --- Próximas Contas: alertas de vencimento --- */
  const pessoalContas = sheetToRows("Dashboard", 15, 27, ["B", "C", "D"]);
  const negocioContas = sheetToRows("Dashboard", 28, 35, ["B", "C", "D"]);
  const combined = pessoalContas.map(r => [...r, "Pessoal"]).concat(negocioContas.map(r => [...r, "Negócio"]));

  const alertas = checkVencimentos(combined);
  if (alertas.length > 0) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-banner';
    const listText = alertas.map(a =>
      escHtml(String(a.nome)) + ' (' + (a.dias === 0 ? 'hoje' : 'em ' + a.dias + ' dia(s)') + ')'
    ).join(', ');
    alertDiv.innerHTML =
      '<span class="alert-icon">⚠️</span>' +
      '<div><strong>' + alertas.length + ' conta(s) vencendo em breve:</strong> ' + listText + '</div>';
    el.appendChild(alertDiv);
  }

  /* --- Seção: Próximas Contas --- */
  const contasTitle = document.createElement('div');
  contasTitle.className = 'section-title';
  contasTitle.textContent = 'Próximas Contas — Pessoal + Negócio';
  el.appendChild(contasTitle);

  const contasDiv = document.createElement('div');
  contasDiv.id = 'dashboardContasTable';
  el.appendChild(contasDiv);

  if (combined.length === 0) {
    contasDiv.innerHTML = '<div class="panel"><div class="empty">Sem contas cadastradas ainda.</div></div>';
  } else {
    renderTableHTML(contasDiv, ["Item", "Valor", "Vencimento", "Origem"], combined, [1]);
  }

  /* --- Seção: Extrato Pessoal --- */
  const extratoTitle = document.createElement('div');
  extratoTitle.className = 'section-title';
  extratoTitle.textContent = 'Extrato — Lançamentos Pessoais (mais recente primeiro)';
  el.appendChild(extratoTitle);

  const extratoDiv = document.createElement('div');
  extratoDiv.id = 'dashboardExtratoTable';
  el.appendChild(extratoDiv);

  const lancamentos = sheetToRows("Lançamentos Pessoal", 2, 200, ["A", "B", "C", "D", "E", "F"]);
  const extratoRows = lancamentos
    .filter(r => r[1] === "Pessoal")
    .sort((a, b) => {
      const da = a[0] instanceof Date ? a[0].getTime() : Number(a[0]) || 0;
      const db = b[0] instanceof Date ? b[0].getTime() : Number(b[0]) || 0;
      return db - da;
    })
    .map(r => [r[0], r[2], r[3], r[4], r[5]]);

  if (extratoRows.length === 0) {
    const filterbar = document.getElementById("filterbar");
    if (filterbar) filterbar.innerHTML = "";
    VIEW = null;
    extratoDiv.innerHTML = '<div class="panel"><div class="empty">Nenhum lançamento pessoal ainda.</div></div>';
  } else {
    setView(["Data", "Tipo", "Categoria", "Descrição", "Valor"], extratoRows, [4], extratoDiv);
  }

  /* Inicializar charts após o DOM estar pronto */
  setTimeout(initCharts, 50);
}


/* ============================================================================
   9. ATALHOS DE TECLADO
   ============================================================================ */
const TAB_KEYS = {
  '1': 'dashboard', '2': 'fornecedores', '3': 'clientes',
  '4': 'produtos',  '5': 'vendas',       '6': 'apagar',  '7': 'areceber'
};

document.addEventListener('keydown', (e) => {
  /* Ignorar quando foco está em campo de entrada */
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  /* 1-7 para trocar aba */
  if (TAB_KEYS[e.key]) {
    const tab = TAB_KEYS[e.key];
    document.querySelectorAll('.navitem').forEach(n => n.classList.remove('active'));
    const navEl = document.querySelector('.navitem[data-tab="' + tab + '"]');
    if (navEl) navEl.classList.add('active');
    currentTab = tab;
    document.getElementById('tab-title').textContent = titles[tab];
    render();
    e.preventDefault();
    return;
  }

  /* Escape — limpa busca e filtros */
  if (e.key === 'Escape') {
    const sb = document.getElementById('searchBox');
    if (sb) { sb.value = ''; renderView(); }
    if (VIEW) { VIEW.activeFilters = {}; renderFilterBar(); renderView(); }
    return;
  }

  /* / — foca na busca */
  if (e.key === '/') {
    const sb = document.getElementById('searchBox');
    if (sb) { sb.focus(); e.preventDefault(); }
  }
});

})(); /* fim da IIFE */
