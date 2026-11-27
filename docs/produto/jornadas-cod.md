# ORDERX · OX-COD-01 — Jornadas e decisões COD
27/11/2026 · Baseline `e167126e2e54dd4aff20e5a02436ae987ff1a67a` · [Matriz](cobertura.md) · [Evidência numérica](evidencias/ox-cod-01.json).
Contrato documental calculado sobre fixtures, não implementação nem aprovação de regras críticas.

## Mapa por papel
| Actor | Entrada → percurso | Fronteira |
| --- | --- | --- |
| Visitante/comerciante | A01 → A02/A03 → B01/B04/B05; A01 → C15 público | Sem dados privados |
| Dono/gestora | C01 → C02/C02.a–c → C03/C03.a–c → D01; C09/C11/C15/C16 | Loja activa; arquivo preserva vendas |
| Comprador | D01 → D02; D03/D04 se falha | Convidado, referência própria; prévia sem encomenda |
| Atendimento | C04 → C04.a → C05/C05.a/C06 → C07; C14 | Contacto autorizado; não concilia dinheiro |
| Estafeta | C07.a → C07/C14 | Só entrega atribuída; declara, não concilia |
| Stock | C13 → C13.a/C13.b → C02.a/C12 | Movimentos autorizados, histórico imutável |
| Financeiro | C08 → C10/C12 | Conciliação da sua loja, divergência explícita |
| Superadmin | E01 → E02/E03/E04/E05/E06 | Sem contactos comerciais por defeito; não observado |

## Fixture e decisões
DECISÃO vigente: COD para bens físicos, UCODEfy referência de operação, identidade ORDERX; planos representados visualmente; nenhuma cobrança real ou integração externa autorizada.
HIPÓTESE H-STOCK-01: reservar na submissão aceite; validar disponibilidade atomicamente no futuro. Físico = unidades ainda não entregues, incluindo trânsito; reservado = compromisso activo; disponível = físico − reservado. Baixa física e consumo de reserva só na entrega comprovada. Falha mantém reserva; retorno antes da entrega não incrementa físico. Cancelamento antes da saída liberta reserva; após saída confirmar custódia antes de libertar. Devolução após entrega exige movimento compensatório único ligado à baixa e revisão financeira; nunca editar baixa. Política real pendente.
HIPÓTESE H-COD-01: por receber = total exigível ainda não conciliado; declaração do estafeta é subconjunto, não recebido confirmado. Recebido = confirmação financeira. Divergência mantém pendência; parcial/reembolso/contabilidade pendentes. Cancelamento anterior à entrega anula exigível e conserva histórico encomendado.
Fixture independente: Amora Cosméticos, Creme Anti-Manchas, Facebook · Maputo, ENC-1001 (mesma referência em universos J1/J2/J3 isolados, não agregar três vendas), data ilustrativa 26/11/2026, Maputo, sem contacto real. Saldo inicial 10 físicas, 0 reservadas, 10 disponíveis; todos os montantes zero. 2 × 999,00 MT = 1.998,00 MT; entrega fixa 100,00 MT; total 2.098,00 MT. Inteiros 2 × 99.900 + 10.000 = 209.800 centavos.
Estados alvo, não enum SQLite actual: Recebida → Por confirmar; Em processamento → Confirmado/em expedição (não distingue); Entregue/Cancelada → homónimos. Não migrar sem preservar dados. Origem de cada transição = linha anterior; passo 00 parte da fixture sem pedido. F/R/D = físico/reservado/disponível. Δ F/R unidades. Declarado = saldo não conciliado. Taxa não altera unidades.

## J1 · Entrega cobrada e conciliada

| Passo | Actor | Ecrã/ID | Evento | Pedido | Entrega | Cobrança | F/R/D un. | Δ F/R | Por receber MT | Recebido MT | Declarado MT | Encomendado / entregue MT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 00 | Gestora | C02.b/C02.a | Ficha e saldo inicial | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 01 | Gestora | C03.a/C03.c | Publicar oferta; prévia sem pedido | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 02 | Comprador | D01/D02 → C04/C14 | Submeter; fixar valores e reservar | Por confirmar | Não iniciada | Por receber | 10/2/8 | 0/2 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 03 | Atendimento | C04.a/C06 | Confirmar contacto/pedido | Confirmado | Por preparar | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 04 | Gestora | C07/C07.a | Atribuir e expedir; sem baixa | Em expedição | Em curso | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 05 | Estafeta | C07.a/C13.a/C14 | Entregar; declarar numerário; baixa e consumo reserva | Entregue | Entregue | Declarado/por conciliar | 8/0/8 | -2/-2 | 2098,00 | 0,00 | 2098,00 | 2098,00 / 2098,00 |
| 06 | Financeiro | C08/C10/C12 | Conferir e confirmar recebimento | Entregue | Entregue | Conciliado | 8/0/8 | 0/0 | 0,00 | 2098,00 | 0,00 | 2098,00 / 2098,00 |

## J2 · Falha e nova tentativa concluída

