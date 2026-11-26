import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { Frame } from "@/frontend/components/store-frame";
import { money } from "@/shared/money";

export default async function Orders() {
  await requireSeller();
  const orders = db().prepare("SELECT o.ref,o.name,o.total,o.state,l.title FROM orders o JOIN links l USING(slug) ORDER BY o.rowid DESC").all();
  return <Frame active="Encomendas">
    <p className="eyebrow">ATENDIMENTO E ENTREGA</p><h1>Encomendas</h1>
    <section>{!orders.length && <p>Ainda não recebeste encomendas.</p>}
      {orders.map(o => <article key={o.ref}>
        <strong>{o.name} · {money(o.total)}</strong><p>{o.title} · {o.state}</p>
        <a href={"/gestao/encomendas/"+encodeURIComponent(o.ref)}>{o.ref}</a>
      </article>)}
    </section>
  </Frame>;
}
