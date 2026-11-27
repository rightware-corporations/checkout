# OX-ALIGN-001 · Plano director da ORDERX

Proposta para aprovação RIGHTWARE, 27 de Novembro de 2026. A unidade de trabalho passa a ser o pacote com critérios de saída. [Matriz de interfaces e estados](cobertura.md) · [arquitectura de produto](arquitectura-orderx.md) · [planta e jornadas](planta-e-prompt-mestre-stitch-v02.md) · [kit visual](../design/DESIGN.md).

## Estado e decisões

Em rightware-corporations/checkout, o inventário remoto mostrou main em c6bbb8a e feat/checkout-independente em bef16d6. A segunda é a linha activa. dc7b9d3 introduziu o website e painel operacional; 6c48fad ligou clientes e pedidos; b14c361 acrescentou a prévia; 0c8df40 e bef16d6 alargaram a demonstração pública. As evidências anteriores encontram-se em docs/handoffs/02–10. Esta missão altera documentação.

A ORDERX permite à loja moçambicana publicar ofertas por link, receber morada e contacto e acompanhar cada pedido. O núcleo comercial observado é vendedor → oferta → comprador convidado → pedido → tratamento. A direcção aprovada é concluir a experiência visual do produto usando a stack actual. Multi-loja e plataforma fazem parte do desenho pedido. Adesão assistida, separação de estafeta e financeiro, pagamentos electrónicos, exportações, telemetria e respectivos compromissos comerciais precisam de confirmação. WhatsApp é um canal onde a pessoa pode partilhar um link. Integração com a API do WhatsApp, envio de emails e processamento bancário carecem de implementação e decisão.

**Arquitectura observada.** Node 24, Next App Router e React compõem páginas de entrada, comprador e gestão; src/frontend contém estilos, shell e controlos; src/backend contém acções de identidade, publicação, encomendas e persistência SQLite. links agrega a ficha comercial e a configuração do checkout. orders guarda a referência e os valores da encomenda. sessions guarda o resumo criptográfico do token e validade. Existe autenticação do vendedor no servidor. Falta representação de utilizador, associação à loja e permissão por registo. A lista de clientes agrupa números de telefone. Não prova identidade de pessoas diferentes. Não foram inspeccionados dados de clientes em produção.

**Dívida prioritária.** A aplicação tem oito ficheiros de página; login e resumo partilham /gestao. O frontend público em public/maqueta implementa outra navegação, dados JS, armazenamento local e mudança simulada de papel. Reutilizar o conhecimento dos percursos, o kit Manrope, formulários, referência de encomenda e regressões. Os testes da maqueta exercitam esta segunda implementação. As suas permissões aparentes e ecrãs não contam na cobertura da aplicação.

**Âmbitos propostos.** Visitante pede adesão; comprador acede à oferta publicada e confirmação da sua compra. Dono gere catálogo, equipa e loja activa. Gestora publica e acompanha vendas. Atendimento consulta e trata pedidos atribuídos e tarefas. Estafeta vê apenas entregas atribuídas. Financeiro reconcilia valores da loja. Superadmin gere adesões e estado das lojas; acesso excepcional a informação comercial exige decisão específica e registo. Cada acção privada futura verifica associação, permissão e objecto no servidor. Hoje só há um vendedor operacional.

## Programa e dependências

Cada linha é um pacote OX-FE. Os IDs e estados iniciais de cada interface estão na matriz. A coluna de saída especifica o entregável e o ensaio necessário. A aprovação deste plano autoriza iniciar W01. Transferir um pacote para concluído exige evidência de todos os critérios aplicáveis.

| Pacote / milestone | Depende de | Objectivo, entrega e ensaio de saída |
|---|---|---|
| W01 · Fundação | Aprovação | Shell privada, navegação por contexto, componentes de estado e adaptador de dados de revisão. Abrir a mesma referência em resumo e ficha numa base de desenvolvimento; verificar sessão privada e ausência de acesso público aos dados. |
| W02 · Operação / resumo C01 | W01 | Mostrar pendências por loja e ligação aos pedidos; confrontar indicadores com o conjunto de dados e loja vazia. |
| W03 · Catálogo C02 | W01 | Lista, ficha, criação e edição; percorrer produto com fotografia, falha de imagem e arquivo. |
| W04 · Publicação C03 | W03 | Escolher produto, criar oferta, editar, pré-visualizar e publicar; comparar totais e verificar que a prévia não cria encomenda. |
| W11 · Comprador D01–04 | W04 | Checkout móvel, recibo, indisponibilidade e recuperação; verificar uma e duas unidades, reenvio e ausência de dados pessoais na URL. |
| W05 · Encomendas C04 | W02,W11 | Fila e ficha com estado e responsável; seguir uma venda até confirmação, falha de contacto e reagendamento. |
| W06 · Clientes C05 | W05 | Ficha, contactos e histórico; verificar cliente recorrente e números partilhados. |
| W07 · Expedição e cobranças C07–08 | W05, confirmação do âmbito | Expedição, atribuição, tentativa e conferência; simular entrega concluída com valor ainda por receber. |
| W08 · Relatórios e actividade C10,C12 | W05,W07 | Indicadores rastreáveis e histórico por período; reconciliar totais com os pedidos e distinguir ausência de dados de zero. |
| W12 · Entrada, conta e contexto A01–03,B01–06,C11 | W01 | Adesão, convite, autenticação, recuperação, selecção, primeiro uso e definições; rever convite expirado e pessoa com zero, uma e duas lojas. Pode iniciar após W01. |
| W09 · Equipa e atendimento C06,C09 | W05,W12 | Fila pessoal, atribuição e permissões representadas; comparar dono e Atendimento, rever convite revogado. |
| W10 · Plataforma E01–06 | W12, confirmação do âmbito | Adesões, lojas e administração visualmente distintas; rever suspensão, pedido de esclarecimento e acesso restrito. |
| W13 · Consolidação | Pacotes em âmbito | Navegar pelas jornadas de ponta a ponta com tokens comuns; resolver inconsistências de densidade, linguagem e estados. |
| W14 · Aceitação | W13 | Build e regressões, teclado, três larguras e revisão RIGHTWARE por ID. Documentar exclusões aprovadas e falhas em aberto. |

