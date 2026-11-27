"use server";
import { redirect } from "next/navigation";
import { passwordMatches, openSession, closeSession } from "./session";
export async function login(form) {
  if (!passwordMatches(String(form.get("password") ?? "")))
    redirect("/gestao?erro=acesso");
  await openSession();
  redirect("/gestao");
}
export async function logout() {
  await closeSession();
  redirect("/gestao");
}
