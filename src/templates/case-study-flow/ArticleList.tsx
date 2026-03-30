import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/case-study-flow/${post.frontmatter.slug}`} className="block group bg-sky-50 rounded-lg border border-sky-200 p-6 hover:shadow-md transition-shadow">
            
            {post.frontmatter.coverImage ? (
              <div className="mb-4 aspect-video bg-gray-200 overflow-hidden rounded border border-sky-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <h2 className="font-sans text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-60 mt-1">{post.frontmatter.date} &middot; {post.frontmatter.author}</p>
            <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
