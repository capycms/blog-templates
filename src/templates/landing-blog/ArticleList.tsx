import { Post } from "@/lib/types";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <div className="rounded-xl border border-emerald-200 bg-gray-50 p-8 mb-10">
        <h1 className="font-sans text-4xl md:text-5xl font-bold">
          Landing Blog
        </h1>
        <p className="mt-4 text-lg opacity-70 max-w-2xl">
          A clean landing page with a featured article, a strong CTA, and a newsletter.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {featured ? (
            <a
              href={"/templates/landing-blog/" + featured.frontmatter.slug}
              className="px-4 py-2 rounded bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
            >
              Read featured
            </a>
          ) : null}
          <a
            href="#articles"
            className="px-4 py-2 rounded border border-emerald-200 text-sm font-medium hover:bg-black/5"
          >
            Browse articles
          </a>
        </div>
      </div>

      {featured ? (
        <a
          href={"/templates/landing-blog/" + featured.frontmatter.slug}
          className="block group mb-12"
        >
          <div className="grid md:grid-cols-2 rounded-xl border border-emerald-200 overflow-hidden bg-gray-50">
            <div className="aspect-video md:aspect-auto bg-gray-200">
              {featured.frontmatter.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-emerald-500">Featured</p>
              <h2 className="font-sans text-3xl font-bold mt-3 group-hover:underline">
                {featured.frontmatter.title}
              </h2>
              <p className="mt-4 opacity-70">{featured.frontmatter.excerpt}</p>
              <p className="mt-6 text-sm opacity-60">
                {featured.frontmatter.date} &middot; {featured.frontmatter.author}
              </p>
            </div>
          </div>
        </a>
      ) : null}

      <div id="articles" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/landing-blog/" + post.frontmatter.slug}
            className="block group rounded-lg border border-emerald-200 bg-gray-50 overflow-hidden hover:shadow-md transition-shadow"
          >
            {post.frontmatter.coverImage ? (
              <div className="aspect-video bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-6">
              <h3 className="font-sans text-xl font-bold group-hover:underline">
                {post.frontmatter.title}
              </h3>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>

      <NewsletterCTA variant="light" />
    </div>
  );
}
