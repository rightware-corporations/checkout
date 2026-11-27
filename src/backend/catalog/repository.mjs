import { randomUUID } from "node:crypto";

export function validateProduct(values) {
  const name = String(values.name ?? "").trim();
  const description = String(values.description ?? "").trim();
  const image = String(values.image ?? "").trim();
  const raw = String(values.price ?? "").trim();
  const price = /^\d{1,7}([.,]\d{1,2})?$/.test(raw) ? Math.round(Number(raw.replace(",", ".")) * 100) : NaN;
  const errors = {};
  if (!name || name.length > 100) errors.name = "Indica um nome com 1 a 100 caracteres.";
  if (description.length > 2000) errors.description = "Usa até 2.000 caracteres.";
  if (!Number.isSafeInteger(price) || price <= 0) errors.price = "Indica um preço positivo em meticais.";
  if (image && (image.length > 1500 || !URL.canParse(image) || new URL(image).protocol !== "https:" || new URL(image).username || new URL(image).password)) errors.image = "Usa um endereço HTTPS válido, sem credenciais.";
  return Object.keys(errors).length ? {errors} : {value:{name, description, image, price}};
}

function transaction(conn, work) {
  conn.exec("BEGIN IMMEDIATE");
  try { const value = work(); conn.exec("COMMIT"); return value; }
  catch (error) { conn.exec("ROLLBACK"); throw error; }
}

export function ensureCatalog(conn) {
  transaction(conn, () => {
    conn.exec(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL, image TEXT NOT NULL DEFAULT '',
      state TEXT NOT NULL DEFAULT 'active' CHECK(state IN ('active','archived')),
      revision INTEGER NOT NULL DEFAULT 1 CHECK(revision >= 1),
      created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS product_links (
      slug TEXT PRIMARY KEY REFERENCES links(slug), product_id TEXT NOT NULL REFERENCES products(id)
    );
    CREATE INDEX IF NOT EXISTS product_links_product ON product_links(product_id);
    INSERT INTO products(id,name,price,image)
      SELECT 'legacy:' || l.slug,l.title,l.price,l.image FROM links l
      WHERE NOT EXISTS (SELECT 1 FROM product_links p WHERE p.slug=l.slug);
    INSERT INTO product_links(slug,product_id)
      SELECT l.slug,'legacy:' || l.slug FROM links l
      WHERE NOT EXISTS (SELECT 1 FROM product_links p WHERE p.slug=l.slug);`);
  });
}

// The existing publication path still owns link terms. Register its product atomically.
export function publishLegacyLink(conn, {slug,title,price,delivery,max,image,bairro}) {
  return transaction(conn, () => {
    conn.prepare("INSERT INTO links(slug,title,price,delivery,max_qty,image,bairro) VALUES (?,?,?,?,?,?,?)").run(slug,title,price,delivery,max,image,bairro);
    conn.prepare("INSERT INTO products(id,name,price,image) VALUES (?,?,?,?)").run("legacy:"+slug,title,price,image);
    conn.prepare("INSERT INTO product_links(slug,product_id) VALUES (?,?)").run(slug,"legacy:"+slug);
  });
}

export function listProducts(conn, {q="",state=""}={}) {
  const query = typeof q === "string" ? q.trim().slice(0,100).toLocaleLowerCase("pt") : "";
  const status = ["active","archived"].includes(state) ? state : "";
  const all = conn.prepare("SELECT p.*, (SELECT COUNT(*) FROM product_links l WHERE l.product_id=p.id) AS offers FROM products p ORDER BY p.rowid DESC").all();
  return {query,state:status,total:all.length,active:all.filter(p=>p.state==="active").length,archived:all.filter(p=>p.state==="archived").length,products:all.filter(p=>(!status||p.state===status)&&(!query||[p.name,p.description].some(v=>v.toLocaleLowerCase("pt").includes(query))))};
}

export function getProduct(conn,id) {
  const product=conn.prepare("SELECT * FROM products WHERE id=?").get(id);
  if(!product)return null;
  const offers=conn.prepare("SELECT l.slug,l.title,l.price,l.delivery,l.max_qty FROM product_links p JOIN links l ON l.slug=p.slug WHERE p.product_id=? ORDER BY l.rowid DESC").all(id);
  return {...product,offers};
}

export function createProduct(conn,value) {
  const id=randomUUID();
  conn.prepare("INSERT INTO products(id,name,description,price,image) VALUES (?,?,?,?,?)").run(id,value.name,value.description,value.price,value.image);
  return id;
}

export function updateProduct(conn,id,revision,value) {
  const result=conn.prepare("UPDATE products SET name=?,description=?,price=?,image=?,revision=revision+1 WHERE id=? AND revision=? AND state='active'").run(value.name,value.description,value.price,value.image,id,revision);
  return result.changes===1 ? "ok" : "conflict";
}

export function changeProductState(conn,id,revision,state) {
  if(!["active","archived"].includes(state))return "invalid";
  return transaction(conn,()=>{
    const current=getProduct(conn,id);
    if(!current||current.revision!==revision||current.state===state)return "conflict";
    // Archive of products with live legacy offers awaits a commercial policy decision.
    if(state==="archived"&&current.offers.length)return "linked";
    conn.prepare("UPDATE products SET state=?,revision=revision+1 WHERE id=? AND revision=?").run(state,id,revision);
    return "ok";
  });
}
