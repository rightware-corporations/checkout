"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireSeller } from "../identity/require-seller";
import { db } from "../persistence/sqlite";
import { field } from "../forms/field";
import { validateProduct, createProduct, updateProduct, changeProductState } from "./repository.mjs";

function values(form) {
  return Object.fromEntries(["name","description","price","image"].map(key=>[key,field(form,key)]));
}
function finish(id) {
  revalidatePath("/gestao/produtos");
  revalidatePath("/gestao/produtos/"+encodeURIComponent(id));
  redirect("/gestao/produtos/"+encodeURIComponent(id));
}
export async function createCatalogProduct(previous,form) {
  await requireSeller();
  const result=validateProduct(values(form));
  if(result.errors)return {errors:result.errors};
  let id;
  try { id=createProduct(db(),result.value); }
  catch { return {message:"Não foi possível guardar. Verifica a ligação e tenta novamente."}; }
  finish(id);
}
export async function editCatalogProduct(id,previous,form) {
  await requireSeller();
  const result=validateProduct(values(form));
  if(result.errors)return {errors:result.errors};
  let outcome;
  try { outcome=updateProduct(db(),id,Number(field(form,"revision")),result.value); }
  catch { return {message:"Não foi possível guardar. Tenta novamente."}; }
  if(outcome!=="ok")return {message:"A ficha mudou ou foi arquivada. Reabre o produto antes de guardar."};
  finish(id);
}
export async function setCatalogState(id,previous,form) {
  await requireSeller();
  let outcome;
  try { outcome=changeProductState(db(),id,Number(field(form,"revision")),field(form,"state")); }
  catch { return {message:"Não foi possível alterar o estado. Tenta novamente."}; }
  if(outcome==="linked")return {message:"Este produto tem checkouts associados. O arquivo está bloqueado para preservar os links existentes."};
  if(outcome!=="ok")return {message:"A ficha mudou. Reabre o produto e tenta novamente."};
  finish(id);
}
