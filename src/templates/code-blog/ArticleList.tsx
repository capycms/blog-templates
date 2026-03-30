import { Post } from "@/lib/types";
import { ReadingTime } from "@/components/shared/ReadingTime";

function getComplexity(content: string) {
  const fence = String.fromCharCode(96).repeat(3);
  const fences = content.split(fence).length - 1;
  const codeBlocks = Math.floor(fences / 2);
  const score = codeBlocks * 2 + Math.round(content.length / 1200);
  if (score <= 3) return "Low";
  if (score <= 6) return "Medium";
  return "High";
}

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-mono text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {posts.map((post) => {
          const complexity = getComplexity(post.content);
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/code-blog/" + post.frontmatter.slug}
              className="block group"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                <span className="opacity-70">{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span className="opacity-70">
                  <ReadingTime content={post.content} />
                </span>
                <span>&middot;</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-700 text-yellow-300">
                  Complexity: {complexity}
                </span>
              </div>
              <h2 className="font-mono text-xl font-bold group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
