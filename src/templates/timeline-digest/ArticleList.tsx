import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Articles</h1>
      <div className="relative border-l-2 border-indigo-200 ml-4 space-y-8 pl-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/timeline-digest/${post.frontmatter.slug}`} className="block group relative">
            <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-200" />
            <span className="text-xs opacity-50">{post.frontmatter.date}</span>
            <h2 className="font-serif text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
            {post.frontmatter.coverImage ? (
              <div className="mt-3 max-w-sm aspect-video bg-gray-200 overflow-hidden rounded border border-indigo-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
