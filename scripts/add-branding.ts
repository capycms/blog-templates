/**
 * Script to add branding support to all templates.
 * Transforms BlogLayout.tsx, ArticleList.tsx, ArticlePage.tsx in each template.
 */
import fs from "fs";
import path from "path";

const TEMPLATES_DIR = path.resolve(__dirname, "../src/templates");

function getTemplateDirs(): string[] {
  return fs
    .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/** Extract the blog name from config.ts (the `name: "..."` field) */
function getBlogName(templateDir: string): string {
  const configPath = path.join(TEMPLATES_DIR, templateDir, "config.ts");
  const content = fs.readFileSync(configPath, "utf-8");
  const match = content.match(/name:\s*"([^"]+)"/);
  return match ? match[1] : templateDir;
}

/** Extract the Tailwind color class from the blog name link in BlogLayout */
function extractAccentColorClass(blogLayoutContent: string, blogName: string): string | null {
  // Look for the <a> tag containing the blog name and extract its text-{color} class
  const escapedName = blogName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<a[^>]*className="([^"]*)"[^>]*>${escapedName}</a>`
  );
  const match = blogLayoutContent.match(pattern);
  if (match) {
    const classes = match[1];
    const colorMatch = classes.match(/\btext-(\S+)/);
    return colorMatch ? colorMatch[0] : null;
  }
  return null;
}

function transformBlogLayout(templateDir: string, blogName: string): void {
  const filePath = path.join(TEMPLATES_DIR, templateDir, "BlogLayout.tsx");
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already transformed
  if (content.includes("branding?")) return;

  // Extract the accent color class from the blog name <a> tag
  const accentColorClass = extractAccentColorClass(content, blogName);

  // 1. Add Branding import
  if (content.includes('from "@/lib/types"')) {
    // There's already an import from types - shouldn't happen for BlogLayout, but handle it
    content = content.replace(
      /from "@\/lib\/types"/,
      'from "@/lib/types"'
    );
    if (!content.includes("Branding")) {
      content = content.replace(
        /import\s*{([^}]*)}\s*from\s*"@\/lib\/types"/,
        (match, imports) => `import { ${imports.trim()}, Branding } from "@/lib/types"`
      );
    }
  } else {
    // Add import at the top
    content = `import { Branding } from "@/lib/types";\n\n` + content;
  }

  // 2. Change function signature
  content = content.replace(
    /export default function BlogLayout\(\s*\{\s*children\s*\}\s*:\s*\{\s*children:\s*React\.ReactNode\s*\}\s*\)/,
    `export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding })`
  );

  // 3. Add name const after the opening brace of the function
  const funcBodyStart = content.indexOf(
    "export default function BlogLayout"
  );
  if (funcBodyStart !== -1) {
    const openBrace = content.indexOf("{", content.indexOf(")", funcBodyStart) + 1);
    if (openBrace !== -1) {
      // Find the next newline after the opening brace
      const nextNewline = content.indexOf("\n", openBrace);
      const escapedBlogName = blogName.replace(/"/g, '\\"');
      content =
        content.slice(0, nextNewline + 1) +
        `  const name = branding?.blogName ?? "${escapedBlogName}";\n` +
        content.slice(nextNewline + 1);
    }
  }

  // 4. Replace the blog name in the header <a> tag with dynamic name + logo + accent style
  // Pattern: <a href="/" className="..." [other attrs]>BlogName</a>
  const escapedName = blogName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Build the fallback style based on the original color class
  let fallbackStyle = "undefined";
  if (accentColorClass) {
    // Convert Tailwind color class to a reasonable CSS description
    // We keep the class but add inline style override
    fallbackStyle = "undefined";
  }

  // Replace the header link that contains the blog name
  const headerLinkRegex = new RegExp(
    `(<a\\s+href="/"\\s+className="[^"]*?)\\s*(${accentColorClass ? accentColorClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "text-[\\w-]+"})(\\s[^"]*?"[^>]*>)${escapedName}(</a>)`
  );

  const headerMatch = content.match(headerLinkRegex);
  if (headerMatch) {
    const [fullMatch, beforeColor, colorClass, afterColor, closeTag] = headerMatch;
    // Remove the text color class and add style attribute
    const newLink = `${beforeColor}${afterColor.replace(/>$/, "")} style={branding?.accentColor ? { color: branding.accentColor } : undefined}>\n            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}\n            {name}\n          ${closeTag}`;
    content = content.replace(fullMatch, newLink);
  } else {
    // Try simpler pattern - just find the link with the blog name
    const simpleLinkRegex = new RegExp(
      `(<a[^>]*>)${escapedName}(</a>)`
    );
    const simpleMatch = content.match(simpleLinkRegex);
    if (simpleMatch) {
      const [fullMatch, openTag, closeTag] = simpleMatch;
      content = content.replace(
        fullMatch,
        `${openTag}\n            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}\n            {name}\n          ${closeTag}`
      );
    }
  }

  // 5. Replace hardcoded name in footer
  // Pattern: &copy; 2026 BlogName &mdash; or © 2026 BlogName —
  content = content.replace(
    new RegExp(`&copy;\\s*2026\\s*${escapedName}\\s*&mdash;`),
    `&copy; {new Date().getFullYear()} {name} &mdash;`
  );
  // Also handle JSX entities
  content = content.replace(
    new RegExp(`©\\s*2026\\s*${escapedName}\\s*—`),
    `© {new Date().getFullYear()} {name} —`
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ BlogLayout.tsx`);
}

function transformArticleList(templateDir: string, blogName: string): void {
  const filePath = path.join(TEMPLATES_DIR, templateDir, "ArticleList.tsx");
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already transformed
  if (content.includes("branding?")) return;

  // 1. Add or update Branding import
  if (content.includes('from "@/lib/types"')) {
    content = content.replace(
      /import\s*{([^}]*)}\s*from\s*"@\/lib\/types"/,
      (match, imports) => {
        if (imports.includes("Branding")) return match;
        return `import { ${imports.trim()}, Branding } from "@/lib/types"`;
      }
    );
  } else {
    content = `import { Branding } from "@/lib/types";\n` + content;
  }

  // 2. Change function signature
  content = content.replace(
    /export default function ArticleList\(\s*\{\s*posts\s*\}\s*:\s*\{\s*posts:\s*Post\[\]\s*\}\s*\)/,
    `export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding })`
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ArticleList.tsx`);
}

