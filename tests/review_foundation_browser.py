# Start dev server with ORDERX_REVIEW=1 and disposable CHECKOUT_DB before running.
import os
from pathlib import Path
import json
import re
from playwright.sync_api import sync_playwright, expect
base=os.environ.get("CHECKOUT_TEST_URL","http://127.0.0.1:3140")
path="/gestao/revisao/amora/gestora"
evidence=os.environ.get("ORDERX_EVIDENCE_DIR")
if evidence: Path(evidence).mkdir(parents=True,exist_ok=True)
def contrast(a,b):
    def lum(c):
        v=[int(c[i:i+2],16)/255 for i in (0,2,4)]
        return sum((x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4)*w for x,w in zip(v,(.2126,.7152,.0722)))
    lo,hi=sorted((lum(a),lum(b)))
    return (hi+.05)/(lo+.05)

def color_hex(locator,prop):
    value=locator.evaluate("(e,p)=>getComputedStyle(e).getPropertyValue(p)",prop)
    assert value.startswith("rgb("),value
    return "".join(f"{int(v):02x}" for v in re.findall(r"\d+",value)[:3])

checks=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=os.environ.get("CHROMIUM_PATH"),args=["--no-sandbox"])
    guest=b.new_page()
    guest.goto(base+path)
    expect(guest.get_by_label("Palavra-passe")).to_be_visible()
    assert "ENC-1001" not in guest.locator("body").inner_text()
    guest.goto(base+"/recebido?ref=ENC-1001")
    assert "Cliente fictícia A" not in guest.locator("body").inner_text()
    for w in (390,820,1440):
        seller=b.new_page(viewport={"width":w,"height":900})
        seller.goto(base+"/gestao")
        seller.get_by_label("Palavra-passe").fill(os.environ["SELLER_PASSWORD"])
        seller.get_by_role("button",name="Entrar",exact=True).click()
        expect(seller.get_by_role("heading", name="Visão geral de vendas", exact=True)).to_be_visible()
        seller.goto(base+path)
        expect(seller.get_by_role("link",name="ENC-1001",exact=True)).to_be_visible()
        assert "2098,00MT" in seller.locator("main").inner_text().replace(" ","").replace("\xa0","").replace("\u202f","")
        assert seller.evaluate("document.documentElement.scrollWidth <= innerWidth")
        queue=seller.locator(".ox-review-dashboard .ox-priority-panel")
        orders=seller.locator(".ox-orders-panel")
        assert queue.count()==1 and queue.bounding_box()["y"] < orders.bounding_box()["y"]
        assert queue.evaluate("(e)=>Boolean(e.compareDocumentPosition(document.querySelector('.ox-orders-panel')) & Node.DOCUMENT_POSITION_FOLLOWING)")
        for selector,minimum in ((".ox-orders-table .ox-ref-link",14),(".ox-orders-table small",12),(".ox-orders-table .ox-status",12)):
            assert float(seller.locator(selector).first.evaluate("e=>parseFloat(getComputedStyle(e).fontSize)"))>=minimum
        field=seller.get_by_role("textbox",name="Pesquisar")
        control_ratio=contrast(color_hex(field,"border-top-color"),color_hex(field,"background-color"))
        hero_ratio=contrast(color_hex(seller.locator(".ox-focus-label"),"color"),"275b9a")
        assert control_ratio>=3 and hero_ratio>=4.5
        if evidence: seller.screenshot(path=str(Path(evidence)/f"C01-{w}.png"),full_page=True)
        seller.get_by_role("textbox",name="Pesquisar").fill("ENC-1001")
        seller.get_by_role("button",name="Filtrar",exact=True).click()
        expect(seller.get_by_role("link",name="ENC-1002",exact=True)).to_have_count(0)
        seller.get_by_role("link",name="ENC-1001",exact=True).click()
        expect(seller.get_by_role("heading",name="ENC-1001",exact=True)).to_be_visible()
        assert "2098,00MT" in seller.locator("main").inner_text().replace(" ","").replace("\xa0","").replace("\u202f","")
        assert seller.evaluate("document.documentElement.scrollWidth <= innerWidth")
        assert seller.locator("main").get_by_text("ENC-1001",exact=True).count()==1
        if w<=760:
            first,second=[seller.locator(".ox-metrics-dossier .ox-metric").nth(i).bounding_box() for i in (0,1)]
            assert first["width"]>second["width"] and first["y"]<second["y"]
        if evidence: seller.screenshot(path=str(Path(evidence)/f"C04a-{w}.png"),full_page=True)
        seller.get_by_role("link",name="Voltar às encomendas",exact=False).click()
        expect(seller.get_by_role("textbox",name="Pesquisar")).to_have_value("ENC-1001")
        expect(seller.get_by_role("link",name="ENC-1002",exact=True)).to_have_count(0)
        summary=seller.locator(".ox-context-menu summary")
        summary.focus()
        summary.press("Enter")
        expect(seller.locator(".ox-context-menu")).to_have_attribute("open","")
        if w<=760:
            panel=seller.locator(".ox-context-panel").bounding_box()
            assert panel["y"]+panel["height"]<=seller.locator(".ox-focus").bounding_box()["y"]
        assert seller.evaluate("document.documentElement.scrollWidth <= innerWidth")
        if evidence: seller.screenshot(path=str(Path(evidence)/f"B04-{w}.png"),full_page=True)
        summary.press("Enter")
        expect(seller.locator(".ox-context-menu")).not_to_have_attribute("open","")
        summary.press("Enter")
        seller.get_by_role("group",name="Loja").get_by_role("link",name="Casa Nala",exact=True).click()
        expect(seller).to_have_url(base+"/gestao/revisao/casa-nala/gestora")
        checks.append({"viewport":w,"control_border_ratio":control_ratio,"hero_worst_pair_ratio":hero_ratio,"priority_before_list":True,"context_keyboard_and_change":True})
        expect(seller.get_by_text("Nada a tratar",exact=True)).to_be_visible()
        seller.goto(base+"/gestao/revisao/casa-nala/gestora/encomendas/ENC-1001")
        assert "Cliente fictícia A" not in seller.locator("body").inner_text()
        seller.goto(base+"/gestao/revisao/amora/estafeta")
        expect(seller.get_by_text("2 registos no contexto.",exact=False)).to_be_visible()
        seller.close()
    b.close()
if evidence: (Path(evidence).parent/"r1-checks.json").write_text(json.dumps(checks,indent=2),encoding="utf-8")
print("PASS: review routes, guest gate, same reference, store/role scope, 390/820/1440")
