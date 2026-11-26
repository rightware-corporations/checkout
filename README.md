# Checkout

Aplicação independente em Next.js e SQLite para uma loja publicar links de encomenda e receber pedidos em meticais.

## Executar localmente

Com Node.js 24, executar `npm ci`, copiar `.env.example` para `.env.local` e definir `SELLER_PASSWORD` com pelo menos 12 caracteres. Executar `npm run dev` e abrir `http://localhost:3000/gestao`.

O vendedor publica um produto e copia o link. O comprador abre o link, escolhe a quantidade e introduz os dados de entrega. O servidor calcula e guarda o preço por unidade, a entrega e o total. A referência aparece na confirmação e no painel do vendedor.

## Operação

`npm run build` gera a versão de produção e `npm start` inicia o servidor. A sessão do vendedor usa cookie seguro em produção. Servir por HTTPS e guardar o ficheiro definido em `CHECKOUT_DB` num volume persistente. Esta versão pressupõe um servidor e um vendedor. Valores representam encomendas registadas; a cobrança electrónica é uma decisão em aberto.

## Organização do repositório

| Directório | Responsabilidade |
|---|---|
| `src/app/` | App Router, layouts e composição das páginas. Os caminhos existentes são `/`, `/gestao`, `/c/[slug]` e `/recebido`. |
| `src/frontend/` | Componentes interactivos e estilos. Os componentes de cliente consomem acções de servidor através da interface Next.js. |
| `src/backend/` | Acções de servidor, validação, sessões e persistência SQLite. Integra o mesmo processo Next.js. |
| `src/shared/` | Código puro usado no servidor e no cliente, incluindo a formatação de meticais. |
| `public/brand/` | Símbolo, assinaturas vectoriais e fonte Manrope com licença. |
| `docs/design/` | Regras de identidade ORDERX v0.1 e valores de referência. Ao alterar tokens, actualizar também `src/frontend/styles/tokens.css`. |
| `docs/produto/` | Arquitectura proposta, papéis e inventário de ecrãs da maqueta. |
| `docs/handoffs/` | Resultados verificados, decisões e pendências por etapa. |
| `tests/` | Teste de navegador do fluxo de encomenda. |

Executar os comandos npm na raiz. A base local continua em `data/checkout.sqlite` por omissão. Importações internas podem usar `@/` para a raiz de `src/`.
