import { Post, Branding } from "@/lib/types";
import { ReadingTime } from "@/components/shared/ReadingTime";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/newspaper-classic/${post.frontmatter.slug}`} className="block group">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
                  <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
                </div>
                <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
                <div className="text-xs opacity-50 mt-1"><ReadingTime content={post.content} /></div>
              </div>
              {post.frontmatter.coverImage ? (
                <div className="hidden sm:block w-32 shrink-0 aspect-video bg-gray-200 overflow-hidden rounded border border-stone-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
