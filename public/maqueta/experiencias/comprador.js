function comprador(ref) {
 const pedido=pedidos.amora.find(p=>p.ref===ref);
 if(ref && !pedido) return '';
 const conteudo=pedido ? titulo('Amora Cosméticos','Encomenda recebida')+linha('Referência',pedido.ref)+linha('Cliente',seguro(pedido.nome))+linha('Telefone',pedido.telefone)+linha('Total',mt(pedido.total))+link('loja/amora/encomendas','Ver na loja de demonstração →','opcao') :
 titulo('Amora Cosméticos','Creme de hidratação')+'<p>Cuidados diários · 1 unidade por embalagem</p>'+linha('Preço por unidade',mt(999))+linha('Entrega',mt(100))+'<form id="compra"><label>Quantidade<select name="q"><option>1</option><option>2</option></select></label><label>Nome fictício<input required name="nome" maxlength="60"></label><label>Telefone fictício<input name="tel" type="tel" pattern="[0-9]{9}" placeholder="841234567" required></label><label>Morada fictícia<input required name="morada" maxlength="120"></label><div class="linha"><strong>Total</strong><output aria-live="polite">'+mt(1099)+'</output></div><button>Enviar encomenda de demonstração</button></form>';
 return cabecalho()+'<main class="estreito comprador">'+conteudo+'</main>';
}
