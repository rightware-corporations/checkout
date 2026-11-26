export const metadata = { title: 'ORDERX — Gestão de encomendas | RIGHTWARE' };

export default function Home() {
  return <main className="site">
    <header className="sitebar"><a href="/" aria-label="ORDERX"><img src="/brand/positivo.svg" alt="ORDERX" /></a><nav><a href="#percurso">Como funciona</a><a className="pill" href="/gestao">Entrar na loja ↗</a></nav></header>
    <div className="hero">
      <div className="heroCopy"><p className="eyebrow">GESTÃO DE VENDAS · MOÇAMBIQUE</p><h1>Partilha o link.<br/><em>Recebe a encomenda.</em></h1><p className="intro">Publica os teus produtos, envia o checkout pelo WhatsApp e acompanha cada pedido até à entrega.</p><div className="ctas"><a className="pill" href="/gestao">Aceder ao painel ↗</a><a href="#percurso">Ver como funciona ↓</a></div></div>
      <aside className="visual" aria-label="Exemplo de encomenda"><div className="paper"><div className="receiptHead"><img src="/brand/simbolo.svg" alt=""/><b>Amora Cosméticos</b></div><p className="eyebrow">EXEMPLO DE ENCOMENDA</p><h2>Creme de<br/>hidratação</h2><div className="receiptRow"><span>2 unidades</span><b>1.998,00 MT</b></div><div className="receiptRow"><span>Entrega</span><b>100,00 MT</b></div><div className="receiptTotal"><span>Total</span><b>2.098,00 MT</b></div><div className="receiptFoot">● &nbsp; Encomenda recebida</div></div></aside>
    </div>
    <div className="process" id="percurso"><h2>Como funciona</h2><div className="steps">{[['Publica o produto','Define o preço em meticais, as quantidades e a entrega.'],['Partilha o checkout','O comprador abre o link no telefone e envia os dados da encomenda.'],['Prepara a entrega','Consulta o pedido no painel e actualiza o estado até à entrega.']].map(([h,p],i)=><article key={h}><small>0{i+1}</small><h3>{h}</h3><p>{p}</p></article>)}</div></div>
    <footer><b>ORDERX</b><span>Um produto RIGHTWARE</span></footer>
  </main>;
}
