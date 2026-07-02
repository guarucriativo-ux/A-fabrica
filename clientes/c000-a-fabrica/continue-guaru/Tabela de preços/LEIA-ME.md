# Guaru Estúdio — Catálogo de Preços

Guia de referência do projeto. Sempre que for alimentar (produtos, fotos, preços) ou crescer
o site, comece por aqui — é o mapa de tudo.

## 1. O que é isso

Um catálogo de preços interativo, sem backend (roda direto abrindo o `index.html`, sem precisar
de servidor). Hoje serve dois papéis ao mesmo tempo:

- **Visão pública** (link que o cliente recebe): mostra produtos, tamanhos e preço de venda.
  Não mostra custo, fornecedor nem a margem aplicada.
- **Visão interna/admin** (você): tudo da pública + custo, fornecedor, link de compra e prazo
  real (sem margem de segurança).

Visão de longo prazo (não é tudo pra agora, é só pra não perder o rumo): catálogo → site estilo
e-commerce → montador de orçamento mais robusto → CRM interno. Tudo sobre a mesma base de dados.

## 2. Estrutura de arquivos

```
Tabela de preços/
  index.html                    ← estrutura da página (todo o HTML)
  css/
    styles.css                   ← toda a aparência (cores, layout, espaçamento)
  js/
    dados_produtos.js             ← TODOS os dados: produtos, preços, prazos, links de
                                     fornecedor, e as 11 `categories` (fonte única dos 5 menus)
    format.js                      ← formatação de preço/prazo (funções pequenas e puras)
    catalog-core.js                 ← admin mode, `state`/navegação de tela, persistência de
                                       navegação, helpers de preço de card ("a partir de")
    catalog-nav.js                   ← os 5 menus de categoria (dropdown/sidebar/drawer/home/
                                        grid de ícones), filtro por subcategoria, busca global,
                                        menu/busca mobile
    catalog-product.js                ← seleção de produto/variante, tabela de preços,
                                         calculadoras (área impressa e DTF), barra de compra fixa
    catalog-cart-checkout.js           ← carrinho e checkout de 4 etapas — módulo isolado de
                                          propósito, é o que mais cresce quando o Mercado Pago
                                          entrar de verdade (ver §6b e §11 "Antes de ir ao ar")
    catalog-home.js                     ← vitrine de produtos da home, parallax do hero,
                                           carrossel de fotos, voltar-ao-topo
    boot.js                              ← sequência de inicialização (sempre o último a
                                            carregar — qualquer `init*()`/`render*()` novo entra
                                            aqui, nunca solto em outro arquivo)
  fotos-placeholder/              ← fotos dos produtos e do site
```

**Regra de carregamento** (ordem exata no fim do `index.html`, não trocar):
`dados_produtos.js` → `format.js` → `catalog-core.js` → `catalog-nav.js` → `catalog-product.js`
→ `catalog-cart-checkout.js` → `catalog-home.js` → `boot.js`. Mesmo esquema de sempre (scripts
clássicos, sem `type="module"`, escopo global) — é só organização por responsabilidade, não um
bundler: todo arquivo continua vendo as funções/variáveis de todos os outros.

**Onde adicionar uma função nova:** no arquivo cuja responsabilidade combina com ela (ex: uma
função de checkout vai em `catalog-cart-checkout.js`, nunca em `catalog-product.js`). Se a função
faz parte da sequência de boot (chamada 1x ao carregar a página), ela mesma pode morar em
`boot.js` junto com a chamada — não precisa criar mais um arquivo.

Não usar `guaru-tabela-precos.html` — é uma versão antiga de arquivo único, não é o que está
em uso.

## 3. Como adicionar um produto novo

Em `js/dados_produtos.js`, cada produto tem até 6 lugares pra preencher (nem todos são
obrigatórios — só preenche o que existir):

1. **`allData`** — uma linha por combinação de quantidade/tamanho/corte, com `custo` e `venda`.
   Sempre venda = custo × 2 (regra padrão do negócio).
2. **`materialSpec`** — a frase descritiva (material, acabamento) que aparece na tela de preço.
3. **`fornecedorLink`** — `{ nome:"CMB"|"GIV"|outro, url:"..." }`. Se ainda não tiver o link
   exato, usa `url:null` — o nome do fornecedor aparece mesmo assim, só não fica clicável.
