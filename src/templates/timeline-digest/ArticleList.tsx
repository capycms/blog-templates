import { Post, Branding } from "@/lib/types";

function formatMonthYear(isoDate: string) {
  const d = new Date(isoDate);
  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
  return fmt.format(d);
}

export default function ArticleList({ posts, branding }: { posts: Post[]; branding?: Branding }) {
  const entries: Array<{ type: "heading"; label: string } | { type: "post"; post: Post }> = [];
  let current = "";

  for (const post of posts) {
    const label = formatMonthYear(post.frontmatter.date);
    if (label !== current) {
      current = label;
      entries.push({ type: "heading", label });
    }
    entries.push({ type: "post", post });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Timeline</h1>
      <div className="relative border-l-2 border-indigo-200 ml-4 space-y-6 pl-8">
        {entries.map((entry) =>
          entry.type === "heading" ? (
            <div key={entry.label} className="pt-6">
              <div className="text-xs uppercase tracking-widest opacity-60">{entry.label}</div>
            </div>
          ) : (
            <a
              key={entry.post.frontmatter.slug}
              href={"/templates/timeline-digest/" + entry.post.frontmatter.slug}
              className="block group relative"
            >
              <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-200" />
              <span className="text-xs opacity-50">{entry.post.frontmatter.date}</span>
              <h2 className="font-serif text-lg font-bold group-hover:underline">
                {entry.post.frontmatter.title}
              </h2>
              <p className="text-sm opacity-70 mt-1">{entry.post.frontmatter.excerpt}</p>
              {entry.post.frontmatter.coverImage ? (
                <div className="mt-3 max-w-sm aspect-video bg-gray-200 overflow-hidden rounded border border-indigo-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.post.frontmatter.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </a>
          )
        )}
      </div>
    </div>
  );
}
