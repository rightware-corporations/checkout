"use client";
import { useState } from "react";
export default function Copy({ path }) {
  const [msg, set] = useState("");
  return (
    <>
      <button
        className="secondary"
        onClick={async () => {
          const url = new URL(path, location.origin).href;
          try {
            await navigator.clipboard.writeText(url);
            set("Copiado");
          } catch {
            set(url);
          }
        }}
      >
        Copiar link
      </button>
      <small role="status">{msg}</small>
    </>
  );
}