4. **`prazoProducao`** — `{ producaoDias, corteEspecialExtraDias, freteDias }`, o prazo REAL
   informado pelo fornecedor (a margem de segurança pro cliente é automática, não entra aqui).
5. **`adesivoModels`** (Set) — se o produto não tem opção de "Corte Especial", adiciona o nome
   aqui.
6. Card do produto em `index.html` (dentro de `#models-cartao`, `#models-adesivo` ou
   `#models-dtf`) — copia a estrutura de um `.model-card` existente parecido.

**Nunca inventar** custo, preço, prazo ou link — só cadastrar com base em print/link real
enviado. Isso é regra permanente do projeto.

**Produto sem tabela de quantidade fixa** (calculado por área impressa, ex: adesivo sob medida):
não usa `allData` — em vez disso soma uma entrada em `areaCalcConfigs` (`dados_produtos.js`) com
`custoPorM2`/`custoMinimo`/`markup` tirados de teste real na calculadora do fornecedor. Ver
pendência §7 e o comentário no topo da seção de calculadoras em `js/catalog-product.js` pro passo a
passo completo (inclusive como deixar o produto híbrido: tamanhos fixos + opção personalizada).

## 4. Fotos

- Foto de produto (`.mc-photo`): qualquer proporção, paisagem funciona melhor — recomendo
  mínimo 800×600px, formato JPG, até ~300KB.
- **Carrossel automático**: se um produto tiver mais de uma foto, ele alterna sozinho a cada 2s.
  Pra ativar, é só usar `data-carousel="caminho/foto1.jpg,caminho/foto2.jpg"` na tag `<img>` —
  funciona em qualquer card, não só no Sticker.
- Salvar arquivos em `fotos-placeholder/`, nome do arquivo descritivo (ex:
  `adesivo-sticker.jpg`).

## 5. Modo Admin vs Público

- Botão discreto **"· Acesso interno"** no rodapé do site → pede senha → libera o modo interno
  nesse navegador (fica salvo, não precisa repetir).
- A senha está em `js/catalog-core.js`, linha `const ADMIN_PASSWORD = "guaru2026"` — **troque isso**
  pela senha que quiser usar.
- Atalho alternativo: abrir o link com `?admin=1` no final (e `?admin=0` pra sair).
- ⚠️ **Isso não é segurança real**, é só esconder a informação na tela. Os dados de custo
  chegam no navegador de qualquer pessoa que abrir a página (só não aparecem). Não publicar
  esse link em lugar público de verdade contando com isso como proteção.

## 6. Carrinho (terminologia de e-commerce, fechamento ainda via WhatsApp)

O cliente escolhe um produto, configura (tamanho/quantidade/acabamento) e clica
**"Adicionar ao Carrinho"**. O botão **"Orçamento"** no topo do site (com contador) abre o
carrinho completo, e **"Enviar Carrinho para o WhatsApp"** manda tudo numa mensagem só. Toda a
UI usa termos de loja (Carrinho/Adicionar ao Carrinho), mesmo o fechamento de pedido ainda sendo
manual via WhatsApp — não existe checkout/pagamento próprio ainda (ver roadmap, Checkout Mercado
Pago é o próximo passo grande).

Tela do carrinho (`renderCart()` em `js/catalog-cart-checkout.js`, layout em `.cart-page`/`.cart-item-card` em
`css/styles.css`) é em 2 colunas, inspirada no givonline.com.br/carrinho: cada item é um card com
foto (achada via `findProductPhoto()`, que procura o `.mc-photo` do `.model-card` original pelo
nome do produto — produtos sem foto cadastrada caem num placeholder de ícone, nunca quebram),
lista de specs (Material/Quantidade/Corte/Acabamento/Prazo de produção) e os botões **Duplicar**/
**Remover**. Resumo (contagem + total + CTA) fica fixo na coluna da direita.

