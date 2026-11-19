import time

import pytest
from fastapi.testclient import TestClient

from api import main

PASSWORD = "un-mot-de-passe-de-test"
SECRET = "s" * 48

CONTENT = {
    "hero": {
        "eyebrow": "Guide",
        "title": "Project Management",
        "subtitle": "PMP",
        "description": "Description",
        "stats": [{"value": "12", "label": "Chapitres"}],
        "pills": ["Scrum"],
    },
    "chapters": [
        {
            "id": "ch1",
            "num": "01",
            "title": "Fondamentaux",
            "desc": "Concepts",
            "accent": "#2563EB",
            "sections": [{"id": "s1", "type": "table", "heading": "Triangle", "headers": ["A"], "rows": [["1"]]}],
        }
    ],
    "annexes": {"glossary": [["BAC", "Budget"]], "formulas": [["CPI", "EV/AC", ">1", "Agir"]], "checklist": ["Charte"]},
}


@pytest.fixture()
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("PMP_DB", str(tmp_path / "test.sqlite3"))
    monkeypatch.setenv("PMP_ADMIN_USER", "admin")
    monkeypatch.setenv("PMP_ADMIN_PASSWORD_HASH", main.hash_password(PASSWORD, iterations=1000))
    monkeypatch.setenv("PMP_SECRET", SECRET)
    main._attempts.clear()
    return TestClient(main.app)


def _auth(client):
    token = client.post("/api/auth/login", json={"username": "admin", "password": PASSWORD}).json()["token"]
    return {"Authorization": f"Bearer {token}"}


def test_health_reports_configuration(client, monkeypatch):
    assert client.get("/api/health").json() == {"status": "ok", "admin_configured": True}
    monkeypatch.delenv("PMP_SECRET")
    assert client.get("/api/health").json()["admin_configured"] is False


def test_login_refused_when_not_configured(client, monkeypatch):
    monkeypatch.delenv("PMP_ADMIN_PASSWORD_HASH")
    r = client.post("/api/auth/login", json={"username": "admin", "password": PASSWORD})
    assert r.status_code == 503


def test_login_rejects_wrong_password_and_wrong_user(client):
    assert client.post("/api/auth/login", json={"username": "admin", "password": "faux"}).status_code == 401
    assert client.post("/api/auth/login", json={"username": "autre", "password": PASSWORD}).status_code == 401


def test_login_is_rate_limited(client):
    for _ in range(main.LOGIN_MAX_ATTEMPTS):
        assert client.post("/api/auth/login", json={"username": "admin", "password": "faux"}).status_code == 401
    # Même le bon mot de passe est refusé tant que la fenêtre n'est pas écoulée.
    assert client.post("/api/auth/login", json={"username": "admin", "password": PASSWORD}).status_code == 429


def test_token_roundtrip_expiry_and_tampering():
    token = main.make_token("admin", SECRET, ttl=60, now=1000)
    assert main.read_token(token, SECRET, now=1030) == "admin"
    assert main.read_token(token, SECRET, now=1061) is None
    assert main.read_token(token, "x" * 48, now=1030) is None
    payload, signature = token.split(".")
    assert main.read_token(f"{payload}x.{signature}", SECRET, now=1030) is None
    assert main.read_token("n-importe-quoi", SECRET) is None


def test_password_hash_verifies_and_rejects():
    stored = main.hash_password(PASSWORD, iterations=1000)
    assert PASSWORD not in stored
    assert main.verify_password(PASSWORD, stored)
    assert not main.verify_password("autre", stored)
    assert not main.verify_password(PASSWORD, "format-invalide")


def test_content_requires_auth(client):
    assert client.put("/api/content/fr", json=CONTENT).status_code == 401
    assert client.put("/api/content/fr", json=CONTENT, headers={"Authorization": "Bearer faux"}).status_code == 401
    assert client.delete("/api/content/fr").status_code == 401


def test_content_roundtrip_keeps_extra_section_fields(client):
    assert client.get("/api/content/fr").status_code == 404
    headers = _auth(client)
    assert client.put("/api/content/fr", json=CONTENT, headers=headers).status_code == 200
    stored = client.get("/api/content/fr").json()
    assert stored["content"] == CONTENT
    assert stored["updated_at"] <= time.time()
    # Les langues sont indépendantes.
    assert client.get("/api/content/en").status_code == 404
    assert client.delete("/api/content/fr", headers=headers).status_code == 204
    assert client.get("/api/content/fr").status_code == 404


def test_content_validation(client):
    headers = _auth(client)
    assert client.put("/api/content/de", json=CONTENT, headers=headers).status_code == 422
    assert client.put("/api/content/fr", json={"hero": {}}, headers=headers).status_code == 422
    huge = {**CONTENT, "annexes": {**CONTENT["annexes"], "checklist": ["x" * 4000] * 200}}
    assert client.put("/api/content/fr", json=huge, headers=headers).status_code == 413
