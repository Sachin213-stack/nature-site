"""Nature 3D — FastAPI application entry point."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from apps.api.config import settings
from apps.api.routers.guide import router as guide_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    """Startup / shutdown hooks."""
    yield


app = FastAPI(
    title="Nature 3D API",
    version="0.1.0",
    lifespan=lifespan,
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(guide_router)


# --- Health ---
@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe. Returns 200 when the process is up."""
    return {"status": "ok"}
