# Rota Cultural — Frontend (`rc-web`)

Interface web do projeto **Rota Cultural**, construída com **React 19**, **React Router DOM 7**, **Vite 8** e CSS modularizado preservando integralmente a identidade visual original do projeto.

---

## Sumário

1. [Tecnologias](#tecnologias)
2. [Pré-requisitos e Configuração](#pré-requisitos-e-configuração)
3. [Como Executar Localmente](#como-executar-localmente)
4. [Integração com a API (`rc-service`)](#integração-com-a-api-rc-service)
5. [Telas e Funcionalidades](#telas-e-funcionalidades)
6. [Contas Demonstrativas](#contas-demonstrativas)
7. [Status do MVP](#status-do-mvp)

---

## Tecnologias

- **React:** `^19.3.1`
- **Roteamento:** `react-router-dom` `^7.18.5`
- **Bundler / Dev Server:** `vite` `^8.3.4`
- **Lint:** `eslint` `^10.13.0` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

---

## Pré-requisitos e Configuração

- **Node.js 20+** (recomendado 22+/24) e **npm**
- Backend `rc-service` em execução (por padrão em `http://localhost:8081`)

1. Instale as dependências:

```bash
cd rc-web
npm install
```

2. Copie `.env.example` para `.env` e ajuste a URL da API se necessário (**não versione `.env`**):

```bash
cp .env.example .env
```

Conteúdo esperado do `.env`:

```env
VITE_API_URL=http://localhost:8081
```

---

## Como Executar Localmente

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite (padrão `http://localhost:5173`) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Sobe preview local do build gerado |
| `npm run lint` | Executa análise estática ESLint em todo o projeto |

---

## Integração com a API (`rc-service`)

- Cliente HTTP centralizado em `src/services/apiClient.js`:
  - injeta automaticamente `Authorization: Bearer <token>` armazenado em `localStorage` (`rc_token`);
  - trata mensagens de erro HTTP (`400`, `401`, `403`, `404`, `409`, `500`) e invalidação de sessão (`401`);
  - resolve URLs de imagens locais servidas pelo backend (`/uploads/**`) usando `VITE_API_URL`.
- Módulos de serviço disponíveis em `src/services/`:
  - `authService.js`, `usersService.js`, `categoriesService.js`, `placesService.js`, `tripsService.js`, `preferencesService.js`, `itinerariesService.js`, `favoritesService.js`, `feedbacksService.js`, `recommendationsService.js`.
- Contexto de autenticação em `src/context/AuthContext.jsx`:
  - hidrata o usuário logado via `GET /auth/me` ao iniciar a aplicação;
  - expõe `login`, `register` (com opção segura de solicitar perfil `NATIVO`), `logout` e `updateProfile`.

---

## Telas e Funcionalidades

| Rota | Página | Descrição |
|---|---|---|
| `/` | **Home** (`Home.jsx`) | Preserva Hero, Destinos, Sobre Nós, Roteiros, Momentos, Blog e Recomendações. A grade de locais populares e filtros por categoria/busca consomem `GET /places`, `GET /categories` e `GET /favorites/me`; a recomendação rápida usa `POST /recommendations/preview`. |
| `/explorar` | **Explorar** (`Explorar.jsx`) | Catálogo completo conectado à API com busca textual, filtro por categoria, cidade/estado, faixa de preço, favoritos persistidos e estados explícitos de carregamento, vazio e erro. |
| `/local` e `/local/:id` | **Detalhes do Local** (`Location.jsx`) | Página migrada preservada e integrada ao backend: capa, galeria de fotos reais, endereço/horários, favoritar, avaliação única por usuário/local com criação e edição, envio/edição de locais e upload multipart de imagens para `NATIVO`/`ADMIN`, e moderação de status para `ADMIN`. |
| `/roteiros` | **Planejador de Roteiros** (`Roteiros.jsx`) | Criação de viagem (`POST /trip`, validando limite de 30 dias), seleção de categorias/atrações reais, geração e persistência de roteiro diário (`POST /itineraries/generate/{tripId}`), consulta de roteiros salvos (`GET /trip/me` / `?tripId=`) e prévia determinística sem login (`POST /recommendations/preview`). |
| `/admin` | **Painel Administrativo** (`AdminPage.jsx`) | Exclusivo para `ADMIN`: aprovação/rejeição de locais (`EM_AVALIACAO`, `APROVADO`, `REJEITADO` com motivo) com pré-visualização das imagens enviadas, CRUD de categorias e aprovação de solicitações para `NATIVO` / alteração de roles. |
| `/comunidade` | **Comunidade & Blog** (`Community.jsx`) | Layout e identidade preservados com header/footer unificados e indicação explícita de que os posts/artigos são conteúdo demonstrativo fora do escopo transacional do MVP. |

- **Modal de Autenticação e Conta (`AuthAccountModal.jsx`)**: login (com preenchimento rápido das contas demo), cadastro com fluxo explícito de solicitação `NATIVO` (não concede privilégio imediato) e painel de conta com abas **Meus Dados**, **Favoritos**, **Minhas Viagens** e **Meus Locais** (incluindo envio de novo local com campos opcionais e upload multipart com retentativa segura em caso de falha parcial).
- **Roteamento SPA na Vercel (`vercel.json`)**: configurado rewrite global para `/index.html`, permitindo recarregar diretamente rotas como `/explorar`, `/local/:id`, `/roteiros` e `/admin`.

---

## Contas Demonstrativas

Quando o backend `rc-service` sobe com o `DataInitializer` ativo, estão disponíveis as contas (senha **`Senha@123`**):

- **Administrador (`ADMIN`):** `admin@rotacultural.com`
- **Nativo (`NATIVO`):** `nativo@rotacultural.com`
- **Usuário (`USUARIO`):** `usuario@rotacultural.com`

---

## Status do MVP

- **Concluído no MVP:** Autenticação JWT real, modais de login/cadastro/conta, exploração de locais via API com filtros, detalhes/galeria/upload de imagens (com retentativa sem duplicar local), pré-visualização de fotos pendentes no `/admin`, favoritos persistidos, 1 avaliação editável por usuário/local, criação de viagens (até 30 dias), recomendações determinísticas, geração/salvamento/reabertura de roteiros e `vercel.json` para SPA.
- **Conteúdo demonstrativo preservado (fora do CRUD transacional):** Artigos editoriais e discussões da página `/comunidade` (`Community`) e fotos estáticas complementares da Home (`Momentos` / `Blog`), claramente sinalizados como demonstrativos.
- **Deploy Vercel:** Preparado via `../deploy/vercel-deploy.ps1` aguardando URL final da API no Azure e autorização de publicação.
