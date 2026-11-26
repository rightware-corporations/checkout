"use server";
import { redirect } from "next/navigation";
import { db } from "../persistence/sqlite";
import { field } from "../forms/field";
import { requireSeller } from "../identity/require-seller";
import { randomUUID } from "node:crypto";
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
      "ENC-" + randomUUID(),
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
