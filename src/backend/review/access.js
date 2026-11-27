import "server-only";
import { notFound } from "next/navigation";
import { requireSeller } from "@/backend/identity/require-seller";
export const reviewEnabled = () => process.env.NODE_ENV !== "production" && process.env.ORDERX_REVIEW === "1";
export async function requireReview() {
  if (!reviewEnabled()) notFound();
  await requireSeller();
}
