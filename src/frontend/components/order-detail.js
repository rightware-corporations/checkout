import { money } from "@/shared/money";
import { Glyph } from "./orderx-glyph";
import { SectionHeading, Status } from "./foundation-parts";
export function PriorityQueue({items}){
 if(!items.length)return null;
 return <section className="ox-priority-panel"><SectionHeading title="Fila de atenção" description="Pendências do contexto por tipo de trabalho"/>{items.map(i=><div className="ox-priority-item" key={i.key}><span className={"ox-priority-icon "+i.key}><Glyph name={i.key==="confirm"?"orders":i.key==="retry"?"truck":"wallet"}/></span><div><strong>{i.label}</strong><p>{i.description}</p></div><strong className="ox-priority-count">{i.count}</strong></div>)}</section>
}
export function OrderIdentity({ref,product,customer,date,channel,location,status}){
 return <section className="ox-identity-panel"><div className="ox-identity-main"><span className="ox-identity-icon"><Glyph name="orders" size={28}/></span><div><p className="ox-kicker">REFERÊNCIA COMERCIAL</p><strong className="ox-identity-ref">{ref}</strong><p>{product} · {customer}</p></div><Status value={status}/></div><dl className="ox-identity-meta">{[["Data",date],["Canal",channel],["Local",location]].filter(([,v])=>v).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
}
export function AmountBreakdown({qty,price,fee,total}){
 return <section><SectionHeading title="Composição do valor" description="Valores fixados na encomenda"/><dl className="ox-ledger"><div><dt>{qty} × {money(price)}</dt><dd>{money(qty*price)}</dd></div><div><dt>Entrega</dt><dd>{money(fee)}</dd></div></dl><div className="ox-total-line"><span>Total encomendado</span><strong>{money(total)}</strong></div></section>
}
export function StateSummary({order,delivery,payment}){
 return <section><SectionHeading title="Acompanhamento" description="Entrega não equivale a cobrança"/><div className="ox-state-list">{[["orders","Pedido",order],["truck","Entrega",delivery],["wallet","Cobrança",payment]].map(([icon,label,value])=><div key={label}><span className="ox-priority-icon"><Glyph name={icon}/></span><strong>{label}</strong><Status value={value}/></div>)}</div></section>
}
export function StockSnapshot({physical,reserved,available}){
 return <section><SectionHeading title="Disponibilidade do produto" description="Hipótese de stock OX-COD-01 · leitura"/><div className="ox-stock-values">{[["Físico",physical],["Reservado",reserved],["Disponível",available]].map(([label,value])=><div key={label}><small>{label}</small><strong>{value}</strong><span> un.</span></div>)}</div>{physical>0&&<div className="ox-stock-bar" aria-hidden="true"><span style={{width:reserved/physical*100+"%"}}/><span style={{width:available/physical*100+"%"}}/></div>}<p className="ox-ledger-note">Disponível = físico − reservado.</p></section>
}
