#!/usr/bin/env npx tsx
/**
 * Clone an existing template and customize it.
 *
 * Usage:
 *   npx tsx scripts/clone-template.ts --source one-column-light --id mon-blog --name "Mon Blog"
 *
 * Options:
 *   --source   ID du template source (requis)
 *   --id       ID du nouveau template (requis, utilisé comme nom de dossier)
 *   --name     Nom affiché du nouveau template (par défaut: id mis en forme)
 *   --category Catégorie: minimal | editorial | developer | creative | business | personal
 */
import fs from "fs";
import path from "path";

const root = process.cwd();

// ---------------------------------------------------------------------------
// Parse CLI arguments
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

const args = parseArgs();

if (!args.source || !args.id) {
  console.error(`
  Usage:
    npx tsx scripts/clone-template.ts --source <source-id> --id <new-id> [--name "Display Name"] [--category minimal]

  Exemples:
    npx tsx scripts/clone-template.ts --source one-column-light --id mon-blog --name "Mon Blog"
    npx tsx scripts/clone-template.ts --source dark-minimal-code --id tech-notes --name "Tech Notes" --category developer
`);
  process.exit(1);
}

const sourceId = args.source;
const newId = args.id;
const newName =
  args.name ||
  newId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
const newCategory = args.category || "";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const templatesDir = path.join(root, "src/templates");
const sourceDir = path.join(templatesDir, sourceId);
const destDir = path.join(templatesDir, newId);

if (!fs.existsSync(sourceDir)) {
  const available = fs
    .readdirSync(templatesDir)
    .filter((d) => fs.statSync(path.join(templatesDir, d)).isDirectory())
    .sort();
  console.error(`\n  ❌ Template source "${sourceId}" introuvable.\n`);
  console.error("  Templates disponibles:");
  available.forEach((t) => console.error(`    - ${t}`));
  process.exit(1);
}

if (fs.existsSync(destDir)) {
  console.error(
    `\n  ❌ Le dossier "${newId}" existe déjà dans src/templates/.\n`
  );
  process.exit(1);
}

// Validate id format
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(newId)) {
  console.error(
    `\n  ❌ L'ID "${newId}" est invalide. Utilisez des minuscules, chiffres et tirets (ex: mon-blog).\n`
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Read source template info
// ---------------------------------------------------------------------------
const sourceConfig = fs.readFileSync(
  path.join(sourceDir, "config.ts"),
  "utf-8"
);
const sourceName =
  sourceConfig.match(/name:\s*"([^"]+)"/)?.[1] || sourceId;
const sourceCategory =
  sourceConfig.match(/category:\s*"([^"]+)"/)?.[1] || "minimal";
const category = newCategory || sourceCategory;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------
// Copy and transform files
// ---------------------------------------------------------------------------
console.log(`
  Clonage de template
  ────────────────────
  Source:    ${sourceId} (${sourceName})
  Nouveau:  ${newId} (${newName})
  Catégorie: ${category}
`);

fs.mkdirSync(destDir, { recursive: true });

const files = ["config.ts", "BlogLayout.tsx", "ArticleList.tsx", "ArticlePage.tsx"];

for (const file of files) {
  const srcPath = path.join(sourceDir, file);
  if (!fs.existsSync(srcPath)) {
    console.error(`  ⚠ Fichier manquant: ${file} — ignoré`);
    continue;
  }

  let content = fs.readFileSync(srcPath, "utf-8");

  // Replace template ID in paths (e.g. /templates/old-id/ → /templates/new-id/)
  content = content.replace(
    new RegExp(`/templates/${escapeRegex(sourceId)}/`, "g"),
    `/templates/${newId}/`
  );

  // Replace template name with new name
  content = content.replace(
    new RegExp(escapeRegex(sourceName), "g"),
    newName
  );

  // For config.ts, also update the id and category
  if (file === "config.ts") {
    content = content.replace(
      /id:\s*"[^"]+"/,
      `id: "${newId}"`
    );
    content = content.replace(
      /name:\s*"[^"]+"/,
      `name: "${newName}"`
    );
    if (newCategory) {
      content = content.replace(
        /category:\s*"[^"]+"/,
        `category: "${category}"`
      );
    }
  }

  fs.writeFileSync(path.join(destDir, file), content);
  console.log(`  ✓ ${file}`);
}

// ---------------------------------------------------------------------------
// Update templates.ts — add metadata entry
// ---------------------------------------------------------------------------
const templatesMetaPath = path.join(root, "src/lib/templates.ts");
if (fs.existsSync(templatesMetaPath)) {
  let metaContent = fs.readFileSync(templatesMetaPath, "utf-8");

  // Read features, typography, colorScheme from the source config
  const features = sourceConfig.match(/features:\s*\[([^\]]*)\]/)?.[1] || "";
  const typography =
    sourceConfig.match(/typography:\s*"([^"]+)"/)?.[1] || "sans-serif";
  const colorScheme =
    sourceConfig.match(/colorScheme:\s*"([^"]+)"/)?.[1] || "light";

  const newEntry = `  { id: "${newId}", name: "${newName}", category: "${category}", description: "${newName} template", features: [${features}], typography: "${typography}", colorScheme: "${colorScheme}" },`;

  // Insert before the closing bracket of the array
  const lastBracketIdx = metaContent.lastIndexOf("];");
  if (lastBracketIdx !== -1) {
    metaContent =
      metaContent.slice(0, lastBracketIdx) +
      newEntry +
      "\n" +
      metaContent.slice(lastBracketIdx);
    fs.writeFileSync(templatesMetaPath, metaContent);
    console.log("  ✓ src/lib/templates.ts (métadonnées ajoutées)");
  }
}

// ---------------------------------------------------------------------------
// Regenerate registry
// ---------------------------------------------------------------------------
console.log("\n  Régénération du registre...\n");

const registryScript = path.join(root, "scripts/generate-registry.ts");
if (fs.existsSync(registryScript)) {
  const { execSync } = require("child_process");
  execSync("npx tsx scripts/generate-registry.ts", {
    cwd: root,
    stdio: "inherit",
  });
} else {
  console.log(
    "  ⚠ scripts/generate-registry.ts non trouvé — régénérez le registre manuellement"
  );
}

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------
console.log(`
  ✅ Template "${newName}" créé avec succès !

  Fichiers créés:
    src/templates/${newId}/config.ts
    src/templates/${newId}/BlogLayout.tsx
    src/templates/${newId}/ArticleList.tsx
    src/templates/${newId}/ArticlePage.tsx

  Pour prévisualiser:
    npm run dev
    → http://localhost:3000/templates/${newId}

  Pour personnaliser:
    - Modifier les couleurs et le layout dans BlogLayout.tsx
    - Changer le style de la liste dans ArticleList.tsx
    - Personnaliser la page article dans ArticlePage.tsx
`);
