# Fundação do repositório · 26/11/2026

Base remota d262b21, branch feat/checkout-independente, PR #1. O mapa de responsabilidades está no README da raiz.

Rotas e composição ficam em src/app. Componentes de navegador e folhas de estilo ficam em src/frontend. Acções e persistência ficam em src/backend e a função pura de formatação monetária fica em src/shared. O backend executa no servidor Next.js. A raiz continua a ser o directório de execução; os caminhos de configuração e da base SQLite são os mesmos. A marca v0.1 inclui quatro SVG, Manrope e respectiva licença, tokens e instruções de design.

## Validação

- npm ci e npm run build concluídos com Node 24.22.3. Rotas de aplicação geradas: /, /gestao, /c/[slug], /recebido.
- Servidor de produção local: fonte em /brand/fontes/Manrope.ttf comparada byte a byte com a fonte do kit.
- tests/checkout_browser.py passou em Chromium com comprador em viewport 390 × 844. Produto publicado, compra convidada de 2.098 MT, confirmação, releitura no painel, mudança de estado persistida e acesso privado verificados com base temporária.
- O ensaio cobre o piloto de um vendedor. A maqueta multi-loja, o RBAC e os novos módulos continuam no inventário de produto.
