"use client";

import { useMemo, useState } from "react";
import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const [page, setPage] = useState(0);

  const visiblePosts = useMemo(
    () => posts.slice(page * pageSize, page * pageSize + pageSize),
    [page, posts]
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div>
      <h1 className="font-sans text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {visiblePosts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/one-column-light/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-sans text-xl font-bold group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
            </div>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={!canPrev}
          className={
            "px-3 py-1.5 rounded border border-gray-200 hover:bg-white transition-colors " +
            (!canPrev ? "opacity-40 cursor-not-allowed" : "")
          }
        >
          Previous
        </button>
        <span className="opacity-60">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={!canNext}
          className={
            "px-3 py-1.5 rounded border border-gray-200 hover:bg-white transition-colors " +
            (!canNext ? "opacity-40 cursor-not-allowed" : "")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
