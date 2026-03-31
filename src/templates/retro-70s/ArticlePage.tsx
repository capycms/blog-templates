import { Post, Branding } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { TagList } from "@/components/shared/TagList";

export default function ArticlePage({ post, branding }: { post: Post; branding?: Branding }) {
  
  
  
  return (
    <div>
      <article>
              

              <h1 className="font-serif text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
              </div>
              
              <div className="mb-6"><TagList tags={post.frontmatter.tags} variant="light" /></div>
              
              <div className="prose  max-w-none font-serif">
                <MarkdownRenderer source={post.content} variant="light" />
              </div>
              
                
          </article>
    </div>
  );
}