**"Duplicar" em vez de stepper de quantidade:** os preços são por FAIXA (tabela com desconto
crescente, não lineares) — um "+1" dentro do carrinho daria preço errado fora da faixa real
escolhida. Duplicar a linha inteira (`duplicateCartItem()`) resolve isso igual ao GIV (que também
tem um botão "Duplicar" ao lado de "Remover"): cada cópia mantém o preço certo da própria faixa,
2× a mesma linha é sempre matematicamente correto. Pra trocar a faixa de verdade, ainda é remover
o item e voltar ao produto.

Cada item guarda, além do texto de exibição, `qty` e `unitPrice` numéricos
(`buildCartItemFromSelection()`) — é a forma que o futuro Checkout Mercado Pago vai precisar
(`items` com `quantity`/`unit_price`). A tela de carrinho e a mensagem do WhatsApp já mostram a
conta "qtd × unitário = total".

**Pendência:** `WHATSAPP_NUMBER` está vazio no topo de `js/catalog-core.js` — sem isso, o botão abre
o seletor de contatos do WhatsApp Web em vez de ir direto pro número da Guaru. Preencher com
DDI+DDD+número (só dígitos) quando tiver o número certo pra usar.

## 6b. Checkout (telas prontas, pagamento online ainda não pluga de verdade)

Botão **"Finalizar Compra"** no resumo do carrinho abre `#screen-checkout` (`openCheckout()` em
`js/catalog-cart-checkout.js`) — fluxo de 4 etapas com indicador de progresso (`renderCheckoutProgress()`):

1. **Endereço** (`renderCheckoutStepAddress()`): formulário real (nome, telefone, CEP, endereço,
   número, complemento, cidade, UF), persiste em `localStorage["guaru_checkout_address"]` (mesmo
   padrão do carrinho). `checkoutGoToFrete()` valida os campos obrigatórios antes de avançar.
2. **Frete** (`renderCheckoutStepFrete()`): sem transportadora integrada — texto honesto "frete a
   calcular, combinamos pelo WhatsApp" em vez de inventar um valor.
