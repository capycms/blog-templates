import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Featured</h1>

      {featured ? (
        <a
          href={"/templates/split-visual/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="grid md:grid-cols-2 rounded-lg border border-gray-300 overflow-hidden bg-white">
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
              <p className="text-xs uppercase tracking-widest text-teal-500">Featured</p>
              <h2 className="font-sans text-3xl md:text-4xl font-bold mt-3 group-hover:underline">
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

      <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {rest.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/split-visual/" + post.frontmatter.slug}
            className="block break-inside-avoid mb-6 group rounded-lg border border-gray-300 overflow-hidden bg-white hover:shadow-md transition-shadow"
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
            <div className="p-4">
              <h3 className="font-sans text-lg font-bold group-hover:underline">
                {post.frontmatter.title}
              </h3>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
