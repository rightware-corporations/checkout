import { requireSeller } from "@/backend/identity/require-seller";
import CheckoutEditor from "@/frontend/components/checkout-editor";
import { Frame } from "@/frontend/components/store-frame";
export const dynamic="force-dynamic";
import { publish } from "@/backend/checkouts/actions";
export default async function Page({searchParams}) {await requireSeller();const {erro}=await searchParams;return <Frame active="Publicar produto"><p className="eyebrow">CATÁLOGO</p><h1>Publicar produto</h1><section>          <CheckoutEditor action={publish}>
            <label>
              Nome do produto
              <input name="title" maxLength="100" required />
            </label>
            <label>
              Fotografia (URL HTTPS, opcional)
              <input name="image" type="url" />
            </label>
            <label>
              Preço por unidade (MT)
              <input name="price" inputMode="decimal" required />
            </label>
            <label>
              Entrega fixa (MT)
              <input
                name="delivery"
                defaultValue="0"
                inputMode="decimal"
                required
              />
            </label>
            <label>
              Quantidade máxima
              <input
                name="max"
                type="number"
                min="1"
                max="99"
                defaultValue="2"
                required
              />
            </label>
            <label className="check">
              <input name="bairro" type="checkbox" defaultChecked /> Incluir
              bairro opcional
            </label>
            {erro && <p role="alert">Verifique os dados do produto.</p>}
            
          </CheckoutEditor>
</section></Frame>;}