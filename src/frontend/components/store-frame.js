import { logout } from "@/backend/identity/actions";
import { reviewEnabled } from "@/backend/review/access";
import "./foundation.css";

const pages = [["Resumo","/gestao","R"],["Publicar produto","/gestao/publicar","P"],["Meus checkouts","/gestao/checkouts","C"],["Encomendas","/gestao/encomendas","E"],["Clientes","/gestao/clientes","CL"]];
function Navigation({items,active}) {
  return <nav aria-label="Operação da loja">{items.map(([label,url,short])=>url?<a key={label} aria-current={active===label?"page":undefined} href={url}><span className="ox-nav-mark" aria-hidden="true">{short||label.slice(0,2)}</span><span className="ox-nav-label">{label}</span></a>:<span key={label} className="ox-disabled" aria-disabled="true"><span className="ox-nav-mark" aria-hidden="true">{label.slice(0,2)}</span><span className="ox-nav-label">{label} <small>Em desenho</small></span></span>)}</nav>;
}
export function Frame({active,children,review}) {
  const items=review?review.role.modules.map(label=>[label,label==="Resumo"?`/gestao/revisao/${review.store.id}/${review.role.id}`:null]):pages;
  return <div className="workspace ox-workspace">
    <a className="ox-skip" href="#ox-content">Saltar para conteúdo</a>
    <aside className="rail ox-rail">
      <a className="ox-brand" href={review?`/gestao/revisao/${review.store.id}/${review.role.id}`:"/gestao"}><img src="/brand/simbolo.svg" alt=""/><span>ORDER<span className="ox-accent">X</span></span><span className="ox-sr"> ORDERX</span></a>
      <div className="ox-desktop-nav"><p className="ox-rail-caption">{review?"REVISÃO DE PRODUTO":"OPERAÇÃO"}</p><Navigation items={items} active={active}/></div>
      <details className="ox-mobile-nav"><summary>Menu de navegação</summary><Navigation items={items} active={active}/></details>
      <div className="ox-rail-footer">{review?<a href="/gestao">Voltar à gestão operacional</a>:reviewEnabled()?<a href="/gestao/revisao">Revisão privada</a>:null}<form action={logout}><button>Sair</button></form></div>
    </aside>
    <main className="desk ox-desk" id="ox-content">
      <header className="ox-topbar"><div><span className="ox-caption">{review?"AMBIENTE DE REVISÃO · SEM DADOS REAIS":"GESTÃO OPERACIONAL"}</span><strong>{review?review.store.name:"Loja operacional"}</strong></div><span className="ox-role">{review?review.role.label+" (simulado)":"Vendedor único"}</span></header>
      {review&&<div className="ox-review-context"><p>Dados fictícios e leitura apenas. Alterar perfil não concede permissões.</p><div className="ox-context-links" aria-label="Escolher contexto de revisão">{review.stores.map(s=><a key={s.id} aria-current={s.id===review.store.id?"true":undefined} href={`/gestao/revisao/${s.id}/${review.role.id}`}>{s.name}</a>)}</div><div className="ox-context-links" aria-label="Simular perfil">{review.roles.map(r=><a key={r.id} aria-current={r.id===review.role.id?"true":undefined} href={`/gestao/revisao/${review.store.id}/${r.id}`}>{r.label}</a>)}</div></div>}
      {children}
    </main></div>;
}
