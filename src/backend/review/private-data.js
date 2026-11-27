import "server-only";
import { notFound } from "next/navigation";
import { requireReview } from "./access";
import { getContext, getReviewOrder, reviewStores, roles } from "./model.mjs";
export async function reviewContext(store, role) {
  await requireReview();
  const context = getContext(store, role);
  if (!context) notFound();
  return {...context, stores:reviewStores, roles};
}
export async function reviewOrder(store, role, ref) {
  const context = await reviewContext(store,role);
  const order = getReviewOrder(store,role,ref);
  if (!order) notFound();
  return {...context, order};
}
