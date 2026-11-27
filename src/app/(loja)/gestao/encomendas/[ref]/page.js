import { notFound } from "next/navigation";
import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { changeState } from "@/backend/orders/actions";
import { Frame } from "@/frontend/components/store-frame";
import { money } from "@/shared/money";

export default async function OrderDetail({ params }) {
  await requireSeller();
  const { ref } = await params;
  const o = db().prepare("SELECT o.*, l.title FROM orders o JOIN links l USING(slug) WHERE o.ref = ?").get(ref);
  if (!o) notFound();
  return <Frame active="Encomendas">
    <a href="/gestao/encomendas">← Encomendas</a>
    <p className="eyebrow">FICHA DA ENCOMENDA</p>
    <h1>{o.name}</h1>
    <section><small>{o.ref}</small><h2>{o.title}</h2>
      <p>{o.qty} × {money(o.price)} · Entrega {money(o.delivery)}</p>
      <strong>Total {money(o.total)}</strong></section>
    <section><h2>Contacto e entrega</h2>
      <p>{o.phone}</p><p>{[o.address,o.bairro,o.city,o.province].filter(Boolean).join(", ")}</p>
    </section>
    <section><h2>Acompanhamento</h2>            <form action={changeState} className="inline">
              <input type="hidden" name="ref" value={o.ref} />
              <label>
                Estado
                <select aria-label="Estado" name="state" defaultValue={o.state}>
                  {[
                    "Recebida",
                    "Em processamento",
                    "Entregue",
                    "Cancelada",
                  ].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <button>Guardar estado</button>
            </form>
    </section>
  </Frame>;
}
