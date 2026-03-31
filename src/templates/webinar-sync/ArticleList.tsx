import { Post, Branding } from "@/lib/types";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/webinar-sync/${post.frontmatter.slug}`} className="block group">
            <div className="flex items-baseline justify-between">
              <h2 className="font-sans text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
            </div>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
      <NewsletterCTA variant="light" />
    </div>
  );
}
