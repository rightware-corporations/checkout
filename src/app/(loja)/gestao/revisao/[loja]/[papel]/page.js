import { reviewContext } from "@/backend/review/private-data";
import { Frame } from "@/frontend/components/store-frame";
import { Empty, Metrics, OrderRow, CommandHeader, FocusPanel, SectionHeading, Progress } from "@/frontend/components/foundation-parts";
import { Glyph } from "@/frontend/components/orderx-glyph";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
export default async function Page({params}){
 const {loja,papel}=await params;const context=await reviewContext(loja,papel);const {metrics,orders,role}=context;
 const detailAllowed=["gestora","atendimento"].includes(papel);
 const pending=detailAllowed?orders.filter(o=>o.order==="Por confirmar"):[];const first=pending[0];
 const path=first?`/gestao/revisao/${loja}/${papel}/encomendas/${first.ref}`:null;
 const items=papel==="financeiro"?[["Por receber",money(metrics.due),"Exigível não conciliado"],["Recebido",money(metrics.received),"Confirmado pelo financeiro"]]:papel==="stock"?[["Produtos com pedido",orders.length],["Unidades reservadas",orders.reduce((s,o)=>s+o.reserved,0)]]:papel==="estafeta"?[["Entregas atribuídas",orders.length]]:papel==="atendimento"?[["Pedidos atribuídos",metrics.count],["Valor encomendado",money(metrics.ordered)]]:[["Encomendado",money(metrics.ordered),"Valor bruto dos pedidos"],["Entregue",money(metrics.delivered),"Mercadoria entregue"],["Por receber",money(metrics.due),"Ainda não conciliado"],["Recebido",money(metrics.received),"Confirmado pelo financeiro"]];
 return <Frame active="Resumo" review={context}>
 <CommandHeader eyebrow="CENTRO DE OPERAÇÕES" title={papel==="gestora"?"Visão geral de vendas":`Área de ${role.label.toLowerCase()}`} description="Acompanha o trabalho da tua loja, do pedido ao recebimento." action={<span className="ox-date"><Glyph name="clock" size={16}/>26 Nov 2026 · cenário</span>}/>
 <FocusPanel label="PRIORIDADE OPERACIONAL" title={first?"Tens um pedido por confirmar":orders.length?"Acompanha a operação":"Tudo em ordem por agora"} description={first?"Confirma os dados do pedido antes de preparar a expedição.":orders.length?"Consulta os indicadores disponíveis para este perfil.":"Não existem tarefas atribuídas nesta demonstração."} action={path&&<a href={path} className="ox-focus-action">Rever pedido <Glyph name="arrow" size={18}/></a>} meta={<><span>{detailAllowed?"Pedidos por confirmar":papel==="estafeta"?"Entregas atribuídas":"Pedidos no cenário"}</span><strong>{detailAllowed?pending.length:orders.length}</strong><small>Dados do cenário actual</small></>}/>
 <Metrics metrics={items}/>
 <div className="ox-dashboard-grid"><section><SectionHeading title={detailAllowed?"Encomendas recentes":"Trabalho do perfil"} description={detailAllowed?"Acompanha a referência e o estado comercial.":"Informação disponível para este perfil."}/>{!orders.length?<Empty title="Nada a tratar">{loja==="casa-nala"?"Loja fictícia em primeiro uso. Catálogo e publicação serão trabalhados em OX-COD-03.":"Nenhuma entrega atribuída neste cenário."}</Empty>:detailAllowed?orders.map(o=><OrderRow key={o.ref} order={o} href={`/gestao/revisao/${loja}/${papel}/encomendas/${o.ref}`}/>):<p>Os módulos específicos deste perfil estão em desenho. Nenhuma acção operacional é executada aqui.</p>}</section>
 {detailAllowed&&<section><SectionHeading title="Percurso COD" description="Etapas do pedido em destaque."/>{first?<Progress stages={[["Pedido recebido",first.order,true],["Entrega",first.delivery,false],["Cobrança",first.payment,false]]}/>:<Empty title="Sem percurso activo">O próximo pedido aparece aqui.</Empty>}</section>}</div>
 </Frame>
}
