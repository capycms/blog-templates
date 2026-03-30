# Guide : Copier et modifier un template de blog

## Architecture du projet

Chaque template est un dossier dans `src/templates/{id}/` contenant **4 fichiers** :

```
src/templates/mon-template/
├── config.ts          # Métadonnées (nom, catégorie, features)
├── BlogLayout.tsx     # Layout global (header, footer, wrapper)
├── ArticleList.tsx    # Page d'accueil — liste des articles
└── ArticlePage.tsx    # Page d'un article individuel
```

### Fichiers de registre (auto-générés)

| Fichier | Rôle |
|---------|------|
| `src/lib/template-registry.ts` | Importe et exporte tous les composants de templates |
| `src/lib/templates.ts` | Métadonnées de tous les templates (nom, catégorie, description) |

Ces deux fichiers sont régénérés automatiquement par les scripts.

---

## Étape 1 — Copier un template existant

```bash
# Choisir un template source et le copier
cp -r src/templates/one-column-light src/templates/mon-nouveau-template
```

## Étape 2 — Modifier les 4 fichiers

### `config.ts`

```typescript
import { TemplateConfig } from "@/lib/types";

export const config: TemplateConfig = {
  id: "mon-nouveau-template",        // doit correspondre au nom du dossier
  name: "Mon Nouveau Template",       // nom affiché dans le catalogue
  category: "minimal",                // minimal | editorial | developer | creative | business | personal
  description: "Description courte du template",
  features: ["reading-time", "tags"], // features activées (optionnel)
  typography: "sans-serif",           // serif | sans-serif | monospace | handwritten | mixed
  colorScheme: "light",              // light | dark | monochrome | sepia | custom...
};
```

### `BlogLayout.tsx`

Le layout wrapping toutes les pages. Il contient le header, le footer et la zone de contenu principale.

Points clés à modifier :
- **Nom du blog** : remplacer les occurrences du nom original
- **Classes Tailwind** : `bg-*`, `text-*`, `max-w-*` pour changer les couleurs et la largeur
- **Navigation** : liens du header

```tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">Mon Blog</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Accueil</a>
            <a href="#" className="hover:underline">À propos</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Mon Blog &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}
```

### `ArticleList.tsx`

La page d'accueil qui liste les articles. C'est un composant **client** (`"use client"`).

**Important** : les liens vers les articles doivent pointer vers `/templates/{id}/{slug}`.

```tsx
"use client";
import { useMemo, useState } from "react";
import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  // ... pagination, rendu de la liste
  return (
    <div>
      {posts.map((post) => (
        <a
          key={post.frontmatter.slug}
          href={"/templates/mon-nouveau-template/" + post.frontmatter.slug}
        >
          {/* contenu de la carte */}
        </a>
      ))}
    </div>
  );
}
```

### `ArticlePage.tsx`

L'affichage d'un article. Utilise `MarkdownRenderer` pour le rendu Markdown.

```tsx
import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";

export default function ArticlePage({ post }: { post: Post }) {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
      <div className="text-sm opacity-60 mb-8">
        <span>{post.frontmatter.date}</span> · <span>{post.frontmatter.author}</span>
      </div>
      <div className="prose max-w-none">
        <MarkdownRenderer source={post.content} variant="light" />
      </div>
    </article>
  );
}
```

**Variantes de MarkdownRenderer** : `light` | `dark` | `wiki` | `terminal` | `neon`

### Composants partagés disponibles

Tu peux importer ces composants depuis `@/components/shared/` :

| Composant | Import | Props |
|-----------|--------|-------|
| `AuthorBio` | `@/components/shared/AuthorBio` | `author: string` |
| `Breadcrumbs` | `@/components/shared/Breadcrumbs` | `items: {label, href}[]` |
| `NewsletterCTA` | `@/components/shared/NewsletterCTA` | — |
| `ProgressBar` | `@/components/shared/ProgressBar` | — |
| `ReadingTime` | `@/components/shared/ReadingTime` | `content: string` |
| `RelatedPosts` | `@/components/shared/RelatedPosts` | `posts: Post[], current: Post` |
| `TableOfContents` | `@/components/shared/TableOfContents` | `content: string` |
| `TagList` | `@/components/shared/TagList` | `tags: string[]` |

## Étape 3 — Régénérer le registre

```bash
npx tsx scripts/generate-registry.ts
```

Cela met à jour `src/lib/template-registry.ts` avec les imports du nouveau template.

## Étape 4 — Ajouter les métadonnées dans `src/lib/templates.ts`

Ajouter une entrée dans le tableau `templateConfigs` :

```typescript
{ id: "mon-nouveau-template", name: "Mon Nouveau Template", category: "minimal", description: "Description courte", features: ["reading-time"], typography: "sans-serif", colorScheme: "light" },
```

## Étape 5 — Tester

```bash
npm run dev
# Ouvrir http://localhost:3000/templates/mon-nouveau-template
```

---

## Types de référence

```typescript
// src/lib/types.ts
type Category = "minimal" | "editorial" | "developer" | "creative" | "business" | "personal";

interface TemplateConfig {
  id: string;
  name: string;
  category: Category;
  description: string;
  features: string[];
  typography: "serif" | "sans-serif" | "monospace" | "handwritten" | "mixed";
  colorScheme: string;
}

interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
}
```

## Propriétés de style (pour generate-templates.ts)

Si tu veux ajouter le template au script de génération `scripts/generate-templates.ts`, voici les propriétés `TemplateDef` :

| Propriété | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Identifiant unique (nom du dossier) |
| `name` | `string` | Nom affiché |
| `category` | `string` | Catégorie |
| `bgClass` | `string` | Classe Tailwind pour le fond |
| `textClass` | `string` | Classe Tailwind pour le texte |
| `accentClass` | `string` | Classe Tailwind pour les accents |
| `headingFont` | `string` | Police des titres (`font-sans`, `font-serif`, `font-mono`) |
| `bodyFont` | `string` | Police du corps |
| `cardBg` | `string` | Fond des cartes |
| `borderClass` | `string` | Style des bordures |
| `layout` | `string` | `centered` \| `sidebar-right` \| `sidebar-left` \| `full-width` \| `split` \| `timeline` \| `masonry` \| `stream` |
| `maxWidth` | `string` | Largeur max (`max-w-xl`, `max-w-2xl`, etc.) |
| `hasDarkBg` | `boolean` | Fond sombre (affecte le variant Markdown) |
| `listStyle` | `string` | Style de liste : `grid` \| `list` \| `cards` \| `timeline` \| `masonry` \| `stream` |
| `showReadingTime` | `boolean` | Afficher le temps de lecture |
| `showAuthorBio` | `boolean` | Afficher la bio auteur |
| `showTags` | `boolean` | Afficher les tags |
| `showNewsletter` | `boolean` | Afficher le CTA newsletter |
| `showBreadcrumbs` | `boolean` | Afficher le fil d'ariane |
| `showProgressBar` | `boolean` | Barre de progression de lecture |
| `showToc` | `boolean` | Table des matières |
| `showRelated` | `boolean` | Articles liés |

---

## Script automatisé : créer un template par copie

Le script ci-dessous automatise toutes les étapes. Usage :

```bash
npx tsx scripts/clone-template.ts --source one-column-light --id mon-blog --name "Mon Blog"
```

### Le script

Voir le fichier `scripts/clone-template.ts` dans le projet.