3. **Revisão/Pagamento** (`renderCheckoutStepReview()`): mostra itens + endereço + total. O botão
   "Pagar com Mercado Pago" aparece **visualmente pronto mas só como nota informativa** ("chega em
   breve") — o CTA que funciona é "Confirmar Pedido pelo WhatsApp" (`checkoutConfirm()`), que
   chama `sendCartToWhatsApp(checkoutAddress)` incluindo o endereço na mensagem.
4. **Confirmação** (`renderCheckoutStepDone()`): tela de sucesso simples, "Voltar à loja".

**Por que o Mercado Pago não está plugado de verdade ainda:** o Checkout Pro precisa gerar uma
"preferência de pagamento" usando a chave secreta (Access Token) num backend — não dá pra fazer
isso num site 100% estático servido via `file://`/hospedagem simples, a chave ficaria exposta pra
qualquer visitante. Falta: (1) hospedagem com função serverless (Vercel/Netlify, ver roadmap), (2)
[[user-marcos]] gerar as credenciais reais no painel do Mercado Pago. Quando os dois existirem, o
botão "Pagar com Mercado Pago" da etapa 3 é o ponto exato onde a chamada de API entra — a tela já
está pronta, só falta plugar a função.

## 7. Pendências conhecidas (atualizado 2026-06-19)

- **Links de fornecedor faltando** (mostra nome mas sem link clicável): 7 produtos GIV
  (Rótulo Adesivo Personalizado, Lacre Fecha Sacola Couché/Vinil, Lacre de Segurança Delivery,
  Adesivo Vinil Transparente, Adesivo Holográfico DTF (Folha), Adesivo Fosforescente) + os 3 DTF
  (sem site, só Instagram da Estamparia Silkado).
- **Calculadora de "tamanho por área impressa"** (`js/catalog-product.js`, seção logo após `selectGram`) —
  modelo genérico (largura × altura × quantidade, com piso mínimo) usado por qualquer adesivo
  vendido por área. Cada produto é só uma entrada em `areaCalcConfigs` (`dados_produtos.js`),
  sem função nova: hoje tem **Sticker Premium** (`stickerCalcConfig`, R$99/m², markup 1.75 = +75%,
  exceção à regra padrão venda=custo×2) e **Adesivo Holográfico Personalizado**
  (`holograficoCalcConfig`, R$168/m², markup ×2 padrão) — esse último é híbrido: mantém os
  tamanhos fixos normais E ganhou um card extra "Tamanho Personalizado" (via
  `productMeta[...].customSizeCalc`) que abre a mesma calculadora sem sair da tela. Botões de
  "Tamanhos comuns" (`cfg.presetSizes`) preenchem largura/altura na hora e resetam a quantidade
  pro mínimo daquele tamanho. Regra de quantidade: nunca cai abaixo do mínimo do tamanho atual
  (só sobe), exceto ao clicar um preset, que reseta pro mínimo novo de propósito.
- **Fotos do carrossel dentro dos cards de categoria da home** — Adesivos e Cartão de Visita já
  têm foto (`.tag-photo-wrap`); falta só o card de **DTF**.
- **Sticker virou 2 produtos atrás de 1 card só (2026-06-19) — "Sticker Promocional" (CMB) vs
  "Sticker Premium" (GIV).** Um único card "Sticker" no topo de Adesivos (`pickStickerChoice()`)
  abre `#screen-sticker-choice`, uma tela de comparação com as diferenças explícitas; o cliente
  escolhe e só então cai na tela de preços de cada um — evita 2 cards soltos onde o cliente teria
  que adivinhar a diferença pela descrição. Promocional = 7 tamanhos prontos (Redondo
  5x5/7x7/10x10cm, Quadrado 5x5/7x7cm, Retangular 8x5/9x13cm — rótulo usa a forma real de cada
  tamanho, "Quadrado" só quando width==height, senão "Retangular", correção 2026-06-19; sem 3x3cm
  de propósito — tamanho de selo, não de sticker, e inflava o "a partir de" do card pra baixo
  demais; `pickModelWithGram`), preço = base do "Adesivo Redondo"/"Adesivo Reto Vinil" (CMB,
  já confirmado) + Refile (corte 1 a 1) **já embutido** no
  custo/venda — não é opcional aqui, por isso não tem `refile` no `productMeta` dele (senão volta
  o checkbox). Mais rápido (2 dias) e mais barato. Premium = a antiga "Adesivo Sticker" renomeada,
  calculadora por área (GIV, formato livre, qualquer tamanho, materiais com gramatura real:
  Brilho/Fosco 120g, Transparente 150g), mais durável e mais cara, prazo maior (6 dias + frete).
  Pendência: ainda não tem foto própria pro Promocional (reaproveita a foto do Adesivo Redondo).
- **"Adesivo Redondo em Folha" renomeado pra "Adesivo Redondo em Folha (Selo)" e movido pra 2ª
  posição da grade de Adesivos (2026-06-19), logo depois do card Sticker.** Motivo: é o produto de
  tamanho pequeno (30x30mm/48x48mm, cartela meio-corte) certo pro caso de uso "selo" — o cliente
  que precisa de um adesivo nesse tamanho miúdo (que NÃO faz sentido como Sticker, ver acima) cai
  direto nele. Parênteses em vez de aspas no nome de propósito: aspas literais quebrariam o atributo
  `onclick="..."` no HTML (a string do nome do produto fica dentro de aspas simples, que por sua vez
  fica dentro do atributo em aspas duplas — aspas duplas no meio do nome encerrariam o atributo
  cedo demais).
- **"Adesivo Fecha Sacola Papel 10x4cm" (CMB) REMOVIDO por completo (2026-06-19).** O usuário
  comparou com "Lacre Fecha Sacola Couché" (GIV) — mesmo tipo de produto (fechar sacola), GIV usa
  couché 80g em vez do couché 90g da CMB, preço da CMB ficou "absurdamente" mais caro, e o prazo da
  GIV é só 1 dia maior. Decisão: inviável manter os dois, ficou só o da GIV. Pendência: o nome
  "Lacre" da GIV vai mudar — usuário sinalizou que quer revisar a nomenclatura depois, ainda não
  decidida.

## 8. Decisões de design que não são acidente

- Preço com fundo neon (`fmtHtmlHighlight`) só aparece em **totais**, nunca em "unitário" — é
  proposital, pra hierarquia visual.
- Tudo em ordem alfabética nos menus/submenus, **exceto** as faixas Padrão/Premium/Super
  (essas seguem ordem de qualidade, não A-Z).
- Sem emoji pictográfico em lugar nenhum da interface — tudo usa o sprite de ícones de linha
  (`<svg class="icon"><use href="#i-..."/></svg>`, símbolos no topo do `index.html`). Badges de
  tier (⬛★★★) são exceção deliberada — são caracteres simples, não emoji.
- **Barra de compra fixa** (`#sticky-buybar`, `js/catalog-product.js` → `renderStickyBar()`, 2026-06-20,
  inspirada no givonline.com.br): na tela de preços, produto/qtd/preço + botão "Adicionar à Lista"
  ficam fixos no rodapé da viewport, sem precisar rolar a tabela toda pra achar o CTA. É filha de
  `#screen-prices`, então `.screen{display:none}` já garante que só aparece naquela tela. Quando
  visível, soma a classe `body.has-stickybar` (limpa automaticamente em `showScreen()` ao trocar de
  tela) — isso sobe os botões flutuantes de WhatsApp/voltar-ao-topo pra não ficarem cobertos por
  ela. **Se mudar a altura da barra (padding, quebra de linha no mobile), reconferir esse offset.**
- **Stepper de quantidade (−/+)** só existe em modo calculadora (`renderAreaCalcInputs`/
  `renderDtfInputs` folha) — produto vendido por medida/qtd livre, sem faixa de desconto. **Nunca
  adicionar stepper na tabela por faixa de quantidade** (`makeTable`) — preço ali não é linear
  (desconto cresce por faixa cadastrada), um +/- ali calcularia preço errado fora das faixas reais.
  No carrinho a mesma regra vale como "Duplicar" em vez de stepper — ver §6.
- **Bolinha de seleção na tabela de preços** (`.qty-radio`, `makeTable()`, 2026-06-21): cada linha
  de quantidade tem um radio visual (vazio/preenchido) mostrando qual faixa está selecionada, e a
  linha selecionada (`.row-selected`) ganha um tom neon bem leve (`var(--accent-soft)`) além da
  barra lateral que já existia — só reforço visual, `selectRow()` não mudou.
- **Vitrine de produtos na home** (`renderHomeProductGrid()`, `.home-cat-block`, 2026-06-21,
  inspirada no givonline.com.br): a home clona ao vivo os cards reais de Adesivos/Cartão de
  Visita/DTF (`#models-{cat}`) em vez de manter cópia separada — editar um produto na tela de
  categoria já reflete na home sem tocar nesta função. Na home os cards escondem a descrição
  (`.home-cat-block .mc-desc{display:none}`, só foto+nome+preço, mais denso) e os títulos de seção
  ganham peso visual (texto maior + barra neon embaixo) — a tela de categoria não muda. Tem um
  banner de CTA real (WhatsApp, `openWhatsAppContact()`) entre o bloco de Adesivos e o de Cartão de
  Visita, quebrando a página em seções como o GIV faz com banners promocionais — mas sem inventar
  desconto/campanha que não existe.
- **Terminologia "Carrinho", não "Lista"** (2026-06-21): a Guaru se posiciona como e-commerce, então
  toda a UI fala "Carrinho"/"Adicionar ao Carrinho" mesmo o fechamento ainda sendo via WhatsApp —
  ver §6. Não reintroduzir a palavra "Lista" em texto visível ao cliente.
- **Reconstrução completa da home/header/footer estilo GIV (2026-06-21):** Marcos mandou uma
  especificação detalhada baseada em ~13 prints do fluxo completo do givonline.com.br (home,
  produto, carrinho) pedindo pra "recomeçar o layout praticamente do zero". Antes de implementar,
  alinhei 4 pontos por `AskUserQuestion` (todas as recomendações aceitas) — ver decisões abaixo.
  Paleta continua preto+neon (não adotamos roxo/amarelo do GIV, só a estrutura/densidade).
  - **Header:** ícone WhatsApp funcional (`.header-icon-btn`, chama `openWhatsAppContact()`) +
    ícone de login/cadastro **só visual** (`.header-icon-btn--soon`, sem `onclick`) — não existe
    conta de cliente/backend hoje, virar funcional é projeto separado (decisão confirmada).
  - **Faixa de promoção** (`#promo-strip`, `renderPromoStrip()`): só aparece se `PROMO_MESSAGE`
    (topo de `js/catalog-core.js`) tiver texto real. Vazia hoje — sem campanha pra anunciar, não inventar.
  - **Barra de categoria horizontal** (`.home-cat-nav`) e **grid denso de ícones de categoria**
    (`.cat-icon-grid`, substituiu os 4 cards grandes `.tag-grid` que existiam na home — esses
    continuam em uso na tela de Kits, `#kits-grid`) — ambos usam os mesmos 11 itens (4 categorias
    ativas + 7 "em breve") que já existem no dropdown `.ndp-grid` e na sidebar `.cat-tabs`. **Desde
    a reorganização de 2026-06-21 (ver §2), os 5 lugares lêem do mesmo `categories`
    (`dados_produtos.js`) via `renderCategoryDropdown()`/`renderCategorySidebar()`/
    `renderCategoryDrawer()`/`renderHomeCatNav()`/`renderCategoryIconGrid()`** — adicionar/remover
    categoria é só editar `categories`, nenhum dos 5 HTML fica hardcoded.
  - **Preço do card com quantidade-base:** `getCardMinPrice()` agora retorna `{venda, qtyLabel}`
    em vez de só o número — `.mc-price` mostra "A partir de R$X / Y unidades" (antes só "R$X"),
    amarrando todo preço a uma quantidade de referência. Calculadora usa a mesma referência que já
    existia (1 folha / 1 metro / 50un).
  - **Banners institucionais** (`.trust-banner-row`) e **texto SEO** (`.about-block`): só claims
    já confirmados (produção rápida, acabamento premium, entrega nacional, WhatsApp) — sem "arte
    grátis" nem "garantia" (não confirmados; o próprio GIV cobra criação de arte como serviço
    extra). Texto institucional usa só fatos do projeto, sem inventar tempo de mercado/prêmios.
  - **Footer expandido:** quick-links, coluna "Institucional" (âncoras pra seções que já existem
    na própria página, sem criar página nova), "Pagamento via Mercado Pago" (texto, não logo de
    bandeira específica) e CNPJ como placeholder `[CNPJ aqui]` (mesmo padrão do whatsapp/endereço).
  - **Carrossel no hero foi deliberadamente NÃO construído** apesar de pedido na especificação:
    só existe 1 imagem de hero real hoje (`hero_1.png`) — construir setas/indicadores que nunca
    trocam de slide seria UI morta sem função. Already anotado desde sessão anterior (ver entrada
    do hero acima) — quando `hero_2.png`/`hero_3.png` existirem, é aí que a rotação entra.
  - **Checkout** — ver §6b (seção própria, fluxo de 4 etapas).
