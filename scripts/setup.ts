#!/usr/bin/env npx tsx
/**
 * Blog Setup Script
 * Transforms this template repository into your personal blog.
 *
 * Interactive:  npm run setup
 * CLI:          npm run setup -- --template blank-canvas --title "My Blog" --author "Author"
 */
import * as readline from "readline/promises";
import fs from "fs";
import path from "path";

const root = process.cwd();

// ---------------------------------------------------------------------------
// Optional: Load a local `.env` file for non-secret project configuration.
// This keeps the repo easy to use as a GitHub template.
// ---------------------------------------------------------------------------
function loadDotEnv(filename = ".env") {
  const envPath = path.join(root, filename);
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, "utf-8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (!key) continue;

    // Strip surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Do not override explicitly provided environment variables.
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

// ---------------------------------------------------------------------------
// Parse CLI arguments (--key value)
// ---------------------------------------------------------------------------
function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--") && i + 1 < argv.length) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const cliArgsFromEnv = Object.fromEntries(
  Object.entries({
    template: process.env.CAPYCMS_TEMPLATE_ID,
    title: process.env.CAPYCMS_BLOG_TITLE,
    author: process.env.CAPYCMS_BLOG_AUTHOR,
    description: process.env.CAPYCMS_BLOG_DESCRIPTION,
    domain: process.env.CAPYCMS_CUSTOM_DOMAIN,
  }).filter(([, v]) => typeof v === "string" && v.length > 0)
) as Record<string, string>;

const cliArgs = {
  ...cliArgsFromEnv,
  ...parseArgs(),
};

const isNonInteractive = !!cliArgs.template;

let rl: readline.Interface;
if (!isNonInteractive) {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

// ---------------------------------------------------------------------------
// Guard
// ---------------------------------------------------------------------------
if (!fs.existsSync(path.join(root, "src/templates"))) {
  console.error(
    "\n  ❌ Setup has already been run (src/templates/ not found).\n"
  );
  if (!isNonInteractive) rl!.close();
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Read template metadata from config.ts files
// ---------------------------------------------------------------------------
interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

function readTemplateInfo(id: string): TemplateInfo {
  const configPath = path.join(root, "src/templates", id, "config.ts");
  const content = fs.readFileSync(configPath, "utf-8");
  return {
    id,
    name: content.match(/name:\s*"([^"]+)"/)?.[1] || id,
    category: content.match(/category:\s*"([^"]+)"/)?.[1] || "other",
    description: content.match(/description:\s*"([^"]+)"/)?.[1] || "",
  };
}

const templateDirs = fs
  .readdirSync(path.join(root, "src/templates"))
  .filter((d) =>
    fs.statSync(path.join(root, "src/templates", d)).isDirectory()
  )
  .sort();

const allTemplates = templateDirs.map(readTemplateInfo);

const categoryLabels: Record<string, string> = {
  minimal: "Minimal",
  editorial: "Editorial",
  developer: "Developer",
  creative: "Creative",
  business: "Business",
  personal: "Personal",
};

const categoryOrder = [
  "minimal",
  "editorial",
  "developer",
  "creative",
  "business",
  "personal",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function ask(question: string, fallback?: string): Promise<string> {
  if (isNonInteractive) return fallback || "";
  const answer = (await rl!.question(question)).trim();
  return answer || fallback || "";
}

async function askNumber(
  question: string,
  min: number,
  max: number
): Promise<number> {
  if (isNonInteractive) return min;
  while (true) {
    const answer = await ask(question);
    const n = parseInt(answer, 10);
    if (n >= min && n <= max) return n;
    console.log(`  Please enter a number between ${min} and ${max}.`);
  }
}

function rmrf(target: string) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ensureImport(source: string, importLine: string): string {
  if (source.includes(importLine)) return source;

  // Keep the client directive as the first statement.
  const lines = source.split("\n");
  const firstNonEmpty = lines.findIndex((l) => l.trim().length > 0);
  const hasUseClient =
    firstNonEmpty !== -1 &&
    (lines[firstNonEmpty].trim() === '"use client";' ||
      lines[firstNonEmpty].trim() === '"use client"' ||
      lines[firstNonEmpty].trim() === "'use client';" ||
      lines[firstNonEmpty].trim() === "'use client'");

  if (hasUseClient) {
    // Insert right after the directive line.
    lines.splice(firstNonEmpty + 1, 0, "", importLine);
    return lines.join("\n");
  }

  return `${importLine}\n\n${source.replace(/^\s*\n+/, "")}`;
}

function wrapHrefsWithBasePath(source: string): string {
  let out = source;

  // href="/..."
  out = out.replace(/href="([^"]*)"/g, (_m, href) => {
    return `href={withBasePath(${JSON.stringify(href)})}`;
  });

  // href='...'
  out = out.replace(/href='([^']*)'/g, (_m, href) => {
    return `href={withBasePath(${JSON.stringify(href)})}`;
  });

  // href={`...`}
  out = out.replace(/href=\{`([\s\S]*?)`\}/g, (_m, body) => {
    return `href={withBasePath(\`${body}\`)}`;
  });

  // href={"..." + expr}
  out = out.replace(
    /href=\{\s*"([^"]*)"\s*\+\s*([^}]+)\}/g,
    (_m, left, right) => {
      return `href={withBasePath(${JSON.stringify(left)} + ${right.trim()})}`;
    }
  );

  // href={'...' + expr}
  out = out.replace(
    /href=\{\s*'([^']*)'\s*\+\s*([^}]+)\}/g,
    (_m, left, right) => {
      return `href={withBasePath(${JSON.stringify(left)} + ${right.trim()})}`;
    }
  );

  return out;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║     CapyCMS Blog Template Setup          ║
  ╚══════════════════════════════════════════╝
