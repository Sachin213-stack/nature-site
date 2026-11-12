"""Smoke tests for the FastAPI application."""

from apps.api.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_returns_200() -> None:
    """GET /health must return 200 with status ok."""
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_health_body_shape() -> None:
    """Health response must contain exactly the expected status key."""
    resp = client.get("/health")
    body = resp.json()
    assert "status" in body
    assert body["status"] == "ok"