Milestones: fundação aceite → primeira venda completa → operação e governação percorríveis → frontend revisto → integração e piloto. Para o piloto comercial, acordar âmbito, pagamentos e papéis com o cliente; validar armazenamento persistente, HTTPS, recuperação de cópia de segurança, protecção de sessões e contactos, isolamento entre lojas quando aplicável e jornadas com contas independentes.

## Contrato visual e dados

Preservar a assinatura ORDERX, Manrope, navegação #10263E, acção #2155D6 e destaque #77A7FF em fundo escuro. Consolidar espaçamento numa escala proposta de 4/8/12/16/24/32 px. Usar título de página, contexto da loja e uma acção principal por tarefa. Sidebar persistente em desktop, compacta em tablet e acessível por controlo de navegação no telefone. Tabelas privilegiam referência, responsável e estado; no telefone os campos secundários passam à ficha. Cards de indicador ligam ao conjunto que explica o valor. Cada gráfico deve ter unidade, período e alternativa textual. Pesquisa e filtros preservam contexto ao regressar. Fotografias têm proporção estável, texto alternativo e substituição em caso de falha. Reservar drawer para consulta breve e modal para confirmação que bloqueia a acção; gerir foco, Escape e retorno ao controlo original. Erros junto ao campo, feedback de gravação, carregamento, lista vazia e ausência de resultados são estados distintos. Estados usam texto e cor. Verificar teclado, foco visível, contraste, ampliação, movimento reduzido e espaço para toque. Validar 390, 820 e 1440 px com conteúdo curto e longo.

W01 deve entregar conjunto versionado e reproduzível de dados sintéticos para ambiente isolado. Contrato por ID: loja → associação → produto → checkout → encomenda → cliente/tarefa/entrega/cobrança/evento. Uma oferta guarda preço e taxa, uma encomenda fixa os valores na submissão. Fonte única de valores para dashboard, cliente e relatórios. Amora representa operação activa; Casa Nala o primeiro uso. Duas unidades de 999 MT e taxa de 100 MT totalizam 2.098 MT. Preservar links antigos; introduzir adaptador de leitura e seed idempotente explícito, desactivado em produção. Onde o domínio ainda não existir, dados sintéticos passam pelos mesmos componentes e contratos de leitura. Entrada privada continua a exigir sessão. Bloquear acesso por loja antes de persistir dados comerciais multi-loja.

## Medição e passagem de trabalho

40 destinos propostos, incluindo variantes D03/D04 e subinterfaces de gestão. 13 em desenvolvimento visual e 27 por iniciar. 0/40 com aceitação visual integral documentada. Funcionalmente, sete percursos principais do vendedor único/comprador exercitados, três implementados sem aceitação integral, três parciais e 27 por iniciar. 7/40 mede cobertura de acções principais na baseline proposta; não mede percentagem de esforço nem certificação comercial. Os totais dependem da aprovação do inventário.

Registar em cada handoff baseline, pacote e IDs, critérios satisfeitos, testes com resultado observado, defeitos, alterações de decisão e próxima dependência. Para promover a VISUALLY_VALIDATED, exigir estados previstos, acções navegáveis, três larguras, verificação de acessibilidade e aceite visual identificado. Para FUNCTIONALLY_VALIDATED, executar a acção com persistência e verificar resultado e âmbito. INTEGRATED exige também atravessar a fronteira com o módulo dependente. O próximo agente começa por W01 após decisão da RIGHTWARE; o aceite do desenho de cada ecrã é independente da sua futura integração.

### Handoff OX-ALIGN-001 · 27/11/2026

Em bef16d6, npm run build passou. Em Chromium com SQLite temporária, tests/checkout_browser.py passou desde a entrada pública até à alteração persistente do estado, com checkout a 390 px, total 2.098 MT e bloqueio do painel no contexto convidado. tests/maqueta_browser.py e tests/primeiro_link_browser.py passaram a 390, 820 e 1440 px nos cenários fictícios. Estes resultados não certificam todas as variantes privadas, a acessibilidade ou o isolamento multi-loja. Aprovação pendente do programa, das fronteiras do piloto e do início de W01.
