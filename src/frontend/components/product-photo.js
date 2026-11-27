"use client";
import { useState } from "react";
import { Glyph } from "./orderx-glyph";
export function ProductPhoto({image,name}) {
  const [failed,setFailed]=useState(false);
  return <div className="ox-product-photo">{image&&!failed?<img src={image} alt={name} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<div className="ox-product-placeholder"><Glyph name="box" size={28}/><span>{image?"Fotografia indisponível":"Sem fotografia"}</span></div>}</div>;
}
