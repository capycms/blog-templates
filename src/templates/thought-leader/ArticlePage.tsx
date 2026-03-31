import { Post, Branding } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { AuthorBio } from "@/components/shared/AuthorBio";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";
import { RelatedPosts } from "@/components/shared/RelatedPosts";
import { getAllPosts } from "@/lib/posts";

export default function ArticlePage({ post, branding }: { post: Post; branding?: Branding }) {
  const allPosts = getAllPosts().filter((p) => p.frontmatter.slug !== post.frontmatter.slug);
  const tags = post.frontmatter.tags;
  const relatedByTags = tags.length
    ? allPosts.filter((p) => p.frontmatter.tags.some((tag) => tags.includes(tag)))
    : [];
  const related = (relatedByTags.length ? relatedByTags : allPosts).slice(0, 3);

  return (
    <div>
      <article>
        <h1 className="font-serif text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex items-center gap-3 text-sm opacity-60 mb-6">
          <span>{post.frontmatter.date}</span>
          <span>&middot;</span>
          <span>{post.frontmatter.author}</span>
        </div>

        <AuthorBio author={post.frontmatter.author} variant="corporate" />

        <div className="prose max-w-none font-sans">
          <MarkdownRenderer source={post.content} variant="light" />
        </div>

        <RelatedPosts posts={related} variant="light" />
        <NewsletterCTA variant="light" />
      </article>
    </div>
  );
}
