import { notFound } from "next/navigation";
import { randomUUID } from "node:crypto";
import { db, money } from "../../../lib/store";
import { order } from "../../actions";
import Quantity from "./quantity";
export const dynamic = "force-dynamic";
export default async function Page({ params, searchParams }) {
  const { slug } = await params,
    { erro } = await searchParams;
  const l = db().prepare("SELECT * FROM links WHERE slug=?").get(slug);
  if (!l) notFound();
  return (
    <main className="narrow">
      {l.image && <img src={l.image} alt={l.title} />}
      <h1>{l.title}</h1>
      <p className="price">{money(l.price)} por unidade</p>
      <section>
        <form action={order.bind(null, slug, randomUUID())}>
          <Quantity price={l.price} delivery={l.delivery} max={l.max_qty} />
          <h2>Dados de entrega</h2>
          {[
            ["Nome completo", "name", "name"],
            ["Telefone", "phone", "tel"],
            ["Província", "province", "address-level1"],
            ["Cidade ou distrito", "city", "address-level2"],
            ...(l.bairro ? [["Bairro (opcional)", "bairro", "off"]] : []),
            ["Endereço de entrega", "address", "street-address"],
          ].map(([label, key, auto]) => (
            <label key={key}>
              {label}
              <input
                name={key}
                autoComplete={auto}
                type={key === "phone" ? "tel" : "text"}
                maxLength={key === "bairro" ? 120 : 240}
                required={key !== "bairro"}
              />
            </label>
          ))}
          {erro && (
            <p role="alert">
              Verifique a morada, a quantidade e o telefone de Moçambique.
            </p>
          )}
          <button>Encomendar agora</button>
        </form>
      </section>
    </main>
  );
}
