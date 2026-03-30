import { Post } from "@/lib/types";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <div className="mt-8 pt-6 border-t">
      <h3 className="font-bold text-lg mb-3">Related Posts</h3>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <a href={`/${post.frontmatter.slug}`} className="text-blue-600 hover:underline">
              {post.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
