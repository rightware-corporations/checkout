const ofertaAmora={nome:'Creme de hidratação',preco:999,entrega:100,max:2};
function ofertaResumo(loja,oferta) {
  return titulo(loja,seguro(oferta.nome))+linha('Preço por unidade',mt(oferta.preco))+linha('Entrega',mt(oferta.entrega));
}
function totalCompra(oferta,qtd) {
  return (Math.round(oferta.preco*100)*qtd+Math.round(oferta.entrega*100))/100;
}
function comprador(ref,id='amora',oferta=ofertaAmora) {
  const pedido=pedidos[id].find(p=>p.ref===ref);
  if ((ref && !pedido) || !oferta) return '';
  const opcoes=Array.from({length:oferta.max},(_,i)=>'<option>'+(i+1)+'</option>').join('');
  const conteudo=pedido ? titulo(lojas[id],'Encomenda recebida')+linha('Referência',pedido.ref)+linha('Cliente',seguro(pedido.nome))+linha('Telefone',pedido.telefone)+linha('Total',mt(pedido.total))+link('loja/'+id+'/encomendas','Ver na loja de demonstração →','opcao') :
    ofertaResumo(lojas[id],oferta)+'<form id="compra"><label>Quantidade<select name="q">'+opcoes+'</select></label><label>Nome fictício<input required name="nome" maxlength="60"></label><label>Telefone fictício<input name="tel" type="tel" pattern="[0-9]{9}" placeholder="841234567" required></label><label>Morada fictícia<input required name="morada" maxlength="120"></label><div class="linha"><strong>Total</strong><output aria-live="polite">'+mt(totalCompra(oferta,1))+'</output></div><button>Enviar encomenda de demonstração</button></form>';
  return cabecalho()+'<main class="estreito comprador">'+conteudo+'</main>';
}
