# VISUAL-BIBLE — Guaru Estúdio
**Versão:** 1.0 | **Data:** 2026-06-29 | **Base:** 47 imagens de referência

> Este documento é a fonte de verdade visual para qualquer agente que produza peças para o Guaru Estúdio — seja post, carrossel, story, banner, site ou anúncio. Ler antes de criar. Seguir sem improvisar.

---

## PALETA OFICIAL

| Token           | Hex      | Uso                                             |
|-----------------|----------|-------------------------------------------------|
| `--lime`        | `#CCFF00`| Destaque de headline, CTA, ícones de ação       |
| `--black`       | `#0A0A0A`| Fundo principal (modo escuro)                   |
| `--off-white`   | `#F0F0EC`| Texto sobre fundo preto, fundo alternativo      |
| `--dark-green`  | `#0D1A0D`| Fundo alternativo escuro (variação do black)    |
| `--gray-mid`    | `#1A1A1A`| Cards internos, separadores sutis               |

**Regra de contraste:** lime sempre sobre preto ou dark-green. Nunca lime sobre branco puro (perde força).

---

## TIPOGRAFIA

| Papel            | Família sugerida                    | Peso    | Características                        |
|------------------|-------------------------------------|---------|----------------------------------------|
| Display / Hero   | Qualquer grotesca condensada bold   | 900     | Letras maiúsculas, bloco cheio, 80-130pt |
| Subtitle         | Mesma família, peso regular/medium  | 400–500 | Mixed case, 20-30pt                    |
| Body             | Grotesca sem-serif legível          | 400     | 14-16pt, off-white, espaçamento 1.5    |
| Label / tag      | Grotesca all-caps                   | 700     | Caixa preta ou lime, 10-12pt, tracking alto |
| Mono / UI        | Fonte monospace                     | 400     | Cantos numerados tipo `[01/07]`, pequeno |

**Referências visuais observadas:** Zorain Shahzad usa Archivo Black; ainovation.ai usa mistura condensada + mono; Ennomark usa grotesca wide. O Guaru deve usar sempre **grotesca rounded bold** para headline (alinha ao logo "guaru") + grotesca padrão para corpo.

---

## ELEMENTOS GRÁFICOS RECORRENTES

### Setas e direção
- Seta diagonal `↗` ou `→` em lime — indica ação, próxima slide, CTA
- Chevrons triplos `>>>` em lime — urgência, progressão
- Seta grande em pill/círculo verde cheio (Zorain style) — CTA carousel final

### Pills / Tags
- Bordas arredondadas (border-radius ~999px), preenchimento lime ou stroke lime
- Texto bold, all-caps, 10-12px com tracking 0.1em
- Uso: categorias de conteúdo, hashtags, chamadas de ação secundárias

### Linhas divisórias
- Linha horizontal fina (1px, off-white 30% opacity) — separa header de conteúdo
- Linha diagonal ou barra `|` verde — marcadores de seção

### Decorações de fundo
- **Grid quadriculado** — linhas finas visíveis sobre fundo preto (opacidade 8-15%)
- **Arcos/semicírculos** — círculos cortados no canto (traço lime ou off-white)
- **Manchas de gradiente** — blobs radiais green/lime em cantos (opacidade 20-40%)
- **Textura com asterisco `*`** — decoração de canto, branca ou lime, símbolo tipográfico grande
- **Texto tipográfico rotacionado** — palavra girada 90° como textura de fundo (Branditia, farkhod.art)
- **Fitas/ribbons com texto** — tiras diagonais com texto repetido (UpDraft style)

### Numeração de slides
- `[01/07]` no canto superior direito em fonte mono, cor lime ou off-white 50%
- `— SWIPE →` no rodapé esquerdo + `KEEP READING` no rodapé direito

---

## 5 CATEGORIAS DE LAYOUT

---

### CATEGORIA A — TYPOGRAPHIC BOMB
**Identidade:** A headline ocupa 70-90% da área. Sem imagem. Texto é o visual.

