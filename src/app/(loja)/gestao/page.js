import { seller } from "@/backend/identity/session";
import { login } from "@/backend/identity/actions";
import { db } from "@/backend/persistence/sqlite";
import { money } from "@/shared/money";
import { Frame } from "@/frontend/components/store-frame";
export const dynamic="force-dynamic";
export default async function Page({searchParams}) {
 const {erro}=await searchParams;
 if (!(await seller())) return <main className="access"><aside><a href="/"><img src="/brand/negativo.svg" alt="ORDERX"/></a><div><h1>Área do vendedor</h1><p>Consulta os pedidos recebidos, confirma os dados de entrega e acompanha o trabalho da loja.</p></div></aside><section><p className="eyebrow">ACESSO DO VENDEDOR</p><h2>Entrar na loja</h2><p>Usa a palavra-passe configurada para esta loja.</p>        <form action={login}>
          <label>
            Palavra-passe
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {erro && <p role="alert">Verifique a palavra-passe.</p>}
          <button>Entrar</button>
        </form><p className="login-return"><a href="/#percurso">Explorar a demonstração pública →</a></p>
</section></main>;
 const stats=db().prepare("SELECT COUNT(*) AS total, COUNT(CASE WHEN state='Recebida' THEN 1 END) AS novas, COALESCE(SUM(CASE WHEN state!='Cancelada' THEN total ELSE 0 END),0) AS valor FROM orders").get();
 const recentes=db().prepare("SELECT o.ref,o.name,o.state,o.total,l.title FROM orders o JOIN links l USING(slug) ORDER BY o.rowid DESC LIMIT 6").all();
 return <Frame active="Resumo"><p className="eyebrow">OPERAÇÃO DA LOJA</p><h1>Resumo de vendas</h1><div className="stats">{[["Encomendas",stats.total],["Por processar",stats.novas],["Valor encomendado",money(stats.valor)]].map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div><section><h2>Encomendas recentes</h2>{recentes.map(o=><article key={o.ref}><strong>{o.name} · {o.title}</strong><p>{money(o.total)} · {o.state}</p></article>)}{!recentes.length&&<p>Publica o primeiro checkout para começares a receber pedidos.</p>}<a href="/gestao/encomendas">Abrir encomendas →</a></section><a className="pill" href="/gestao/publicar">Publicar produto ↗</a></Frame>;
}
