# ORDERX · Prompt mestre de execução COD

## Mandato para o agente GPT

Actua como responsável de engenharia de produto da RIGHTWARE. Abre rightware-corporations/checkout na branch feat/checkout-independente. Começa pela missão OX-COD-01 descrita abaixo. Executa o pacote até à sua saída verificável e deixa o trabalho retomável no GitHub. A entrega solicitada é a experiência completa de uma plataforma moçambicana de vendas de bens físicos com pagamento na entrega. A UCODEfy é a referência de operação indicada pelo cliente. A identidade, os textos, os componentes, o código e as decisões de experiência pertencem à ORDERX.

A prioridade é concluir o frontend real por jornadas e perfis. Usa a funcionalidade operacional existente e dados sintéticos controlados para as partes por integrar. Representa visualmente planos, preços exemplificativos e estados de subscrição. A cobrança efectiva, os preços comerciais, a regra de baixa de stock e as integrações externas requerem decisão antes da automatização. A direcção COD já está estabelecida.

## Arranque e autoridade

1. Confirma origin, branch, HEAD remoto, trabalho local pendente e instruções do repositório. Lê o handoff mais recente, incluindo qualquer sucessor indicado em docs/handoffs/11-descoberta-cod.md. Consulta docs/produto/cobertura.md, ordem-de-execucao.md, arquitectura-orderx.md, planta-e-prompt-mestre-stitch-v02.md e docs/design/DESIGN.md. Se outra missão avançou desde a publicação deste prompt, retoma a primeira dependência em aberto.
2. Usa o último handoff e as decisões explícitas da RIGHTWARE para resolver conflitos. O inventário antigo de 40 destinos é baseline histórica. Preserva IDs ao adaptar e regista inclusões, fusões e adiamentos. Distingue decisão, evidência observada, hipótese de desenho e regra pendente.
3. Trabalha na branch existente. Preserva alterações de outros agentes, links publicados, referências antigas e dados existentes. Usa commits pequenos por entrega verificável. Se o remoto avançar, inspecciona e reconcilia antes de escrever. Credenciais, contactos reais e capturas privadas ficam fora do repositório.
4. O agente GPT conduz a continuidade do programa. A RIGHTWARE reserva também o Work para tarefas complexas, por exemplo arquitectura transversal, migração com preservação de dados, integração entre módulos ou regressões de ponta a ponta. Um handoff entre agentes identifica pacote, baseline, ficheiros, dependências e saída esperada. Mantém um responsável por alteração sobreposta.

## Arquitectura e fronteiras

Inspecciona o estado efectivo antes de editar. A base auditada usa Node 24, Next App Router, React e SQLite. src/app compõe rotas; src/frontend aloja componentes e estilos; src/backend separa identidade, publicação, encomendas e persistência; src/shared contém lógica pura, incluindo dinheiro; public/brand e docs/design contêm marca, Manrope e tokens. public/maqueta é referência de experiência. Mantém o desenvolvimento corrente nos componentes da aplicação. Computador, tablet e telefone partilham a aplicação web responsiva.

Percurso de escrita: formulário → acção de servidor → verificação de sessão, âmbito e dados → operação consistente → resposta de sucesso ou erro recuperável. Percurso de leitura: consulta limitada ao âmbito → modelo de apresentação → componente → estado alternativo. Preserva o acesso convidado ao checkout publicado e a autenticação do vendedor. Um selector de perfil não concede privilégios. Usa fixtures isoladas da produção quando um perfil ainda carecer de backend.

Modelo alvo: loja → associação de utilizador e função; loja → produto → oferta publicada → encomenda com fotografia dos valores comerciais; encomenda → tarefas, entregas, movimentos de stock, recebimentos e eventos. Cliente e encomenda conservam relação explícita; telefone partilhado pede revisão. Totais em centavos inteiros de MT. Distingue saldo físico, reservado e disponível. Distingue montante encomendado, entregue, por receber e recebido. Deriva indicadores dos mesmos registos. Uma repetição de submissão, entrega ou recebimento deve produzir um único efeito. Mantém relações e valores históricos após alteração da oferta. Esta arquitectura é alvo de integração; implementa persistência por pacote quando chegar a sua fase.

## CRUD e responsabilidade

Usa a tabela para desenhar formulários, listas, fichas, transições e permissões. Estados financeiros e operacionais críticos exigem acção explícita e histórico. As regras abaixo orientam desenho e testes com dados fictícios.

| Recurso | Criar e consultar | Alterar, retirar ou corrigir | Actor e critério |
|---|---|---|---|
| Produto | Criar ficha com fotografia, descrição, preço e stock inicial; listar e abrir ficha | Editar, duplicar, arquivar, reactivar | Dono/gestora da loja; arquivo preserva vendas |
| Oferta e checkout | Seleccionar produto, configurar título, slug, quantidade, províncias, taxas e mensagem; pré-visualizar | Guardar rascunho, publicar, editar, pausar, copiar link | Gestora; prévia editorial isolada. Mostrar preço final antes da submissão |
| Pedido e contacto | Comprador envia; atendimento consulta fila, pesquisa, filtra e abre ficha | Confirmar, agendar contacto ou cancelar com motivo; corrigir contacto autorizado | Loja activa; exibir referência, responsável, hora e histórico |
| Cliente e tarefa | Consultar histórico; criar tarefa associada a pedido | Corrigir ficha, atribuir, reagendar, concluir | Operação da loja; validar contacto ambíguo e tarefa vencida |
| Entrega | Criar expedição e atribuir estafeta; consultar fila e missão móvel | Registar tentativa, reagendar, entregar ou devolver | Gestor atribui; estafeta vê apenas missões atribuídas |
| Stock | Consultar disponibilidade e histórico por produto; criar movimento autorizado | Compensar movimento errado com motivo e referência | Gestor de stock; lançamento rastreável e sem dupla baixa |
| Cobrança COD | Declarar valor recebido ou pendente; consultar por pedido | Conferir, conciliar divergência ou lançar correcção | Estafeta declara, financeiro confirma. Entrega concluída pode ficar por conciliar |
| Notificação e relatório | Gerar aviso por evento, consultar feed e indicadores por período/produto | Marcar lida, ajustar filtros e preferências | Destinatário autorizado; testar zero e ausência de dados |
| Equipa, loja e conta | Convidar, aceitar, escolher loja, consultar perfil e membros | Editar perfil, recuperar acesso, mudar papel, revogar, suspender | Dono gere associações; preservar último dono e isolamento da loja |
| Planos e plataforma | Consultar limites, consumo e histórico; rever adesões e lojas | Simular escolha de plano; decisão administrativa com motivo | Comerciante vê a sua conta; Superadmin governa plataforma e audita acções |
| Suporte | Abrir ajuda contextual e consultar canais disponíveis | Actualizar conteúdo/canal segundo a operação adoptada | Sistema de tickets é proposta até haver requisito |

