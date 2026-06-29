# Schema de Dados — Produtos do Catálogo web (catalogo.html)
> brand-strategist, Fase B · cliente Alkimia (c001/p001-site) · 2026-06-28
> NÃO é HTML. É a definição dos campos + dados conhecidos preenchidos + marcação do que falta.
> Vira um array JS (`const PRODUTOS = [ ... ]`) consumido pelo catalogo.html.

## Regras de integridade aplicadas aqui
- **FIXO** = literal do levantamento real (site/Instagram Alkimia). Pode entrar no objeto como string definitiva.
- **`[A CONFIRMAR]`** = dado do Gustavo. No JS entra como `null` (ou array vazio) + flag, NUNCA inventado. NUNCA copiado da Real Serigrafia.
- Cores, medidas e "modelo veste X" são SEMPRE `[A CONFIRMAR]` nesta entrega.
- Técnicas compatíveis derivam do catálogo de acabamentos (serigrafia/DTF/bordado/etiqueta) cruzado com o tecido de cada peça (ex.: dry-fit em poliéster → DTF/bordado, serigrafia com ressalva; bordado faz mais sentido em peça estruturada como polo/moletom).

---

## GRUPO A — Camisetas e modelagens

### 1. camiseta
- **id:** `camiseta`
- **nome:** Camiseta
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Meia malha penteada 100% algodão, 30.1 fios.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/camisetas.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 2. regata
- **id:** `regata`
- **nome:** Regata
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Mesma malha da linha de camisetas — meia malha penteada 100% algodão, 30.1 fios.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/regatas.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 3. manga-longa
- **id:** `manga-longa`
- **nome:** Manga longa
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Mesma malha da linha de camisetas — meia malha penteada 100% algodão, 30.1 fios.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/manga-longas.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 4. oversized
- **id:** `oversized`
- **nome:** Oversized
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Meia malha penteada 100% algodão 30.1 fios OU moletinho 100% algodão 210 g, com gola canelada de 3 cm.
  - Nota: peça tem DUAS opções de tecido — manter as duas como string única OU campo de variações (ver seção de campos, `variacoes`).
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/oversized.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 5. baby-look
- **id:** `baby-look`
- **nome:** Baby look
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Meia malha penteada 100% algodão, 30.1 fios.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/baby-look.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 6. cropped
- **id:** `cropped`
- **nome:** Cropped
- **grupo:** Camisetas e modelagens
- **composição/gramatura (FIXO):** Meia malha penteada 100% algodão, 30.1 fios.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta
- **foto:** `assets/produtos/cropped.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

---

## GRUPO B — Esporte e polo

### 7. dry-fit
- **id:** `dry-fit`
- **nome:** Dry-fit
- **grupo:** Esporte e polo
- **composição/gramatura (FIXO):** Microdry 100% poliéster.
- **técnicas compatíveis (FIXO):** DTF, bordado, etiqueta.
  - Nota: poliéster pede DTF/sublimação e bordado; serigrafia convencional tem ressalva em tecido 100% poliéster. Recomendação no orçamento. (Confirmar com Gustavo se aceita serigrafia nesta peça → `[A CONFIRMAR]`.)
- **foto:** `assets/produtos/dryfit.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 8. polo
- **id:** `polo`
- **nome:** Polo
- **grupo:** Esporte e polo
- **composição/gramatura (FIXO):** Piquet PA, 50% algodão / 50% poliéster.
- **técnicas compatíveis (FIXO):** bordado, serigrafia, DTF, etiqueta.
  - Nota: bordado em destaque (peito de polo é uso clássico de bordado — alinhado ao copy de acabamentos).
- **foto:** `assets/produtos/polos.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

---

## GRUPO C — Peças de frio

### 9. moletom-careca
- **id:** `moletom-careca`
- **nome:** Moletom careca
- **grupo:** Peças de frio
- **composição/gramatura (FIXO):** Moletom felpado, 2 ou 3 cabos, 50% algodão / 50% poliéster.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta.
  - Nota: bordado em destaque (peso/sofisticação em moletom, conforme copy de acabamentos).
- **foto:** `assets/produtos/moletom-careca.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

