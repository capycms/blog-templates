import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { getTableOfContents } from "@/lib/toc";
import { TableOfContents } from "@/components/shared/TableOfContents";

export default function ArticlePage({ post }: { post: Post }) {
  const toc = getTableOfContents(post.content);

  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8">
          <TableOfContents items={toc} variant="light" />
        </div>
      </aside>
      <article className="min-w-0 flex-1">
        <h1 className="font-mono text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
          <span>{post.frontmatter.date}</span>
          <span>&middot;</span>
          <span>{post.frontmatter.author}</span>
        </div>
        <div className="lg:hidden">
          <TableOfContents items={toc} variant="light" />
        </div>
        <div className="prose max-w-none font-sans">
          <MarkdownRenderer source={post.content} variant="wiki" syntaxHighlight />
        </div>
      </article>
    </div>
  );
}
