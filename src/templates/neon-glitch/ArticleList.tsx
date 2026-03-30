import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/neon-glitch/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-lg border border-fuchsia-700 bg-gray-950 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-1 bg-cyan-400" />
                <div className="w-1 bg-fuchsia-500/80" />
                <div className="flex-1 p-6">
                  <p className="text-xs uppercase tracking-widest opacity-70">{post.frontmatter.date}</p>
                  <h2 className="font-mono text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-3 text-sm opacity-70">{post.frontmatter.excerpt}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
