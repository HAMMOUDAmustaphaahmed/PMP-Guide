"""API du Guide PMP : authentification admin et persistance du contenu.

Tout est configuré par variables d'environnement (voir .env.example).
Aucun identifiant n'est écrit dans le code ni envoyé au navigateur.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import sqlite3
import time
from collections import defaultdict, deque
from contextlib import closing
from typing import Any, Literal

from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

Lang = Literal["fr", "en", "ar"]

TOKEN_TTL = 8 * 3600  # secondes
MAX_CONTENT_BYTES = 512 * 1024
LOGIN_MAX_ATTEMPTS = 5
LOGIN_WINDOW = 300  # secondes


def _env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


# ---------------------------------------------------------------- mots de passe

def hash_password(password: str, *, iterations: int = 310_000, salt: bytes | None = None) -> str:
    """Retourne « pbkdf2_sha256$iterations$sel_hex$hash_hex »."""
    salt = salt or os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, iterations)
    return f"pbkdf2_sha256${iterations}${salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        scheme, iterations, salt_hex, hash_hex = stored.split("$")
        if scheme != "pbkdf2_sha256":
            return False
        digest = hashlib.pbkdf2_hmac(
            "sha256", password.encode(), bytes.fromhex(salt_hex), int(iterations)
        )
    except (ValueError, TypeError):
        return False
    return hmac.compare_digest(digest.hex(), hash_hex)


# ---------------------------------------------------------------------- jetons

def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def _unb64(text: str) -> bytes:
    return base64.urlsafe_b64decode(text + "=" * (-len(text) % 4))


def make_token(subject: str, secret: str, *, ttl: int = TOKEN_TTL, now: float | None = None) -> str:
    payload = _b64(json.dumps({"sub": subject, "exp": int((now or time.time()) + ttl)}).encode())
    signature = _b64(hmac.new(secret.encode(), payload.encode(), hashlib.sha256).digest())
    return f"{payload}.{signature}"


def read_token(token: str, secret: str, *, now: float | None = None) -> str | None:
    """Retourne le sujet si le jeton est valide et non expiré, sinon None."""
    try:
        payload, signature = token.split(".")
        expected = _b64(hmac.new(secret.encode(), payload.encode(), hashlib.sha256).digest())
        if not hmac.compare_digest(signature, expected):
            return None
        data = json.loads(_unb64(payload))
        if data["exp"] < (now or time.time()):
            return None
        return str(data["sub"])
    except (ValueError, KeyError, TypeError):
        return None


# ------------------------------------------------------------------- stockage

def _db_path() -> str:
    return _env("PMP_DB", os.path.join(os.path.dirname(__file__), "pmp.sqlite3"))


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(_db_path())
    conn.execute(
        "CREATE TABLE IF NOT EXISTS content ("
        "lang TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at INTEGER NOT NULL)"
    )
    return conn


# -------------------------------------------------------------------- schémas

class LoginIn(BaseModel):
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=256)


class HeroStat(BaseModel):
    value: str = Field(max_length=40)
    label: str = Field(max_length=80)


class Hero(BaseModel):
    eyebrow: str = Field(max_length=200)
    title: str = Field(max_length=200)
    subtitle: str = Field(max_length=300)
    description: str = Field(max_length=2000)
    stats: list[HeroStat] = Field(max_length=12)
    pills: list[str] = Field(max_length=30)


class Section(BaseModel, extra="allow"):
    id: str = Field(max_length=40)
    type: str = Field(max_length=40)
    heading: str = Field(max_length=300)


class Chapter(BaseModel, extra="allow"):
    id: str = Field(max_length=40)
    num: str = Field(max_length=8)
    title: str = Field(max_length=300)
    desc: str = Field(max_length=600)
    sections: list[Section] = Field(max_length=40)


class Annexes(BaseModel, extra="allow"):
    glossary: list[list[str]] = Field(max_length=300)
    formulas: list[list[str]] = Field(max_length=100)
    checklist: list[str] = Field(max_length=200)


class ContentIn(BaseModel):
    hero: Hero
    chapters: list[Chapter] = Field(max_length=40)
    annexes: Annexes


# ---------------------------------------------------------------- application

app = FastAPI(title="PMP Guide API", version="3.0.0", docs_url="/api/docs", openapi_url="/api/openapi.json")

_origins = [o.strip() for o in _env("PMP_CORS_ORIGINS").split(",") if o.strip()]
if _origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_origins,
        allow_methods=["GET", "PUT", "POST", "DELETE"],
        allow_headers=["Authorization", "Content-Type"],
    )

_attempts: dict[str, deque[float]] = defaultdict(deque)


def _admin_config() -> tuple[str, str, str]:
    user = _env("PMP_ADMIN_USER", "admin")
    pw_hash = _env("PMP_ADMIN_PASSWORD_HASH")
    secret = _env("PMP_SECRET")
    if not pw_hash or len(secret) < 32:
        raise HTTPException(503, "Administration non configurée sur ce serveur.")
    return user, pw_hash, secret


def require_admin(authorization: str = Header(default="")) -> str:
    _, _, secret = _admin_config()
    scheme, _, token = authorization.partition(" ")
    subject = read_token(token, secret) if scheme.lower() == "bearer" else None
    if not subject:
        raise HTTPException(401, "Session expirée ou invalide.")
    return subject


@app.get("/api/health")
def health() -> dict[str, Any]:
    configured = bool(_env("PMP_ADMIN_PASSWORD_HASH")) and len(_env("PMP_SECRET")) >= 32
    return {"status": "ok", "admin_configured": configured}


@app.post("/api/auth/login")
def login(body: LoginIn, request: Request) -> dict[str, Any]:
    user, pw_hash, secret = _admin_config()
    client = request.client.host if request.client else "inconnu"
    now = time.time()
    recent = _attempts[client]
    while recent and recent[0] < now - LOGIN_WINDOW:
        recent.popleft()
    if len(recent) >= LOGIN_MAX_ATTEMPTS:
        raise HTTPException(429, "Trop de tentatives. Réessayez dans quelques minutes.")

    # Les deux comparaisons sont toujours faites, pour ne pas révéler laquelle a échoué.
    user_ok = hmac.compare_digest(body.username.encode(), user.encode())
    pass_ok = verify_password(body.password, pw_hash)
    if not (user_ok and pass_ok):
        recent.append(now)
        raise HTTPException(401, "Identifiants incorrects.")

    recent.clear()
    return {"token": make_token(user, secret), "expires_in": TOKEN_TTL, "user": user}


@app.get("/api/auth/me")
def me(subject: str = Depends(require_admin)) -> dict[str, str]:
    return {"user": subject}


@app.get("/api/content/{lang}")
def get_content(lang: Lang) -> dict[str, Any]:
    with closing(_connect()) as conn:
        row = conn.execute("SELECT data, updated_at FROM content WHERE lang = ?", (lang,)).fetchone()
    if not row:
        raise HTTPException(404, "Aucun contenu enregistré pour cette langue.")
    return {"lang": lang, "updated_at": row[1], "content": json.loads(row[0])}


@app.put("/api/content/{lang}")
def put_content(lang: Lang, body: ContentIn, _: str = Depends(require_admin)) -> dict[str, Any]:
    data = json.dumps(body.model_dump(), ensure_ascii=False)
    if len(data.encode()) > MAX_CONTENT_BYTES:
        raise HTTPException(413, "Contenu trop volumineux.")
    now = int(time.time())
    with closing(_connect()) as conn, conn:
        conn.execute(
            "INSERT INTO content (lang, data, updated_at) VALUES (?, ?, ?) "
            "ON CONFLICT(lang) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at",
            (lang, data, now),
        )
    return {"lang": lang, "updated_at": now}


@app.delete("/api/content/{lang}", status_code=204, response_class=Response)
def delete_content(lang: Lang, _: str = Depends(require_admin)) -> Response:
    with closing(_connect()) as conn, conn:
        conn.execute("DELETE FROM content WHERE lang = ?", (lang,))
    return Response(status_code=204)
