# Checklist Operacional — Máquina de Marketplaces

Status em 20/06/2026 (atualizado à tarde). Marcar [x] conforme for concluindo. Itens em ordem de prioridade real, não por categoria.

## Próximos passos imediatos

- [x] **Migrar cadastro da Shopee de CPF para CNPJ — documentos enviados (20/06)**. "KYC validado", em revisão (até 4 dias). Próximo passo: aguardar aprovação, depois clicar "Converter para CNPJ" (ainda vai aparecer pra confirmar). Depois de aprovado, trocar a conta bancária cadastrada pra uma no mesmo CNPJ (senão não consegue mais sacar).
- [x] **Inscrição Estadual confirmada — saiu automática no mesmo dia!** IE: **335.836.534.115**, Situação Ativo, já credenciado como emissor de NF-e desde 20/06/2026. Confirmado via Consulta Pública Cadesp (salvo em Doc_CNPJ_MEI).
- [x] Criar a conta do Bling do zero, já no CNPJ novo (67.597.338/0001-43) — **feito 20/06**, plano Cobalto, 30 dias de teste completos
- [x] Configurar dados do emitente no Bling — **etapa concluída** confirmada no onboarding (20/06)
- [ ] **Abrir conta bancária PJ no CNPJ 67.597.338/0001-43** — necessária pra sacar da Shopee depois que a migração for aprovada (aviso já aparece no Shopee). Bancos com conta PJ MEI grátis: Banco Inter, Nubank PJ, C6 Empresas.
- [ ] Configurar pagamento facilitado do DAS do MEI novo (débito automático via PGMEI ou lembrete certo) — antes do primeiro vencimento, pra não repetir o que aconteceu com o MEI antigo
- [ ] Enviar pra Claude o mockup que vai servir de base pra foto do produto
- [ ] Confirmar/produzir a arte final do Kit Doceria (lacre + tag, tema confeitaria)
- [ ] Comprar lote piloto na GIV (250un de lacre, R$ 54,99)
- [ ] Fracionar o piloto e montar o Kit Doceria físico (25 lacre + 25 tag por kit)
- [ ] Com foto + arte + Bling resolvidos: cadastrar o produto via planilha no Bling (Tabela Modelo) e exportar multiloja pra Shopee
- [ ] Preencher `WHATSAPP_NUMBER` no site (`js/catalog.js`, linha 6) antes de publicar a seção de Materiais para Empreendedores
- [x] **Domínio registrado e ativo — confirmado por e-mail 21/06/2026.** `guaruestudio.com.br` válido até 21/06/2027. DNS atual (padrão Locaweb, ainda não trocado): primário `ns1.locaweb.com.br`, secundário `ns2.locaweb.com.br`. Login: usuário `guaruvibes`. Falta: decidir hospedagem do site (ver com Claude Code) e então apontar esse DNS pra lá — ou manter na Locaweb se a hospedagem deles servir. Site ainda offline até isso ser feito.
- [ ] **Site virar e-commerce de verdade** (responsivo + Mercado Pago) — requisitos completos em `guaru_2.0_itsnow/Marketing/Requisitos_Site_Ecommerce.md`, pra passar pro Claude Code. Conta do Mercado Pago e credenciais de API só o Marcos pode criar.
- [ ] **Conectar Instagram ao Meta Business Suite** (gratuito) — permite agendar posts com antecedência, resolve "conteúdo todo dia" sem trabalho diário. Ver modelo atualizado em `guaru_2.0_itsnow/Marketing/Estudo_e_Modelo_Instagram_Guaru_Estudio.md`.

## Contas e ferramentas — status

- [x] Shopee (cadastro 19/06, **aprovado** 20/06) — feito como CPF, **precisa migrar pra CNPJ agora** (ver acima)
- [ ] Mercado Livre — ainda não aberta: [vendedores.mercadolivre.com.br](https://vendedores.mercadolivre.com.br/)
- [x] Bling — **conta criada** no CNPJ novo, plano Cobalto (ver acima)
- [x] Canva, Gmail, Notion — conectados no Cowork
- [ ] PrintNode — não criado ainda: [printnode.com](https://www.printnode.com/en)
- [ ] Kondado (opcional, R$99/mês) — só considerar quando o Bling estiver rodando de verdade

## Formalização (CNPJ/MEI) — RESOLVIDO hoje

- [x] MEI antigo (Marcos, 18.003.767/0001-30, inapto desde 2013) — **baixa concluída** 20/06
- [x] MEI novo aberto no mesmo dia — **CNPJ 67.597.338/0001-43**, CCMEI emitido
- [ ] Declarações DASN-SIMEI 2021-2026 do MEI antigo — pendentes, multa mínima ~R$50/ano (R$0 receita). Não bloqueia nada, resolver com calma
- [ ] Dívida de DAS do MEI antigo (agora no CPF) — parcelar via PGMEI quando confirmar valor com contador
- [ ] Avaliar mesma situação com o MEI da esposa, se aplicável

## Limites a monitorar (período de transição CPF→CNPJ na Shopee)

- [ ] Contagem de pedidos dos últimos 90 dias (alerta perto de 450 — taxa extra de R$3/item depois disso, regra de CPF)
- [ ] Faturamento acumulado no ano (alerta perto de R$ 81.000, regra de CPF)

## Decisões já tomadas (não reabrir sem motivo novo)

- Cadastro de produto e qualquer ação na Shopee/Mercado Livre: sempre via planilha → Bling → exportação oficial. Nunca clique direto no painel logado pela Claude — risco real de banimento.
- App OAuth próprio pra escrever direto no Bling: não construir agora.
- Kit avulso de 100un não compete em preço — por isso virou combo. 4 kits prontos: Doceria (R$34,90), Bijuteria (R$39,90), Delivery (R$42,90), Floricultura (R$59,90).
- Prioridade: Máquina de Marketplaces primeiro. Guaru Estúdio entra no mesmo Bling só quando tiver o primeiro cliente real.
- Não usar dois CPFs em duas contas Shopee — risco de banimento por fingerprint compartilhado.
- Conta Bling só se cria depois do CN