- **Barra de categoria da home com submenu real (2026-06-21, correção pós-feedback):** o primeiro
  formato da `.home-cat-nav` (11 itens alfabéticos, igual ao dropdown/sidebar) tinha 2 problemas
  reais que o usuário apontou comparando com prints do GIV: estourava largura e criava scroll
  horizontal na própria barra, e passar o mouse não abria nada (clique direto na categoria, sem
  preview do que tinha dentro). Fix, copiando o padrão GIV: a barra agora tem só **"Todos os
  Produtos"** (rola até a vitrine, `scrollToCatalog()`) + as 4 categorias com produto de verdade
  (Adesivos/Cartão de Visita/DTF/Materiais p/ Empreendedores) — sem os 7 "em breve" (que continuam
  no dropdown/sidebar/drawer, só não cabem aqui sem estourar). Adesivos/Cartão/DTF ganharam
  submenu de hover (`.hcn-wrap`/`.hcn-flyout`) listando os produtos REAIS daquela categoria
  (`getCategoryProductLinks()` em `js/catalog-nav.js`, lê direto de `#models-{cat} .model-card`, sem
  lista paralela) — clicar num produto do submenu já abre a tela de preço dele direto. Mesma
  técnica de posicionamento do `.cat-tab-flyout` (mover pra filho de `<body>`, `position:fixed`
  calculado por `getBoundingClientRect()`, ver §10) — reaproveitada de propósito pra não repetir o
  bug de flyout cortado por `overflow-x:auto` do pai.
