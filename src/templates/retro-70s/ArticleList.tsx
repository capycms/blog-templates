import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => {
          const rot = i % 2 === 1 ? "-rotate-1" : "rotate-1";
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/retro-70s/" + post.frontmatter.slug}
              className="block group"
            >
              <div
                className={
                  "rounded-lg border border-orange-300 bg-yellow-50 p-6 hover:shadow-md transition-shadow " +
                  rot
                }
              >
                <div className="bg-white border border-orange-300 rounded p-3">
                  <div className="aspect-video bg-orange-100 overflow-hidden rounded">
                    {post.frontmatter.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.frontmatter.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest opacity-60">{post.frontmatter.date}</p>
                  <h2 className="font-serif text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-3 opacity-70">{post.frontmatter.excerpt}</p>
                  <div className="mt-4">
                    <TagList tags={post.frontmatter.tags} />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
