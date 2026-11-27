# ORDERX · Direcção de marca v0.1

Proposta para revisão da RIGHTWARE e do cliente. Usar a prancha como referência de composição e os SVG como ficheiros-mestre. Os activos são uma interpretação nova da descrição recebida. A assinatura é ORDERX com o subtítulo SISTEMA DE GESTÃO DE ENCOMENDAS.

## Símbolo e assinatura
O X tem dois cortes diagonais largos inscritos num quadrado de cantos arredondados. O traço azul-claro sobe da esquerda para a direita. Manter orientação e proporção. A assinatura horizontal usa o nome em Manrope ExtraBold com o X destacado; os contornos nos SVG tornam o resultado independente da fonte instalada. Usar positivo sobre branco ou canvas, negativo sobre navegação escura e monocromático para impressão a uma tinta sobre papel claro. Reservar espaço livre de ¼ da altura do símbolo em cada lado. Usar a assinatura completa a partir de 240 px de largura. Em espaços menores usar apenas o símbolo, a partir de 20 px. No painel desktop usar a assinatura no topo da navegação; no cabeçalho móvel compacto usar o símbolo com nome acessível ORDERX.

## Hierarquia por contexto
Painel da equipa: mostrar loja activa, módulo, papel e acção principal no contexto da tarefa. Navegação persistente em azul-noite, texto branco, selecção com indicador azul-claro e peso 700. Superadmin usa a mesma família visual com identificação textual “Administração da plataforma” no cabeçalho. No checkout público, a fotografia, a marca do vendedor, o preço e a entrega dominam a composição. Usar “Powered by ORDERX” discretamente no rodapé.

## Cores e estados
tokens.json contém os valores exactos e tokens.css contém variáveis e a declaração local da fonte. Azul de acção com texto branco para publicar, confirmar e encomendar. Azul-claro destina-se a realces sobre navegação escura. Texto principal ou secundário sobre branco ou canvas. Verde com “Entregue”, âmbar com “Por confirmar” e vermelho com “Cancelada”. Usar texto e, quando útil, ícone além da cor. Manter estados de pagamento separados de estados de entrega.

## Tipografia e composição
Manrope variável 200–800, distribuída com licença em fontes/OFL.txt. Usar 400 para leitura, 600 para controlos e 800 para valores em destaque. Corpo 16/24 px; etiquetas 14/20; legenda 12/18; títulos 24/32; destaque 36/44. Alinhar valores de tabela à direita. No desktop, usar navegação de 240 px e conteúdo com margens de 32 px. No telefone, usar margens de 16 px, disposição a uma coluna e sequência produto → quantidade → entrega → total → dados → confirmação.

## Componentes mínimos
- Botão principal com 44 px de altura mínima, raio 8 px, texto descritivo. Acção secundária sobre branco com contorno. Durante submissão mostrar progresso e bloquear nova activação.
- Campo com etiqueta permanente, ajuda ou erro por baixo e foco com anel de 3 px e afastamento de 2 px. Verificar o anel contra o fundo usado. Distinguir obrigatório e opcional no texto.
- Cartão branco com raio de 12 px, borda subtil e espaçamento interno de 16 ou 24 px. Usar densidade maior em tabelas e respiro maior no checkout.
- Badges com raio de 6 px e texto explícito. Não atribuir permissão, loja ou urgência só por cor.
- Lista de encomendas com referência, cliente, total, responsável e estado. Em mobile manter referência, estado e total visíveis e levar detalhes ao segundo nível.
- Prever vazio com acção útil, carregamento, erro recuperável, sem permissão, link pausado e confirmação com referência.

## Handoff para desenho
A prancha mostra aplicação de marca com dados fictícios. Rever legibilidade da assinatura em tamanho pequeno, contraste das combinações de texto e clareza do estado com o cliente. Após aprovação, reutilizar estes ficheiros nas primeiras composições de painel e checkout móvel. Para valores inconsistentes entre documentos, os tokens governam os valores e os SVG governam a geometria.
