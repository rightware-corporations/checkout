import { logout } from "@/backend/identity/actions";

const pages = [["Resumo","/gestao"],["Publicar produto","/gestao/publicar"],["Meus checkouts","/gestao/checkouts"],["Encomendas","/gestao/encomendas"],["Clientes","/gestao/clientes"]];
export function Frame({active,children}){
  return <div className="workspace"><aside className="rail"><a href="/"><img src="/brand/negativo.svg" alt="ORDERX"/></a><nav aria-label="Operação da loja">{pages.map(([label,url])=><a key={url} aria-current={active===label?"page":undefined} href={url}>{label}</a>)}</nav><form action={logout}><button>Sair</button></form></aside><main className="desk">{children}</main></div>;
}
