import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import {
  randomUUID,
  createHash,
  timingSafeEqual,
  randomBytes,
} from "node:crypto";
import { cookies } from "next/headers";

let database;
export function db() {
  if (database) return database;
  const path = process.env.CHECKOUT_DB || "data/checkout.sqlite";
  mkdirSync(dirname(path), { recursive: true });
  const conn = new DatabaseSync(path);
  conn.exec(`
    PRAGMA journal_mode=WAL;
    PRAGMA foreign_keys=ON;
    PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS links (
      slug TEXT PRIMARY KEY, title TEXT NOT NULL, price INTEGER NOT NULL, delivery INTEGER NOT NULL,
      max_qty INTEGER NOT NULL, image TEXT NOT NULL, bairro INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      ref TEXT PRIMARY KEY, slug TEXT NOT NULL REFERENCES links(slug), submission TEXT NOT NULL,
      name TEXT NOT NULL, phone TEXT NOT NULL, province TEXT NOT NULL, city TEXT NOT NULL,
      bairro TEXT NOT NULL, address TEXT NOT NULL, qty INTEGER NOT NULL, price INTEGER NOT NULL,
      delivery INTEGER NOT NULL, total INTEGER NOT NULL, state TEXT NOT NULL DEFAULT 'Recebida',
      created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE(slug,submission)
    );
    CREATE TABLE IF NOT EXISTS sessions (digest TEXT PRIMARY KEY, expires INTEGER NOT NULL);
  `);
  database = conn;
  return conn;
}
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
export const reference = () => "ENC-" + randomUUID();
