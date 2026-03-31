import { Post, Branding } from "@/lib/types";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  const author = posts[0]?.frontmatter.author || "Author";
  const initial = author.charAt(0).toUpperCase();

  return (
    <div>
      <div className="rounded-xl border border-gray-200 bg-white p-8 mb-10">
        <h1 className="font-serif text-4xl font-bold">Home Page</h1>
        <p className="mt-3 opacity-70 max-w-2xl">
          Portfolio intro section with a blog grid below.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-lg font-bold text-rose-700">
            {initial}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm opacity-60">Designer & builder</p>
          </div>
        </div>
      </div>

      <h2 className="font-serif text-2xl font-bold mb-6">Latest posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/home-page-blog/" + post.frontmatter.slug}
            className="block group rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-sm opacity-60">{post.frontmatter.date}</p>
            <h3 className="font-serif text-xl font-bold mt-1 group-hover:underline">
              {post.frontmatter.title}
            </h3>
            <p className="mt-2 opacity-70">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
