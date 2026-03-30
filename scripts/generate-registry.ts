import fs from "fs";
import path from "path";

const templatesDir = path.join(process.cwd(), "src/templates");
const ids = fs
  .readdirSync(templatesDir)
  .filter((d) => fs.statSync(path.join(templatesDir, d)).isDirectory())
  .sort();

function toCamel(id: string): string {
  return id
    .replace(/-(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^(\d)/, "_$1");
}

const lines: string[] = [
  "// Auto-generated template registry — do not edit manually",
  '// Run: npx tsx scripts/generate-registry.ts',
  "",
  'import { Post } from "@/lib/types";',
  "",
];

for (const id of ids) {
  const cc = toCamel(id);
  lines.push(`import ${cc}Layout from "@/templates/${id}/BlogLayout";`);
  lines.push(`import ${cc}List from "@/templates/${id}/ArticleList";`);
  lines.push(`import ${cc}Page from "@/templates/${id}/ArticlePage";`);
}

lines.push("");
lines.push("export interface TemplateComponents {");
lines.push("  BlogLayout: React.ComponentType<{ children: React.ReactNode }>;");
lines.push("  ArticleList: React.ComponentType<{ posts: Post[] }>;");
lines.push("  ArticlePage: React.ComponentType<{ post: Post }>;");
lines.push("}");
lines.push("");
lines.push("const registry: Record<string, TemplateComponents> = {");

for (const id of ids) {
  const cc = toCamel(id);
  lines.push(`  "${id}": { BlogLayout: ${cc}Layout, ArticleList: ${cc}List, ArticlePage: ${cc}Page },`);
}

lines.push("};");
lines.push("");
lines.push("export function getTemplateComponents(id: string): TemplateComponents | undefined {");
lines.push("  return registry[id];");
lines.push("}");
lines.push("");
lines.push("export const allTemplateIds: string[] = Object.keys(registry);");
lines.push("");

const outPath = path.join(process.cwd(), "src/lib/template-registry.ts");
fs.writeFileSync(outPath, lines.join("\n"));
console.log(`Generated registry with ${ids.length} templates at src/lib/template-registry.ts`);
