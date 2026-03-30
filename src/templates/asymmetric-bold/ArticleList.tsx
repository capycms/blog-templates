import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/asymmetric-bold/${post.frontmatter.slug}`} className="block group bg-white rounded-lg border border-red-300 p-6 hover:shadow-md transition-shadow">
            
            <h2 className="font-serif text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-60 mt-1">{post.frontmatter.date} &middot; {post.frontmatter.author}</p>
            <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
