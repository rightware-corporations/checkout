import { money } from "@/shared/money";
export function Status({value}){const tone=["Entregue","Conciliado"].includes(value)?"good":["Cancelada","Cancelado","Anulado"].includes(value)?"bad":["Recebida","Por confirmar","Por receber"].includes(value)?"pending":"";return <span className={"ox-status "+tone}>{value}</span>}
export function Metrics({metrics}){return <div className="ox-metrics">{metrics.map(([label,value])=><div className="ox-metric" key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>}
export function OrderRow({order,href}){return <article className="ox-order-row"><div><strong>{href?<a href={href}>{order.ref}</a>:order.ref}</strong><p>{order.title||order.product} · {order.name||order.customer}</p></div><div><Status value={order.state||order.order}/></div><strong>{money(order.total)}</strong></article>}
export function Empty({title,children}){return <div><h3>{title}</h3><p>{children}</p></div>}
