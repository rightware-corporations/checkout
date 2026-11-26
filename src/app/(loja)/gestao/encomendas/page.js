import { requireSeller } from "@/backend/identity/require-seller";
import { Frame } from "@/frontend/components/store-frame";
export const dynamic="force-dynamic";
import { db } from "@/backend/persistence/sqlite";
import { money } from "@/shared/money";
import { changeState } from "@/backend/orders/actions";
export default async function Page(){await requireSeller();const orders=db().prepare("SELECT o.*,l.title FROM orders o JOIN links l USING(slug) ORDER BY o.rowid DESC").all();return <Frame active="Encomendas"><p className="eyebrow">ATENDIMENTO E ENTREGA</p><h1>Encomendas</h1><section>        {!orders.length && <p>Ainda não recebeste encomendas.</p>}
        {orders.map((o) => (
          <article key={o.ref}>
            <strong>
              {o.name} · {money(o.total)}
            </strong>
            <p>
              {o.title} × {o.qty} · Entrega {money(o.delivery)}
            </p>
            <p>
              {o.phone} ·{" "}
              {[o.address, o.bairro, o.city, o.province]
                .filter(Boolean)
                .join(", ")}
            </p>
            <small>{o.ref}</small>
            <form action={changeState} className="inline">
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
          </article>
        ))}
</section></Frame>;}