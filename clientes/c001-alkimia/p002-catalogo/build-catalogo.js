// Gerador do Catálogo Alkimia — SVG -> PNG (sharp) -> PDF (pdf-lib)
// Roda do scratchpad/imgtool (onde sharp e pdf-lib estão instalados).
const sharp = require('sharp');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const PROJ = 'C:/Users/Freitas Quitanda/Desktop/A fábrica/clientes/c001-alkimia/p002-catalogo';
const A = PROJ + '/assets';
const BUILD = PROJ + '/build';
fs.mkdirSync(BUILD, { recursive: true });

// ---- canvas A4 @ ~180dpi ----
const W = 1488, H = 2105;
const MX = 150;                 // margem lateral
const CW = W - 2 * MX;          // largura de conteúdo
const INK = '#0e0e0e', GRAY = '#6f6f6f', HAIR = '#d8d8d8', PAGE = '#ffffff';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, sans-serif";
const MONO = "'Courier New', monospace";

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const b64 = p => 'data:image/' + (p.endsWith('.jpg') ? 'jpeg' : 'png') + ';base64,' + fs.readFileSync(p).toString('base64');

function wrap(text, max) {
  const words = text.split(' '); const lines = []; let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { if (cur) lines.push(cur); cur = w; }
    else cur = (cur ? cur + ' ' : '') + w;
  }
  if (cur) lines.push(cur); return lines;
}
function para(text, x, y, max, size, lh, fill = INK, font = SANS, weight = 400) {
  return wrap(text, max).map((ln, i) =>
    `<text x="${x}" y="${y + i * lh}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(ln)}</text>`
  ).join('');
}
// rótulo mono em caixa alta com tracking
function label(text, x, y, fill = GRAY, size = 22) {
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" letter-spacing="3" fill="${fill}">${esc(text.toUpperCase())}</text>`;
}
function sectionHead(num, title, y) {
  return label(num, MX, y) +
    `<text x="${MX}" y="${y + 78}" font-family="${SERIF}" font-size="66" font-weight="700" fill="${INK}">${esc(title)}</text>` +
    `<line x1="${MX}" y1="${y + 108}" x2="${W - MX}" y2="${y + 108}" stroke="${HAIR}" stroke-width="2"/>`;
}
function footer(pageLabel) {
  const y = H - 70;
  return `<line x1="${MX}" y1="${y - 28}" x2="${W - MX}" y2="${y - 28}" stroke="${HAIR}" stroke-width="2"/>` +
    `<text x="${MX}" y="${y}" font-family="${SERIF}" font-size="22" font-weight="700" letter-spacing="4" fill="${INK}">ALKIMIA</text>` +
    `<text x="${W - MX}" y="${y}" text-anchor="end" font-family="${MONO}" font-size="18" letter-spacing="2" fill="${GRAY}">${esc(pageLabel)}</text>`;
}
const open = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${PAGE}"/>`;
const close = `</svg>`;

const pages = [];

// ---------- PÁGINA 1 — CAPA ----------
pages.push(open +
  label('Estampa & confecção · São Paulo · desde 2021', MX, 200) +
  `<text x="${MX}" y="430" font-family="${SERIF}" font-size="190" font-weight="700" letter-spacing="6" fill="${INK}">ALKIMIA</text>` +
  `<text x="${MX}" y="510" font-family="${SANS}" font-size="40" fill="${INK}">Cortado, estampado e entregue dentro de casa.</text>` +
  // faixa de imagem (galpão / donos) com moldura fina
  `<rect x="${MX}" y="640" width="${CW}" height="1000" fill="#f2f2f0"/>` +
  `<image x="${MX}" y="640" width="${CW}" height="1000" xlink:href="${b64(A + '/fotos/quemsomos1.png')}" preserveAspectRatio="xMidYMid slice"/>` +
  `<rect x="${MX}" y="640" width="${CW}" height="1000" fill="none" stroke="${INK}" stroke-width="2"/>` +
  label('Catálogo e condições — 2026', MX, 1740) +
  `<text x="${W - MX}" y="1740" text-anchor="end" font-family="${MONO}" font-size="22" letter-spacing="2" fill="${GRAY}">alkimiaprod.com.br</text>` +
  close);

