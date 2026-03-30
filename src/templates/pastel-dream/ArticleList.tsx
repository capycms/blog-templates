import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/pastel-dream/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-2xl border border-purple-200 bg-white/70 backdrop-blur p-8 hover:shadow-md transition-shadow">
              <p className="text-xs opacity-60">{post.frontmatter.date}</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
              <div className="mt-5">
                <TagList tags={post.frontmatter.tags} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