- **Submenu da home virou painel blocado por inteiro, igual GIV, sem caixa com scroll (2026-06-21,
  2ª correção do mesmo submenu acima):** o usuário comparou novamente com prints da GIV — lá, o
  menu desce "blocado por inteiro" (várias colunas visíveis de uma vez, sem precisar rolar), e
  pediu pra "Todos os Produtos" também abrir um painel ao passar o mouse (antes só rolava até a
  vitrine, sem nenhum preview). Causa raiz do scroll fantasma: `.hcn-flyout` tinha `max-height` +
  `overflow-y:auto` JUNTO de `column-width` — o multi-column do CSS reage a uma altura máxima
  abrindo MAIS colunas (mais largura) pra caber o conteúdo dentro dela, e é isso que estourava a
  largura do painel e criava a barra horizontal. Fix: removido `max-height`/`overflow-y` (cresce
  livre na vertical, nunca precisa de coluna extra pra caber), e `column-count` agora é setado via
  JS (`renderHomeCatFlyouts()` em `js/catalog-nav.js`, baseado na quantidade real de produtos —
  1/2/3 colunas) em vez de depender só de `column-width` (que sozinho só vira mais de 1 coluna
  quando há limite de altura — exatamente o que causava o bug — então sem JS o painel sempre
  renderizava em 1 coluna só). `.ctf-item` ganhou `white-space:normal` dentro de `.hcn-flyout`
  (nomes de produto reais, ex. "Adesivo Redondo em Folha (Selo)", são mais longos que as
  subcategorias curtas do `.cat-tab-flyout` da sidebar que share a mesma classe — sem isso, o texto
  sem quebra forçava a coluna a crescer e estourar a largura de novo). "Todos os Produtos" ganhou
  seu próprio painel (`#hcn-flyout-all`, `.hcn-flyout--all`, `renderHomeAllProductsFlyout()`) com
  uma coluna por categoria ativa (Adesivos/Cartão/DTF), cada uma com os produtos reais dela — é o
  equivalente real-data do mega-menu "Oportunidades" da GIV (lá tem uma sidebar de categorias
  drilling-down; aqui, sem essa estrutura de subcategoria cadastrada, colunas paralelas por
  categoria é o análogo correto sem inventar dado novo). Posicionamento (`initHomeCatNavPositioning()`)
  ganhou um clamp pra nunca estourar a borda direita da viewport com painéis mais largos, e o
  `max-width` dos painéis usa `min(Npx, calc(100vw - 24px))` pra nunca passar da tela em viewport
  estreito.