// ---------- PÁGINA 2 — QUEM É A ALKIMIA ----------
{
  let s = open + sectionHead('01', 'Quem é a Alkimia', 200);
  const p1 = 'A Alkimia é uma confecção familiar de São Paulo, na Vila Ema, tocada por dois artistas desde 2021. O tecido é cortado aqui dentro. A serigrafia e o DTF são feitos aqui dentro. Cada peça passa pela mão de quem responde pela entrega.';
  const p2 = 'A maior parte do que produzimos veste o audiovisual — produtoras, estúdios, locadoras de equipamento e as marcas que orbitam esse meio. Quem trabalha com imagem reconhece acabamento. É com esse padrão que atendemos também agências, marcas culturais e bandas.';
  s += para(p1, MX, 400, 64, 32, 50, INK, SANS);
  s += para(p2, MX, 400 + 50 * 4 + 40, 64, 32, 50, INK, SANS);
  // três marcadores do ofício
  const yb = 980; const items = [['Corte', 'Tecido cortado internamente'], ['Estampa', 'Silk e DTF dentro de casa'], ['Acabamento', 'Etiqueta e tag de marca']];
  items.forEach((it, i) => {
    const x = MX + i * (CW / 3);
    s += label(String(i + 1).padStart(2, '0'), x, yb, INK, 26);
    s += `<text x="${x}" y="${yb + 50}" font-family="${SERIF}" font-size="34" font-weight="700" fill="${INK}">${esc(it[0])}</text>`;
    s += para(it[1], x, yb + 92, 26, 22, 30, GRAY, SANS);
  });
  // foto de apoio (produto)
  s += `<image x="${MX}" y="1120" width="${CW}" height="700" xlink:href="${b64(A + '/fotos/img4565.jpg')}" preserveAspectRatio="xMidYMid slice"/>`;
  s += `<rect x="${MX}" y="1120" width="${CW}" height="700" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += footer('02 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 3 — QUEM JÁ VESTE ----------
{
  let s = open + sectionHead('02', 'Quem já veste Alkimia', 200);
  s += para('Equipes e marcas que já produziram com a gente.', MX, 380, 64, 30, 44, GRAY, SANS);
  const names = ['Canon', 'Shure', 'Cinemateca Brasileira', 'Camera Pro', 'Filmes do Bem', 'Hornet', 'Colateral Filmes', 'Trino Filmes', 'Dead Drivers'];
  const cols = 2, cellW = CW / cols, cellH = 150, y0 = 520;
  names.forEach((n, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = MX + c * cellW, y = y0 + r * cellH;
    s += `<text x="${x}" y="${y}" font-family="${SERIF}" font-size="44" font-weight="700" fill="${INK}">${esc(n)}</text>`;
    s += `<line x1="${x}" y1="${y + 40}" x2="${x + cellW - 60}" y2="${y + 40}" stroke="${HAIR}" stroke-width="2"/>`;
  });
  s += para('Lista parcial. A maioria dos pedidos chega por indicação de quem já vestiu.', MX, y0 + Math.ceil(names.length / cols) * cellH + 30, 64, 26, 40, GRAY, SANS);
  s += footer('03 / 09') + close;
  pages.push(s);
}

// ---------- PRODUTOS (helper de grade) ----------
function productGrid(numTitleY, items, cols = 3) {
  const gap = 40;
  const cellW = (CW - (cols - 1) * gap) / cols;
  const imgH = 360, rowH = imgH + 130;
  let g = '';
  items.forEach((it, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = MX + c * (cellW + gap), y = numTitleY + r * rowH;
    g += `<image x="${x}" y="${y}" width="${cellW}" height="${imgH}" xlink:href="${b64(A + '/produtos/' + it.img)}" preserveAspectRatio="xMidYMid meet"/>`;
    g += `<text x="${x}" y="${y + imgH + 46}" font-family="${SERIF}" font-size="30" font-weight="700" fill="${INK}">${esc(it.name)}</text>`;
    g += para(it.spec, x, y + imgH + 82, Math.floor(cellW / 9.5), 19, 26, GRAY, SANS);
  });
  return g;
}

// ---------- PÁGINA 4 — PRODUTOS (camisetas e modelagens) ----------
{
  let s = open + sectionHead('03', 'O que produzimos', 200);
  s += label('Camisetas e modelagens', MX, 370, INK, 24);
  s += productGrid(420, [
    { name: 'Camiseta', spec: 'Meia malha penteada 100% algodão, 30.1 fios.', img: 'camisetas.png' },
    { name: 'Regata', spec: 'Mesma malha da linha de camisetas.', img: 'regatas.png' },
    { name: 'Manga longa', spec: 'Mesma malha da linha de camisetas.', img: 'manga-longas.png' },
    { name: 'Oversized', spec: 'Penteada 30.1 ou moletinho 210g; gola canelada 3 cm.', img: 'oversized.png' },
    { name: 'Baby look', spec: 'Meia malha penteada 100% algodão, 30.1 fios.', img: 'baby-look.png' },
    { name: 'Cropped', spec: 'Meia malha penteada 100% algodão, 30.1 fios.', img: 'cropped.png' },
  ]);
  s += footer('04 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 5 — PRODUTOS (esporte, frio, acessórios) ----------
{
  let s = open + sectionHead('03', 'O que produzimos', 200);
  s += label('Esporte, polo, frio e acessórios', MX, 370, INK, 24);
  s += productGrid(420, [
    { name: 'Dry-fit', spec: 'Microdry 100% poliéster.', img: 'dryfit.png' },
    { name: 'Polo', spec: 'Piquet PA, 50% algodão / 50% poliéster.', img: 'polos.png' },
    { name: 'Moletom careca', spec: 'Felpado, 2 ou 3 cabos, 50% algodão / 50% poliéster.', img: 'moletom-careca.png' },
    { name: 'Moletom com zíper', spec: 'Mesmo moletom felpado, com fechamento de zíper.', img: 'moletom-ziper.png' },
    { name: 'Ecobag', spec: 'Lona 100% algodão, 350 g.', img: 'ecobags.png' },
  ]);
  // nota A CONFIRMAR (abaixo das 2 fileiras de produtos)
  const ny = 420 + 2 * (360 + 130) + 30;
  s += `<rect x="${MX}" y="${ny}" width="${CW}" height="120" fill="#f4f4f2"/>`;
  s += label('Cores e gramaturas', MX + 30, ny + 50, INK, 22);
  s += para('Cartela de cores por modelagem e variações de gramatura confirmadas no orçamento.', MX + 30, ny + 88, 120, 24, 30, GRAY, SANS);
  s += footer('05 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 6 — ACABAMENTOS ----------
{
  let s = open + sectionHead('04', 'Acabamentos', 200);
  s += para('A técnica certa depende da arte, do tecido e do uso da peça. Indicamos a melhor no orçamento.', MX, 380, 70, 30, 44, GRAY, SANS);
  const blocks = [
    ['Serigrafia (silk)', 'Estampa aplicada por tela, cor a cor. A escolha para durabilidade e para tiragens em que cada peça precisa sair idêntica. Resiste a lavagem e ao uso.'],
    ['DTF', 'Impressão digital transferida ao tecido por calor e pressão. A escolha quando a arte tem muitas cores, degradês ou detalhe fino que a tela não comportaria.'],
    ['Bordado', 'Aplicação em linha, computadorizada. A escolha para acabamento de mais peso e sofisticação — logos, peito de polo e moletom.'],
    ['Etiqueta e tag', 'Aplicação da sua etiqueta interna e da sua tag externa. O acabamento que transforma a peça em produto de marca, e não em camiseta estampada.'],
  ];
  let y = 540;
  blocks.forEach((b, i) => {
    s += label(String(i + 1).padStart(2, '0'), MX, y, INK, 26);
    s += `<text x="${MX + 90}" y="${y + 4}" font-family="${SERIF}" font-size="40" font-weight="700" fill="${INK}">${esc(b[0])}</text>`;
    s += para(b[1], MX + 90, y + 56, 80, 27, 40, INK, SANS);
    s += `<line x1="${MX}" y1="${y + 200}" x2="${W - MX}" y2="${y + 200}" stroke="${HAIR}" stroke-width="2"/>`;
    y += 290;
  });
  s += footer('06 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 7 — COMO FUNCIONA ----------
{
  let s = open + sectionHead('05', 'Como funciona', 200);
  const conds = [
    ['Pedido mínimo', '30 peças.'],
    ['Prazo de produção', '3 a 4 semanas.'],
    ['Pagamento', '50% no fechamento e 50% na entrega (pix ou boleto). Cartão em até 12x.'],
    ['Entrega', 'Lalamove na capital de SP no dia em que a produção termina. Correios ou transportadora para o resto do Brasil.'],
  ];
  let y = 410;
  conds.forEach(c => {
    const nl = wrap(c[1], 62).length;
    s += `<text x="${MX}" y="${y}" font-family="${SERIF}" font-size="30" font-weight="700" fill="${INK}">${esc(c[0])}</text>`;
    s += para(c[1], MX + 360, y, 62, 28, 40, INK, SANS);
    const divY = y + (nl - 1) * 40 + 38;
    s += `<line x1="${MX}" y1="${divY}" x2="${W - MX}" y2="${divY}" stroke="${HAIR}" stroke-width="2"/>`;
    y = divY + 72;
  });
  // passo a passo
  s += label('Do orçamento à entrega', MX, y + 30, INK, 24);
  const steps = [['Orçamento', 'Você manda peça, quantidade e prazo pelo WhatsApp. Voltamos com proposta e mockup.'],
  ['Aprovação da arte', 'Você confere o mockup e aprova. A produção começa depois disso.'],
  ['Produção', 'Corte, estampa e acabamento, feitos dentro de casa.'],
  ['Entrega', 'Peças prontas, no prazo combinado.']];
  let sy = y + 90;
  steps.forEach((st, i) => {
    s += `<text x="${MX}" y="${sy + 4}" font-family="${SERIF}" font-size="34" font-weight="700" fill="${HAIR}">${i + 1}</text>`;
    s += `<text x="${MX + 70}" y="${sy}" font-family="${SERIF}" font-size="28" font-weight="700" fill="${INK}">${esc(st[0])}</text>`;
    s += para(st[1], MX + 70, sy + 40, 76, 24, 34, GRAY, SANS);
    sy += 130;
  });
  s += footer('07 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 8 — GUIA DE TAMANHOS ----------
{
  let s = open + sectionHead('06', 'Guia de tamanhos', 200);
  s += para('Medidas em centímetros, peça pronta no plano. Para escolher entre justo e folgado, compare com uma peça que você já usa.', MX, 390, 70, 30, 44, INK, SANS);
  // grade placeholder
  const tx = MX, ty = 560, tw = CW, th = 760;
  const sizes = ['P', 'M', 'G', 'GG'];
  const colW = tw / (sizes.length + 1);
  s += `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" fill="#fafafa" stroke="${HAIR}" stroke-width="2"/>`;
  // cabeçalho
  s += `<text x="${tx + 30}" y="${ty + 70}" font-family="${MONO}" font-size="22" letter-spacing="2" fill="${INK}">MEDIDA</text>`;
  sizes.forEach((sz, i) => s += `<text x="${tx + colW * (i + 1) + 30}" y="${ty + 70}" font-family="${SERIF}" font-size="30" font-weight="700" fill="${INK}">${sz}</text>`);
  s += `<line x1="${tx}" y1="${ty + 100}" x2="${tx + tw}" y2="${ty + 100}" stroke="${HAIR}" stroke-width="2"/>`;
  const rows = ['Largura', 'Comprimento', 'Manga'];
  rows.forEach((rw, i) => {
    const ry = ty + 100 + (i + 1) * 120;
    s += `<text x="${tx + 30}" y="${ry - 40}" font-family="${SANS}" font-size="24" fill="${INK}">${esc(rw)}</text>`;
    sizes.forEach((sz, j) => s += `<text x="${tx + colW * (j + 1) + 30}" y="${ry - 40}" font-family="${MONO}" font-size="26" fill="${HAIR}">— —</text>`);
    if (i < rows.length) s += `<line x1="${tx}" y1="${ry}" x2="${tx + tw}" y2="${ry}" stroke="${HAIR}" stroke-width="1"/>`;
  });
  s += label('Medidas por modelagem confirmadas no orçamento', tx, ty + th + 60, GRAY, 22);
  s += footer('08 / 09') + close;
  pages.push(s);
}

