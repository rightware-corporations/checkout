# ORDERX · Modelo funcional e briefing de design v0.1

Direcção de trabalho: suportar várias lojas independentes e equipas dentro de cada loja. A resposta do cliente, a marca definitiva, a política de cobrança e o modelo comercial continuam por validar. Documento para discussão, anterior ao desenho final.

## Estrutura
Uma loja é a fronteira comercial e de dados. A relação utilizador–loja atribui papéis e pode ser suspensa ou revogada. O operador escolhe a loja activa quando tem mais de uma; mudar de loja exige reavaliar as permissões. Um comprador pode comprar como convidado. A ficha de cliente pertence à loja. A plataforma gere a adesão e o estado das lojas.

## Operações propostas
| Registo | Criar e consultar | Alterar e encerrar | Regra observável |
|---|---|---|---|
| Loja | Superadmin activa adesão; dono consulta a sua | Dono altera dados comerciais; plataforma suspende ou reactiva com motivo | Suspensão impede novas encomendas e preserva histórico |
| Membro | Dono convida para loja e atribui papel | Alterar papel, revogar convite ou acesso | Proteger a última conta proprietária activa |
| Produto | Equipa de catálogo cria e consulta ficha | Edita e arquiva | Arquivar bloqueia novas vendas do produto e preserva pedidos |
| Checkout | Gestor cria rascunho por produto e canal | Pré-visualizar, publicar, pausar, reactivar | Vários links por produto; servidor revalida disponibilidade e total ao submeter |
| Cliente | Atendimento cria ficha ou associa pedido | Corrige contacto e trata possíveis duplicados | Telefone partilhado requer confirmação; exportar é permissão separada |
| Encomenda | Comprador submete; operador autorizado consulta | Confirmar, encaminhar ou cancelar com motivo | Referência por loja, submissão repetida gera um único pedido, valores comerciais preservados |
| Tarefa | Atendimento ou regra cria e atribui | Assumir, agendar, reatribuir, concluir | Associada à encomenda, com responsável e prazo próprios |
| Entrega e cobrança | Expedição atribui entrega; financeiro regista cobrança | Actualizar tentativa, entrega ou recebimento | Marcar entregue e confirmar dinheiro recebido são acções independentes |
| Relatórios | Gestor consulta métricas da loja por período/canal | Exporta com permissão | Separar visitas, encomendas, entregas e dinheiro recebido |
| Auditoria | Sistema acrescenta evento com actor, loja e momento | Leitura restrita por âmbito | Preservar intervenções administrativas e alterações de estado |

Dados principais: loja, utilizador, adesão à loja, produto, checkout, cliente, encomenda e linhas, tarefa, entrega, registo de cobrança, evento de auditoria. O detalhe da encomenda guarda os dados de entrega e preços usados naquele momento. Alterações ao catálogo ou ficha de cliente afectam operações futuras.

## Percurso e excepções
Uma gestora publica o creme de 999 MT. O mesmo produto tem um link com entrega gratuita e outro com entrega de 100 MT. Duas unidades pelo segundo link totalizam 2.098 MT. Um atendente assume a confirmação; se o cliente não atender, agenda nova tentativa e deixa rasto. O estafeta recebe a entrega atribuída. O financeiro reconcilia a cobrança se aplicável. Exemplos a rever no protótipo: link pausado durante o preenchimento, preço alterado antes do envio, duplo toque, acesso a pedido de outra loja, operador removido e filtro sem resultados.

## Navegação
- Público: /c/[slug], confirmação por referência opaca.
- Identidade: /auth e selecção de loja para quem tiver múltiplas adesões.
- Loja: /app com loja activa explícita; /app/produtos, /app/checkouts, /app/encomendas/[id], /app/clientes/[id], /app/tarefas, /app/equipa, /app/relatorios, /app/definicoes. Preservar contexto de loja em links internos partilháveis, por exemplo usando /lojas/[loja]/app como prefixo definitivo.
- Plataforma: /plataforma/lojas e /plataforma/auditoria. Vista de supervisão com acesso excepcional a dados operacionais justificado e registado.
- Autorizar no servidor cada operação sobre a loja e o registo. O estafeta consulta as entregas atribuídas. A mera posse de uma referência legível não permite consultar os dados pessoais do comprador.

## Prompt 1 · Google Stitch · após revisão funcional
Desenha duas direcções visuais comparáveis para ORDERX, nome de trabalho de um sistema de vendas por link em Moçambique. Usa o mesmo conteúdo e o mesmo ecrã em ambas: detalhe da encomenda ENC-1001 na Loja Demo, duas unidades de 999 MT, entrega de 100 MT, total de 2.098 MT, estado por confirmar e tarefa de contacto atribuída. Mostra loja activa, navegação da equipa, origem do link, acção principal, dados de entrega e histórico. Explora uma direcção coerente com o símbolo X e o azul-noite da referência do cliente, e uma segunda interpretação tipográfica. Para cada uma apresenta símbolo e assinatura, paleta com funções, tipografia, contraste, estados com texto, foco de teclado e aplicação a desktop e telemóvel. Usa apenas dados fictícios. Entrega pranchas de comparação. Depois de escolhida uma direcção, produzir DESIGN.md e estender o percurso a editor de checkout, comprador móvel, confirmação, clientes, tarefas e superadmin.

## Prompt 2 · Lovable · após aprovação visual
Usa as capturas aprovadas do Stitch, o DESIGN.md e esta especificação para produzir um protótipo navegável com dados fictícios. Mantém o produto, preço e referência coerentes no fluxo do vendedor e do comprador. Modela duas lojas, um gestor, um atendente, um estafeta e uma vista separada de superadmin. Apresenta a loja e o papel activos. Liga criação do checkout, compra móvel, detalhe da encomenda, ficha do cliente e tarefa de confirmação. Inclui estados vazio, erro, sem permissão e link pausado. Assinala operações simuladas no handoff. Entrega mapa de rotas, componentes, interacções, estados e pendências para integração no repositório rightware-corporations/checkout. A equipa RIGHTWARE assume persistência, autorização real, auditoria e testes.

## Handoff
Após cada decisão registar versão, decisões aprovadas, questões abertas, entradas e saídas. A prova de conceito de uma loja no PR #1 serve de referência de regressão para o total e a submissão sem e-mail. Próxima revisão de negócio: quem cria/aprova lojas, quem vê todos os clientes, quem cancela após confirmação e quem pode confirmar cobranças.
