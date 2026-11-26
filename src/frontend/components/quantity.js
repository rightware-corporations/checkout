"use client";
import { useState } from "react";
import { money } from "@/shared/money";
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
        <span>Entrega {money(delivery)}</span>
        <strong aria-live="polite">
          Total {money(price * qty + delivery)}
        </strong>
      </div>
    </>
  );
}
