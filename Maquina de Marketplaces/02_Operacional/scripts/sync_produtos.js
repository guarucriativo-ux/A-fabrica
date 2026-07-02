// Reescrita em Node (exceljs) do sync_produtos.py — o original só rodou dentro de uma sandbox
// de nuvem (caminho hardcoded /sessions/.../mnt/...) e nunca teve acesso ao notebook local, que
// não tem Python instalado. Mesma lógica: relê dados_produtos.js do site, agrega por produto,
// reconstrói a aba Produtos do ERP com formatação e dropdowns equivalentes ao openpyxl original.
const fs = require("fs");
const ExcelJS = require("exceljs");

const PURPLE = "FF5B3FA0";
const LIGHT = "FFF2F0FA";
const WHITE = "FFFFFFFF";
const THIN = { style: "thin", color: { argb: "FFCCCCCC" } };
const BORDER = { top: THIN, bottom: THIN, left: THIN, right: THIN };
const FONT = "Arial";

const [, , srcJsPath, erpPath] = process.argv;
if (!srcJsPath || !erpPath) {
  console.error("uso: node sync_produtos.js <dados_produtos.js> <ERP_Guaru_Estudio.xlsx>");
  process.exit(1);
}

// Backup datado antes de qualquer escrita — regra do CLAUDE.md pra qualquer automação que toque
// catálogo/ERP/planilhas: nunca sobrescrever sem ter uma cópia de segurança da versão anterior.
const path = require("path");
const backupDir = path.join(path.dirname(erpPath), "backups");
fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join(backupDir, `${path.basename(erpPath, ".xlsx")}_${stamp}.xlsx`);
fs.copyFileSync(erpPath, backupPath);
console.error(`Backup salvo em: ${backupPath}`);

const content = fs.readFileSync(srcJsPath, "utf-8");
const pattern = /\{name:"([^"]+)",tier:"([^"]+)",gram:"([^"]+)",qty:(\d+),custo:(\d+(?:\.\d+)?),venda:(\d+(?:\.\d+)?),corte:(true|false)\}/g;

const byName = new Map();
let m;
while ((m = pattern.exec(content)) !== null) {
  const [, name, tier, , , custo, venda] = m;
  const c = parseFloat(custo);
  const v = parseFloat(venda);
  if (!byName.has(name)) {
    byName.set(name, { minCusto: Infinity, maxCusto: 0, minVenda: Infinity, maxVenda: 0, count: 0, tiers: new Set() });
  }
  const d = byName.get(name);
  d.minCusto = Math.min(d.minCusto, c);
  d.maxCusto = Math.max(d.maxCusto, c);
  d.minVenda = Math.min(d.minVenda, v);
  d.maxVenda = Math.max(d.maxVenda, v);
  d.count += 1;
  d.tiers.add(tier);
}

const CATEGORIA_MAP = {
  "Couchê": "Guaru Estúdio — Cartão",
  "Verniz": "Guaru Estúdio — Cartão",
  "Laminação": "Guaru Estúdio — Cartão",
  "Hot Stamping": "Guaru Estúdio — Cartão",
  "Adesivo": "Guaru Estúdio — Adesivo",
  "Sticker": "Guaru Estúdio — Adesivo",
  "Rótulo": "Guaru Estúdio — Adesivo",
  "Lacre": "Guaru Estúdio — Adesivo",
};
function categoriaDe(nome) {
  const low = nome.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORIA_MAP)) {
    if (low.includes(k.toLowerCase())) return v;
  }
  return "Guaru Estúdio — Outro";
}

const MM_KITS = [
  ["Kit Acabamento Doceria", "Máquina de Marketplaces", "R$ 24,35", "R$ 34,90", "30.2%", "1", "GIV Online + CMB", "Ativo", "Já listado no site"],
  ["Kit Etiqueta Bijuteria", "Máquina de Marketplaces", "R$ 30,32", "R$ 39,90", "24.0%", "1", "GIV Online + CMB", "Ativo", "Copy pronta"],
  ["Kit Delivery", "Máquina de Marketplaces", "R$ 32,18", "R$ 42,90", "25.0%", "1", "GIV Online + CMB", "Ativo", "Copy pronta"],
  ["Kit Floricultura", "Máquina de Marketplaces", "R$ 49,71", "R$ 59,90", "17.0%", "1", "GIV Online + CMB", "Ativo", "Copy pronta"],
  ["Avental Personalizado DTF", "Guaru Estúdio — Têxtil", "R$ 13,00", "R$ 34,90", "62.7%", "1", "Scan Revenda + Silkado", "Em avaliação", "Ver Radar de Oportunidades"],
];

