# ORDERX · Ordem de execução

Branch de trabalho: feat/checkout-independente. O endereço de entrada da aplicação é /. O directório public/maqueta contém experiências anteriores com dados de demonstração.

| Ordem | Frente | Resultado a rever |
|---|---|---|
| 1 · Em curso | Frente comercial e operação de uma loja | Landing → login → publicar → checkouts → compra → confirmação → fila → ficha do pedido → clientes. Completar catálogo, editor e prévia antes da publicação. |
| 2 · Planeada | Identidade, equipa e contexto multi-loja | Adesão, convite, recuperação, conta, escolha da loja e primeiro uso com estados explícitos. |
| 3 · Planeada | Restantes áreas operacionais e plataforma | Tarefas, entregas, cobranças, relatórios, equipa, definições e actividade. Superadmin com adesões e lojas. |
| 4 · Revisão do frontend | Percursos por perfil | Rever desktop, tablet e telefone com dados representativos e estados vazio, erro, sucesso e acesso restrito. Registar o que usa dados simulados e obter avaliação visual da RIGHTWARE. |
| 5 · Backend multi-loja e integração | Autorização e persistência | Associar utilizadores, lojas e permissões, impor isolamento no servidor, integrar e testar cada percurso antes de abrir o piloto. |

O backend actual suporta vendas de um vendedor. Clientes é uma vista dos contactos recebidos, agrupados pelo telefone; pessoas que partilham o mesmo número aparecem no mesmo contacto.
