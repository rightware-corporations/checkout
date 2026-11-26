const app=document.getElementById('app');
function render() {
 const [area,id,modulo,ref]=location.hash.replace(/^#\/?/,'').split('/');
 const nala=area==='casa-nala';
 const oferta=nala?catalogoNala.ofertas.find(o=>o.id===id):ofertaAmora;
 const lojaCompra=nala?'nala':'amora';
 let html;

 if(area==='loja'||area==='atendimento') html=loja(area,id,modulo,ref);
 else if(nala) html=oferta?comprador(modulo,'nala',oferta):'';
 else if(area==='comprador') html=comprador(id);
 else if(area==='plataforma') html=plataforma(id);
 else html=entrada(area);
 app.innerHTML=html||cabecalho()+'<main class="estreito"><h1>Página indisponível</h1>'+link('','Voltar à entrada')+'</main>';
 document.title=(app.querySelector('h1')?.textContent||'Demonstração')+' · ORDERX';
 activarEditor();
 const compra=document.querySelector('#compra');
 if(compra) {
 compra.q.onchange=()=>{compra.querySelector('output').textContent=mt(totalCompra(oferta,Number(compra.q.value)));};
 compra.onsubmit=e=>{
 e.preventDefault();
 const pedido={ref:nala?'NALA-'+crypto.randomUUID():'ENC-'+(1001+pedidos.amora.length),produto:oferta.nome,qtd:Number(compra.q.value),nome:compra.nome.value,telefone:'••• '+compra.tel.value.slice(-3),total:totalCompra(oferta,Number(compra.q.value)),estado:'Por confirmar'};
 pedidos[lojaCompra].push(pedido);
 if(nala) guardarPedidoNala(pedido);
 location.hash=(nala?'/casa-nala/'+id+'/':'/comprador/')+pedido.ref;
 };
 }
 const adesao=document.querySelector('#adesao');
 if(adesao) adesao.onsubmit=e=>{e.preventDefault();adesoes.push(adesao.querySelector('input').value);location.hash='/recebido';};
 const confirmar=document.querySelector('#confirmar');
 if(confirmar) confirmar.onclick=()=>{const p=pedidos[id].find(p=>p.ref===ref); p.estado='Confirmada'; if(id==='nala') guardarPedidoNala(p); render();};
 window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
render();
