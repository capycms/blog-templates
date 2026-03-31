import { Post, Branding } from "@/lib/types";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">Articles</h1>
      <div className="space-y-10">
        {posts.map((post, i) => {
          const isRight = i % 2 === 1;
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/asymmetric-bold/" + post.frontmatter.slug}
              className={"block group " + (isRight ? "md:text-right" : "")}
            >
              <div
                className={
                  "rounded-lg border border-red-300 bg-white p-8 md:w-4/5 " +
                  (isRight ? "md:ml-auto" : "md:mr-auto")
                }
              >
                <div className="flex items-baseline justify-between gap-4 text-xs uppercase tracking-widest opacity-60">
                  <span>{post.frontmatter.date}</span>
                  <span>{post.frontmatter.author}</span>
                </div>
                <h2 className="font-serif text-3xl font-bold mt-3 group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <div className="text-red-500 mt-4">
                  <div className="h-1 w-14 bg-current" />
                </div>
                <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
