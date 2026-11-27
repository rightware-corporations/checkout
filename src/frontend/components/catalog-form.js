"use client";
import { useActionState,useState } from "react";
import { ProductPhoto } from "./product-photo";
const initial={errors:{},message:""};
export function CatalogForm({action,product=null}) {
 const [state,submit,pending]=useActionState(action,initial);
 const [values,setValues]=useState({name:product?.name||"",description:product?.description||"",price:product?(product.price/100).toFixed(2).replace(".",","):"",image:product?.image||""});
 function props(key){return {name:key,value:values[key],onChange:e=>setValues(v=>({...v,[key]:e.target.value})), "aria-invalid":Boolean(state.errors?.[key]),"aria-describedby":state.errors?.[key]?"error-"+key:undefined};}
 function error(key){return state.errors?.[key]&&<small id={"error-"+key} role="alert" className="ox-catalog-error">{state.errors[key]}</small>;}
 const safeImage=values.image.startsWith("https://")&&URL.canParse(values.image)&&!new URL(values.image).username&&!new URL(values.image).password?values.image:"";
 return <form action={submit} className="ox-catalog-form">
  {product&&<input type="hidden" name="revision" value={product.revision}/>}
  <fieldset disabled={pending}><legend className="ox-sr">Dados do produto</legend>
   <label>Nome do produto<input {...props("name")} required maxLength={100}/>{error("name")}</label>
   <label>Descrição (opcional)<textarea {...props("description")} maxLength={2000} rows={5}/>{error("description")}</label>
   <label>Preço base (MT)<input {...props("price")} inputMode="decimal" required placeholder="999,00"/>{error("price")}</label>
   <label>Fotografia (URL HTTPS, opcional)<input {...props("image")} type="url" maxLength={1500}/>{error("image")}</label>
   <p className="ox-catalog-note">O preço base serve para futuras ofertas. Alterar o produto não modifica links existentes.</p>
  </fieldset>
  <aside className="ox-catalog-preview"><ProductPhoto key={safeImage} image={safeImage} name={values.name||"Produto"}/><strong>{values.name||"Nome do produto"}</strong><p>Prévia da ficha · não é um checkout.</p></aside>
  {state.message&&<p role="alert" className="ox-catalog-error">{state.message}</p>}
  <div className="ox-catalog-actions"><button disabled={pending}>{pending?"A guardar…":"Guardar produto"}</button><a href={product?"/gestao/produtos/"+encodeURIComponent(product.id):"/gestao/produtos"}>Cancelar</a></div>
 </form>;
}
export function ProductStateForm({action,product}) {
 const [state,submit,pending]=useActionState(action,initial);
 const archive=product.state==="active";
 if(archive&&product.offerCount)return <p className="ox-catalog-note">Arquivo indisponível: este produto tem checkouts associados. Nenhum link será desactivado automaticamente.</p>;
 return <details className="ox-catalog-confirm"><summary>{archive?"Arquivar produto":"Reactivar produto"}</summary><form action={submit}><input type="hidden" name="revision" value={product.revision}/><input type="hidden" name="state" value={archive?"archived":"active"}/><p>{archive?"O produto ficará no histórico. Não será apagado.":"O produto voltará ao catálogo activo."}</p><button disabled={pending}>{pending?"A guardar…":archive?"Confirmar arquivo":"Confirmar reactivação"}</button>{state.message&&<p role="alert" className="ox-catalog-error">{state.message}</p>}</form></details>;
}
