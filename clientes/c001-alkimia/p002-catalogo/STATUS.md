# STATUS — Alkimia · p002 Catálogo/PDF comercial
Atualizado: 2026-06-28

> ⛔ SUPERSEDED (2026-06-28): o catálogo em PDF estático foi REJEITADO pelo Marcos (minimalista demais).
> O catálogo virou WEB navegável, embutido no site → ver `../p001-site/` (catalogo.html) e `../p001-site/plano-site-catalogo-v1.md`.
> Esta pasta fica como ARQUIVO da tentativa PDF. Conteúdo reaproveitado: `copy-catalogo.md` (→ copiado p/ p001-site/copy-catalogo-conteudo.md) e `assets/` (→ copiados p/ p001-site/assets/). Pipeline `build-catalogo.js` e `catalogo-alkimia-v1.pdf` ficam só como histórico.

Linha: Peça/Documento comercial (abandonado). Era a ponta de lança em PDF.
Fase atual: ARQUIVADO.

## O que está pronto
- **catalogo-alkimia-v1.pdf** (9 páginas, A4, P&B editorial, 193 KB). Gerado por `build-catalogo.js` (SVG→PNG via sharp → PDF via pdf-lib). PNGs por página em `build/`.
- Copy em `copy-catalogo.md` (8 seções). Assets reais do site em `assets/` (marca, produtos, clientes, fotos).
- Decisões fechadas pelo Marcos: NORTE = audiovisual c/ porta pro criativo; capa NEUTRA (tagline "Cortado, estampado e entregue dentro de casa."; audiovisual só no corpo/Seção 1); wordmark "ALKIMIA" (sem selo circular); preço = sob orçamento via WhatsApp.

## Estrutura (páginas)
1 Capa · 2 Quem é a Alkimia · 3 Quem já veste · 4–5 O que produzimos · 6 Acabamentos · 7 Como funciona · 8 Guia de tamanhos · 9 Contato.

## QA mecânico feito (orquestrador)
- Gramaturas conferidas contra o HTML real do site (30.1, Microdry, Piquet, felpado, 210g, 350) — reais, nada inventado.
- Corrigidos: sobreposição da nota na pág. 5; divisórias cortando texto na pág. 7; numeração física; barras cinzas atrás das peças removidas.

## PENDENTE — dados do Gustavo (placeholders [A CONFIRMAR])
- Tabela de medidas por tamanho/modelagem (pág. 8 está com grade vazia).
- Cartela de cores por modelagem + variações de gramatura.
- "Mínimo 30" é por pedido ou por modelo? Prazo conta da aprovação da arte?
- Direito de exibir logo dos clientes (hoje os nomes estão tipografados, não os logos).

## Próximo
- Marcos avalia o mérito visual e aprova / pede ajuste.
- Depois: Marcos colhe os dados [A CONFIRMAR] com o Gustavo → v2 com tabela de medidas e cores reais.
- Pipeline reusável: rodar `build-catalogo.js` com NODE_PATH apontando pro scratchpad/imgtool/node_modules (sharp+pdf-lib são efêmeros por sessão).
