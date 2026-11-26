# Stitch V2 · revisão de 26/11/2026

O ZIP contém cinco HTML V1, oito HTML V2 (cinco de venda, duas landings e índice), dois documentos Markdown e uma imagem de referência. A direcção V2 é candidata a referência para o bloco A02–A03/B01–B06. A aprovação estética pertence à RIGHTWARE. O inventário documentado abrange áreas ainda por desenhar.

## Evidência no export
- Resolução dos 14 href relativos do índice contra os ficheiros do ZIP: 14 destinos ausentes. O checkout tenta abrir ../03d-checkout-sucesso-v2/CheckoutSucessoV2.html; a página exportada é ../03b_checkout_publico_sucesso_v2_mobile_390/code.html.
- Execução isolada do JavaScript original da confirmação em Node com DOM mínimo: qty=1 → 1099,00 MT; qty=2 → 2098,00 MT. Valores correctos, agrupamento visual distinto do contrato 1.099,00 / 2.098,00.
- Apenas qty é transportada no redireccionamento. Nome, telefone e morada da confirmação são constantes; o número aparece por extenso. O botão de copiar altera o seu conteúdo e cor, sem escrita na área de transferência.
- Teclado aberto é simulado por botão; validação de telefone no envio usa comprimento. Estados de chamada e agendamento são interacções de demonstração. Nenhum teste em telefone físico nesta revisão.
- No checkout público V2 passou a constar Total da encomenda. A landing ainda precisa de destinos públicos de adesão e autenticação.

## Próxima execução
Corrigir caminhos usando o layout real da exportação e validar a partir de uma extracção limpa. Verificar envio com 1 e 2 unidades, contacto fictício alterado, telefone mascarado, cópia seguida de colagem e retorno à origem autorizada. Nas novas pranchas incluir adesão, estado de adesão, login, recuperação, convite, selecção de loja, primeiro uso e conta. Separar rascunhos, simulações e percursos verificados. Publicar handoff com ficheiros reais, interacções testadas e lacunas.