`);

  // 1. Blog info
  const blogTitle = cliArgs.title || await ask("  Blog title [My Blog]: ", "My Blog");
  const blogAuthor = cliArgs.author || await ask("  Author name [Author]: ", "Author");
  const blogDescription = cliArgs.description || await ask(
    "  Description [A personal blog powered by Next.js]: ",
    "A personal blog powered by Next.js"
  );
  const customDomain = cliArgs.domain || await ask(
    "  Custom domain (leave empty for none): "
  );

  let chosen: TemplateInfo;

  if (isNonInteractive) {
    // CLI mode: find the template by id
    const match = allTemplates.find((t) => t.id === cliArgs.template);
    if (!match) {
      console.error(`\n  ❌ Template "${cliArgs.template}" not found.\n`);
      console.error("  Available templates:");
      allTemplates.forEach((t) => console.error(`    - ${t.id}`));
      process.exit(1);
    }
    chosen = match;
  } else {
    // Interactive mode: category → template picker
    // 2. Pick category
    console.log("\n  Choose a category:\n");
    categoryOrder.forEach((cat, i) => {
      const count = allTemplates.filter((t) => t.category === cat).length;
      console.log(`    ${i + 1}. ${categoryLabels[cat]} (${count})`);
    });
    console.log(
      `    ${categoryOrder.length + 1}. Show all (${allTemplates.length})`
    );

    const catChoice = await askNumber(
      "\n  Category: ",
      1,
      categoryOrder.length + 1
    );

    let filtered: TemplateInfo[];
    if (catChoice <= categoryOrder.length) {
      filtered = allTemplates.filter(
        (t) => t.category === categoryOrder[catChoice - 1]
      );
    } else {
      filtered = allTemplates;
    }

    // 3. Pick template
    console.log("\n  Choose a template:\n");
    filtered.forEach((t, i) => {
      console.log(`    ${i + 1}. ${t.name}`);
      console.log(`       ${t.description}\n`);
    });

    const templateChoice = await askNumber(
      "  Template: ",
      1,
      filtered.length
    );
    chosen = filtered[templateChoice - 1];
  }

  // Confirm
  console.log(`\n  Selected: ${chosen.name}`);
  console.log(`  Blog:     "${blogTitle}" by ${blogAuthor}\n`);

  const confirm = isNonInteractive
    ? "Y"
    : await ask(
        "  Proceed? This removes demo data and unused templates. [Y/n]: ",
        "Y"
      );
  if (confirm.toLowerCase() !== "y" && confirm.toLowerCase() !== "") {
    console.log("  Cancelled.");
    if (!isNonInteractive) rl!.close();
    process.exit(0);
  }

  console.log("\n  Setting up...\n");

  // -----------------------------------------------------------------------
  // 4. Copy chosen template to src/components/blog/
  // -----------------------------------------------------------------------
  const srcTemplateDir = path.join(root, "src/templates", chosen.id);
  const destBlogDir = path.join(root, "src/components/blog");
  ensureDir(destBlogDir);

  const basePathImport = 'import { withBasePath } from "@/lib/base-path";';

  // BlogLayout — replace template name with blog title
  let layoutComponent = fs.readFileSync(
    path.join(srcTemplateDir, "BlogLayout.tsx"),
    "utf-8"
  );

  layoutComponent = ensureImport(layoutComponent, basePathImport);
  layoutComponent = wrapHrefsWithBasePath(layoutComponent);
  layoutComponent = layoutComponent.replace(
    new RegExp(escapeRegex(chosen.name), "g"),
    blogTitle
  );
  fs.writeFileSync(path.join(destBlogDir, "BlogLayout.tsx"), layoutComponent);
  console.log("  ✓ BlogLayout.tsx");

  // ArticleList — rewrite links from /templates/{id}/{slug} to /{slug}
  let listComponent = fs.readFileSync(
    path.join(srcTemplateDir, "ArticleList.tsx"),
    "utf-8"
  );
  listComponent = listComponent.replace(
    new RegExp(`/templates/${escapeRegex(chosen.id)}/`, "g"),
    "/"
  );
  listComponent = ensureImport(listComponent, basePathImport);
  listComponent = wrapHrefsWithBasePath(listComponent);
  fs.writeFileSync(path.join(destBlogDir, "ArticleList.tsx"), listComponent);
  console.log("  ✓ ArticleList.tsx");

  // ArticlePage — copy as-is
  let articleComponent = fs.readFileSync(
    path.join(srcTemplateDir, "ArticlePage.tsx"),
    "utf-8"
  );
  articleComponent = ensureImport(articleComponent, basePathImport);
  articleComponent = wrapHrefsWithBasePath(articleComponent);
  fs.writeFileSync(
    path.join(destBlogDir, "ArticlePage.tsx"),
    articleComponent
  );
  console.log("  ✓ ArticlePage.tsx");

  // -----------------------------------------------------------------------
  // 5. Rewrite app routes
  // -----------------------------------------------------------------------

  // layout.tsx — keep existing, just update metadata
  const layoutContent = [
    'import type { Metadata } from "next";',
    'import { Geist, Geist_Mono } from "next/font/google";',
    'import "./globals.css";',
    "",
    "const geistSans = Geist({",
    '  variable: "--font-geist-sans",',
    '  subsets: ["latin"],',
    "});",
    "",
    "const geistMono = Geist_Mono({",
    '  variable: "--font-geist-mono",',
    '  subsets: ["latin"],',
    "});",
    "",
    "export const metadata: Metadata = {",
    `  title: ${JSON.stringify(blogTitle)},`,
    `  description: ${JSON.stringify(blogDescription)},`,
    "};",
    "",
    "export default function RootLayout({",
    "  children,",
    "}: Readonly<{",
    "  children: React.ReactNode;",
    "}>) {",
    "  return (",
    "    <html",
    '      lang="en"',
    "      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}",
    "    >",
    '      <body className="min-h-full flex flex-col">{children}</body>',
    "    </html>",
    "  );",
    "}",
    "",
  ];
  fs.writeFileSync(
    path.join(root, "src/app/layout.tsx"),
    layoutContent.join("\n")
  );
  console.log("  ✓ src/app/layout.tsx");

  // page.tsx — home page with article list
  const homeContent = [
    'import { getAllPosts } from "@/lib/posts";',
    'import BlogLayout from "@/components/blog/BlogLayout";',
    'import ArticleList from "@/components/blog/ArticleList";',
    "",
    "export default function Home() {",
    "  const posts = getAllPosts();",
    "  return (",
    "    <BlogLayout>",
    "      <ArticleList posts={posts} />",
    "    </BlogLayout>",
    "  );",
    "}",
    "",
  ];
  fs.writeFileSync(
    path.join(root, "src/app/page.tsx"),
    homeContent.join("\n")
  );
  console.log("  ✓ src/app/page.tsx");

  // [slug]/page.tsx — single article
  ensureDir(path.join(root, "src/app/[slug]"));
  const articleRouteContent = [
    'import { getAllSlugs, getPostBySlug } from "@/lib/posts";',
    'import BlogLayout from "@/components/blog/BlogLayout";',
    'import ArticlePage from "@/components/blog/ArticlePage";',
    'import { notFound } from "next/navigation";',
    "",
    "export function generateStaticParams() {",
    "  return getAllSlugs().map((slug) => ({ slug }));",
    "}",
    "",
    "export async function generateMetadata({",
    "  params,",
    "}: {",
    "  params: Promise<{ slug: string }>;",
    "}) {",
    "  const { slug } = await params;",
    "  const post = getPostBySlug(slug);",
    '  return { title: post ? post.frontmatter.title : "Not Found" };',
    "}",
    "",
    "export default async function Page({",
    "  params,",
    "}: {",
    "  params: Promise<{ slug: string }>;",
    "}) {",
    "  const { slug } = await params;",
    "  const post = getPostBySlug(slug);",
    "  if (!post) notFound();",
    "",
    "  return (",
    "    <BlogLayout>",
    "      <ArticlePage post={post} />",
    "    </BlogLayout>",
    "  );",
    "}",
    "",
  ];
  fs.writeFileSync(
    path.join(root, "src/app/[slug]/page.tsx"),
    articleRouteContent.join("\n")
  );
  console.log("  ✓ src/app/[slug]/page.tsx");

  // -----------------------------------------------------------------------
  // 6. Update posts.ts — read from content/posts/
  // -----------------------------------------------------------------------
  const postsContent = [
    'import fs from "fs";',
    'import path from "path";',
    'import matter from "gray-matter";',
    'import { Post, PostFrontmatter } from "./types";',
    'import { withBasePath } from "./base-path";',
    "",
    'const postsDirectory = path.join(process.cwd(), "content/posts");',
    "",
    "export function getAllPosts(): Post[] {",
    "  if (!fs.existsSync(postsDirectory)) return [];",
    '  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));',
    "  return files",
    "    .map((filename) => {",
    "      const filePath = path.join(postsDirectory, filename);",
    '      const fileContents = fs.readFileSync(filePath, "utf-8");',
    "      const { data, content } = matter(fileContents);",
    "      const frontmatter = data as PostFrontmatter;",
    "      return {",
    "        frontmatter: frontmatter.coverImage ? { ...frontmatter, coverImage: withBasePath(frontmatter.coverImage) } : frontmatter,",
    "        content,",
    "      };",
    "    })",
    "    .sort(",
    "      (a, b) =>",
    "        new Date(b.frontmatter.date).getTime() -",
    "        new Date(a.frontmatter.date).getTime()",
    "    );",
    "}",
    "",
    "export function getPostBySlug(slug: string): Post | undefined {",
    "  const posts = getAllPosts();",
    '  return posts.find((p) => p.frontmatter.slug === slug);',
    "}",
    "",
    "export function getAllSlugs(): string[] {",
    '  return getAllPosts().map((p) => p.frontmatter.slug);',
    "}",
    "",
  ];
  fs.writeFileSync(
    path.join(root, "src/lib/posts.ts"),
    postsContent.join("\n")
  );
  console.log("  ✓ src/lib/posts.ts");

  // -----------------------------------------------------------------------
  // 7. Create content/posts/ with a sample post
  // -----------------------------------------------------------------------
  const postsDir = path.join(root, "content/posts");
  ensureDir(postsDir);
  const existingPosts = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"));

  if (existingPosts.length === 0) {
    const today = new Date().toISOString().split("T")[0];
    const samplePost = [
      "---",
      'title: "Hello World"',
      'slug: "hello-world"',
      `date: "${today}"`,
      `excerpt: "Welcome to ${blogTitle}."`,
      `author: "${blogAuthor}"`,
      'tags: ["intro"]',
      "---",
      "",
      "# Hello World",
      "",
      `Welcome to **${blogTitle}**! This is your first blog post.`,
      "",
      "Edit this file or create new `.md` files in `content/posts/` to add more articles.",
      "",
      "## Writing Posts",
      "",
      "Each post needs a YAML frontmatter block at the top with these fields:",
      "",
      "| Field | Required | Description |",
      "|-------|----------|-------------|",
      "| `title` | Yes | Article title |",
      "| `slug` | Yes | URL slug (unique, used in the URL) |",
      "| `date` | Yes | Publication date (YYYY-MM-DD) |",
      "| `excerpt` | Yes | Short description |",
      "| `author` | Yes | Author name |",
      "| `tags` | Yes | Array of tags |",
      "| `coverImage` | No | Cover image path |",
      "",
      "Then write your content in **Markdown** below the frontmatter.",
      "",
    ];
    fs.writeFileSync(
      path.join(postsDir, "hello-world.md"),
      samplePost.join("\n")
    );
    console.log("  ✓ content/posts/hello-world.md");
  } else {
    console.log(`  ✓ content/posts/ (kept ${existingPosts.length} existing post(s))`);
  }

  // -----------------------------------------------------------------------
  // 8. CNAME
  // -----------------------------------------------------------------------
  if (customDomain) {
    fs.writeFileSync(path.join(root, "public/CNAME"), customDomain);
    console.log(`  ✓ public/CNAME → ${customDomain}`);
  } else {
    rmrf(path.join(root, "public/CNAME"));
    console.log("  ✓ Removed CNAME");
  }

  // -----------------------------------------------------------------------
  // 9. Clean up types — remove catalog-only types
  // -----------------------------------------------------------------------
  const typesContent = [
    "export interface PostFrontmatter {",
    "  title: string;",
    "  slug: string;",
    "  date: string;",
    "  excerpt: string;",
    "  author: string;",
    "  tags: string[];",
    "  coverImage?: string;",
    "}",
    "",
    "export interface Post {",
    "  frontmatter: PostFrontmatter;",
    "  content: string;",
    "}",
    "",
  ];
  fs.writeFileSync(
    path.join(root, "src/lib/types.ts"),
    typesContent.join("\n")
  );
  console.log("  ✓ src/lib/types.ts (cleaned)");

  // -----------------------------------------------------------------------
  // 10. Delete catalog files
  // -----------------------------------------------------------------------
  console.log("\n  Cleaning up...\n");

  const toDelete = [
    "src/templates",
    "src/components/catalog",
    "src/lib/templates.ts",
    "src/lib/template-registry.ts",
    "src/app/templates",
    "content/demo-posts",
    "scripts/generate-templates.ts",
    "scripts/generate-registry.ts",
    "prompt-gemini.md",
    "AGENTS.md",
    "CLAUDE.md",
  ];

  for (const target of toDelete) {
    const fullPath = path.join(root, target);
    if (fs.existsSync(fullPath)) {
      rmrf(fullPath);
      console.log(`  ✓ Deleted ${target}`);
    }
  }

  // -----------------------------------------------------------------------
  // 11. Update package.json
  // -----------------------------------------------------------------------
  const pkgPath = path.join(root, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.name = blogTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  delete pkg.scripts.setup;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("  ✓ package.json");

  // -----------------------------------------------------------------------
  // 12. README
  // -----------------------------------------------------------------------
  const readmeLines = [
    `# ${blogTitle}`,
    "",
    blogDescription,
    "",
    "## Getting Started",
    "",
    "```bash",
    "npm install",
    "npm run dev",
    "```",
    "",
    "Open [http://localhost:3000](http://localhost:3000).",
    "",
    "## Writing Posts",
    "",
    "Create Markdown files in `content/posts/`:",
    "",
    "```markdown",
    "---",
    'title: "My Post"',
    'slug: "my-post"',
    'date: "2026-03-30"',
    'excerpt: "Short description"',
    `author: "${blogAuthor}"`,
    'tags: ["tag1"]',
    "---",
    "",
    "Your content here...",
    "```",
    "",
    "## Customization",
    "",
    "| File | Purpose |",
    "|------|---------|",
    "| `src/components/blog/BlogLayout.tsx` | Page layout (header, footer, wrapper) |",
    "| `src/components/blog/ArticleList.tsx` | Article list / home page |",
    "| `src/components/blog/ArticlePage.tsx` | Single article view |",
    "| `src/components/shared/` | Reusable components (ReadingTime, TagList, etc.) |",
    "| `src/app/globals.css` | Global styles (Tailwind CSS v4) |",
    "",
    "## Deployment",
    "",
    "Push to GitHub and enable **GitHub Pages** (Actions source) in repository settings.",
    "",
    "The workflow at `.github/workflows/deploy.yml` builds and deploys automatically.",
    "",
  ];

  if (customDomain) {
    readmeLines.push(`Custom domain: \`${customDomain}\``, "");
  }

  readmeLines.push(
    "## Built With",
    "",
    "- [Next.js](https://nextjs.org) — Static export",
    "- [Tailwind CSS](https://tailwindcss.com) — Styling",
    "- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) — Markdown rendering",
    ""
  );

  fs.writeFileSync(path.join(root, "README.md"), readmeLines.join("\n"));
  console.log("  ✓ README.md");

  // -----------------------------------------------------------------------
  // 13. Delete this script + clean up scripts/
  // -----------------------------------------------------------------------
  const setupPath = path.join(root, "scripts/setup.ts");
  if (fs.existsSync(setupPath)) fs.unlinkSync(setupPath);
  const scriptsDir = path.join(root, "scripts");
  if (
    fs.existsSync(scriptsDir) &&
    fs.readdirSync(scriptsDir).length === 0
  ) {
    fs.rmdirSync(scriptsDir);
  }
  console.log("  ✓ Removed setup script");

  // -----------------------------------------------------------------------
  // Done
  // -----------------------------------------------------------------------
  console.log(`
  ╔══════════════════════════════════════════╗
  ║            Setup complete!               ║
  ╚══════════════════════════════════════════╝

  Your blog "${blogTitle}" is ready.

  Next steps:

    npm run dev          → Preview locally
    content/posts/       → Add your articles
    git push             → Deploy to GitHub Pages
`);

  if (!isNonInteractive) rl!.close();
}

main().catch((err) => {
  console.error("\n  Setup failed:", err);
  if (!isNonInteractive) rl!.close();
  process.exit(1);
});
