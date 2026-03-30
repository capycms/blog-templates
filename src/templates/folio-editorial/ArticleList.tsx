import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>

      {featured ? (
        <a
          href={"/templates/folio-editorial/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="bg-white rounded-lg border border-amber-100 overflow-hidden">
            {featured.frontmatter.coverImage ? (
              <div className="aspect-video bg-amber-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Featured</p>
              <h2 className="font-serif text-3xl font-bold group-hover:underline">
                {featured.frontmatter.title}
              </h2>
              <p className="mt-3 opacity-70">{featured.frontmatter.excerpt}</p>
              <p className="mt-6 text-sm opacity-60">
                {featured.frontmatter.date} &middot; {featured.frontmatter.author}
              </p>
            </div>
          </div>
        </a>
      ) : null}

      {rest.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <a
              key={post.frontmatter.slug}
              href={"/templates/folio-editorial/" + post.frontmatter.slug}
              className="block group bg-white rounded-lg border border-amber-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.frontmatter.coverImage ? (
                <div className="aspect-video bg-amber-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold group-hover:underline">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
                <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
