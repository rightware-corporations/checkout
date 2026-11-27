import { redirect } from "next/navigation";
import { requireReview } from "@/backend/review/access";
export const dynamic = "force-dynamic";
export default async function Page(){await requireReview();redirect("/gestao/revisao/amora/gestora")}
