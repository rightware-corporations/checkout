# Checkout

Aplicação independente em Next.js e SQLite para uma loja publicar links de encomenda e receber pedidos em meticais.

## Executar localmente

Com Node.js 24, executar `npm ci`, copiar `.env.example` para `.env.local` e definir `SELLER_PASSWORD` com pelo menos 12 caracteres. Executar `npm run dev` e abrir `http://localhost:3000/gestao`.

O vendedor publica um produto e copia o link. O comprador abre o link, escolhe a quantidade e introduz os dados de entrega. O servidor calcula e guarda o preço por unidade, a entrega e o total. A referência aparece na confirmação e no painel do vendedor.

## Operação

`npm run build` gera a versão de produção e `npm start` inicia o servidor. A sessão do vendedor usa cookie seguro em produção. Servir por HTTPS e guardar o ficheiro definido em `CHECKOUT_DB` num volume persistente. Esta versão pressupõe um servidor e um vendedor. Valores representam encomendas registadas; a cobrança electrónica é uma decisão em aberto.
