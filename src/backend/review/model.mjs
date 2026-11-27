// Pure synthetic contract. Import only through private review server adapter.
const stores = Object.freeze([
  { id: "amora", name: "Amora Cosméticos", orders: [{ ref: "ENC-1001", customer: "Cliente fictícia A", product: "Creme Anti-Manchas", qty: 2, price: 99900, fee: 10000, order: "Por confirmar", delivery: "Não iniciada", payment: "Por receber", delivered: 0, received: 0, due: 209800, reserved: 2, physical: 10, assignee: "Sara", courier: null }] },
  { id: "casa-nala", name: "Casa Nala", orders: [] }
]);
export const roles = Object.freeze([
  { id: "gestora", label: "Gestora", modules: ["Resumo", "Catálogo", "Checkouts", "Encomendas", "Clientes", "Entregas", "Stock", "Cobranças", "Relatórios", "Equipa", "Definições", "Planos", "Suporte"] },
  { id: "atendimento", label: "Atendimento", modules: ["Resumo", "Encomendas", "Clientes", "Tarefas", "Notificações"] },
  { id: "estafeta", label: "Estafeta", modules: ["Resumo", "Entregas", "Notificações"] },
  { id: "stock", label: "Gestor de stock", modules: ["Resumo", "Stock", "Catálogo"] },
  { id: "financeiro", label: "Financeiro", modules: ["Resumo", "Cobranças", "Relatórios"] }
]);
export function getContext(storeId, roleId) {
  const store = stores.find(s => s.id === storeId);
  const role = roles.find(r => r.id === roleId);
  if (!store || !role) return null;
  const orders = store.orders.filter(o => roleId === "estafeta" ? o.courier === "Estafeta fictício" : roleId === "atendimento" ? o.assignee === "Sara" : true).map(o => ({...o, total: o.qty * o.price + o.fee, available: o.physical - o.reserved}));
  const metrics = orders.reduce((m,o) => ({count: m.count+1, ordered: m.ordered+o.total, delivered: m.delivered+o.delivered, due: m.due+o.due, received: m.received+o.received}), {count:0,ordered:0,delivered:0,due:0,received:0});
  return {store: {id:store.id,name:store.name},role,orders,metrics};
}
export function getReviewOrder(storeId, roleId, ref) {
  // Roles without an order-detail destination must not open it by changing the URL.
  if (!["gestora","atendimento"].includes(roleId)) return null;
  return getContext(storeId, roleId)?.orders.find(o=>o.ref===ref) || null;
}
export const reviewStores = stores.map(({id,name})=>({id,name}));
