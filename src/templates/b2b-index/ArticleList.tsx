import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">B2B Index</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featured ? (
          <a
            href={"/templates/b2b-index/" + featured.frontmatter.slug}
            className="block group lg:col-span-2"
          >
            <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest opacity-60">Featured</p>
                <h2 className="font-serif text-2xl font-bold mt-2 group-hover:underline">
                  {featured.frontmatter.title}
                </h2>
                <p className="mt-3 opacity-70">{featured.frontmatter.excerpt}</p>
                <div className="mt-4">
                  <TagList tags={featured.frontmatter.tags} />
                </div>
              </div>
            </div>
          </a>
        ) : null}

        <div className="space-y-6">
          {rest.map((post) => (
            <a
              key={post.frontmatter.slug}
              href={"/templates/b2b-index/" + post.frontmatter.slug}
              className="block group"
            >
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-5 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold group-hover:underline">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
                <div className="mt-3">
                  <TagList tags={post.frontmatter.tags} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
