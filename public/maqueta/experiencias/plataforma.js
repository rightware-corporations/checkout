const adesoes=['Ateliê Matola','Mercado da Baixa'];
function plataforma(sec='resumo') {
 const seccoes={resumo:'Visão geral',lojas:'Lojas',adesoes:'Adesões'};
 if(!Object.hasOwn(seccoes,sec)) return '';
 const nav=Object.entries(seccoes).map(([k,v])=>link('plataforma/'+k,v,k===sec?'activo':'')).join('');
 const corpo={
 resumo:painel('Operação da plataforma',linha(link('plataforma/lojas','Lojas activas'),Object.keys(lojas).length)+linha(link('plataforma/adesoes','Pedidos recebidos'),adesoes.length)),
 lojas:painel('Directório de lojas',Object.values(lojas).map(n=>linha(n,'Activa')).join('')),
 adesoes:painel('Pedidos de acesso',adesoes.length?adesoes.map(n=>linha(seguro(n),'Recebido')).join(''):'<p>A fila está vazia.</p>'+link('adesao','Simular pedido de adesão'))
 };
 return moldura('Plataforma ORDERX','Superadmin',nav,titulo('Administração da plataforma',seccoes[sec])+corpo[sec],link('','Voltar à entrada'));
}
