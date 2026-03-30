export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
