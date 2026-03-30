import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { getTableOfContents } from "@/lib/toc";
import { TableOfContents } from "@/components/shared/TableOfContents";

export default function ArticlePage({ post }: { post: Post }) {
  const toc = getTableOfContents(post.content);

  
  
  
  return (
    <div>
      <article>
              

              <h1 className="font-mono text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
              </div>
              
              <TableOfContents items={toc} variant="light" />
              
              <div className="prose  max-w-none font-sans">
                <MarkdownRenderer source={post.content} variant="wiki" syntaxHighlight />
              </div>
              
                
          </article>
    </div>
  );
}
