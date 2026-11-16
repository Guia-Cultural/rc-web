# Rota Cultural — Frontend (`rc-web`)

## Stack e Estrutura
- **Stack:** React 19, Vite 8, React Router DOM 7, JavaScript ESModules, CSS modular preservado.
- **Pastas principais (`src/`):**
  - `services/` (`apiClient.js`, `authService.js`, `placesService.js`, `tripsService.js`, `itinerariesService.js`, etc.)
  - `context/` (`AuthContext.jsx`, `ModalContext.jsx`)
  - `pages/` (`Home`, `Explorar`, `Location`, `Roteiros`, `AdminPage`, `Community`)
  - `features/` (`local/`, `roteiros/`, `Visit/`, `Community/`)
  - `components/` (`Header`, `Footer`, `AccountModal/AuthAccountModal`)

## Regras Visuais (CRÍTICO)
- **Visual congelado:** não redesenhar páginas, cores, fontes, animações ou estrutura.
- **Proibido:** Next.js, Tailwind CSS, Redux ou troca de biblioteca de UI.
- Alterações devem apenas conectar APIs, corrigir formulários, exibir erros/sucessos, ajustar responsividade pontual ou criar diálogos simples reutilizando o CSS existente.

## Padrões de Integração
- Toda chamada HTTP passa por `src/services/apiClient.js` com `Authorization: Bearer` automático (`rc_token`) e `VITE_API_URL`.
- URLs de imagens `/uploads/**` são resolvidas via `resolveAssetUrl(url)`.
- Fluxos principais não podem depender de arrays mockados (apenas conteúdo editorial/demonstrativo sinalizado em `/comunidade` e ambientação).
- Upload de imagens em cadastro de local deve suportar retentativa em erro parcial sem duplicar o local criado.

## Comandos e Documentação
- Dev: `npm run dev` | Build: `npm run build` | Lint: `npm run lint`
- Docs e progresso: `README.md`, `docs/MIGRATION_PROGRESS.md`, `docs/MVP_PROGRESS.md`, skill `.agents/skills/rotacultural-frontend/SKILL.md`.
- Git: commitar apenas em `feat/mvp-integration`; nunca fazer merge na `main` sem aprovação.
