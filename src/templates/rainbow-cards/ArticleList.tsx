import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/rainbow-cards/${post.frontmatter.slug}`} className="block group bg-white rounded-lg border border-pink-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <h2 className="font-sans text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
              <div className="mt-3"><TagList tags={post.frontmatter.tags} /></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
