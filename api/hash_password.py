"""Génère les valeurs à placer dans .env : python -m api.hash_password"""
import getpass
import secrets

from api.main import hash_password

if __name__ == "__main__":
    password = getpass.getpass("Mot de passe admin : ")
    if len(password) < 10:
        raise SystemExit("Choisissez un mot de passe d'au moins 10 caractères.")
    if password != getpass.getpass("Confirmez : "):
        raise SystemExit("Les deux saisies ne correspondent pas.")
    print(f"PMP_ADMIN_PASSWORD_HASH={hash_password(password)}")
    print(f"PMP_SECRET={secrets.token_urlsafe(48)}")
