# ORDERX · Gate OX-COD-02.E — execução reproduzível
27/11/2026 · Código V04 a partir de a8a105aa8c3c0f0a66de62604edc1cd164f2fbbf. Confirmar HEAD actual e árvore limpa antes de iniciar. Não usar SQLite de produção. Sem CI pré-existente; não criar execução paga. Este roteiro não afirma que os testes passaram.
## Pré-requisitos
Node >=24, npm, Python 3 com Playwright e Chromium instalados, checkout da branch activa. Executar na raiz. Usar pasta temporária nova fora do repositório e credenciais fictícias de teste; não partilhar o valor utilizado. Não copiar contactos reais. Confirmar `git status --short` e `git rev-parse HEAD`.
## 1. Build e módulo puro
```sh
node --version
npm ci
node --test tests/review_foundation.test.mjs
npm run build
```
Registar código de saída, versões e logs. Se falhar, parar e corrigir. O build é separado do servidor de revisão: a revisão está desactivada em produção.
## 2. Servidor dev isolado
PowerShell (Windows), terminal A:
```powershell
$qa = Join-Path ([System.IO.Path]::GetTempPath()) ("orderx-qa-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $qa | Out-Null
$env:CHECKOUT_DB = Join-Path $qa "checkout.sqlite"
$env:SELLER_PASSWORD = "ORDERX-QA-" + [guid]::NewGuid().ToString("N")
$env:ORDERX_REVIEW = "1"
Write-Host "Pasta QA: $qa"
# manter esta sessão; transmitir apenas a password fictícia para terminal B local
npm run dev -- --hostname 127.0.0.1 --port 3140
```
Terminal B: definir SELLER_PASSWORD com o mesmo valor fictício do terminal A (antes de iniciar, pode ser definido manualmente nas duas sessões), CHECKOUT_TEST_URL=http://127.0.0.1:3140 e ORDERX_EVIDENCE_DIR como pasta temporária nova. Se necessário, CHROMIUM_PATH aponta para Chromium instalado. Executar:
```powershell
python tests/checkout_browser.py
python tests/review_foundation_browser.py
python tests/maqueta_browser.py
python tests/primeiro_link_browser.py
```
Aguardar prontidão HTTP antes dos testes. Encerrar servidor após execução. Em Unix, exportar as mesmas variáveis. O browser de revisão escreve C01, B04 e C04a em 390/820/1440 quando ORDERX_EVIDENCE_DIR está definido.
## 3. Aceitação
Conferir 9 capturas (não protótipo), foco/teclado, contraste, overflow, estado vazio/sem resultados, filtros de ida e volta, mesma referência e montante, fronteira convidado, isolamento Amora/Casa Nala e papel simulado, sessão operacional preservada. Confirmar também que ORDERX_REVIEW não habilita a revisão em build de produção. Registar evidência e decisão por ID; corrigir antes de promover estados e desbloquear 03. Não alterar regras críticas. Handoff 12 é activo.
