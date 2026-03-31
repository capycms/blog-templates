import { Post, Branding } from "@/lib/types";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-6">Micro</h1>
      <div className="relative border-l border-pink-200 ml-3 space-y-4 pl-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/micro-personal/" + post.frontmatter.slug}
            className="block group relative"
          >
            <div className="absolute -left-7 top-2 w-2.5 h-2.5 rounded-full bg-pink-50 border border-pink-200" />
            <div className="text-xs opacity-60">{post.frontmatter.date}</div>
            <div className="font-sans font-bold group-hover:underline">
              {post.frontmatter.title}
            </div>
            <div className="text-sm opacity-70">{post.frontmatter.excerpt}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