// ---------- PÁGINA 9 — CONTATO ----------
{
  let s = open;
  s += `<text x="${MX}" y="420" font-family="${SERIF}" font-size="72" font-weight="700" fill="${INK}">Peça seu orçamento</text>`;
  s += para('Mande pelo WhatsApp a peça, a quantidade e o prazo que você precisa. Voltamos com a proposta e o mockup do produto.', MX, 520, 60, 34, 50, INK, SANS);
  const ct = [['WhatsApp', '(11) 98392-6323', 'caminho principal'], ['Instagram', '@alkimia.prod', ''], ['E-mail', 'prod.alkimia@gmail.com', '']];
  let y = 820;
  ct.forEach(c => {
    s += label(c[0], MX, y, GRAY, 24);
    s += `<text x="${MX}" y="${y + 60}" font-family="${SERIF}" font-size="46" font-weight="700" fill="${INK}">${esc(c[1])}</text>`;
    if (c[2]) s += `<text x="${MX + 640}" y="${y + 60}" font-family="${MONO}" font-size="20" letter-spacing="2" fill="${GRAY}">${esc(c[2].toUpperCase())}</text>`;
    s += `<line x1="${MX}" y1="${y + 100}" x2="${W - MX}" y2="${y + 100}" stroke="${HAIR}" stroke-width="2"/>`;
    y += 200;
  });
  // assinatura wordmark grande no rodapé
  s += `<text x="${MX}" y="${H - 220}" font-family="${SERIF}" font-size="120" font-weight="700" letter-spacing="6" fill="${INK}">ALKIMIA</text>`;
  s += label('Vila Ema, São Paulo · alkimiaprod.com.br', MX, H - 150, GRAY, 22);
  s += close;
  pages.push(s);
}

// ---------- RENDER ----------
(async () => {
  const pngs = [];
  for (let i = 0; i < pages.length; i++) {
    const out = `${BUILD}/p${String(i + 1).padStart(2, '0')}.png`;
    await sharp(Buffer.from(pages[i])).png().toFile(out);
    pngs.push(out);
    console.log('render', out);
  }
  const pdf = await PDFDocument.create();
  for (const p of pngs) {
    const img = await pdf.embedPng(fs.readFileSync(p));
    const page = pdf.addPage([W, H]);
    page.drawImage(img, { x: 0, y: 0, width: W, height: H });
  }
  const bytes = await pdf.save();
  fs.writeFileSync(`${PROJ}/catalogo-alkimia-v1.pdf`, bytes);
  console.log('PDF salvo:', `${PROJ}/catalogo-alkimia-v1.pdf`, '(' + pages.length + ' páginas)');
})();
