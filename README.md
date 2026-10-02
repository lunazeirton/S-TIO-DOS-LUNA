# Sítio dos Luna
Site estático pronto para GitHub Pages. Documentação pública por solicitação do responsável.

## Publicar
1. Crie um repositório no GitHub chamado `sitio-dos-luna`.
2. Envie o conteúdo desta pasta, mantendo `index.html` na raiz.
3. No repositório, abra Settings > Pages. Em Build and deployment, escolha Deploy from a branch, branch main, pasta /(root), e salve.
4. O GitHub mostrará o endereço publicado nessa mesma tela.
Referência: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Conteúdo
- Duas áreas e 19 marcos extraídos do KML recebido, sem mudança das coordenadas.
- Áreas exibidas conforme declaração no KML, não como cálculo ou certificação registral.
- Oito imagens de documentos fornecidos; primeira página repetida do CAR omitida.
- Imagens preservadas integralmente. Os arquivos originais não foram retocados.
- Link Como chegar abre a localização fornecida pelo usuário: https://maps.app.goo.gl/jbuT674Db7guLPDWA.
- Sem formulário, coleta de dados ou sistema de login.

## Atualizar
Os textos estão em index.html; o estilo em assets/site.css; os limites e pontos em assets/mapa.js. Ao substituir o levantamento, atualize também o KML e os textos de área.

O mapa utiliza Leaflet 1.9.4 (BSD-2-Clause), Esri World Imagery e OpenStreetMap, com créditos no mapa. Imagens de satélite e ruas precisam de internet. O site pode ser testado localmente com `python3 -m http.server 8000`, abrindo http://localhost:8000.
