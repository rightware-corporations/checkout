# ORDERX · Planta de experiência e prompt mestre v0.2

**Estado:** proposta de arquitectura e de navegação para revisão. Kit de marca v0.1 aprovado pela RIGHTWARE para esta ronda. O texto de Ronda 1 do operador é a especificação detalhada das cinco pranchas. Este documento acrescenta o mapa global e resolve ambiguidades de percurso. Nenhuma alteração de código. Nomes de rotas são contratos propostos.

## Prompt mestre para colar no Stitch

Actua como designer de produto responsável por uma maqueta navegável da ORDERX, sistema moçambicano de vendas por link. Desenha como se cada pessoa tivesse acabado de abrir um endereço real no seu próprio dispositivo. Usa português de Moçambique, dados fictícios, o DESIGN.md, os tokens e os activos do kit aprovado. Reutiliza o X fornecido, Manrope, navegação #10263E, acção #2155D6 e realce escuro de contexto (realce #77A7FF sobre fundo escuro). Usa o símbolo e as assinaturas do kit nos fundos indicados. A presença de ORDERX é forte no produto de gestão e discreta na compra. A ficha da loja, o catálogo e os dados operacionais pertencem à loja activa.

### Primeiro entrega o índice da maqueta
Para cada entrada do inventário, identifica actor, origem, condição de acesso, objectivo, acção principal, destino e pelo menos uma excepção. Marca operações simuladas e decisões por validar. Entrega mapa de ligações e frames de baixa fidelidade apenas para as entradas públicas, acesso e primeiro uso. Espera revisão antes da alta fidelidade. As rotas abaixo são propostas, nunca URLs a publicar. Para exemplos usa orderx.example.

| Área e entrada | Primeira experiência | Acção e destino | Excepção ou limite |
|---|---|---|---|
| Visitante / | Página de apresentação do produto ORDERX para comerciantes. Mostrar como uma publicação se torna encomenda acompanhada, com uma amostra de produto, checkout e fila de trabalho. | “Pedir acesso” → /adesao; “Entrar” → /auth. | Adesão assistida é hipótese. Sem preços, depoimentos, estatísticas ou anúncios de funcionalidades por aprovar. |
| Comerciante /adesao | Identificar negócio e contacto para adesão. | Enviar pedido, ver recepção e próximo passo. | Pedido pendente não dá acesso a dados de loja. |
| Colaborador /convite/[token] | Nome da loja e papel oferecido. | Aceitar após identificação e entrar na loja autorizada. | Convite expirado ou revogado mostra recuperação. |
| Utilizador /auth, /auth/recuperar | Login, recuperação e confirmação. | Retomar rota interna autorizada. Uma loja abre directamente; várias abrem /seleccionar-loja; zero mostra situação do acesso. | Tratar sessão expirada e ligação inválida. |
| Dono /app/[loja]/inicio | Loja recém-activada com equipa e catálogo vazios. | Configurar loja → primeiro produto → primeiro checkout → copiar link. Utilizador recorrente vê pendências do papel. | Mostrar próxima acção real em cada estado vazio. |
| Gestora /app/[loja]/produtos | Lista, ficha, criação e edição. | Guardar produto, criar oferta, arquivar produto com confirmação. | Alterações futuras preservam os valores dos pedidos recebidos. |
| Gestora /app/[loja]/checkouts | Lista, criação e editor. Produto associado, canal, campos, taxa e publicação. | Rascunho → prévia → publicar → copiar link. No publicado, editar → guardar ou pausar. | Rascunho sem link activo; alteração por guardar visível. |
| Compradora /c/[slug] | Abrir o anúncio directamente no checkout da Amora Cosméticos. Ver produto, quantidade, entrega e total antes dos dados pessoais. | Encomendar como convidada → confirmação com referência ENC-1001. | Link pausado, validação, preço alterado, reenvio. Prévia editorial é identificada e não cria pedidos. |
| Atendimento /app/[loja]/encomendas | Fila de pedidos, pesquisa, filtros e responsável. | Abrir ENC-1001, assumir, confirmar ou agendar tentativa, ver histórico. | Pedido de outra loja bloqueado. Agendar chamada não confirma encomenda. |
| Atendimento /app/[loja]/clientes e /tarefas no mesmo âmbito | Ficha de cliente com pedidos da loja; fila de tarefas com responsável e prazo. | Consultar histórico, corrigir contacto autorizado, reagendar, concluir. | Telefone partilhado exige revisão antes de unir fichas; exportação tem permissão própria. |
| Estafeta /app/[loja]/entregas | Apenas entregas atribuídas; primeira vista móvel. | Abrir destino → registar tentativa, entrega concluída ou ocorrência. | Estado de entrega separado do recebimento financeiro. |
| Financeiro /app/[loja]/cobrancas | Montante previsto, declarado e confirmado. | Conciliar uma cobrança e registar responsável. | Método e integração financeira pendentes; usar simulação declarada. |
| Dono /app/[loja]/equipa e /definicoes | Membros, convites, papéis e regras da loja. | Convidar, alterar função, revogar e auditar. | Preservar última conta proprietária; revogação invalida acções pendentes. |
| Gestora autorizada /app/[loja]/relatorios | Visitas por link, encomendas, confirmações, entregas e recebimentos com período. | Filtrar por canal e consultar origem do indicador. | Estado sem dados diferente de zero vendas; exportação requer direito próprio. |
| Superadmin /plataforma/lojas e /plataforma/auditoria | Identidade da plataforma, adesões, estado das lojas e eventos operacionais. | Rever adesão, activar, suspender com motivo ou investigar incidente. | Ver métricas da plataforma não concede leitura comum de contactos das lojas. Acesso excepcional é explícito, restrito e registado. |

