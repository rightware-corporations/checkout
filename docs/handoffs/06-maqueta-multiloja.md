# Organização por experiência e navegação multi-loja

Entrada da maqueta: `public/maqueta/index.html`. A navegação usa fragmentos para funcionar também quando a pessoa abre o ficheiro local. O README descreve as fronteiras entre rotas operacionais, módulos do servidor, layout e demonstração.

- Compradora → quantidade 2 → encomenda de 2.098,00 MT → referência e contacto mascarado → painel Amora → confirmação → mudança para Casa Nala com fila vazia.
- Adesão → pedido recebido → fila da plataforma. Convite de Atendimento → duas entradas de navegação.
- Chromium validou estes percursos a 390, 820 e 1440 px, no HTML independente e na versão em pastas. Reproduzir com Playwright Python e `python tests/maqueta_browser.py`. A variável opcional `CHROMIUM_PATH` selecciona o executável.
- Build Next.js e teste existente `tests/checkout_browser.py` passaram após mover as rotas e dividir o backend.
- A maqueta usa dados voláteis. Directório de lojas, relatórios e restantes vistas de consulta ilustram a navegação. O CRUD completo, a persistência multi-loja e a autorização por perfil no servidor pertencem à implementação seguinte.
