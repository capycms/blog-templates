import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/stream-thoughts/${post.frontmatter.slug}`} className="block group p-4 rounded border border-purple-200 hover:shadow transition-shadow">
            <span className="text-xs opacity-50">{post.frontmatter.date}</span>
            <h2 className="font-mono font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-70">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