A arquitectura admite acumulação de funções dentro da loja. Para cada acção identifica loja, papel, registo e relação: o gestor publica na sua loja; o estafeta só abre a entrega atribuída. Uma conta com duas lojas muda de contexto explicitamente. Esconder acções no desenho representa permissões; a implementação futura valida cada pedido no servidor.

### Narrativa e dados de continuidade
Marta gere Amora Cosméticos; Sara faz atendimento. Creme Anti-Manchas custa 999,00 MT. Facebook · Maputo tem entrega de 100,00 MT; WhatsApp · Recolha na loja tem entrega de 0,00 MT; Instagram · Matola está em rascunho. Com duas unidades pelo Facebook: subtotal 1.998,00 MT, entrega 100,00 MT, total encomendado 2.098,00 MT. Fixar 26/11/2026 e fuso de Maputo na demonstração. Estados iniciais de ENC-1001: Por confirmar / Não iniciada / Por receber. Usar telefone fictício mascarado nas pranchas. Ao simular chamada por operador autorizado, mostrar a acção “Ligar” com resultado simulado. Não expor contactos reais. A cliente comercial da ORDERX é a loja; a compradora é cliente dessa loja.

### Sequência de desenho após aprovação da planta
1. Entrada e activação. Landing desktop e móvel, adesão pendente, acesso e primeiro uso. Aprovar promessa comercial e destino dos botões.
2. Venda central. Aplicar o prompt detalhado do operador às cinco pranchas identificadas 01, 02, 03, 03b, 04. Preservar lista, editor, checkout, sucesso e detalhe. Para demonstrar compra, sair da prévia e abrir link publicado como compradora. Abrir o detalhe como Sara pela fila em sessão própria. Mudança de papel apenas no índice externo da maqueta.
3. Operação diária. Clientes, tarefas, entregas e cobrança, incluindo cliente recorrente, chamada sem resposta e tentativa de entrega falhada. Desenhar a vista móvel do estafeta e o último passo em que a entrega termina mas o valor continua por receber.
4. Governação. Equipa, permissões, loja suspensa, relatórios e Superadmin. Simular utilizador em duas lojas e um acesso negado. Registar onde as regras de negócio ainda dependem do cliente.

### Contrato visual e aceitação
Para cada lote entregar frames nomeados, entradas e saídas clicáveis, componentes reutilizados e nota curta de pressupostos. Usar os critérios do prompt da Ronda 1 para moeda, foco, contraste, alvos de toque, formulários e textos. Quando houver limitação da ferramenta, identificar “anotado”, “clicável” ou “verificado”. Um activo visual em falta bloqueia a fidelidade desse activo; continuar o mapa funcional. A fotografia de produto pode usar placeholder rotulado conforme a referência.

Verificar cinco jornadas independentes: visitante pede acesso; colaborador aceita convite; comprador abre anúncio e encomenda sem autenticação; operador assume e acompanha a mesma referência; superadmin trata incidente com âmbito autorizado. Verificar que copiar o link publicado abre uma sessão pública limpa e que mudar de loja não transporta clientes, relatórios ou filtros privados de outra loja. Guardar revisão com ecrãs aprovados, lacunas e alterações antes da passagem para implementação.

## Notas da RIGHTWARE
O prompt original é mais forte na direcção das pranchas, dados canónicos, estados e critérios de aceitação. Manter esse detalhe como caderno da venda central. O mapa aqui proposto introduz página comercial e adesão assistida como hipóteses. Validar se o piloto é apenas por convite, quem aprova a loja e se a confirmação pode ser reaberta pelo comprador. A página comercial da ORDERX pode identificar a RIGHTWARE como entidade responsável após aprovação editorial. O sítio corporativo da RIGHTWARE tem público e objectivo próprios.

## Referências de método
- Guia de prompts do Stitch no Google AI Developers Forum: https://discuss.ai.google.dev/t/stitch-prompt-guide/83844/2
- Google Labs sobre protótipos e ligações entre ecrãs: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-gemini-3/
- Google Labs sobre DESIGN.md: https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
