---
name: rotacultural-frontend
description: >-
  Use when connecting React pages, forms, modals, or services to rc-service in
  rc-web while preserving the original CSS and visual layout.
---

# Rota Cultural Frontend Workflow (`rc-web`)

## Objectives
Finish and maintain real API integrations in `rc-web` without redesigning screens or adding disallowed frameworks (no Next.js, Tailwind, or Redux).

## Procedure
1. **Reuse Components & Styles**: Edit existing components in `src/pages/`, `src/features/`, and `src/components/`. Reuse existing `Header`, `Footer`, button classes, and modal styles.
2. **API Integration**:
   - Perform all HTTP calls through `src/services/apiClient.js` and domain services (`placesService`, `tripsService`, `itinerariesService`, `favoritesService`, `feedbacksService`, `recommendationsService`, `categoriesService`, `usersService`).
   - Hydrate authenticated user state via `AuthContext` (`GET /auth/me` using `rc_token`).
   - Resolve backend-served image paths with `resolveAssetUrl(url)`.
3. **Simple Forms & Partial Upload Safety**:
   - Keep state localized (`useState`, `useEffect`, `useContext`).
   - When creating a place + uploading images, capture the returned place ID immediately so upload retries target the existing place instead of creating duplicates.
   - Surface clear loading, empty, and backend error states to the user.

## Validation
- Build production bundle:
  `npm run build`
- Run ESLint:
  `npm run lint`
- Confirm both commands exit with code `0` and `0` errors/warnings, and keep `vercel.json` SPA rewrite intact.
