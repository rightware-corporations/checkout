import { reviewContext } from "@/backend/review/private-data";
import { Frame } from "@/frontend/components/store-frame";
import { Empty, Metrics, OrderRow } from "@/frontend/components/foundation-parts";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
export default async function Page({params}){
 const {loja,papel}=await params;const context=await reviewContext(loja,papel);const {metrics,orders,role}=context;
 const detailAllowed=["gestora","atendimento"].includes(papel);
 const items=papel==="financeiro"?[["Por receber",money(metrics.due)],["Recebido",money(metrics.received)]]:papel==="stock"?[["Produtos com pedido",orders.length],["Unidades reservadas",orders.reduce((s,o)=>s+o.reserved,0)]]:papel==="estafeta"?[["Entregas atribuídas",orders.length]]:papel==="atendimento"?[["Pedidos atribuídos",metrics.count],["Valor encomendado",money(metrics.ordered)]]:[["Encomendado",money(metrics.ordered)],["Entregue",money(metrics.delivered)],["Por receber",money(metrics.due)],["Recebido",money(metrics.received)]];
 return <Frame active="Resumo" review={context}><p className="eyebrow">C01 · FUNDAÇÃO VISUAL</p><h1>Resumo · {role.label}</h1><p>26 de Novembro de 2026 · Dados sintéticos isolados</p><Metrics metrics={items}/><section><h2>{detailAllowed?"Encomendas recentes":"Trabalho do perfil"}</h2>{!orders.length?<Empty title="Nada a tratar">{loja==="casa-nala"?"Loja fictícia em primeiro uso. Catálogo e publicação serão trabalhados em OX-COD-03.":"Nenhuma entrega atribuída neste cenário."}</Empty>:detailAllowed?orders.map(o=><OrderRow key={o.ref} order={o} href={`/gestao/revisao/${loja}/${papel}/encomendas/${o.ref}`}/>):<p>Os módulos específicos deste perfil estão em desenho. Nenhuma acção operacional é executada aqui.</p>}</section></Frame>
}
