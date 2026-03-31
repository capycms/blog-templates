import { Post, Branding } from "@/lib/types";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Executive Brief</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/executive-brief/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <p className="text-xs uppercase tracking-widest text-blue-500">Executive Summary</p>
              <h2 className="font-serif text-2xl font-bold mt-2 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm opacity-70">{post.frontmatter.excerpt}</p>
              </div>
              <p className="mt-4 text-sm opacity-60">
                {post.frontmatter.date} &middot; {post.frontmatter.author}
              </p>
            </div>
          </a>
        ))}
      </div>
      <NewsletterCTA variant="light" />
    </div>
  );
}
