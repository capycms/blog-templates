import { Post } from "@/lib/types";

const gradients = [
  "from-pink-400 to-sky-400",
  "from-amber-400 to-fuchsia-400",
  "from-emerald-400 to-sky-400",
];

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post, i) => {
          const g = gradients[i % gradients.length];
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/gradient-expressive/" + post.frontmatter.slug}
              className="block group"
            >
              <div className="rounded-xl overflow-hidden border border-pink-200 bg-white/80 hover:shadow-md transition-shadow">
                <div className={"h-2 bg-gradient-to-r " + g} />
                <div className="p-7">
                  <p className="text-xs opacity-60">{post.frontmatter.date}</p>
                  <h2 className="font-serif text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