function transformArticlePage(templateDir: string, blogName: string): void {
  const filePath = path.join(TEMPLATES_DIR, templateDir, "ArticlePage.tsx");
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf-8");

  // Skip if already transformed
  if (content.includes("branding?")) return;

  // 1. Add or update Branding import
  if (content.includes('from "@/lib/types"')) {
    content = content.replace(
      /import\s*{([^}]*)}\s*from\s*"@\/lib\/types"/,
      (match, imports) => {
        if (imports.includes("Branding")) return match;
        return `import { ${imports.trim()}, Branding } from "@/lib/types"`;
      }
    );
  } else {
    content = `import { Branding } from "@/lib/types";\n` + content;
  }

  // 2. Change function signature
  content = content.replace(
    /export default function ArticlePage\(\s*\{\s*post\s*\}\s*:\s*\{\s*post:\s*Post\s*\}\s*\)/,
    `export default function ArticlePage({ post, branding }: { post: Post; branding?: Branding })`
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ ArticlePage.tsx`);
}

function main() {
  const templates = getTemplateDirs();
  console.log(`Found ${templates.length} templates to transform.\n`);

  for (const templateDir of templates) {
    const blogName = getBlogName(templateDir);
    console.log(`[${templateDir}] (name: "${blogName}")`);
    transformBlogLayout(templateDir, blogName);
    transformArticleList(templateDir, blogName);
    transformArticlePage(templateDir, blogName);
    console.log();
  }

  console.log("Done! All templates transformed.");
}

main();
