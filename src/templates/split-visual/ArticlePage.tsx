import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";

export default function ArticlePage({ post }: { post: Post }) {
  
  return (
    <div>
      <article>
              
              {post.frontmatter.coverImage ? (
                <div className="mb-8 aspect-video overflow-hidden rounded-lg border border-gray-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.frontmatter.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <h1 className="font-sans text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>
              </div>
              
              <div className="prose  max-w-none font-sans">
                <MarkdownRenderer source={post.content} />
              </div>
              
          </article>
    </div>
  );
}
