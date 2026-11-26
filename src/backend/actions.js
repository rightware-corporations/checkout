"use server";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import {
  db,
  seller,
  passwordMatches,
  openSession,
  closeSession,
  reference,
} from "./store";

const field = (form, key) => String(form.get(key) ?? "").trim();
function cents(value) {
  if (!/^\d{1,7}([.,]\d{1,2})?$/.test(value)) return NaN;
  return Math.round(Number(value.replace(",", ".")) * 100);
}
async function requireSeller() {
  if (!(await seller())) redirect("/gestao");
}
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
    redirect("/gestao?erro=produto");
  const slug = randomBytes(9).toString("hex");
  db()
    .prepare("INSERT INTO links VALUES (?,?,?,?,?,?,?)")
    .run(slug, title, price, delivery, max, image, form.has("bairro") ? 1 : 0);
  redirect("/gestao");
}
export async function order(slug, submission, form) {
  const link = db().prepare("SELECT * FROM links WHERE slug=?").get(slug);
  if (!link) redirect("/gestao");
  const qty = Number(field(form, "qty"));
  const [name, phone, province, city, bairro, address] = [
    "name",
    "phone",
    "province",
    "city",
    "bairro",
    "address",
  ].map((k) => field(form, k));
  if (
    !/^[0-9a-f-]{36}$/.test(submission) ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > link.max_qty ||
    !/^(?:\+?258)?\d{9}$/.test(phone.replace(/[ -]/g, "")) ||
    ![name, province, city, address].every(
      (v) => v.length > 0 && v.length <= 240,
    ) ||
    bairro.length > 120
  )
    redirect("/c/" + slug + "?erro=dados");
  db()
    .prepare(
      `INSERT INTO orders (ref,slug,submission,name,phone,province,city,bairro,address,qty,price,delivery,total)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(slug,submission) DO NOTHING`,
    )
    .run(
      reference(),
      slug,
      submission,
      name,
      phone,
      province,
      city,
      link.bairro ? bairro : "",
      address,
      qty,
      link.price,
      link.delivery,
      qty * link.price + link.delivery,
    );
  const { ref } = db()
    .prepare("SELECT ref FROM orders WHERE slug=? AND submission=?")
    .get(slug, submission);
  redirect("/recebido?ref=" + ref);
}
export async function changeState(form) {
  await requireSeller();
  const state = field(form, "state");
  if (["Recebida", "Em processamento", "Entregue", "Cancelada"].includes(state))
    db()
      .prepare("UPDATE orders SET state=? WHERE ref=?")
      .run(state, field(form, "ref"));
  redirect("/gestao");
}
