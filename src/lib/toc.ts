import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function getTableOfContents(
  markdown: string,
  {
    minDepth = 2,
    maxDepth = 3,
  }: {
    minDepth?: number;
    maxDepth?: number;
  } = {}
): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Toggle fenced code blocks
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    if (level < minDepth || level > maxDepth) continue;

    const text = match[2].replace(/\s+#+\s*$/, "").trim();
    if (!text) continue;

    const id = slugger.slug(text);
    items.push({ id, text, level });
  }

  return items;
}
