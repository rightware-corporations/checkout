function loja(papel,id,modulo='resumo',ref) {
 if(!Object.hasOwn(lojas,id) || !Object.hasOwn(modulos,modulo)) return '';
 const atendimento=papel==='atendimento';
 if(atendimento && (id!=='amora' || !['encomendas','tarefas'].includes(modulo))) return '';
 const base=papel+'/'+id+'/', lista=pedidos[id], nome=lojas[id];
 const abertas=lista.filter(p=>p.estado==='Por confirmar');
 const destino=p=>link(base+'encomendas/'+p.ref,p.ref+' →');
 const fila=itens=>itens.length?itens.map(p=>linha(destino(p),seguro(p.nome)+' · '+p.estado)).join(''):'<p>Sem encomendas nesta fila.</p>';
 const percurso=['Por confirmar','Confirmada','Entregue'].map(estado=>{
   const quantidade=lista.filter(p=>p.estado===estado).length;
   return '<div class="fase"><strong>'+quantidade+'</strong><span>'+estado+'</span><progress value="'+quantidade+'" max="'+Math.max(1,lista.length)+'" aria-label="'+estado+'"></progress></div>';
 }).join('');
 const distribuicao=painel('Percurso das encomendas','<div class="fases">'+percurso+'</div>');
 const vazio=texto=>'<p>'+texto+'</p>';
 const volume=lista.reduce((n,p)=>n+p.total,0);
 const metricas='<div class="grelha metricas">'+[['Encomendas',lista.length],['Por confirmar',abertas.length],['Valor encomendado',mt(volume)]].map(([k,v])=>'<article><small>'+k+'</small><b>'+v+'</b></article>').join('')+'</div>';
 let corpo='';
 if(ref && id==="nala" && ["produtos","checkouts"].includes(modulo)) {
 corpo=editorNala(modulo,ref); if(!corpo) return "";
 } else if(ref) {
 const p=lista.find(o=>o.ref===ref); if(!p || modulo!=='encomendas') return '';
 corpo=painel(p.ref,linha('Cliente',seguro(p.nome))+linha('Contacto',p.telefone)+(p.produto?linha('Produto',seguro(p.produto))+linha('Quantidade',p.qtd):'')+linha('Total',mt(p.total))+linha('Estado',p.estado)+(p.estado==='Por confirmar'?'<button id="confirmar">Confirmar encomenda</button>':'')+'<p>'+link(base+'encomendas','Voltar às encomendas')+'</p>');
 } else {
 const dados={
 resumo:(id==='nala'?primeiroUso():'')+metricas+distribuicao+painel('Pedidos por confirmar',fila(abertas)),
 encomendas:painel('Pedidos da loja',fila(lista)),
 tarefas:painel('Confirmar por telefone',fila(abertas)),
 clientes:painel('Compradores',lista.map(p=>linha(seguro(p.nome),p.telefone)).join('')||vazio('Os compradores aparecem após a primeira encomenda.')),
 produtos:id==='nala'?produtosNala():painel('Catálogo',id==='amora'?linha('Creme de hidratação',mt(999)):vazio('O catálogo da Casa Nala está vazio.')),
 checkouts:id==='nala'?checkoutsNala():painel('Links publicados',id==='amora'?linha('Creme de hidratação',link('comprador','Abrir checkout ↗')):vazio('Ainda não há links publicados.')),
 entregas:painel('Preparação da entrega',fila(lista.filter(p=>p.estado==='Confirmada'))),
 cobrancas:painel('Conferência de cobranças',lista.length?lista.map(p=>linha(destino(p),mt(p.total)+' · '+(p.ref==='AM-203'?'Recebido':'Por conferir'))).join(''):vazio('Ainda não há cobranças registadas.')),
 equipa:painel('Pessoas com acesso',linha('Responsável da loja','Proprietária')+(id==='amora'?linha('Sara','Atendimento'):'')),
 relatorios:distribuicao+painel('Movimento da loja',linha('Encomendas recebidas',lista.length)+linha('Valor encomendado',mt(volume))),
 definicoes:painel('Dados comerciais',linha('Nome',nome)+linha('Moeda','Metical (MT)')),
 actividade:painel('Movimentos das encomendas',fila([...lista].reverse()))
 };
 corpo=dados[modulo];
 }
 const nav=Object.entries(modulos).filter(([k])=>!atendimento||['encomendas','tarefas'].includes(k)).map(([k,v])=>link(base+k,v,k===modulo?'activo':'')).join('');
 return moldura(nome,atendimento?'Atendimento':'Proprietária',nav,titulo(nome,modulos[modulo])+corpo,atendimento?link('','Sair da demonstração'):link('entrar','Mudar de loja'));
}
function moldura(nome,papel,nav,conteudo,saida) {
 return '<header>'+link('',marca)+'<span>Demonstração · '+papel+' · '+saida+'</span></header><div class="estrutura"><nav aria-label="Área de trabalho"><small>'+nome+'</small>'+nav+'</nav><main class="trabalho">'+conteudo+'</main></div>';
}
