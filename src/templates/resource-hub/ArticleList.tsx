"use client";

import { useMemo, useState } from "react";
import { Post, Branding } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const inTitle = p.frontmatter.title.toLowerCase().includes(q);
      const inExcerpt = p.frontmatter.excerpt.toLowerCase().includes(q);
      const inTags = p.frontmatter.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inExcerpt || inTags;
    });
  }, [posts, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-sans text-3xl font-bold">Resources</h1>
          <p className="text-sm opacity-70 mt-1">
            Search across titles, excerpts, and tags.
          </p>
        </div>
        <div className="w-full md:w-80">
          <label className="text-xs uppercase tracking-widest opacity-60">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to filter…"
            className="mt-2 w-full rounded border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/resource-hub/" + post.frontmatter.slug}
            className="block group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <h2 className="font-sans text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
              <div className="mt-3">
                <TagList tags={post.frontmatter.tags} />
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm opacity-70 mt-10">No results.</p>
      ) : null}
    </div>
  );
}
