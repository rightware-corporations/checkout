import { reviewOrder } from "@/backend/review/private-data";
import { Frame } from "@/frontend/components/store-frame";
import { Status, Metrics, CommandHeader, Progress, SectionHeading } from "@/frontend/components/foundation-parts";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
export default async function Page({params}){
 const {loja,papel,ref}=await params;const context=await reviewOrder(loja,papel,ref);const o=context.order;
 return <Frame active="Resumo" review={context}><a href={`/gestao/revisao/${loja}/${papel}`}>← Voltar ao resumo</a><CommandHeader eyebrow="FICHA DA ENCOMENDA" title={o.ref} description={o.product+" · "+o.customer} action={<Status value={o.order}/>}/><Metrics metrics={[["Total encomendado",money(o.total)],["Por receber",money(o.due)],["Recebido",money(o.received)]]}/><div className="ox-detail-grid"><section><h2>Composição do valor</h2><p>{o.qty} × {money(o.price)}</p><p>Entrega {money(o.fee)}</p><strong>{money(o.total)}</strong></section><section><SectionHeading title="Percurso COD" description="Três estados independentes"/><Progress stages={[["Pedido",o.order,true],["Entrega",o.delivery,false],["Cobrança",o.payment,false]]}/></section><section><h2>Stock da fixture</h2><p>Físico: {o.physical} · Reservado: {o.reserved} · Disponível: {o.available}</p><p>Hipóteses de desenho OX-COD-01.</p></section><section><h2>Responsável</h2><p>{o.assignee} · Atendimento fictício</p><p>Ficha de leitura. Sem alteração de pedido, cobrança ou stock.</p></section></div></Frame>
}
