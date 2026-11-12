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


def test_guide_chat_fallback() -> None:
    """POST /api/guide/chat returns grounded fallback response when unconfigured."""
    resp = client.post(
        "/api/guide/chat",
        json={"query": "What is the 73% decline metric?", "section": "loss"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "reply" in data
    assert "73%" in data["reply"]
    assert "src-lpr-2024" in data["sources"]
    assert "NOT 73% of total animals dying" in data["caveat"]
