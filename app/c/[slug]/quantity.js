"use client";
import { useState } from "react";
const format = (n) =>
  new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n / 100) + " MT";
export default function Quantity({ price, delivery, max }) {
  const [qty, set] = useState(1);
  return (
    <>
      <label>
        Quantidade
        <select
          name="qty"
          value={qty}
          onChange={(e) => set(Number(e.target.value))}
        >
          {Array.from({ length: max }, (_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
      </label>
      <div className="summary">
        <span>Entrega {format(delivery)}</span>
        <strong aria-live="polite">
          Total {format(price * qty + delivery)}
        </strong>
      </div>
    </>
  );
}
