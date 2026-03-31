import { Post, Branding } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { ReadingTime } from "@/components/shared/ReadingTime";

export default function ArticlePage({ post, branding }: { post: Post; branding?: Branding }) {
  
  
  const complexity = (() => {
    const fence = String.fromCharCode(96).repeat(3);
    const fences = post.content.split(fence).length - 1;
    const codeBlocks = Math.floor(fences / 2);
    const score = codeBlocks * 2 + Math.round(post.content.length / 1200);
    if (score <= 3) return "Low";
    if (score <= 6) return "Medium";
    return "High";
  })();

  
  return (
    <div>
      <article>
              

              <h1 className="font-mono text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 text-sm mb-8">
                <span className="opacity-60">{post.frontmatter.date}</span>
                <span className="opacity-60">&middot;</span>
                <span className="opacity-60">{post.frontmatter.author}</span>
                <span className="opacity-60">&middot;</span><span className="opacity-60"><ReadingTime content={post.content} /></span>
                <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-700 text-yellow-300 text-xs">
                  Complexity: {complexity}
                </span>
              </div>
              
              
              <div className="prose prose-invert max-w-none font-mono">
                <MarkdownRenderer source={post.content} variant="dark" syntaxHighlight />
              </div>
              
                
          </article>
    </div>
  );
}
