import "server-only";
import { createHash, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "../persistence/sqlite";

const digest = (text) => createHash("sha256").update(text).digest();
export function passwordMatches(value) {
  const expected = process.env.SELLER_PASSWORD;
  return Boolean(
    expected &&
    expected.length >= 12 &&
    timingSafeEqual(digest(expected), digest(value)),
  );
}
export async function openSession() {
  const token = randomBytes(32).toString("hex");
  db().prepare("DELETE FROM sessions WHERE expires <= ?").run(Date.now());
  db()
    .prepare("INSERT INTO sessions VALUES (?,?)")
    .run(digest(token).toString("hex"), Date.now() + 8 * 3600000);
  (await cookies()).set("seller", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 28800,
  });
}
export async function seller() {
  const token = (await cookies()).get("seller")?.value;
  return Boolean(
    token &&
    db()
      .prepare("SELECT 1 FROM sessions WHERE digest=? AND expires>?")
      .get(digest(token).toString("hex"), Date.now()),
  );
}
export async function closeSession() {
  const jar = await cookies();
  const token = jar.get("seller")?.value;
  if (token)
    db()
      .prepare("DELETE FROM sessions WHERE digest=?")
      .run(digest(token).toString("hex"));
  jar.delete("seller");
}
