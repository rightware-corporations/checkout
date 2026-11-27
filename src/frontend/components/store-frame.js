import { logout } from "@/backend/identity/actions";
import { reviewEnabled } from "@/backend/review/access";
import { Glyph } from "./orderx-glyph";
import "./foundation.css";

const pages=[["Resumo","/gestao","home"],["Publicar produto","/gestao/publicar","plus"],["Meus checkouts","/gestao/checkouts","link"],["Encomendas","/gestao/encomendas","orders"],["Clientes","/gestao/clientes","people"]];
const catalog={
 Resumo:["home","Visão geral"],Catálogo:["box","Comércio"],"Publicar produto":["plus","Comércio"],Checkouts:["link","Comércio"],"Meus checkouts":["link","Comércio"],Encomendas:["orders","Comércio"],Clientes:["people","Comércio"],Entregas:["truck","Operação"],Stock:["box","Operação"],Tarefas:["task","Operação"],Notificações:["bell","Operação"],Cobranças:["wallet","Operação"],Relatórios:["chart","Operação"],Equipa:["people","Administração"],Definições:["settings","Administração"],Planos:["wallet","Administração"],Suporte:["help","Administração"]
};
function Navigation({items,active}){
 const groups=["Visão geral","Comércio","Operação","Administração"];
 return <nav aria-label="Operação da loja">{groups.map(group=>{const list=items.filter(([label])=>catalog[label]?.[1]===group);if(!list.length)return null;return <div className="ox-nav-group" key={group}><p className="ox-rail-caption">{group}</p>{list.map(([label,url])=>{const content=<><Glyph name={catalog[label]?.[0]}/><span className="ox-nav-label">{label}</span>{!url&&<span className="ox-nav-soon">·</span>}</>;return url?<a key={label} href={url} title={label} aria-current={active===label?"page":undefined}>{content}</a>:<span key={label} className="ox-disabled" aria-disabled="true" title={label+" — em desenho"}>{content}<span className="ox-sr"> — em desenho</span></span>})}</div>})}</nav>
}
export function Frame({active,children,review}){
 const root=review?`/gestao/revisao/${review.store.id}/${review.role.id}`:"/gestao";
 const items=review?review.role.modules.map(label=>[label,label==="Resumo"?root:null]):pages;
 const storeName=review?review.store.name:"Loja operacional";
 return <div className="workspace ox-workspace">
 <a className="ox-skip" href="#ox-content">Saltar para conteúdo</a>
 <aside className="rail ox-rail">
 <a href={root} className="ox-brand" aria-label="ORDERX — resumo"><img className="ox-logo-compact" src="/brand/simbolo.svg" alt=""/><span className="ox-brand-name" aria-hidden="true">ORDER<span className="ox-accent">X</span></span></a>
 <div className="ox-desktop-nav"><Navigation items={items} active={active}/></div>
 <details className="ox-mobile-nav"><summary><span>Menu de navegação</span><Glyph name="chevron" size={16}/></summary><Navigation items={items} active={active}/></details>
 <div className="ox-rail-footer">{review?<a className="ox-footer-link" href="/gestao"><Glyph name="shop"/><span>Gestão operacional</span></a>:reviewEnabled()?<a className="ox-footer-link" href="/gestao/revisao"><Glyph name="home"/><span>Revisão privada</span></a>:null}<form action={logout}><button title="Sair"><Glyph name="exit"/><span>Sair</span></button></form></div>
 </aside>
 <main className="desk ox-desk" id="ox-content">
 <header className="ox-topbar"><div className="ox-workspace-id"><div className="ox-store-icon"><Glyph name="shop" size={22}/></div><div><span className="ox-caption">{review?"ESPAÇO DE REVISÃO":"ESPAÇO DE TRABALHO"}</span><strong>{storeName}</strong></div></div><div className="ox-top-actions">{review&&<details className="ox-context-menu"><summary><span>Alterar contexto</span><Glyph name="chevron" size={16}/></summary><div className="ox-context-panel"><p>Simulação privada · não concede permissões.</p><strong>Loja</strong><div className="ox-context-links">{review.stores.map(s=><a key={s.id} aria-current={s.id===review.store.id?"true":undefined} href={`/gestao/revisao/${s.id}/${review.role.id}`}>{s.name}</a>)}</div><strong>Perfil</strong><div className="ox-context-links">{review.roles.map(r=><a key={r.id} aria-current={r.id===review.role.id?"true":undefined} href={`/gestao/revisao/${review.store.id}/${r.id}`}>{r.label}</a>)}</div></div></details>}<span className="ox-role">{review?review.role.label+" · simulado":"Vendedor único"}</span></div></header>
 {review&&<div className="ox-review-notice"><span className="ox-live-dot"/><span>Revisão privada · dados fictícios · leitura apenas</span></div>}
 {children}</main></div>
}
