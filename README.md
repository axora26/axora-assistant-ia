# AXORA Assistant IA

Assistant IA professionnel orienté ingénierie MEP, CVC/HVAC, BIM/Revit, Smart Building, automatisation, informatique, web et documents professionnels.

## Objectif

Ce dépôt fournit une base d'application web utilisant l'API OpenAI avec un prompt système professionnel et rigoureux.

## Sécurité

- Ne jamais committer de clé API.
- Utiliser `OPENAI_API_KEY` uniquement comme variable d'environnement côté serveur.
- Le fichier `.env` est ignoré par Git.
- Le dépôt est actuellement public : n'y déposer aucune donnée confidentielle, clé, mot de passe ou document client sensible.

## Installation

```bash
npm install
cp .env.example .env
```

Renseigner ensuite `OPENAI_API_KEY` dans `.env` localement, sans publier ce fichier.

## Démarrage

```bash
npm start
```

Puis ouvrir `http://localhost:3000`.

## Architecture

- `src/server.js` : serveur HTTP et endpoint `/api/chat`
- `src/assistant.js` : appel OpenAI et chargement du prompt système
- `prompts/system.md` : instructions professionnelles de l'assistant
- `public/index.html` : interface utilisateur
- `.env.example` : variables d'environnement attendues

## État

Version initiale : socle applicatif prêt à configurer. Aucun secret n'est stocké dans le dépôt.