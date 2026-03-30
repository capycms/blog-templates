import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

const cardColors = [
  "bg-pink-50",
  "bg-amber-50",
  "bg-sky-50",
  "bg-emerald-50",
  "bg-purple-50",
];

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => {
          const bg = cardColors[i % cardColors.length];
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/rainbow-cards/" + post.frontmatter.slug}
              className={
                "block group rounded-lg border border-pink-200 overflow-hidden hover:shadow-md transition-shadow " +
                bg
              }
            >
              <div className="p-5">
                <p className="text-xs opacity-60">{post.frontmatter.date}</p>
                <h2 className="font-sans text-xl font-bold mt-1 group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
                <div className="mt-3">
                  <TagList tags={post.frontmatter.tags} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
