import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { ensureCatalog, publishLegacyLink, listProducts, getProduct, createProduct, updateProduct, changeProductState, validateProduct } from "../src/backend/catalog/repository.mjs";
function setup(){
 const db=new DatabaseSync(":memory:");
 db.exec(`PRAGMA foreign_keys=ON;
 CREATE TABLE links(slug TEXT PRIMARY KEY,title TEXT NOT NULL,price INTEGER NOT NULL,delivery INTEGER NOT NULL,max_qty INTEGER NOT NULL,image TEXT NOT NULL,bairro INTEGER NOT NULL);
 CREATE TABLE orders(ref TEXT PRIMARY KEY,slug TEXT NOT NULL REFERENCES links(slug),submission TEXT NOT NULL,name TEXT NOT NULL,phone TEXT NOT NULL,province TEXT NOT NULL,city TEXT NOT NULL,bairro TEXT NOT NULL,address TEXT NOT NULL,qty INTEGER NOT NULL,price INTEGER NOT NULL,delivery INTEGER NOT NULL,total INTEGER NOT NULL,state TEXT NOT NULL DEFAULT 'Recebida',created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(slug,submission));
 INSERT INTO links VALUES ('a','Creme',99900,10000,2,'',1),('b','Creme',99900,10000,2,'',1);
 INSERT INTO orders(ref,slug,submission,name,phone,province,city,bairro,address,qty,price,delivery,total) VALUES ('ENC-TEST','a','test','Fictício','841234567','Maputo','Matola','','Rua de teste',2,99900,10000,209800);`);
 return db;
}
const input={name:"Sérum",description:"Descrição",price:"999,00",image:""};
const value=validateProduct(input).value;
test("Aditiva, preserva links, pedidos e não funde produtos iguais",()=>{
 const db=setup(),links=db.prepare("SELECT * FROM links").all(),orders=db.prepare("SELECT * FROM orders").all();
 ensureCatalog(db);ensureCatalog(db);
 assert.deepEqual(db.prepare("SELECT * FROM links").all(),links);assert.deepEqual(db.prepare("SELECT * FROM orders").all(),orders);
 assert.equal(listProducts(db).total,2);assert.equal(getProduct(db,"legacy:a").offers[0].slug,"a");assert.equal(getProduct(db,"legacy:b").offers[0].slug,"b");
 assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(),[]);assert.equal(db.prepare("PRAGMA integrity_check").get().integrity_check,"ok");db.close();
});
test("Publicação legada atómica e rollback",()=>{
 const db=setup();ensureCatalog(db);const offer={slug:"c",title:"Novo",price:100,delivery:0,max:1,image:"",bairro:0};
 publishLegacyLink(db,offer);assert.equal(getProduct(db,"legacy:c").offers.length,1);assert.equal(listProducts(db).total,3);
 assert.throws(()=>publishLegacyLink(db,offer));assert.equal(listProducts(db).total,3);
 db.prepare("INSERT INTO products(id,name,price) VALUES ('legacy:d','Collision',1)").run();
 assert.throws(()=>publishLegacyLink(db,{...offer,slug:"d"}));assert.equal(db.prepare("SELECT COUNT(*) AS n FROM links WHERE slug='d'").get().n,0);db.close();
});
test("Criar, pesquisar, editar e impedir escrita desactualizada",()=>{
 const db=setup();ensureCatalog(db);const id=createProduct(db,value);
 assert.equal(getProduct(db,id).price,99900);assert.equal(listProducts(db,{q:"SÉRUM"}).products.length,1);assert.equal(listProducts(db,{q:"%"}).products.length,0);
 assert.equal(updateProduct(db,id,1,{...value,price:120000}),"ok");assert.equal(updateProduct(db,id,1,value),"conflict");assert.equal(getProduct(db,id).price,120000);
 assert.equal(updateProduct(db,"legacy:a",1,{...value,name:"Novo título"}),"ok");assert.equal(getProduct(db,"legacy:a").offers[0].title,"Creme");assert.equal(db.prepare("SELECT total FROM orders WHERE ref='ENC-TEST'").get().total,209800);db.close();
});
test("Arquivo protegido, reactivação, filtro e revisão",()=>{
 const db=setup();ensureCatalog(db);const id=createProduct(db,value);
 assert.equal(changeProductState(db,"legacy:a",1,"archived"),"linked");assert.equal(changeProductState(db,id,1,"archived"),"ok");assert.equal(listProducts(db,{state:"archived"}).products[0].id,id);
 assert.equal(updateProduct(db,id,2,value),"conflict");assert.equal(changeProductState(db,id,1,"active"),"conflict");assert.equal(changeProductState(db,id,2,"active"),"ok");assert.equal(listProducts(db).archived,0);db.close();
});
test("Validação de campos e limites",()=>{
 assert.equal(value.price,99900);assert.equal(validateProduct({...input,price:"0"}).errors.price.length>0,true);assert.ok(validateProduct({...input,price:"1.234"}).errors.price);assert.ok(validateProduct({...input,name:" "}).errors.name);assert.ok(validateProduct({...input,description:"x".repeat(2001)}).errors.description);assert.ok(validateProduct({...input,image:"http://example.com"}).errors.image);assert.ok(validateProduct({...input,image:"https://a:b@example.com"}).errors.image);assert.equal(validateProduct({...input,image:"https://example.com/photo.png"}).value.image,"https://example.com/photo.png");
});
