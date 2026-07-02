# Máquina de Marketplaces

Linha de produto do **Guaru Estúdio** — revenda gráfica fracionada (atacado → kits B2B prontos) para Shopee, Mercado Livre e WhatsApp, automatizada via Bling + PrintNode.

**Leia este arquivo primeiro em qualquer conversa nova.** É o índice e o resumo do estado atual — atualizado sempre que algo relevante muda. Cópia espelhada no Notion: [Máquina de Marketplaces — Central do Projeto](https://app.notion.com/p/3854a5c5a0d381cabd9df56924909305) (lá também tem o banco de tarefas, o painel financeiro ao vivo, e o painel de desempenho diário).

## Onde isto vive agora

Esta pasta está **dentro de** `guaru_2.0_itsnow/Maquina de Marketplaces/` — não é mais uma pasta separada no Desktop. Guaru Estúdio é a empresa-mãe; Máquina de Marketplaces é uma linha de produto dela, não um negócio separado. Continua tendo identidade visual e posicionamento de venda próprios (B2B, não confunde com o público B2C do Guaru), mas a gestão (CNPJ, Bling, financeiro) é unificada.

## Índice de arquivos

- **Plano_Mestre_Crescimento_Guaru_Estudio.docx** — visão executiva do ecossistema completo (os dois motores de receita, matemática da meta de R$2-3k/mês, cronograma de 30 dias).
- **Maquina_Marketplaces_Plano_Estrategico.docx** — plano original: diagnóstico, nichos, preços, roadmap.
- **01_Financeiro/Matriz_Precos_Kits.xlsx** — precificação dos 4 kits: Doceria, Bijuteria, Delivery, Floricultura.
- **01_Financeiro/Controle_Financeiro_Geral.xlsx** — controle financeiro do **Pessoal** (Bling/ERP não tem esse conceito). Em uso ativo — lance qualquer gasto em chat que eu registro direto.
- **01_Financeiro/ERP_Guaru_Estudio.xlsx** — mini-ERP do negócio + pessoal unificado (Fornecedores, Clientes, Produtos — catálogo real do Guaru + kits MM —, Vendas, Contas a Pagar/Receber, Lançamentos Pessoal, Gastos Fixos Pessoal, Dashboard único). Eu alimento conforme você me conta o que acontece.
- **Guaru_App.html + app.js + xlsx.full.min.js** — o "app" interno, em 3 arquivos (têm que ficar juntos na mesma pasta): `Guaru_App.html` é só a estrutura/visual; `app.js` é toda a lógica (organizado em 8 blocos comentados — ver índice no topo do arquivo); `xlsx.full.min.js` é a biblioteca de leitura de Excel, nunca precisa editar. Dá duplo-clique no `Guaru_App.html` pra abrir no Chrome/Edge, clica em "🔗 Conectar Planilha" **uma única vez** e seleciona o ERP_Guaru_Estudio.xlsx — depois disso ele relê o arquivo sozinho a cada ~8s (File System Access API). Não precisa de internet. Dashboard mostra Saldo Atual (pessoal, manual — atualizo quando você me avisa), gastos fixos, vendas/contas do negócio, 2 gráficos de rosca e busca/filtro em toda tabela.
- **02_Operacional/scripts/sync_produtos.py** — relê `Tabela de preços/js/dados_produtos.js` (o mesmo arquivo que o Claude Code edita no site) e reconstrói a aba Produtos do ERP com o catálogo real (produtos distintos, faixa de custo/venda, nº de variações). Roda automaticamente todo dia às 20:30 via tarefa agendada (`sync-produtos-site-erp`) — conforme produto novo entra no site, aparece no ERP/app sozinho no dia seguinte, sem eu precisar copiar manualmente.
- **01_Financeiro/Estrategia_Negociacao_Plano_Claro.md** — estratégia pra negociar os planos de celular (Marcos e Pamela).
- **02_Operacional/Checklist_Contas_e_Setup.md** — checklist operacional em ordem de prioridade — **principal lugar pra ver o que falta fazer**.
- **02_Operacional/Decisao_CNPJ_e_Bling.md** — histórico completo da regularização do CNPJ e decisão do plano Bling.
- **03_Pesquisa-Mercado/Fornecedores.md** — índice consolidado de fornecedores (GIV, CMB, Silkado).
- **03_Pesquisa-Mercado/Radar_de_Oportunidades.md** — log contínuo de produtos/tendências avaliados (avental DTF, oceano azul, etc.) — atualizado semanalmente.
- **03_Pesquisa-Mercado/Guia_Shopee_Primeiras_100_Vendas.md** — estratégia de SKU, algoritmo de busca, Shopee Ads — como chegar nas primeiras vendas sem queimar capital.
- **03_Pesquisa-Mercado/Oportunidade_DTF_Textil_Silkado.md** — avental/uniforme personalizado via DTF têxtil, margem recalculada.
- **04_SKUs-e-Artes/** — copy dos 4 kits, plano de campanha do Kit Doceria, fotos de referência.
- **Doc_Shopee/**, **Doc_CNPJ_MEI/** — documentos sensíveis.

## Status atual (20/06/2026, fim do dia — revisão final)

Fase: estruturação avançada — formalização 100% pronta, plataformas configuradas, estratégia de lançamento definida, ainda sem venda real.

**Formalização — concluída:**
- CNPJ 67.597.338/0001-43 (MEI novo), Inscrição Estadual 335.836.534.115 (ativa, credenciada pra NF-e), Bling configurado (plano Cobalto)

**Plataformas de venda:**
- Shopee: migração CPF→CNPJ em revisão (até 4 dias). Mercado Livre: ainda não aberta.
- **Domínio `guaruestudio.com.br` comprado — 21/06/2026** (Locaweb, registro avulso, sem hospedagem). Site ainda offline até apontar o DNS pra onde ele for hospedado (decisão de hospedagem em aberto até saber o que o build do Claude Code exige).

**Estratégia de lançamento (definida hoje):**
- Lançar 1 SKU por vez (Kit Doceria primeiro), não o catálogo inteiro de uma vez — algoritmo da Shopee recompensa avaliação/conversão concentrada, não SKUs espalhados
- Sem Shopee Ads no início — completar Missões do Vendedor (impulso gratuito) e vender as primeiras unidades via rede pessoal antes de gastar em anúncio pago (mínimo R$50/dia)
- Avental personalizado DTF têxtil avaliado como expansão futura — margem real ~49-63% (comprando DTF por metro, não por folha), preço-alvo R$29,90-34,90

**Produto:**
- 4 kits prontos: Doceria (R$34,90), Bijuteria (R$39,90), Delivery (R$42,90), Floricultura (R$59,90)
- Lote piloto na GIV (250un, R$54,99): ainda não comprado

**Pendências reais:**
- Decidir hospedagem do site + apontar DNS, lote piloto, produzir arte/foto, abrir conta PJ, configurar DAS facilitado

## Automações agendadas ativas (rodam sozinhas, sem eu precisar pedir)

**Revisado e corrigido em 21/06/2026** — uma auditoria encontrou que só 2 das 5 abaixo existiam de
verdade (estavam no agendador do Cowork). As outras 3 estavam documentadas aqui como se rodassem,
mas nunca tinham sido conectadas a nenhum agendador real — `sync_produtos.py` só tinha rodado uma
vez dentro de uma sandbox de nuvem (caminho `/sessions/.../mnt/...`), e o notebook nem tem Python
instalado pra rodar esse script local. As 3 foram refeitas e agora rodam de fato:

- **guaru-sync-produtos-site-erp** (todo dia 20:30, Tarefa Agendada do Windows) — reescrito em
  Node (`02_Operacional/scripts/sync_produtos.js`, usa `exceljs` em vez de Python/openpyxl, que
  não está instalado no notebook). Relê `Tabela de preços/js/dados_produtos.js` e reconstrói a aba
  Produtos do `ERP_Guaru_Estudio.xlsx` — faz backup datado em `01_Financeiro/backups/` antes de
  cada escrita (regra do `CLAUDE.md` pra esse bloco crítico de arquivo).
- **guaru-organizar-arquivos-soltos** (todo dia 23h, Tarefa Agendada do Windows) — novo script
  (`02_Operacional/scripts/organizar_arquivos_soltos.js`, antes não existia em lugar nenhum). Move
  arquivo solto da raiz pra pasta certa (Referências/Mockups/Identidade Visual/Financeiro) só
  quando o nome bate um padrão claro; qualquer coisa ambígua ou que pareça chave/senha/token fica
  parada e é reportada, nunca movida no escuro. Roda com `--dry-run` pra conferir antes de mover.
- **guaru-radar-oportunidades-semanal** (domingo 19:10 BRT) — agora é uma rotina de nuvem real
  (`claude.ai/code/routines`, id `trig_01GzTctEu4ksirc3h9PDuhax`), conectada ao Notion: pesquisa
  tendência/produto alinhado ao modelo e, se achar sinal real, adiciona linha na tabela "Radar de
  Oportunidades" da página Notion do projeto. Roda na nuvem, não depende do notebook estar ligado.
- **alerta-vencimentos-contas** (todo dia 8:05) e **notion-atualizacao-diaria** (todo dia 20h) —
  essas duas já existiam de verdade, confirmadas em **Despacho → Programado** no Cowork (Claude
  Desktop). Não foram tocadas nesta revisão.

## Comandos rápidos (frases que disparam ação direta, sem precisar explicar de novo)

- **"sincroniza os produtos do catálogo"** (ou parecido) → roda na hora, sem perguntar nada: ler `Tabela de preços/js/dados_produtos.js`, rodar `Maquina de Marketplaces/02_Operacional/scripts/sync_produtos.py <caminho_js> <caminho_erp>` (reconstrói a aba Produtos do ERP com produto distinto + faixa custo/venda), recalcular com o skill xlsx (`recalc.py <erp> 90`, confirmar 0 erros), copiar de volta pra `01_Financeiro/ERP_Guaru_Estudio.xlsx` se rodou em pasta temporária. Já existe também uma tarefa agendada (`sync-produtos-site-erp`, todo dia 20:30) fazendo isso automaticamente — esse comando é só pra forçar fora do horário.
- **Qualquer gasto/recebimento mencionado em chat** (ex: "40 gasolina", "paguei o aluguel", "recebi 100 da Quitanda") → usar `01_Financeiro/lancar.py`, NÃO escrever script novo do zero. Um comando só faz tudo: lança em Lançamentos Pessoal, atualiza o Saldo Atual do Dashboard automaticamente (soma se Entrada, subtrai se Saída), recalcula e copia pro destino.
  ```
  cd "Maquina de Marketplaces/01_Financeiro" && python3 lancar.py <Entrada|Saida> <valor> "<categoria>" "<descrição>"
  ```
  Exemplo real: `python3 lancar.py Saida 40 Transporte "Gasolina"`. Categorias já usadas: Moradia, Transporte, Assinaturas e Serviços, Outros (Pessoal), Recebível de Venda Anterior, Compra de Mercadoria/Insumo. Flags opcionais: `--conta` (padrão Pessoal — só lançamentos de "Pessoal" tocam o Saldo Atual), `--forma` (padrão "Não informado"), `--data` (padrão hoje, formato AAAA-MM-DD).
- **Qualquer evento de negócio** (venda, fornecedor novo, cliente novo, conta a pagar/receber) → usar `01_Financeiro/registrar.py`, mesmo princípio do `lancar.py`: um comando só, recalcula e copia pro destino sozinho. Testado e validado (recalc 0 erros, Dashboard atualiza automaticamente) antes de entrar em uso.
  ```
  cd "Maquina de Marketplaces/01_Financeiro"
  python3 registrar.py venda "<cliente>" "<produto>" <qtd> <valor_unit> "<canal>"
  python3 registrar.py fornecedor "<nome>" "<o que fornece>" "<contato>" "<condições>" "<usado em>"
  python3 registrar.py cliente "<nome>" "<contato>" "<canal de origem>"
  python3 registrar.py contapagar "<descrição>" "<categoria>" <valor> "<vencimento>"
  python3 registrar.py contareceber "<cliente/canal>" "<pedido vinculado>" <valor>
  ```
  Exemplo real: `python3 registrar.py venda "Maria Silva" "Kit Doceria" 2 34.90 Shopee`.

## Decisões já tomadas (não reabrir sem motivo novo)

- Guaru Estúdio é a empresa-mãe; Máquina de Marketplaces é linha de produto dela.
- Cadastro de produto e qualquer ação na Shopee/Mercado Livre: sempre via planilha → Bling → exportação oficial. Nunca clique direto no painel logado pela IA.
- Não usar dois CPFs em duas contas Shopee.
- Kit avulso de 100un não compete em preço — virou combo.
- Caneca/squeeze branco comum não é oportunidade — oceano azul é DTF UV em superfície colorida.
- Certificado digital: não vale tirar agora só pelo bônus de dias extra do Bling.
- Controle financeiro é único (pessoal + os dois negócios) — lançamentos via chat.
- **Bling será o financeiro oficial de TODO o negócio** (Guaru Estúdio + Máquina de Marketplaces, mesmo CNPJ) — contas a pagar/receber, caixa, DAS MEI — uma vez que tiver movimento real. Máquina de Marketplaces entra primeiro (mais perto da 1ª venda); Guaru Estúdio entra quando tiver o 1º cliente pagante. Pessoal continua só na nossa planilha, já que Bling não tem esse conceito.
- **Lançar 1 SKU por vez**, não o catálogo inteiro — confirmado pelo próprio algoritmo de busca da Shopee.
- **Sem Ads pago no início** — esquentar com vendas/avaliações reais primeiro.
- Bordado é inviável (sem máquina) — só DTF têxtil/UV como técnica de personalização.

## Como isto se conecta ao resto do Guaru Estúdio

`guaru_2.0_itsnow/` é a pasta raiz de tudo — site (em desenvolvimento via Claude Code, ainda sem domínio próprio), identidade visual, marketing, e esta pasta de Máquina de Marketplaces. Fornecedores (GIV, CMB, Silkado) e know-how de design são compartilhados entre as duas frentes.