### 10. moletom-ziper
- **id:** `moletom-ziper`
- **nome:** Moletom com zíper
- **grupo:** Peças de frio
- **composição/gramatura (FIXO):** Mesmo moletom felpado, 2 ou 3 cabos, 50% algodão / 50% poliéster, com fechamento de zíper.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta.
- **foto:** `assets/produtos/moletom-ziper.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR]`
- **modelo-veste:** `[A CONFIRMAR]`

---

## GRUPO D — Acessórios

### 11. ecobag
- **id:** `ecobag`
- **nome:** Ecobag
- **grupo:** Acessórios
- **composição/gramatura (FIXO):** Lona 100% algodão, 350 g.
- **técnicas compatíveis (FIXO):** serigrafia, DTF, bordado, etiqueta.
- **foto:** `assets/produtos/ecobags.png`
- **cores:** `[A CONFIRMAR]`
- **medidas:** `[A CONFIRMAR — dimensões da bolsa em cm (largura × altura × fole); acessório não usa grade de tamanhos]`
- **modelo-veste:** `[A CONFIRMAR — N/A para acessório; usar foto de produto/uso em vez de "modelo veste"]`

---

## DEFINIÇÃO DOS CAMPOS DO SCHEMA (a "forma" do objeto)
> Cada produto é um objeto com estes campos. Campos `[A CONFIRMAR]` entram como `null`/`[]` + a flag `pendencias` listando o que falta, pra o catalogo.html renderizar o rótulo "[A CONFIRMAR]" automaticamente e nunca mostrar dado inventado.

| Campo | Tipo | Origem | Descrição |
|---|---|---|---|
| `id` | string | FIXO | Slug único = âncora de hash (`#camiseta`). Usado no link do grid e no `id` da seção. |
| `nome` | string | FIXO | Nome de exibição da peça (título da seção). |
| `grupo` | string (enum) | FIXO | Um de: `"Camisetas e modelagens"`, `"Esporte e polo"`, `"Peças de frio"`, `"Acessórios"`. Define agrupamento no grid. |
| `composicao` | string | FIXO | Malha/tecido + fio + gramatura + gola/ribana, em uma string já redigida. |
| `variacoes` | string[] \| null | FIXO/null | Opções alternativas de tecido quando existem (ex.: oversized). `null` quando só há uma composição. |
| `tecnicas` | string[] (enum) | FIXO | Subconjunto de `["serigrafia","DTF","bordado","etiqueta"]` compatível com o tecido. |
| `foto` | string | FIXO | Caminho relativo da imagem em `assets/produtos/`. |
| `descricao` | string \| null | copywriter | Parágrafo seco "o que é / pra que serve / caimento". `null` até o copy escrever (NÃO da Real). |
| `cores` | string[] | `[A CONFIRMAR]` | Cartela por modelagem. `[]` por enquanto → renderiza "[A CONFIRMAR]". |
| `medidas` | object \| null | `[A CONFIRMAR]` | Tabela por tamanho. Estrutura sugerida: `{ tamanhos: ["P","M",...], linhas: [{ medida:"Largura", valores:{P:null,M:null} }] }`. `null` por enquanto. |
| `modeloVeste` | string \| null | `[A CONFIRMAR]` | Linha "modelo mede X / veste Y". `null` até foto/modelo real. |
| `pendencias` | string[] | derivado | Lista dos campos ainda `[A CONFIRMAR]` (ex.: `["cores","medidas","modeloVeste"]`). Guia o render do rótulo e o checklist do Gustavo. |

### Notas de enum
- **`grupo`** — 4 valores fixos, na ordem A→B→C→D (mesma ordem do grid e do copy-catalogo).
- **`tecnicas`** — rótulos exatos pra casar com os blocos da Seção 4 (Acabamentos). `dry-fit` exclui `serigrafia` por ora (ressalva técnica em 100% poliéster — confirmar).
- **Ordem do array** = ordem do grid = ordem de scroll das seções de produto (1→11).

### Convenção `[A CONFIRMAR]` no JS
- string pendente → `null`; lista pendente → `[]`.
- `pendencias` carrega os nomes dos campos faltantes pra o template decidir mostrar o selo "[A CONFIRMAR]" sem hardcode. Quando Gustavo preencher, remover o campo de `pendencias`.
