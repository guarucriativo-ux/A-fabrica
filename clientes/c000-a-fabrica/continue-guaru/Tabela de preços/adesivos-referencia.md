# Adesivos — Referência para tabela de preços Guaru Estúdio

Arquivo criado em 18/06/2026. Use este documento para alimentar o sistema de tabela de preços (guaru-tabela-precos.html).

---

## Fornecedor principal escolhido: GIV Online

Site: https://www.givonline.com.br

**Por que GIV?**
- Preços fixos por quantidade de folhas (fácil de tabular)
- Formatos padrão A5 e A4 (tamanhos conhecidos pelos clientes)
- Vinil + Holográfico disponíveis
- Envio para todo o Brasil

---

## Regra de precificação

> **Preço de Venda = Custo × 2** (mesma regra dos Cartões de Visita)

---

## Produtos a cadastrar

### 1. Adesivo Vinil A5 — Tier: Padrão

**Especificações:** 148×210mm · Vinil Branco Brilho 120g · Impressão 4x0 · Rolo Meio-Corte Retangular  
**Prazo de produção:** 4 dias úteis + frete  
**Link GIV:** https://www.givonline.com.br/produto/adesivo-em-vinil?id=11867

| Qtd (folhas) | Custo GIV | Preço de Venda |
|-------------|-----------|----------------|
| 1           | R$ 22     | R$ 44          |
| 5           | R$ 25     | R$ 50          |
| 10          | R$ 35     | R$ 70          |
| 25          | R$ 47     | R$ 94          |
| 50          | R$ 81     | R$ 162         |
| 100         | ⚠️ VERIFICAR | —           |
| 250         | ⚠️ VERIFICAR | —           |

---

### 2. Adesivo Vinil A4 — Tier: Padrão

**Especificações:** 210×297mm · Vinil Branco Brilho 120g · Impressão 4x0 · Rolo Meio-Corte Retangular  
**Prazo de produção:** 4 dias úteis + frete  
**Link GIV:** https://www.givonline.com.br/produto/adesivo-em-vinil?id=11867

| Qtd (folhas) | Custo GIV | Preço de Venda |
|-------------|-----------|----------------|
| 1           | R$ 25     | R$ 50          |
| 50          | R$ 40     | R$ 80          |
| 100         | ⚠️ VERIFICAR | —           |
| 250         | ⚠️ VERIFICAR | —           |

> ⚠️ Preços intermediários (5, 10, 25 folhas) também precisam ser verificados no site da GIV.

---

### 3. Adesivo Holográfico A5 — Tier: Premium

**Especificações:** 148×210mm · Vinil Holográfico Rainbow 170g · Impressão UV · Rolo Meio-Corte Retangular  
**Prazo de produção:** 4 dias úteis + frete  
**Link GIV:** https://www.givonline.com.br/adesivo-holografico

| Qtd (folhas) | Custo GIV | Preço de Venda |
|-------------|-----------|----------------|
| 1           | R$ 25     | R$ 50          |
| 50          | R$ 247    | R$ 494         |
| 100         | ⚠️ VERIFICAR | —           |

---

## Alternativa: CMB (preço por cm²)

Os adesivos na CMB são cobrados por área (cm²) — o cliente escolhe o tamanho e a quantidade, e o preço muda conforme as dimensões. Difícil de mostrar numa tabela fixa, mas tem uma vantagem: **prazo de 1 dia útil** (muito mais rápido que a GIV).

| Produto CMB         | Preço base | Prazo     | Link                                                                                                      |
|---------------------|------------|-----------|-----------------------------------------------------------------------------------------------------------|
| Adesivo Papel 90g   | A partir R$4,00/250un | 1 dia útil | https://www.cartoesmaisbarato.com.br/adesivo-papel/1924/1951/3076/adesivo-papel-adesivo-papel-couche-90g-4x0-sem-verniz-por-cm2-250-20496 |
| Adesivo Vinil 90g   | Por cm²    | 1 dia útil | https://www.cartoesmaisbarato.com.br/adesivo-vinil/1924/1951/3079/adesivo-vinil-adesivo-vinil-90g-4x0-uv-total-frente-por-cm2-250-20499  |

> 💡 Sugestão: usar CMB para pedidos urgentes (cobrar adicional de prazo), GIV para pedidos normais.

---

## Código JavaScript pronto para colar no HTML

Adicionar estes dados dentro do array `allData[]` no arquivo `guaru-tabela-precos.html`.

> ⚠️ Os valores marcados com TODO precisam ser verificados no site da GIV antes de publicar.

