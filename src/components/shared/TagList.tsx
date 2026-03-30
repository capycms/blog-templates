export function TagList({
  tags,
  className,
  variant = "light",
}: {
  tags: string[];
  className?: string;
  variant?: "light" | "dark" | "outline";
}) {
  const chipClass =
    variant === "dark"
      ? "bg-white/10 text-white/80 border border-white/15"
      : variant === "outline"
        ? "bg-transparent text-gray-900 border border-gray-900"
        : "bg-gray-100 text-gray-600";

  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-xs px-2 py-1 rounded-full ${chipClass}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
