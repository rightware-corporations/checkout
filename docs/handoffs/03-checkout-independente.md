# Primeira encomenda independente

Branch de trabalho: feat/checkout-independente. A escolha de excluir WordPress e WooCommerce substitui a recomendação anterior. O fluxo implementado usa Next.js, React e SQLite. A lógica da aplicação foi escrita neste repositório. No candidato prinnotech avaliado, o esquema de conclusão requer e-mail e a criação da encomenda e dos dados do cliente propaga esse campo. A implementação própria evita transportar o catálogo e o carrinho do template.

## Verificado em 25 de Novembro de 2026

Build de produção concluído. O teste em tests/checkout_browser.py usou Chromium com comprador em contexto separado, viewport de 390 × 844 e toque activo. O vendedor publicou um produto de 999 MT, máximo de duas unidades e entrega de 100 MT. O comprador escolheu duas unidades, viu o total de 2.098 MT, enviou nome, telefone e morada e recebeu uma referência. A mesma referência apareceu no painel após recarregar. O estado Em processamento persistiu depois de uma segunda leitura. O contexto do comprador recebeu o formulário de login ao abrir a gestão.

Para repetir, iniciar o servidor com uma base descartável vazia e a palavra-passe de teste, instalar Playwright para Python e Chromium, e executar python tests/checkout_browser.py. Usar CHECKOUT_TEST_URL para indicar a origem e SELLER_PASSWORD para a credencial. CHROMIUM_PATH é opcional.

## Escopo e continuação

Uma loja, um vendedor, um produto por link, preço em meticais, entrega fixa e bairro configurável. A fotografia é uma URL HTTPS opcional. O pagamento e o suporte a várias lojas continuam por confirmar. O teste foi local, em navegador com emulação móvel. Para a próxima iteração, validar com o cliente num telefone físico e completar edição e desactivação de links já publicados. O endurecimento do login e o alojamento com HTTPS e disco persistente precedem a abertura ao público.
