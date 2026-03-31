import { Post, Branding } from "@/lib/types";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles" }]} />
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/magazine-grid/${post.frontmatter.slug}`} className="block break-inside-avoid mb-6 group bg-white rounded-lg border border-amber-200 overflow-hidden hover:shadow-md transition-shadow">
            
            {post.frontmatter.coverImage ? (
              <div className="aspect-video bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-4">
              <h2 className="font-serif text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
