import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/folio-editorial/${post.frontmatter.slug}`} className="block group bg-white rounded-lg border border-amber-100 p-6 hover:shadow-md transition-shadow">
            
            {post.frontmatter.coverImage ? (
              <div className="mb-4 aspect-video bg-gray-200 overflow-hidden rounded border border-amber-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <h2 className="font-serif text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-60 mt-1">{post.frontmatter.date} &middot; {post.frontmatter.author}</p>
            <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
