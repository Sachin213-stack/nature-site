# Nature 3D

A scroll-driven 3D website about nature loss and recovery, featuring a grounded AI guide, six immersive sections, and source-cited factual claims.

> **Status:** C0 scaffold — builds and runs locally; no feature code yet.

## Stack

| Layer       | Technology                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| Frontend    | Vite · React · TypeScript (strict) · Tailwind · Three.js / R3F / Drei · GSAP + ScrollTrigger · Lenis · Zustand |
| Backend     | Python · FastAPI · Pydantic Settings · SQLAlchemy 2 · Alembic                                                  |
| Database    | PostgreSQL 16 + pgvector                                                                                       |
| AI          | NVIDIA NIM (OpenAI-compatible chat completions)                                                                |
| Voice       | STT / TTS behind adapter interfaces                                                                            |
| Tests       | Vitest (frontend) · pytest (backend)                                                                           |
| Package mgr | pnpm                                                                                                           |

## Quick Start

### Prerequisites

- **Node.js** ≥ 20 (managed via nvm recommended)
- **pnpm** ≥ 9
- **Python** ≥ 3.11
- **Docker** + Docker Compose (for local PostgreSQL)

### 1. Clone and install

```bash
git clone <repo-url> nature-site
cd nature-site

# Frontend dependencies
pnpm install

# Backend dependencies
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate
pip install -r apps/api/requirements.txt
```

### 2. Environment variables

```bash
# Frontend
cp apps/web/.env.example apps/web/.env

# Backend
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your database URL and NVIDIA NIM credentials
```

### 3. Start the database

```bash
docker compose up -d db
```

Wait for the health check to pass, then optionally run migrations:

```bash
alembic upgrade head
```

### 4. Run the backend

```bash
uvicorn apps.api.main:app --reload --port 8000
```

Verify: `curl http://localhost:8000/health` → `{"status":"ok"}`

### 5. Run the frontend

```bash
pnpm dev:web
```

Opens at `http://localhost:5173`.

## Scripts

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev:web`      | Start Vite dev server              |
| `pnpm dev:api`      | Start FastAPI with hot reload      |
| `pnpm build`        | Production build (frontend)        |
| `pnpm typecheck`    | TypeScript strict check            |
| `pnpm lint`         | ESLint (frontend) + Ruff (backend) |
| `pnpm test`         | Vitest + pytest                    |
| `pnpm test:web`     | Vitest only                        |
| `pnpm test:api`     | pytest only                        |
| `pnpm format:check` | Prettier format check              |

## Project Structure

```
nature-site/
├── AGENTS.md              # Agent working rules
├── PROGRESS.md            # Implementation progress and evidence
├── contracts/             # Shared TypeScript types (single source of truth)
├── content/               # Section Markdown, sources, recovery solutions
│   ├── sections/          # Per-section content files
│   ├── sources.json       # Source records
│   ├── recovery.json      # Recovery solution cards
│   ├── intro/             # Hero video manifest and captions
│   └── legal/             # Privacy and consent text
├── design/
│   ├── tokens.json        # Brand colors and design decisions
│   └── logos/             # Seven section logo SVGs
├── apps/
│   ├── web/               # Vite + React frontend
│   └── api/               # FastAPI backend
│       ├── migrations/    # Alembic migrations
│       └── tests/         # pytest test files
├── corpus/                # Content extracts for retrieval
├── eval/                  # Evaluation question sets
├── scripts/               # Ingestion, evaluation, and utility scripts
├── docs/blueprint.md      # Blueprint content export
├── docker-compose.yml     # Local PostgreSQL
└── alembic.ini            # Alembic configuration
```

## Free-Tier Deployment

See C17 component for deployment details. Target infrastructure:

- **Frontend:** Render Static Site (free)
- **Backend:** Render Free Web Service (cold starts apply)
- **Database:** Supabase Free PostgreSQL (with pgvector if available)
- **AI:** NVIDIA NIM hosted API (subject to account quotas)
- **CI:** GitHub Actions (included free allowance)

## Licence

TODO(DIRECTOR)
