function entrada(rota) {
 const acessos = [
 ['comprador','Compradora','Abrir o link da Amora e encomendar.'],
 ['entrar','Equipa da loja','Escolher uma loja e acompanhar os pedidos.'],
 ['plataforma','Superadmin','Consultar lojas e pedidos de adesão.']
 ].map(([r,t,d])=>link(r,'<strong>'+t+' ↗</strong><p>'+d+'</p>','acesso')).join('');
 if (!rota) return cabecalho()+'<main class="folha"><div class="hero"><div>'+titulo('ORDERX  /  Gestão de encomendas','Da primeira venda à última entrega.')+'<p>Cria um link para o teu produto e acompanha cada encomenda com a tua equipa.</p>'+link('adesao','Pedir acesso','botao')+'</div><aside><small>AMORA COSMÉTICOS</small><h2>Pedido em acompanhamento</h2>'+linha('ENC-1001','Por confirmar')+linha('Total',mt(1099))+'</aside></div><h2>Explorar a demonstração</h2><div class="grelha">'+acessos+'</div></main>';
 const telas = {
 adesao: ['Pedido de adesão','<form id="adesao"><label>Nome do negócio<input required maxlength="80"></label><button>Enviar pedido simulado</button></form>'],
 recebido:['Pedido recebido','<p>O pedido aguarda revisão pela equipa da plataforma.</p>'+link('','Voltar à entrada')],
 entrar:['Escolher uma loja',Object.entries(lojas).map(([k,v])=>link('loja/'+k+'/resumo',v+' →','opcao')).join('')+link('convite','Abrir convite de Sara')],
 convite:['Convite da Amora Cosméticos','<p>Sara foi convidada para Atendimento. Pode consultar e confirmar encomendas desta loja.</p>'+link('atendimento/amora/encomendas','Aceitar convite simulado','botao')]
 };
 const tela=telas[rota]; if(!tela) return '';
 return cabecalho()+'<main class="estreito">'+titulo('Entrada · Demonstração',tela[0])+tela[1]+'</main>';
}
