import os
from playwright.sync_api import sync_playwright,expect
base=os.environ.get('CHECKOUT_TEST_URL','http://127.0.0.1:3140')
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH'),args=['--no-sandbox'])
 seller=b.new_page()
 seller.goto(base)
 seller.get_by_role('link',name='Entrar na loja').click()
 seller.get_by_label('Palavra-passe').fill(os.environ['SELLER_PASSWORD'])
 seller.get_by_text('Entrar',exact=True).click()
 seller.get_by_role('navigation').get_by_text('Publicar produto').click()
 seller.get_by_label('Nome do produto').fill('Creme de teste')
 seller.get_by_label('Preço por unidade').fill('999')
 seller.get_by_label('Entrega fixa').fill('100')
 seller.get_by_text('Publicar link',exact=True).click()
 link=seller.get_by_text('Abrir checkout').first
 expect(link).to_be_visible()
 mobile=b.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
 mobile.goto(base + link.get_attribute('href'))
 mobile.get_by_label('Quantidade').select_option('2')
 assert mobile.locator('strong[aria-live]').inner_text().replace('\xa0','').replace(' ','')=='Total2098,00MT'
 for name,value in [('name','Cliente Teste'),('phone','841234567'),('province','Maputo'),('city','Matola'),('address','Rua de teste')]:
  mobile.locator('[name="'+name+'"]').fill(value)
 assert mobile.locator('input[type=email]').count()==0
 mobile.get_by_text('Encomendar agora').click()
 expect(mobile.get_by_role('heading',name='Encomenda recebida')).to_be_visible()
 ref=mobile.locator('small').inner_text()
 seller.get_by_role('navigation').get_by_text('Encomendas',exact=True).click()
 expect(seller.get_by_text(ref,exact=True)).to_be_visible()
 seller.get_by_label('Estado',exact=True).select_option('Em processamento')
 seller.get_by_text('Guardar estado').click()
 seller.wait_for_load_state('networkidle')
 seller.reload()
 expect(seller.get_by_label('Estado',exact=True)).to_have_value('Em processamento')
 mobile.goto(base + '/gestao')
 expect(mobile.get_by_label('Palavra-passe')).to_be_visible()
 print('PASS: guest checkout, 390x844, 2098 MT, confirmation, seller reload, state update, private panel.')
