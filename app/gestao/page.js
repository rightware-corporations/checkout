import { db, seller, money } from "../../lib/store";
import { login, logout, publish, changeState } from "../actions";
import Copy from "./copy";
export const dynamic = "force-dynamic";
export default async function Page({ searchParams }) {
  const { erro } = await searchParams;
  if (!(await seller()))
    return (
      <main className="narrow">
        <h1>Painel do vendedor</h1>
        <form action={login}>
          <label>
            Palavra-passe
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {erro && <p role="alert">Verifique a palavra-passe.</p>}
          <button>Entrar</button>
        </form>
      </main>
    );
  const links = db().prepare("SELECT * FROM links ORDER BY rowid DESC").all();
  const orders = db()
    .prepare(
      "SELECT o.*,l.title FROM orders o JOIN links l USING(slug) ORDER BY o.rowid DESC",
    )
    .all();
  return (
    <main>
      <header>
        <h1>Gestão de encomendas</h1>
        <form action={logout}>
          <button className="secondary">Sair</button>
        </form>
      </header>
      <div className="grid">
        <section>
          <h2>Publicar produto</h2>
          <form action={publish}>
            <label>
              Nome do produto
              <input name="title" maxLength="100" required />
            </label>
            <label>
              Fotografia (URL HTTPS, opcional)
              <input name="image" type="url" />
            </label>
            <label>
              Preço por unidade (MT)
              <input name="price" inputMode="decimal" required />
            </label>
            <label>
              Entrega fixa (MT)
              <input
                name="delivery"
                defaultValue="0"
                inputMode="decimal"
                required
              />
            </label>
            <label>
              Quantidade máxima
              <input
                name="max"
                type="number"
                min="1"
                max="99"
                defaultValue="2"
                required
              />
            </label>
            <label className="check">
              <input name="bairro" type="checkbox" defaultChecked /> Incluir
              bairro opcional
            </label>
            {erro && <p role="alert">Verifique os dados do produto.</p>}
            <button>Publicar link</button>
          </form>
        </section>
        <section>
          <h2>Meus checkouts</h2>
          {links.length === 0 && <p>Os links publicados aparecem aqui.</p>}
          {links.map((l) => (
            <article key={l.slug}>
              <strong>{l.title}</strong>
              <p>{money(l.price)}</p>
              <a href={"/c/" + l.slug}>Abrir checkout</a>{" "}
              <Copy path={"/c/" + l.slug} />
            </article>
          ))}
        </section>
      </div>
      <section>
        <h2>Encomendas</h2>
        {!orders.length && <p>Ainda não recebeste encomendas.</p>}
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
      </section>
    </main>
  );
}
