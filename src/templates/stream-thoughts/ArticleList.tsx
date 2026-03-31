import { Post, Branding } from "@/lib/types";

const noteColors = ["bg-yellow-50", "bg-pink-50", "bg-sky-50", "bg-emerald-50"];

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-8">Stream</h1>
      <div className="space-y-4">
        {posts.map((post, i) => {
          const bg = noteColors[i % noteColors.length];
          const rot = i % 2 === 1 ? "-rotate-1" : "rotate-1";
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/stream-thoughts/" + post.frontmatter.slug}
              className="block group"
            >
              <div
                className={
                  "p-5 rounded-lg border border-purple-200 hover:shadow-md transition-shadow " +
                  bg +
                  " " +
                  rot
                }
              >
                <p className="text-xs opacity-60">{post.frontmatter.date}</p>
                <h2 className="font-mono text-xl font-bold mt-1 group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
