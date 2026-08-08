# AXORA Assistant IA

Assistant IA professionnel orienté ingénierie MEP, CVC/HVAC, BIM/Revit, Smart Building, automatisation, informatique, web et documents professionnels.

## Version 2

La V2 ajoute :

- conversation multi-tour ;
- persistance locale de l'historique dans le navigateur ;
- sélection GPT-5.6 / GPT-5.6 Sol ;
- interface AXORA sombre de type command center ;
- endpoint de santé `/api/health` ;
- export Markdown de la conversation ;
- limites serveur et gestion d'erreurs renforcée.

## Sécurité

- Ne jamais committer de clé API.
- Utiliser `OPENAI_API_KEY` uniquement comme variable d'environnement côté serveur.
- `.env` et `.env.local` sont ignorés par Git.
- Le dépôt est actuellement public : ne jamais y déposer de secrets, données clients ou documents confidentiels.

## Installation locale

Prérequis : Node.js 20 ou supérieur.

```bash
npm install
cp .env.example .env
```

Configurer ensuite localement `OPENAI_API_KEY` dans `.env`, sans publier ce fichier.

## Démarrage

```bash
npm start
```

Ouvrir ensuite `http://localhost:3000`.

## Variables d'environnement

```text
OPENAI_API_KEY=<secret côté serveur>
OPENAI_MODEL=gpt-5.6
PORT=3000
```

## Architecture

- `src/server.js` : serveur Express, API de chat et health check ;
- `src/assistant.js` : intégration OpenAI Responses API ;
- `prompts/system.md` : instructions professionnelles de l'assistant ;
- `public/index.html` : interface command center ;
- `.env.example` : exemple sans secret.

## Contrôles avant production

1. rendre le dépôt privé si le projet doit contenir des éléments AXORA confidentiels ;
2. configurer `OPENAI_API_KEY` dans les secrets du fournisseur d'hébergement ;
3. ajouter authentification et contrôle d'accès avant exposition publique ;
4. ajouter rate limiting et journalisation structurée ;
5. effectuer des tests fonctionnels avec une clé API valide ;
6. définir une politique de conservation des conversations et fichiers.

## État

V2 applicative publiée dans le dépôt. La configuration d'un secret API et le test live doivent être effectués dans l'environnement d'exécution, jamais dans Git.