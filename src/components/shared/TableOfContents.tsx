import { TocItem } from "@/lib/toc";

export function TableOfContents({
  items,
  variant = "light",
}: {
  items: TocItem[];
  variant?: "light" | "dark";
}) {
  if (items.length === 0) return null;

  const isDark = variant === "dark";
  const containerClass = isDark
    ? "border-white/15 bg-white/5 text-white"
    : "border-gray-200 bg-gray-50 text-gray-800";

  const linkClass = isDark
    ? "text-white/80 hover:text-white"
    : "text-gray-700 hover:text-gray-900";

  return (
    <nav className={`mb-8 rounded-lg border p-4 ${containerClass}`}>
      <h2 className="text-sm font-semibold mb-2">On this page</h2>
      <ul className="text-sm space-y-1">
        {items.map((item) => (
          <li key={item.id} className={item.level >= 3 ? "ml-4" : ""}>
            <a href={`#${item.id}`} className={`hover:underline ${linkClass}`}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
