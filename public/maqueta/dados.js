const lojas = { amora: 'Amora Cosméticos', nala: 'Casa Nala' };
const pedidos = { amora: [{ ref:'ENC-1001', nome:'Sara M.', telefone:'••• 481', total:1099, estado:'Por confirmar' }], nala:[] };
const modulos = {resumo:'Resumo', encomendas:'Encomendas', produtos:'Produtos', checkouts:'Meus checkouts', clientes:'Clientes', tarefas:'Tarefas', entregas:'Entregas', cobrancas:'Cobranças', equipa:'Equipa', relatorios:'Relatórios', definicoes:'Definições', actividade:'Actividade'};
const mt = n => n.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+,)/g,'.')+' MT';
const seguro = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (rota,texto,classe='') => '<a class="'+classe+'" href="#/'+rota+'">'+texto+'</a>';
const marca = '<img class="marca" src="../brand/positivo.svg" alt="ORDERX">';
const linha = (titulo,valor) => '<div class="linha"><strong>'+titulo+'</strong><span>'+valor+'</span></div>';
const titulo = (contexto,nome) => '<small>'+contexto+'</small><h1>'+nome+'</h1>';
const painel = (nome,corpo) => '<section class="painel"><h2>'+nome+'</h2>'+corpo+'</section>';
function cabecalho() { return '<header>'+link('',marca)+link('entrar','Entrar')+'</header>'; }
