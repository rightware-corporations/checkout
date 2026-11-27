# ORDERX · Descoberta da referência COD
27/11/2026 · Handoff de produto para a RIGHTWARE. Baseline anterior: 84d889a. A nova referência motivou esta revisão antes da execução do programa anterior.

## Observado com acesso de produtor
- Landing com planos por número de produtos e volume mensal de pedidos. Login, registo, recuperação e Google aparecem na interface.
- O editor de produto agrega ficha física, fotografia, preço em MT, stock inicial, headline e descrição pública. Também permite configurar endereço do checkout, confirmação de contacto activo, oferta adicional, províncias de entrega e textos de confirmação e agradecimento. Campos de rastreio aparecem no editor.
- A fila de pedidos mostra cliente, produto, quantidade, total, localização, contacto, hora, estado e acções. Há filtros de produto, província, período, mês e estado. Exportação visível. O significado de E.deliver precisa de confirmação.
- Stock reúne saldo, resumo diário por produto, evolução das entregas e movimentos de subtracção. O histórico apresenta data da entrega, unidades retiradas e saldo restante. A regra precisa de reserva, baixa, devolução e correcção continua por verificar.
- Notificações distinguem pedido recebido, mudança de estado e entrega. Definições incluem perfil, senha e preferências de comunicação. Plano inclui escolha de nível e histórico de pagamentos. O separador Suporte foi aberto. Não foi executada transacção nem efectuada gravação intencional.
- Não há evidência de acesso ao Superadmin. Um rótulo de receita não demonstra recebimento de numerário.

## Nova direcção proposta
Desenhar a operação de um comerciante que vende bens físicos com pagamento na entrega. Primeiro percurso de aceitação: publicar uma oferta, receber um pedido numa província servida, contactar o comprador, preparar a entrega e verificar o efeito sobre stock e montante por receber. Incluir cancelamento e tentativa falhada como percursos distintos. Usar produtos e contactos sintéticos da RIGHTWARE.

Separar no modelo a ficha do artigo, a oferta publicada, o pedido, a entrega, o movimento de stock e o recebimento. Na interface podem fazer parte do mesmo fluxo. Mostrar valores encomendado, entregue e recebido separadamente, com origem rastreável. Hipótese de melhoria a validar com o cliente.

## Decisões pendentes
1. A primeira entrega serve uma operação de venda ou será comercializada por subscrição a várias lojas?
2. Em que momento se reserva e dá baixa ao stock, e quem confirma a cobrança?
3. Que províncias, taxas e integrações são essenciais no lançamento? Validar a utilidade de oferta adicional, pixel e notificações externas antes de assumir paridade.

## Continuidade
Preservar checkout e gestão de pedidos já testados. Rever o inventário anterior por decisão manter/adaptar/adiar. Prioridade proposta: oferta COD e checkout; depois pedidos, entregas, stock e conferência; subscrições e governação dependem da decisão comercial. O presente registo distingue observação de proposta e não autoriza alterações de código.