| Passo | Actor | Ecrã/ID | Evento | Pedido | Entrega | Cobrança | F/R/D un. | Δ F/R | Por receber MT | Recebido MT | Declarado MT | Encomendado / entregue MT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 00 | Gestora | C02.b/C02.a | Ficha e saldo inicial | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 01 | Gestora | C03.a/C03.c | Publicar oferta; prévia sem pedido | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 02 | Comprador | D01/D02 → C04/C14 | Submeter; fixar valores e reservar | Por confirmar | Não iniciada | Por receber | 10/2/8 | 0/2 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 03 | Atendimento | C04.a/C06 | Confirmar contacto/pedido | Confirmado | Por preparar | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 04 | Gestora | C07/C07.a | Atribuir e expedir; sem baixa | Em expedição | Em curso | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 05 | Estafeta | C07.a/C06/C14 | Tentativa 1 falha; retorno à guarda loja; manter reserva | Em expedição | Tentativa falhada | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 06 | Gestora/estafeta | C07/C07.a/C06 | Reagendar e iniciar tentativa 2; mesmo pedido | Em expedição | Em curso | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 07 | Estafeta | C07.a/C13.a/C14 | Entregar; declarar numerário; baixa e consumo reserva | Entregue | Entregue | Declarado/por conciliar | 8/0/8 | -2/-2 | 2098,00 | 0,00 | 2098,00 | 2098,00 / 2098,00 |
| 08 | Financeiro | C08/C10/C12 | Conferir e confirmar recebimento | Entregue | Entregue | Conciliado | 8/0/8 | 0/0 | 0,00 | 2098,00 | 0,00 | 2098,00 / 2098,00 |

## J3 · Cancelamento antes da expedição

| Passo | Actor | Ecrã/ID | Evento | Pedido | Entrega | Cobrança | F/R/D un. | Δ F/R | Por receber MT | Recebido MT | Declarado MT | Encomendado / entregue MT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 00 | Gestora | C02.b/C02.a | Ficha e saldo inicial | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 01 | Gestora | C03.a/C03.c | Publicar oferta; prévia sem pedido | — | — | — | 10/0/10 | 0/0 | 0,00 | 0,00 | 0,00 | 0,00 / 0,00 |
| 02 | Comprador | D01/D02 → C04/C14 | Submeter; fixar valores e reservar | Por confirmar | Não iniciada | Por receber | 10/2/8 | 0/2 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 03 | Atendimento | C04.a/C06 | Confirmar contacto/pedido | Confirmado | Por preparar | Por receber | 10/2/8 | 0/0 | 2098,00 | 0,00 | 0,00 | 2098,00 / 0,00 |
| 04 | Atendimento autorizado | C04.a/C13.a/C14 | Cancelar com motivo antes da expedição; libertar reserva/anular exigível | Cancelado | Cancelada antes da saída | Anulado | 10/0/10 | 0/-2 | 0,00 | 0,00 | 0,00 | 2098,00 / 0,00 |

## Excepções e dependências
- D04 mesma chave de submissão/oferta devolve mesma referência; conflito de payload deve ser rejeitado. Sem stock/província não disponível: sem pedido nem reserva. Preço revisto exige confirmação explícita. 03/07.
- C07/C07.a: ID de tentativa distinto; nova tentativa não cria novo pedido/reserva/baixa. Uma baixa por entrega/pedido, com chave de efeito por loja, pedido e tipo de movimento. Estado terminal impede nova baixa mesmo com ID de evento novo. C13.a/b: devolução compensatória única por operação, referenciada à baixa, limitada à quantidade não devolvida; não restituir por mera falha. 04/07.
- C08: declaração e conciliação têm chaves distintas; repetir não soma valor. Divergência exige evidência/operador. Cancelamento pós-entrega ou pagamento requer política de devolução/reembolso, fora dos cenários. 04/07.
- C14/C12: evento único por acção, actor, loja, referência, data, motivo, âmbito. C01/C10 derivam da mesma fonte: J3 bruto 2.098, cancelado 2.098, líquido activo 0, entregue/recebido 0; J1/J2 entregue e recebido 2.098, reserva 0; J2 duas tentativas, uma baixa. 02/04/07.
- 05: planos, adesão, conta, equipa, suporte, Superadmin; sem tarifas reais ou pagamentos. 06: validação 390/820/1440, teclado, foco, contraste, aceite RIGHTWARE por ID. 07: decidir stock, cobranças, E.deliver, retorno/reembolso, províncias/taxas, exportação, âmbito multi-loja e integrações; validar autorização, idempotência transaccional, concorrência e recuperação.

## Evidência
199 asserções PASS em JavaScript nesta sessão (27/11/2026), 21 transições: inteiros, limites, conservação financeira, comparação com expectativas independentes, replay das mesmas chaves, única baixa, finais. Replay de fixture não prova backend, concorrência ou rejeição de outro ID semântico. JSON conserva deltas, resultados e expectativas. Build/browser/CI/persistência/aceitação NOT_RUN: apenas documentação.
