import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { Frame } from "@/frontend/components/store-frame";
import { CommandHeader, SectionHeading, Empty, Status } from "@/frontend/components/foundation-parts";
import { ProductPhoto } from "@/frontend/components/product-photo";
import { money } from "@/shared/money";
export const dynamic="force-dynamic";
import { notFound } from "next/navigation";
import { getProduct } from "@/backend/catalog/repository.mjs";
import { setCatalogState } from "@/backend/catalog/actions";
import { ProductStateForm } from "@/frontend/components/catalog-form";
export default async function Page({params}){
 await requireSeller();const {id}=await params;const p=getProduct(db(),id);if(!p)notFound();
 const href="/gestao/produtos/"+encodeURIComponent(p.id);
 return <Frame active="Catálogo"><a className="ox-back" href="/gestao/produtos">← Voltar ao catálogo</a><CommandHeader eyebrow="FICHA DO PRODUTO" title={p.name} description="Informação de catálogo e ligações comerciais." action={p.state==="active"&&<a className="pill ox-primary" href={href+"/editar"}>Editar produto</a>}/>
 <section className="ox-product-detail"><ProductPhoto key={p.image} image={p.image} name={p.name}/><div><Status value={p.state==="active"?"Activo":"Arquivado"}/><p className="ox-caption">Preço base</p><strong className="ox-product-price">{money(p.price)}</strong><p className="ox-product-description">{p.description||"Sem descrição."}</p><p className="ox-catalog-note">Stock real ainda não integrado.</p></div></section>
 <section><SectionHeading title="Checkouts associados" description="Os preços publicados são independentes do preço base."/>
 {!p.offers.length?<Empty title="Sem checkouts associados">A criação de ofertas reutilizáveis será disponibilizada no próximo pacote.</Empty>:<div className="ox-catalog-offers">{p.offers.map(o=><article key={o.slug}><div><strong>{o.title}</strong><p>{money(o.price)} · Entrega {money(o.delivery)}</p></div><a href={"/c/"+encodeURIComponent(o.slug)}>Abrir checkout</a></article>)}</div>}
 </section><section><SectionHeading title="Estado do catálogo" description="O arquivo nunca elimina a ficha ou os pedidos."/><ProductStateForm product={{state:p.state,revision:p.revision,offerCount:p.offers.length}} action={setCatalogState.bind(null,p.id)}/></section></Frame>;
}
