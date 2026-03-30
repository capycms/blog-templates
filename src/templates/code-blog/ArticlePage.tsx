import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { ReadingTime } from "@/components/shared/ReadingTime";

export default function ArticlePage({ post }: { post: Post }) {
  
  return (
    <div>
      <article>
              

              <h1 className="font-mono text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
                <span>&middot;</span><ReadingTime content={post.content} />
              </div>
              
              <div className="prose prose-invert max-w-none font-mono">
                <MarkdownRenderer source={post.content} variant="dark" />
              </div>
                
          </article>
    </div>
  );
}
