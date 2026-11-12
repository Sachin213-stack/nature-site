"""Application settings loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Central configuration.

    Values come from environment variables (or an ``.env`` file when present).
    Only the backend reads these; nothing here is exposed to the frontend.
    """

    # --- Database ---
    database_url: str = "postgresql+asyncpg://nature:nature@localhost:5432/nature"
    database_url_sync: str = "postgresql+psycopg2://nature:nature@localhost:5432/nature"

    # --- NVIDIA NIM (AI) ---
    nvidia_nim_base_url: str = "https://integrate.api.nvidia.com/v1"
    nvidia_nim_api_key: str = ""
    nvidia_nim_model: str = ""

    # --- App ---
    cors_origins: str = "http://localhost:5173"
    log_transcripts: bool = False
    debug: bool = False

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
