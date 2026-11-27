import { seller } from "@/backend/identity/session";
import { login } from "@/backend/identity/actions";
import { db } from "@/backend/persistence/sqlite";
import { money } from "@/shared/money";
import { Frame } from "@/frontend/components/store-frame";
import { OrderRow, Metrics, CommandHeader, FocusPanel, SectionHeading, Empty } from "@/frontend/components/foundation-parts";
import { Glyph } from "@/frontend/components/orderx-glyph";
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
 return <Frame active="Resumo"><CommandHeader eyebrow="CENTRO DE OPERAÇÕES" title="Visão geral de vendas" description="Acompanha as encomendas e os links publicados da tua loja." action={<a className="pill ox-primary" href="/gestao/publicar"><Glyph name="plus" size={18}/>Publicar produto</a>}/><FocusPanel label="PRIORIDADE OPERACIONAL" title={stats.novas?(`${stats.novas} ${stats.novas===1?"pedido por processar":"pedidos por processar"}`):"A tua operação está em dia"} description={stats.novas?"Consulta a fila de encomendas para confirmar os dados e acompanhar os pedidos.":"Publica um checkout ou consulta o histórico das encomendas."} action={<a className="ox-focus-action" href="/gestao/encomendas">Abrir encomendas <Glyph name="arrow" size={18}/></a>} meta={<><span>Encomendas recebidas</span><strong>{stats.total}</strong><small>Registos operacionais</small></>}/><Metrics metrics={[["Encomendas",stats.total,"Total de registos"],["Por processar",stats.novas,"Estado Recebida"],["Valor de pedidos não cancelados",money(stats.valor),"Não representa cobranças recebidas"]]}/><section><SectionHeading title="Encomendas recentes" description="Abre uma referência para consultar o detalhe." action={<a className="ox-text-link" href="/gestao/encomendas">Ver todas <Glyph name="arrow" size={16}/></a>}/>{recentes.map(o=><OrderRow key={o.ref} order={o} href={"/gestao/encomendas/"+encodeURIComponent(o.ref)}/>)}{!recentes.length&&<Empty title="Ainda sem encomendas">Publica o primeiro checkout para começares a receber pedidos.</Empty>}</section></Frame>;
}
