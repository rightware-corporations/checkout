# ORDERX · OX-COD-02.E-R1 — Parecer independente de aceitação
27/11/2026 · HEAD de entrada 334cbce319ae600ca0540452351a48216f2c8802 · código executado f93cab2bde031a482fe46c216502ec864c442204. Comparação GitHub: apenas handoff alterado desde execução.
## Evidência inspeccionada
Recuperados ambos ZIP da biblioteca. SHA-256 original 8c3f46ca63f2dfe76c6ff3d6452028da48def37fb1ab302db415b51bd40b03a4; R1 09bc1efe7883b6948b1cf9bd8885bc1ee2aafa0c4eec2b767f9f6f7937a0b19e. CRC sem erros em ambos, 19/19 e 20/20 hashes dos manifestos correspondentes, 18 PNG descodificados e nove pares comparados. Manifesto R1: TECHNICAL_PASS_VISUAL_REVIEW_PENDING; logs Node confirmam 5/5, sem falha ou skip; manifesto build e quatro suites exit 0 (duas aplicação, duas maqueta); produção 404 convidado/vendedor. r1-checks.json confirma três larguras, contraste campo 3,882674:1 e hero par de referência 5,862069:1, fila antes da lista, teclado e mudança de contexto. Não se reexecutou a aplicação nesta auditoria; comportamento interactivo sustentado pelos resultados do executor.
## Dimensões comparadas (largura fixa, alturas px)
| Ecrã | 390 anterior→R1 | 820 anterior→R1 | 1440 anterior→R1 |
|---|---|---|---|
| C01 | 4051→3897 | 2384→2542 | 2089→2033 |
| B04 | 2957→3229 | 1944→2102 | 2089→1593 |
| C04.a | 2238→2280 | 1409→1262 | 1313→1315 |
## Parecer por achado
- VIS-01: confirmado. Fila única antes da lista, tabela integral, insights equilibrados. Tablet cresce em altura devido à redistribuição, não é defeito impeditivo.
- VIS-02: confirmado. Tabela legível, legenda e estado revistos, canal/local agrupados sem ocultação dos dados.
- VIS-03: confirmado. Referência única dominante, produto/comprador distintos; total destacado no mobile e três métricas alinhadas em tablet/desktop.
- VIS-04: confirmado visualmente em mobile; selector em fluxo sem cobrir hero; teclado e mudança de loja confirmados nos resultados do executor. Overlay desktop/tablet mantido intencionalmente.
- VIS-05: confirmado. Indicador dev ausente nos nove PNG.
- VIS-06: confirmado nos pares testados, sem alegação de conformidade WCAG integral.
## Resíduos não impeditivos
Dashboard móvel ainda longo com seis pedidos; gestão futura de listas grandes, paginação e densidade devem ser tratadas nos módulos funcionais pertinentes, não nesta fundação. Tablet apresenta maior altura em C01/B04, mas distribuição mais legível. Nenhuma autorização real multi-loja, operação de stock ou conciliação criada pela revisão; são contextos de leitura simulados. Não confundir aceite visual de três vistas com aceite dos 48 ecrãs ou prontidão comercial.
## Recomendação e fronteira
VISUAL_ACCEPTANCE_RECOMMENDED — sem nova R2 necessária pelos achados avaliados. TECHNICAL_PASS de f93cab2 preservado. Aceitação formal depende de decisão explícita da RIGHTWARE. Até essa decisão, OX-COD-02 permanece pendente de aceite e OX-COD-03 NOT_STARTED. Não promover matriz nem iniciar fase 03 nesta passagem. Após aprovação, congelar esta fundação e proceder à reconciliação de cobertura e contrato de OX-COD-03 (catálogo→checkout→encomenda→atendimento), preservando as hipóteses COD e a operação existente.
