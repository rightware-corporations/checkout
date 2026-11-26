# Website e operação de vendas

A entrada pública em `/` apresenta a ORDERX. O vendedor entra em `/gestao`. A aplicação consulta o resumo na base de dados e oferece rotas próprias para publicação, checkouts e encomendas. O comprador recebe o link `/c/[slug]` e obtém a referência em `/recebido` após submeter a encomenda.

Verificação local com build de produção, SQLite temporária, Chromium e Playwright. A partir da landing, o vendedor autenticou-se e publicou um checkout a 999 MT por unidade com entrega de 100 MT. Num contexto de navegador independente a 390 px, o comprador submeteu duas unidades e recebeu a confirmação. O vendedor consultou a mesma referência e alterou o estado para Em processamento, confirmado após recarregar. Reproduzir com o teste tests/checkout_browser.py.

A aplicação operacional usa o modelo existente de um vendedor. Gestão de equipas, autorização multi-loja e Superadmin continuam na fase de desenho. Para acesso pela Internet, a instância Next.js precisa de HTTPS, configuração da palavra-passe e volume SQLite persistente.
