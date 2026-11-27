"""Percorrer a maqueta offline com Chromium e Playwright."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

url = Path(os.getenv("ORDERX_MAQUETA", "public/maqueta/index.html")).resolve().as_uri()
with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.getenv("CHROMIUM_PATH"))
    for width in (390, 820, 1440):
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.goto(url)
        page.get_by_role("link", name="Compradora").click()
        expect(page.locator("output")).to_have_text("1.099,00 MT")
        page.get_by_label("Quantidade").select_option("2")
        expect(page.locator("output")).to_have_text("2.098,00 MT")
        for label, value in [("Nome fictício","Rita"),("Telefone fictício","841234567"),("Morada fictícia","Maputo")]:
            page.get_by_label(label).fill(value)
        page.get_by_role("button").click()
        expect(page.get_by_text("••• 567")).to_be_visible()
        page.get_by_text("Ver na loja").click()
        page.get_by_text("ENC-1002").click()
        page.get_by_role("button",name="Confirmar encomenda").click()
        expect(page.get_by_text("Confirmada",exact=True)).to_be_visible()
        page.get_by_text("Mudar de loja").click()
        page.get_by_text("Casa Nala").click()
        expect(page.get_by_text("Sem encomendas nesta fila.")).to_be_visible()
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.goto(url+"#/adesao")
        page.get_by_label("Nome do negócio").fill("Nina")
        page.get_by_role("button").click()
        page.goto(url+"#/plataforma/adesoes")
        expect(page.get_by_text("Nina",exact=True)).to_be_visible()
        page.goto(url+"#/convite")
        page.get_by_text("Aceitar convite").click()
        expect(page.locator("nav a")).to_have_count(2)
        page.close()
        print(f"PASS {width}px")
