import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
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