## 9. Atualizar a página (F5) mantém a tela atual

`showScreen()` salva a tela/produto atual em `localStorage` (`guaru_navstate`) toda vez que
troca de tela; no carregamento, `restoreNavState()` lê isso em vez de sempre abrir a home. Se
um dia adicionar uma tela nova (`screen-*`), precisa ensinar `restoreNavState()` a reconhecer
esse novo `screenId`, senão F5 nela cai pra home.

## 9b. Telas de escolha intermediárias — "voltar por etapa" (padrão pra usar sempre, 2026-06-19)

Quando um card leva pra uma tela de escolha (ex: `#screen-variants` — impressão 4x0/4x4 do
Couchê; `#screen-sticker-choice` — Promocional × Premium do Sticker) ANTES da tela de preços,
o "← Voltar" da tela de preços precisa devolver pra essa tela de escolha, não pular direto pra
home/grid. Isso é genérico via `state.backTo` (string com o nome de uma função global) — `goBack()`
chama `window[state.backTo]()` se existir, senão cai no padrão de sempre (`goToModels()`).

**Pra uma tela de escolha nova:** no `onclick` de cada opção dessa tela, antes de chamar
`pickModel*`/`showPrices()`, seta `state.backTo='nomeDaFunçãoQueReabreEssaTelaDeEscolha'` (ex:
`onclick="state.backTo='pickStickerChoice';pickModelCalc(...)"`). Não precisa tocar em `goBack()`
nem em `defaultState()` — `backTo` já existe lá (`null` por padrão) e se limpa solo: qualquer
`goToModels()` (clicar num item da sidebar, ou "Voltar" da própria tela de escolha) reseta o
`state` inteiro, então uma visita futura a um produto qualquer nunca herda um `backTo` de outra
tela por engano.

