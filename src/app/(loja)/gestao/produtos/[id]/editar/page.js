import { notFound,redirect } from "next/navigation";
import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { getProduct } from "@/backend/catalog/repository.mjs";
import { editCatalogProduct } from "@/backend/catalog/actions";
import { Frame } from "@/frontend/components/store-frame";
import { CommandHeader } from "@/frontend/components/foundation-parts";
import { CatalogForm } from "@/frontend/components/catalog-form";
export const dynamic="force-dynamic";
export default async function Page({params}){await requireSeller();const {id}=await params;const p=getProduct(db(),id);if(!p)notFound();const href="/gestao/produtos/"+encodeURIComponent(p.id);if(p.state!=="active")redirect(href);return <Frame active="Catálogo"><a className="ox-back" href={href}>← Voltar ao produto</a><CommandHeader eyebrow="COMÉRCIO · CATÁLOGO" title="Editar produto" description="Actualiza a ficha sem alterar os termos dos links publicados."/><section><CatalogForm product={{id:p.id,name:p.name,description:p.description,price:p.price,image:p.image,revision:p.revision}} action={editCatalogProduct.bind(null,p.id)}/></section></Frame>;}
