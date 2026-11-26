const app=document.getElementById('app');
function render() {
 const [area,id,modulo,ref]=location.hash.replace(/^#\/?/,'').split('/');
 let html;
 if(area==='loja'||area==='atendimento') html=loja(area,id,modulo,ref);
 else if(area==='comprador') html=comprador(id);
 else if(area==='plataforma') html=plataforma(id);
 else html=entrada(area);
 app.innerHTML=html||cabecalho()+'<main class="estreito"><h1>Página indisponível</h1>'+link('','Voltar à entrada')+'</main>';
 document.title=(app.querySelector('h1')?.textContent||'Demonstração')+' · ORDERX';
 const compra=document.querySelector('#compra');
 if(compra) {
 compra.q.onchange=()=>{compra.querySelector('output').textContent=mt(999*Number(compra.q.value)+100);};
 compra.onsubmit=e=>{
 e.preventDefault();
 const pedido={ref:'ENC-'+(1001+pedidos.amora.length),nome:compra.nome.value,telefone:'••• '+compra.tel.value.slice(-3),total:999*Number(compra.q.value)+100,estado:'Por confirmar'};
 pedidos.amora.push(pedido);
 location.hash='/comprador/'+pedido.ref;
 };
 }
 const adesao=document.querySelector('#adesao');
 if(adesao) adesao.onsubmit=e=>{e.preventDefault();adesoes.push(adesao.querySelector('input').value);location.hash='/recebido';};
 const confirmar=document.querySelector('#confirmar');
 if(confirmar) confirmar.onclick=()=>{pedidos[id].find(p=>p.ref===ref).estado='Confirmada';render();};
 window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);
render();
