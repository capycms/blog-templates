import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function ArticlePage({ post }: { post: Post }) {
  
  
  
  return (
    <div>
      <article>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles", href: "/" }, { label: post.frontmatter.title }]} />
              
              {post.frontmatter.coverImage ? (
                <div className="mb-8 aspect-video overflow-hidden rounded-lg border border-amber-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.frontmatter.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <h1 className="font-serif text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
              </div>
              
              
              <div className="prose  max-w-none font-serif">
                <MarkdownRenderer source={post.content} variant="light" />
              </div>
              
                
          </article>
    </div>
  );
}
