import { db } from "@/backend/store";
import { money } from "@/shared/money";
import { notFound } from "next/navigation";
export default async function Page({ searchParams }) {
  const { ref } = await searchParams;
  const o =
    typeof ref === "string" &&
    db().prepare("SELECT total FROM orders WHERE ref=?").get(ref);
  if (!o) notFound();
  return (
    <main className="narrow">
      <h1>Encomenda recebida</h1>
      <p>
        Total encomendado <strong>{money(o.total)}</strong>
      </p>
      <p>Guarda a referência para acompanhar o pedido com o vendedor.</p>
      <small>{ref}</small>
    </main>
  );
}
