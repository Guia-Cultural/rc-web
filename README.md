# RotaCultural — rc-web (React + Vite)

Projeto web do RotaCultural. A Home permanece como estava na versão-base `rc-web-refatorado-bem`; nesta etapa foram adicionadas somente as páginas **Blog da Comunidade** e **Local**, sem registrar novas rotas e sem criar Archive Stack.

## Executar localmente

```bash
npm install
npm run dev
```

## Verificações

```bash
npm run build
npm run lint
```

## Organização das páginas adicionadas

```text
src/
├── components/
│   ├── Community/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Marquee/
│   │   ├── Rules/
│   │   ├── StoryComposer/
│   │   ├── Highlights/
│   │   ├── Feed/
│   │   ├── Footer/
│   │   ├── Overlays/
│   │   └── IconSprite/
│   └── Location/
│       ├── Header/
│       ├── Hero/
│       ├── SectionNav/
│       ├── Information/
│       ├── Gallery/
│       ├── Hours/
│       ├── Map/
│       ├── Reviews/
│       ├── Feedback/
│       ├── Routes/
│       ├── Destinations/
│       ├── StylePanel/
│       ├── BackToTop/
│       ├── Footer/
│       ├── Overlays/
│       └── IconSprite/
├── features/
│   ├── Community/
│   │   ├── data/communityImages.js
│   │   └── scripts/communityInteractions.js
│   ├── Location/
│   │   ├── data/locationImages.js
│   │   └── scripts/{locationCore,locationInteractions}.js
│   └── Admin/templates/AdminDashboardTemplate.html
└── pages/
    ├── Community/Community.jsx
    └── Location/Location.jsx
```

## Convenções

- Componentes e arquivos React em `PascalCase`.
- Variáveis e funções JavaScript em `camelCase`.
- Classes CSS no padrão BEM, com namespaces por página: `community-*` e `location-*`.
- Variáveis CSS locais com prefixos `--community-*` e `--location-*`.
- Comentários de banner organizam as seções dos arquivos JSX, CSS e JavaScript.
- CSS importado pela página específica e escopado em `.community-page` ou `.location-page`.

## Regra de acesso ao Blog

`Community.jsx` usa `AuthContext`. A página permite os tipos de usuário existentes no projeto: `admin`, `morador` e `usuario`, equivalentes a administrador nativo, morador local/nativo e viajante. Aliases textuais também são aceitos. Visitantes e perfis desconhecidos recebem a tela de acesso restrito.

Esse gate controla a interface React. Quando houver backend, a autorização também deverá ser validada no servidor/API.

## JavaScript e assets

As imagens Base64 das páginas foram extraídas para `src/assets/images/community/` e `src/assets/images/location/`, com mapas de importação nas pastas `features/*/data/`. Os scripts de interface foram separados dos componentes React e são inicializados pela página correspondente.

O painel administrativo embutido no HTML Local continua como subdocumento independente carregado em iframe. Seu HTML, CSS e JavaScript agora estão em arquivos separados dentro de `features/Admin/templates/`, reunidos pelo módulo `adminDashboardDocument.js` em tempo de execução; ele não foi convertido em uma página/rota React. As páginas Blog e Local também **não foram adicionadas a `AppRoutes.jsx`**; a integração de rotas e permissões entre telas fica para uma etapa posterior.

## Fonte das regras

Não foi recebido um arquivo `spec.md` separado neste envio. A permissão do Blog foi implementada com base nos tipos documentados em `src/context/AuthContext.jsx` e nos rótulos de perfil existentes no runtime Local original. Consulte `SPEC-ARQUITETURA-ROTACULTURAL.md` e `VALIDACAO-PAGINAS.md` para detalhes e limites da entrega.

## Assets e tipografia

As imagens estão separadas por página em `src/assets/images/home`, `src/assets/images/blog` e `src/assets/images/local`, com prefixos de arquivo correspondentes. As fontes globais são Nunito (`--body`), Inter (`--inter`) e Caveat Brush (`--brush`); componentes devem consumir esses tokens. Valores de cor e apresentação estática devem ficar nos CSS próprios dos componentes, usando variáveis e modificadores BEM.

## Revisão mais recente

Consulte `REVISAO-FINAL-PADRONIZACAO.md` para a padronização de cores no CSS, tokens de fonte globais, Caveat Brush em “O Brasil em números”, organização das imagens por página e verificações estáticas. O build e o lint ainda precisam ser executados localmente após `npm ci`.

## Ordem de CSS e revisão de lint

As folhas CSS seguem a ordem `:root` com variáveis prefixadas → estilização em efeito cascata → responsividade (`@media`) ao final. Consulte `REVISAO-ESLINT-ORDEM-CSS.md` para as correções realizadas e os testes estáticos executados.
