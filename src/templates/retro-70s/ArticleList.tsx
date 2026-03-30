import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/retro-70s/${post.frontmatter.slug}`} className="block group bg-yellow-50 rounded-lg border border-orange-300 p-6 hover:shadow-md transition-shadow">
            
            <h2 className="font-serif text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-60 mt-1">{post.frontmatter.date} &middot; {post.frontmatter.author}</p>
            <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            <div className="mt-3"><TagList tags={post.frontmatter.tags} variant="light" /></div>
          </a>
        ))}
      </div>
    </div>
  );
}
