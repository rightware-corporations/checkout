import { requireSeller } from "@/backend/identity/require-seller";
import { Frame } from "@/frontend/components/store-frame";
export const dynamic="force-dynamic";
import { db } from "@/backend/persistence/sqlite";
import { money } from "@/shared/money";
import Copy from "@/frontend/components/copy-link";
export default async function Page(){await requireSeller();const links=db().prepare("SELECT * FROM links ORDER BY rowid DESC").all();return <Frame active="Meus checkouts"><p className="eyebrow">DISTRIBUIÇÃO</p><h1>Meus checkouts</h1><section>          {links.length === 0 && <p>Os links publicados aparecem aqui.</p>}
          {links.map((l) => (
            <article key={l.slug}>
              <strong>{l.title}</strong>
              <p>{money(l.price)}</p>
              <a href={"/c/" + l.slug}>Abrir checkout</a>{" "}
              <Copy path={"/c/" + l.slug} />
            </article>
          ))}
</section><a className="pill" href="/gestao/publicar">Publicar produto ↗</a></Frame>;}