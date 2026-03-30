import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={`/templates/split-visual/${post.frontmatter.slug}`} className="block group bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-md transition-shadow">
            
            {post.frontmatter.coverImage ? (
              <div className="aspect-video bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-4">
              <h2 className="font-sans text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
