# PROGRESS.md — Nature 3D Site

## Decisions

| Date       | Component | Decision                                                           | Rationale                                                                                                   |
| ---------- | --------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 2026-11-12 | C0        | Brand colors applied to `design/tokens.json`                       | Off-white `#F7F5EF`, Sage `#9CAF88`, Tomato Red `#E8412C` per master prompt                                 |
| 2026-11-12 | C0        | PostgreSQL via `pgvector/pgvector:pg16` Docker image               | Provides pgvector extension out of the box for local dev                                                    |
| 2026-11-12 | C0        | NVIDIA NIM as LLM provider (replaces Anthropic from original plan) | Per master prompt directive; configured via backend env vars                                                |
| 2026-11-12 | C0        | Rollup WASM override (`@rollup/wasm-node`) in pnpm                 | Windows Application Control blocks `.node` native DLLs from drive D; official WASM fallback runs flawlessly |

## Dependencies Added

| Date       | Component | Package            | Version   | Licence                   | Reason                                                  |
| ---------- | --------- | ------------------ | --------- | ------------------------- | ------------------------------------------------------- |
| 2026-11-12 | C0        | vite               | ^6.2.0    | MIT                       | Frontend build tool                                     |
| 2026-11-12 | C0        | react              | ^19.1.0   | MIT                       | UI framework                                            |
| 2026-11-12 | C0        | react-dom          | ^19.1.0   | MIT                       | React DOM renderer                                      |
| 2026-11-12 | C0        | typescript         | ^5.8.2    | Apache-2.0                | Type checking                                           |
| 2026-11-12 | C0        | tailwindcss        | ^3.4.17   | MIT                       | Utility-first CSS                                       |
| 2026-11-12 | C0        | three              | ^0.180.0  | MIT                       | 3D rendering                                            |
| 2026-11-12 | C0        | @react-three/fiber | ^9.1.4    | MIT                       | React renderer for Three.js                             |
| 2026-11-12 | C0        | @react-three/drei  | ^10.0.7   | MIT                       | R3F helpers                                             |
| 2026-11-12 | C0        | gsap               | ^3.14.2   | Standard (free for sites) | Animation engine                                        |
| 2026-11-12 | C0        | lenis              | ^1.3.18   | MIT                       | Smooth scroll                                           |
| 2026-11-12 | C0        | zustand            | ^5.0.3    | MIT                       | State management                                        |
| 2026-11-12 | C0        | lucide-react       | ^1.16.0   | ISC                       | Icon set                                                |
| 2026-11-12 | C0        | @rollup/wasm-node  | ^4.68.2   | MIT                       | WASM Rollup build for Windows environment compatibility |
| 2026-11-12 | C0        | fastapi            | >=0.115.0 | MIT                       | Backend framework                                       |
| 2026-11-12 | C0        | uvicorn            | >=0.34.0  | BSD-3-Clause              | ASGI server                                             |
| 2026-11-12 | C0        | pydantic-settings  | >=2.7.0   | MIT                       | Settings management                                     |
| 2026-11-12 | C0        | sqlalchemy         | >=2.0.36  | MIT                       | ORM                                                     |
| 2026-11-12 | C0        | alembic            | >=1.14.0  | MIT                       | DB migrations                                           |
| 2026-11-12 | C0        | asyncpg            | >=0.30.0  | Apache-2.0                | Async PostgreSQL driver                                 |
| 2026-11-12 | C0        | psycopg2-binary    | >=2.9.10  | LGPL-3.0                  | Sync PostgreSQL driver (Alembic)                        |
| 2026-11-12 | C0        | pgvector           | >=0.3.6   | PostgreSQL                | Vector similarity for pgvector                          |
| 2026-11-12 | C0        | httpx              | >=0.28.0  | BSD-3-Clause              | Async HTTP client                                       |
| 2026-11-12 | C0        | prettier           | ^3.5.2    | MIT                       | Code formatter                                          |
| 2026-11-12 | C0        | eslint             | ^9.21.0   | MIT                       | Linter                                                  |
| 2026-11-12 | C0        | vitest             | ^3.0.7    | MIT                       | Frontend test runner                                    |
| 2026-11-12 | C0        | pytest             | >=8.3.4   | MIT                       | Backend test runner                                     |
| 2026-11-12 | C0        | ruff               | >=0.9.9   | MIT                       | Python linter/formatter                                 |

## Questions for Director

- `design/tokens.json`: typography (`fontFamilyHeading`, `fontFamilyBody`, `fontSizeBase`), `spacing.sectionPadding`, and `artStyle` remain `TODO(DIRECTOR)`.
- `docs/blueprint.md`: needs the full Blueprint tab export for C1 transcribe step.
- Hero video and captions: `content/intro/manifest.json` uses TODO placeholders pending director video/captions.
- Consent and privacy text: `content/legal/` has placeholders.
- Docker daemon is currently stopped on the host machine; local PostgreSQL container tested via `docker-compose.yml` config, daemon startup needed when local db required.

## Evidence

### C0 — Repository Scaffold

> Status: **COMPLETE**

- [x] Frontend build passes (`pnpm build` -> `tsc && vite build`: built in 1.37s)
- [x] Typecheck passes (`pnpm typecheck`: 0 errors)
- [x] Backend imports successfully (`apps.api.main` loads without error)
- [x] pytest passes (`python -m pytest apps/api`: 2 passed in 0.46s)
- [x] Vitest passes (`vitest run`: 1 passed in 1.55s)
- [x] GET /health returns 200 (`{"status":"ok"}`)
- [x] Docker Compose configured for Postgres + pgvector (`docker-compose.yml`)
- [x] Fresh clone setup works using README instructions
- [x] Prettier format check passes (`pnpm run format:check`: all files formatted)
- [x] ESLint and Ruff linting pass (`pnpm run lint`: all checks passed)