```javascript
// ── ADESIVOS ──

// Adesivo Vinil A5 (148×210mm) — GIV Online · Branco Brilho 120g · 4x0 · Rolo Meio-Corte
{name:"Adesivo Vinil A5",  tier:"padrao",  formato:"148×210mm", qty:1,   custo:22,  venda:44},
{name:"Adesivo Vinil A5",  tier:"padrao",  formato:"148×210mm", qty:5,   custo:25,  venda:50},
{name:"Adesivo Vinil A5",  tier:"padrao",  formato:"148×210mm", qty:10,  custo:35,  venda:70},
{name:"Adesivo Vinil A5",  tier:"padrao",  formato:"148×210mm", qty:25,  custo:47,  venda:94},
{name:"Adesivo Vinil A5",  tier:"padrao",  formato:"148×210mm", qty:50,  custo:81,  venda:162},
// TODO: verificar custo para qty 100 e 250 no site GIV

// Adesivo Vinil A4 (210×297mm) — GIV Online · Branco Brilho 120g · 4x0 · Rolo Meio-Corte
{name:"Adesivo Vinil A4",  tier:"padrao",  formato:"210×297mm", qty:1,   custo:25,  venda:50},
{name:"Adesivo Vinil A4",  tier:"padrao",  formato:"210×297mm", qty:50,  custo:40,  venda:80},
// TODO: verificar custo para qty 5, 10, 25, 100, 250 no site GIV

// Adesivo Holográfico A5 (148×210mm) — GIV Online · Rainbow 170g · UV · Rolo Meio-Corte
{name:"Adesivo Holográfico A5", tier:"premium", formato:"148×210mm", qty:1,  custo:25,  venda:50},
{name:"Adesivo Holográfico A5", tier:"premium", formato:"148×210mm", qty:50, custo:247, venda:494},
// TODO: verificar custo para qty 5, 10, 25, 100 no site GIV
```

---

## Cards de modelo para o HTML

Adicionar estes cards na grade de modelos da aba **Adesivos** (quando for criada).

```html
<!-- Adesivo Vinil A5 -->
<div class="model-card" onclick="pickModel('Adesivo Vinil A5','padrao',null,false,true,null)">
  <div class="model-name">Adesivo Vinil A5</div>
  <div class="model-sub">148×210mm · Vinil Branco · 4x0</div>
</div>

<!-- Adesivo Vinil A4 -->
<div class="model-card" onclick="pickModel('Adesivo Vinil A4','padrao',null,false,true,null)">
  <div class="model-name">Adesivo Vinil A4</div>
  <div class="model-sub">210×297mm · Vinil Branco · 4x0</div>
</div>

<!-- Adesivo Holográfico A5 -->
<div class="model-card" onclick="pickModel('Adesivo Holográfico A5','premium',null,false,true,null)">
  <div class="model-name">Adesivo Holográfico A5</div>
  <div class="model-sub">148×210mm · Holográfico Rainbow · UV</div>
</div>
```

---

## Links diretos para verificação de preços

| Produto                  | Link para conferir                                                             |
|--------------------------|--------------------------------------------------------------------------------|
| Adesivo em Vinil (GIV)   | https://www.givonline.com.br/produto/adesivo-em-vinil?id=11867                 |
| Adesivo Holográfico (GIV)| https://www.givonline.com.br/adesivo-holografico                               |
| Adesivo Papel (CMB)      | https://www.cartoesmaisbarato.com.br/adesivo-papel/1924/1951/3076/adesivo-papel-adesivo-papel-couche-90g-4x0-sem-verniz-por-cm2-250-20496 |
| Adesivo Vinil (CMB)      | https://www.cartoesmaisbarato.com.br/adesivo-vinil/1924/1951/3079/adesivo-vinil-adesivo-vinil-90g-4x0-uv-total-frente-por-cm2-250-20499  |

---

## Notas para o Claude Code implementar

1. O campo `gram` dos cartões de visita não existe nos adesivos — usar `formato` no lugar (ex: "148×210mm")
2. Não há **Corte Especial** nos adesivos por enquanto
3. Não há distinção 4x0 / 4x4 nos adesivos — são todos 4x0 (frente colorida)
4. A aba **Adesivos** no HTML ainda está como "em breve" — criar os cards e lógica de navegação
5. O prazo de 4 dias úteis (GIV) pode ser exibido na tela de preços como informação adicional
6. Verificar todos os campos marcados com ⚠️ ou TODO antes de publicar