**Exemplos de referência:** Zorain Shahzad (PERSONAL BRANDING / YOU DON'T NEED), Ennomark (Big Ideas Need Bold Platforms), ainovation.ai (5 RULES FOR FOCUS)

**Especificações técnicas:**
- Canvas: 1080×1080px (feed) ou 1080×1350px (portrait)
- Fundo: `#0A0A0A` puro
- Grid: 2 colunas implícitas — headline na esquerda/centro, elemento decorativo no canto direito
- Headline: 3-4 palavras por linha, font-size ~120-160px, line-height 0.9, peso 900
- Cor headline: off-white para corpo do texto + 1 palavra/linha em lime
- Suporte: frase pequena abaixo (18-20px, off-white 70%, font-weight 400)
- Rodapé: seta `→` em pill lime no canto inferior direito
- Header: logo + handle no topo esquerdo | redes sociais no topo direito
- Decorações permitidas: asterisco `*` no canto, linha divisória horizontal fina
- Proibido: foto de pessoa, ilustração complexa, mais de 2 cores de texto

**SVG spec (1080×1080):**
```
background: #0A0A0A
padding: 48px
headline block: y=200, font-size=130px, font-weight=900, fill=#F0F0EC
accent word: fill=#CCFF00 (1 palavra na 3ª ou 4ª linha)
subtext: y=820, font-size=18px, fill=#F0F0EC, opacity=0.7
arrow pill: cx=960, cy=960, r=40, fill=#CCFF00; arrow inside fill=#0A0A0A
logo area: x=48, y=48
```

---

### CATEGORIA B — LIME ON BLACK (conteúdo + dado visual)
**Identidade:** Fundo preto, headline media em lime, dado numérico ou gráfico ocupa metade inferior ou metade direita.

**Exemplos de referência:** IMG_1571 (Planos 10k-100k com barras), IMG_1571 (grid lima), Digital Karma (Low Visibility / Weak Branding / Ads)

**Especificações técnicas:**
- Canvas: 1080×1080px
- Fundo: `#0A0A0A`
- Grid de fundo: quadriculado fino, `#CCFF00` 8% de opacidade
- Headline: font-size 80-100px, peso 700-800, cor lime `#CCFF00`
- Subheadline: peso 400-500, off-white, font-size 16-20px
- Elemento visual: gráfico de barras pretas sobre lime, ou ícone 3D, ou foto P&B
- Decorações: arcos lime no canto superior direito (semicírculos concêntricos, stroke 2px)
- Rodapé: logo à esquerda + linha horizontal lime separando rodapé
- Elemento de direção: seta `→` ou `↗` em lime no início da headline
- Espaçamento: padding 40-56px

**SVG spec (1080×1080):**
```
background: #0A0A0A
grid lines: stroke=#CCFF00, opacity=0.08, spacing=54px
headline: y=120, fill=#CCFF00, font-size=96px, font-weight=800
body: y=280, fill=#F0F0EC, font-size=18px, line-height=1.6
arc deco top-right: cx=1080, cy=0, r=180, r=240, stroke=#CCFF00, fill=none, strokeWidth=2
footer line: y=980, x1=0, x2=1080, stroke=#CCFF00, opacity=0.4
logo: x=48, y=1000
```

---

### CATEGORIA C — CARROSSEL EDITORIAL (capa + slides internos)
**Identidade:** Sequência de 5-8 slides. Capa impactante com headline grande. Slides internos com estrutura editorial: número, título de seção, texto explicativo.

**Exemplos de referência:** ainovation.ai (A FIELD GUIDE / [01/07]), Zorain Shahzad (carrossel de personal branding), Digital Karma (série problema/solução)

**Especificações técnicas CAPA:**
- Canvas: 1080×1350px (portrait para carrossel)
- Background: `#0A0A0A`
- Topo: `handle.domínio` esquerda + `[01/07]` direita — font mono, 12px, off-white 50%
- Label de série: `► NOME DA SÉRIE` em lime, fonte mono all-caps, 12px, tracking 0.15em; y~160px
- Headline: font-size 120-160px, peso 900, off-white; 1 palavra em lime (pode ser "FOCUS" num retângulo lime cheio)
- Destaque especial: retângulo lime como marcador de texto para 1 palavra-chave
- Suporte: parágrafo de 2-3 linhas abaixo, 16px, off-white 70%
- Rodapé: `— SWIPE →` esquerda + `KEEP READING` direita, mono, 11px

**Especificações técnicas SLIDE INTERNO:**
- Background: `#0A0A0A` ou `#0D1A0D`
- Numeração: `[0X/07]` canto superior direito
- Título do slide: font-size 40-60px, weight 700, off-white ou lime
- Texto corpo: 16-18px, weight 400, off-white 80%, max-width 65%
- Elemento visual: ícone line-art lime OU screenshot de UI OU dado numérico bold
- Separador: linha horizontal 1px off-white 20% após título
- CTA último slide: botão pill lime cheio com texto preto "Salvar" / "Compartilhar"

**SVG spec capa (1080×1350):**
```
background: #0A0A0A
header-mono: y=60, x=48 e x=1032, font-size=11px, fill=#F0F0EC, opacity=0.5
series-label: y=160, fill=#CCFF00, font-size=12px, letter-spacing=2px
headline-block: y=220 até y=720, font-size=140px, line-height=0.88
highlight-rect: fill=#CCFF00; text inside fill=#0A0A0A
support-text: y=780, font-size=16px, fill=#F0F0EC, opacity=0.7
footer: y=1310, fill=#F0F0EC, opacity=0.5, font-size=11px
```

---

### CATEGORIA D — FOTO P&B + TEXTO OVERLAY
**Identidade:** Fotografia em preto e branco ou muito dessaturada ocupa área principal. Texto sobreposto com hierarquia clara. Lime usado apenas em 1-2 elementos.

**Exemplos de referência:** IMG_1603 (CONTROL-Z, foto moto P&B + lime), Thinkster (relógio P&B + headline lime), Batin Studio (foto mãos + headline lime), 88D42A0B (lua P&B + challenge)

**Especificações técnicas:**
- Canvas: 1080×1080px ou 1080×1350px
- Foto: desaturada 100% ou quasi-P&B, ocupa 50-100% da área, alinhada à direita ou base
- Overlay: gradiente `#0A0A0A` sobre foto para legibilidade (opacity 40-70% à esquerda)
- Headline: font-size 80-110px, peso 800, posicionada à esquerda sobre o gradiente
- 1 elemento em lime: a palavra de impacto, ou seta, ou moldura ao redor da foto
- Moldura especial: borda colorida em torno da imagem (lime 4-8px) — ver IMG_1603
- Suporte: 16-18px, off-white
- Decorações: asterisco `*` ou arco de círculo no canto
- Rodapé: logo + contato mínimo

**SVG spec (1080×1080) com foto à direita:**
```
image: x=400, y=0, width=680, height=1080, filter=grayscale(100%)
gradient-overlay: x=0, y=0, w=700, h=1080; linear-gradient(90deg, #0A0A0A 50%, transparent)
headline: x=48, y=300, font-size=100px, font-weight=900, fill=#F0F0EC
lime-word: fill=#CCFF00 (última linha ou palavra de impacto)
arrow: x=48, y=960, fill=#CCFF00
logo: x=48, y=1024
```

---

### CATEGORIA E — CLEAN LIME / OFF-WHITE (modo claro)
**Identidade:** Fundo off-white ou branco. Lime como elemento gráfico pontual (retângulo, sublinhado, círculo). Texto preto pesado. Estética Swiss/editorial.

**Exemplos de referência:** IMG_1583 (The Brand Design Checklist, fundo cinza), IMG_1632 (DO SOMETHING, fundo branco com pill lime), Insha Digital (All eyes on Your Brand, fundo branco), Ennomark (3 Steps roadmap, fundo branco)

**Especificações técnicas:**
- Canvas: 1080×1080px
- Fundo: `#F0F0EC` ou `#FFFFFF`
- Headline: preto `#0A0A0A`, font-size 100-140px, peso 900
- Elemento lime: retângulo atrás de 1 palavra (como marcador de texto), ou pill, ou ícone round, ou círculo decorativo
- Texto de suporte: preto, 16-18px, peso 400
- Decorações: pincelada/marca manual em lime (brush stroke), ou linha ondulada
- Espaçamento: muito mais respiro — padding 60-80px
- Tags/labels: pill contornado preto com texto preto, ou lime sólido com texto preto
- Rodapé: linha separadora + logo + site
- Proibido: fundo preto, gradiente escuro, uso excessivo de lime

**SVG spec (1080×1080):**
```
background: #F0F0EC
headline: y=200, font-size=130px, font-weight=900, fill=#0A0A0A
highlight-rect: fill=#CCFF00, rx=4, behind 1 keyword
body: y=700, font-size=18px, fill=#0A0A0A, opacity=0.8
pill-tag: fill=#CCFF00, rx=999, padding=8px 16px; text fill=#0A0A0A font-size=11px
footer-line: y=1000, stroke=#0A0A0A, opacity=0.15
logo: x=48, y=1024, fill=#0A0A0A
```

---

## REGRAS DE USO INTER-CATEGORIAS

### Mix recomendado para feed (30 posts):
| Categoria | % do feed | Quando usar |
|-----------|-----------|-------------|
| A — Typographic Bomb | 30% | Frases de impacto, provocações, opiniões fortes |
| B — Lime on Black | 25% | Dados, resultados, serviços com número |
| C — Carrossel Editorial | 20% | Tutoriais, listas, passo-a-passos (3-8 slides) |
| D — Foto P&B + Overlay | 15% | Cases, depoimentos com foto, contexto visual |
| E — Clean Lime / Off-White | 10% | Contraste de feed, posts "respiro", infográficos clean |

### Alternância obrigatória:
- Nunca 3 posts seguidos da mesma categoria
- Nunca 2 posts seguidos com fundo branco (Categoria E)
- Sempre intercalar: preto → preto → branco → preto

---

## COMPONENTES FIXOS (presentes em TODAS as categorias)

### Header padrão (topo do post):
```
[LOGO guaru] — fonte bold rounded, ~32px
@guaruestudio — handle pequeno abaixo, 11px, off-white 60%
```
**OU** simplesmente o logo isolado no canto superior esquerdo.

### Rodapé padrão (base do post):
```
linha separadora 1px
[logo]     [site ou @]     [tagline opcional]
```

### Seta de navegação (slides de carrossel):
- Sempre presente no canto inferior direito
- Versão escura: seta em lime sobre pill preto
- Versão clara: seta em pill preto sobre fundo off-white

---

## O QUE NUNCA FAZER

- ❌ Usar o lime em mais de 30% da área total de qualquer peça
- ❌ Fundo colorido que não seja preto, dark-green, off-white ou cinza neutro
- ❌ Fontes serifadas (exceto uso irônico/editorial pontual)
- ❌ Drop shadow em texto (sombra de caixa em elementos gráficos é ok)
- ❌ Gradiente colorido (lime → roxo, etc.) — os gradientes são escuros (preto → dark-green)
- ❌ Mais de 3 pesos de fonte numa mesma peça
- ❌ Ícones estilo flat colorido (permitido: line-art, 3D chrome/glass, foto P&B)
- ❌ Centralização excessiva — preferir alinhamento à esquerda para headlines

---

## REFERÊNCIAS-CHAVE POR AGENTE

| Agente | Olhar para |
|--------|-----------|
| social-content-creator | Categorias A e B como padrão; C para carrossel |
| copywriter-specialist | Zorain Shahzad (provocações diretas, sem rodeio) |
| graphic-designer | Digital Karma série (estrutura problema/solução) + ainovation.ai (editorial) |
| website-architect | Thinkster, UpDraft (tipografia editorial em site) |
| email-designer | Categoria E (clean) para emails; Categoria B para header de email |

---

*Documento gerado pelo orquestrador após análise de 47 imagens de referência. Atualizar após aprovação de Marcos e após cada entrega com feedback em APRENDIZADOS.md.*
