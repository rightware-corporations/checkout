# Prova de encomenda por link

Em 25 de Novembro de 2026, o Work executou uma prova local com uma loja e dados fictícios. Recomenda-se WooCommerce como base do MVP, sujeito à decisão da RIGHTWARE. A cobrança electrónica e o número de vendedores continuam por confirmar.

## Reprodução
1. Instalar WordPress 7.1.5 e activar WooCommerce 11.3.1. Na prova usou-se WordPress Playground CLI, PHP 8.3 e SQLite. Criar as páginas de WooCommerce e activar permalinks.
2. Definir país MZ, moeda MZN, checkout de convidado, pagamento na entrega, impostos desactivados para o cenário e entrega fixa de 100 MT. Criar produto simples publicado com preço de 999 MT.
3. Abrir /checkout-link/?products=ID:2 numa sessão de comprador. Verificar que o checkout apresenta duas unidades e que a Store API devolve subtotal 199800, entrega 10000 e total 209800 em unidades menores de MZN.
4. Submeter morada de teste com telefone, email e província. A prova usou Maputo Cidade (MZMPM) e POST /wc/store/v1/checkout com o método cod. A API respondeu HTTP 200, pedido 16, estado processing.
5. Entrar com o papel shop_manager, abrir a ficha e recarregá-la. As duas respostas HTTP 200 continham o produto, o cliente de teste e o valor de 2.098 MT.

A submissão foi por API após abrir o link público. A experiência visual do comprador em telefone, o formulário sem email e a edição das regras por link ficam para a próxima prova. O estado processing não comprova recebimento de dinheiro.

## Comparação
prinnotech/ecommerce-template e9c9c23 instalou, aplicou 26 migrações SQLite, serviu a loja e o login do painel e calculou 209800 com computeTotals. O schema de conclusão exige email. Não foi demonstrada uma encomenda persistida nesse candidato.

## Próxima tarefa
Prototipar uma página “Meus Checkouts” que permita seleccionar o produto, configurar quantidades, taxa e campos, e copiar o link. Validar num telemóvel a primeira encomenda com nome, telefone e morada, preservando o cálculo no servidor e o painel já demonstrado. Rever com o cliente antes de expandir o escopo.

[Documentação oficial de links](https://woocommerce.com/document/creating-sharable-checkout-urls-in-woocommerce/)
