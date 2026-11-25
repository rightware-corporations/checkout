# ORDERX — arquitectura de produto para revisão

Estado: proposta. A branch contém uma prova técnica independente. Este documento orienta a revisão com o cliente antes de alterar a interface.

## Evidência
O vídeo demonstra um painel com seis secções, detalhe de encomenda, configuração de checkout e formulário público. As duas capturas HTML do editor Lovable documentam o mesmo projecto e a evolução da marca, autenticação e exportação. O histórico menciona verificações feitas por outro agente. Os anexos não permitem reproduzir essas verificações nem recuperar a aplicação completa. Manter dados de contas e ficheiros originais fora do repositório público.

## Mapa proposto
| Área | Rotas propostas | Responsabilidade |
|---|---|---|
| Identidade | /auth, /auth/registo, /auth/recuperar, /auth/nova-palavra-passe | Entrar, pedir conta e recuperar acesso. Registar conta e conceder acesso ao negócio são operações distintas. |
| Dashboard | /app | Ler indicadores de valor encomendado, volume e estados num período. |
| Produtos | /app/produtos, /app/produtos/novo, /app/produtos/[id] | Manter fotografia, nome, descrição e preço do catálogo. |
| Meus Checkouts | /app/checkouts, /app/checkouts/novo, /app/checkouts/[id] | Escolher produto, definir slug, quantidades, entrega, campos e estado de publicação. Pré-visualizar, publicar e copiar link. |
| Encomendas | /app/encomendas, /app/encomendas/[id] | Pesquisar, filtrar por data e estado, consultar contacto e morada e registar alteração de estado com histórico. |
| Relatórios | /app/relatorios | Consultar por período e exportar segundo filtros. Formatos e colunas a confirmar. |
| Definições | /app/definicoes | Manter dados da loja. A gestão de acessos depende de confirmar quem aprova operadores. |
| Comprador | /c/[slug], /recebido?ref=… | Encomendar sem conta e receber referência. Preservar compatibilidade com links existentes da prova. |

Os caminhos internos são convenções propostas. A referência documenta explicitamente /auth. A nomenclatura e o subtítulo em português vêm do histórico do cliente.

## Estrutura e regras
Aplicação Next.js, com navegação autenticada no painel e páginas públicas separadas. Catálogo, publicação, registo de encomendas e acompanhamento constituem módulos da mesma aplicação. SQLite permanece a base do piloto.

- Produto guarda a ficha reutilizável. Checkout referencia um produto e guarda a configuração comercial de um link. Permitir vários links para o mesmo produto é uma proposta a validar.
- Encomenda referencia o checkout e guarda fotografia dos valores comerciais no momento do pedido (nome do produto, preço, quantidade, entrega e total), dados de entrega e referência legível. O servidor calcula o total.
- Evento de estado guarda estado anterior, novo estado, operador e data. O histórico alimenta a página de detalhe.
- Conta, sessão e autorização de acesso ao painel são conceitos separados. Confirmar aprovação e recuperação antes da abertura ao público.
- Dashboard e relatórios consultam as mesmas encomendas e definições de período. Definir com o cliente como tratar cancelamentos nos totais.
- Preservar as referências e os links existentes em qualquer migração. Alterar ou desactivar um checkout deve preservar pedidos anteriores.

## Identidade e ecrãs para validação
Marca documentada: ORDERX, subtítulo SISTEMA DE GESTÃO DE ENCOMENDAS, símbolo X em azul e branco, navegação azul-escura com selecção azul. Desktop com menu lateral persistente, mobile com cabeçalho compacto. Checkout público centrado no produto e assinatura discreta Powered by ORDERX. Recuperar símbolos e cores originais quando houver ficheiros-fonte. A maquete anterior não constitui aprovação de identidade.

Primeiro desenhar um percurso coerente com dados fictícios: publicar a partir do catálogo, encomendar em telefone, abrir a mesma referência e mudar o estado no painel. Preparar vistas de lista vazia, pedido recebido, filtro sem resultados, link indisponível e confirmação. Rever as vistas antes de implementar o redesign.

## Prazo e questões
Primeira entrega candidata: acesso privado, produtos, links, checkout público, confirmação, lista e detalhe de encomendas. Definir até onde dashboard, relatórios, recuperação e exportação entram nas 48 horas. Permanecem abertas a quantidade de lojas e a necessidade de cobrança electrónica. O próximo material mais valioso é o ZIP de código ou o repositório do projecto original, sem segredos nem dados de clientes.
