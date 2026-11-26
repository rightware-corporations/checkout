import OrderDemo from "@/frontend/components/order-demo";
import "./vitrine.css";
export const metadata={title:"ORDERX — Gestão de encomendas | RIGHTWARE"};

export default function Home(){
  return <main className="site vitrine">
    <header className="sitebar"><a href="/" aria-label="ORDERX"><img src="/brand/positivo.svg" alt="ORDERX"/></a><nav><a href="#operacao">Operação da loja</a><a className="pill" href="/gestao">Entrar na loja ↗</a></nav></header>
    <div className="cover"><div className="coverText"><p className="eyebrow">ORDERX / GESTÃO DE ENCOMENDAS</p><h1>Da conversa<br/>à entrega.</h1><p>Transforma o interesse de quem te escreve no WhatsApp numa encomenda com produto, contacto e morada. Acompanha o pedido até chegar ao cliente.</p><a className="pill" href="#percurso">Experimentar o checkout ↓</a></div><OrderDemo/></div>
    <section className="operations" id="operacao"><div><p className="eyebrow">DENTRO DA LOJA</p><h2>O que precisa<br/>da tua atenção?</h2><p>No painel, cada encomenda reúne os dados de entrega e o estado do pedido. Abre a ficha para preparar o envio ou contactar o comprador.</p><a href="/gestao/encomendas">Consultar as minhas encomendas →</a></div>
    <div className="sample"><small>Exemplo de operação · Amora</small><h3>Fila de encomendas</h3>{[["ENC-1003","Matola","Recebida"],["ENC-1002","Maputo","Em processamento"],["ENC-1001","Boane","Entregue"]].map(([ref,city,state],i)=><div className="sampleRow" key={ref}><b>{ref}</b><span>{city}</span><strong className={"state s"+i}>{state}</strong></div>)}</div></section>
    <section className="questions"><h2>Antes da primeira venda</h2>{[["Como partilho um produto?","No painel, publica o checkout e copia o link para a conversa com o comprador."],["O comprador precisa de uma conta?","Pode encomendar directamente pelo link e recebe uma referência depois de enviar os dados de entrega."],["O envio da encomenda cobra o valor?","A ORDERX regista o pedido e o valor em meticais. O pagamento é combinado com a loja."]].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <footer><img width="110" src="/brand/positivo.svg" alt="ORDERX"/><span>Um produto RIGHTWARE</span></footer>
  </main>;
}
