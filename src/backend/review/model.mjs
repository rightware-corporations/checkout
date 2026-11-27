// V03: independent synthetic orders; no production data or writes.
const source = [
 ["ENC-1001","Cliente fictícia A","Creme Anti-Manchas",2,99900,10000,"Por confirmar","Não iniciada","Por receber",10,"Sara",null,"26/11/2026","Maputo","Facebook"],
 ["ENC-1002","Cliente fictício B","Kit de hidratação",1,135000,10000,"Confirmado","Por preparar","Por receber",14,"Sara",null,"26/11/2026","Maputo","WhatsApp"],
 ["ENC-1003","Cliente fictícia C","Sérum facial",2,89500,10000,"Em expedição","Tentativa falhada","Por receber",12,"Lina","Estafeta fictício","26/11/2026","Matola","Instagram"],
 ["ENC-1004","Cliente fictício D","Sabonete facial",1,65000,10000,"Entregue","Entregue","Conciliado",19,"Sara",null,"25/11/2026","Maputo","WhatsApp"],
 ["ENC-1005","Cliente fictícia E","Loção corporal",1,119000,10000,"Cancelado","Cancelada","Anulado",8,"Lina",null,"25/11/2026","Matola","Facebook"],
 ["ENC-1006","Cliente fictício F","Protector solar",2,75000,10000,"Entregue","Entregue","Declarado / por conciliar",9,"Sara","Estafeta fictício","24/11/2026","Maputo","Instagram"]
];
const orders = source.map(([ref,customer,product,qty,price,fee,order,delivery,payment,physical,assignee,courier,date,province,channel])=>{
 const total=qty*price+fee, complete=order==="Entregue", cancelled=order==="Cancelado", received=payment==="Conciliado"?total:0;
 const reserved=complete||cancelled?0:qty;
 return {ref,customer,product,qty,price,fee,total,order,delivery,payment,physical,reserved,available:physical-reserved,assignee,courier,date,province,channel,delivered:complete?total:0,received,due:cancelled?0:total-received,voided:cancelled?total:0,declared:payment==="Declarado / por conciliar"?total:0};
});
const stores=[{id:"amora",name:"Amora Cosméticos",orders},{id:"casa-nala",name:"Casa Nala",orders:[]}];
export const roles = Object.freeze([
  { id: "gestora", label: "Gestora", modules: ["Resumo", "Catálogo", "Checkouts", "Encomendas", "Clientes", "Entregas", "Stock", "Cobranças", "Relatórios", "Equipa", "Definições", "Planos", "Suporte"] },
  { id: "atendimento", label: "Atendimento", modules: ["Resumo", "Encomendas", "Clientes", "Tarefas", "Notificações"] },
  { id: "estafeta", label: "Estafeta", modules: ["Resumo", "Entregas", "Notificações"] },
  { id: "stock", label: "Gestor de stock", modules: ["Resumo", "Stock", "Catálogo"] },
  { id: "financeiro", label: "Financeiro", modules: ["Resumo", "Cobranças", "Relatórios"] }
]);

export const reviewStates=["Por confirmar","Confirmado","Em expedição","Entregue","Cancelado"];
export function getContext(storeId, roleId) {
 const store=stores.find(s=>s.id===storeId), role=roles.find(r=>r.id===roleId);
 if(!store||!role)return null;
 const orders=store.orders.filter(o=>roleId==="estafeta"?o.courier==="Estafeta fictício":roleId==="atendimento"?o.assignee==="Sara":true).map(o=>({...o}));
 const metrics=orders.reduce((m,o)=>({count:m.count+1,ordered:m.ordered+o.total,delivered:m.delivered+o.delivered,due:m.due+o.due,received:m.received+o.received,voided:m.voided+o.voided,declared:m.declared+o.declared}),{count:0,ordered:0,delivered:0,due:0,received:0,voided:0,declared:0});
 const distribution=reviewStates.map(state=>({state,count:orders.filter(o=>o.order===state).length}));
 return {store:{id:store.id,name:store.name},role,orders,metrics,distribution};
}
export function filterOrders(orders,{query="",state=""}={}) {
 const q=typeof query==="string"?query.trim().toLocaleLowerCase("pt").slice(0,120):"";
 const s=typeof state==="string"&&reviewStates.includes(state)?state:"";
 return orders.filter(o=>(!s||o.order===s)&&(!q||[o.ref,o.product,o.customer,o.province,o.channel].some(v=>v.toLocaleLowerCase("pt").includes(q))));
}
export function getReviewOrder(storeId, roleId, ref) {
 if(!["gestora","atendimento"].includes(roleId))return null;
 return getContext(storeId,roleId)?.orders.find(o=>o.ref===ref)||null;
}
export const reviewStores=stores.map(({id,name})=>({id,name}));
