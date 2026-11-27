# ORDERX · Commerce Command V04 — dossier e fila de atenção
27/11/2026 · Baseline f14fb90adcaaf6ce33eb0859ff29a606a8455b27. V02 continua a direcção estética aceite. V04 refina C01 e C04.a, preserva B04 e fixture V03.
- Fila de atenção: 1 pedido por confirmar, 1 tentativa falhada, 1 declaração por conciliar; agrupados por tipo e limitados ao perfil simulado. Contagens do cenário, não novas tarefas persistidas.
- Dossier: identidade comercial, composição de valores, estados independentes, disponibilidade, responsabilidades e valores declarados/anulados. Sem CRUD fictício; área de revisão privada.
- Retorno à lista com pesquisa/estado normalizados e codificados. Não aceitar URL de retorno externa. Corrigir cores da distribuição quando há estados sem ocorrências.
- Teste de navegador preparado para 9 capturas reais C01/B04/C04.a em 390/820/1440 e regresso filtrado. Mantém regressões existentes.
14 verificações PASS sobre módulo candidato em JavaScript isolado; não runner Node. Ambiente local Node 22 e GitHub DNS indisponível. Build/browser/CI/aceitação NOT_RUN. OX-COD-02.E aberta, 03 não iniciada. Sem alteração da aplicação comercial real, dados ou regras COD. Não iniciar serviços pagos.

Releitura: 68 verificações PASS, inclui Unicode; [gate](gate-cod-02-e.md). Não é build ou browser.
