import { requireSeller } from "@/backend/identity/require-seller";
import { db } from "@/backend/persistence/sqlite";
import { Frame } from "@/frontend/components/store-frame";

export default async function Customers() {
  await requireSeller();
  const orders = db().prepare("SELECT ref,name,phone FROM orders ORDER BY rowid DESC").all();
  const contacts = new Map();
  for (const order of orders) {
    const phone = order.phone.replace(/\D/g, "").slice(-9);
    if (!contacts.has(phone)) contacts.set(phone, { ...order, count: 0 });
    contacts.get(phone).count++;
  }
  return <Frame active="Clientes">
    <p className="eyebrow">ATENDIMENTO</p><h1>Clientes</h1>
    <section><h2>Contactos das encomendas</h2>
      {!contacts.size && <p>Os contactos aparecem aqui quando a loja recebe a primeira encomenda.</p>}
      {Array.from(contacts, ([phone, contact]) => <article key={phone}>
        <strong>{contact.name}</strong><p>{contact.phone} · {contact.count} {contact.count===1?"encomenda":"encomendas"}</p>
        <a href={"/gestao/encomendas/"+encodeURIComponent(contact.ref)}>Abrir último pedido</a>
      </article>)}
    </section>
  </Frame>;
}
