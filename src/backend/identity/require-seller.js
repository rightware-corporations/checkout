import { redirect } from "next/navigation";
import { seller } from "./session";
export async function requireSeller() {
  if (!(await seller())) redirect("/gestao");
}
