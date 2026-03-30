import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function ArticlePage({ post }: { post: Post }) {
  
  return (
    <div>
      <article>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles", href: "/" }, { label: post.frontmatter.title }]} />
              

              <h1 className="font-sans text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
              </div>
              
              <div className="prose  max-w-none font-sans">
                <MarkdownRenderer source={post.content} variant="light" />
              </div>
              
          </article>
    </div>
  );
}
