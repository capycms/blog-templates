import { Post, Branding } from "@/lib/types";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Journal</h1>

      {featured ? (
        <a
          href={"/templates/journal-split/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden grid md:grid-cols-2">
            <div className="aspect-video md:aspect-auto bg-stone-200">
              {featured.frontmatter.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
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

      <div className="space-y-6">
        {rest.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/journal-split/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-xl font-bold group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
                </div>
                <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
              </div>
              {post.frontmatter.coverImage ? (
                <div className="hidden sm:block w-40 shrink-0 aspect-video bg-stone-200 overflow-hidden rounded border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
