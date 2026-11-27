// A publicação guarda apenas a oferta comercial neste navegador.
const chaveCatalogo = 'orderx.demo.nala.catalogo.v1';
function lerCatalogo() {
  try {
    const salvo = JSON.parse(localStorage.getItem(chaveCatalogo));
    if (salvo && Array.isArray(salvo.produtos) && Array.isArray(salvo.ofertas)) return salvo;
  } catch { /* O navegador pode impedir o armazenamento de ficheiros locais. */ }
  return { produtos: [], ofertas: [] };
}
let catalogoNala = lerCatalogo();
let rascunho = null;
function guardarCatalogo() {
  try { localStorage.setItem(chaveCatalogo, JSON.stringify(catalogoNala)); }
  catch { /* O percurso continua disponível no separador actual. */ }
}
const prefixoPedido = 'orderx.demo.nala.pedido.v1.';
function carregarPedidosNala() {
  try {
    pedidos.nala = Object.keys(localStorage).filter(k=>k.startsWith(prefixoPedido))
      .map(k=>JSON.parse(localStorage.getItem(k)));
  } catch { /* Usar os pedidos em memória se o armazenamento estiver indisponível. */ }
}
function guardarPedidoNala(pedido) {
  try { localStorage.setItem(prefixoPedido+pedido.ref, JSON.stringify(pedido)); }
  catch { /* Os dados fictícios ficam disponíveis neste separador. */ }
}
carregarPedidosNala();
window.addEventListener('storage', evento => {
  if (evento.key?.startsWith(prefixoPedido)) { carregarPedidosNala(); render(); }
  if (evento.key === chaveCatalogo) { catalogoNala = lerCatalogo(); render(); }
});
const baseNala = 'loja/nala/';
function primeiroUso() {
  const temProduto = catalogoNala.produtos.length > 0;
  const publicado = catalogoNala.ofertas.length > 0;
  return painel('O primeiro link da Casa Nala',
    linha('1 · Criar produto',temProduto?'Concluído':link(baseNala+'produtos/novo','Começar'))+
    linha('2 · Publicar checkout',publicado?'Concluído':temProduto?link(baseNala+'checkouts/novo','Configurar'):'Aguarda produto')+
    linha('3 · Abrir link',publicado?link(baseNala+'checkouts','Ver links'):'Aguarda publicação'));
}
function produtosNala() {
  const linhas = catalogoNala.produtos.map(p=>linha(seguro(p.nome),mt(p.preco))).join('');
  return painel('Catálogo',linhas+link(baseNala+'produtos/novo','Criar produto','botao'));
}
function checkoutsNala() {
  const linhas = catalogoNala.ofertas.map(o=>linha(seguro(o.nome),link(baseNala+'checkouts/'+o.id,'Ver link'))).join('');
  return painel('Links publicados',linhas+(catalogoNala.produtos.length?link(baseNala+'checkouts/novo','Configurar checkout','botao'):link(baseNala+'produtos/novo','Criar primeiro produto','botao')));
}
function editorNala(modulo,passo) {
  if (modulo==='produtos' && passo==='novo') return painel('Novo produto',
    '<form id="novo-produto"><label>Nome do produto<input name="nome" required maxlength="80" placeholder="Ex. Cesto de palha"></label><label>Preço por unidade (MT)<input required type="number" min="0.01" max="9999999" step=".01" name="preco"></label><button>Guardar produto</button></form>');
  if (modulo!=='checkouts') return '';
  if (passo==='novo') {
    if (!catalogoNala.produtos.length) return checkoutsNala();
    const opcoes=catalogoNala.produtos.map(p=>'<option value="'+p.id+'" '+(rascunho?.produto===p.id?'selected':'')+'>'+seguro(p.nome)+'</option>').join('');
    return painel('Configurar checkout','<form id="configurar"><label>Produto<select name="produto">'+opcoes+'</select></label><label>Entrega fixa (MT)<input name="entrega" type="number" min="0" max="9999999" step=".01" required value="'+(rascunho?.entrega??0)+'"></label><label>Quantidade máxima<input name="max" type="number" min="1" max="99" required value="'+(rascunho?.max??2)+'"></label><button>Pré-visualizar</button></form>');
  }
  if (passo==='previa' && rascunho?.nome) return painel('Prévia do comprador',ofertaResumo('Casa Nala',rascunho)+linha('Quantidade máxima',rascunho.max)+link(baseNala+'checkouts/novo','Editar configuração','opcao')+'<button id="publicar">Publicar link</button>');
  const oferta=catalogoNala.ofertas.find(o=>o.id===passo);
  if (!oferta) return '';
  const rota='casa-nala/'+oferta.id;
  return painel('Checkout publicado',linha('Produto',seguro(oferta.nome))+'<p>Link de demonstração para este navegador.</p><label>Link publicado<input readonly id="url-publicada" value="'+seguro(location.href.split('#')[0]+'#/'+rota)+'"></label><button id="copiar">Copiar link</button> <span role="status"></span><p>'+link(rota,'Abrir como compradora →','opcao')+'</p>');
}
function activarEditor() {
  const produto=document.querySelector('#novo-produto'), config=document.querySelector('#configurar');
  if (produto) produto.onsubmit=e=>{
    e.preventDefault();
    const nome=produto.nome.value.trim();
    if (!nome) { produto.nome.focus(); return; }
    const p={id:crypto.randomUUID(),nome,preco:produto.preco.valueAsNumber};
    catalogoNala.produtos.push(p); guardarCatalogo();
    rascunho={produto:p.id,entrega:0,max:2};
    location.hash='/'+baseNala+'checkouts/novo';
  };
  if (config) config.onsubmit=e=>{
    e.preventDefault();
    const p=catalogoNala.produtos.find(p=>p.id===config.produto.value);
    rascunho={produto:p.id,nome:p.nome,preco:p.preco,entrega:config.entrega.valueAsNumber,max:config.elements.namedItem('max').valueAsNumber};
    location.hash='/'+baseNala+'checkouts/previa';
  };
  const publicar=document.querySelector('#publicar');
  if (publicar) publicar.onclick=()=>{
    publicar.disabled=true;
    const oferta={...rascunho,id:crypto.randomUUID()};
    catalogoNala.ofertas.push(oferta); guardarCatalogo(); rascunho=null;
    location.hash='/'+baseNala+'checkouts/'+oferta.id;
  };
  const copiar=document.querySelector('#copiar');
  if (copiar) copiar.onclick=async()=>{
    const campo=document.querySelector('#url-publicada'), estado=document.querySelector('[role=status]');
    try { await navigator.clipboard.writeText(campo.value); estado.textContent='Link copiado.'; }
    catch { campo.select(); estado.textContent='Link seleccionado para cópia manual.'; }
  };
}
