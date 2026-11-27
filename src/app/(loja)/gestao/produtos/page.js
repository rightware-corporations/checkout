import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { Frame } from "@/frontend/components/store-frame";
import { CommandHeader, SectionHeading, Empty, Status } from "@/frontend/components/foundation-parts";
import { ProductPhoto } from "@/frontend/components/product-photo";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
import { listProducts } from "@/backend/catalog/repository.mjs";
export default async function Page({searchParams}){
 await requireSeller();
 const c=listProducts(db(),await searchParams);
 return <Frame active="Catálogo"><CommandHeader eyebrow="COMÉRCIO · CATÁLOGO" title="Catálogo de produtos" description="Mantém a ficha dos produtos independente dos links de venda." action={<a className="pill ox-primary" href="/gestao/produtos/novo">Novo produto</a>}/>
 <div className="ox-catalog-counts" aria-label="Resumo do catálogo">{[["Total",c.total],["Activos",c.active],["Arquivados",c.archived]].map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
 <section className="ox-catalog-list"><SectionHeading title="Produtos" description={c.products.length+" de "+c.total+" produtos"}/>
 <form className="ox-filter" action="/gestao/produtos" method="get"><label>Pesquisar<input name="q" defaultValue={c.query} maxLength={100} placeholder="Nome ou descrição"/></label><label>Estado<select name="state" defaultValue={c.state}><option value="">Todos</option><option value="active">Activo</option><option value="archived">Arquivado</option></select></label><button>Filtrar</button><a href="/gestao/produtos">Limpar</a></form>
 {!c.products.length?<Empty title={c.total?"Sem resultados":"Ainda sem produtos"}>{c.total?"Altera os filtros para encontrar produtos.":"Cria a primeira ficha para começar."}</Empty>:<div className="ox-catalog-rows">{c.products.map(p=><div className="ox-product-row" key={p.id}><ProductPhoto key={p.image} image={p.image} name={p.name}/><div className="ox-product-name"><a href={"/gestao/produtos/"+encodeURIComponent(p.id)}>{p.name}</a><p>{p.offers} {p.offers===1?"checkout associado":"checkouts associados"}</p></div><strong>{money(p.price)}</strong><Status value={p.state==="active"?"Activo":"Arquivado"}/></div>)}</div>}
 </section></Frame>;
}
