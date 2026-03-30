# CapyCMS Blog Templates

**50 templates de blog Next.js** prêts à l'emploi, déployables sur GitHub Pages.

🔗 **[Démo en ligne](https://templates.capycms.com)** — Parcourez et prévisualisez les 50 templates.

## Utilisation rapide

1. Cliquez sur **"Use this template"** sur GitHub
2. Clonez votre nouveau repo
3. Lancez le script de configuration :

```bash
npm install
npm run setup
```

Le script interactif vous guide pour :
- **Choisir un template** parmi 50 styles (6 catégories)
- **Nommer votre blog** (titre, auteur, description)
- **Configurer un domaine custom** (optionnel)
- **Nettoyer** tous les fichiers de démo et le catalogue

Vous obtenez un blog propre, prêt à écrire.

### Mode non-interactif

```bash
npm run setup -- --template blank-canvas --title "Mon Blog" --author "Alice" --description "Un blog tech"
```

## Catégories de templates

| Catégorie | Nb | Exemples |
|---|---|---|
| **Minimal** | 8 | Blank Canvas, Stark Monochrome, Grid Dots |
| **Editorial** | 8 | Magazine Grid, Newspaper Classic, Folio Editorial |
| **Developer** | 8 | Devlog Terminal, Hacker Neon, Retro Terminal |
| **Creative** | 9 | Rainbow Cards, Neon Glitch, Retro 70s |
| **Business** | 9 | Corporate Minimal, Landing Blog, Resource Hub |
| **Personal** | 8 | Cozy Blog, Digital Garden, Indie Maker |

## Stack technique

- **Next.js 16** — App Router, static export
- **Tailwind CSS v4** — Avec `@tailwindcss/typography`
- **next-mdx-remote v6** — Rendu MDX côté serveur
- **gray-matter** — Frontmatter YAML
- **GitHub Pages** — Déploiement automatique via GitHub Actions

## Structure après setup

```
content/posts/          # Vos articles en Markdown
src/components/blog/    # Le template choisi
  BlogLayout.tsx        # Layout principal
  ArticleList.tsx       # Page d'accueil (liste)
  ArticlePage.tsx       # Page article
  config.ts             # Configuration du template
src/components/shared/  # Composants réutilisables
src/lib/                # Types et utilitaires
```

## Écrire un article

Créez un fichier `.md` dans `content/posts/` :

```markdown
---
title: "Mon premier article"
date: "2025-01-15"
author: "Alice"
excerpt: "Un résumé de l'article."
tags: ["nextjs", "blog"]
coverImage: "/images/cover.jpg"
---

Votre contenu en **Markdown** ici.
```

## Déployer

Le workflow GitHub Actions est inclus. Activez GitHub Pages (Settings → Pages → Source: GitHub Actions) et chaque push sur `main` déploie automatiquement.

## Développement

```bash
npm run dev          # Serveur de dev
npm run build        # Build statique
npm run setup        # Configurer le blog
```

## Licence

MIT
