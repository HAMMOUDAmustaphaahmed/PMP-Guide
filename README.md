# PMP Guide

Un guide interactif de gestion de projet et de préparation à la certification PMP : 12 chapitres, un calculateur de valeur acquise (EVM), un glossaire et une liste de lecture. Disponible en français, en anglais et en arabe (lecture de droite à gauche).

## Pages

| Adresse | Contenu |
|---|---|
| `/` | Accueil. Une scène Three.js suit le défilement : 2 400 points passent du désordre au triangle des contraintes, puis à un planning de Gantt, puis aux courbes de valeur acquise. |
| `/guide` | Sommaire : une ligne par chapitre, avec l'état de lecture. |
| `/guide/ch1` … `/guide/ch12` | Lecture d'un chapitre, avec son plan à gauche et les chapitres voisins en bas. |
| `/calculateur`, `/annexes`, `/bibliotheque` | Les trois outils. |

## Ce que fait l'application

| Partie | Détail |
|---|---|
| Guide | 12 chapitres en sections typées : tableaux, encadrés, badges, phases, KPI, SWOT, matrice des risques. |
| Suivi de lecture | Chaque chapitre peut être marqué comme lu. La progression reste dans le navigateur. |
| Calculateur EVM | Quatre montants (BAC, PV, EV, AC) donnent CPI, SPI, CV, SV, EAC, ETC, VAC et TCPI, avec un verdict en clair. |
| Liste de lecture | 70 ouvrages de référence. Chacun peut y attacher ses propres PDF, qui restent dans son navigateur (IndexedDB). Aucun livre n'est distribué avec l'application. |
| Édition du contenu | Un administrateur modifie le guide depuis l'interface, langue par langue. Le serveur enregistre le résultat. |

## Technique

- **Interface** : React 19, Vite 5, React Router, Zustand, Framer Motion, Three.js (React Three Fiber), Lucide.
- **Serveur** : Python, FastAPI, SQLite. Un seul fichier, `api/main.py`.
- **Tests** : 9 tests d'API (pytest) et 5 tests du calcul EVM (`node --test`).

### Animation

Les réglages communs (durées, courbes, ressorts, variantes) sont dans `src/lib/motion.js`. Seuls `transform` et `opacity` sont animés.

- La scène de l'accueil (`src/components/landing/`) est pilotée par `useScroll` : la position dans le récit choisit la figure, et les points glissent de l'une à l'autre. Three.js est chargé à part, après le texte, et la scène se met en pause hors écran. Sans WebGL, un dessin statique la remplace.

- `MotionConfig reducedMotion="user"` coupe les déplacements quand le système demande moins d'animations. La scène 3D passe alors d'une figure à l'autre sans mouvement continu.
- Le fil de lecture d'un chapitre et le bouton « haut de page » suivent le défilement avec `useScroll`, sans rendu React à chaque image.
- Le lien actif du menu, la section en cours de lecture et la langue choisie glissent d'une position à l'autre (`layoutId`).
- Dans le sommaire, la barre de chaque chapitre se trace à l'ouverture ; sa longueur suit le nombre de sections.
- Les nombres du calculateur s'animent vers leur nouvelle valeur ; les lecteurs d'écran lisent directement la valeur finale.

### Accessibilité

Navigation complète au clavier, focus visible, lien d'évitement, fenêtres modales qui gardent le focus et se ferment avec Échap, libellés sur tous les champs, cibles tactiles d'au moins 40 px. Un statut n'est jamais indiqué par la couleur seule : il a aussi une icône et un texte.

### Sécurité de l'administration

- Aucun identifiant dans le code ni dans le navigateur. Le mot de passe est vérifié par le serveur contre une empreinte PBKDF2-SHA256 lue dans l'environnement.
- La connexion renvoie un jeton signé (HMAC-SHA256) valable 8 heures, gardé le temps de la session.
- Cinq échecs de connexion en cinq minutes bloquent l'adresse appelante.
- Le contenu envoyé est validé (forme et taille) avant d'être enregistré.

Sans serveur (hébergement statique), l'application fonctionne en lecture seule : le guide, le calculateur et la liste de lecture restent disponibles, et le bouton de connexion n'apparaît pas.

## Lancer en local

Il faut Node 20+ et Python 3.10+.

```bash
npm install
npm run dev          # interface sur http://localhost:5173
```

Pour l'administration, dans un second terminal :

```bash
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements-dev.txt   # macOS / Linux : .venv/bin/python
.venv\Scripts\python -m api.hash_password                     # affiche les deux valeurs secrètes
```

Copiez `.env.example` en `.env`, collez-y les deux valeurs, chargez-les dans votre terminal, puis :

```bash
npm run api          # serveur sur http://127.0.0.1:8000, relayé par Vite sous /api
```

## Tests

```bash
npm test             # calcul EVM
npm run test:api     # API
```

## Organisation

```
api/main.py                 authentification, contenu, validation
api/tests/                  tests de l'API
src/data/content.js         contenu par défaut du guide
src/lib/motion.js           réglages d'animation partagés
src/lib/evm.js              formules de valeur acquise
src/stores/                 état (contenu, session, langue, progression, liste de lecture)
src/pages/                  accueil, sommaire, lecture d'un chapitre
src/components/             interface, un dossier par zone
src/components/landing/     scène Three.js et ses quatre figures
src/styles/main.css         jetons de design et styles
```

## Design

Fond froid, encre marine et bleu cobalt pour les actions. Le rouge ne sert qu'au chemin critique et aux écarts, comme dans les outils de planification. Chaque chapitre porte en plus sa propre couleur. Titres en Bricolage Grotesque, texte en DM Sans, chiffres en JetBrains Mono, arabe en IBM Plex Sans Arabic.

## Limites connues

- Les polices viennent de Google Fonts : sans réseau, le navigateur utilise ses polices système.
- Three.js pèse environ 240 Ko compressés. Il n'est chargé que sur l'accueil.

- Les sections des chapitres ne sont rédigées qu'en français. En anglais et en arabe, seuls l'interface, les titres et les descriptions de chapitres sont traduits.
- La limitation des tentatives de connexion est gardée en mémoire : elle repart de zéro au redémarrage du serveur.
- SQLite convient à un seul serveur. Sur un hébergement sans disque persistant, il faut pointer `PMP_DB` vers un volume ou changer de base.

## Licence

MIT.
