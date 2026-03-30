import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Notes</h1>
      <div className="space-y-5">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/sketch-hand/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-lg border border-amber-300 border-dashed bg-amber-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-xl font-bold group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <span className="text-xs opacity-60 shrink-0">{post.frontmatter.date}</span>
              </div>
              <p className="mt-2 text-sm opacity-70">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