## 10. Cuidado com isso (já causou bug repetido)

`.cat-tabs` (a barra lateral de categorias) tem `overflow-y:auto` pra poder rolar quando a lista
de categorias crescer. O submenu (`.cat-tab-flyout`) que abre ao passar o mouse **não pode ser
filho dele** — qualquer elemento com `overflow:auto/hidden/scroll` recorta (e conta na área de
rolagem) qualquer filho posicionado fora da própria caixa, mesmo invisível, o que tanto escondia
o submenu quanto criava uma barra de rolagem horizontal fantasma permanente. Por isso o submenu
é movido pra fora da sidebar via JS (`initSidebarFlyoutPositioning()` em `catalog-nav.js`) e
posicionado com `position:fixed` calculado no hover, em vez de `:hover` puro em CSS. Também não
adicionar `position:sticky` na sidebar sem rever esse mecanismo (já causou o mesmo tipo de bug
antes, por outro motivo — contexto de empilhamento).

`.page-layout{align-items:flex-start}` (regra base, pensada pro desktop em `flex-direction:row`,
onde só afasta o alinhamento vertical) **precisa virar `align-items:stretch` dentro de qualquer
`@media` que mude `.page-layout` pra `flex-direction:column`** (hoje só `max-width:900px`) —
senão o eixo cruzado muda de vertical pra horizontal e `flex-start` passa a significar "encolha
pro tamanho do próprio conteúdo" em vez de "ocupe a largura toda", e `.page-content` vira mais
largo que a tela (shrink-to-fit), estourando a página inteira pra direita em qualquer tela com
filho de largura mínima grande (ex.: o aviso de prazo no topo da tela de preços, que também tinha
`white-space:nowrap` cravado no `index.html` e quebrava a mesma forma — corrigido 2026-06-20,
removido o `nowrap` e adicionado `max-width:100%`). Se um dia adicionar um novo breakpoint que
muda `flex-direction` do `.page-layout`, lembrar de setar `align-items:stretch` nele também.

## 11. Antes de ir ao ar (checklist, atualizado 2026-06-21)

Hoje o catálogo roda 100% local (`file://`, sem servidor, sem deploy). Domínio já comprado —
faltam estes passos, nessa ordem, antes do site valer pra fase de teste:

1. **Domínio** — ✅ comprado (Marcos, 2026-06-21). Decisão de 2026-06-20: `.com.br` via
   **Registro.br**, usando o CNPJ da Guaru (não Cloudflare Registrar/Namecheap — esses só vendem
   `.com`/genéricos).
2. **Hospedagem** — falta. Recomendado **Vercel** ou **Netlify** (planos free dão conta da fase
   de teste e já têm onde rodar uma função serverless quando o Mercado Pago entrar — a chave
   secreta não pode ficar exposta num site 100% client-side, ver §6b). Primeiro deploy é só subir
   a pasta `Tabela de preços/` como site estático — nenhum código muda pra isso.
3. **DNS** — depois do host escolhido, apontar o domínio do Registro.br pra ele (registro feito
   no painel do Registro.br, apontando pro Vercel/Netlify).
4. **Credenciais Mercado Pago** — [[user-marcos]] mesmo cria a conta vinculada ao CNPJ e gera
   Access Token/Public Key no painel do Mercado Pago; entrega as chaves prontas. Pode ser feito em
   paralelo com os passos 2-3 (não bloqueia hospedar/apontar DNS), e dá pra estruturar a chamada
   de API com chave de teste/sandbox antes das chaves reais existirem.
5. **Plugar o Checkout Pro de verdade** — com hospedagem (passo 2) + credenciais (passo 4)
   prontas, a etapa 3 do checkout (`renderCheckoutStepReview()`, `js/catalog-cart-checkout.js`) é
   onde a chamada de API entra — a tela já está pronta (botão "Pagar com Mercado Pago" hoje é só
   nota informativa), só falta a função serverless que gera a preferência de pagamento.

Bling (ERP) é fase 2, só depois do checkout básico (carrinho + Mercado Pago) estar funcionando —
não propor/iniciar isso antes.
