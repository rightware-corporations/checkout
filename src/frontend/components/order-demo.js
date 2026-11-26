"use client";
import { useState } from "react";
import { money } from "@/shared/money";

export default function OrderDemo() {
  const [quantity,setQuantity]=useState(1);
  const [stage,setStage]=useState(0);
  const total=money(99900*quantity+10000);
  return <section className="demo" id="percurso" aria-label="Demonstração interactiva">
    <div className="demoBar"><b>Amora Cosméticos</b><small>Demonstração</small></div>
    <div className="demoBody"><p className="eyebrow">{["CHECKOUT DO COMPRADOR","FILA DA LOJA","ACOMPANHAMENTO"][stage]}</p>
      <h2>{["Creme de hidratação","Encomenda recebida","Em preparação"][stage]}</h2>
      {stage===0 ? <label>Quantidade<select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}><option value="1">1 unidade</option><option value="2">2 unidades</option></select></label> : <p>ENC-1001 · Creme de hidratação × {quantity}</p>}
      <div className="receiptRow"><span>Produtos</span><b>{money(99900*quantity)}</b></div>
      <div className="receiptRow"><span>Entrega</span><b>{money(10000)}</b></div>
      <div className="receiptTotal"><span>Total</span><b aria-live="polite">{total}</b></div>
      <button onClick={()=>{if(stage===2)setQuantity(1);setStage((stage+1)%3);}}>{["Simular encomenda →","Preparar encomenda →","Recomeçar demonstração"][stage]}</button>
    </div>
  </section>;
}
