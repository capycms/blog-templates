import { Post, Branding } from "@/lib/types";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-mono text-4xl md:text-5xl font-black uppercase tracking-tight mb-10">
        ARTICLES
      </h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/brutalist-art/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="border-2 border-black bg-white p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                <span>{post.frontmatter.date}</span>
                <span>{post.frontmatter.author}</span>
              </div>
              <h2 className="font-mono text-2xl md:text-3xl font-black mt-4 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="mt-3 opacity-80">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
