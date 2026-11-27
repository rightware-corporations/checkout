import { requireSeller } from "@/backend/identity/require-seller";
import { createCatalogProduct } from "@/backend/catalog/actions";
import { Frame } from "@/frontend/components/store-frame";
import { CommandHeader } from "@/frontend/components/foundation-parts";
import { CatalogForm } from "@/frontend/components/catalog-form";
export const dynamic="force-dynamic";
export default async function Page(){await requireSeller();return <Frame active="Catálogo"><a className="ox-back" href="/gestao/produtos">← Voltar ao catálogo</a><CommandHeader eyebrow="COMÉRCIO · CATÁLOGO" title="Novo produto" description="Cria a ficha reutilizável antes de configurar ofertas."/><section><CatalogForm action={createCatalogProduct}/></section></Frame>;}
