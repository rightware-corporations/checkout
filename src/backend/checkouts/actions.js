"use server";
import { redirect } from "next/navigation";
import { db } from "../persistence/sqlite";
import { field } from "../forms/field";
import { requireSeller } from "../identity/require-seller";
import { randomBytes } from "node:crypto";
import { publishLegacyLink } from "../catalog/repository.mjs";
function cents(value) {
  if (!/^\d{1,7}([.,]\d{1,2})?$/.test(value)) return NaN;
  return Math.round(Number(value.replace(",", ".")) * 100);
}
export async function publish(form) {
  await requireSeller();
  const title = field(form, "title"),
    price = cents(field(form, "price")),
    delivery = cents(field(form, "delivery"));
  const max = Number(field(form, "max")),
    image = field(form, "image");
  if (
    !title ||
    title.length > 100 ||
    !(price > 0) ||
    !(delivery >= 0) ||
    !Number.isInteger(max) ||
    max < 1 ||
    max > 99 ||
    (image &&
      (image.length > 1500 ||
        !URL.canParse(image) ||
        new URL(image).protocol !== "https:"))
  )
    redirect("/gestao/publicar?erro=produto");
  const slug = randomBytes(9).toString("hex");
  publishLegacyLink(db(), {slug,title,price,delivery,max,image,bairro:form.has("bairro") ? 1 : 0});
  redirect("/gestao/checkouts");
}
