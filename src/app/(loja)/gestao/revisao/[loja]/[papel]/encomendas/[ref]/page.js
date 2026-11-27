import { reviewOrder } from "@/backend/review/private-data";
import { reviewFilters, reviewQuery } from "@/backend/review/model.mjs";
import { Frame } from "@/frontend/components/store-frame";
import { Metrics, CommandHeader, SectionHeading } from "@/frontend/components/foundation-parts";
import { OrderIdentity, AmountBreakdown, StateSummary, StockSnapshot } from "@/frontend/components/order-detail";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
export default async function Page({params,searchParams}){
 const {loja,papel,ref}=await params;const context=await reviewOrder(loja,papel,ref),o=context.order;
 const back=`/gestao/revisao/${loja}/${papel}${reviewQuery(reviewFilters(await searchParams))}#pedidos`;
 return <Frame active="Resumo" review={context}><a className="ox-back" href={back}>← Voltar às encomendas</a><CommandHeader eyebrow="FICHA DA ENCOMENDA" title={o.ref} description="Consulta a composição comercial, a entrega e a cobrança." action={<span className="ox-role">Leitura · revisão privada</span>}/>
 <OrderIdentity product={o.product} customer={o.customer} date={o.date} channel={o.channel} location={o.province} status={o.order}/>
 <Metrics variant="dossier" metrics={[["Total encomendado",money(o.total),"Valor original"],["Por receber",money(o.due),"Ainda não conciliado"],["Recebido",money(o.received),"Confirmado pelo financeiro"]]}/>
 <div className="ox-detail-grid"><AmountBreakdown qty={o.qty} price={o.price} fee={o.fee} total={o.total}/><StateSummary order={o.order} delivery={o.delivery} payment={o.payment}/><StockSnapshot physical={o.physical} reserved={o.reserved} available={o.available}/><section><SectionHeading title="Responsabilidade e cobrança" description="Cenário de leitura; sem alteração de operações"/><dl className="ox-ledger"><div><dt>Atendimento</dt><dd>{o.assignee}</dd></div><div><dt>Estafeta</dt><dd>{o.courier||"Não atribuído"}</dd></div><div><dt>Declarado por conciliar</dt><dd>{money(o.declared)}</dd></div><div><dt>Anulado</dt><dd>{money(o.voided)}</dd></div></dl></section></div></Frame>
}