const HEADERS = ["Produto", "Categoria", "Faixa Custo", "Faixa Venda", "Margem %", "Nº Variações", "Fornecedor", "Status", "Observação"];
const WIDTHS = [32, 22, 16, 16, 11, 13, 18, 12, 30];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(erpPath);
  const ws = wb.getWorksheet("Produtos");
  if (!ws) throw new Error('Aba "Produtos" não encontrada no ERP.');

  // limpa as primeiras 60 linhas (mesmo range que o script original limpava)
  for (let r = 1; r <= 60; r++) {
    const row = ws.getRow(r);
    for (let c = 1; c <= 9; c++) row.getCell(c).value = null;
  }

  HEADERS.forEach((h, i) => {
    const cell = ws.getRow(1).getCell(i + 1);
    cell.value = h;
    cell.font = { name: FONT, bold: true, color: { argb: WHITE } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: PURPLE } };
    cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
    cell.border = BORDER;
    ws.getColumn(i + 1).width = WIDTHS[i];
  });

  let r = 2;
  const sortedNames = [...byName.keys()].sort((a, b) => a.localeCompare(b));
  for (const name of sortedNames) {
    const d = byName.get(name);
    const row = ws.getRow(r);
    const values = [
      name,
      categoriaDe(name),
      `R$ ${d.minCusto.toFixed(2)} – R$ ${d.maxCusto.toFixed(2)}`,
      `R$ ${d.minVenda.toFixed(2)} – R$ ${d.maxVenda.toFixed(2)}`,
      "50.0%",
      d.count,
      "GIV Online + CMB",
      "Ativo",
      "Sincronizado de dados_produtos.js (site)",
    ];
    values.forEach((v, i) => {
      const cell = row.getCell(i + 1);
      cell.value = v;
      cell.font = i === 8 ? { name: FONT, italic: true, size: 9, color: { argb: "FF808080" } } : { name: FONT };
      cell.border = BORDER;
      if (r % 2 === 1) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } };
    });
    r += 1;
  }

  r += 1;
  const sepCell = ws.getRow(r).getCell(1);
  sepCell.value = "— Linha Máquina de Marketplaces (kits fracionados) —";
  sepCell.font = { name: FONT, bold: true, italic: true, color: { argb: PURPLE } };
  for (let col = 1; col <= 9; col++) ws.getRow(r).getCell(col).border = BORDER;
  r += 1;

  for (const kitRow of MM_KITS) {
    const row = ws.getRow(r);
    kitRow.forEach((v, i) => {
      const cell = row.getCell(i + 1);
      cell.value = v;
      cell.font = i === 8 ? { name: FONT, italic: true, size: 9, color: { argb: "FF808080" } } : { name: FONT };
      cell.border = BORDER;
      if (r % 2 === 1) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } };
    });
    r += 1;
  }

  const lastDataRow = r - 1;
  for (let rr = r; rr < r + 10; rr++) {
    for (let col = 1; col <= 9; col++) {
      const cell = ws.getRow(rr).getCell(col);
      cell.border = BORDER;
      cell.font = { name: FONT };
    }
  }

  ws.dataValidations.add(`B2:B${r + 10}`, {
    type: "list",
    allowBlank: true,
    formulae: ['"Guaru Estúdio — Cartão,Guaru Estúdio — Adesivo,Guaru Estúdio — Têxtil,Guaru Estúdio — Outro,Máquina de Marketplaces"'],
  });
  ws.dataValidations.add(`H2:H${r + 10}`, {
    type: "list",
    allowBlank: true,
    formulae: ['"Ativo,Em avaliação,Descontinuado"'],
  });

  await wb.xlsx.writeFile(erpPath);
  console.log(JSON.stringify({ produtos_site: byName.size, kits_mm: MM_KITS.length, last_row: lastDataRow }));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
