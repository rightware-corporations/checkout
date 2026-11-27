"use client";
import { useState } from "react";
import { money } from "@/shared/money";

function cents(text) {
  const value = String(text).trim();
  return /^\d{1,7}([.,]\d{1,2})?$/.test(value)
    ? Math.round(Number(value.replace(",", ".")) * 100)
    : NaN;
}

export default function CheckoutEditor({action, children}) {
  const [preview, setPreview] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  function review(event) {
    const form = event.currentTarget.form;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const title = data.get("title").trim();
    const price = cents(data.get("price"));
    const delivery = cents(data.get("delivery"));
    if (!title || !(price > 0) || !(delivery >= 0)) {
      setError("Indica o nome, um preço positivo e uma entrega válida em meticais.");
      return;
    }
    setError("");
    setQuantity(1);
    setPreview({title, price, delivery, max:Number(data.get("max"))});
  }
  return <form action={action}>
    <div style={{display:"grid",gap:16}} onChange={() => { setPreview(null); setError(""); }}>{children}</div>
    <button type="button" className="secondary" onClick={review}>Pré-visualizar checkout</button>
    {error && <p role="alert">{error}</p>}
    {preview && <section aria-label="Prévia do checkout">
      <p className="eyebrow">PRÉVIA DO COMPRADOR</p><h2>{preview.title}</h2>
      <p>{money(preview.price)} por unidade</p>
      <label>Quantidade da prévia<select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
        {Array.from({length:preview.max},(_,i)=><option key={i+1}>{i+1}</option>)}
      </select></label>
      <p>Entrega fixa · {money(preview.delivery)}</p>
      <strong aria-live="polite">Total {money(preview.price*quantity+preview.delivery)}</strong>
    </section>}
    <button type="submit">Publicar link</button>
  </form>;
}
