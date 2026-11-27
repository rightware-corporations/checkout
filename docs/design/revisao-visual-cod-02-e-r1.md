# ORDERX · OX-COD-02.E-R1
27/11/2026 · baseline 9ebc1e2ea787b9904506e39a0f41d1365c2f92db. Operador aprovou execução VIS-01–06; aceite final pendente. IDs canónicos do relatório revisao-visual-cod-02-e.md.
| Achado | Implementação candidata |
|---|---|
| VIS-01 | Fila única antes da tabela no DOM e ecrã; desktop atenção compacta, tabela integral, insights em linha inferior; tablet duas colunas e terceiro painel em largura integral; mobile uma coluna. |
| VIS-02 | Referência e montante 14px; legendas e estados 12px; canal/local agrupados em mobile; campos mantidos. |
| VIS-03 | Referência única h1; identidade destaca produto/comprador; métricas três em desktop/tablet, total integral + duas secundárias no mobile. |
| VIS-04 | Selector nativo em fluxo no telefone, sem sobreposição; grupos nomeados, links com nomes explícitos; teste abertura/fecho teclado e mudança real de loja. |
| VIS-05 | next.config.mjs devIndicators:false; não desactiva overlay de erros. |
| VIS-06 | Contorno #718399 (primeira hipótese #8294A8 falhou sobre canvas); hero #E1EEFF. Contraste estático: branco 3.88:1, canvas 3.58:1, extremo claro hero 5.86:1. |
Node --test executado em Node v22.16.0: 5/5 PASS, modelo e teste com hashes Git 086c95c51d213244633c209c1f6ce1309678be84 e 484080f448f3ec5082b1b306919fb4d1de6d3807 (iguais no HEAD). Browser reforçado para ordem, tamanhos, contraste computado e par teórico hero, referência única, composição móvel, teclado, overflow e mudança de loja. Build/browser R1 NOT_RUN, ambiente Node 22 e DNS GitHub indisponível. Preservar PASS histórico 19e1155, não transferir para R1. Repetir tests/run_cod02_gate.py em clone dedicado Node 24, rever nove PNG reais e r1-checks.json. Modelo, regras, persistência, sessão, checkout, tokens e dados intactos. 03 bloqueada.
