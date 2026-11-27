# Start dev server with ORDERX_REVIEW=1 and disposable CHECKOUT_DB before running.
import os
from playwright.sync_api import sync_playwright, expect
base=os.environ.get("CHECKOUT_TEST_URL","http://127.0.0.1:3140")
path="/gestao/revisao/amora/gestora"
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
        seller.goto(base+path)
        expect(seller.get_by_role("link",name="ENC-1001",exact=True)).to_be_visible()
        assert "2098,00MT" in seller.locator("main").inner_text().replace(" ","").replace("\xa0","").replace("\u202f","")
        seller.get_by_role("link",name="ENC-1001",exact=True).click()
        expect(seller.get_by_role("heading",name="ENC-1001",exact=True)).to_be_visible()
        assert "2098,00MT" in seller.locator("main").inner_text().replace(" ","").replace("\xa0","").replace("\u202f","")
        assert seller.evaluate("document.documentElement.scrollWidth <= innerWidth")
        seller.goto(base+"/gestao/revisao/casa-nala/gestora")
        expect(seller.get_by_text("Nada a tratar",exact=True)).to_be_visible()
        seller.goto(base+"/gestao/revisao/casa-nala/gestora/encomendas/ENC-1001")
        assert "Cliente fictícia A" not in seller.locator("body").inner_text()
        seller.goto(base+"/gestao/revisao/amora/estafeta")
        expect(seller.get_by_text("Nada a tratar",exact=True)).to_be_visible()
        seller.close()
    b.close()
print("PASS: review routes, guest gate, same reference, store/role scope, 390/820/1440")
