# Consolidação do frontend — 16/11/2026

**CONCLUÍDO na consolidação Git e verificações locais; PARCIAL na validação visual.** Branch `integration/mvp-consolidado` criada de `origin/main`, sem alterar main, branches antigas ou produção.

## Origens e estratégia

| Referência revisada | SHA inicial |
|---|---|
| main / origin/main | `1e7ffbce4cf2faee95dce991cb3adf4a4f5b9142` |
| feat/migrate-legacy-pages | `be9fab953c9dda2ddd974201c9021c9231460801` |
| feat/mvp-integration | `adec586f9a026c0bc0e305ba31b2e751a8e9039f` |

- Fetch confirmou os SHAs; checkout original limpo. `.env`, `.vercel`, `dist` e `node_modules` originais não foram copiados. Sem tags, conflitos pendentes ou worktrees anteriores.
- Histórico completo (não shallow): main é uma raiz independente; `feat/migrate-legacy-pages` é ancestral do MVP.
- A análise de `git merge-tree --allow-unrelated-histories` entre as duas origens encontrou 23 conflitos add/add, incluindo App, rotas, package-lock, Header, Footer e estilos. Não foi iniciado merge no índice nem aplicada resolução global ours/theirs.
- Escolhida integração seletiva: snapshot MVP sobre a nova branch de main, preservando todos os arquivos exclusivos de main. Os commits originais continuam nas branches antigas; não foi forçada união dos históricos.
- Snapshot funcional consolidado: `333a050452923304932e7289b666180544cd8a16`. SHA final da branch, com este relatório: `git rev-parse integration/mvp-consolidado`, informado também na entrega para evitar referência circular.
- Main inicial/final esperado: `1e7ffbce4cf2faee95dce991cb3adf4a4f5b9142`, conferido novamente antes/depois do push. `git merge-base origin/main HEAD` retorna esse SHA; futuro PR passa a ter base comum.

## Arquivos exclusivos de main: 34 preservados sem alterações

Nenhum arquivo de main ou do MVP foi excluído. Os 30 arquivos de componentes/CSS abaixo, os três arquivos em `src/features/Location` e `src/layout/README.md` continuam nos caminhos originais. O grafo de imports de `src/main.jsx` não alcança nenhum deles: não há dois runtimes ativos nem autenticação local antiga no aplicativo atual.

| Grupo histórico (JSX/CSS quando existentes) | Equivalência/decisão no fluxo atual |
|---|---|
| LocationHeader, LocationFooter, LocationIconSprite | Header/Footer globais em App, LegacyIcon e sprite atual; versões históricas inativas preservadas |
| LocationHero, LocationStylePanel | LocalHero, temas definidos pela categoria real e dados localData; seletor manual/fx de demonstração preservado apenas no histórico inativo, sem mudar a estética atual |
| LocationGallery, LocationOverlays | GallerySection e LocalDialogs/Lightbox; recuperados teclado e prévia de fotos nos formulários atuais |
| LocationInformation, LocationHours, LocationMap | InformationSection e HoursLocationSections com dados REST e mapa; cálculos de aberto/agora e horários fictícios antigos não substituem dados reais |
| LocationReviews, LocationFeedback | ReviewsSection com CRUD real; ResidentTipsSection mantém identificação de exemplos. CRUD de dicas locais antigo preservado isolado, sem promovê-lo como API existente |
| LocationRoutes, LocationDestinations | VisitorRoutesSection/useItineraryBuilder, OtherPlacesSection e Explorar: roteiro real, busca, estado/preço; categoria também disponível em Explorar/Home |
| LocationSectionNav, LocationSections.css, LocationBackToTop | LocalNavigation, CSS atual e botão Voltar ao topo; originais inativos mantidos |
| locationCore.js | AuthContext/AuthAccountModal + serviços HTTP substituem contas/roles/favoritos/CRUD de protótipo em localStorage. Código antigo, inclusive recuperação fake e demo, não é importado nem executado |
| locationInteractions.js, locationImages.js | useLocalPage, componentes React, imagens importadas e efeitos useRevealOnScroll; código/68 dependências históricas continuam resolvíveis, sem ativação |
| src/layout/README.md | Documento histórico preservado; a composição atual está em App.jsx, com Header/Footer compartilhados |

Recursos sem equivalente REST completo (histórias/dicas locais, salvar roteiros públicos de terceiros, denúncias, CEP/geolocalização e personalização manual de demonstração) permanecem isolados no protótipo, rastreáveis por `origin/main:<caminho>`. Não foram reativados contra a segurança do MVP nem apresentados como persistência nova. Cabe ao grupo decidir sua evolução funcional.

## Alterações funcionais necessárias

- Prévia local e remoção de imagens selecionadas em cadastro pela conta, cadastro no detalhe e edição do local: novo ImageFilePreviews, reutilizando dimensões/classes existentes. Object URLs são revogados na troca/remoção/desmontagem; fluxo de upload e retentativa segura permanece igual.
- Lightbox atual recebe foco e aceita setas esquerda/direita e Escape, recuperando interação de teclado do protótipo.
- Preservados CTAs corrigidos `c4dc779` (`/roteiros`, sem `roteiros.html`), Home, Explorar, Local, Roteiros, login/cadastro/perfil, Meus Locais, favoritos, ADMIN, Comunidade, serviços REST, fontes, imagens, CSS, animações, responsividade, rewrites e scripts Vercel.
- AGENTS.md e skill foram preservados exatamente. A autorização desta tarefa prevalece sobre a regra antiga de commitar somente em feat/mvp-integration.

## Verificações desta branch

- **CONCLUÍDO:** npm ci, npm run build e npm run lint aprovados. Permanecem avisos de tamanho de chunk/tempo de plugins já existentes; nenhum framework ou pacote foi adicionado.
- **CONCLUÍDO:** auditoria estática de imports/assets: 200 arquivos no grafo ativo, 68 no histórico, 0 imports ausentes, 0 arquivos históricos ativos, 34 exclusivos idênticos por hash, 0 exclusões de main/MVP.
- **CONCLUÍDO:** somente dois arquivos MVP existentes tiveram mudanças de aplicação (AuthAccountModal e LocalDialogs), além do novo componente de prévias. CSS/assets/rotas/serviços permanecem iguais ao MVP. Whitespace histórico foi mantido; alterações novas passam no diff check focado.
- **CONCLUÍDO:** HTTP local 200 em /, /explorar, /local/1, /roteiros, /admin, /comunidade e nos três módulos alterados/novos. Vite aponta exclusivamente para API local 127.0.0.1:18081; backend usa schema local isolado.
- **PARCIAL / NÃO TESTADO visualmente:** cliques, prévias, teclado e jornadas completas no navegador desta branch. O ambiente de Computer Use tinha host de navegador indisponível e diálogo de firewall Windows/Node.js pendente; não houve contorno de política. HTTP/imports não comprovam interação React e não se afirma ausência total de regressões.

## Estado de entrega

- Apenas `integration/mvp-consolidado` será enviada ao GitHub. Sem novo PR para main, exclusão de branches, rebase, force push ou alteração das branches de origem.
- Worktree: `F:/rotaCultural/.worktrees/rc-web-consolidado`.
- Nenhum deploy, escrita em produção, secret ou infraestrutura alterados. Esta branch não está publicada na Vercel; produção anterior permanece em `c4dc779`.
- Integração Git privada de organização no Hobby continua sendo limitação anterior; não foi contratado Pro nem alterada a configuração Vercel.
