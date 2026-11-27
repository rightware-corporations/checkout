import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureCatalog, getProduct, updateProduct } from "../src/backend/catalog/repository.mjs";

function open(path){const db=new DatabaseSync(path);db.exec("PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;");return db;}
test("Migração em ficheiro, backup/restauro e revisão concorrente",()=>{
 const directory=mkdtempSync(join(tmpdir(),"orderx-catalog-"));
 const path=join(directory,"legacy.sqlite"),backup=join(directory,"backup.sqlite"),restored=join(directory,"restored.sqlite");
 let db,second,old;
 try {
  db=open(path);db.exec(`CREATE TABLE links(slug TEXT PRIMARY KEY,title TEXT NOT NULL,price INTEGER NOT NULL,delivery INTEGER NOT NULL,max_qty INTEGER NOT NULL,image TEXT NOT NULL,bairro INTEGER NOT NULL);
  CREATE TABLE orders(ref TEXT PRIMARY KEY,slug TEXT NOT NULL REFERENCES links(slug),total INTEGER NOT NULL);
  CREATE TABLE sessions(digest TEXT PRIMARY KEY,expires INTEGER NOT NULL);
  INSERT INTO links VALUES ('old','Produto original',99900,10000,2,'',1);
  INSERT INTO orders VALUES ('ENC-OLD','old',209800);
  INSERT INTO sessions VALUES ('fixture',1234);`);
  const snapshot=()=>Object.fromEntries(["links","orders","sessions"].map(table=>[table,db.prepare("SELECT * FROM "+table).all()]));
  const before=snapshot();db.close();db=null;copyFileSync(path,backup);
  db=open(path);ensureCatalog(db);db.close();db=null;
  db=open(path);ensureCatalog(db);assert.deepEqual(snapshot(),before);
  second=open(path);const p=getProduct(db,"legacy:old");
  const values={name:"Novo nome",description:"Teste",price:120000,image:""};
  assert.equal(updateProduct(second,p.id,p.revision,values),"ok");
  assert.equal(updateProduct(db,p.id,p.revision,values),"conflict");
  assert.deepEqual(snapshot(),before);assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(),[]);
  assert.equal(db.prepare("PRAGMA integrity_check").get().integrity_check,"ok");
  second.close();second=null;db.close();db=null;
  copyFileSync(backup,restored);old=open(restored);
  assert.equal(old.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE name='products'").get().n,0);
  for(const table of Object.keys(before))assert.deepEqual(old.prepare("SELECT * FROM "+table).all(),before[table]);
  assert.equal(old.prepare("PRAGMA integrity_check").get().integrity_check,"ok");
 } finally {for(const conn of [db,second,old])if(conn)conn.close();rmSync(directory,{recursive:true,force:true});}
});
