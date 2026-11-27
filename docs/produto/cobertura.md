# Cobertura da aplicação ORDERX · baseline bef16d6

Unidade de contagem: um destino de revisão com ID estável. Estados D03/D04 são contados porque já têm ID no inventário; larguras e variantes internas não multiplicam o denominador. Sufixos separam fichas e editores antes agrupados na mesma família. E01–E06 conserva a família do export; a atribuição individual segue a ordem dos seis temas e é proposta. O inventário é o alvo de desenho para revisão. A contratação dos módulos continua por confirmar.

Legenda dos dois eixos: N = NOT_STARTED, P = IN_PROGRESS, V = VISUALLY_IMPLEMENTED, VA = VISUALLY_VALIDATED, F = FUNCTIONALLY_IMPLEMENTED, FA = FUNCTIONALLY_VALIDATED, I = INTEGRATED, B = BLOCKED. A coluna funcional avalia o percurso indicado, limitado ao vendedor único onde aplicável. Um protótipo público ou prancha é referência, conta zero como implementação real. T = checkout_browser.py cobre a acção principal; M = maqueta apenas; — = sem ensaio de aceitação associado. V exige conjunto visual completo e VA exige revisão registada nos três tamanhos.

| ID | Módulo / interface | Visual | Funcional | Teste | Variante ou lacuna para aceitação |
|---|---|---|---|---|---|
| A01 | Website / apresentação | P | P | T | Entrada da equipa existe; decisão sobre adesão pública |
| A02 | Adesão / pedido | N | N | M | Formulário, validação e reenvio |
| A03 | Adesão / acompanhamento | N | N | M | Recebido, informação adicional, aprovado |
| B01 | Identidade / login | P | FA | T | Vendedor entra; sessão expirada e retoma por papel |
| B02 | Identidade / recuperação e redefinição | N | N | — | Pedido, envio, token expirado e conclusão |
| B03 | Equipa / aceitar convite | N | N | M | Válido, expirado, revogado |
| B04 | Contexto / escolher loja | N | N | M | Zero, uma ou várias associações |
| B05 | Loja / primeiro uso | N | N | M | Configurar, criar, publicar, regressar |
| B06 | Identidade / minha conta | N | N | — | Perfil, alteração de senha, saída |
| C01 | Loja / resumo | P | F | T parcial | Vazio, dados, ligação a pendências, consistência dos indicadores |
| C02 | Produtos / catálogo | N | N | M | Fotografia, estado, pesquisa sem resultado |
| C02.a | Produtos / ficha | N | N | — | Produto activo, arquivado e ofertas associadas |
| C02.b | Produtos / criação reutilizável | N | N | M | Validação, fotografia indisponível, guardado |
| C02.c | Produtos / edição | N | N | — | Alteração, cancelamento, arquivo sem perder histórico |
| C03 | Checkouts / lista (01) | P | F | T parcial | Publicado, pausado, rascunho; cópia indisponível |
| C03.a | Checkouts / criar e publicar | P | FA | T | Editor existente junta produto e link; seleccionar produto |
| C03.b | Checkouts / editar publicado (02) | N | N | — | Guardar, descartar, pausar |
| C03.c | Checkouts / prévia editorial | P | F | — | Quantidade e entrega; conferir paridade com comprador |
| C04 | Encomendas / fila | P | FA | T | Pesquisa, filtros, responsável, fila vazia |
| C04.a | Encomendas / ficha (04) | P | FA | T | Estado guardado; chamada, tentativa e histórico propostos |
| C05 | Clientes / contactos | P | FA | T | Último pedido; telefone partilhado exige revisão |
| C05.a | Clientes / ficha e histórico | N | N | — | Recorrente, contacto ambíguo, sem histórico |
| C06 | Tarefas / fila e atribuição | N | N | M | Minha fila, equipa, reagendada, vencida |
| C07 | Entregas / expedição | N | N | M | Por atribuir, em curso, ocorrência |
| C07.a | Entregas / missão do estafeta | N | N | — | Atribuída, tentativa falhada, entregue |
| C08 | Cobranças / conferência | N | N | M | Previsto, declarado, confirmado e divergência |
| C09 | Equipa / membros e convites | N | N | M | Pendente, activo, revogado, último dono |
| C10 | Relatórios / movimento | N | N | M | Período, origem do indicador, sem dados |
| C11 | Loja / definições | N | N | M | Identidade, entrega, erro ao guardar |
| C12 | Actividade / histórico | N | N | M | Actor, data, objecto e filtro vazio |
| D01 | Comprador / checkout (03) | P | FA | T | Quantidade, formulário, erro de telefone e teclado |
| D02 | Comprador / confirmação (03b) | P | FA | T | Referência, valor e opção de cópia |
| D03 | Comprador / indisponibilidade | P | P | — | 404 genérico; diferenciar pausado e indisponível |
| D04 | Comprador / falha e repetição | P | P | — | Chave de submissão existe; provar duplo toque e retoma |
| E01 | Plataforma / resumo | N | N | M | Sem dados e volume agregado |
| E02 | Plataforma / adesões | N | N | M | Fila, detalhe e decisão |
| E03 | Plataforma / lojas | N | N | M | Activa, suspensa e reactivação motivada |
| E04 | Plataforma / utilizadores | N | N | — | Associação, bloqueio e pesquisa |
| E05 | Plataforma / telemetria | N | N | — | Dados disponíveis, atrasados, indisponíveis |
| E06 | Plataforma / auditoria | N | N | — | Evento, actor, motivo e âmbito |
