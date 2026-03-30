import { Post } from "@/lib/types";

export function RelatedPosts({
  posts,
  variant = "light",
}: {
  posts: Post[];
  variant?: "light" | "dark";
}) {
  if (posts.length === 0) return null;

  const isDark = variant === "dark";
  const borderClass = isDark ? "border-white/10" : "border-gray-200";
  const linkClass = isDark
    ? "text-blue-300 hover:text-blue-200"
    : "text-blue-600 hover:text-blue-800";

  return (
    <div className={`mt-10 pt-6 border-t ${borderClass}`}>
      <h3 className="font-bold text-lg mb-3">Related Posts</h3>
      <ul className="space-y-2 text-sm">
        {posts.map((post) => (
          <li key={post.frontmatter.slug}>
            <a
              href={`../${post.frontmatter.slug}`}
              className={`underline-offset-4 hover:underline ${linkClass}`}
            >
              {post.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