## Sequência e critérios de saída

| Missão | Dependência | Entrega e prova de conclusão |
|---|---|---|
| OX-COD-01 · Reconciliação | Handoff de descoberta | Actualiza a matriz de cobertura e publica mapa de jornadas conforme instruções seguintes. |
| OX-COD-02 · Fundação visual | 01 | Shell privada, contexto de loja, navegação por papel, componentes e fonte sintética única. Abrir a mesma referência no resumo e na ficha; comprovar que o público não lê dados da loja. |
| OX-COD-03 · Venda | 02 | Catálogo → ficha → oferta/checkout → publicação → compra → confirmação → fila de atendimento. Demonstrar produto activo e arquivado, rascunho e publicado, província indisponível, erro e reenvio. |
| OX-COD-04 · Operação | 03 | Entrega, inventário, cobrança, notificações, clientes e relatórios percorrem os três desfechos. Conferir quantidades e montantes contra os eventos do pedido. |
| OX-COD-05 · Conta e plataforma | 02 e contratos de 03–04 | Adesão, convite, primeiro uso, escolha de loja, equipa, configurações, planos, suporte e Superadmin. Mostrar estados vazios, restritos e recuperação de acesso. |
| OX-COD-06 · Aceitação visual | 02–05 | Revisão integral das jornadas em 390, 820 e 1440 px; registar evidência por ID e decisão visual RIGHTWARE. |
| OX-COD-07 · Integração e piloto | Aceitação da fase visual e regras operacionais decididas | Persistência, autorização no servidor, validação de isolamento, regressão e recuperação de dados. Activar integrações e cobranças apenas no âmbito autorizado. |

### Executa agora OX-COD-01

Reconciliar, linha por linha, o inventário anterior com a evidência de descoberta. Usar manter/adaptar/adicionar/adiar, actor, entrada, saída, origem de dados, estados alternativos, dependência e pacote. Acrescentar destinos de stock, notificações, planos e suporte; indicar funcionalidades não observadas no perfil produtor. Publicar denominador revisto e explicar a variação. Manter estado visual e funcional em colunas independentes; identificar teste, data e commit ou NOT_RUN.

Descrever uma venda fictícia de 2 × 999 MT + 100 MT = 2.098 MT em três cenários independentes com o mesmo saldo inicial explícito. Para cada passo registar actor, ecrã/ID, evento, estado do pedido, entrega e cobrança, stock físico/reservado/disponível e valor por receber/recebido. Incluir sucesso, falha com nova tentativa e cancelamento. Indicar o momento assumido para reservar, dar baixa e libertar; impedir que devolução ou retentativa duplique movimentos. Verificar a aritmética em cada transição. Ligar as lacunas ao pacote que as resolve. Entregar no repositório matriz, jornadas, decisões e handoff. O primeiro output substantivo deve trazer execução verificada deste pacote ou bloqueio concreto.

## Contrato de qualidade e continuidade

Usa português de Moçambique, identidade ORDERX e dados representativos coerentes entre painéis. Rever foco, teclado, contraste, etiquetas, fotografias, navegação de retorno, estados vazio/carregamento/erro/sucesso/acesso restrito. Ao mudar código, executar build e testes relevantes, incluindo os existentes de checkout e maqueta conforme a fronteira alterada. Registar separadamente ensaio com fixture, persistência operacional e aprovação visual. Seguir a legenda da matriz, com os estados NOT_STARTED, IN_PROGRESS, VISUALLY_IMPLEMENTED, VISUALLY_VALIDATED, FUNCTIONALLY_IMPLEMENTED, FUNCTIONALLY_VALIDATED, INTEGRATED e BLOCKED.

A cada resposta de trabalho, actualizar o handoff no GitHub com data, missão, baseline, decisões e hipóteses, entregáveis e links, testes e resultados, pendências, próxima dependência e responsável. Se o GitHub estiver indisponível, declarar a gravação pendente e reconciliar na primeira oportunidade. O handoff actual aponta para o sucessor. Antes de encerrar um pacote, verificar o critério da tabela e actualizar a matriz. Avançar autonomamente dentro da direcção estabelecida; escalar apenas decisão de âmbito, regra crítica para integração, acção irreversível ou bloqueio concreto.

## Continuidade actual · 27/11/2026
OX-COD-01 concluída; OX-COD-02 oficialmente aceite e encerrada. Retomar [handoff 13](../handoffs/13-percurso-comercial-cod.md), 03.B após 03.A documental. O comando histórico «Executa agora OX-COD-01» não é nova ordem de execução. [Contrato de venda](contrato-venda-cod-03.md).
